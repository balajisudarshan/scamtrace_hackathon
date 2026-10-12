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

    // 2. Run pretrained AI Threat Intelligence (primary evaluator)
    let aiEval = null;
    try {
      aiEval = await aiEvaluateContentThreat(type, content, ruleAnalysis);
    } catch (err) {
      console.warn("AI threat evaluation warning:", err.message);
    }

    // 3. Synthesize AI & Rule findings (AI takes primary precedence for semantic threats)
    let finalRiskLevel = ruleAnalysis.riskLevel;
    let finalRiskScore = ruleAnalysis.riskScore;
    let finalEvidence = [...(ruleAnalysis.evidence || [])];
    let finalStoryMode = [...(ruleAnalysis.storyMode || [])];
    let finalIndicators = [...(ruleAnalysis.indicators || [])];
    let finalNextSteps = [...(ruleAnalysis.nextSteps || [])];
    let threatType = "Suspicious Communication";
    let verdictTitle = null;
    let verdictSummary = null;

    if (aiEval?.isAiEvaluated && aiEval?.aiFindings) {
      const ai = aiEval.aiFindings;
      threatType = ai.threatType || threatType;
      verdictTitle = ai.verdictTitle;
      verdictSummary = ai.verdictSummary;

      // Determine highest risk level
      const riskOrder = { HIGH_RISK: 3, NEEDS_CAUTION: 2, LOW_SIGNAL: 1 };
      const aiRank = riskOrder[ai.riskLevel] || 1;
      const ruleRank = riskOrder[ruleAnalysis.riskLevel] || 1;

      if (aiRank >= ruleRank) {
        finalRiskLevel = ai.riskLevel;
      } else {
        finalRiskLevel = ruleAnalysis.riskLevel;
      }

      finalRiskScore = Math.max(ai.riskScore || 0, ruleAnalysis.riskScore || 0);

      // Merge AI evidence (deduplicate)
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

      // Merge AI story mode
      if (Array.isArray(ai.storyMode) && ai.storyMode.length > 0) {
        const existingPhrases = new Set(finalStoryMode.map(s => s.phrase?.toLowerCase()));
        for (const item of ai.storyMode) {
          if (!existingPhrases.has(item.phrase?.toLowerCase())) {
            finalStoryMode.push(item);
          }
        }
      }

      // Merge AI indicators for DB correlation
      if (Array.isArray(ai.indicators)) {
        for (const ind of ai.indicators) {
          if (!finalIndicators.some(i => i.value?.toLowerCase() === ind.value?.toLowerCase())) {
            finalIndicators.push(ind);
          }
        }
      }

      // Merge next steps (prioritize AI specific actions)
      if (Array.isArray(ai.nextSteps) && ai.nextSteps.length > 0) {
        const combined = [...ai.nextSteps];
        for (const step of finalNextSteps) {
          if (!combined.some(s => s.toLowerCase() === step.toLowerCase())) {
            combined.push(step);
          }
        }
        finalNextSteps = combined;
      }
    }

    // 4. Find related reports from DB via shared indicators
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
