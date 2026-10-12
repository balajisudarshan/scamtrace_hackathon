/**
 * ScamPulse / Trends API
 * Public endpoint — GET /api/trends
 * Aggregated counts over time with tactic breakdown.
 */
import { prisma } from "../../lib/prisma.js";

// Helper: convert all BigInt values in a result row to Number
const fixBigInt = (obj) => {
  if (Array.isArray(obj)) return obj.map(fixBigInt);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, typeof v === "bigint" ? Number(v) : v])
    );
  }
  return obj;
};

// ─── GET /api/trends — ScamPulse trend data ──────────────────────────────────
export const getTrendsController = async (req, res) => {
  try {
    const { days = 30, contentType, riskLevel, tactic } = req.query;
    const safeDays = Math.min(parseInt(days) || 30, 365);

    let conditions = [`"createdAt" >= NOW() - INTERVAL '${safeDays} days'`];
    let params = [];
    let idx = 1;

    if (contentType) { conditions.push(`"contentType"=$${idx++}`); params.push(contentType); }
    if (riskLevel)   { conditions.push(`"riskLevel"=$${idx++}`);   params.push(riskLevel); }
    if (tactic)      { conditions.push(`tactic=$${idx++}`);        params.push(tactic); }

    const where = conditions.join(" AND ");

    // Daily aggregate from TrendSnapshot
    const dailyTrends = fixBigInt(await prisma.$queryRawUnsafe(
      `SELECT date, "contentType", "riskLevel", tactic, SUM("reportCount")::int as "reportCount"
       FROM "TrendSnapshot" WHERE ${where}
       GROUP BY date, "contentType", "riskLevel", tactic
       ORDER BY date ASC`,
      ...params
    ));

    // Live counts from Report table
    const liveSummaryRaw = await prisma.$queryRawUnsafe(
      `SELECT 
        COUNT(*)::int as "totalReports",
        SUM(CASE WHEN "riskLevel"='HIGH_RISK' THEN 1 ELSE 0 END)::int as "highRisk",
        SUM(CASE WHEN "riskLevel"='NEEDS_CAUTION' THEN 1 ELSE 0 END)::int as "needsCaution",
        SUM(CASE WHEN "riskLevel"='LOW_SIGNAL' THEN 1 ELSE 0 END)::int as "lowSignal",
        SUM(CASE WHEN status='PUBLISHED' THEN 1 ELSE 0 END)::int as "published",
        SUM(CASE WHEN "contentType"='message' THEN 1 ELSE 0 END)::int as "messages",
        SUM(CASE WHEN "contentType"='url' THEN 1 ELSE 0 END)::int as "urls",
        SUM(CASE WHEN "contentType"='phone' THEN 1 ELSE 0 END)::int as "phones"
       FROM "Report" WHERE "createdAt" >= NOW() - INTERVAL '${safeDays} days'`
    );
    const liveSummary = fixBigInt(liveSummaryRaw);

    // Top tactics in period
    const topTactics = fixBigInt(await prisma.$queryRawUnsafe(
      `SELECT i.value as tactic, COUNT(DISTINCT ri."reportId")::int as count
       FROM "Indicator" i
       JOIN "ReportIndicator" ri ON ri."indicatorId"=i.id
       JOIN "Report" r ON r.id=ri."reportId"
       WHERE i.type='TACTIC' AND r."createdAt" >= NOW() - INTERVAL '${safeDays} days'
       GROUP BY i.value ORDER BY count DESC LIMIT 5`
    ));

    // Top platforms
    const topPlatforms = fixBigInt(await prisma.$queryRawUnsafe(
      `SELECT platform, COUNT(*)::int as count FROM "Report"
       WHERE "createdAt" >= NOW() - INTERVAL '${safeDays} days' AND platform IS NOT NULL
       GROUP BY platform ORDER BY count DESC LIMIT 5`
    ));

    const lastUpdated = new Date().toISOString();

    return res.json({
      success: true,
      meta: {
        windowDays: safeDays,
        sampleSize: liveSummary[0]?.totalReports ?? 0,
        lastUpdated,
        note: "Counts represent submitted community reports and seeded demo data — not confirmed real-world scam incidents.",
      },
      summary: liveSummary[0],
      topTactics,
      topPlatforms,
      dailyTrends,
    });
  } catch (err) {
    console.error("Trends error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/trends/indicators — Indicator frequency ────────────────────────
export const getIndicatorTrendsController = async (req, res) => {
  try {
    const { type = "TACTIC", days = 30, limit = 20 } = req.query;
    const safeDays = Math.min(parseInt(days) || 30, 365);
    const safeLimit = Math.min(parseInt(limit) || 20, 100);
    const validTypes = ["TACTIC", "DOMAIN", "PHONE", "PHRASE", "BRAND"];
    const safeType = validTypes.includes(type.toUpperCase()) ? type.toUpperCase() : "TACTIC";

    const indicators = fixBigInt(await prisma.$queryRawUnsafe(
      `SELECT i.value, i.metadata, COUNT(DISTINCT ri."reportId")::int as "reportCount",
              MIN(r."createdAt") as "firstSeen", MAX(r."createdAt") as "lastSeen"
       FROM "Indicator" i
       JOIN "ReportIndicator" ri ON ri."indicatorId"=i.id
       JOIN "Report" r ON r.id=ri."reportId"
       WHERE i.type=$1 AND r."createdAt" >= NOW() - INTERVAL '${safeDays} days'
       GROUP BY i.value, i.metadata
       ORDER BY "reportCount" DESC
       LIMIT $2`,
      safeType, safeLimit
    ));

    return res.json({ success: true, indicatorType: safeType, windowDays: safeDays, indicators });
  } catch (err) {
    console.error("Indicator trends error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
