/**
 * Check API — POST /api/check
 * Runs rule engine + finds related DB reports
 */
import { analyzeContent } from "../../lib/ruleEngine.js";
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

    // Run deterministic rule engine
    const analysis = analyzeContent(type, content);

    // Find related reports from DB via shared indicators
    let relatedReports = [];
    try {
      relatedReports = await findSimilarReports(prisma, analysis.indicators, "__none__", 5);
    } catch (_) {}

    return res.status(200).json({
      success: true,
      contentType: type,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      evidence: analysis.evidence,
      storyMode: analysis.storyMode,
      indicators: analysis.indicators,
      nextSteps: analysis.nextSteps,
      caveat: analysis.caveat,
      relatedReports,
    });
  } catch (err) {
    console.error("Check error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
