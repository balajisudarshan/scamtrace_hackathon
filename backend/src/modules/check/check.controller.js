import { analyzeContent } from "../../lib/ruleEngine.js";
import { prisma } from "../../lib/prisma.js";

// ─── POST /api/check ──────────────────────────────────────────
export const checkController = async (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content) {
      return res.status(400).json({ success: false, message: "type and content are required" });
    }

    const validTypes = ["message", "url", "phone", "social"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, message: `type must be one of: ${validTypes.join(", ")}` });
    }

    if (content.length > 5000) {
      return res.status(400).json({ success: false, message: "Content too long (max 5000 characters)" });
    }

    // Run deterministic rule engine
    const analysis = analyzeContent(type, content);

    // Find related reports by matching indicators
    const relatedReports = await findRelatedReports(analysis.indicators);

    return res.status(200).json({
      success: true,
      contentType: type,
      ...analysis,
      relatedReports,
    });
  } catch (err) {
    console.error("Check error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Find related reports via shared indicators ───────────────
const findRelatedReports = async (indicators) => {
  if (!indicators || indicators.length === 0) return [];

  try {
    // Get unique indicator values we found
    const domainValues = indicators.filter(i => i.type === "DOMAIN").map(i => i.value);
    const phoneValues = indicators.filter(i => i.type === "PHONE").map(i => i.value);
    const tacticValues = indicators.filter(i => i.type === "TACTIC").map(i => i.value);

    if (!domainValues.length && !phoneValues.length && !tacticValues.length) return [];

    // Find indicators in DB matching what we found
    const matchedIndicators = await prisma.indicator.findMany({
      where: {
        OR: [
          { type: "DOMAIN", value: { in: domainValues } },
          { type: "PHONE", value: { in: phoneValues } },
          { type: "TACTIC", value: { in: tacticValues } },
        ],
      },
      include: {
        reports: {
          include: {
            report: {
              select: {
                id: true,
                contentType: true,
                publicSummary: true,
                riskLevel: true,
                status: true,
                platform: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    // Aggregate reports and their matching indicator count
    const reportMap = new Map();
    for (const indicator of matchedIndicators) {
      for (const ri of indicator.reports) {
        const r = ri.report;
        if (!reportMap.has(r.id)) {
          reportMap.set(r.id, { ...r, matchedIndicators: [], matchCount: 0 });
        }
        const entry = reportMap.get(r.id);
        entry.matchedIndicators.push({ type: indicator.type, value: indicator.value });
        entry.matchCount++;
      }
    }

    // Sort by match count descending, return top 5
    return Array.from(reportMap.values())
      .filter(r => ["PUBLISHED", "CORROBORATED"].includes(r.status))
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5)
      .map(({ matchCount, ...r }) => r);
  } catch (err) {
    console.error("Related reports error:", err);
    return [];
  }
};
