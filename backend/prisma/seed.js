import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL_UNPOOLED;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding ScamTrace database...");

  // ── Analyst user ────────────────────────────────────────────
  const analystPassword = await bcrypt.hash("analyst123", 10);
  const analyst = await prisma.user.upsert({
    where: { email: "analyst@scamtrace.dev" },
    update: {},
    create: {
      email: "analyst@scamtrace.dev",
      password: analystPassword,
      firstName: "Trace",
      lastName: "Analyst",
      role: "ANALYST",
    },
  });
  console.log("✅ Analyst user:", analyst.email);

  // ── Indicators ──────────────────────────────────────────────
  const indicators = await Promise.all([
    // Domains / URLs
    prisma.indicator.upsert({ where: { type_value: { type: "DOMAIN", value: "sbi-secure-login.co.in" } }, update: {}, create: { type: "DOMAIN", value: "sbi-secure-login.co.in", metadata: { brand: "SBI", tactic: "bank_impersonation" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "DOMAIN", value: "hdfc-kyc-update.net" } }, update: {}, create: { type: "DOMAIN", value: "hdfc-kyc-update.net", metadata: { brand: "HDFC", tactic: "bank_impersonation" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "DOMAIN", value: "aadhaar-verify-now.in" } }, update: {}, create: { type: "DOMAIN", value: "aadhaar-verify-now.in", metadata: { brand: "UIDAI", tactic: "government_impersonation" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "DOMAIN", value: "paytm-cashback-win.com" } }, update: {}, create: { type: "DOMAIN", value: "paytm-cashback-win.com", metadata: { brand: "Paytm", tactic: "reward_scam" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "DOMAIN", value: "bit.ly" } }, update: {}, create: { type: "DOMAIN", value: "bit.ly", metadata: { tactic: "url_shortener" } } }),

    // Phone numbers
    prisma.indicator.upsert({ where: { type_value: { type: "PHONE", value: "+918888123456" } }, update: {}, create: { type: "PHONE", value: "+918888123456", metadata: { campaign: "kyc_fraud_campaign_1" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHONE", value: "+919999876543" } }, update: {}, create: { type: "PHONE", value: "+919999876543", metadata: { campaign: "reward_scam_campaign_1" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHONE", value: "+917777654321" } }, update: {}, create: { type: "PHONE", value: "+917777654321", metadata: { campaign: "kyc_fraud_campaign_1" } } }),

    // Tactics
    prisma.indicator.upsert({ where: { type_value: { type: "TACTIC", value: "urgency_deadline" } }, update: {}, create: { type: "TACTIC", value: "urgency_deadline", metadata: { description: "Creates artificial time pressure to prevent careful thinking" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "TACTIC", value: "authority_impersonation" } }, update: {}, create: { type: "TACTIC", value: "authority_impersonation", metadata: { description: "Pretends to be official entity to gain trust" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "TACTIC", value: "credential_harvesting" } }, update: {}, create: { type: "TACTIC", value: "credential_harvesting", metadata: { description: "Requests sensitive login or financial details" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "TACTIC", value: "reward_lure" } }, update: {}, create: { type: "TACTIC", value: "reward_lure", metadata: { description: "Promises unexpected reward to trigger action" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "TACTIC", value: "otp_request" } }, update: {}, create: { type: "TACTIC", value: "otp_request", metadata: { description: "Attempts to steal one-time passwords" } } }),

    // Phrases
    prisma.indicator.upsert({ where: { type_value: { type: "PHRASE", value: "your account will be suspended" } }, update: {}, create: { type: "PHRASE", value: "your account will be suspended", metadata: { tactic: "urgency_deadline" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHRASE", value: "update your kyc immediately" } }, update: {}, create: { type: "PHRASE", value: "update your kyc immediately", metadata: { tactic: "urgency_deadline" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHRASE", value: "share otp to verify" } }, update: {}, create: { type: "PHRASE", value: "share otp to verify", metadata: { tactic: "otp_request" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHRASE", value: "you have won a cashback" } }, update: {}, create: { type: "PHRASE", value: "you have won a cashback", metadata: { tactic: "reward_lure" } } }),
    prisma.indicator.upsert({ where: { type_value: { type: "PHRASE", value: "click here to claim" } }, update: {}, create: { type: "PHRASE", value: "click here to claim", metadata: { tactic: "reward_lure" } } }),
  ]);
  console.log(`✅ ${indicators.length} indicators seeded`);

  // ── Helper: create report with indicators ──────────────────
  const createReport = async (data, indicatorTypes) => {
    const report = await prisma.report.create({ data });
    for (const { type, value, context } of indicatorTypes) {
      const ind = await prisma.indicator.findUnique({ where: { type_value: { type, value } } });
      if (ind) {
        await prisma.reportIndicator.upsert({
          where: { reportId_indicatorId: { reportId: report.id, indicatorId: ind.id } },
          update: {},
          create: { reportId: report.id, indicatorId: ind.id, context },
        });
      }
    }
    return report;
  };

  // ── Seeded Reports ──────────────────────────────────────────
  // Campaign 1: KYC Fraud (SBI impersonation)
  const r1 = await createReport({
    contentType: "message",
    rawContent: "Dear SBI customer, your account will be suspended due to incomplete KYC. Update your KYC immediately at sbi-secure-login.co.in or call +918888123456. Failure to comply will result in account freeze within 24 hours.",
    publicSummary: "Message impersonating SBI bank requesting KYC update via suspicious link, with threats of account suspension.",
    platform: "SMS",
    targetRegion: "IN",
    riskLevel: "HIGH_RISK",
    riskScore: 0.92,
    status: "PUBLISHED",
    sourceType: "SEEDED",
    evidenceJson: [
      { field: "domain", value: "sbi-secure-login.co.in", why: "Lookalike domain impersonating SBI — real SBI uses sbi.co.in" },
      { field: "phrase", value: "your account will be suspended", why: "Classic urgency tactic to prevent careful thinking" },
      { field: "phrase", value: "update your kyc immediately", why: "Urgency + credential harvesting setup" },
      { field: "phone", value: "+918888123456", why: "Linked to 3 other scam reports in this campaign" },
    ],
    storyModeJson: [
      { phrase: "Dear SBI customer", tactic: "authority_impersonation", explanation: "Impersonates official SBI communication to establish false trust" },
      { phrase: "your account will be suspended", tactic: "urgency_deadline", explanation: "Creates fear of immediate loss to override rational decision-making" },
      { phrase: "Update your KYC immediately", tactic: "credential_harvesting", explanation: "Directs victim to a phishing site to steal banking credentials" },
      { phrase: "within 24 hours", tactic: "urgency_deadline", explanation: "Artificial deadline to prevent verification or consulting others" },
    ],
    nextStepsJson: [
      "Do not click the link or call the number",
      "SBI never asks for KYC via SMS links — verify at official sbi.co.in",
      "Report to cybercrime.gov.in",
      "Forward the SMS to 1930 (Cyber Crime Helpline)",
    ],
    caveat: "This is a community-submitted report that has been analyst-reviewed. The domain matches known lookalike patterns but has not been independently verified as malicious.",
  }, [
    { type: "DOMAIN", value: "sbi-secure-login.co.in", context: "update your KYC immediately at sbi-secure-login.co.in" },
    { type: "PHONE", value: "+918888123456", context: "or call +918888123456" },
    { type: "TACTIC", value: "urgency_deadline", context: "account will be suspended...within 24 hours" },
    { type: "TACTIC", value: "credential_harvesting", context: "update your KYC at" },
    { type: "TACTIC", value: "authority_impersonation", context: "Dear SBI customer" },
    { type: "PHRASE", value: "your account will be suspended", context: "your account will be suspended due to incomplete KYC" },
    { type: "PHRASE", value: "update your kyc immediately", context: "Update your KYC immediately at" },
  ]);

  const r2 = await createReport({
    contentType: "message",
    rawContent: "URGENT: Your SBI account has been flagged. Update KYC at sbi-secure-login.co.in within 2 hours to avoid suspension. Contact +917777654321 for help.",
    publicSummary: "Variant of SBI KYC scam using same domain with different phone number and shorter deadline.",
    platform: "WhatsApp",
    targetRegion: "IN",
    riskLevel: "HIGH_RISK",
    riskScore: 0.91,
    status: "PUBLISHED",
    sourceType: "SEEDED",
    evidenceJson: [
      { field: "domain", value: "sbi-secure-login.co.in", why: "Same lookalike domain as 2 other reports in this campaign" },
      { field: "phrase", value: "your account will be suspended", why: "Identical urgency phrasing to prior campaign reports" },
      { field: "phone", value: "+917777654321", why: "Different contact number, same campaign infrastructure" },
    ],
    storyModeJson: [
      { phrase: "URGENT:", tactic: "urgency_deadline", explanation: "All-caps URGENT is a classic fear trigger" },
      { phrase: "flagged", tactic: "authority_impersonation", explanation: "Implies official investigation to increase compliance" },
      { phrase: "within 2 hours", tactic: "urgency_deadline", explanation: "Even shorter deadline than typical — designed to panic the recipient" },
    ],
    nextStepsJson: [
      "Do not click the link",
      "The 2-hour deadline is false — legitimate banks give ample notice",
      "Call SBI directly on 1800 11 2211",
    ],
    caveat: "Seeded demo record. Analyst-corroborated as part of KYC Fraud Campaign 1.",
  }, [
    { type: "DOMAIN", value: "sbi-secure-login.co.in", context: "Update KYC at sbi-secure-login.co.in" },
    { type: "PHONE", value: "+917777654321", context: "Contact +917777654321 for help" },
    { type: "TACTIC", value: "urgency_deadline", context: "URGENT...within 2 hours" },
    { type: "TACTIC", value: "credential_harvesting", context: "Update KYC at" },
    { type: "TACTIC", value: "authority_impersonation", context: "account has been flagged" },
    { type: "PHRASE", value: "your account will be suspended", context: "to avoid suspension" },
    { type: "PHRASE", value: "update your kyc immediately", context: "Update KYC" },
  ]);

  // Campaign 2: Reward Scam (Paytm)
  const r3 = await createReport({
    contentType: "message",
    rawContent: "Congratulations! You have won a cashback reward of Rs.5000 on your Paytm account. Click here to claim: bit.ly/ptm-reward-win. Offer expires in 30 minutes. Contact +919999876543.",
    publicSummary: "Fake Paytm cashback reward using URL shortener and time pressure.",
    platform: "SMS",
    targetRegion: "IN",
    riskLevel: "HIGH_RISK",
    riskScore: 0.88,
    status: "PUBLISHED",
    sourceType: "SEEDED",
    evidenceJson: [
      { field: "domain", value: "bit.ly", why: "URL shortener hides destination — legitimate companies use trackable branded links" },
      { field: "phrase", value: "you have won a cashback", why: "Unexpected reward is a classic lure to trigger impulsive action" },
      { field: "phrase", value: "click here to claim", why: "Drives to unknown link before victim can verify" },
      { field: "phone", value: "+919999876543", why: "Number linked to reward scam reports" },
    ],
    storyModeJson: [
      { phrase: "Congratulations!", tactic: "reward_lure", explanation: "Triggers positive emotion to lower guard" },
      { phrase: "You have won a cashback reward of Rs.5000", tactic: "reward_lure", explanation: "Specific amount makes the offer feel real and valuable" },
      { phrase: "Offer expires in 30 minutes", tactic: "urgency_deadline", explanation: "Extreme time pressure prevents verification" },
      { phrase: "bit.ly/ptm-reward-win", tactic: "credential_harvesting", explanation: "Shortened URL hides the actual phishing destination" },
    ],
    nextStepsJson: [
      "Do not click shortened links from unknown senders",
      "Paytm does not send reward notifications via SMS with bit.ly links",
      "Check Paytm app directly for any promotions",
      "Report on cybercrime.gov.in",
    ],
    caveat: "Seeded demo record. The bit.ly link was not visited during analysis — URL inspection was done offline.",
  }, [
    { type: "DOMAIN", value: "bit.ly", context: "bit.ly/ptm-reward-win" },
    { type: "DOMAIN", value: "paytm-cashback-win.com", context: "Paytm cashback" },
    { type: "PHONE", value: "+919999876543", context: "Contact +919999876543" },
    { type: "TACTIC", value: "reward_lure", context: "You have won a cashback" },
    { type: "TACTIC", value: "urgency_deadline", context: "Offer expires in 30 minutes" },
    { type: "TACTIC", value: "credential_harvesting", context: "Click here to claim: bit.ly" },
    { type: "PHRASE", value: "you have won a cashback", context: "You have won a cashback reward of Rs.5000" },
    { type: "PHRASE", value: "click here to claim", context: "Click here to claim: bit.ly" },
  ]);

  // Campaign 3: HDFC KYC
  const r4 = await createReport({
    contentType: "message",
    rawContent: "Alert from HDFC Bank: Your account KYC is incomplete. Update your KYC at hdfc-kyc-update.net or your account will be blocked. Share OTP sent to your mobile to verify identity.",
    publicSummary: "HDFC bank impersonation requesting KYC update and OTP via phishing site.",
    platform: "Email",
    targetRegion: "IN",
    riskLevel: "HIGH_RISK",
    riskScore: 0.95,
    status: "CORROBORATED",
    sourceType: "SEEDED",
    evidenceJson: [
      { field: "domain", value: "hdfc-kyc-update.net", why: "Lookalike domain — HDFC uses hdfcbank.com" },
      { field: "phrase", value: "share otp to verify", why: "Legitimate institutions never ask you to share OTPs" },
      { field: "phrase", value: "your account will be suspended", why: "Urgency threat" },
    ],
    storyModeJson: [
      { phrase: "Alert from HDFC Bank", tactic: "authority_impersonation", explanation: "Uses bank's name without any authentication" },
      { phrase: "KYC is incomplete", tactic: "urgency_deadline", explanation: "Creates compliance obligation to trigger action" },
      { phrase: "Share OTP sent to your mobile", tactic: "otp_request", explanation: "This is a major red flag — no legitimate bank ever asks for your OTP" },
    ],
    nextStepsJson: [
      "Never share your OTP with anyone — not even bank employees",
      "HDFC official domain is hdfcbank.com only",
      "Call HDFC on 1800 202 6161 to verify",
    ],
    caveat: "Seeded demo. Analyst-corroborated. Contains OTP request which is a definitive red flag.",
  }, [
    { type: "DOMAIN", value: "hdfc-kyc-update.net", context: "Update your KYC at hdfc-kyc-update.net" },
    { type: "TACTIC", value: "otp_request", context: "Share OTP sent to your mobile" },
    { type: "TACTIC", value: "authority_impersonation", context: "Alert from HDFC Bank" },
    { type: "TACTIC", value: "urgency_deadline", context: "account will be blocked" },
    { type: "PHRASE", value: "your account will be suspended", context: "account will be blocked" },
    { type: "PHRASE", value: "share otp to verify", context: "Share OTP sent to your mobile to verify identity" },
    { type: "PHRASE", value: "update your kyc immediately", context: "Update your KYC" },
  ]);

  // Low-risk / benign-looking example
  const r5 = await createReport({
    contentType: "url",
    rawContent: "aadhaar-verify-now.in/update",
    publicSummary: "URL submitted for analysis — matches government impersonation patterns.",
    platform: "WhatsApp",
    targetRegion: "IN",
    riskLevel: "HIGH_RISK",
    riskScore: 0.87,
    status: "UNDER_REVIEW",
    sourceType: "COMMUNITY",
    evidenceJson: [
      { field: "domain", value: "aadhaar-verify-now.in", why: "Unofficial domain impersonating UIDAI — official site is uidai.gov.in" },
      { field: "url_structure", value: "non-.gov.in TLD for government service", why: "All official Indian government services use .gov.in domain" },
    ],
    storyModeJson: [
      { phrase: "aadhaar-verify", tactic: "authority_impersonation", explanation: "Uses Aadhaar brand to appear official" },
      { phrase: "-now.in", tactic: "urgency_deadline", explanation: "The word 'now' in the domain suggests urgency" },
    ],
    nextStepsJson: [
      "Only use uidai.gov.in for Aadhaar services",
      "Do not enter Aadhaar or biometric data on this site",
    ],
    caveat: "Under analyst review. URL was analyzed offline — the link was not visited.",
  }, [
    { type: "DOMAIN", value: "aadhaar-verify-now.in", context: "aadhaar-verify-now.in/update" },
    { type: "TACTIC", value: "authority_impersonation", context: "aadhaar-verify" },
  ]);

  console.log(`✅ 5 seeded reports created`);

  // ── Match Evidence (Scam DNA) ───────────────────────────────
  await prisma.matchEvidence.upsert({
    where: { reportAId_reportBId: { reportAId: r1.id, reportBId: r2.id } },
    update: {},
    create: {
      reportAId: r1.id,
      reportBId: r2.id,
      similarityScore: 0.89,
      matchedClues: [
        { field: "domain", valueA: "sbi-secure-login.co.in", valueB: "sbi-secure-login.co.in", weight: 0.45, explanation: "Exact same phishing domain used in both reports" },
        { field: "phrase", valueA: "update your kyc immediately", valueB: "Update KYC", weight: 0.25, explanation: "Same core instruction, minor wording variation" },
        { field: "tactic", valueA: "urgency_deadline", valueB: "urgency_deadline", weight: 0.20, explanation: "Both use artificial deadline threats" },
      ],
      differences: [
        { field: "phone", valueA: "+918888123456", valueB: "+917777654321" },
        { field: "platform", valueA: "SMS", valueB: "WhatsApp" },
        { field: "deadline", valueA: "24 hours", valueB: "2 hours" },
      ],
    },
  });

  await prisma.matchEvidence.upsert({
    where: { reportAId_reportBId: { reportAId: r1.id, reportBId: r4.id } },
    update: {},
    create: {
      reportAId: r1.id,
      reportBId: r4.id,
      similarityScore: 0.71,
      matchedClues: [
        { field: "tactic", valueA: "credential_harvesting", valueB: "credential_harvesting", weight: 0.30, explanation: "Both use KYC update as pretext for credential theft" },
        { field: "phrase", valueA: "your account will be suspended", valueB: "account will be blocked", weight: 0.25, explanation: "Semantically equivalent suspension threat" },
        { field: "tactic", valueA: "authority_impersonation", valueB: "authority_impersonation", weight: 0.20, explanation: "Both impersonate major Indian banks" },
      ],
      differences: [
        { field: "domain", valueA: "sbi-secure-login.co.in", valueB: "hdfc-kyc-update.net" },
        { field: "brand", valueA: "SBI", valueB: "HDFC" },
        { field: "unique_to_B", valueA: null, valueB: "OTP request — significant escalation" },
      ],
    },
  });

  console.log("✅ Match evidence (Scam DNA) seeded");

  // ── Review decisions ────────────────────────────────────────
  await prisma.reviewDecision.createMany({
    data: [
      { reportId: r1.id, reviewerId: analyst.id, status: "PUBLISHED", rationale: "Confirmed KYC fraud campaign. Domain confirmed lookalike. Safe public summary published.", redactions: { removedFields: ["submitterIp"] } },
      { reportId: r2.id, reviewerId: analyst.id, status: "PUBLISHED", rationale: "Variant of Campaign 1. Same domain infrastructure, different contact number. Corroborated." },
      { reportId: r3.id, reviewerId: analyst.id, status: "PUBLISHED", rationale: "Paytm reward lure with URL shortener. Classic pattern. Safe summary published." },
      { reportId: r4.id, reviewerId: analyst.id, status: "CORROBORATED", rationale: "HDFC impersonation with OTP request — definitive red flag. Escalating to PUBLISHED pending final review." },
    ],
    skipDuplicates: true,
  });

  // ── Audit events ────────────────────────────────────────────
  await prisma.auditEvent.createMany({
    data: [
      { userId: analyst.id, reportId: r1.id, action: "REPORT_REVIEWED", detail: { decision: "PUBLISHED" } },
      { userId: analyst.id, reportId: r2.id, action: "REPORT_REVIEWED", detail: { decision: "PUBLISHED" } },
      { userId: analyst.id, reportId: r3.id, action: "REPORT_REVIEWED", detail: { decision: "PUBLISHED" } },
      { userId: analyst.id, reportId: r4.id, action: "REPORT_REVIEWED", detail: { decision: "CORROBORATED" } },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Review decisions and audit events seeded");
  console.log("\n🎉 Seed complete!");
  console.log(`   Analyst login: analyst@scamtrace.dev / analyst123`);
  console.log(`   Reports: ${[r1.id, r2.id, r3.id, r4.id, r5.id].length} seeded`);
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
