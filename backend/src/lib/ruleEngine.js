/**
 * ScamTrace Deterministic Rule Engine
 * Extracts indicators and assesses risk without LLM calls.
 * All findings are grounded in exact evidence from the submitted content.
 */

// ── Known bad indicators (in production: pulled from DB) ──────
const KNOWN_DOMAINS = {
  "sbi-secure-login.co.in": { brand: "SBI", tactic: "bank_impersonation", riskWeight: 0.45 },
  "hdfc-kyc-update.net":     { brand: "HDFC", tactic: "bank_impersonation", riskWeight: 0.45 },
  "aadhaar-verify-now.in":   { brand: "UIDAI", tactic: "government_impersonation", riskWeight: 0.40 },
  "paytm-cashback-win.com":  { brand: "Paytm", tactic: "reward_scam", riskWeight: 0.40 },
};

const KNOWN_PHONES = {
  "+918888123456": { campaign: "kyc_fraud_campaign_1", riskWeight: 0.35 },
  "+919999876543": { campaign: "reward_scam_campaign_1", riskWeight: 0.30 },
  "+917777654321": { campaign: "kyc_fraud_campaign_1", riskWeight: 0.35 },
};

// ── Tactic rules (phrase patterns → tactic + weight) ──────────
const TACTIC_RULES = [
  { pattern: /your account (will be|has been) (suspended|blocked|frozen|deactivated)/i, tactic: "urgency_deadline", weight: 0.20, why: "Threat of account loss creates panic to bypass rational thinking" },
  { pattern: /update your kyc\s*(immediately|now|urgently)?/i, tactic: "credential_harvesting", weight: 0.22, why: "KYC update requests via link/SMS are a common phishing vector" },
  { pattern: /share\s+(your\s+)?otp/i, tactic: "otp_request", weight: 0.30, why: "No legitimate institution ever asks you to share an OTP" },
  { pattern: /within \d+ (hours?|minutes?|days?)/i, tactic: "urgency_deadline", weight: 0.15, why: "Artificial deadline prevents careful verification" },
  { pattern: /(click here|tap here|visit here) to (claim|verify|update|confirm)/i, tactic: "credential_harvesting", weight: 0.18, why: "Drives to unverified external link" },
  { pattern: /you have (won|earned|received) (a )?(cashback|reward|prize|gift)/i, tactic: "reward_lure", weight: 0.20, why: "Unexpected reward is a classic lure to trigger impulsive action" },
  { pattern: /congratulations[!.]/i, tactic: "reward_lure", weight: 0.10, why: "Excitement trigger to lower skepticism" },
  { pattern: /(dear|valued)\s+(sbi|hdfc|icicic?|axis|paytm|amazon|flipkart)?\s*customer/i, tactic: "authority_impersonation", weight: 0.18, why: "Uses brand name without any authenticated channel" },
  { pattern: /alert from\s+(sbi|hdfc|icicic?|axis|paytm|uidai|rbi|government|pm|cbi|police)/i, tactic: "authority_impersonation", weight: 0.22, why: "Claims official authority without verifiable source" },
  { pattern: /(enter|provide|confirm)\s+(your\s+)?(password|pin|cvv|card number|bank details)/i, tactic: "credential_harvesting", weight: 0.30, why: "Requests highly sensitive financial credentials" },
  { pattern: /offer expires/i, tactic: "urgency_deadline", weight: 0.12, why: "Creates false urgency around claimed reward" },
];

// ── URL structure checks ───────────────────────────────────────
const URL_SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "cutt.ly", "rebrand.ly"];
const LEGIT_GOV_DOMAINS = [".gov.in", ".nic.in", ".india.gov.in"];
const OFFICIAL_BANK_DOMAINS = {
  sbi: ["sbi.co.in", "onlinesbi.sbi"],
  hdfc: ["hdfcbank.com"],
  icici: ["icicibank.com"],
  axis: ["axisbank.com"],
  paytm: ["paytm.com"],
  uidai: ["uidai.gov.in"],
};

// ── Normalizers ───────────────────────────────────────────────
const normalizePhone = (raw) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return `+${digits}`;
};

const extractDomains = (text) => {
  const matches = text.match(/(?:https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g) || [];
  return matches.map(m => m.replace(/^https?:\/\//, "").split("/")[0].toLowerCase());
};

const extractPhones = (text) => {
  const matches = text.match(/(?:\+91|0)?[6-9]\d{9}/g) || [];
  return matches.map(normalizePhone);
};

const checkURLStructure = (domain) => {
  const findings = [];

  if (URL_SHORTENERS.includes(domain)) {
    findings.push({ type: "url_shortener", domain, why: "URL shortener hides the real destination — legitimate companies use branded trackable links" });
  }

  // Check for impersonation of .gov.in using commercial TLDs
  if (domain.includes("aadhaar") || domain.includes("uidai") || domain.includes("gov-india")) {
    if (!LEGIT_GOV_DOMAINS.some(d => domain.endsWith(d))) {
      findings.push({ type: "govt_impersonation", domain, why: `Real government services use .gov.in — this domain uses an unofficial TLD` });
    }
  }

  // Check for bank lookalikes
  for (const [bank, legit] of Object.entries(OFFICIAL_BANK_DOMAINS)) {
    if (domain.includes(bank) && !legit.includes(domain)) {
      findings.push({ type: "lookalike_domain", domain, bank, why: `Legitimate ${bank.toUpperCase()} uses ${legit.join(" or ")} — this domain mimics the brand` });
    }
  }

  // Check for punycode / homoglyph indicators
  if (domain.startsWith("xn--")) {
    findings.push({ type: "punycode", domain, why: "Punycode domain can visually impersonate legitimate sites using lookalike characters" });
  }

  // Check for IP-as-host
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
    findings.push({ type: "ip_host", domain, why: "IP address instead of domain name — legitimate services always use named domains" });
  }

  // Suspicious subdomain patterns
  if ((domain.match(/\./g) || []).length >= 3) {
    findings.push({ type: "suspicious_subdomains", domain, why: "Excessive subdomains can obscure the real domain (e.g. sbi.login.evil.com)" });
  }

  return findings;
};

// ── Main Analyzer ─────────────────────────────────────────────
export const analyzeContent = (contentType, content) => {
  const evidence = [];
  const storyMode = [];
  const indicators = [];
  let riskScore = 0;

  const lowerContent = content.toLowerCase();

  // ── Extract domains
  const domains = extractDomains(content);
  for (const domain of domains) {
    const knownBad = KNOWN_DOMAINS[domain];
    if (knownBad) {
      evidence.push({
        field: "domain",
        value: domain,
        why: `Known phishing domain impersonating ${knownBad.brand}`,
        tactic: knownBad.tactic,
      });
      indicators.push({ type: "DOMAIN", value: domain, context: `Found in submitted content: ${domain}` });
      riskScore += knownBad.riskWeight;
    }

    // URL structure checks
    const structureFindings = checkURLStructure(domain);
    for (const sf of structureFindings) {
      if (!evidence.find(e => e.value === domain)) {
        evidence.push({ field: sf.type, value: domain, why: sf.why });
        riskScore += 0.15;
      }
      if (!indicators.find(i => i.value === domain)) {
        indicators.push({ type: "DOMAIN", value: domain, context: content.slice(0, 100) });
      }
    }
  }

  // ── Extract phones
  const phones = extractPhones(content);
  for (const phone of phones) {
    const knownBad = KNOWN_PHONES[phone];
    if (knownBad) {
      evidence.push({
        field: "phone",
        value: phone,
        why: `This number appears in ${knownBad.campaign.replace(/_/g, " ")} — linked to multiple scam reports`,
      });
      indicators.push({ type: "PHONE", value: phone, context: `Phone number extracted from content` });
      riskScore += knownBad.riskWeight;
    }
  }

  // ── Apply tactic rules
  const detectedTactics = new Set();
  for (const rule of TACTIC_RULES) {
    const match = content.match(rule.pattern);
    if (match) {
      const phrase = match[0];
      if (!detectedTactics.has(rule.tactic)) {
        evidence.push({ field: "phrase", value: phrase, why: rule.why, tactic: rule.tactic });
        storyMode.push({ phrase, tactic: rule.tactic, explanation: rule.why });
        indicators.push({ type: "PHRASE", value: phrase.toLowerCase(), context: phrase });
        indicators.push({ type: "TACTIC", value: rule.tactic, context: phrase });
        detectedTactics.add(rule.tactic);
        riskScore += rule.weight;
      }
    }
  }

  // ── Cap score and classify ──────────────────────────────────
  riskScore = Math.min(riskScore, 1.0);

  let riskLevel;
  if (riskScore >= 0.55) riskLevel = "HIGH_RISK";
  else if (riskScore >= 0.25) riskLevel = "NEEDS_CAUTION";
  else riskLevel = "LOW_SIGNAL";

  // ── Next steps based on risk ───────────────────────────────
  const nextSteps = buildNextSteps(riskLevel, detectedTactics, contentType);

  // ── Caveat ─────────────────────────────────────────────────
  const caveat = buildCaveat(riskLevel, evidence.length);

  return {
    riskLevel,
    riskScore: Math.round(riskScore * 100) / 100,
    evidence,
    storyMode,
    indicators,
    nextSteps,
    caveat,
  };
};

const buildNextSteps = (riskLevel, tactics, contentType) => {
  const steps = [];

  if (tactics.has("otp_request")) {
    steps.push("🚨 CRITICAL: Never share your OTP with anyone — not banks, government, or family");
  }
  if (tactics.has("credential_harvesting")) {
    steps.push("Do not click any links in this message");
    steps.push("If you already clicked, do not enter any credentials");
  }
  if (tactics.has("authority_impersonation")) {
    steps.push("Contact the organization directly using their official website or helpline number");
  }
  if (riskLevel === "HIGH_RISK") {
    steps.push("Report to cybercrime.gov.in or call 1930 (Cyber Crime Helpline)");
    steps.push("Block and delete the message/contact");
  }
  if (riskLevel === "NEEDS_CAUTION") {
    steps.push("Verify the sender through official channels before responding");
  }
  if (contentType === "url") {
    steps.push("Do not visit the URL — check the official website of the claimed organization directly");
  }

  steps.push("You can submit this as a community report to help protect others");
  return steps;
};

const buildCaveat = (riskLevel, evidenceCount) => {
  if (riskLevel === "LOW_SIGNAL") {
    return `${evidenceCount} risk signal(s) found. Low confidence — this content may be legitimate. Verify through official channels if uncertain.`;
  }
  if (riskLevel === "NEEDS_CAUTION") {
    return `${evidenceCount} risk signal(s) found. These are indicators, not proof. Exercise caution and verify before acting.`;
  }
  return `${evidenceCount} high-risk signal(s) found. Risk signals are indicators of scam patterns, not proof of criminal activity. Results are based on pattern matching against known scam indicators.`;
};
