/**
 * ScamTrace — Create Tables via raw SQL (works via pooled Neon connection)
 * Run: node prisma/create_tables.js
 */
import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const SQL = `
-- ENUMS
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'ANALYST', 'ADMIN');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "ReportStatus" AS ENUM ('RECEIVED', 'UNDER_REVIEW', 'CORROBORATED', 'DISPUTED', 'REJECTED', 'PUBLISHED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "RiskLevel" AS ENUM ('LOW_SIGNAL', 'NEEDS_CAUTION', 'HIGH_RISK');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "IndicatorType" AS ENUM ('DOMAIN', 'URL', 'PHONE', 'EMAIL', 'PHRASE', 'SOCIAL_HANDLE', 'TACTIC', 'BRAND');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "SourceType" AS ENUM ('COMMUNITY', 'SEEDED', 'IMPORTED', 'SYNTHETIC');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE "AuditAction" AS ENUM ('REPORT_SUBMITTED', 'REPORT_REVIEWED', 'REPORT_PUBLISHED', 'REPORT_REJECTED', 'REPORT_DISPUTED', 'INDICATOR_EXTRACTED', 'CASE_NOTE_ADDED', 'ACCESS_RESTRICTED_DATA');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- USER role column
DO $$ BEGIN
  ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'PUBLIC';
EXCEPTION WHEN others THEN null; END $$;

-- INDICATOR TABLE
CREATE TABLE IF NOT EXISTS "Indicator" (
  "id"        TEXT PRIMARY KEY,
  "type"      "IndicatorType" NOT NULL,
  "value"     TEXT NOT NULL,
  "metadata"  JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "Indicator_type_value_key" UNIQUE ("type", "value")
);
CREATE INDEX IF NOT EXISTS "Indicator_type_idx" ON "Indicator" ("type");
CREATE INDEX IF NOT EXISTS "Indicator_value_idx" ON "Indicator" ("value");

-- REPORT TABLE
CREATE TABLE IF NOT EXISTS "Report" (
  "id"             TEXT PRIMARY KEY,
  "submittedById"  TEXT REFERENCES "User"("id") ON DELETE SET NULL,
  "contentType"    TEXT NOT NULL,
  "rawContent"     TEXT NOT NULL,
  "publicSummary"  TEXT,
  "platform"       TEXT,
  "targetRegion"   TEXT,
  "riskLevel"      "RiskLevel" NOT NULL DEFAULT 'NEEDS_CAUTION',
  "riskScore"      FLOAT NOT NULL DEFAULT 0,
  "evidenceJson"   JSONB,
  "storyModeJson"  JSONB,
  "nextStepsJson"  JSONB,
  "caveat"         TEXT,
  "status"         "ReportStatus" NOT NULL DEFAULT 'RECEIVED',
  "sourceType"     "SourceType" NOT NULL DEFAULT 'COMMUNITY',
  "datasetSource"  TEXT,
  "importDate"     TIMESTAMPTZ,
  "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "Report_status_idx" ON "Report" ("status");
CREATE INDEX IF NOT EXISTS "Report_riskLevel_idx" ON "Report" ("riskLevel");
CREATE INDEX IF NOT EXISTS "Report_contentType_idx" ON "Report" ("contentType");
CREATE INDEX IF NOT EXISTS "Report_sourceType_idx" ON "Report" ("sourceType");
CREATE INDEX IF NOT EXISTS "Report_createdAt_idx" ON "Report" ("createdAt");

-- REPORT_INDICATOR (join)
CREATE TABLE IF NOT EXISTS "ReportIndicator" (
  "id"          TEXT PRIMARY KEY,
  "reportId"    TEXT NOT NULL REFERENCES "Report"("id") ON DELETE CASCADE,
  "indicatorId" TEXT NOT NULL REFERENCES "Indicator"("id") ON DELETE CASCADE,
  "context"     TEXT,
  CONSTRAINT "ReportIndicator_reportId_indicatorId_key" UNIQUE ("reportId", "indicatorId")
);
CREATE INDEX IF NOT EXISTS "ReportIndicator_reportId_idx" ON "ReportIndicator" ("reportId");
CREATE INDEX IF NOT EXISTS "ReportIndicator_indicatorId_idx" ON "ReportIndicator" ("indicatorId");

-- MATCH EVIDENCE (Scam DNA)
CREATE TABLE IF NOT EXISTS "MatchEvidence" (
  "id"              TEXT PRIMARY KEY,
  "reportAId"       TEXT NOT NULL REFERENCES "Report"("id") ON DELETE CASCADE,
  "reportBId"       TEXT NOT NULL REFERENCES "Report"("id") ON DELETE CASCADE,
  "similarityScore" FLOAT NOT NULL,
  "matchedClues"    JSONB NOT NULL,
  "differences"     JSONB NOT NULL,
  "createdAt"       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT "MatchEvidence_reportAId_reportBId_key" UNIQUE ("reportAId", "reportBId")
);
CREATE INDEX IF NOT EXISTS "MatchEvidence_reportAId_idx" ON "MatchEvidence" ("reportAId");
CREATE INDEX IF NOT EXISTS "MatchEvidence_reportBId_idx" ON "MatchEvidence" ("reportBId");
CREATE INDEX IF NOT EXISTS "MatchEvidence_score_idx" ON "MatchEvidence" ("similarityScore");

-- REVIEW DECISION
CREATE TABLE IF NOT EXISTS "ReviewDecision" (
  "id"         TEXT PRIMARY KEY,
  "reportId"   TEXT NOT NULL REFERENCES "Report"("id") ON DELETE CASCADE,
  "reviewerId" TEXT NOT NULL REFERENCES "User"("id"),
  "status"     "ReportStatus" NOT NULL,
  "rationale"  TEXT NOT NULL,
  "redactions" JSONB,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "ReviewDecision_reportId_idx" ON "ReviewDecision" ("reportId");
CREATE INDEX IF NOT EXISTS "ReviewDecision_reviewerId_idx" ON "ReviewDecision" ("reviewerId");

-- CASE NOTE
CREATE TABLE IF NOT EXISTS "CaseNote" (
  "id"        TEXT PRIMARY KEY,
  "reportId"  TEXT NOT NULL REFERENCES "Report"("id") ON DELETE CASCADE,
  "authorId"  TEXT NOT NULL REFERENCES "User"("id"),
  "content"   TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "CaseNote_reportId_idx" ON "CaseNote" ("reportId");

-- AUDIT EVENT
CREATE TABLE IF NOT EXISTS "AuditEvent" (
  "id"        TEXT PRIMARY KEY,
  "userId"    TEXT REFERENCES "User"("id"),
  "reportId"  TEXT REFERENCES "Report"("id"),
  "action"    "AuditAction" NOT NULL,
  "detail"    JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "AuditEvent_userId_idx" ON "AuditEvent" ("userId");
CREATE INDEX IF NOT EXISTS "AuditEvent_reportId_idx" ON "AuditEvent" ("reportId");
CREATE INDEX IF NOT EXISTS "AuditEvent_action_idx" ON "AuditEvent" ("action");
CREATE INDEX IF NOT EXISTS "AuditEvent_createdAt_idx" ON "AuditEvent" ("createdAt");

-- TREND SNAPSHOT
CREATE TABLE IF NOT EXISTS "TrendSnapshot" (
  "id"          TEXT PRIMARY KEY,
  "date"        DATE NOT NULL,
  "contentType" TEXT,
  "riskLevel"   "RiskLevel",
  "tactic"      TEXT,
  "reportCount" INT NOT NULL DEFAULT 0,
  "sampleReport" TEXT,
  "reportId"    TEXT REFERENCES "Report"("id"),
  "createdAt"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "TrendSnapshot_date_idx" ON "TrendSnapshot" ("date");
CREATE INDEX IF NOT EXISTS "TrendSnapshot_contentType_idx" ON "TrendSnapshot" ("contentType");
CREATE INDEX IF NOT EXISTS "TrendSnapshot_riskLevel_idx" ON "TrendSnapshot" ("riskLevel");
`;

async function main() {
  console.log("🔧 Creating ScamTrace tables via pooled connection...");
  const client = await pool.connect();
  try {
    await client.query(SQL);
    console.log("✅ All tables created successfully!");

    const { rows } = await client.query(
      `SELECT table_name FROM information_schema.tables 
       WHERE table_schema='public' AND table_name IN 
       ('Report','Indicator','ReportIndicator','MatchEvidence','ReviewDecision','CaseNote','AuditEvent','TrendSnapshot')
       ORDER BY table_name`
    );
    console.log("📊 ScamTrace tables in DB:", rows.map(r => r.table_name));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error("❌", e.message); process.exit(1); });
