import sharp from "sharp";
import { createWorker } from "tesseract.js";
import fs from "fs";
import { TRUSTED_BRANDS, findCatalogBrand, autoDetectBrandFromCandidate } from "./brandCatalog.js";
import { aiCompareLogos, aiEnabled } from "./aiVision.js";
import { searchAuthoritativeBrandReference } from "./brandReferenceSearch.js";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SCAMTRACE: Logo Authenticity & Visual Comparison Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Evaluates uploaded brand logos, app icons, and profile avatars against
 * verified official reference assets.
 * 
 * Pipeline:
 *  1. Format & Dimensions Validation
 *  2. OCR Text & Spelling Extraction
 *  3. Authoritative Brand & Reference Logo Identification
 *  4. Perceptual dHash Computation (Hamming distance)
 *  5. Color Palette & RGB Distribution Comparison
 *  6. Aspect Ratio & Geometric Layout Analysis
 *  7. Altered Letter & Typosquatting Analysis
 *  8. Multi-Factor Similarity Calculation
 *  9. 4-Tier Categorization & Explainable Difference Reporting
 */

// ─── 1. Perceptual dHash (Difference Hash) ──────────────────────────────────
export async function computeDHash(imageInput) {
  try {
    // 9x8 grayscale for horizontal gradient differences
    const { data } = await sharp(imageInput)
      .resize(9, 8, { fit: "fill" })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let hash = 0n;
    let bitIndex = 0n;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const left = data[row * 9 + col];
        const right = data[row * 9 + col + 1];
        if (left > right) {
          hash |= 1n << (63n - bitIndex);
        }
        bitIndex++;
      }
    }
    return hash.toString(16).padStart(16, "0");
  } catch (err) {
    console.warn("computeDHash error:", err.message);
    return null;
  }
}

export function computeHammingDistance(hexHash1, hexHash2) {
  if (!hexHash1 || !hexHash2) return 64;
  try {
    const val1 = BigInt(`0x${hexHash1}`);
    const val2 = BigInt(`0x${hexHash2}`);
    let xor = val1 ^ val2;
    let distance = 0;
    while (xor > 0n) {
      if (xor & 1n) distance++;
      xor >>= 1n;
    }
    return distance;
  } catch (_) {
    return 64;
  }
}

// ─── 2. Color Palette & Dominant Stats ───────────────────────────────────────
export async function extractColorStats(imageInput) {
  try {
    const stats = await sharp(imageInput).stats();
    const channels = stats.channels;
    const r = channels[0]?.mean ?? 128;
    const g = channels[1]?.mean ?? 128;
    const b = channels[2]?.mean ?? 128;

    const rHex = Math.round(r).toString(16).padStart(2, "0");
    const gHex = Math.round(g).toString(16).padStart(2, "0");
    const bHex = Math.round(b).toString(16).padStart(2, "0");

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      hex: `#${rHex}${gHex}${bHex}`.toUpperCase(),
      stdev: [
        Math.round(channels[0]?.stdev ?? 0),
        Math.round(channels[1]?.stdev ?? 0),
        Math.round(channels[2]?.stdev ?? 0),
      ],
    };
  } catch (err) {
    console.warn("extractColorStats error:", err.message);
    return { r: 128, g: 128, b: 128, hex: "#808080", stdev: [0, 0, 0] };
  }
}

export function calculateColorSimilarity(color1, color2) {
  if (!color1 || !color2) return 50;
  // Euclidean distance normalized across 3x255
  const maxDistance = Math.sqrt(255 * 255 * 3);
  const dr = color1.r - color2.r;
  const dg = color1.g - color2.g;
  const db = color1.b - color2.b;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  const sim = Math.max(0, 100 - (dist / maxDistance) * 100);
  return Math.round(sim);
}

// ─── 3. OCR Text & Alteration Engine ─────────────────────────────────────────
export async function extractOcrText(imageInput) {
  try {
    // Standardize to high-contrast PNG buffer so Leptonica/Tesseract accepts SVGs, WebPs, JPEGs reliably
    const pngBuffer = await sharp(imageInput)
      .resize(500, 500, { fit: "inside", withoutEnlargement: false })
      .png()
      .toBuffer();

    const worker = await createWorker("eng");
    const { data: { text } } = await worker.recognize(pngBuffer);
    await worker.terminate();
    return (text || "").trim();
  } catch (err) {
    console.warn("OCR recognition error (handled gracefully):", err.message);
    return "";
  }
}

export function detectCharacterSubstitutions(text, targetBrand) {
  if (!text || !targetBrand) return [];
  const normalized = text.toLowerCase();
  const brandName = targetBrand.toLowerCase();
  const findings = [];

  // Common visual lookalike substitutions
  const leetMap = [
    { regex: /sb[1l|]/i, original: "SBI", fake: "SB1 / SBL", note: "Numeral '1' or letter 'L' substituted for 'I'" },
    { regex: /payt[nm]/i, original: "Paytm", fake: "Paytn", note: "Letter 'n' substituted for 'm'" },
    { regex: /hdf[c0o]/i, original: "HDFC", fake: "HDF0", note: "Digit '0' or letter 'O' substituted for 'C'" },
    { regex: /netfl[1l!]x/i, original: "Netflix", fake: "Netfl1x", note: "Digit '1' or exclamation mark substituted for 'i'" },
    { regex: /g[0o]{2}gle/i, original: "Google", fake: "G00gle", note: "Zeros '00' substituted for 'oo'" },
    { regex: /aadha[a4]r/i, original: "Aadhaar", fake: "Aadh4ar", note: "Digit '4' substituted for letter 'a'" },
  ];

  for (const item of leetMap) {
    if (brandName.toLowerCase().includes(item.original.toLowerCase()) && item.regex.test(normalized)) {
      if (!normalized.includes(item.original.toLowerCase())) {
        findings.push(item);
      }
    }
  }

  // Deceptive added suffixes/prefixes
  const deceptiveTerms = ["official", "customer care", "helpdesk", "24x7", "support", "kyc", "refund", "agent", "win", "reward"];
  for (const term of deceptiveTerms) {
    if (normalized.includes(term) && !brandName.toLowerCase().includes(term)) {
      findings.push({
        fake: term.toUpperCase(),
        original: targetBrand,
        note: `Suspicious added qualifier '${term.toUpperCase()}' often used in impersonator avatars.`,
      });
    }
  }

  return findings;
}

// ─── 4. Levenshtein Distance Helper ──────────────────────────────────────────
export function levenshteinDistance(s1, s2) {
  const a = (s1 || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const b = (s2 || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// ─── 5. Identify Authoritative Brand & Reference Logo ────────────────────────
export function identifyBrand({ brandName, url, handle, appName, ocrText }) {
  const queryCandidates = [brandName, url, handle, appName, ocrText].filter(Boolean);

  // 1. Direct query in catalog
  for (const q of queryCandidates) {
    const directMatch = findCatalogBrand(q);
    if (directMatch) {
      return {
        matchedBrand: directMatch,
        confidence: "HIGH",
        identifiedVia: q === brandName ? "Brand Name Input" : q === url ? "URL Domain" : "OCR / Content Match",
        candidates: [],
      };
    }
  }

  // 2. Candidate auto-detection (checks names, handles, package IDs, domains)
  const autoMatch = autoDetectBrandFromCandidate({
    text: ocrText,
    url,
    handle,
    name: brandName || appName,
  });

  if (autoMatch) {
    return {
      matchedBrand: autoMatch,
      confidence: "MEDIUM",
      identifiedVia: "Heuristic Brand Identifier",
      candidates: [],
    };
  }

  // 3. Search for partial matches to display candidate options
  const allPartialCandidates = [];
  const fullHaystack = queryCandidates.join(" ").toLowerCase();

  for (const b of TRUSTED_BRANDS) {
    const bName = b.name.toLowerCase();
    if (fullHaystack.includes(bName) || bName.includes(fullHaystack)) {
      allPartialCandidates.push({
        id: b.id,
        name: b.name,
        domain: b.domain,
        category: b.category,
        referenceSource: b.referenceLogo?.sourceType || "Authoritative Brand Registry",
      });
    }
  }

  if (allPartialCandidates.length > 0) {
    return {
      matchedBrand: allPartialCandidates.length === 1 ? TRUSTED_BRANDS.find(b => b.id === allPartialCandidates[0].id) : null,
      confidence: allPartialCandidates.length === 1 ? "MEDIUM" : "UNCERTAIN",
      identifiedVia: "Partial Candidate Matching",
      candidates: allPartialCandidates,
    };
  }

  return {
    matchedBrand: null,
    confidence: "NONE",
    identifiedVia: null,
    candidates: [],
  };
}

// ─── 6. Comprehensive Logo Authenticity Comparison Pipeline ──────────────────
export async function compareLogoAuthenticity({
  uploadedBuffer,
  fileMeta,
  brandNameInput,
  urlInput,
  handleInput,
  appNameInput,
  simulateSearchFailure = false,
}) {
  const startTime = Date.now();

  // Step 1: Validate dimensions and input file
  let metadata;
  try {
    metadata = await sharp(uploadedBuffer).metadata();
  } catch (err) {
    throw new Error(`Invalid or corrupted image file: ${err.message}`);
  }

  const { width = 0, height = 0, format = "unknown" } = metadata;

  if (width < 24 || height < 24) {
    return {
      conclusion: "INSUFFICIENT_EVIDENCE",
      conclusionTitle: "Insufficient Visual Evidence",
      similarityScore: 0,
      plainExplanation: "The uploaded image resolution is too low (< 24x24 px) for meaningful logo forensic comparison.",
      differences: [
        {
          category: "Resolution & Quality",
          severity: "HIGH",
          title: "Resolution Too Small",
          explanation: `Image is only ${width}x${height} pixels. Clear logo analysis requires at least 48x48 pixels.`,
        },
      ],
      ocrText: "",
      uploadedMeta: { width, height, format, sizeBytes: fileMeta?.size || uploadedBuffer.length },
      referenceLogo: null,
      candidates: [],
      nextSteps: ["Upload a higher-resolution logo, app store icon, or profile screenshot."],
    };
  }

  // Step 2: Extract text via OCR
  const ocrText = await extractOcrText(uploadedBuffer);

  // Step 3: Search Authoritative Brand Reference (Registry + Wikidata + Wikimedia + Official Domain)
  const searchResult = await searchAuthoritativeBrandReference({
    brandName: brandNameInput,
    url: urlInput,
    handle: handleInput,
    appName: appNameInput,
    ocrText,
    simulateSearchFailure,
  });

  // Handle Unverified / Missing / Failed Search Cases
  if (!searchResult.success || !searchResult.referenceLogo?.buffer) {
    const imageOnlyFindings = [];

    if (ocrText) {
      imageOnlyFindings.push({
        category: "OCR Extracted Text",
        severity: "INFO",
        title: "Visible Text Detected",
        explanation: `OCR detected visible wording: "${ocrText}".`,
      });

      const suspiciousKeywords = ["urgent", "kyc", "support", "cashback", "winner", "prize", "otp", "24x7"];
      const foundKeywords = suspiciousKeywords.filter(k => ocrText.toLowerCase().includes(k));
      if (foundKeywords.length > 0) {
        imageOnlyFindings.push({
          category: "Suspicious Overlay",
          severity: "MEDIUM",
          title: "Promotional / Support Keywords in Logo",
          explanation: `Image contains promotional/support keywords (${foundKeywords.join(", ")}), commonly added by scam social accounts.`,
        });
      }
    }

    let conclusionTitle = "Unable to Verify Original Logo";
    let plainExplanation = "";
    let scoreCalculationMethod = "No authoritative reference available";

    if (searchResult.status === "SEARCH_PROVIDER_ERROR") {
      conclusionTitle = "Search Provider Unavailable";
      scoreCalculationMethod = "External reference search provider offline or timed out";
      plainExplanation = `Unable to verify the original logo because the authoritative reference search provider was unavailable or timed out: ${searchResult.failureReason}. Image-only forensic analysis was performed on the uploaded asset.`;
    } else if (searchResult.status === "AMBIGUOUS_BRAND_IDENTITY") {
      conclusionTitle = "Ambiguous Brand Identity";
      scoreCalculationMethod = "Ambiguous identity across registries";
      plainExplanation = `Multiple potential brands or ambiguous identities were identified without a trustworthy reference. Image-only analysis was performed.`;
    } else if (searchResult.status === "NO_BRAND_IDENTIFIED") {
      conclusionTitle = "Unable to Verify Original Logo";
      scoreCalculationMethod = "No brand identity detected";
      plainExplanation = "No recognizable brand name or registered company was identified from the uploaded image. Image-only analysis was performed.";
    } else {
      // NO_TRUSTED_REFERENCE_FOUND
      conclusionTitle = "Unable to Verify Original Logo";
      scoreCalculationMethod = "No trusted reference asset found across official registries";
      plainExplanation = (brandNameInput || urlInput)
        ? `No authoritative reference logo could be verified from official brand domains or authoritative registries for claimed brand "${brandNameInput || urlInput}". Image-only analysis was performed.`
        : "No recognizable brand name or registered company was identified from the uploaded image. Image-only analysis was performed.";
    }

    return {
      conclusion: "UNABLE_TO_VERIFY",
      conclusionTitle,
      similarityScore: null,
      scoreCalculationMethod,
      searchStatus: searchResult.status,
      plainExplanation,
      identifiedBrand: searchResult.brand || null,
      referenceLogo: null,
      candidates: searchResult.candidates || [],
      uploadedMeta: { width, height, format, sizeBytes: fileMeta?.size || uploadedBuffer.length },
      ocrText,
      differences: imageOnlyFindings,
      riskIndicators: [
        searchResult.status === "SEARCH_PROVIDER_ERROR"
          ? "Search provider connection unavailable during verification"
          : "Brand does not have a verified reference asset in official public registries",
        "Visual authenticity comparison could not be verified against an official domain asset",
      ],
      searchMetadata: searchResult.searchMetadata,
      nextSteps: [
        "Verify the domain directly through an official registrar or government business registry.",
        "Check whether the official entity publishes brand guidelines or a verified social link on their homepage.",
        "Exercise caution before sharing personal credentials or financial details.",
      ],
      analysisDurationMs: Date.now() - startTime,
    };
  }

  // Case B: Trustworthy Reference Found -> Run Practical Multi-Factor Comparison Pipeline
  const matchedBrand = searchResult.brand;
  const ref = searchResult.referenceLogo;
  const refBuffer = ref.buffer;

  let refDataUrl = null;
  try {
    const refMeta = await sharp(refBuffer).metadata();
    const mime = refMeta.format === "svg" ? "image/svg+xml" : `image/${refMeta.format || "png"}`;
    refDataUrl = `data:${mime};base64,${refBuffer.toString("base64")}`;
  } catch (_) {
    refDataUrl = ref.url;
  }

  // ── Compute Perceptual Hashes & Hamming Distance ──
  const uploadedHash = await computeDHash(uploadedBuffer);
  const refHash = await computeDHash(refBuffer);
  const hammingDistance = computeHammingDistance(uploadedHash, refHash);

  // Hash similarity (0 dist = 100%, 64 dist = 0%)
  const hashSimilarity = Math.max(0, Math.min(100, Math.round(100 - (hammingDistance / 32) * 100)));

  // ── Color Palette Stats ──
  const uploadedColor = await extractColorStats(uploadedBuffer);
  const refColor = await extractColorStats(refBuffer);
  const colorSimilarity = calculateColorSimilarity(uploadedColor, refColor);

  // ── Aspect Ratio Comparison ──
  const refMetadata = await sharp(refBuffer).metadata();
  const upAspect = width / (height || 1);
  const refAspect = (refMetadata.width || 1) / (refMetadata.height || 1);
  const aspectSimilarity = Math.round((Math.min(upAspect, refAspect) / Math.max(upAspect, refAspect)) * 100);

  // ── OCR & Letter Tampering Check ──
  const expectedList = [
    ...(Array.isArray(ref?.expectedText) ? ref.expectedText : []),
    ...(Array.isArray(ref?.expectedWords) ? ref.expectedWords : []),
    matchedBrand?.name,
    matchedBrand?.fullName,
  ].filter(Boolean);

  const characterSubstitutions = detectCharacterSubstitutions(ocrText, matchedBrand?.name || "");
  // ── OCR Text Analysis & Cleaning ──
  const meaningfulText = (ocrText || "").replace(/[^a-zA-Z0-9]/g, "").trim();
  const normalizedOcrUpper = (ocrText || "").toUpperCase().replace(/[^A-Z0-9 ]/g, " ");

  const isSubMatch = expectedList.some(exp => {
    const normExp = exp.toUpperCase().replace(/[^A-Z0-9 ]/g, " ").trim();
    return normExp.length >= 2 && normalizedOcrUpper.includes(normExp);
  });

  const hasTextContext = Boolean(meaningfulText.length >= 2 && expectedList.length > 0);

  let textSimilarity = 100;
  if (isSubMatch) {
    textSimilarity = 100;
  } else if (hasTextContext) {
    const minLev = Math.min(...expectedList.map(exp => {
      const cleanExp = exp.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      return levenshteinDistance(meaningfulText.toLowerCase(), cleanExp);
    }));
    const maxLen = Math.max(meaningfulText.length, 4);
    textSimilarity = Math.max(0, Math.round(100 - (minLev / maxLen) * 100));
  } else {
    // No text in uploaded image: if reference expects required prominent text, mark mild divergence
    if (ref?.hasRequiredText) {
      textSimilarity = 50;
    } else {
      textSimilarity = 100; // purely graphic logo
    }
  }

  // ── Visual Similarity Calculation Formula ──
  // Perceptual dHash (45%) + Dominant Color (30%) + Aspect/Text (25%)
  let overallSimilarity;

  if (hasTextContext) {
    overallSimilarity = Math.round(
      hashSimilarity * 0.45 +
      colorSimilarity * 0.30 +
      textSimilarity * 0.25
    );
  } else {
    overallSimilarity = Math.round(
      hashSimilarity * 0.55 +
      colorSimilarity * 0.35 +
      aspectSimilarity * 0.10
    );
  }

  // If blatant character substitution detected (e.g. "SB1" instead of "SBI"), cap similarity
  if (characterSubstitutions.length > 0) {
    overallSimilarity = Math.min(overallSimilarity, 68);
  }

  // ── Compile Detailed Differences ──
  const differences = [];

  // 1. Text difference findings
  if (characterSubstitutions.length > 0) {
    for (const sub of characterSubstitutions) {
      differences.push({
        category: "Text & Spelling",
        severity: "HIGH",
        title: `Character Alteration Detected (${sub.fake})`,
        explanation: sub.note,
        evidence: `Detected: "${ocrText}" vs Expected: "${sub.original}"`,
      });
    }
  } else if (ocrText && textSimilarity < 70) {
    differences.push({
      category: "Text & Spelling",
      severity: "MEDIUM",
      title: "Wording Divergence",
      explanation: `Extracted text "${ocrText.trim()}" differs noticeably from official brand wordmark ("${expectedList[0] || matchedBrand?.name}").`,
    });
  }

  // 2. Color differences
  if (colorSimilarity < 65) {
    differences.push({
      category: "Color Palette",
      severity: "MEDIUM",
      title: "Noticeable Color Shift",
      explanation: `Dominant color centroid (${uploadedColor.hex}) differs significantly from official brand palette (${refColor.hex}).`,
      evidence: `Color similarity: ${colorSimilarity}%`,
    });
  } else if (colorSimilarity >= 85) {
    differences.push({
      category: "Color Palette",
      severity: "MATCH",
      title: "Matching Brand Color Palette",
      explanation: `Color distribution aligns closely with official brand identity (${uploadedColor.hex} ≈ ${refColor.hex}).`,
    });
  }

  // 3. Shape & Perceptual Structure
  if (hammingDistance > 16) {
    differences.push({
      category: "Shape & Layout",
      severity: "HIGH",
      title: "Material Shape Discrepancy",
      explanation: `Perceptual structure exhibits heavy divergence (Hamming distance ${hammingDistance}/64 bits), indicating an altered or completely different graphic.`,
    });
  } else if (hammingDistance > 6) {
    differences.push({
      category: "Shape & Layout",
      severity: "MEDIUM",
      title: "Minor Geometric Alterations",
      explanation: `Core layout shares visual motifs with official logo but exhibits modifications in contours, framing, or background elements.`,
    });
  } else {
    differences.push({
      category: "Shape & Layout",
      severity: "MATCH",
      title: "Preserved Logo Contour",
      explanation: `Perceptual hash distance is minimal (${hammingDistance}/64 bits), indicating identical or near-identical geometry.`,
    });
  }

  // 4. Aspect Ratio & Framing
  if (aspectSimilarity < 80) {
    differences.push({
      category: "Framing & Aspect Ratio",
      severity: "LOW",
      title: "Modified Aspect Ratio",
      explanation: `Uploaded image aspect ratio (${upAspect.toFixed(2)}) is stretched or cropped compared to the official asset (${refAspect.toFixed(2)}).`,
    });
  }

  // 5. Resolution & Compression artifacts
  if (width < 64 || height < 64) {
    differences.push({
      category: "Resolution & Artifacts",
      severity: "MEDIUM",
      title: "Low Resolution / Pixelation",
      explanation: "Low resolution can obscure fine security details, micro-typography, and crisp vector outlines.",
    });
  }

  // ── AI Vision Optional Enrichment ──
  let aiVisionComparison = null;
  if (aiEnabled() && ref.externalUrl) {
    try {
      // Let AI vision inspect if URLs available
      aiVisionComparison = await aiCompareLogos(ref.externalUrl, ref.externalUrl);
    } catch (_) {}
  }

  // ── Determine 4-Tier Conclusion ──
  let conclusion;
  let conclusionTitle;
  let plainExplanation;

  if (characterSubstitutions.length > 0 || (overallSimilarity < 85 && overallSimilarity >= 30)) {
    conclusion = "DIFFERENCES_DETECTED";
    conclusionTitle = "Visual Differences Detected";
    plainExplanation = characterSubstitutions.length > 0
      ? `Visual alterations or lookalike characters (such as "${characterSubstitutions[0].fake}") were detected compared to the verified official ${matchedBrand.name} logo.`
      : `The uploaded image shares some visual motifs with official ${matchedBrand.name} branding, but exhibits significant color, layout, or font modifications.`;
  } else if (overallSimilarity >= 85) {
    conclusion = "LIKELY_VISUAL_MATCH";
    conclusionTitle = "Likely Visual Match";
    plainExplanation = `The uploaded image visually corresponds with high fidelity (${overallSimilarity}%) to the official reference logo for ${matchedBrand.name}.`;
  } else {
    conclusion = "DIFFERENCES_DETECTED";
    conclusionTitle = "Material Differences Detected";
    plainExplanation = `The uploaded image has low resemblance (${overallSimilarity}%) to the verified official ${matchedBrand.name} logo.`;
  }

  return {
    conclusion,
    conclusionTitle,
    similarityScore: overallSimilarity,
    scoreBreakdown: {
      hashSimilarity,
      colorSimilarity,
      textSimilarity,
      aspectSimilarity,
      hammingDistance,
      formula: hasTextContext
        ? "45% Perceptual Hash + 30% Color Palette + 25% Text & Spelling"
        : "55% Perceptual Hash + 35% Color Palette + 10% Geometric Aspect",
    },
    plainExplanation,
    securityNotice: conclusion === "LIKELY_VISUAL_MATCH"
      ? "IMPORTANT: A visual match alone does NOT prove that an account or app is genuine. Fraudsters frequently steal official logos. Always confirm the official website domain and verified account handle."
      : "IMPORTANT: Differences may indicate an impersonation attempt, but can also stem from legitimate sub-brands, regional campaigns, or historical logo versions. Cross-check official channels.",
    identifiedBrand: {
      id: matchedBrand.id,
      name: matchedBrand.name,
      fullName: matchedBrand.fullName,
      domain: matchedBrand.domain,
      category: matchedBrand.category,
      officialHandles: matchedBrand.officialSocial?.map(s => `${s.platform}: @${s.handle}`) || [],
    },
    referenceLogo: {
      url: ref.url || ref.externalUrl || refDataUrl,
      dataUrl: refDataUrl,
      sourceType: ref.sourceType || "Authoritative Brand Asset Repository",
      sourceUrl: ref.sourceUrl || (matchedBrand.domain ? `https://${matchedBrand.domain}` : "Official Brand Asset Registry"),
      retrievedAt: ref.retrievedAt || new Date().toISOString().split("T")[0],
      description: ref.description,
      primaryColors: ref.primaryColors || [refColor.hex],
    },
    searchMetadata: searchResult.searchMetadata,
    uploadedMeta: {
      width,
      height,
      format,
      dominantColor: uploadedColor.hex,
      sizeBytes: fileMeta?.size || uploadedBuffer.length,
    },
    ocrText,
    differences,
    characterSubstitutions,
    aiVisionAnalysis: aiVisionComparison,
    candidates: [],
    nextSteps: [
      `Confirm you are visiting the official domain: ${matchedBrand.domain}`,
      `Verify official profile handle on ${matchedBrand.officialSocial?.[0]?.platform || "X"}: @${matchedBrand.officialSocial?.[0]?.handle || matchedBrand.name}`,
      "Never disclose OTPs, PINs, or banking passwords even if the logo looks genuine.",
    ],
    analysisDurationMs: Date.now() - startTime,
  };
}
