/**
 * Brand Impersonation Detection Engine
 * Adapted from BrandGuard detect.js by the same developer.
 * Detects fake social profiles, brand pages, and suspicious apps.
 */

// ─── Homoglyph / lookalike normalization ─────────────────────────────────────
const HOMOGLYPHS = {
  a: "аáàâäãå@4",
  b: "ƅɓ",
  c: "сçćč©",
  e: "еéèêëε3",
  g: "ɡ9",
  i: "íìîïıɪ1|!",
  l: "ĺłƖ1|",
  n: "ñńη",
  o: "оöóòôõø0",
  p: "рρƿ",
  r: "ŗřɾ",
  s: "ѕśš$5",
  t: "τţ+7",
  u: "üúùûμυ",
  v: "νʋ",
  w: "ѡωω",
  x: "×хƗ",
  y: "уýÿγ",
  z: "žźżζ",
};

function foldHomoglyphs(s) {
  return String(s)
    .toLowerCase()
    .split("")
    .map((c) => {
      for (const [base, variants] of Object.entries(HOMOGLYPHS)) {
        if (variants.includes(c)) return base;
      }
      return c;
    })
    .join("")
    .replace(/[^a-z0-9\s]/g, "");
}

// ─── Impersonation word signals ───────────────────────────────────────────────
const IMPERSONATION_WORDS = [
  "official", "support", "helpdesk", "customer_care", "verify", "legit",
  "real", "authentic", "genuine", "care", "help",
];

const SCAM_WORDS = [
  "giveaway", "airdrop", "free", "click here", "win", "prize",
  "claim", "kyc", "otp", "verify now", "limited offer", "discount",
  "cashback", "refund", "investment", "profit", "returns",
];

const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "cutt.ly"];
const SUSPICIOUS_TLDS = [".xyz", ".tk", ".ml", ".ga", ".cf", ".top", ".click", ".loan"];

// ─── Edit distance (Levenshtein) ──────────────────────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

// ─── Lookalike name detection (BrandGuard algorithm) ─────────────────────────
export function lookalikeName(rawCandidate, brandName) {
  const c = foldHomoglyphs(rawCandidate);
  const b = foldHomoglyphs(brandName);
  const cNoSpace = c.replace(/\s+/g, "");
  const bNoSpace = b.replace(/\s+/g, "");
  const techniques = [];
  let score = 0;

  // Exact match
  if (c === b) { score = 1.0; techniques.push("exact match"); return { score, techniques }; }

  // Spacing changes (e.g. "S B I" vs "SBI", "Pay tm" vs "Paytm")
  if (cNoSpace === bNoSpace && c !== b) {
    score = 0.92;
    techniques.push("spacing modification (inserted/removed spaces)");
    return { score, techniques };
  }

  // Exact match after homoglyph normalization (e.g. Cyrillic or leetspeak like "SB1")
  const rawLower = String(rawCandidate || "").toLowerCase();
  const brandLower = String(brandName || "").toLowerCase();
  if (cNoSpace === bNoSpace && rawLower.replace(/\s+/g, "") !== brandLower.replace(/\s+/g, "")) {
    score = 0.94;
    techniques.push("character substitution (homoglyphs/leetspeak)");
    return { score, techniques };
  }

  // Spacing variation contains brand name (e.g. "S B I Official Support")
  if (cNoSpace.includes(bNoSpace) && !c.includes(b)) {
    score = 0.86;
    techniques.push("spacing variation contains brand name");
    if (IMPERSONATION_WORDS.some((w) => cNoSpace.includes(w))) {
      techniques.push("impersonation word added");
      score = Math.min(1.0, score + 0.10);
    }
    return { score, techniques: [...new Set(techniques)] };
  }

  // Contains brand name
  if (c.includes(b)) {
    score = 0.82;
    techniques.push("contains brand name");
    if (IMPERSONATION_WORDS.some((w) => c.includes(w))) {
      techniques.push("impersonation word added");
      score = Math.min(1.0, score + 0.10);
    }
    return { score, techniques: [...new Set(techniques)] };
  }

  // Levenshtein distance on normalized text
  const dist = levenshtein(c, b);
  const maxLen = Math.max(c.length, b.length);
  if (maxLen > 0 && dist / maxLen < 0.35) {
    score = Math.min(0.88, 0.5 + (1 - dist / maxLen) * 0.4);
    techniques.push(dist === 1 ? "single character swap" : `${dist} character edit(s)`);
    if (c.length > b.length + 3) techniques.push("brand name + extra words");
  }

  // Levenshtein on unspaced strings
  if (score === 0) {
    const distNoSpace = levenshtein(cNoSpace, bNoSpace);
    const maxLenNoSpace = Math.max(cNoSpace.length, bNoSpace.length);
    if (maxLenNoSpace > 0 && distNoSpace / maxLenNoSpace < 0.35) {
      score = Math.min(0.85, 0.5 + (1 - distNoSpace / maxLenNoSpace) * 0.4);
      techniques.push(distNoSpace === 1 ? "single character substitution" : `${distNoSpace} character edit(s)`);
    }
  }

  // Homoglyph detection (original had special chars that normalized to brand)
  if (score === 0 && foldHomoglyphs(rawCandidate.toLowerCase()).includes(b)) {
    score = 0.79;
    techniques.push("homoglyph substitution");
  }

  // Impersonation words elevate score
  if (score > 0 && IMPERSONATION_WORDS.some((w) => c.replace(/\s+/g, "").includes(w))) {
    techniques.push("impersonation word (official/support/care)");
  }

  return { score, techniques: [...new Set(techniques)] };
}

// ─── Perceptual hash similarity ───────────────────────────────────────────────
export function hashSimilarity(h1, h2) {
  if (!h1 || !h2 || h1.length !== h2.length) return 0;
  let x = BigInt("0x" + h1) ^ BigInt("0x" + h2);
  let bits = 0;
  while (x) { bits += Number(x & 1n); x >>= 1n; }
  return 1 - bits / (h1.length * 4);
}

// ─── Text similarity (TF cosine) ─────────────────────────────────────────────
function tokens(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 2);
}

export function textSimilarity(a, b) {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.length || !tb.length) return 0;
  const fa = {}, fb = {};
  ta.forEach((t) => (fa[t] = (fa[t] || 0) + 1));
  tb.forEach((t) => (fb[t] = (fb[t] || 0) + 1));
  let dot = 0, na = 0, nb = 0;
  for (const k in fa) { na += fa[k] ** 2; if (fb[k]) dot += fa[k] * fb[k]; }
  for (const k in fb) nb += fb[k] ** 2;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// ─── URL / link signals ───────────────────────────────────────────────────────
function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
}

function linkSignals(link, officialDomain) {
  const out = [];
  const d = domainOf(link || "");
  if (!d) return out;
  if (officialDomain && (d === officialDomain || d.endsWith("." + officialDomain))) return out;
  if (SHORTENERS.some((s) => d === s)) out.push(`uses URL shortener (${d})`);
  else if (SUSPICIOUS_TLDS.some((t) => d.endsWith(t))) out.push(`suspicious TLD (${d})`);
  else out.push(`non-official domain (${d})`);
  if (String(link || "").startsWith("http://")) out.push("link not HTTPS");
  return out;
}

function scamSignals(text) {
  const t = String(text || "").toLowerCase();
  return SCAM_WORDS.filter((w) => t.includes(w));
}

function severity(score) {
  if (score >= 75) return "HIGH";
  if (score >= 50) return "MEDIUM";
  return "LOW";
}

const FLAG_THRESHOLD = 40;

// ─── Normalization helpers ──────────────────────────────────────────────────
export function normalizePlatform(p) {
  const s = String(p || "").toLowerCase();
  if (s.includes("twitter") || s.includes("x")) return "x";
  if (s.includes("insta")) return "instagram";
  if (s.includes("face") || s.includes("fb")) return "facebook";
  if (s.includes("link")) return "linkedin";
  if (s.includes("you")) return "youtube";
  return s;
}

export function normalizeStore(st) {
  const s = String(st || "").toLowerCase();
  if (s.includes("play") || s.includes("google")) return "google play";
  if (s.includes("apple") || s.includes("ios") || s.includes("app store")) return "apple app store";
  return s;
}

// ─── Official asset exclusion ────────────────────────────────────────────────
export function isOfficialSocial(item, brand) {
  const cleanItemHandle = String(item.handle || "").replace(/^@/, "").toLowerCase().trim();
  const itemPlatform = normalizePlatform(item.platform);

  return (brand.officialSocial || []).some((o) => {
    const cleanOfficialHandle = String(o.handle || "").replace(/^@/, "").toLowerCase().trim();
    if (!cleanOfficialHandle || cleanOfficialHandle !== cleanItemHandle) return false;
    const oPlatform = normalizePlatform(o.platform);
    return !itemPlatform || !oPlatform || itemPlatform === oPlatform;
  });
}

export function isOfficialApp(item, brand) {
  const cleanItemAppId = String(item.appId || "").toLowerCase().trim();
  const cleanItemName = String(item.name || "").toLowerCase().trim();
  const itemStore = normalizeStore(item.store);

  return (brand.officialApps || []).some((o) => {
    const cleanOfficialAppId = String(o.appId || "").toLowerCase().trim();
    const cleanOfficialName = String(o.name || "").toLowerCase().trim();
    const matchId = Boolean(cleanOfficialAppId && cleanItemAppId && cleanOfficialAppId === cleanItemAppId);
    const matchName = Boolean(cleanOfficialName && cleanItemName && (cleanOfficialName.includes(cleanItemName) || cleanItemName.includes(cleanOfficialName)));
    if (!matchId && !matchName) return false;
    const oStore = normalizeStore(o.store);
    return !itemStore || !oStore || itemStore === oStore;
  });
}

// ─── Score social profile ────────────────────────────────────────────────────
export function scoreSocial(item, brand) {
  const handleMatch = lookalikeName(item.handle || "", brand.name);
  const nameMatch = lookalikeName(item.displayName || "", brand.name);
  const best = handleMatch.score >= nameMatch.score ? handleMatch : nameMatch;
  const logoSim = hashSimilarity(item.logoHash, brand.logoHash);

  // Gate: no name or logo resemblance → not a candidate
  if (best.score < 0.6 && logoSim < 0.85) return null;

  const reasons = [];
  let score = best.score * 45;

  if (best.score >= 0.6) reasons.push(`Name similarity ${(best.score * 100).toFixed(0)}% — ${best.techniques.join(", ") || "close match"}`);
  if (logoSim >= 0.85) { score += logoSim * 20; reasons.push(`Logo ${(logoSim * 100).toFixed(0)}% similar to official brand logo`); }

  const bioSim = textSimilarity(item.bio || "", brand.description || "");
  if (bioSim > 0.25) { score += bioSim * 12; reasons.push(`Bio copies brand wording (${(bioSim * 100).toFixed(0)}% similar)`); }

  const claimsOfficial = /official|support|care|helpdesk/i.test((item.bio || "") + " " + (item.displayName || ""));
  if (claimsOfficial && best.score >= 0.6) { score += 5; reasons.push("Claims to be official/support account"); }

  const scam = scamSignals(item.bio || "");
  if (scam.length) { score += Math.min(15, scam.length * 5); reasons.push(`Scam language detected: ${scam.slice(0, 3).join(", ")}`); }

  const links = linkSignals(item.link, brand.domain);
  if (links.length) { score += Math.min(10, links.length * 5); reasons.push(...links); }

  if (item.createdDaysAgo !== undefined && item.createdDaysAgo < 90) { score += 5; reasons.push(`New account (${item.createdDaysAgo} days old)`); }
  if (item.followers !== undefined && item.followers < 5000 && best.score >= 0.6) { score += 2; reasons.push("Far fewer followers than the official brand"); }

  // Honest fan-page discount
  if (/unofficial|not affiliated|fan ?page/i.test(item.bio || "")) {
    score *= 0.55;
    reasons.push("Self-declared unofficial/fan page — score reduced");
  }

  score = Math.min(100, Math.round(score));
  if (score < FLAG_THRESHOLD) return null;

  return {
    score,
    severity: severity(score),
    reasons,
    techniques: best.techniques,
    matchedFields: {
      handle: handleMatch.score > 0.5 ? handleMatch : null,
      displayName: nameMatch.score > 0.5 ? nameMatch : null,
      logoSimilarity: logoSim > 0 ? logoSim : null,
    },
  };
}

// ─── Score app ───────────────────────────────────────────────────────────────
export function scoreApp(item, brand) {
  const nameMatch = lookalikeName(item.name || "", brand.name);
  const idMatch = lookalikeName((item.appId || "").split(".").join(" "), brand.name);
  const best = nameMatch.score >= idMatch.score ? nameMatch : idMatch;
  const logoSim = hashSimilarity(item.iconHash, brand.logoHash);

  if (best.score < 0.6 && logoSim < 0.85) return null;

  const reasons = [];
  let score = best.score * 40;

  if (best.score >= 0.6) reasons.push(`App name similarity ${(best.score * 100).toFixed(0)}% — ${best.techniques.join(", ") || "close match"}`);
  if (logoSim >= 0.85) { score += logoSim * 20; reasons.push(`App icon ${(logoSim * 100).toFixed(0)}% similar to official brand logo`); }

  const officialPublishers = new Set((brand.officialApps || []).map((a) => (a.publisher || "").toLowerCase()));
  if (item.publisher && !officialPublishers.has(item.publisher.toLowerCase())) {
    score += 15;
    reasons.push(`Publisher "${item.publisher}" is not an official brand publisher`);
  }

  const descSim = textSimilarity(item.description || "", brand.description || "");
  if (descSim > 0.3) { score += descSim * 15; reasons.push(`Description copies brand wording (${(descSim * 100).toFixed(0)}% similar)`); }

  const scam = scamSignals((item.description || "") + " " + (item.name || ""));
  if (scam.length) { score += Math.min(10, scam.length * 4); reasons.push(`Risky wording: ${scam.slice(0, 3).join(", ")}`); }

  if (item.releasedDaysAgo !== undefined && item.releasedDaysAgo < 60) {
    score += 5;
    reasons.push(`Very recent release (${item.releasedDaysAgo} days ago)`);
  }

  score = Math.min(100, Math.round(score));
  if (score < FLAG_THRESHOLD) return null;

  return { score, severity: severity(score), reasons, techniques: best.techniques };
}

// ─── Full scan ───────────────────────────────────────────────────────────────
export function scan(brand, socialItems = [], appItems = []) {
  const detections = [];
  const skippedOfficial = [];

  for (const item of socialItems) {
    if (isOfficialSocial(item, brand)) {
      skippedOfficial.push({ type: "social", id: item.id, label: `${item.platform}/@${item.handle}` });
      continue;
    }
    const r = scoreSocial(item, brand);
    if (r) detections.push({ type: "social", source: item.platform, item, ...r });
  }

  for (const item of appItems) {
    if (isOfficialApp(item, brand)) {
      skippedOfficial.push({ type: "app", id: item.id, label: `${item.store}/${item.appId}` });
      continue;
    }
    const r = scoreApp(item, brand);
    if (r) detections.push({ type: "app", source: item.store, item, ...r });
  }

  detections.sort((a, b) => b.score - a.score);

  return {
    detections,
    skippedOfficial,
    scanned: socialItems.length + appItems.length,
    summary: {
      total: detections.length,
      high: detections.filter((d) => d.severity === "HIGH").length,
      medium: detections.filter((d) => d.severity === "MEDIUM").length,
      low: detections.filter((d) => d.severity === "LOW").length,
    },
  };
}
