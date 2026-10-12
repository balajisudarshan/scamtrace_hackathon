/**
 * ScamTrace Deterministic Rule Engine
 * Extracts indicators and assesses risk without LLM calls.
 * All findings are grounded in exact evidence from the submitted content.
 */

// ── Known bad indicators (in production: pulled from DB) ──────
const KNOWN_DOMAINS = {
  "sbi-secure-login.co.in":     { brand: "SBI",    tactic: "bank_impersonation",       riskWeight: 0.45 },
  "hdfc-kyc-update.net":        { brand: "HDFC",   tactic: "bank_impersonation",       riskWeight: 0.45 },
  "aadhaar-verify-now.in":      { brand: "UIDAI",  tactic: "government_impersonation", riskWeight: 0.40 },
  "paytm-cashback-win.com":     { brand: "Paytm",  tactic: "reward_scam",              riskWeight: 0.40 },
  "icici-secure-verify.com":    { brand: "ICICI",  tactic: "bank_impersonation",       riskWeight: 0.45 },
  "sbi-onlinebanking.in":       { brand: "SBI",    tactic: "bank_impersonation",       riskWeight: 0.45 },
  "rbi-kyc-update.net":         { brand: "RBI",    tactic: "government_impersonation", riskWeight: 0.45 },
  "pm-kisan-claim.com":         { brand: "PMO",    tactic: "government_impersonation", riskWeight: 0.40 },
  "amazon-prize-winner.in":     { brand: "Amazon", tactic: "reward_scam",              riskWeight: 0.40 },
  "flipkart-offer-win.com":     { brand: "Flipkart", tactic: "reward_scam",            riskWeight: 0.40 },
  "jio-cashback-offer.net":     { brand: "Jio",    tactic: "reward_scam",              riskWeight: 0.35 },
  "axis-bank-kyc.co.in":        { brand: "Axis",   tactic: "bank_impersonation",       riskWeight: 0.45 },
};

const KNOWN_PHONES = {
  "+918888123456": { campaign: "kyc_fraud_campaign_1", riskWeight: 0.35 },
  "+919999876543": { campaign: "reward_scam_campaign_1", riskWeight: 0.30 },
  "+917777654321": { campaign: "kyc_fraud_campaign_1", riskWeight: 0.35 },
};

// ── Tactic rules (phrase patterns → tactic + weight) ──────────
// ── Tactic rules (phrase patterns → tactic + weight) ──────────
const TACTIC_RULES = [
  // 1. Urgency and time pressure
  { pattern: /\burgent\b/i, tactic: "urgency_pressure", weight: 0.20, why: "Urgent wording creates psychological pressure to bypass rational evaluation" },
  { pattern: /\b(immediately|right now|urgently|asap)\b/i, tactic: "urgency_pressure", weight: 0.18, why: "Extreme time pressure forces impulsive action before checking facts" },
  { pattern: /within \d+ (hours?|minutes?|days?)/i, tactic: "urgency_pressure", weight: 0.18, why: "Artificial countdown deadline prevents careful verification" },
  { pattern: /within 24 hours/i, tactic: "urgency_pressure", weight: 0.18, why: "Short deadline creates fear of missing out or penalty" },
  { pattern: /last (chance|opportunity|warning)/i, tactic: "urgency_pressure", weight: 0.15, why: "Artificial deadline warning designed to provoke panic" },
  { pattern: /offer expires/i, tactic: "urgency_pressure", weight: 0.12, why: "Artificial expiration creates urgency around claimed reward" },
  { pattern: /urgent.{0,20}(action|update|verify|call|response)/i, tactic: "urgency_pressure", weight: 0.18, why: "Urgent call to action to bypass rational verification" },

  // 2. Threat of account suspension
  { pattern: /(your\s+)?(bank\s+)?account (will be|has been|is|is being) (suspended|blocked|frozen|deactivated|closed|terminated)/i, tactic: "account_suspension_threat", weight: 0.25, why: "Threatens immediate loss of bank account access to coerce compliance" },
  { pattern: /(blocked|suspended|deactivated|frozen|closed)\s+today/i, tactic: "account_suspension_threat", weight: 0.22, why: "Threatens imminent account blockage today to force immediate action" },
  { pattern: /(permanent|immediate)\s+(suspension|blocking|deactivation|closure|termination)/i, tactic: "account_suspension_threat", weight: 0.25, why: "Threatens permanent account suspension if instructions are not followed" },
  { pattern: /(will result in|leads to|results in)\s+(permanent\s+)?(suspension|deactivation|blocking|closure)/i, tactic: "account_suspension_threat", weight: 0.25, why: "Conditions account survival on clicking or complying immediately" },
  { pattern: /failure to (verify|update|complete|reactivate|act).{0,35}(suspension|blocked|deactivated|closed|terminated)/i, tactic: "account_suspension_threat", weight: 0.25, why: "Threatens punitive suspension if the victim hesitates to comply" },
  { pattern: /account (suspended|blocked|frozen|deactivated|terminated)/i, tactic: "account_suspension_threat", weight: 0.18, why: "Threat of losing access forces panic reaction" },
  { pattern: /your (phone|sim|account|mobile) will be (blocked|deactivated|suspended) in \d+/i, tactic: "account_suspension_threat", weight: 0.22, why: "Threat of service disruption coerces immediate compliance" },

  // 3. Bank & KYC impersonation indicators
  { pattern: /kyc (verification|update|expired|has expired|required|pending)/i, tactic: "bank_kyc_impersonation", weight: 0.25, why: "KYC expiration claims via unverified channels are classic bank phishing indicators" },
  { pattern: /update your kyc\s*(immediately|now|urgently)?/i, tactic: "bank_kyc_impersonation", weight: 0.25, why: "Unsolicited KYC update requests are a primary vector for identity and credential theft" },
  { pattern: /complete your (kyc|verification|profile|registration)/i, tactic: "bank_kyc_impersonation", weight: 0.20, why: "Unsolicited KYC completion requests mimic financial institutions" },
  { pattern: /your (bank account|sbi|hdfc|icici|axis|kotak|pnb|canara|bank)\s*(account)?/i, tactic: "bank_kyc_impersonation", weight: 0.20, why: "Impersonates bank account status in unsolicited message" },
  { pattern: /reactivate your (account|bank account|card)/i, tactic: "bank_kyc_impersonation", weight: 0.20, why: "Reactivation prompts via unsolicited messages mimic banking customer care" },
  { pattern: /verify your (account|identity|details|mobile|aadhaar|pan)/i, tactic: "bank_kyc_impersonation", weight: 0.18, why: "Verification requests via unofficial channel harvest sensitive user identity data" },

  // 4. Pressure to click a link
  { pattern: /(click|tap|open|follow|visit)\s+(the\s+)?link\s+(below|here|above|provided|immediately)?/i, tactic: "link_pressure", weight: 0.20, why: "Pressures recipient to click an unverified link instead of using official channels" },
  { pattern: /(click|tap)\s+here\s+to\s+(claim|verify|update|confirm|login|access|reactivate)/i, tactic: "link_pressure", weight: 0.20, why: "Drives victim directly to unverified external link for credential theft" },
  { pattern: /(link below|following link)\s+(immediately|to|for)?/i, tactic: "link_pressure", weight: 0.18, why: "Directs user towards an unverified link embedded in message" },

  // Credential harvesting & data theft
  { pattern: /(enter|provide|confirm|submit)\s+(your\s+)?(password|pin|cvv|card number|bank details|account number)/i, tactic: "credential_harvesting", weight: 0.30, why: "Requests highly sensitive financial credentials" },

  // OTP fraud
  { pattern: /share\s+(your\s+)?otp/i, tactic: "otp_request", weight: 0.35, why: "No legitimate institution ever asks you to share an OTP" },
  { pattern: /send (the|your|an?)\s+otp/i, tactic: "otp_request", weight: 0.35, why: "OTP sharing requests are always fraudulent" },
  { pattern: /otp.{0,30}(bank|account|reversal|refund|credit)/i, tactic: "otp_request", weight: 0.30, why: "Using OTP to authorize a 'reversal' steals money instead" },

  // Authority & brand impersonation
  { pattern: /(dear|valued)\s+(sbi|hdfc|icici|axis|paytm|amazon|flipkart|jio|airtel|rbi|uidai|government|police|cbi|customs)?\s*customer/i, tactic: "authority_impersonation", weight: 0.20, why: "Uses brand name without any authenticated channel" },
  { pattern: /alert from\s+(sbi|hdfc|icici|axis|paytm|uidai|rbi|government|pm|cbi|police|customs|income tax)/i, tactic: "authority_impersonation", weight: 0.25, why: "Claims official authority without verifiable source" },
  { pattern: /(rbi|reserve bank|sebi|income tax|customs|enforcement directorate|ed|cbi|crime branch) (notice|alert|warning|order|directive)/i, tactic: "authority_impersonation", weight: 0.28, why: "Government agencies never send notices via SMS or WhatsApp" },

  // Reward & prize scams
  { pattern: /you have (won|earned|received|been selected for) (a |an )?(cashback|reward|prize|gift|lottery|jackpot)/i, tactic: "reward_lure", weight: 0.22, why: "Unexpected reward is a classic lure to trigger impulsive action" },
  { pattern: /congratulations[!.,]/i, tactic: "reward_lure", weight: 0.12, why: "Excitement trigger to lower skepticism" },
  { pattern: /(Rs\.?|INR|₹)\s*[\d,]+\s*(reward|cashback|prize|refund|winning|bonus)/i, tactic: "reward_lure", weight: 0.20, why: "Specific money amount in unsolicited message is a lure tactic" },
  { pattern: /claim (your|the) (reward|cashback|prize|gift|money|amount|refund)/i, tactic: "reward_lure", weight: 0.20, why: "Claiming rewards via link is a classic phishing vector" },

  // Digital arrest & police threats
  { pattern: /(arrest|warrant|fir|case filed|legal action|court notice|summons)/i, tactic: "fear_threat", weight: 0.25, why: "Threat of legal action creates panic, a key tactic in digital arrest scams" },
  { pattern: /(digital arrest|cyber crime unit|cbi investigation|narcotics|customs detention)/i, tactic: "fear_threat", weight: 0.30, why: "'Digital arrest' is a known scam — police never arrest via phone/video call" },
  { pattern: /(stay on call|stay on video|do not tell anyone|keep this confidential|do not disconnect)/i, tactic: "isolation_control", weight: 0.35, why: "Isolation tactics prevent victims from seeking help — hallmark of digital arrest scam" },
  { pattern: /(drugs|narcotics|smuggling|package intercepted|parcel blocked)/i, tactic: "fear_threat", weight: 0.28, why: "False drug/smuggling accusations used to coerce payments" },

  // UPI & payment reversal fraud
  { pattern: /(upi|gpay|phonepe|paytm).{0,30}(reverse|refund|wrong transfer|sent by mistake)/i, tactic: "payment_reversal_fraud", weight: 0.30, why: "UPI 'reversal' requests are scams — accepting a collect request SENDS money, not receives" },
  { pattern: /wrong.{0,20}(transfer|payment|sent).{0,20}(return|refund|back)/i, tactic: "payment_reversal_fraud", weight: 0.28, why: "Claiming wrong transfer to trick you into sending money back" },
  { pattern: /collect.{0,15}request|approve (the )?payment/i, tactic: "payment_reversal_fraud", weight: 0.25, why: "Approving a payment collect request in UPI apps DEDUCTS from your account" },

  // Investment & job scams
  { pattern: /investment (platform|opportunity|scheme|plan).{0,30}(return|profit)/i, tactic: "investment_fraud", weight: 0.25, why: "Unsolicited investment opportunities with promised returns are fraudulent" },
  { pattern: /(trading|forex|crypto|stock).{0,20}(guaranteed|100%|sure profit|fixed returns)/i, tactic: "investment_fraud", weight: 0.25, why: "Guaranteed returns in trading/crypto are a known fraud pattern" },
  { pattern: /(like|subscribe|rate|review).{0,20}(earn|get paid|Rs|INR)/i, tactic: "job_scam", weight: 0.22, why: "Pay-per-task scams ask you to pay upfront to receive earnings" },

  // Social isolation
  { pattern: /do not (share|tell|inform|discuss).{0,20}(anyone|family|police|bank)/i, tactic: "isolation_control", weight: 0.30, why: "Instructing secrecy prevents victims from getting help" },
  { pattern: /(customer care|helpline|toll.?free).{0,20}(\d{10}|1800)/i, tactic: "fake_helpline", weight: 0.18, why: "Fake customer care numbers redirect calls to scammers" },
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
  if (riskScore >= 0.45) riskLevel = "HIGH_RISK";
  else if (riskScore >= 0.18) riskLevel = "NEEDS_CAUTION";
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

  if (tactics.has("link_pressure")) {
    steps.push("🚨 CRITICAL: Do NOT click any links in this message — links in unsolicited messages lead to phishing sites designed to steal bank credentials");
  }
  if (tactics.has("bank_kyc_impersonation")) {
    steps.push("Legitimate banks NEVER demand KYC updates or account reactivation via SMS links. Verify directly through your official mobile banking app");
  }
  if (tactics.has("account_suspension_threat")) {
    steps.push("Do not panic over account blockage threats — banks follow formal regulatory processes and never freeze accounts via immediate SMS ultimatums");
  }
  if (tactics.has("urgency_pressure")) {
    steps.push("Artificial countdown deadlines (e.g. within 30 minutes) are a psychological pressure tactic to bypass rational thinking");
  }
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
  if (tactics.has("fear_threat") || tactics.has("isolation_control")) {
    steps.push("🚨 CRITICAL: Police/CBI never arrest people via phone or video call — this is 'Digital Arrest' scam");
    steps.push("Hang up immediately. Call 1930 (Cyber Crime Helpline) or 112 for police");
    steps.push("Talk to a trusted family member or friend before taking any action");
  }
  if (tactics.has("payment_reversal_fraud")) {
    steps.push("🚨 CRITICAL: In UPI, accepting a 'collect request' SENDS money from your account — it never receives money");
    steps.push("Block and report the sender immediately to your UPI app");
  }
  if (tactics.has("investment_fraud")) {
    steps.push("There are no guaranteed returns in trading/crypto — this is a known investment scam pattern");
    steps.push("Never invest based on unsolicited messages. Verify with SEBI at scores.sebi.gov.in");
  }
  if (tactics.has("job_scam")) {
    steps.push("Legitimate employers never ask you to pay to get paid — this is a job/task scam");
    steps.push("Block and report the sender immediately");
  }
  if (tactics.has("fake_helpline")) {
    steps.push("Call the official helpline from the company's official website, not numbers in messages");
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
