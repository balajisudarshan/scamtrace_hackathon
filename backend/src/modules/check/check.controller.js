/**
 * Check API — POST /api/check
 * Runs pretrained LLM threat intelligence (Meta LLaMA 3.2 NIM) + deterministic rule engine
 */
import { analyzeContent } from "../../lib/ruleEngine.js";
import { aiEvaluateContentThreat } from "../../lib/aiVision.js";
import { prisma } from "../../lib/prisma.js";
import { findSimilarReports } from "../../lib/similarityMatcher.js";

export const checkController = async (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content)
      return res.status(400).json({ success: false, message: "type and content are required" });

    const validTypes = ["message", "url", "phone", "social"];
    if (!validTypes.includes(type))
      return res.status(400).json({ success: false, message: `type must be one of: ${validTypes.join(", ")}` });

    if (content.length > 5000)
      return res.status(400).json({ success: false, message: "Content too long (max 5000 characters)" });

    // 1. Run deterministic rule engine
    const ruleAnalysis = analyzeContent(type, content);

    // Normalize identifier if type is social, phone, or url
    let normalizedIdentifier = content.trim();
    let primaryIndicatorType = "PHRASE";
    if (type === "social") {
      primaryIndicatorType = "SOCIAL_HANDLE";
      normalizedIdentifier = normalizedIdentifier.startsWith("@")
        ? normalizedIdentifier.toLowerCase()
        : `@${normalizedIdentifier.toLowerCase()}`;
    } else if (type === "phone") {
      primaryIndicatorType = "PHONE";
      const digits = normalizedIdentifier.replace(/\D/g, "");
      if (digits.length === 10) normalizedIdentifier = `+91${digits}`;
      else if (digits.length === 12 && digits.startsWith("91")) normalizedIdentifier = `+${digits}`;
      else normalizedIdentifier = digits ? `+${digits}` : normalizedIdentifier;
    } else if (type === "url") {
      primaryIndicatorType = "DOMAIN";
      normalizedIdentifier = normalizedIdentifier.replace(/^https?:\/\//i, "").split("/")[0].toLowerCase();
    }

    // 2. Query ScamTrace database directly for community reports linked to this indicator
    let dbIndicator = null;
    if (type === "social" || type === "phone" || type === "url") {
      try {
        dbIndicator = await prisma.indicator.findFirst({
          where: {
            type: primaryIndicatorType,
            value: normalizedIdentifier,
          },
          include: {
            reports: {
              include: {
                report: {
                  select: {
                    id: true,
                    publicSummary: true,
                    riskLevel: true,
                    riskScore: true,
                    platform: true,
                    createdAt: true,
                  },
                },
              },
              take: 10,
            },
          },
        });
      } catch (err) {
        console.warn("DB indicator lookup warning:", err.message);
      }
    }

    // 3. Run pretrained AI Threat Intelligence (primary evaluator for message text)
    let aiEval = null;
    try {
      aiEval = await aiEvaluateContentThreat(type, content, ruleAnalysis);
    } catch (err) {
      console.warn("AI threat evaluation warning:", err.message);
    }

    // 4. Synthesize findings
    let finalRiskLevel = ruleAnalysis.riskLevel;
    let finalRiskScore = ruleAnalysis.riskScore;
    let finalEvidence = [...(ruleAnalysis.evidence || [])];
    let finalStoryMode = [...(ruleAnalysis.storyMode || [])];
    let finalIndicators = [...(ruleAnalysis.indicators || [])];
    let finalNextSteps = [...(ruleAnalysis.nextSteps || [])];
    let threatType = "Suspicious Communication";
    let verdictTitle = null;
    let verdictSummary = null;

    // Ensure primary indicator is present in finalIndicators
    if (type === "social" || type === "phone" || type === "url") {
      if (!finalIndicators.some(i => i.value?.toLowerCase() === normalizedIdentifier.toLowerCase())) {
        finalIndicators.unshift({
          type: primaryIndicatorType,
          value: normalizedIdentifier,
          context: content.trim(),
        });
      }
    }

    // Check if database indicator has known community scam reports
    const dbReportsCount = dbIndicator?.reports?.length || 0;
    if (dbReportsCount > 0) {
      const hasHighRisk = dbIndicator.reports.some(r => r.report?.riskLevel === "HIGH_RISK");
      finalRiskLevel = hasHighRisk || dbReportsCount >= 2 ? "HIGH_RISK" : "NEEDS_CAUTION";
      finalRiskScore = Math.max(finalRiskScore, Math.min(0.95, 0.40 + dbReportsCount * 0.15));
      threatType = "Community Flagged Contact";
      verdictTitle = `⚠️ Flagged in ${dbReportsCount} Scam Report(s)`;
      verdictSummary = `This ${type} has been linked to ${dbReportsCount} user incident(s) in the ScamTrace community database.`;
      finalEvidence.unshift({
        field: "community_reports",
        value: normalizedIdentifier,
        why: `Reported in ${dbReportsCount} community scam report(s) on ScamTrace`,
        tactic: "community_corroborated",
      });
    }

    // If AI evaluated, merge findings
    if (aiEval?.isAiEvaluated && aiEval?.aiFindings) {
      const ai = aiEval.aiFindings;

      // Only adopt AI threat findings if content was actually a threat
      if (ai.isThreat) {
        threatType = ai.threatType || threatType;
        verdictTitle = ai.verdictTitle;
        verdictSummary = ai.verdictSummary;

        const riskOrder = { HIGH_RISK: 3, NEEDS_CAUTION: 2, LOW_SIGNAL: 1 };
        const aiRank = riskOrder[ai.riskLevel] || 1;
        const currentRank = riskOrder[finalRiskLevel] || 1;

        if (aiRank >= currentRank) {
          finalRiskLevel = ai.riskLevel;
        }
        finalRiskScore = Math.max(ai.riskScore || 0, finalRiskScore);

        if (Array.isArray(ai.evidence)) {
          for (const ev of ai.evidence) {
            if (!finalEvidence.some(e => e.value?.toLowerCase() === ev.value?.toLowerCase())) {
              finalEvidence.unshift({
                field: ev.tactic || "ai_flag",
                value: ev.value,
                why: ev.why,
                tactic: ev.tactic,
              });
            }
          }
        }

        if (Array.isArray(ai.storyMode) && ai.storyMode.length > 0) {
          const existingPhrases = new Set(finalStoryMode.map(s => s.phrase?.toLowerCase()));
          for (const item of ai.storyMode) {
            if (!existingPhrases.has(item.phrase?.toLowerCase())) {
              finalStoryMode.push(item);
            }
          }
        }
      } else if (dbReportsCount === 0 && ruleAnalysis.evidence.length === 0) {
        // Content is clean & confirmed safe
        finalRiskLevel = "LOW_SIGNAL";
        finalRiskScore = 0.0;
        threatType = "Clean / Unflagged Contact";
        verdictTitle = "✅ No Scam Reports Found";
        verdictSummary = `No suspicious activity or community scam reports found for "${normalizedIdentifier}".`;
        finalEvidence = [];
        finalStoryMode = [];
        finalNextSteps = [
          `✅ No reports found for "${normalizedIdentifier}" in the ScamTrace database.`,
          "Always exercise caution if an unexpected contact asks for urgent money transfers, passwords, or OTPs.",
          "If this contact later engages in suspicious behavior, submit a community report to protect others.",
        ];
      }

      // Merge AI indicators for DB correlation
      if (Array.isArray(ai.indicators)) {
        for (const ind of ai.indicators) {
          if (!finalIndicators.some(i => i.value?.toLowerCase() === ind.value?.toLowerCase())) {
            finalIndicators.push(ind);
          }
        }
      }

      // Merge next steps if present and threat
      if (ai.isThreat && Array.isArray(ai.nextSteps) && ai.nextSteps.length > 0) {
        const combined = [...ai.nextSteps];
        for (const step of finalNextSteps) {
          if (!combined.some(s => s.toLowerCase() === step.toLowerCase())) {
            combined.push(step);
          }
        }
        finalNextSteps = combined;
      }
    }

    // Default clean state fallback if no signals exist anywhere
    if (finalEvidence.length === 0 && dbReportsCount === 0 && finalRiskScore === 0) {
      finalRiskLevel = "LOW_SIGNAL";
      threatType = "Clean / Unflagged Contact";
      if (!verdictTitle) verdictTitle = "✅ No Scam Reports Found";
      if (!verdictSummary) {
        verdictSummary = `No suspicious activity or threat patterns detected for "${normalizedIdentifier}".`;
      }
      if (finalNextSteps.length <= 1) {
        finalNextSteps = [
          `✅ No reports found for "${normalizedIdentifier}" in the ScamTrace database.`,
          "Always exercise caution if an unexpected contact asks for urgent money transfers, passwords, or OTPs.",
          "If you experience any suspicious behavior from this contact, submit a community report.",
        ];
      }
    }

    // 5. Find related reports from DB via shared indicators
    let relatedReports = [];
    try {
      relatedReports = await findSimilarReports(prisma, finalIndicators, "__none__", 5);
    } catch (_) {}

    return res.status(200).json({
      success: true,
      contentType: type,
      riskLevel: finalRiskLevel,
      riskScore: Math.round(finalRiskScore * 100) / 100,
      threatType,
      verdictTitle,
      verdictSummary,
      evidence: finalEvidence,
      storyMode: finalStoryMode,
      indicators: finalIndicators,
      nextSteps: finalNextSteps,
      caveat: ruleAnalysis.caveat,
      aiAnalysis: aiEval?.isAiEvaluated
        ? {
            enabled: true,
            model: aiEval.model,
            confidence: aiEval.aiFindings?.confidence || 95,
            threatType,
            verdictTitle,
            verdictSummary,
          }
        : {
            enabled: false,
            reason: aiEval?.reason || "Rule-engine fallback",
          },
      relatedReports,
    });
  } catch (err) {
    console.error("Check error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Screenshot / Image OCR + AI Threat Analyzer
 * POST /api/check/image
 */
import multer from "multer";
import { tmpdir } from "os";
import fs from "fs";
import { analyzeImageWithOCR, uploadToCloudinary } from "../../lib/aiVision.js";

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, tmpdir()),
  filename: (_, file, cb) => cb(null, `ss-${Date.now()}-${file.originalname}`),
});
const imageFilter = (_, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};
export const uploadImageMiddleware = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("image");

export const checkImageController = async (req, res) => {
  let tempFilePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No screenshot/image file uploaded." });
    }

    tempFilePath = req.file.path;

    // 1. Upload to Cloudinary (optional/graceful)
    let cloudinaryResult = null;
    try {
      cloudinaryResult = await uploadToCloudinary(tempFilePath, "scamtrace/screenshots");
    } catch (e) {
      console.warn("Cloudinary screenshot upload warning:", e.message);
    }

    // 2. Perform OCR
    const ocrResult = await analyzeImageWithOCR(tempFilePath, cloudinaryResult?.url);
    const extractedText = ocrResult.ocrText || "";

    if (!extractedText.trim()) {
      return res.json({
        success: true,
        contentType: "image",
        imageUrl: cloudinaryResult?.url || null,
        ocrText: "",
        riskLevel: "LOW_SIGNAL",
        riskScore: 0.1,
        threatType: "Unclear Screenshot",
        verdictTitle: "ℹ️ No Legible Text Detected",
        verdictSummary: "The OCR engine could not detect clear text in this screenshot. Please ensure the image is clear or paste the text directly.",
        evidence: [],
        storyMode: [],
        indicators: [],
        nextSteps: ["Ensure screenshot has clear, high-resolution text", "Try cropping to the relevant message text"],
        aiAnalysis: { enabled: false, reason: "No text extracted from image" },
        relatedReports: [],
      });
    }

    // 3. Run rule engine on extracted text
    const ruleAnalysis = analyzeContent("message", extractedText);

    // 4. Run pretrained AI Threat Intelligence on extracted text
    let aiEval = null;
    try {
      aiEval = await aiEvaluateContentThreat("screenshot", extractedText, ruleAnalysis);
    } catch (err) {
      console.warn("AI threat evaluation on screenshot warning:", err.message);
    }

    // 5. Synthesize findings
    let finalRiskLevel = ruleAnalysis.riskLevel;
    let finalRiskScore = ruleAnalysis.riskScore;
    let finalEvidence = [...(ruleAnalysis.evidence || [])];
    let finalStoryMode = [...(ruleAnalysis.storyMode || [])];
    let finalIndicators = [...(ruleAnalysis.indicators || [])];
    let finalNextSteps = [...(ruleAnalysis.nextSteps || [])];
    let threatType = "Suspicious Screenshot";
    let verdictTitle = "🚨 Threat Detected in Screenshot";
    let verdictSummary = null;

    if (aiEval?.isAiEvaluated && aiEval?.aiFindings) {
      const ai = aiEval.aiFindings;
      threatType = ai.threatType || threatType;
      verdictTitle = ai.verdictTitle || verdictTitle;
      verdictSummary = ai.verdictSummary;

      const riskOrder = { HIGH_RISK: 3, NEEDS_CAUTION: 2, LOW_SIGNAL: 1 };
      const aiRank = riskOrder[ai.riskLevel] || 1;
      const ruleRank = riskOrder[ruleAnalysis.riskLevel] || 1;
      finalRiskLevel = aiRank >= ruleRank ? ai.riskLevel : ruleAnalysis.riskLevel;
      finalRiskScore = Math.max(ai.riskScore || 0, ruleAnalysis.riskScore || 0);

      if (Array.isArray(ai.evidence)) {
        for (const ev of ai.evidence) {
          if (!finalEvidence.some(e => e.value?.toLowerCase() === ev.value?.toLowerCase())) {
            finalEvidence.unshift({
              field: ev.tactic || "ai_flag",
              value: ev.value,
              why: ev.why,
              tactic: ev.tactic,
            });
          }
        }
      }

      if (Array.isArray(ai.storyMode)) {
        const existingPhrases = new Set(finalStoryMode.map(s => s.phrase?.toLowerCase()));
        for (const item of ai.storyMode) {
          if (!existingPhrases.has(item.phrase?.toLowerCase())) finalStoryMode.push(item);
        }
      }

      if (Array.isArray(ai.indicators)) {
        for (const ind of ai.indicators) {
          if (!finalIndicators.some(i => i.value?.toLowerCase() === ind.value?.toLowerCase())) finalIndicators.push(ind);
        }
      }

      if (Array.isArray(ai.nextSteps)) {
        const combined = [...ai.nextSteps];
        for (const step of finalNextSteps) {
          if (!combined.some(s => s.toLowerCase() === step.toLowerCase())) combined.push(step);
        }
        finalNextSteps = combined;
      }
    }

    // Correlate with DB reports
    let relatedReports = [];
    try {
      relatedReports = await findSimilarReports(prisma, finalIndicators, "__none__", 5);
    } catch (_) {}

    return res.json({
      success: true,
      contentType: "image",
      imageUrl: cloudinaryResult?.url || null,
      ocrText: extractedText,
      riskLevel: finalRiskLevel,
      riskScore: Math.round(finalRiskScore * 100) / 100,
      threatType,
      verdictTitle,
      verdictSummary,
      evidence: finalEvidence,
      storyMode: finalStoryMode,
      indicators: finalIndicators,
      nextSteps: finalNextSteps,
      caveat: ruleAnalysis.caveat,
      aiAnalysis: aiEval?.isAiEvaluated
        ? {
            enabled: true,
            model: aiEval.model,
            confidence: aiEval.aiFindings?.confidence || 90,
            threatType,
            verdictTitle,
            verdictSummary,
          }
        : {
            enabled: false,
            reason: aiEval?.reason || "Rule-engine fallback",
          },
      relatedReports,
    });
  } catch (err) {
    console.error("Screenshot check error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to process screenshot." });
  } finally {
    if (tempFilePath) {
      try { fs.unlinkSync(tempFilePath); } catch (_) {}
    }
  }
};
