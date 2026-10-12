/**
 * Report API — POST /api/reports (submit), GET /api/reports (community list)
 * GET /api/reports/:id (detail), GET /api/reports/:id/dna (Scam DNA)
 */
import { prisma } from "../../lib/prisma.js";
import { analyzeContent } from "../../lib/ruleEngine.js";
import { computeScamDNA } from "../../lib/similarityMatcher.js";

// ─── POST /api/reports — submit a scam report ────────────────────────────────
export const submitReportController = async (req, res) => {
  try {
    const { type, content, platform, targetRegion } = req.body;
    const userId = req.user?.id ?? null;

    if (!type || !content)
      return res.status(400).json({ success: false, message: "type and content are required" });

    const validTypes = ["message", "url", "phone", "social"];
    if (!validTypes.includes(type))
      return res.status(400).json({ success: false, message: `type must be one of: ${validTypes.join(", ")}` });

    if (content.length > 5000)
      return res.status(400).json({ success: false, message: "Content too long (max 5000 chars)" });

    // Run rule engine
    const analysis = analyzeContent(type, content);

    // Build public summary (redact raw details)
    const publicSummary = buildPublicSummary(type, analysis);

    // Create report via raw SQL (prisma Client doesn't know about new tables yet until generate)
    const rows = await prisma.$queryRawUnsafe(`
      INSERT INTO "Report" (id,"submittedById","contentType","rawContent","publicSummary",
        platform,"targetRegion","riskLevel","riskScore","evidenceJson","storyModeJson",
        "nextStepsJson",caveat,status,"sourceType","createdAt","updatedAt")
      VALUES (gen_random_uuid()::text,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'RECEIVED','COMMUNITY',NOW(),NOW())
      RETURNING id,"riskLevel","riskScore",status,"createdAt"
    `,
      userId,
      type,
      content,
      publicSummary,
      platform ?? null,
      targetRegion ?? "IN",
      analysis.riskLevel,
      analysis.riskScore,
      JSON.stringify(analysis.evidence),
      JSON.stringify(analysis.storyMode),
      JSON.stringify(analysis.nextSteps),
      analysis.caveat
    );

    const report = rows[0];

    // Persist indicators
    for (const ind of analysis.indicators) {
      try {
        const existing = await prisma.$queryRawUnsafe(
          `SELECT id FROM "Indicator" WHERE type=$1 AND value=$2`, ind.type, ind.value
        );
        let indicatorId;
        if (existing.length > 0) {
          indicatorId = existing[0].id;
        } else {
          const ins = await prisma.$queryRawUnsafe(
            `INSERT INTO "Indicator" (id,type,value,metadata,"createdAt") VALUES (gen_random_uuid()::text,$1,$2,$3,NOW()) RETURNING id`,
            ind.type, ind.value, JSON.stringify({ extractedFrom: "community_report" })
          );
          indicatorId = ins[0].id;
        }
        await prisma.$queryRawUnsafe(
          `INSERT INTO "ReportIndicator" (id,"reportId","indicatorId",context) VALUES (gen_random_uuid()::text,$1,$2,$3) ON CONFLICT DO NOTHING`,
          report.id, indicatorId, ind.context ?? null
        );
      } catch (_) {}
    }

    // Audit
    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt") VALUES (gen_random_uuid()::text,$1,$2,'REPORT_SUBMITTED',$3,NOW())`,
      userId, report.id, JSON.stringify({ indicatorsExtracted: analysis.indicators.length })
    );

    // Find related reports
    const relatedReports = await findRelatedReports(analysis.indicators, report.id);

    return res.status(201).json({
      success: true,
      reportId: report.id,
      status: report.status,
      riskLevel: report.riskLevel,
      riskScore: report.riskScore,
      createdAt: report.createdAt,
      analysis: {
        evidence: analysis.evidence,
        storyMode: analysis.storyMode,
        nextSteps: analysis.nextSteps,
        caveat: analysis.caveat,
      },
      relatedReports,
      message: "Report submitted. A redacted public summary will appear after analyst review.",
    });
  } catch (err) {
    console.error("Submit report error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/reports — community intelligence list ──────────────────────────
export const listReportsController = async (req, res) => {
  try {
    const {
      page = 1, limit = 20,
      q, contentType, riskLevel, platform,
      status = "PUBLISHED",
      sortBy = "createdAt", sortOrder = "desc",
      dateFrom, dateTo,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const safeLimit = Math.min(parseInt(limit), 100);

    let conditions = [`status=$1`];
    let params = [status];
    let idx = 2;

    if (contentType) { conditions.push(`"contentType"=$${idx++}`); params.push(contentType); }
    if (riskLevel)   { conditions.push(`"riskLevel"=$${idx++}`);   params.push(riskLevel); }
    if (platform)    { conditions.push(`platform=$${idx++}`);       params.push(platform); }
    if (dateFrom)    { conditions.push(`"createdAt">=$${idx++}`);   params.push(new Date(dateFrom).toISOString()); }
    if (dateTo)      { conditions.push(`"createdAt"<=$${idx++}`);   params.push(new Date(dateTo).toISOString()); }
    if (q) {
      conditions.push(`("publicSummary" ILIKE $${idx} OR platform ILIKE $${idx})`);
      params.push(`%${q}%`); idx++;
    }

    const where = conditions.join(" AND ");
    const validSort = ["createdAt", "riskScore", "riskLevel"].includes(sortBy) ? sortBy : "createdAt";
    const order = sortOrder === "asc" ? "ASC" : "DESC";

    const countRes = await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as total FROM "Report" WHERE ${where}`, ...params
    );
    const total = parseInt(countRes[0].total);

    params.push(safeLimit, offset);
    const reports = await prisma.$queryRawUnsafe(
      `SELECT id,"contentType","publicSummary","riskLevel","riskScore",platform,"targetRegion",
              status,"sourceType","datasetSource","createdAt"
       FROM "Report" WHERE ${where}
       ORDER BY "${validSort}" ${order}
       LIMIT $${idx++} OFFSET $${idx}`,
      ...params
    );

    return res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / safeLimit),
      reports,
    });
  } catch (err) {
    console.error("List reports error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/reports/:id — public report detail ─────────────────────────────
export const getReportController = async (req, res) => {
  try {
    const { id } = req.params;
    const isAnalyst = ["ANALYST", "ADMIN"].includes(req.user?.role);

    const reports = await prisma.$queryRawUnsafe(
      `SELECT id,"contentType","publicSummary","riskLevel","riskScore","evidenceJson","storyModeJson",
              "nextStepsJson",caveat,platform,"targetRegion",status,"sourceType","datasetSource",
              "createdAt","updatedAt"
              ${isAnalyst ? ', "rawContent"' : ''}
       FROM "Report" WHERE id=$1`,
      id
    );

    if (!reports.length)
      return res.status(404).json({ success: false, message: "Report not found" });

    const report = reports[0];

    // Get indicators
    const indicators = await prisma.$queryRawUnsafe(
      `SELECT i.type, i.value, i.metadata, ri.context
       FROM "ReportIndicator" ri JOIN "Indicator" i ON i.id=ri."indicatorId"
       WHERE ri."reportId"=$1`, id
    );

    // Get related reports via shared indicators
    const related = await findRelatedReports(
      indicators.map(i => ({ type: i.type, value: i.value })), id
    );

    // Get analyst review decisions (public-safe info only)
    const decisions = await prisma.$queryRawUnsafe(
      `SELECT rd.status, rd."createdAt", rd.rationale
       FROM "ReviewDecision" rd WHERE rd."reportId"=$1 ORDER BY rd."createdAt" ASC`, id
    );

    // Audit log if analyst
    if (isAnalyst && req.user) {
      await prisma.$queryRawUnsafe(
        `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
         VALUES (gen_random_uuid()::text,$1,$2,'ACCESS_RESTRICTED_DATA',$3,NOW())`,
        req.user.id, id, JSON.stringify({ reason: "analyst_view" })
      );
    }

    return res.json({
      success: true,
      report: { ...report, indicators, statusTimeline: decisions },
      relatedReports: related,
    });
  } catch (err) {
    console.error("Get report error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/reports/:id/dna — Scam DNA comparison ─────────────────────────
export const getScamDNAController = async (req, res) => {
  try {
    const { id } = req.params;
    const { compareWith } = req.query; // optional: compare with specific report ID

    // Get this report's indicators
    const indicators = await prisma.$queryRawUnsafe(
      `SELECT i.type, i.value FROM "ReportIndicator" ri
       JOIN "Indicator" i ON i.id=ri."indicatorId"
       WHERE ri."reportId"=$1`, id
    );

    if (!indicators.length)
      return res.status(404).json({ success: false, message: "Report not found or no indicators" });

    // Get precomputed matches
    let dnaMatches = await prisma.$queryRawUnsafe(
      `SELECT me.*, 
              ra.id as "reportAId", ra."publicSummary" as "summaryA", ra."riskLevel" as "riskLevelA", ra."contentType" as "typeA", ra."createdAt" as "createdAtA",
              rb.id as "reportBId", rb."publicSummary" as "summaryB", rb."riskLevel" as "riskLevelB", rb."contentType" as "typeB", rb."createdAt" as "createdAtB"
       FROM "MatchEvidence" me
       JOIN "Report" ra ON ra.id=me."reportAId"
       JOIN "Report" rb ON rb.id=me."reportBId"
       WHERE me."reportAId"=$1 OR me."reportBId"=$1
       ORDER BY me."similarityScore" DESC`, id
    );

    // Compute real-time DNA if compareWith is specified
    let liveComparison = null;
    if (compareWith && compareWith !== id) {
      const bIndicators = await prisma.$queryRawUnsafe(
        `SELECT i.type, i.value FROM "ReportIndicator" ri
         JOIN "Indicator" i ON i.id=ri."indicatorId"
         WHERE ri."reportId"=$1`, compareWith
      );
      if (bIndicators.length) {
        liveComparison = computeScamDNA(indicators, bIndicators);
      }
    }

    return res.json({
      success: true,
      reportId: id,
      indicators,
      dnaMatches,
      liveComparison,
    });
  } catch (err) {
    console.error("Scam DNA error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/reports/:id/story — Scam Story Mode ────────────────────────────
export const getStoryModeController = async (req, res) => {
  try {
    const { id } = req.params;
    const reports = await prisma.$queryRawUnsafe(
      `SELECT id, "storyModeJson", "evidenceJson", "riskLevel", "publicSummary", "contentType"
       FROM "Report" WHERE id=$1 AND status IN ('PUBLISHED','CORROBORATED')`, id
    );
    if (!reports.length)
      return res.status(404).json({ success: false, message: "Report not found" });

    return res.json({
      success: true,
      reportId: id,
      riskLevel: reports[0].riskLevel,
      publicSummary: reports[0].publicSummary,
      contentType: reports[0].contentType,
      story: reports[0].storyModeJson ?? [],
      evidence: reports[0].evidenceJson ?? [],
    });
  } catch (err) {
    console.error("Story mode error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const buildPublicSummary = (type, analysis) => {
  const tactics = [...new Set(analysis.evidence.map(e => e.tactic).filter(Boolean))];
  const domains = analysis.indicators.filter(i => i.type === "DOMAIN").map(i => i.value);
  const tacticStr = tactics.length ? ` Tactics: ${tactics.slice(0, 2).join(", ")}.` : "";
  const domainStr = domains.length ? ` Suspicious domain(s) detected.` : "";
  return `${type.charAt(0).toUpperCase() + type.slice(1)} with ${analysis.evidence.length} risk signal(s). Risk level: ${analysis.riskLevel}.${tacticStr}${domainStr}`;
};

const findRelatedReports = async (indicators, excludeId) => {
  if (!indicators?.length) return [];
  try {
    const domainValues = indicators.filter(i => i.type === "DOMAIN").map(i => i.value);
    const phoneValues  = indicators.filter(i => i.type === "PHONE").map(i => i.value);
    const tacticValues = indicators.filter(i => i.type === "TACTIC").map(i => i.value);

    const allValues = [...domainValues, ...phoneValues, ...tacticValues];
    if (!allValues.length) return [];

    const placeholders = allValues.map((_, i) => `$${i + 2}`).join(",");
    const rows = await prisma.$queryRawUnsafe(
      `SELECT DISTINCT r.id, r."contentType", r."publicSummary", r."riskLevel", r.platform, r."createdAt",
              i.type as "indicatorType", i.value as "indicatorValue"
       FROM "Report" r
       JOIN "ReportIndicator" ri ON ri."reportId"=r.id
       JOIN "Indicator" i ON i.id=ri."indicatorId"
       WHERE r.id!=$1 AND i.value IN (${placeholders})
         AND r.status IN ('PUBLISHED','CORROBORATED')
       LIMIT 30`,
      excludeId, ...allValues
    );

    const reportMap = new Map();
    for (const row of rows) {
      if (!reportMap.has(row.id)) {
        reportMap.set(row.id, { id: row.id, contentType: row.contentType, publicSummary: row.publicSummary, riskLevel: row.riskLevel, platform: row.platform, createdAt: row.createdAt, matchedIndicators: [], matchCount: 0 });
      }
      const entry = reportMap.get(row.id);
      entry.matchedIndicators.push({ type: row.indicatorType, value: row.indicatorValue });
      entry.matchCount++;
    }

    return Array.from(reportMap.values())
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5)
      .map(({ matchCount, ...r }) => r);
  } catch (_) { return []; }
};
