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
  // ── Banking / Phishing ──
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

  // ── Threat / Violence / Intimidation ──
  { pattern: /(i will|we will|going to|gonna)\s+(kill|murder|hurt|harm|attack|beat|assault|destroy)\s+(you|your|u)/i, tactic: "violence_threat", weight: 0.40, why: "Direct threat of physical violence — a criminal offence and a common extortion tactic" },
  { pattern: /(kill|murder|hurt|harm|attack|beat|shoot|stab|bomb|destroy)\s+(you|your|u|ur)\s*(family|wife|husband|children|kids|parents|mother|father|son|daughter)?/i, tactic: "violence_threat", weight: 0.40, why: "Threat of physical violence targeting the victim or their family" },
  { pattern: /(you are|you're|ur|u r)\s+(dead|finished|done for)/i, tactic: "violence_threat", weight: 0.35, why: "Implied death threat used to intimidate" },
  { pattern: /i know where you\s+(live|stay|work|study)/i, tactic: "stalking_threat", weight: 0.35, why: "Claiming knowledge of victim's location is a stalking/intimidation tactic" },
  { pattern: /(watching|tracking|following)\s+(you|your|u|ur)/i, tactic: "stalking_threat", weight: 0.30, why: "Surveillance threat to create fear and compliance" },
  { pattern: /your\s+(life|safety|family)\s+(is|are)\s+in\s+danger/i, tactic: "violence_threat", weight: 0.35, why: "Direct safety threat used to coerce the victim" },
  { pattern: /face\s+(the\s+)?consequences/i, tactic: "intimidation", weight: 0.25, why: "Vague threat of consequences used to pressure compliance" },
  { pattern: /you will (regret|suffer|pay for)/i, tactic: "intimidation", weight: 0.30, why: "Threatening retaliation to force compliance" },
  { pattern: /(don'?t|do not)\s+(ignore|test)\s+(me|us|this)/i, tactic: "intimidation", weight: 0.20, why: "Intimidation language demanding obedience" },
  { pattern: /last (warning|chance|opportunity)/i, tactic: "intimidation", weight: 0.25, why: "Final-ultimatum language to create maximum urgency" },
  { pattern: /blood\s+on\s+your\s+hands/i, tactic: "violence_threat", weight: 0.35, why: "Violent imagery used as a threat" },

  // ── Extortion / Blackmail / Ransom ──
  { pattern: /(pay|send|transfer)\s+(me|us)?\s*(money|₹|rs\.?|inr|dollars?|\$|bitcoin|btc|crypto|upi)/i, tactic: "extortion", weight: 0.30, why: "Demand for payment — hallmark of extortion or ransom scam" },
  { pattern: /(pay|send|transfer)\s+(money|₹|rs\.?|amount|funds)?\s*(or|otherwise|else)/i, tactic: "extortion", weight: 0.35, why: "Payment demand with implied threat — classic extortion pattern" },
  { pattern: /(blackmail|extort|ransom)/i, tactic: "extortion", weight: 0.35, why: "Explicit use of extortion/blackmail terminology" },
  { pattern: /(leak|release|publish|expose|share|upload|post)\s+(your\s+)?(photos?|pictures?|videos?|images?|nudes?|private|personal|intimate|data|info)/i, tactic: "sextortion", weight: 0.40, why: "Threatening to expose private/intimate content — a sextortion or blackmail tactic" },
  { pattern: /(i|we)\s+(have|got|possess)\s+(your\s+)?(photos?|pictures?|videos?|recordings?|private|personal|intimate|nude|data|information)/i, tactic: "sextortion", weight: 0.35, why: "Claiming possession of private content to extort the victim" },
  { pattern: /(everyone|all|contacts|friends|family)\s+(will|gonna)\s+(see|know|find out)/i, tactic: "sextortion", weight: 0.30, why: "Threat to expose information to social circle — pressure tactic" },
  { pattern: /send\s+(money|payment).*(or|otherwise).*(leak|release|publish|expose|share)/i, tactic: "sextortion", weight: 0.45, why: "Direct sextortion: pay-or-leak demand" },
  { pattern: /(we|i)\s+(have|got)\s+(your|ur)\s+(data|information|details|files)/i, tactic: "extortion", weight: 0.25, why: "Claiming data theft to pressure the victim" },
  { pattern: /pay\s+(ransom|up|now|immediately)/i, tactic: "extortion", weight: 0.35, why: "Explicit ransom or payment demand" },

  // ── Digital Arrest / Law-Enforcement Impersonation ──
  { pattern: /(arrest|fir|warrant|case\s+filed|police\s+complaint|legal\s+action|court\s+order|summons|notice)\s*(against|for|on)\s*(you|your|u)/i, tactic: "digital_arrest", weight: 0.35, why: "Fake legal action threat — 'digital arrest' scam impersonating law enforcement" },
  { pattern: /(this is|i am|we are)\s+(from\s+)?(cyber\s*cell|cyber\s*crime|police|cbi|cid|enforcement|narcotics|customs|income\s*tax|ed\s)/i, tactic: "digital_arrest", weight: 0.35, why: "Impersonating law enforcement — real officers never contact via WhatsApp/SMS for arrests" },
  { pattern: /arrest warrant/i, tactic: "digital_arrest", weight: 0.35, why: "Fake arrest warrant threat — no legitimate warrant is delivered via message" },
  { pattern: /your\s+(aadhaar|pan|account)\s+(is|has been)\s+(used|linked|involved)\s+(in|for|with)\s+(money\s*laundering|drug|terrorism|fraud|illegal)/i, tactic: "digital_arrest", weight: 0.40, why: "False accusation of serious crime to panic the victim into paying" },
  { pattern: /(money\s*laundering|drug\s*trafficking|terrorism|hawala|illegal\s*transaction)/i, tactic: "digital_arrest", weight: 0.20, why: "Mention of serious criminal charges often used in digital arrest scams" },

  // ── Job / Money Mule Scams ──
  { pattern: /(work from home|earn from home|online job|part.?time job|daily earning|earn\s+₹|earn\s+rs)/i, tactic: "job_scam", weight: 0.20, why: "Work-from-home job offers are a top recruitment tactic for money mule and task scams" },
  { pattern: /(earn|make|income)\s+(₹|rs\.?|upi)?\s*\d{3,}\s*(per|a|every|each)\s*(day|hour|task|click)/i, tactic: "job_scam", weight: 0.30, why: "Unrealistic earning claims are a hallmark of task-based scam jobs" },
  { pattern: /(guaranteed|assured|fixed)\s+(income|returns?|earnings?|salary|profit)/i, tactic: "investment_scam", weight: 0.25, why: "No legitimate investment guarantees fixed returns — this is a scam indicator" },
  { pattern: /(join|click|register)\s+(our\s+)?(telegram|whatsapp)\s+(group|channel)/i, tactic: "job_scam", weight: 0.20, why: "Redirecting to Telegram/WhatsApp groups is a common scam recruitment tactic" },

  // ── Loan / Advance Fee Fraud ──
  { pattern: /(instant|quick|easy)\s+(loan|credit|cash|money|approval)/i, tactic: "loan_scam", weight: 0.20, why: "Instant loan offers are often fronts for predatory lending or data theft" },
  { pattern: /pay\s*(a\s+)?(processing|registration|security|insurance|verification)\s+fee/i, tactic: "advance_fee_fraud", weight: 0.30, why: "Asking for upfront fees before delivering service — classic advance fee fraud" },
  { pattern: /(no\s+documents?|no\s+cibil|no\s+credit\s*check|100%\s+approval)/i, tactic: "loan_scam", weight: 0.25, why: "No-document loan promises bypass legitimate verification — a fraud indicator" },

  // ── Investment / Crypto Scams ──
  { pattern: /(double|triple|10x|100x)\s+(your\s+)?(money|investment|returns)/i, tactic: "investment_scam", weight: 0.30, why: "Unrealistic return promises are the hallmark of Ponzi and investment scams" },
  { pattern: /(invest|deposit)\s+(now|today|immediately)\s+(and\s+)?(get|earn|receive)/i, tactic: "investment_scam", weight: 0.25, why: "Urgent investment pressure is a manipulation tactic" },
  { pattern: /(bitcoin|crypto|forex|trading)\s+(profit|opportunity|scheme|guaranteed)/i, tactic: "investment_scam", weight: 0.25, why: "Crypto/forex profit schemes are overwhelmingly fraudulent" },

  // ── General Social Engineering ──
  { pattern: /(don'?t|do not)\s+(tell|inform|share|mention)\s+(anyone|police|family|parents)/i, tactic: "isolation_tactic", weight: 0.30, why: "Isolating the victim from help is a key manipulation strategy" },
  { pattern: /keep\s+(this|it)\s+(secret|confidential|private|between\s+us)/i, tactic: "isolation_tactic", weight: 0.25, why: "Demanding secrecy prevents the victim from seeking help" },
  { pattern: /(urgent|immediate|emergency|critical)\s*(action|attention|response|reply)\s*(needed|required|necessary)?/i, tactic: "urgency_deadline", weight: 0.20, why: "Manufactured urgency to prevent careful thinking" },
  { pattern: /(verify|confirm|validate)\s+(your\s+)?(identity|account|details)\s+(now|immediately|urgently)/i, tactic: "credential_harvesting", weight: 0.22, why: "Urgent identity verification requests are a phishing tactic" },
  { pattern: /(suspicious|unauthorized|illegal)\s+(activity|transaction|login|access)\s+(detected|found|noticed)/i, tactic: "urgency_deadline", weight: 0.22, why: "Fake security alert to create panic and trick into revealing credentials" },
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

  // ── Violence / Stalking ──
  if (tactics.has("violence_threat") || tactics.has("stalking_threat")) {
    steps.push("🚨 EMERGENCY: If you feel in immediate danger, call 112 (Police Emergency) right now");
    steps.push("Screenshot/save all threatening messages as evidence");
    steps.push("File an FIR at your nearest police station or online at cybercrime.gov.in");
    steps.push("Do NOT respond to the threatener — it can escalate the situation");
  }

  // ── Extortion / Blackmail / Sextortion ──
  if (tactics.has("extortion") || tactics.has("sextortion")) {
    steps.push("🚨 Do NOT pay any money — paying never stops the demands");
    steps.push("Do NOT delete conversations — save all evidence (screenshots, recordings)");
    steps.push("Report immediately at cybercrime.gov.in or call 1930 (Cyber Crime Helpline)");
    if (tactics.has("sextortion")) {
      steps.push("Block the account on all platforms and report it to the platform");
      steps.push("Remember: you are NOT at fault — this is a crime committed against you");
    }
  }

  // ── Digital Arrest ──
  if (tactics.has("digital_arrest")) {
    steps.push("🚨 This is a 'Digital Arrest' scam — NO real police/CBI officer contacts via WhatsApp or SMS");
    steps.push("Real arrest warrants are served in person by uniformed officers, never via phone/video call");
    steps.push("Do NOT transfer any money or share personal details");
    steps.push("Verify any claims by calling the organization directly through their official number");
  }

  // ── Intimidation ──
  if (tactics.has("intimidation") && !tactics.has("violence_threat")) {
    steps.push("Do NOT be pressured into acting immediately — take time to verify");
    steps.push("Contact a trusted friend, family member, or authority before responding");
  }

  // ── Isolation ──
  if (tactics.has("isolation_tactic")) {
    steps.push("⚠️ The sender is trying to isolate you — this is a manipulation tactic");
    steps.push("Talk to a trusted person immediately — scammers rely on secrecy");
  }

  // ── OTP / Credential Harvesting ──
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

  // ── Job / Money Mule ──
  if (tactics.has("job_scam")) {
    steps.push("⚠️ Legitimate employers never ask you to pay upfront or promise unrealistic daily earnings");
    steps.push("Never share your bank account for 'receiving' or 'forwarding' money — this is money muling (a crime)");
  }

  // ── Investment / Crypto ──
  if (tactics.has("investment_scam")) {
    steps.push("⚠️ No legitimate investment guarantees fixed returns — if it sounds too good, it's a scam");
    steps.push("Check the RBI/SEBI registered entity list before investing");
  }

  // ── Loan / Advance Fee ──
  if (tactics.has("loan_scam") || tactics.has("advance_fee_fraud")) {
    steps.push("⚠️ Legitimate banks never ask for processing fees before loan approval");
    steps.push("Verify the lender on the RBI's list of registered NBFCs");
  }

  // ── General risk-based steps ──
  if (riskLevel === "HIGH_RISK") {
    if (!steps.some(s => s.includes("cybercrime.gov.in"))) {
      steps.push("Report to cybercrime.gov.in or call 1930 (Cyber Crime Helpline)");
    }
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
