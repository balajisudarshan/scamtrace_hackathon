/**
 * Admin / Analyst API
 * Portal B: SCAMTRACE Intelligence Desk
 * All routes require ANALYST or ADMIN role.
 */
import { prisma } from "../../lib/prisma.js";
import { computeScamDNA } from "../../lib/similarityMatcher.js";

// ─── GET /api/admin/queue — Triage Queue ─────────────────────────────────────
export const getTriageQueueController = async (req, res) => {
  try {
    const { status = "RECEIVED", page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const safeLimit = Math.min(parseInt(limit), 100);

    const validStatus = ["RECEIVED", "UNDER_REVIEW", "CORROBORATED", "DISPUTED", "REJECTED", "PUBLISHED"];
    const safeStatus = validStatus.includes(status) ? status : "RECEIVED";

    const countRes = await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as total FROM "Report" WHERE status=$1`, safeStatus
    );
    const total = parseInt(countRes[0].total);

    const reports = await prisma.$queryRawUnsafe(
      `SELECT r.id, r."contentType", r."rawContent", r."publicSummary", r."riskLevel", r."riskScore",
              r.platform, r.status, r."sourceType", r."datasetSource", r."createdAt",
              (SELECT COUNT(*) FROM "ReportIndicator" ri WHERE ri."reportId"=r.id) as "indicatorCount",
              u.email as "submittedByEmail"
       FROM "Report" r
       LEFT JOIN "User" u ON u.id=r."submittedById"
       WHERE r.status=$1
       ORDER BY r."riskScore" DESC, r."createdAt" DESC
       LIMIT $2 OFFSET $3`,
      safeStatus, safeLimit, offset
    );

    return res.json({ success: true, total, page: parseInt(page), totalPages: Math.ceil(total / safeLimit), reports });
  } catch (err) {
    console.error("Triage queue error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/admin/reports/:id — Full analyst case view ─────────────────────
export const getAnalystCaseController = async (req, res) => {
  try {
    const { id } = req.params;

    const reports = await prisma.$queryRawUnsafe(
      `SELECT r.*, u.email as "submittedByEmail"
       FROM "Report" r LEFT JOIN "User" u ON u.id=r."submittedById"
       WHERE r.id=$1`, id
    );
    if (!reports.length) return res.status(404).json({ success: false, message: "Report not found" });

    const report = reports[0];

    const indicators = await prisma.$queryRawUnsafe(
      `SELECT i.type, i.value, i.metadata, ri.context
       FROM "ReportIndicator" ri JOIN "Indicator" i ON i.id=ri."indicatorId"
       WHERE ri."reportId"=$1`, id
    );

    const decisions = await prisma.$queryRawUnsafe(
      `SELECT rd.*, u.email as "reviewerEmail"
       FROM "ReviewDecision" rd JOIN "User" u ON u.id=rd."reviewerId"
       WHERE rd."reportId"=$1 ORDER BY rd."createdAt" ASC`, id
    );

    const caseNotes = await prisma.$queryRawUnsafe(
      `SELECT cn.*, u.email as "authorEmail"
       FROM "CaseNote" cn JOIN "User" u ON u.id=cn."authorId"
       WHERE cn."reportId"=$1 ORDER BY cn."createdAt" ASC`, id
    );

    const auditLog = await prisma.$queryRawUnsafe(
      `SELECT ae.action, ae.detail, ae."createdAt", u.email as "userEmail"
       FROM "AuditEvent" ae LEFT JOIN "User" u ON u.id=ae."userId"
       WHERE ae."reportId"=$1 ORDER BY ae."createdAt" ASC`, id
    );

    // Log access
    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,'ACCESS_RESTRICTED_DATA',$3,NOW())`,
      req.user.id, id, JSON.stringify({ reason: "analyst_case_detail" })
    );

    return res.json({ success: true, report, indicators, decisions, caseNotes, auditLog });
  } catch (err) {
    console.error("Analyst case error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── POST /api/admin/reports/:id/review — Review decision ────────────────────
export const reviewReportController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rationale, publicSummary, redactions } = req.body;

    const validStatus = ["UNDER_REVIEW", "CORROBORATED", "DISPUTED", "REJECTED", "PUBLISHED"];
    if (!validStatus.includes(status))
      return res.status(400).json({ success: false, message: `status must be one of: ${validStatus.join(", ")}` });

    if (!rationale || rationale.length < 10)
      return res.status(400).json({ success: false, message: "rationale is required (min 10 chars)" });

    const existing = await prisma.$queryRawUnsafe(`SELECT id FROM "Report" WHERE id=$1`, id);
    if (!existing.length) return res.status(404).json({ success: false, message: "Report not found" });

    // Update report status
    const updateFields = [`status='${status}'`, `"updatedAt"=NOW()`];
    if (publicSummary) updateFields.push(`"publicSummary"=$2`);
    
    if (publicSummary) {
      await prisma.$queryRawUnsafe(
        `UPDATE "Report" SET status=$1, "publicSummary"=$2, "updatedAt"=NOW() WHERE id=$3`,
        status, publicSummary, id
      );
    } else {
      await prisma.$queryRawUnsafe(
        `UPDATE "Report" SET status=$1, "updatedAt"=NOW() WHERE id=$2`,
        status, id
      );
    }

    // Record decision
    await prisma.$queryRawUnsafe(
      `INSERT INTO "ReviewDecision" (id,"reportId","reviewerId",status,rationale,redactions,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,$4,$5,NOW())`,
      id, req.user.id, status, rationale, JSON.stringify(redactions ?? [])
    );

    // Audit
    const actionMap = { PUBLISHED: "REPORT_PUBLISHED", REJECTED: "REPORT_REJECTED", DISPUTED: "REPORT_DISPUTED" };
    const action = actionMap[status] ?? "REPORT_REVIEWED";
    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,$4,NOW())`,
      req.user.id, id, action, JSON.stringify({ status, rationale: rationale.slice(0, 200) })
    );

    return res.json({ success: true, reportId: id, newStatus: status, message: `Report marked as ${status}` });
  } catch (err) {
    console.error("Review report error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── POST /api/admin/reports/:id/notes — Add case note ───────────────────────
export const addCaseNoteController = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.length < 5)
      return res.status(400).json({ success: false, message: "content is required (min 5 chars)" });

    const noteId = await prisma.$queryRawUnsafe(
      `INSERT INTO "CaseNote" (id,"reportId","authorId",content,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,NOW()) RETURNING id`,
      id, req.user.id, content
    );

    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,'CASE_NOTE_ADDED',$3,NOW())`,
      req.user.id, id, JSON.stringify({ noteLength: content.length })
    );

    return res.status(201).json({ success: true, noteId: noteId[0].id });
  } catch (err) {
    console.error("Add case note error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/admin/dna/compare — Scam DNA compare two reports ───────────────
export const compareDNAController = async (req, res) => {
  try {
    const { reportA, reportB } = req.query;
    if (!reportA || !reportB)
      return res.status(400).json({ success: false, message: "reportA and reportB query params required" });

    const [aInds, bInds, aReport, bReport] = await Promise.all([
      prisma.$queryRawUnsafe(
        `SELECT i.type, i.value, i.metadata FROM "ReportIndicator" ri JOIN "Indicator" i ON i.id=ri."indicatorId" WHERE ri."reportId"=$1`, reportA
      ),
      prisma.$queryRawUnsafe(
        `SELECT i.type, i.value, i.metadata FROM "ReportIndicator" ri JOIN "Indicator" i ON i.id=ri."indicatorId" WHERE ri."reportId"=$1`, reportB
      ),
      prisma.$queryRawUnsafe(`SELECT id,"contentType","rawContent","publicSummary","riskLevel","evidenceJson","storyModeJson","createdAt",platform FROM "Report" WHERE id=$1`, reportA),
      prisma.$queryRawUnsafe(`SELECT id,"contentType","rawContent","publicSummary","riskLevel","evidenceJson","storyModeJson","createdAt",platform FROM "Report" WHERE id=$1`, reportB),
    ]);

    if (!aReport.length || !bReport.length)
      return res.status(404).json({ success: false, message: "One or both reports not found" });

    const dna = computeScamDNA(aInds, bInds);

    // Check if precomputed match exists
    const precomputed = await prisma.$queryRawUnsafe(
      `SELECT * FROM "MatchEvidence" WHERE ("reportAId"=$1 AND "reportBId"=$2) OR ("reportAId"=$2 AND "reportBId"=$1)`,
      reportA, reportB
    );

    // Persist computed match if not exists
    if (!precomputed.length && dna.matchedClues.length > 0) {
      try {
        await prisma.$queryRawUnsafe(
          `INSERT INTO "MatchEvidence" (id,"reportAId","reportBId","similarityScore","matchedClues",differences,"createdAt")
           VALUES (gen_random_uuid()::text,$1,$2,$3,$4,$5,NOW()) ON CONFLICT DO NOTHING`,
          reportA, reportB, dna.similarityScore, JSON.stringify(dna.matchedClues), JSON.stringify(dna.differences)
        );
      } catch (_) {}
    }

    return res.json({
      success: true,
      reportA: { ...aReport[0], indicators: aInds },
      reportB: { ...bReport[0], indicators: bInds },
      dna: precomputed.length ? precomputed[0] : dna,
    });
  } catch (err) {
    console.error("DNA compare error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Helper: fix BigInt in query results
const fixBigInt = (arr) => arr.map(row =>
  Object.fromEntries(Object.entries(row).map(([k,v]) => [k, typeof v === 'bigint' ? Number(v) : v]))
);

// ─── GET /api/admin/stats — Analyst overview ─────────────────────────────────
export const getStatsController = async (req, res) => {
  try {
    const [statusCounts, riskCounts, typeCounts, recent] = await Promise.all([
      prisma.$queryRawUnsafe(`SELECT status, COUNT(*)::int as count FROM "Report" GROUP BY status`),
      prisma.$queryRawUnsafe(`SELECT "riskLevel", COUNT(*)::int as count FROM "Report" GROUP BY "riskLevel"`),
      prisma.$queryRawUnsafe(`SELECT "contentType", COUNT(*)::int as count FROM "Report" GROUP BY "contentType"`),
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "Report" WHERE "createdAt" >= NOW() - INTERVAL '24 hours'`),
    ]);

    const [indicatorCount, matchCount] = await Promise.all([
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "Indicator"`),
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "MatchEvidence"`),
    ]);

    return res.json({
      success: true,
      stats: {
        reportsByStatus: fixBigInt(statusCounts),
        reportsByRisk: fixBigInt(riskCounts),
        reportsByType: fixBigInt(typeCounts),
        reportsLast24h: Number(recent[0].count),
        totalIndicators: Number(indicatorCount[0].count),
        totalDNAMatches: Number(matchCount[0].count),
      },
    });
  } catch (err) {
    console.error("Stats error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/admin/pattern-radar — Pattern Radar ────────────────────────────
export const getPatternRadarController = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const safeDays = Math.min(parseInt(days) || 30, 365);

    const [tactics, domains, phones, platforms] = await Promise.all([
      prisma.$queryRawUnsafe(
        `SELECT i.value as tactic, COUNT(DISTINCT ri."reportId")::int as "reportCount"
         FROM "Indicator" i JOIN "ReportIndicator" ri ON ri."indicatorId"=i.id
         JOIN "Report" r ON r.id=ri."reportId"
         WHERE i.type='TACTIC' AND r."createdAt" >= NOW() - INTERVAL '${safeDays} days'
         GROUP BY i.value ORDER BY "reportCount" DESC LIMIT 10`
      ),
      prisma.$queryRawUnsafe(
        `SELECT i.value as domain, i.metadata, COUNT(DISTINCT ri."reportId")::int as "reportCount"
         FROM "Indicator" i JOIN "ReportIndicator" ri ON ri."indicatorId"=i.id
         JOIN "Report" r ON r.id=ri."reportId"
         WHERE i.type='DOMAIN' AND r."createdAt" >= NOW() - INTERVAL '${safeDays} days'
         GROUP BY i.value, i.metadata ORDER BY "reportCount" DESC LIMIT 10`
      ),
      prisma.$queryRawUnsafe(
        `SELECT i.value as phone, i.metadata, COUNT(DISTINCT ri."reportId")::int as "reportCount"
         FROM "Indicator" i JOIN "ReportIndicator" ri ON ri."indicatorId"=i.id
         JOIN "Report" r ON r.id=ri."reportId"
         WHERE i.type='PHONE' AND r."createdAt" >= NOW() - INTERVAL '${safeDays} days'
         GROUP BY i.value, i.metadata ORDER BY "reportCount" DESC LIMIT 10`
      ),
      prisma.$queryRawUnsafe(
        `SELECT platform, COUNT(*)::int as "reportCount" FROM "Report"
         WHERE "createdAt" >= NOW() - INTERVAL '${safeDays} days' AND platform IS NOT NULL
         GROUP BY platform ORDER BY "reportCount" DESC`
      ),
    ]);

    return res.json({ success: true, windowDays: safeDays,
      tactics: fixBigInt(tactics),
      domains: fixBigInt(domains),
      phones: fixBigInt(phones),
      platforms: fixBigInt(platforms),
    });
  } catch (err) {
    console.error("Pattern radar error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── GET /api/admin/audit — Audit log ────────────────────────────────────────
export const getAuditLogController = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const events = await prisma.$queryRawUnsafe(
      `SELECT ae.id, ae.action, ae.detail, ae."createdAt",
              u.email as "userEmail", ae."reportId"
       FROM "AuditEvent" ae LEFT JOIN "User" u ON u.id=ae."userId"
       ORDER BY ae."createdAt" DESC
       LIMIT $1 OFFSET $2`,
      parseInt(limit), offset
    );

    return res.json({ success: true, events });
  } catch (err) {
    console.error("Audit log error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
