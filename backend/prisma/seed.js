/**
 * ScamTrace — Comprehensive Seed Script
 *
 * Data sources (pre-trained / published datasets, clearly labeled as SEEDED/IMPORTED):
 *  - Hinglish & English Scam Text Dataset (HuggingFace: madhurajput/Hinglish-English-Scam-Text-Dataset)
 *  - NCSU SMS Phishing Campaign Dataset patterns (inspired by)
 *  - PhishTank-inspired URL indicators
 *  - ealvaradob/phishing-dataset URL patterns
 *
 * All records labeled sourceType=SEEDED or IMPORTED. Never presented as live threat intel.
 * Run: node prisma/seed.js
 */
import "dotenv/config";
import pg from "pg";
import bcrypt from "bcrypt";
import { createId } from "@paralleldrive/cuid2";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ─── Helpers ────────────────────────────────────────────────────────────────
const cuid = () => createId();
const now = () => new Date().toISOString();
const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

async function upsertIndicator(client, type, value, metadata) {
  const existing = await client.query(
    `SELECT id FROM "Indicator" WHERE type=$1 AND value=$2`,
    [type, value]
  );
  if (existing.rows.length) return existing.rows[0].id;
  const id = cuid();
  await client.query(
    `INSERT INTO "Indicator" (id, type, value, metadata, "createdAt") VALUES ($1,$2,$3,$4,$5)`,
    [id, type, value, JSON.stringify(metadata), now()]
  );
  return id;
}

async function linkIndicator(client, reportId, indicatorId, context) {
  try {
    await client.query(
      `INSERT INTO "ReportIndicator" (id, "reportId", "indicatorId", context) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`,
      [cuid(), reportId, indicatorId, context]
    );
  } catch (_) {}
}

async function insertReport(client, data) {
  const id = cuid();
  await client.query(
    `INSERT INTO "Report" (id,"submittedById","contentType","rawContent","publicSummary",
      platform,"targetRegion","riskLevel","riskScore","evidenceJson","storyModeJson",
      "nextStepsJson",caveat,status,"sourceType","datasetSource","importDate","createdAt","updatedAt")
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
    [
      id,
      data.submittedById ?? null,
      data.contentType,
      data.rawContent,
      data.publicSummary,
      data.platform ?? null,
      data.targetRegion ?? "IN",
      data.riskLevel,
      data.riskScore,
      JSON.stringify(data.evidenceJson ?? []),
      JSON.stringify(data.storyModeJson ?? []),
      JSON.stringify(data.nextStepsJson ?? []),
      data.caveat ?? null,
      data.status ?? "PUBLISHED",
      data.sourceType ?? "SEEDED",
      data.datasetSource ?? null,
      data.importDate ?? now(),
      data.createdAt ?? now(),
      data.createdAt ?? now(),
    ]
  );
  return id;
}

async function insertAudit(client, userId, reportId, action, detail) {
  await client.query(
    `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt") VALUES ($1,$2,$3,$4,$5,$6)`,
    [cuid(), userId, reportId, action, JSON.stringify(detail), now()]
  );
}

async function insertMatchEvidence(client, reportAId, reportBId, score, matchedClues, differences) {
  try {
    await client.query(
      `INSERT INTO "MatchEvidence" (id,"reportAId","reportBId","similarityScore","matchedClues",differences,"createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
      [cuid(), reportAId, reportBId, score, JSON.stringify(matchedClues), JSON.stringify(differences), now()]
    );
  } catch (_) {}
}

async function insertTrend(client, date, contentType, riskLevel, tactic, count, sampleReportId) {
  await client.query(
    `INSERT INTO "TrendSnapshot" (id,date,"contentType","riskLevel",tactic,"reportCount","sampleReport","createdAt")
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [cuid(), date, contentType, riskLevel, tactic, count, sampleReportId, now()]
  );
}

// ────────────────────────────────────────────────────────────────────────────
async function main() {
  const client = await pool.connect();
  console.log("🌱 Seeding ScamTrace database with HuggingFace-inspired pretrained data...\n");

  try {
    // ── 1. Users ──────────────────────────────────────────────────────────
    console.log("👤 Creating users...");
    const analystHash = await bcrypt.hash("analyst123", 10);
    const adminHash = await bcrypt.hash("admin123", 10);
    const userHash = await bcrypt.hash("user123", 10);

    const analystRes = await client.query(
      `INSERT INTO "User" (id,email,password,"firstName","lastName",role,"createdAt","updatedAt")
       VALUES ($1,$2,$3,$4,$5,'ANALYST',$6,$7)
       ON CONFLICT (email) DO UPDATE SET role='ANALYST', "firstName"=$4, "lastName"=$5 RETURNING id`,
      [cuid(), "analyst@scamtrace.dev", analystHash, "Priya", "Sharma", daysAgo(30), daysAgo(1)]
    );
    const analystId = analystRes.rows[0].id;

    const adminRes = await client.query(
      `INSERT INTO "User" (id,email,password,"firstName","lastName",role,"createdAt","updatedAt")
       VALUES ($1,$2,$3,$4,$5,'ADMIN',$6,$7)
       ON CONFLICT (email) DO UPDATE SET role='ADMIN', "firstName"=$4, "lastName"=$5 RETURNING id`,
      [cuid(), "admin@scamtrace.dev", adminHash, "Arjun", "Admin", daysAgo(60), daysAgo(1)]
    );
    const adminId = adminRes.rows[0].id;

    const userRes = await client.query(
      `INSERT INTO "User" (id,email,password,"firstName","lastName",role,"createdAt","updatedAt")
       VALUES ($1,$2,$3,$4,$5,'PUBLIC',$6,$7)
       ON CONFLICT (email) DO UPDATE SET role='PUBLIC' RETURNING id`,
      [cuid(), "user@scamtrace.dev", userHash, "Ravi", "Kumar", daysAgo(20), daysAgo(2)]
    );
    const userId = userRes.rows[0].id;
    console.log(`   ✅ analyst@scamtrace.dev / admin@scamtrace.dev / user@scamtrace.dev`);

    // ── 2. Indicators ─────────────────────────────────────────────────────
    console.log("\n📌 Seeding indicators from phishing/scam datasets...");

    // === DOMAINS from phishing datasets (PhishTank + ealvaradob patterns) ===
    const domainMap = {};
    const domainSeeds = [
      // Bank impersonation (NCSU / HuggingFace patterns)
      { value: "sbi-secure-login.co.in",      meta: { brand: "SBI",    tactic: "bank_impersonation",       source: "NCSU_SMS_Phishing", firstSeen: "2024-01-15" }},
      { value: "hdfc-kyc-update.net",          meta: { brand: "HDFC",   tactic: "bank_impersonation",       source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-02-10" }},
      { value: "icici-verify-now.in",          meta: { brand: "ICICI",  tactic: "bank_impersonation",       source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-03-05" }},
      { value: "axis-bank-update.com",         meta: { brand: "Axis",   tactic: "bank_impersonation",       source: "NCSU_SMS_Phishing", firstSeen: "2024-01-28" }},
      { value: "sbionline-login.in",           meta: { brand: "SBI",    tactic: "bank_impersonation",       source: "PhishTank_snapshot", firstSeen: "2023-11-20" }},
      // Government impersonation
      { value: "aadhaar-verify-now.in",        meta: { brand: "UIDAI",  tactic: "government_impersonation", source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-04-01" }},
      { value: "incometax-refund-claim.com",   meta: { brand: "IncomeTax", tactic: "government_impersonation", source: "NCSU_SMS_Phishing", firstSeen: "2024-01-10" }},
      { value: "epfo-pf-withdraw.co.in",       meta: { brand: "EPFO",   tactic: "government_impersonation", source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-05-12" }},
      { value: "rbi-kyc-compliance.in",        meta: { brand: "RBI",    tactic: "government_impersonation", source: "NCSU_SMS_Phishing", firstSeen: "2024-03-18" }},
      // Reward scams
      { value: "paytm-cashback-win.com",       meta: { brand: "Paytm",  tactic: "reward_lure",              source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-02-20" }},
      { value: "amazon-lucky-winner.in",       meta: { brand: "Amazon", tactic: "reward_lure",              source: "PhishTank_snapshot", firstSeen: "2023-12-05" }},
      { value: "flipkart-prize-claim.com",     meta: { brand: "Flipkart", tactic: "reward_lure",            source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-01-30" }},
      { value: "jio-recharge-free.co.in",      meta: { brand: "Jio",    tactic: "reward_lure",              source: "NCSU_SMS_Phishing", firstSeen: "2024-04-15" }},
      // Loan fraud
      { value: "instant-loan-approved.in",     meta: { brand: null,     tactic: "loan_fraud",               source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-03-25" }},
      { value: "easy-loan-5min.com",           meta: { brand: null,     tactic: "loan_fraud",               source: "NCSU_SMS_Phishing", firstSeen: "2024-02-15" }},
      // URL shorteners (always suspicious in scam context)
      { value: "bit.ly",                       meta: { tactic: "url_shortener", source: "OpenPhish", firstSeen: "2023-01-01" }},
      { value: "tinyurl.com",                  meta: { tactic: "url_shortener", source: "OpenPhish", firstSeen: "2023-01-01" }},
      { value: "cutt.ly",                      meta: { tactic: "url_shortener", source: "OpenPhish", firstSeen: "2023-06-01" }},
      // Investment fraud (Pig butchering / crypto)
      { value: "crypto-profit-daily.com",      meta: { brand: null,     tactic: "investment_fraud",         source: "PhishTank_snapshot", firstSeen: "2024-01-05" }},
      { value: "bitcoin-guaranteed-returns.in", meta: { brand: null,    tactic: "investment_fraud",         source: "HuggingFace_Hinglish_Scam", firstSeen: "2024-05-01" }},
    ];
    for (const d of domainSeeds) {
      domainMap[d.value] = await upsertIndicator(client, "DOMAIN", d.value, d.meta);
    }

    // === PHONE numbers (NCSU campaign data inspired) ===
    const phoneMap = {};
    const phoneSeeds = [
      { value: "+918888123456", meta: { campaign: "kyc_fraud_campaign_IN_2024Q1", source: "NCSU_SMS_Phishing", reportCount: 47 }},
      { value: "+919999876543", meta: { campaign: "reward_scam_campaign_IN_2024Q1", source: "NCSU_SMS_Phishing", reportCount: 23 }},
      { value: "+917777654321", meta: { campaign: "kyc_fraud_campaign_IN_2024Q1", source: "HuggingFace_Hinglish_Scam", reportCount: 31 }},
      { value: "+916666543210", meta: { campaign: "loan_fraud_campaign_IN_2024Q2", source: "NCSU_SMS_Phishing", reportCount: 18 }},
      { value: "+915555432109", meta: { campaign: "investment_fraud_IN_2024Q2", source: "PhishTank_snapshot", reportCount: 12 }},
      { value: "+914444321098", meta: { campaign: "government_impersonation_IN_2024Q1", source: "HuggingFace_Hinglish_Scam", reportCount: 29 }},
      { value: "+911930000000", meta: { campaign: "fake_cybercrime_helpline", source: "HuggingFace_Hinglish_Scam", reportCount: 8 }},
    ];
    for (const p of phoneSeeds) {
      phoneMap[p.value] = await upsertIndicator(client, "PHONE", p.value, p.meta);
    }

    // === TACTICS ===
    const tacticMap = {};
    const tacticSeeds = [
      { value: "urgency_deadline",       meta: { description: "Creates artificial time pressure to bypass rational thinking", prevalence: "very_high" }},
      { value: "authority_impersonation",meta: { description: "Pretends to be official entity (bank, govt, police) to gain trust", prevalence: "very_high" }},
      { value: "credential_harvesting",  meta: { description: "Requests sensitive login/financial details via fake link", prevalence: "high" }},
      { value: "reward_lure",            meta: { description: "Promises unexpected reward/cashback to trigger impulsive action", prevalence: "high" }},
      { value: "otp_request",            meta: { description: "Attempts to steal one-time passwords — no legit org does this", prevalence: "very_high" }},
      { value: "bank_impersonation",     meta: { description: "Mimics official bank communication channels", prevalence: "high" }},
      { value: "government_impersonation",meta:{ description: "Fakes official government body (UIDAI, RBI, IT dept)", prevalence: "high" }},
      { value: "loan_fraud",             meta: { description: "Fake loan offers requiring upfront fees or credentials", prevalence: "medium" }},
      { value: "investment_fraud",       meta: { description: "Guarantees high returns to steal money or credentials", prevalence: "medium" }},
      { value: "fear_threat",            meta: { description: "Threatens legal action, arrest, or account freeze", prevalence: "medium" }},
    ];
    for (const t of tacticSeeds) {
      tacticMap[t.value] = await upsertIndicator(client, "TACTIC", t.value, t.meta);
    }

    // === PHRASES (from HuggingFace Hinglish/English scam texts) ===
    const phraseMap = {};
    const phraseSeeds = [
      // English scam phrases (HuggingFace dataset inspired)
      { value: "your account will be suspended",      meta: { tactic: "urgency_deadline", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "update your kyc immediately",         meta: { tactic: "credential_harvesting", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "share otp to verify",                 meta: { tactic: "otp_request", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "you have won a cashback",             meta: { tactic: "reward_lure", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "click here to claim your prize",     meta: { tactic: "reward_lure", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "your loan is approved",               meta: { tactic: "loan_fraud", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "guaranteed 40% returns daily",        meta: { tactic: "investment_fraud", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "arrest warrant has been issued",      meta: { tactic: "fear_threat", lang: "en", source: "NCSU_SMS_Phishing" }},
      { value: "verify your aadhaar within 24 hours", meta:{ tactic: "urgency_deadline", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "income tax refund pending",           meta: { tactic: "government_impersonation", lang: "en", source: "HuggingFace_Hinglish_Scam" }},
      // Hinglish phrases (HuggingFace Hinglish subset)
      { value: "aapka account band ho jayega",        meta: { tactic: "urgency_deadline", lang: "hi-en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "abhi otp share karo",                 meta: { tactic: "otp_request", lang: "hi-en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "aapko 5000 cashback mila hai",        meta: { tactic: "reward_lure", lang: "hi-en", source: "HuggingFace_Hinglish_Scam" }},
      { value: "kyc update karo warna account freeze hoga", meta: { tactic: "credential_harvesting", lang: "hi-en", source: "HuggingFace_Hinglish_Scam" }},
    ];
    for (const p of phraseSeeds) {
      phraseMap[p.value] = await upsertIndicator(client, "PHRASE", p.value, p.meta);
    }

    // === BRANDS ===
    const brandMap = {};
    const brandSeeds = [
      { value: "SBI",       meta: { fullName: "State Bank of India",   officialDomain: "sbi.co.in" }},
      { value: "HDFC",      meta: { fullName: "HDFC Bank",             officialDomain: "hdfcbank.com" }},
      { value: "ICICI",     meta: { fullName: "ICICI Bank",            officialDomain: "icicibank.com" }},
      { value: "Paytm",     meta: { fullName: "Paytm",                 officialDomain: "paytm.com" }},
      { value: "Amazon",    meta: { fullName: "Amazon India",          officialDomain: "amazon.in" }},
      { value: "UIDAI",     meta: { fullName: "Unique Identification Authority of India", officialDomain: "uidai.gov.in" }},
      { value: "RBI",       meta: { fullName: "Reserve Bank of India", officialDomain: "rbi.org.in" }},
      { value: "EPFO",      meta: { fullName: "Employees' Provident Fund Organisation", officialDomain: "epfindia.gov.in" }},
    ];
    for (const b of brandSeeds) {
      brandMap[b.value] = await upsertIndicator(client, "BRAND", b.value, b.meta);
    }

    console.log(`   ✅ ${domainSeeds.length} domains, ${phoneSeeds.length} phones, ${tacticSeeds.length} tactics, ${phraseSeeds.length} phrases, ${brandSeeds.length} brands seeded`);

    // ── 3. Reports (HuggingFace + NCSU dataset inspired) ─────────────────
    console.log("\n📋 Seeding scam reports from HuggingFace / NCSU dataset patterns...");

    const reports = [];

    // ─── REPORT 1: SBI KYC Campaign (NCSU SMS Phishing - Campaign #1) ───
    const r1id = await insertReport(client, {
      submittedById: userId,
      contentType: "message",
      rawContent: "Dear SBI Customer, Your account will be SUSPENDED due to incomplete KYC. Update KYC immediately: http://sbi-secure-login.co.in/kyc Contact: +918888123456. Urgent! - SBI Bank",
      publicSummary: "Fake SBI message threatens account suspension unless KYC is updated via unofficial link. Known phishing domain detected.",
      platform: "SMS",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.87,
      evidenceJson: [
        { field: "domain", value: "sbi-secure-login.co.in", why: "Known phishing domain impersonating SBI", tactic: "bank_impersonation" },
        { field: "phone", value: "+918888123456", why: "This number appears in kyc fraud campaign 1 — linked to 47 scam reports" },
        { field: "phrase", value: "account will be SUSPENDED", why: "Threat of account loss creates panic", tactic: "urgency_deadline" },
        { field: "phrase", value: "Update KYC immediately", why: "KYC via SMS link is always fraudulent", tactic: "credential_harvesting" },
      ],
      storyModeJson: [
        { phrase: "Dear SBI Customer", tactic: "authority_impersonation", explanation: "Uses 'SBI' to claim legitimacy without any authenticated channel" },
        { phrase: "account will be SUSPENDED", tactic: "urgency_deadline", explanation: "Creates immediate fear of financial loss to prevent rational thinking" },
        { phrase: "Update KYC immediately", tactic: "credential_harvesting", explanation: "Drives user to a fake link designed to steal banking credentials" },
        { phrase: "+918888123456", tactic: "social_engineering", explanation: "Phone number linked to known KYC fraud campaign — not SBI's official helpline" },
      ],
      nextStepsJson: [
        "🚨 Do NOT click the link — sbi-secure-login.co.in is a known phishing domain",
        "SBI never asks for KYC updates via SMS links — visit sbi.co.in or your branch directly",
        "Block this number (+918888123456) immediately",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "4 high-risk signals found. This matches patterns from 47 previous reports of the same campaign.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "NCSU_SMS_Phishing_Campaign_Dataset",
      createdAt: daysAgo(45),
    });
    reports.push(r1id);
    await linkIndicator(client, r1id, domainMap["sbi-secure-login.co.in"], "http://sbi-secure-login.co.in/kyc");
    await linkIndicator(client, r1id, phoneMap["+918888123456"], "Contact: +918888123456");
    await linkIndicator(client, r1id, tacticMap["urgency_deadline"], "account will be SUSPENDED");
    await linkIndicator(client, r1id, tacticMap["credential_harvesting"], "Update KYC immediately");
    await linkIndicator(client, r1id, brandMap["SBI"], "SBI Customer / SBI Bank");
    await insertAudit(client, analystId, r1id, "REPORT_PUBLISHED", { reason: "Confirmed phishing campaign", campaignId: "kyc_fraud_campaign_IN_2024Q1" });

    // ─── REPORT 2: HDFC KYC Campaign (HuggingFace Hinglish dataset) ───
    const r2id = await insertReport(client, {
      submittedById: userId,
      contentType: "message",
      rawContent: "HDFC BANK ALERT: Aapka account 24 ghante mein band ho jayega kyunki KYC incomplete hai. Abhi update karo: http://hdfc-kyc-update.net Call karo +917777654321",
      publicSummary: "Hinglish fake HDFC alert claims account closure in 24 hours. Uses urgency in Hindi-English mix to target Hindi speakers.",
      platform: "WhatsApp",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.83,
      evidenceJson: [
        { field: "domain", value: "hdfc-kyc-update.net", why: "Known phishing domain impersonating HDFC Bank", tactic: "bank_impersonation" },
        { field: "phone", value: "+917777654321", why: "This number linked to kyc fraud campaign 1 (31 reports)", tactic: "social_engineering" },
        { field: "phrase", value: "account 24 ghante mein band ho jayega", why: "Hinglish urgency threat — 'account will close in 24 hours'", tactic: "urgency_deadline" },
        { field: "phrase", value: "KYC incomplete hai", why: "Fake KYC completion demand via unofficial link", tactic: "credential_harvesting" },
      ],
      storyModeJson: [
        { phrase: "HDFC BANK ALERT", tactic: "authority_impersonation", explanation: "Capitalizes bank name to appear like an official system alert" },
        { phrase: "24 ghante mein band ho jayega", tactic: "urgency_deadline", explanation: "24-hour deadline in Hinglish creates panic for Hindi-speaking users" },
        { phrase: "Abhi update karo", tactic: "credential_harvesting", explanation: "'Update now' drives to phishing link — real HDFC uses app/branch only" },
      ],
      nextStepsJson: [
        "🚨 hdfc-kyc-update.net is a known phishing site — do not visit",
        "HDFC Bank never sends KYC update requests via WhatsApp",
        "Call HDFC official helpline: 1800-202-6161 to verify",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "4 high-risk signals including Hinglish urgency pattern. Matches NCSU campaign infrastructure.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(38),
    });
    reports.push(r2id);
    await linkIndicator(client, r2id, domainMap["hdfc-kyc-update.net"], "http://hdfc-kyc-update.net");
    await linkIndicator(client, r2id, phoneMap["+917777654321"], "Call karo +917777654321");
    await linkIndicator(client, r2id, tacticMap["urgency_deadline"], "24 ghante mein band ho jayega");
    await linkIndicator(client, r2id, tacticMap["credential_harvesting"], "KYC incomplete hai");
    await linkIndicator(client, r2id, brandMap["HDFC"], "HDFC BANK ALERT");
    await insertAudit(client, analystId, r2id, "REPORT_PUBLISHED", { reason: "Confirmed Hinglish bank phishing variant" });

    // ─── REPORT 3: UIDAI Aadhaar Scam (HuggingFace dataset) ───
    const r3id = await insertReport(client, {
      submittedById: null,
      contentType: "url",
      rawContent: "http://aadhaar-verify-now.in/update?uid=XXXX&mobile=XXXX",
      publicSummary: "Fake Aadhaar verification URL impersonates UIDAI. Uses non-government domain to harvest Aadhaar and mobile numbers.",
      platform: "SMS",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.78,
      evidenceJson: [
        { field: "lookalike_domain", value: "aadhaar-verify-now.in", why: "Real UIDAI uses uidai.gov.in — this domain mimics the brand with commercial TLD", tactic: "government_impersonation" },
        { field: "govt_impersonation", value: "aadhaar-verify-now.in", why: "Contains 'aadhaar' but uses .in instead of .gov.in" },
        { field: "suspicious_parameters", value: "uid=, mobile=", why: "URL parameters attempt to pre-fill personal identifiers to appear legitimate" },
      ],
      storyModeJson: [
        { phrase: "aadhaar-verify-now.in", tactic: "government_impersonation", explanation: "Domain mimics UIDAI's Aadhaar service but is not a government domain" },
        { phrase: "/update?uid=", tactic: "credential_harvesting", explanation: "Query parameters designed to harvest Aadhaar and mobile numbers" },
      ],
      nextStepsJson: [
        "🚨 Do NOT open this URL — it is NOT an official government website",
        "Real Aadhaar services only at uidai.gov.in or myaadhaar.uidai.gov.in",
        "Never share your 12-digit Aadhaar number with unverified links",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "3 high-risk URL signals. Government impersonation via unofficial domain.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(30),
    });
    reports.push(r3id);
    await linkIndicator(client, r3id, domainMap["aadhaar-verify-now.in"], "http://aadhaar-verify-now.in/update");
    await linkIndicator(client, r3id, tacticMap["government_impersonation"], "aadhaar-verify-now.in");
    await linkIndicator(client, r3id, tacticMap["credential_harvesting"], "?uid=XXXX&mobile=XXXX");
    await linkIndicator(client, r3id, brandMap["UIDAI"], "aadhaar-verify");
    await insertAudit(client, analystId, r3id, "REPORT_PUBLISHED", { reason: "UIDAI impersonation via non-gov domain confirmed" });

    // ─── REPORT 4: Paytm Cashback Reward Scam (HuggingFace) ───
    const r4id = await insertReport(client, {
      submittedById: userId,
      contentType: "message",
      rawContent: "Congratulations! You have won Rs.5000 Paytm cashback! Aapko Rs.5000 cashback mila hai. Click here to claim: http://paytm-cashback-win.com/claim?ref=WIN2024 Offer expires in 2 hours! Call +919999876543",
      publicSummary: "Bilingual (English+Hinglish) fake Paytm reward message. Claims Rs.5000 cashback with 2-hour countdown and fake claim link.",
      platform: "SMS",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.81,
      evidenceJson: [
        { field: "domain", value: "paytm-cashback-win.com", why: "Known phishing domain impersonating Paytm", tactic: "reward_lure" },
        { field: "phone", value: "+919999876543", why: "This number linked to reward_scam_campaign_IN_2024Q1 (23 reports)" },
        { field: "phrase", value: "Congratulations! You have won", why: "Classic reward lure trigger — unexpected prizes are almost always fraudulent", tactic: "reward_lure" },
        { field: "phrase", value: "Offer expires in 2 hours", why: "Artificial urgency countdown prevents verification", tactic: "urgency_deadline" },
        { field: "phrase", value: "Aapko Rs.5000 cashback mila hai", why: "Hinglish variant to reach more users — 'You received Rs.5000 cashback'", tactic: "reward_lure" },
      ],
      storyModeJson: [
        { phrase: "Congratulations!", tactic: "reward_lure", explanation: "Excitement trigger designed to lower skepticism immediately" },
        { phrase: "You have won Rs.5000", tactic: "reward_lure", explanation: "Specific monetary amount makes the scam feel more real" },
        { phrase: "Offer expires in 2 hours", tactic: "urgency_deadline", explanation: "Countdown prevents you from thinking carefully or verifying" },
        { phrase: "Click here to claim", tactic: "credential_harvesting", explanation: "Drives to fake Paytm page that harvests your wallet/bank credentials" },
      ],
      nextStepsJson: [
        "🚨 paytm-cashback-win.com is a known phishing domain — do not click",
        "Real Paytm cashbacks appear inside the Paytm app, not via SMS links",
        "No legitimate company sends unclaimed prizes with countdown timers",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "5 high-risk signals. Bilingual pattern targets both English and Hindi speakers in same message.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(25),
    });
    reports.push(r4id);
    await linkIndicator(client, r4id, domainMap["paytm-cashback-win.com"], "http://paytm-cashback-win.com/claim");
    await linkIndicator(client, r4id, phoneMap["+919999876543"], "Call +919999876543");
    await linkIndicator(client, r4id, tacticMap["reward_lure"], "You have won Rs.5000 Paytm cashback");
    await linkIndicator(client, r4id, tacticMap["urgency_deadline"], "Offer expires in 2 hours");
    await linkIndicator(client, r4id, brandMap["Paytm"], "Paytm cashback");
    await insertAudit(client, analystId, r4id, "REPORT_PUBLISHED", { reason: "Confirmed Paytm reward scam campaign" });

    // ─── REPORT 5: ICICI OTP Theft (HuggingFace + NCSU) ───
    const r5id = await insertReport(client, {
      submittedById: null,
      contentType: "message",
      rawContent: "ICICI Bank: Transaction of Rs.29,999 is pending. If not done by you, share your OTP 845621 to reverse it. Call our fraud desk: +914444321098",
      publicSummary: "Fake ICICI fraud alert requests OTP sharing to 'reverse' unauthorized transaction. Classic OTP theft using reverse-psychology.",
      platform: "SMS",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.92,
      evidenceJson: [
        { field: "phrase", value: "share your OTP", why: "No legitimate bank EVER asks you to share an OTP — this is the #1 indicator of fraud", tactic: "otp_request" },
        { field: "phone", value: "+914444321098", why: "This number linked to government_impersonation_IN_2024Q1 campaign (29 reports)" },
        { field: "phrase", value: "Transaction of Rs.29,999 is pending", why: "Creates fear of unauthorized charge — reverse psychology tactic", tactic: "fear_threat" },
        { field: "phrase", value: "fraud desk", why: "Fake 'fraud desk' to create legitimacy illusion", tactic: "authority_impersonation" },
      ],
      storyModeJson: [
        { phrase: "Transaction of Rs.29,999 pending", tactic: "fear_threat", explanation: "Creates immediate fear of financial loss before victim can think critically" },
        { phrase: "If not done by you", tactic: "social_engineering", explanation: "Reverse psychology — implies victim is already a victim to create panic" },
        { phrase: "share your OTP to reverse it", tactic: "otp_request", explanation: "CRITICAL: This is categorically false. Sharing OTP ENABLES fraud, never reverses it" },
        { phrase: "Call our fraud desk", tactic: "authority_impersonation", explanation: "Fake helpline staffed by fraudsters waiting to collect your OTP" },
      ],
      nextStepsJson: [
        "🚨 CRITICAL: NEVER share your OTP with anyone — not banks, family, or 'fraud desks'",
        "Sharing an OTP with a fraudster ENABLES the transaction, it never reverses it",
        "If you already shared, call your real bank immediately to block your account",
        "ICICI official helpline: 1800-1080 — use only this number",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "4 high-risk signals including OTP theft — this is the most dangerous scam type. Sharing OTP is irreversible.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "NCSU_SMS_Phishing_Campaign_Dataset",
      createdAt: daysAgo(20),
    });
    reports.push(r5id);
    await linkIndicator(client, r5id, phoneMap["+914444321098"], "Call our fraud desk: +914444321098");
    await linkIndicator(client, r5id, tacticMap["otp_request"], "share your OTP to reverse it");
    await linkIndicator(client, r5id, tacticMap["fear_threat"], "Transaction of Rs.29,999 is pending");
    await linkIndicator(client, r5id, tacticMap["authority_impersonation"], "fraud desk");
    await linkIndicator(client, r5id, brandMap["ICICI"], "ICICI Bank");
    await insertAudit(client, analystId, r5id, "REPORT_PUBLISHED", { reason: "Confirmed OTP theft via reverse-psychology. Highest risk type." });

    // ─── REPORT 6: Income Tax Refund Scam (HuggingFace) ───
    const r6id = await insertReport(client, {
      submittedById: null,
      contentType: "message",
      rawContent: "Income Tax Dept: Your income tax refund of Rs.18,500 is pending. Submit your bank details at http://incometax-refund-claim.com to receive it. Valid for 48 hours only.",
      publicSummary: "Fake Income Tax Department message offers pending refund. Unofficial domain harvests bank account details.",
      platform: "Email",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.79,
      evidenceJson: [
        { field: "lookalike_domain", value: "incometax-refund-claim.com", why: "Real IT dept uses incometaxindiaefiling.gov.in — this is an unofficial domain", tactic: "government_impersonation" },
        { field: "phrase", value: "Submit your bank details", why: "Tax refunds are credited automatically — never requires manual bank detail submission", tactic: "credential_harvesting" },
        { field: "phrase", value: "Valid for 48 hours only", why: "Artificial deadline prevents verification with official sources", tactic: "urgency_deadline" },
      ],
      storyModeJson: [
        { phrase: "Income Tax Dept", tactic: "authority_impersonation", explanation: "Impersonates government tax authority for maximum trust" },
        { phrase: "Your income tax refund of Rs.18,500 is pending", tactic: "reward_lure", explanation: "Specific refund amount makes the claim feel genuine and personalized" },
        { phrase: "Submit your bank details", tactic: "credential_harvesting", explanation: "Tax refunds go to your ITR-filed account automatically — this is a harvesting attempt" },
        { phrase: "Valid for 48 hours only", tactic: "urgency_deadline", explanation: "48-hour window prevents victims from calling the real IT helpline" },
      ],
      nextStepsJson: [
        "🚨 incometax-refund-claim.com is NOT a government website",
        "Real IT refunds are credited to your bank automatically after ITR processing",
        "Check your refund status at incometaxindia.gov.in only",
        "Report phishing to incident@cert-in.org.in",
        "Report to cybercrime.gov.in or call 1930",
      ],
      caveat: "3 high-risk signals. Government impersonation with credential harvesting.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(18),
    });
    reports.push(r6id);
    await linkIndicator(client, r6id, domainMap["incometax-refund-claim.com"], "http://incometax-refund-claim.com");
    await linkIndicator(client, r6id, tacticMap["government_impersonation"], "Income Tax Dept");
    await linkIndicator(client, r6id, tacticMap["credential_harvesting"], "Submit your bank details");
    await linkIndicator(client, r6id, tacticMap["urgency_deadline"], "Valid for 48 hours only");
    await insertAudit(client, analystId, r6id, "REPORT_PUBLISHED", { reason: "Confirmed IT department impersonation" });

    // ─── REPORT 7: Instant Loan Fraud (HuggingFace) ───
    const r7id = await insertReport(client, {
      submittedById: null,
      contentType: "message",
      rawContent: "Congratulations! Your personal loan of Rs.2,00,000 is approved! No documents needed. Just pay processing fee Rs.1,999 at http://instant-loan-approved.in and get loan in 5 min! Call +916666543210",
      publicSummary: "Fake instant loan approval requiring upfront processing fee. Classic advance-fee fraud — no real lender charges fees before disbursement.",
      platform: "WhatsApp",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.85,
      evidenceJson: [
        { field: "domain", value: "instant-loan-approved.in", why: "Known loan fraud domain — no RBI-licensed lender uses this domain", tactic: "loan_fraud" },
        { field: "phone", value: "+916666543210", why: "This number linked to loan_fraud_campaign_IN_2024Q2 (18 reports)" },
        { field: "phrase", value: "No documents needed", why: "Real lenders always require KYC documents — this is a major red flag", tactic: "loan_fraud" },
        { field: "phrase", value: "pay processing fee", why: "Advance fee fraud — real loans never require upfront fees before disbursement", tactic: "loan_fraud" },
        { field: "phrase", value: "loan in 5 min", why: "Impossibly fast promise to create urgency and excitement", tactic: "urgency_deadline" },
      ],
      storyModeJson: [
        { phrase: "loan of Rs.2,00,000 is approved", tactic: "reward_lure", explanation: "Pre-approved large loan creates excitement before victim can verify" },
        { phrase: "No documents needed", tactic: "social_engineering", explanation: "Removes normal verification barriers to make scam feel easy and accessible" },
        { phrase: "pay processing fee Rs.1,999", tactic: "loan_fraud", explanation: "The entire scam — collect fee and disappear. No loan ever arrives." },
        { phrase: "loan in 5 min", tactic: "urgency_deadline", explanation: "5-minute promise creates FOMO — real loans take days minimum" },
      ],
      nextStepsJson: [
        "🚨 This is a classic advance-fee fraud — the loan does not exist",
        "No RBI-licensed lender charges fees before loan disbursement",
        "Check RBI's list of approved NBFCs at rbi.org.in",
        "If you paid a fee, report immediately to cybercrime.gov.in",
        "Call 1930 (Cyber Crime Financial Fraud Helpline)",
      ],
      caveat: "5 high-risk signals. Advance-fee fraud pattern — money paid for fees is never recovered.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(15),
    });
    reports.push(r7id);
    await linkIndicator(client, r7id, domainMap["instant-loan-approved.in"], "http://instant-loan-approved.in");
    await linkIndicator(client, r7id, phoneMap["+916666543210"], "Call +916666543210");
    await linkIndicator(client, r7id, tacticMap["loan_fraud"], "No documents needed / pay processing fee");
    await linkIndicator(client, r7id, tacticMap["urgency_deadline"], "loan in 5 min");
    await linkIndicator(client, r7id, tacticMap["reward_lure"], "loan of Rs.2,00,000 is approved");
    await insertAudit(client, analystId, r7id, "REPORT_PUBLISHED", { reason: "Confirmed advance-fee loan fraud" });

    // ─── REPORT 8: Crypto Investment Fraud ───
    const r8id = await insertReport(client, {
      submittedById: null,
      contentType: "message",
      rawContent: "Join our exclusive crypto investment group! Guaranteed 40% returns daily. Our AI trading bot never loses. Invest Rs.10,000 get Rs.14,000 in 24 hours. Limited slots! http://crypto-profit-daily.com Call +915555432109",
      publicSummary: "Crypto investment fraud promising guaranteed daily returns. No investment guarantees 40% daily returns — this is always fraud.",
      platform: "Telegram",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.88,
      evidenceJson: [
        { field: "domain", value: "crypto-profit-daily.com", why: "Known investment fraud domain — no regulated investment uses this", tactic: "investment_fraud" },
        { field: "phone", value: "+915555432109", why: "This number linked to investment_fraud_IN_2024Q2 (12 reports)" },
        { field: "phrase", value: "Guaranteed 40% returns daily", why: "No legitimate investment guarantees returns — illegal under SEBI regulations", tactic: "investment_fraud" },
        { field: "phrase", value: "AI trading bot never loses", why: "No trading algorithm has 100% success rate — this is a fraudulent claim", tactic: "investment_fraud" },
        { field: "phrase", value: "Limited slots", why: "Artificial scarcity to trigger FOMO and prevent verification", tactic: "urgency_deadline" },
      ],
      storyModeJson: [
        { phrase: "exclusive crypto investment group", tactic: "social_engineering", explanation: "'Exclusive' creates feeling of special access — a manipulation technique" },
        { phrase: "Guaranteed 40% returns daily", tactic: "investment_fraud", explanation: "40% daily = 14,600% annual — mathematically impossible legitimately" },
        { phrase: "AI trading bot never loses", tactic: "investment_fraud", explanation: "No algorithm achieves 100% win rate — this is a fraudulent claim" },
        { phrase: "Limited slots", tactic: "urgency_deadline", explanation: "Creates FOMO to prevent victims from thinking carefully or researching" },
      ],
      nextStepsJson: [
        "🚨 This is a Ponzi/pig-butchering scheme — your money will disappear",
        "No investment guarantees any returns, especially 40% per day",
        "Report to SEBI at sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes",
        "Report to cybercrime.gov.in",
        "If you already invested, do not invest more — contact cybercrime helpline 1930",
      ],
      caveat: "5 high-risk signals. Pig-butchering / Ponzi pattern — initial returns may be paid to gain trust before disappearing.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "PhishTank_snapshot",
      createdAt: daysAgo(10),
    });
    reports.push(r8id);
    await linkIndicator(client, r8id, domainMap["crypto-profit-daily.com"], "http://crypto-profit-daily.com");
    await linkIndicator(client, r8id, phoneMap["+915555432109"], "Call +915555432109");
    await linkIndicator(client, r8id, tacticMap["investment_fraud"], "Guaranteed 40% returns daily");
    await linkIndicator(client, r8id, tacticMap["urgency_deadline"], "Limited slots");
    await insertAudit(client, analystId, r8id, "REPORT_PUBLISHED", { reason: "Confirmed crypto investment Ponzi scheme" });

    // ─── REPORT 9: Fake CBI Arrest Threat (HuggingFace) ───
    const r9id = await insertReport(client, {
      submittedById: null,
      contentType: "phone",
      rawContent: "+914444321098",
      publicSummary: "Phone number used in fake CBI/Police impersonation calls. Callers claim arrest warrants and demand payment to avoid arrest. Known fear-threat campaign.",
      platform: "Phone Call",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.74,
      evidenceJson: [
        { field: "phone", value: "+914444321098", why: "This number linked to government_impersonation_IN_2024Q1 campaign (29 reports)", tactic: "fear_threat" },
        { field: "phrase", value: "arrest warrant has been issued", why: "CBI/Police never inform targets of warrants via phone calls", tactic: "fear_threat" },
        { field: "phrase", value: "pay to avoid arrest", why: "No government agency accepts payment via phone to cancel legal proceedings", tactic: "authority_impersonation" },
      ],
      storyModeJson: [
        { phrase: "CBI/Police calling", tactic: "authority_impersonation", explanation: "Impersonates law enforcement for maximum psychological pressure" },
        { phrase: "arrest warrant issued", tactic: "fear_threat", explanation: "Existential threat (arrest) designed to cause complete panic" },
        { phrase: "pay to cancel warrant", tactic: "credential_harvesting", explanation: "No government agency ever cancels legal proceedings via phone payment" },
      ],
      nextStepsJson: [
        "🚨 This is 'digital arrest' scam — CBI/Police do not call to inform of warrants",
        "Hang up immediately — do not engage or pay anything",
        "Real CBI/Police contact comes via official notice in writing",
        "Report to cybercrime.gov.in or call 1930",
        "Call the actual local police station to verify if concerned",
      ],
      caveat: "Phone number linked to 29 previous reports of the same fear-threat campaign.",
      status: "PUBLISHED",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(8),
    });
    reports.push(r9id);
    await linkIndicator(client, r9id, phoneMap["+914444321098"], "+914444321098 (submitted)");
    await linkIndicator(client, r9id, tacticMap["fear_threat"], "arrest warrant campaign");
    await linkIndicator(client, r9id, tacticMap["authority_impersonation"], "CBI/Police impersonation");
    await insertAudit(client, analystId, r9id, "REPORT_PUBLISHED", { reason: "Confirmed digital arrest scam campaign" });

    // ─── REPORT 10: EPFO PF Withdrawal Scam (HuggingFace) ───
    const r10id = await insertReport(client, {
      submittedById: userId,
      contentType: "message",
      rawContent: "EPFO Alert: Your PF withdrawal request is pending. Update your Aadhaar-linked bank account at http://epfo-pf-withdraw.co.in within 72 hours or request will be cancelled. UAN: XXXXXXXXXX",
      publicSummary: "Fake EPFO PF withdrawal alert requires bank account update via unofficial portal. Targets PF account holders.",
      platform: "SMS",
      targetRegion: "IN",
      riskLevel: "HIGH_RISK",
      riskScore: 0.77,
      evidenceJson: [
        { field: "lookalike_domain", value: "epfo-pf-withdraw.co.in", why: "Real EPFO uses epfindia.gov.in — this unofficial domain harvests bank details", tactic: "government_impersonation" },
        { field: "phrase", value: "Update your Aadhaar-linked bank account", why: "Bank account updates are done only through official EPFO portal with full verification", tactic: "credential_harvesting" },
        { field: "phrase", value: "within 72 hours or request will be cancelled", why: "Artificial deadline to prevent verification through official channels", tactic: "urgency_deadline" },
      ],
      storyModeJson: [
        { phrase: "EPFO Alert", tactic: "authority_impersonation", explanation: "Impersonates government retirement fund authority" },
        { phrase: "PF withdrawal request is pending", tactic: "reward_lure", explanation: "Implies money is available — people are eager to withdraw PF funds" },
        { phrase: "Update your Aadhaar-linked bank account", tactic: "credential_harvesting", explanation: "Harvests bank account number and Aadhaar linkage data" },
        { phrase: "within 72 hours", tactic: "urgency_deadline", explanation: "72-hour window prevents verification with real EPFO" },
      ],
      nextStepsJson: [
        "🚨 epfo-pf-withdraw.co.in is NOT an official government website",
        "Real EPFO portal: epfindia.gov.in — never click SMS links for EPFO",
        "PF withdrawals require login to your UAN portal with registered credentials",
        "Call EPFO helpline: 1800-118-005 (toll-free)",
        "Report to cybercrime.gov.in",
      ],
      caveat: "3 high-risk signals. Government impersonation targeting PF account holders.",
      status: "UNDER_REVIEW",
      sourceType: "SEEDED",
      datasetSource: "HuggingFace_Hinglish_English_Scam_Text_Dataset",
      createdAt: daysAgo(3),
    });
    reports.push(r10id);
    await linkIndicator(client, r10id, domainMap["epfo-pf-withdraw.co.in"], "http://epfo-pf-withdraw.co.in");
    await linkIndicator(client, r10id, tacticMap["government_impersonation"], "EPFO Alert");
    await linkIndicator(client, r10id, tacticMap["credential_harvesting"], "Update your Aadhaar-linked bank account");
    await linkIndicator(client, r10id, tacticMap["urgency_deadline"], "within 72 hours");
    await linkIndicator(client, r10id, brandMap["EPFO"], "EPFO Alert");
    await insertAudit(client, analystId, r10id, "REPORT_REVIEWED", { reason: "Under review — verifying EPFO campaign scale" });

    console.log(`   ✅ 10 reports seeded with full evidence chains`);

    // ── 4. Review Decisions ────────────────────────────────────────────────
    console.log("\n⚖️  Seeding review decisions...");
    const publishedReports = [r1id, r2id, r3id, r4id, r5id, r6id, r7id, r8id, r9id];
    for (const rid of publishedReports) {
      await client.query(
        `INSERT INTO "ReviewDecision" (id,"reportId","reviewerId",status,rationale,"createdAt")
         VALUES ($1,$2,$3,'PUBLISHED',$4,$5) ON CONFLICT DO NOTHING`,
        [cuid(), rid, analystId, "Confirmed scam pattern via indicator cross-reference with known campaign dataset. Published redacted summary.", daysAgo(Math.floor(Math.random() * 10))]
      );
    }
    console.log(`   ✅ 9 review decisions recorded`);

    // ── 5. Case Notes ──────────────────────────────────────────────────────
    console.log("\n📝 Seeding analyst case notes...");
    const caseNoteData = [
      { rid: r1id, note: "SBI campaign #1 confirmed. Same infra as reports from NCSU dataset campaign_id=SBI_KYC_2024Q1. Shared IP range with hdfc-kyc-update.net via DNS lookup. Recommend escalating to CERT-In." },
      { rid: r2id, note: "HDFC variant of KYC campaign. Hinglish text suggests targeting Bihar/UP demographics. Same phone number +917777654321 as r1. Cross-campaign DNA match score: 0.74." },
      { rid: r5id, note: "OTP theft via reverse psychology — highest risk category. Number +914444321098 also used in CBI impersonation calls (report r9). Same operator, different script. Campaign overlap confirmed." },
      { rid: r8id, note: "Pig-butchering / crypto Ponzi pattern. Telegram group with 847 members found. Initial withdrawals allowed to build trust. Recommend SEBI alert filing." },
    ];
    for (const cn of caseNoteData) {
      await client.query(
        `INSERT INTO "CaseNote" (id,"reportId","authorId",content,"createdAt") VALUES ($1,$2,$3,$4,$5)`,
        [cuid(), cn.rid, analystId, cn.note, daysAgo(Math.floor(Math.random() * 5))]
      );
    }
    console.log(`   ✅ 4 case notes seeded`);

    // ── 6. Scam DNA (Match Evidence) ───────────────────────────────────────
    console.log("\n🧬 Computing Scam DNA similarity pairs...");

    // r1 ↔ r2: Both KYC campaigns, share phone campaign, different brands
    await insertMatchEvidence(client, r1id, r2id, 0.74, [
      { field: "tactic", valueA: "urgency_deadline", valueB: "urgency_deadline", weight: 0.20, explanation: "Both use account suspension threat" },
      { field: "tactic", valueA: "credential_harvesting", valueB: "credential_harvesting", weight: 0.22, explanation: "Both request KYC via unofficial link" },
      { field: "campaign", valueA: "kyc_fraud_campaign_IN_2024Q1", valueB: "kyc_fraud_campaign_IN_2024Q1", weight: 0.32, explanation: "Same campaign infrastructure: phone +917777654321 shared" },
    ], [
      { field: "brand", valueA: "SBI", valueB: "HDFC", note: "Different impersonated brands" },
      { field: "language", valueA: "English", valueB: "Hinglish", note: "Different language targeting" },
      { field: "domain", valueA: "sbi-secure-login.co.in", valueB: "hdfc-kyc-update.net" },
    ]);

    // r1 ↔ r10: Both KYC/govt impersonation, different agencies
    await insertMatchEvidence(client, r1id, r10id, 0.61, [
      { field: "tactic", valueA: "credential_harvesting", valueB: "credential_harvesting", weight: 0.22, explanation: "Both request account/KYC details via unofficial links" },
      { field: "tactic", valueA: "urgency_deadline", valueB: "urgency_deadline", weight: 0.20, explanation: "Both use deadline threats (24h vs 72h)" },
    ], [
      { field: "brand", valueA: "SBI", valueB: "EPFO", note: "Different government entities impersonated" },
      { field: "platform", valueA: "SMS", valueB: "SMS", note: "Same delivery platform" },
    ]);

    // r4 ↔ r7: Both use reward/Congratulations opener with countdown
    await insertMatchEvidence(client, r4id, r7id, 0.65, [
      { field: "phrase", valueA: "Congratulations! You have won", valueB: "Your loan is approved", weight: 0.18, explanation: "Both open with unexpected good news" },
      { field: "tactic", valueA: "reward_lure", valueB: "reward_lure", weight: 0.20, explanation: "Both use reward/benefit lure as primary hook" },
      { field: "tactic", valueA: "urgency_deadline", valueB: "urgency_deadline", weight: 0.20, explanation: "Both include countdown timer to prevent verification" },
    ], [
      { field: "domain", valueA: "paytm-cashback-win.com", valueB: "instant-loan-approved.in", note: "Different phishing domains" },
      { field: "contentType", valueA: "cashback scam", valueB: "loan fraud", note: "Different scam categories" },
    ]);

    // r5 ↔ r9: Same phone number +914444321098, different scripts
    await insertMatchEvidence(client, r5id, r9id, 0.82, [
      { field: "phone", valueA: "+914444321098", valueB: "+914444321098", weight: 0.35, explanation: "EXACT same phone number used in both campaigns" },
      { field: "tactic", valueA: "authority_impersonation", valueB: "authority_impersonation", weight: 0.22, explanation: "Both impersonate official bodies (bank fraud desk vs CBI)" },
      { field: "tactic", valueA: "fear_threat", valueB: "fear_threat", weight: 0.15, explanation: "Both create fear of financial loss or arrest" },
    ], [
      { field: "script", valueA: "OTP theft via transaction reversal", valueB: "Digital arrest threat", note: "Same operator, different fear triggers" },
      { field: "contentType", valueA: "SMS message", valueB: "Phone call", note: "Different delivery methods" },
    ]);

    // r6 ↔ r3: Both government impersonation, different agencies
    await insertMatchEvidence(client, r3id, r6id, 0.58, [
      { field: "tactic", valueA: "government_impersonation", valueB: "government_impersonation", weight: 0.25, explanation: "Both impersonate Indian government bodies" },
      { field: "tactic", valueA: "credential_harvesting", valueB: "credential_harvesting", weight: 0.22, explanation: "Both request sensitive personal information" },
    ], [
      { field: "brand", valueA: "UIDAI", valueB: "Income Tax Dept", note: "Different government entities" },
      { field: "domain", valueA: "aadhaar-verify-now.in", valueB: "incometax-refund-claim.com" },
    ]);

    console.log("   ✅ 5 Scam DNA similarity pairs computed");

    // ── 7. Audit Events ────────────────────────────────────────────────────
    console.log("\n📜 Seeding audit events...");
    for (const rid of reports) {
      await insertAudit(client, null, rid, "REPORT_SUBMITTED", { source: "seed_script", datasetSource: "HuggingFace/NCSU" });
      await insertAudit(client, analystId, rid, "INDICATOR_EXTRACTED", { indicatorCount: Math.floor(Math.random() * 5) + 2 });
    }
    await insertAudit(client, analystId, null, "ACCESS_RESTRICTED_DATA", { reason: "Scam DNA analysis session", reportsAccessed: reports.length });
    console.log("   ✅ Audit trail seeded");

    // ── 8. Trend Snapshots (ScamPulse) ────────────────────────────────────
    console.log("\n📈 Seeding ScamPulse trend snapshots...");
    const trendData = [
      // Last 30 days of daily trends
      { daysBack: 30, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "bank_impersonation",       count: 8,  rid: r1id },
      { daysBack: 28, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "credential_harvesting",    count: 11, rid: r2id },
      { daysBack: 25, contentType: "url",     riskLevel: "HIGH_RISK",    tactic: "government_impersonation", count: 6,  rid: r3id },
      { daysBack: 22, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "reward_lure",              count: 14, rid: r4id },
      { daysBack: 20, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "otp_request",              count: 9,  rid: r5id },
      { daysBack: 18, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "government_impersonation", count: 7,  rid: r6id },
      { daysBack: 15, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "loan_fraud",               count: 12, rid: r7id },
      { daysBack: 12, contentType: "message", riskLevel: "HIGH_RISK",    tactic: "investment_fraud",         count: 5,  rid: r8id },
      { daysBack: 10, contentType: "phone",   riskLevel: "HIGH_RISK",    tactic: "fear_threat",              count: 8,  rid: r9id },
      { daysBack: 8,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "government_impersonation", count: 6,  rid: r10id },
      { daysBack: 6,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "urgency_deadline",         count: 18, rid: r1id },
      { daysBack: 5,  contentType: "message", riskLevel: "NEEDS_CAUTION",tactic: "reward_lure",              count: 22, rid: r4id },
      { daysBack: 4,  contentType: "url",     riskLevel: "HIGH_RISK",    tactic: "bank_impersonation",       count: 9,  rid: r2id },
      { daysBack: 3,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "otp_request",              count: 15, rid: r5id },
      { daysBack: 2,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "investment_fraud",         count: 7,  rid: r8id },
      { daysBack: 1,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "loan_fraud",               count: 11, rid: r7id },
      { daysBack: 0,  contentType: "message", riskLevel: "HIGH_RISK",    tactic: "urgency_deadline",         count: 19, rid: r1id },
    ];
    for (const t of trendData) {
      const d = new Date(Date.now() - t.daysBack * 86400000);
      await insertTrend(client, d.toISOString().split("T")[0], t.contentType, t.riskLevel, t.tactic, t.count, t.rid);
    }
    console.log(`   ✅ ${trendData.length} trend snapshots for ScamPulse seeded`);

    console.log("\n🎉 Database seeding complete!");
    console.log("───────────────────────────────────────────");
    console.log("👤 Users:           analyst@scamtrace.dev (ANALYST), admin@scamtrace.dev (ADMIN), user@scamtrace.dev (PUBLIC)");
    console.log("📌 Indicators:     ", domainSeeds.length + phoneSeeds.length + tacticSeeds.length + phraseSeeds.length + brandSeeds.length, "total");
    console.log("📋 Reports:        ", reports.length, "seeded (HuggingFace + NCSU + PhishTank inspired)");
    console.log("🧬 Scam DNA pairs: 5");
    console.log("📈 Trend entries:  ", trendData.length);
    console.log("📝 Dataset labels: SEEDED / IMPORTED (never presented as live intelligence)");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error("❌ Seed failed:", e.message, e.stack); process.exit(1); });
