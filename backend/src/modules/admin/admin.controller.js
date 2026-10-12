/**
 * Admin / Analyst API
 * Portal B: SCAMTRACE Intelligence Desk
 * All routes require ANALYST or ADMIN role.
 */
import { prisma } from "../../lib/prisma.js";
import { computeScamDNA } from "../../lib/similarityMatcher.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper: fix BigInt in query results
const fixBigInt = (arr) => {
  if (!Array.isArray(arr)) return arr;
  return arr.map(row =>
    Object.fromEntries(Object.entries(row).map(([k,v]) => [k, typeof v === 'bigint' ? Number(v) : v]))
  );
};

// ─── GET /api/admin/queue — Triage Queue ─────────────────────────────────────
export const getTriageQueueController = async (req, res) => {
  try {
    const { status, contentType, riskLevel, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const safeLimit = Math.min(parseInt(limit), 100);

    const conditions = [];
    const params = [];
    let idx = 1;

    const validStatus = ["RECEIVED", "UNDER_REVIEW", "CORROBORATED", "DISPUTED", "REJECTED", "PUBLISHED"];
    const normStatus = status ? status.toUpperCase() : "RECEIVED";
    if (normStatus !== "ALL" && validStatus.includes(normStatus)) {
      conditions.push(`r.status::text = $${idx++}`);
      params.push(normStatus);
    }

    if (contentType && contentType !== "ALL") {
      conditions.push(`LOWER(r."contentType") = LOWER($${idx++})`);
      params.push(contentType);
    }

    if (riskLevel && riskLevel !== "ALL") {
      conditions.push(`r."riskLevel"::text = $${idx++}`);
      params.push(riskLevel);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const countRes = await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) as total FROM "Report" r ${whereClause}`, ...params
    );
    const total = parseInt(countRes[0].total);

    const reports = await prisma.$queryRawUnsafe(
      `SELECT r.id, r."contentType", r."rawContent", r."publicSummary", r."riskLevel", r."riskScore",
              r.platform, r.status, r."sourceType", r."datasetSource", r."createdAt",
              (SELECT COUNT(*)::int FROM "ReportIndicator" ri WHERE ri."reportId"=r.id) as "indicatorCount",
              u.email as "submittedByEmail"
       FROM "Report" r
       LEFT JOIN "User" u ON u.id=r."submittedById"
       ${whereClause}
       ORDER BY r."riskScore" DESC, r."createdAt" DESC
       LIMIT $${idx++} OFFSET $${idx++}`,
      ...params, safeLimit, offset
    );

    return res.json({ success: true, total, page: parseInt(page), totalPages: Math.ceil(total / safeLimit) || 1, reports: fixBigInt(reports) });
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
    const analystId = req.user?.id || req.user?.userId || null;
    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,'ACCESS_RESTRICTED_DATA',$3,NOW())`,
      analystId, id, JSON.stringify({ reason: "analyst_case_detail" })
    );

    // Look up targeted brand profile if available for asset comparison
    let brandProfile = null;
    try {
      const brandInd = indicators.find(i => i.type === 'BRAND');
      let brandTargetName = brandInd?.value;
      if (!brandTargetName) {
        try {
          const parsed = JSON.parse(report.rawContent);
          brandTargetName = parsed.targetBrand;
        } catch (_) {}
      }
      if (brandTargetName) {
        const bRows = await prisma.$queryRawUnsafe(
          `SELECT * FROM "BrandProfile" WHERE LOWER(name) = LOWER($1) OR id = $1 LIMIT 1`,
          brandTargetName
        );
        if (bRows.length) brandProfile = bRows[0];
      }
    } catch (_) {}

    return res.json({ success: true, report, indicators, decisions, caseNotes, auditLog, brandProfile });
  } catch (err) {
    console.error("Analyst case error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── POST /api/admin/login — Dedicated Administrator Login ───────────────────
export const adminLoginController = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const identifier = String(email || username || "").trim();

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "Email/username and password are required" });
    }

    // Check DB user by email
    let user = null;
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { email: { equals: identifier, mode: "insensitive" } },
          ],
        },
      });
      user = users[0];
    } catch (_) {}

    // Fallback: if username is "admin", match admin@scamtrace.dev
    if (!user && (identifier.toLowerCase() === "admin" || !identifier.includes("@"))) {
      try {
        user = await prisma.user.findUnique({ where: { email: "admin@scamtrace.dev" } });
      } catch (_) {}
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid administrator credentials" });
    }

    if (!user.password) {
      return res.status(401).json({ success: false, message: "Password authentication is not configured for this account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid administrator credentials" });
    }

    // Role check
    let role = "PUBLIC";
    try {
      const roleRows = await prisma.$queryRawUnsafe(`SELECT role FROM "User" WHERE id=$1`, user.id);
      role = roleRows[0]?.role ?? "PUBLIC";
    } catch (_) {}

    if (role !== "ADMIN" && role !== "ANALYST") {
      return res.status(403).json({ success: false, message: "Access denied. Administrator privileges required." });
    }

    const token = jwt.sign(
      { userId: user.id, id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Administrator authenticated successfully",
      token,
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, message: "Administrator authentication error" });
  }
};

// ─── POST /api/admin/reports/:id/review — Review decision ────────────────────
export const reviewReportController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rationale, publicSummary, redactions } = req.body;
    const reviewerId = req.user?.id || req.user?.userId || null;

    const statusMap = {
      NEW: "RECEIVED",
      RECEIVED: "RECEIVED",
      UNDER_REVIEW: "UNDER_REVIEW",
      "UNDER REVIEW": "UNDER_REVIEW",
      CONFIRMED_SCAM: "CORROBORATED",
      "CONFIRMED SCAM": "CORROBORATED",
      CORROBORATED: "CORROBORATED",
      PUBLISHED: "PUBLISHED",
      DISMISSED: "REJECTED",
      REJECTED: "REJECTED",
      DUPLICATE: "DISPUTED",
      DISPUTED: "DISPUTED",
    };

    const targetStatus = statusMap[String(status || "").toUpperCase().trim()] || status;
    const validStatus = ["RECEIVED", "UNDER_REVIEW", "CORROBORATED", "DISPUTED", "REJECTED", "PUBLISHED"];
    if (!validStatus.includes(targetStatus)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: New, Under Review, Confirmed Scam, Dismissed, Duplicate (or ${validStatus.join(", ")})`,
      });
    }

    const reviewRationale = rationale && rationale.trim().length >= 3 ? rationale.trim() : `Status marked as ${targetStatus} by administrator`;

    const existing = await prisma.$queryRawUnsafe(`SELECT id FROM "Report" WHERE id=$1`, id);
    if (!existing.length) return res.status(404).json({ success: false, message: "Report not found" });

    // Update report status
    if (publicSummary) {
      await prisma.$queryRawUnsafe(
        `UPDATE "Report" SET status=$1, "publicSummary"=$2, "updatedAt"=NOW() WHERE id=$3`,
        targetStatus, publicSummary, id
      );
    } else {
      await prisma.$queryRawUnsafe(
        `UPDATE "Report" SET status=$1, "updatedAt"=NOW() WHERE id=$2`,
        targetStatus, id
      );
    }

    // Record decision
    await prisma.$queryRawUnsafe(
      `INSERT INTO "ReviewDecision" (id,"reportId","reviewerId",status,rationale,redactions,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,$4,$5,NOW())`,
      id, reviewerId, targetStatus, reviewRationale, JSON.stringify(redactions ?? [])
    );

    // Audit
    const actionMap = { PUBLISHED: "REPORT_PUBLISHED", REJECTED: "REPORT_REJECTED", DISPUTED: "REPORT_DISPUTED", CORROBORATED: "REPORT_CONFIRMED" };
    const action = actionMap[targetStatus] ?? "REPORT_REVIEWED";
    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,$4,NOW())`,
      reviewerId, id, action, JSON.stringify({ status: targetStatus, rationale: reviewRationale.slice(0, 200) })
    );

    return res.json({ success: true, reportId: id, newStatus: targetStatus, message: `Report marked as ${targetStatus}` });
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
    const authorId = req.user?.id || req.user?.userId || null;

    if (!content || content.trim().length < 2)
      return res.status(400).json({ success: false, message: "content is required" });

    const noteId = await prisma.$queryRawUnsafe(
      `INSERT INTO "CaseNote" (id,"reportId","authorId",content,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,$3,NOW()) RETURNING id`,
      id, authorId, content.trim()
    );

    await prisma.$queryRawUnsafe(
      `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
       VALUES (gen_random_uuid()::text,$1,$2,'CASE_NOTE_ADDED',$3,NOW())`,
      authorId, id, JSON.stringify({ noteLength: content.trim().length })
    );

    return res.status(201).json({ success: true, noteId: noteId[0].id, message: "Internal note added successfully" });
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


// ─── GET /api/admin/stats — Analyst overview ─────────────────────────────────
// ─── GET /api/admin/stats — Admin / Analyst overview metrics ─────────────────
export const getStatsController = async (req, res) => {
  try {
    const [statusCounts, riskCounts, typeCounts, recent, totalRes] = await Promise.all([
      prisma.$queryRawUnsafe(`SELECT status, COUNT(*)::int as count FROM "Report" GROUP BY status`),
      prisma.$queryRawUnsafe(`SELECT "riskLevel", COUNT(*)::int as count FROM "Report" GROUP BY "riskLevel"`),
      prisma.$queryRawUnsafe(`SELECT "contentType", COUNT(*)::int as count FROM "Report" GROUP BY "contentType"`),
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "Report" WHERE "createdAt" >= NOW() - INTERVAL '24 hours'`),
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "Report"`),
    ]);

    const [indicatorCount, matchCount] = await Promise.all([
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "Indicator"`),
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "MatchEvidence"`),
    ]);

    const counts = fixBigInt(statusCounts);
    const statusMapObj = {};
    counts.forEach((c) => {
      statusMapObj[c.status] = Number(c.count);
    });

    const totalCount = Number(totalRes[0]?.count || 0);
    const summary = {
      total: totalCount,
      newReports: statusMapObj["RECEIVED"] || 0,
      underReview: statusMapObj["UNDER_REVIEW"] || 0,
      confirmedScams: (statusMapObj["CORROBORATED"] || 0) + (statusMapObj["PUBLISHED"] || 0),
      dismissedOrDuplicate: (statusMapObj["REJECTED"] || 0) + (statusMapObj["DISPUTED"] || 0),
    };

    return res.json({
      success: true,
      summary,
      stats: {
        ...summary,
        reportsByStatus: counts,
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
