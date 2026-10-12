/**
 * Brand Protection API (Digital Risk Protection)
 * 
 * POST /api/brand/scan          — Run full brand impersonation scan
 * POST /api/brand/scan/image    — Upload screenshot + OCR + AI analysis
 * GET  /api/brand/scan/:scanId  — Get scan results
 * GET  /api/brand/name-check    — Quick lookalike name check
 * POST /api/brand/logo/compare  — Compare two logo images with AI vision
 */
import multer from "multer";
import { tmpdir } from "os";
import path from "path";
import fs from "fs";

import { scan, lookalikeName, scoreSocial, scoreApp, isOfficialSocial, isOfficialApp, hashSimilarity } from "../../lib/brandDetect.js";
import { aiExplainDetection, aiCompareLogos, analyzeImageWithOCR, uploadToCloudinary, aiEnabled } from "../../lib/aiVision.js";
import { prisma } from "../../lib/prisma.js";
import { findCatalogBrand, autoDetectBrandFromCandidate } from "../../lib/brandCatalog.js";
import { compareLogoAuthenticity } from "../../lib/logoComparator.js";
import sharp from "sharp";

// ─── Multer (from Certificate pattern) ───────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, tmpdir()),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const imageFilter = (_, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed (JPEG, PNG, GIF, WebP, SVG)"), false);
};
export const uploadMiddleware = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("image");

// ─── In-memory scan cache (simple, no Redis needed) ──────────────────────────
const scanCache = new Map();

// ─── POST /api/brand/scan — Full brand scan ───────────────────────────────────
export const brandScanController = async (req, res) => {
  try {
    const {
      brand,          // { name, domain, description, logoHash, officialSocial, officialApps }
      socialItems,    // [{ id, platform, handle, displayName, bio, link, logoHash, followers, createdDaysAgo }]
      appItems,       // [{ id, store, appId, name, publisher, description, iconHash, releasedDaysAgo }]
      explainWithAI,  // boolean
    } = req.body;

    if (!brand?.name)
      return res.status(400).json({ success: false, message: "brand.name is required" });

    // Run deterministic scan
    const result = scan(brand, socialItems || [], appItems || []);

    // Optionally enrich top detections with AI explanations
    if (explainWithAI && result.detections.length > 0) {
      const topN = result.detections.slice(0, 5); // limit AI calls
      for (const detection of topN) {
        try {
          const explanation = await aiExplainDetection(brand, detection);
          detection.aiExplanation = explanation;
        } catch (_) {
          detection.aiExplanation = { text: "AI explanation unavailable", ai: false };
        }
      }
    }

    // Store scan result
    const scanId = `scan_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    scanCache.set(scanId, {
      scanId,
      brand: { name: brand.name, domain: brand.domain },
      result,
      aiEnabled: aiEnabled(),
      createdAt: new Date().toISOString(),
    });

    // Audit log
    try {
      await prisma.$queryRawUnsafe(
        `INSERT INTO "AuditEvent" (id,"userId","reportId",action,detail,"createdAt")
         VALUES (gen_random_uuid()::text,$1,NULL,'REPORT_SUBMITTED',$2,NOW())`,
        req.user?.id ?? null,
        JSON.stringify({
          type: "brand_scan",
          brandName: brand.name,
          totalScanned: result.scanned,
          totalDetections: result.summary.total,
          scanId,
        })
      );
    } catch (_) {}

    return res.json({
      success: true,
      scanId,
      brand: { name: brand.name, domain: brand.domain },
      aiEnabled: aiEnabled(),
      ...result,
    });
  } catch (err) {
    console.error("Brand scan error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

// ─── POST /api/brand/scan/image — OCR + AI analyze a suspicious screenshot ───
export const imageOCRController = async (req, res) => {
  let tempFilePath = null;
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No image file uploaded" });

    tempFilePath = req.file.path;

    // Upload to Cloudinary
    let cloudinaryResult = null;
    try {
      cloudinaryResult = await uploadToCloudinary(tempFilePath, "scamtrace/evidence");
    } catch (e) {
      console.warn("Cloudinary upload failed:", e.message);
    }

    // OCR + AI analysis
    const ocrResult = await analyzeImageWithOCR(tempFilePath, cloudinaryResult?.url);

    return res.json({
      success: true,
      imageUrl: cloudinaryResult?.url ?? null,
      publicId: cloudinaryResult?.publicId ?? null,
      ocr: {
        text: ocrResult.ocrText,
        error: ocrResult.ocrError ?? null,
        wordCount: ocrResult.ocrText.split(/\s+/).filter(Boolean).length,
      },
      scamIndicators: ocrResult.scamIndicators,
      riskLevel: ocrResult.scamIndicators.length >= 3 ? "HIGH_RISK"
               : ocrResult.scamIndicators.length >= 1 ? "NEEDS_CAUTION"
               : "LOW_SIGNAL",
      aiAnalysis: ocrResult.aiAnalysis,
      aiEnabled: aiEnabled(),
      note: "Text extracted via OCR from uploaded image. Results are indicators, not proof.",
    });
  } catch (err) {
    console.error("Image OCR error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  } finally {
    // Clean up temp file
    if (tempFilePath) {
      try { fs.unlinkSync(tempFilePath); } catch (_) {}
    }
  }
};

// ─── GET /api/brand/scan/:scanId — Retrieve scan result ──────────────────────
export const getScanController = async (req, res) => {
  const result = scanCache.get(req.params.scanId);
  if (!result)
    return res.status(404).json({ success: false, message: "Scan not found. Results expire after restart." });
  return res.json({ success: true, ...result });
};

// ─── GET /api/brand/name-check — Quick lookalike name detection ───────────────
export const nameCheckController = async (req, res) => {
  try {
    const { candidate, brand } = req.query;
    if (!candidate || !brand)
      return res.status(400).json({ success: false, message: "candidate and brand query params required" });

    const result = lookalikeName(candidate, brand);
    const confidence = Math.round(result.score * 100);

    return res.json({
      success: true,
      candidate,
      brand,
      confidence,
      techniques: result.techniques,
      verdict: confidence >= 80 ? "HIGH_RISK — likely impersonation"
             : confidence >= 60 ? "SUSPICIOUS — monitor closely"
             : confidence >= 40 ? "LOW_RISK — possible lookalike"
             : "BENIGN — name not similar",
      note: "Name similarity only. Social signals and logo comparison required for full assessment.",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/brand/logo/compare — AI vision logo comparison ────────────────
export const logoCompareController = async (req, res) => {
  try {
    const { officialLogoUrl, candidateLogoUrl } = req.body;
    if (!officialLogoUrl || !candidateLogoUrl)
      return res.status(400).json({ success: false, message: "officialLogoUrl and candidateLogoUrl required" });

    const comparison = await aiCompareLogos(officialLogoUrl, candidateLogoUrl);

    return res.json({
      success: true,
      officialLogoUrl,
      candidateLogoUrl,
      comparison,
      aiEnabled: aiEnabled(),
    });
  } catch (err) {
    console.error("Logo compare error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/brand/explain — AI explain a detection ────────────────────────
export const explainController = async (req, res) => {
  try {
    const { brand, detection } = req.body;
    if (!brand || !detection)
      return res.status(400).json({ success: false, message: "brand and detection required" });

    const explanation = await aiExplainDetection(brand, detection);
    return res.json({ success: true, explanation, aiEnabled: aiEnabled() });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/brand/demo — Demo scan with seeded data ────────────────────────
export const demoScanController = async (req, res) => {
  try {
    const demoBrand = {
      name: "SBI",
      domain: "sbi.co.in",
      description: "State Bank of India — official banking services, loans, savings accounts, net banking",
      logoHash: "abc123def456", // In production: real perceptual hash
      officialSocial: [
        { platform: "twitter", handle: "TheOfficialSBI" },
        { platform: "facebook", handle: "StateBankOfIndia" },
      ],
      officialApps: [
        { store: "play_store", appId: "com.sbi.lotusintouch", publisher: "State Bank of India" },
        { store: "app_store", appId: "com.sbi.lotusintouch", publisher: "State Bank of India" },
      ],
    };

    const demoSocial = [
      { id: "s1", platform: "twitter", handle: "SBI_Support_Official", displayName: "SBI Bank Official Support", bio: "Official SBI customer support. DM for KYC update and account issues. Click here to verify: bit.ly/sbi-kyc", link: "http://bit.ly/sbi-kyc", followers: 234, createdDaysAgo: 45 },
      { id: "s2", platform: "facebook", handle: "StateBankofIndia.official", displayName: "State Bank of India - Official", bio: "Get free cashback on transactions. KYC update required now. Win prizes!", link: "http://sbi-secure-login.co.in", followers: 1200, createdDaysAgo: 12 },
      { id: "s3", platform: "instagram", handle: "sbi_helpdesk_india", displayName: "SBI Helpdesk", bio: "I help SBI customers. Share your account details for instant help. OTP verification available.", link: null, followers: 89, createdDaysAgo: 7 },
      { id: "s4", platform: "twitter", handle: "TheOfficialSBI", displayName: "SBI", bio: "Official State Bank of India", link: "https://sbi.co.in", followers: 4500000, createdDaysAgo: 3650 }, // Official — should be excluded
      { id: "s5", platform: "twitter", handle: "sbifanclub_unofficial", displayName: "SBI Fan Club (unofficial)", bio: "We are an unofficial fan page of SBI. Not affiliated with State Bank of India.", link: "https://sbi.co.in", followers: 550, createdDaysAgo: 200 }, // Fan page — score reduced
    ];

    const demoApps = [
      { id: "a1", store: "play_store", appId: "com.sbi.net.banking.unofficial", name: "SBI NetBanking — Official", publisher: "Dev Studios Pvt Ltd", description: "Access SBI net banking easily. Transfer money, check balance. Full SBI services.", iconHash: "abc123def457", releasedDaysAgo: 30 },
      { id: "a2", store: "play_store", appId: "com.sbi.lotusintouch", name: "YONO SBI", publisher: "State Bank of India", description: "Official SBI mobile banking application", iconHash: "abc123def456", releasedDaysAgo: 3650 }, // Official — excluded
      { id: "a3", store: "app_store", appId: "com.sbionline.fake", name: "SBI Online Banking Pro", publisher: "TechMart Apps", description: "SBI banking made easy. Claim cashback rewards! Free KYC update service.", iconHash: "abc123ef4568", releasedDaysAgo: 14 },
    ];

    const result = scan(demoBrand, demoSocial, demoApps);

    return res.json({
      success: true,
      demo: true,
      brand: { name: demoBrand.name, domain: demoBrand.domain },
      note: "Demo scan using synthetic data. Official accounts are correctly excluded.",
      aiEnabled: aiEnabled(),
      ...result,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/brand/profiles — List all brand profiles ───────────────────────
export const listBrandProfilesController = async (req, res) => {
  try {
    const brands = await prisma.$queryRawUnsafe(
      `SELECT * FROM "BrandProfile" ORDER BY name ASC`
    );
    return res.json({ success: true, brands });
  } catch (err) {
    console.error("List brand profiles error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch brand profiles" });
  }
};

// ─── GET /api/brand/profiles/:id — Get single brand profile ──────────────────
export const getBrandProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await prisma.$queryRawUnsafe(
      `SELECT * FROM "BrandProfile" WHERE id = $1`, id
    );
    if (!rows.length) {
      return res.status(404).json({ success: false, message: "Brand profile not found" });
    }
    return res.json({ success: true, brand: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/brand/profiles — Create new brand profile ─────────────────────
export const createBrandProfileController = async (req, res) => {
  try {
    const { name, domain, description, logoUrl, logoHash, officialSocial, officialApps } = req.body;
    if (!name || !domain) {
      return res.status(400).json({ success: false, message: "Brand name and official domain are required" });
    }

    const id = `brand_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const socialJson = JSON.stringify(officialSocial || []);
    const appsJson = JSON.stringify(officialApps || []);

    const created = await prisma.$queryRawUnsafe(
      `INSERT INTO "BrandProfile" ("id", "name", "domain", "description", "logoUrl", "logoHash", "officialSocial", "officialApps", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, NOW(), NOW())
       RETURNING *`,
      id, name.trim(), domain.trim(), description || "", logoUrl || "", logoHash || "", socialJson, appsJson
    );

    return res.status(201).json({ success: true, brand: created[0] });
  } catch (err) {
    console.error("Create brand profile error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to create brand profile" });
  }
};

// ─── PUT /api/brand/profiles/:id — Update brand profile ──────────────────────
export const updateBrandProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, domain, description, logoUrl, logoHash, officialSocial, officialApps } = req.body;

    if (!name || !domain) {
      return res.status(400).json({ success: false, message: "Brand name and official domain are required" });
    }

    const socialJson = JSON.stringify(officialSocial || []);
    const appsJson = JSON.stringify(officialApps || []);

    const updated = await prisma.$queryRawUnsafe(
      `UPDATE "BrandProfile"
       SET "name" = $1, "domain" = $2, "description" = $3, "logoUrl" = $4, "logoHash" = $5,
           "officialSocial" = $6::jsonb, "officialApps" = $7::jsonb, "updatedAt" = NOW()
       WHERE "id" = $8
       RETURNING *`,
      name.trim(), domain.trim(), description || "", logoUrl || "", logoHash || "", socialJson, appsJson, id
    );

    if (!updated.length) {
      return res.status(404).json({ success: false, message: "Brand profile not found" });
    }

    return res.json({ success: true, brand: updated[0] });
  } catch (err) {
    console.error("Update brand profile error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to update brand profile" });
  }
};

// ─── DELETE /api/brand/profiles/:id — Delete brand profile ───────────────────
export const deleteBrandProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.$queryRawUnsafe(`DELETE FROM "BrandProfile" WHERE "id" = $1`, id);
    return res.json({ success: true, message: "Brand profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Helpers: Image Hashing & URL Parsing ─────────────────────────────────────
export async function computeImageHash(imagePath) {
  try {
    if (!imagePath || !fs.existsSync(imagePath)) return null;
    const data = await sharp(imagePath)
      .resize(8, 8, { fit: "fill" })
      .grayscale()
      .raw()
      .toBuffer();

    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += data[i];
    const avg = sum / data.length;

    let hash = 0n;
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= avg) {
        hash |= 1n << BigInt(63 - i);
      }
    }
    return hash.toString(16).padStart(16, "0");
  } catch (err) {
    console.warn("computeImageHash error:", err.message);
    return null;
  }
}

function parseSocialUrl(url) {
  if (!url) return null;
  try {
    const raw = String(url).trim();
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const parsed = new URL(withProto);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    let platform = "Social Media";
    if (host.includes("instagram.com")) platform = "Instagram";
    else if (host.includes("twitter.com") || host.includes("x.com")) platform = "X";
    else if (host.includes("facebook.com") || host.includes("fb.com")) platform = "Facebook";
    else if (host.includes("linkedin.com")) platform = "LinkedIn";
    else if (host.includes("youtube.com") || host.includes("youtu.be")) platform = "YouTube";

    const parts = parsed.pathname.split("/").filter(Boolean);
    let handle = "";
    if (platform === "YouTube") {
      handle = parts[0]?.replace(/^@/, "") || "";
    } else if (platform === "LinkedIn") {
      handle = parts[0] === "in" || parts[0] === "company" ? parts[1] || "" : parts[0] || "";
    } else {
      handle = parts[0]?.replace(/^@/, "") || "";
    }

    return { platform, handle, host, cleanUrl: withProto };
  } catch (_) {
    return null;
  }
}

function parseAppUrl(url) {
  if (!url) return null;
  try {
    const raw = String(url).trim();
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const parsed = new URL(withProto);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();

    let store = "Mobile App Store";
    let appId = "";

    if (host.includes("play.google.com")) {
      store = "Google Play";
      appId = parsed.searchParams.get("id") || "";
    } else if (host.includes("apps.apple.com")) {
      store = "Apple App Store";
      const match = parsed.pathname.match(/id(\d+)/i);
      appId = match ? `id${match[1]}` : "";
    }
    return { store, appId, host, cleanUrl: withProto };
  } catch (_) {
    return null;
  }
}

// ─── POST /api/brand/upload-image — Upload image & compute perceptual hash ───
export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }
    const tempPath = req.file.path;
    const hash = await computeImageHash(tempPath);

    // Read file as base64 data url for preview
    const fileBuf = fs.readFileSync(tempPath);
    const base64Url = `data:${req.file.mimetype};base64,${fileBuf.toString("base64")}`;

    let finalUrl = base64Url;
    try {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
        const cloudRes = await uploadToCloudinary(tempPath, "scamtrace/uploads");
        if (cloudRes?.url) finalUrl = cloudRes.url;
      }
    } catch (_) {}

    try {
      fs.unlinkSync(tempPath);
    } catch (_) {}

    return res.json({
      success: true,
      url: finalUrl,
      hash,
      fileName: req.file.originalname,
      fileSize: req.file.size,
    });
  } catch (err) {
    console.error("Upload image error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to process image upload" });
  }
};

// ─── POST /api/brand/analyze-social — Analyze candidate social account ───────
export const analyzeSocialController = async (req, res) => {
  try {
    let { brandId, brandData, candidate, claimedBrand } = req.body;
    if (!candidate) candidate = {};

    // Support flat body fields
    if (req.body.url && !candidate.url) candidate.url = req.body.url;
    if (req.body.handle && !candidate.handle) candidate.handle = req.body.handle;
    if (req.body.displayName && !candidate.displayName) candidate.displayName = req.body.displayName;
    if (req.body.bio && !candidate.bio) candidate.bio = req.body.bio;
    if (req.body.message && !candidate.bio) candidate.bio = req.body.message;
    if (req.body.logoHash && !candidate.logoHash) candidate.logoHash = req.body.logoHash;
    if (req.body.claimedBrand && !claimedBrand) claimedBrand = req.body.claimedBrand;

    // Parse URL if provided
    let parsedUrl = null;
    if (candidate.url) {
      parsedUrl = parseSocialUrl(candidate.url);
      if (parsedUrl) {
        if (!candidate.handle && parsedUrl.handle) candidate.handle = parsedUrl.handle;
        if (!candidate.platform || candidate.platform === "Social Media") candidate.platform = parsedUrl.platform;
      }
    }

    // Clean handle
    let handle = String(candidate.handle || "").trim();
    if (handle.startsWith("@")) handle = handle.substring(1);
    candidate.handle = handle;
    if (!candidate.displayName) candidate.displayName = handle;
    if (!candidate.platform) candidate.platform = "Social Media";

    if (!handle && !candidate.url && !candidate.displayName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a social media profile URL or account username to check.",
      });
    }

    // Brand Resolution Hierarchy
    let brand = brandData || null;
    let brandStatus = "BRAND_NOT_VERIFIED";

    if (!brand && brandId) {
      try {
        const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "BrandProfile" WHERE id = $1`, brandId);
        if (rows.length) brand = rows[0];
      } catch (_) {}
    }

    const brandQuery = claimedBrand || candidate.claimedBrand || candidate.brandName;
    if (!brand && brandQuery) {
      try {
        const rows = await prisma.$queryRawUnsafe(
          `SELECT * FROM "BrandProfile" WHERE LOWER(name) = LOWER($1) OR id = $1 LIMIT 1`,
          String(brandQuery).trim()
        );
        if (rows.length) brand = rows[0];
      } catch (_) {}

      if (!brand) {
        const catalogBrand = findCatalogBrand(brandQuery);
        if (catalogBrand) brand = catalogBrand;
      }
    }

    if (!brand) {
      const autoBrand = autoDetectBrandFromCandidate({
        text: `${candidate.displayName} ${candidate.bio || ""}`,
        url: candidate.url,
        handle: candidate.handle,
      });
      if (autoBrand) {
        try {
          const rows = await prisma.$queryRawUnsafe(
            `SELECT * FROM "BrandProfile" WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            autoBrand.name.toLowerCase()
          );
          brand = rows.length ? rows[0] : autoBrand;
        } catch (_) {
          brand = autoBrand;
        }
      }
    }

    if (brand && brand.name) {
      brandStatus = "BRAND_RECOGNIZED";
      const cat = findCatalogBrand(brand.name);
      if (cat?.officialSocial) {
        brand.officialSocial = [...(brand.officialSocial || []), ...cat.officialSocial];
      }
    } else {
      brand = {
        name: brandQuery ? String(brandQuery).trim() : null,
        domain: null,
        unverified: true,
      };
    }

    // 1. Official Account Check
    const isOfficial = !brand.unverified && isOfficialSocial(candidate, brand);
    if (isOfficial) {
      brandStatus = "VERIFIED_OFFICIAL";
      return res.json({
        success: true,
        riskLabel: "No Major Warning Signs Found",
        riskLevel: "LOW_SIGNAL",
        riskScore: 0.05,
        score: 5,
        severity: "LOW",
        isOfficial: true,
        brandStatus,
        brand: {
          name: brand.name,
          domain: brand.domain,
          officialSocial: brand.officialSocial,
        },
        candidate,
        explanation: `The account @${candidate.handle} matches the official verified reference record for ${brand.name}.`,
        warningSigns: [],
        evidence: [
          {
            label: "Official Handle Match",
            value: `@${candidate.handle}`,
            detail: `Registered official account for ${brand.name}`,
          },
        ],
        verifiedFacts: [
          `Matches official verified handle in the ${brand.name} registry (@${candidate.handle}).`,
          brand.domain ? `Official brand website domain is ${brand.domain}.` : "Registered brand reference.",
        ],
        userSubmittedInfo: [
          `Platform: ${candidate.platform}`,
          `Handle: @${candidate.handle}`,
          candidate.url ? `Submitted URL: ${candidate.url}` : null,
        ].filter(Boolean),
        automatedFindings: [
          "Zero impersonation anomalies detected.",
          "Verified against trusted brand registry.",
        ],
        uncompletedChecks: [
          "Live follower count, direct messages, and account creation timestamp could not be verified without live social media API access.",
        ],
        nextSteps: [
          "This account appears to be legitimate based on official registry references.",
          `Always confirm that external links navigate to ${brand.domain || "the official website"} before entering credentials.`,
        ],
      });
    }

    // 2. Evidence-Based Detection
    const warningSigns = [];
    const evidence = [];
    const verifiedFacts = [];
    const userSubmittedInfo = [
      `Platform: ${candidate.platform}`,
      `Handle: @${candidate.handle}`,
      candidate.displayName && candidate.displayName !== candidate.handle ? `Display Name: ${candidate.displayName}` : null,
      candidate.url ? `Profile URL: ${candidate.url}` : null,
      candidate.bio ? `Submitted Bio/Message: "${candidate.bio.slice(0, 80)}..."` : null,
    ].filter(Boolean);
    const automatedFindings = [];
    const uncompletedChecks = [
      "Live account activity and private direct messages cannot be inspected without social platform credentials.",
    ];

    let totalScore = 0;
    const hasBrandRef = Boolean(!brand.unverified && brand.name);

    if (hasBrandRef) {
      verifiedFacts.push(`Official brand record found for "${brand.name}" (domain: ${brand.domain || "N/A"}).`);

      const officialHandlesList = (brand.officialSocial || []).map((s) => `@${s.handle}`).join(", ");
      if (officialHandlesList) {
        verifiedFacts.push(`Official registered handle(s): ${officialHandlesList}`);
      }

      const handleMatch = lookalikeName(candidate.handle || "", brand.name);
      const nameMatch = lookalikeName(candidate.displayName || "", brand.name);
      const best = handleMatch.score >= nameMatch.score ? handleMatch : nameMatch;

      if (best.score >= 0.6) {
        totalScore += best.score * 45;
        const techniquesStr = best.techniques?.length ? ` (${best.techniques.join(", ")})` : "";
        warningSigns.push(`Name similarity to ${brand.name}: ${Math.round(best.score * 100)}%${techniquesStr}`);
        evidence.push({
          label: "Lookalike Name Pattern",
          value: `${candidate.displayName || candidate.handle} ≈ ${brand.name}`,
          detail: `Detected lookalike technique: ${best.techniques.join(", ") || "character similarity"}`,
        });
        automatedFindings.push(
          `Lookalike similarity score ${Math.round(best.score * 100)}% detected using homoglyph and edit distance analysis.`
        );
      }

      warningSigns.push(`Handle @${candidate.handle} does NOT match any official ${brand.name} account`);
      evidence.push({
        label: "Unverified Handle",
        value: `@${candidate.handle}`,
        detail: `Official registered handle(s) are: ${officialHandlesList || "None registered"}`,
      });
      totalScore += 25;
    } else {
      verifiedFacts.push(`Brand identity not verified: "${brand.name || candidate.handle}" is not in the trusted official brand registry.`);
      uncompletedChecks.push(
        "Could not verify against an official brand profile because no official registry reference exists for this entity."
      );
    }

    // Check for impersonation words
    const IMPERSONATION_WORDS = ["official", "support", "helpdesk", "customer_care", "care", "help", "verify", "legit", "kyc", "desk"];
    const combinedText = `${candidate.handle} ${candidate.displayName} ${candidate.bio || ""}`.toLowerCase();
    const foundImpWords = IMPERSONATION_WORDS.filter((w) => combinedText.includes(w));
    if (foundImpWords.length) {
      totalScore += Math.min(25, foundImpWords.length * 10);
      warningSigns.push(`Uses official/support claims: "${foundImpWords.join(", ")}"`);
      evidence.push({
        label: "Impersonation Keywords",
        value: foundImpWords.join(", "),
        detail: "Account uses words typically associated with official brand support to establish false trust.",
      });
      automatedFindings.push(`Detected ${foundImpWords.length} keyword(s) attempting to claim official support status.`);
    }

    // Check URL signals
    if (candidate.url || candidate.link) {
      const linkToCheck = candidate.link || candidate.url;
      const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "cutt.ly"];
      const SUSPICIOUS_TLDS = [".xyz", ".tk", ".ml", ".ga", ".cf", ".top", ".click", ".loan"];

      const isShortener = SHORTENERS.some((s) => linkToCheck.includes(s));
      const hasSuspiciousTld = SUSPICIOUS_TLDS.some((t) => linkToCheck.includes(t));
      const isHttp = linkToCheck.startsWith("http://");

      if (isShortener) {
        totalScore += 20;
        warningSigns.push("Uses URL shortener (hides true destination)");
        evidence.push({
          label: "Shortened URL",
          value: linkToCheck,
          detail: "URL shorteners are commonly used in phishing to disguise malicious domains.",
        });
      }
      if (hasSuspiciousTld) {
        totalScore += 20;
        warningSigns.push("Link points to high-risk non-standard domain extension");
        evidence.push({
          label: "Suspicious TLD",
          value: linkToCheck,
          detail: "Domain uses an extension frequently abused for scam campaigns.",
        });
      }
      if (isHttp) {
        totalScore += 10;
        warningSigns.push("Link is unencrypted (HTTP instead of HTTPS)");
      }
    }

    // Bio scam pattern scan
    if (candidate.bio) {
      const SCAM_WORDS = [
        { word: "kyc", desc: "Demands KYC update" },
        { word: "otp", desc: "Requests one-time password (OTP)" },
        { word: "giveaway", desc: "Offers prize/giveaway" },
        { word: "airdrop", desc: "Crypto airdrop claim" },
        { word: "refund", desc: "Claims pending refund" },
        { word: "cashback", desc: "Offers instant cashback" },
        { word: "click here", desc: "Urgent link click directive" },
        { word: "whatsapp", desc: "Directs to unofficial WhatsApp" },
        { word: "telegram", desc: "Directs to unofficial Telegram" },
        { word: "urgent", desc: "Creates artificial urgency" },
      ];
      const bioLower = candidate.bio.toLowerCase();
      const detectedPatterns = SCAM_WORDS.filter((item) => bioLower.includes(item.word));
      if (detectedPatterns.length) {
        totalScore += Math.min(30, detectedPatterns.length * 10);
        const labels = detectedPatterns.map((d) => d.desc);
        warningSigns.push(`High-risk phrasing in bio: ${labels.slice(0, 3).join(", ")}`);
        evidence.push({
          label: "Suspicious Call-to-Action",
          value: detectedPatterns.map((d) => d.word).join(", "),
          detail: "Bio prompts users with tactics commonly seen in social phishing campaigns.",
        });
        automatedFindings.push(`Detected ${detectedPatterns.length} high-risk phrases in profile bio or message text.`);
      }
    }

    // Image comparison if candidate logoHash provided
    if (candidate.logoHash && brand?.logoHash) {
      const sim = hashSimilarity(candidate.logoHash, brand.logoHash);
      if (sim >= 0.85) {
        totalScore += 25;
        warningSigns.push(`Profile image is ${(sim * 100).toFixed(0)}% identical to official brand logo`);
        evidence.push({
          label: "Logo Imitation",
          value: `${(sim * 100).toFixed(0)}% visual match`,
          detail: "Perceptual image hashing indicates the profile is using a logo that closely mimics the official brand asset.",
        });
        automatedFindings.push(`Perceptual image hash similarity: ${(sim * 100).toFixed(0)}%`);
      }
    }

    totalScore = Math.min(100, Math.round(totalScore));
    let riskLabel, riskLevel, explanation;

    if (totalScore >= 60 || (hasBrandRef && warningSigns.length >= 2)) {
      riskLabel = "High Risk";
      riskLevel = "HIGH_RISK";
      explanation = hasBrandRef
        ? `The account name closely resembles ${brand.name}, but the username does not match the official account reference.`
        : "Multiple strong warning signs were detected, including impersonation words and suspicious link or payment requests.";
    } else if (totalScore >= 30 || warningSigns.length >= 1) {
      riskLabel = "Needs a Closer Look";
      riskLevel = "NEEDS_CAUTION";
      explanation = hasBrandRef
        ? `Some suspicious indicators were found resembling ${brand.name}, but the profile lacks complete verification evidence.`
        : "Some suspicious indicators were found, but the evidence is incomplete. Exercise caution before trusting this profile.";
    } else {
      riskLabel = "No Major Warning Signs Found";
      riskLevel = "LOW_SIGNAL";
      explanation = hasBrandRef
        ? `The checks performed did not reveal significant warning signs for ${brand.name}.`
        : "The checks performed did not reveal significant warning signs. However, brand identity could not be verified against an official registry.";
    }

    const nextSteps =
      riskLabel === "High Risk"
        ? [
            "Do not share passwords, OTPs, Aadhaar numbers, or bank account details.",
            hasBrandRef && brand.domain
              ? `Visit the official verified website directly at https://${brand.domain}.`
              : "Verify the account through known official customer support channels.",
            "Report this profile to the social media platform for brand impersonation.",
            "If you have suffered financial loss, report immediately to the National Cyber Crime Helpline (1930).",
          ]
        : riskLabel === "Needs a Closer Look"
        ? [
            "Do not click any shortened or unverified links in this profile's bio.",
            "Contact the brand through their verified telephone numbers or official app rather than social DM.",
            "Inspect the account's past post history and follower interactions for genuine community engagement.",
          ]
        : [
            "No major warning signs were found in the submitted information.",
            "Note: A clean initial check does not prove an account is 100% safe. Always verify independently before sharing money or credentials.",
          ];

    return res.json({
      success: true,
      riskLabel,
      riskLevel,
      riskScore: Math.round(totalScore) / 100,
      score: totalScore,
      severity: riskLevel === "HIGH_RISK" ? "HIGH" : riskLevel === "NEEDS_CAUTION" ? "MEDIUM" : "LOW",
      isOfficial: false,
      brandStatus,
      brand: {
        name: brand.name || "Unverified Brand",
        domain: brand.domain || "N/A",
        officialSocial: brand.officialSocial || [],
      },
      candidate,
      explanation,
      warningSigns,
      evidence,
      verifiedFacts,
      userSubmittedInfo,
      automatedFindings,
      uncompletedChecks,
      nextSteps,
    });
  } catch (err) {
    console.error("Analyze social error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to analyze social profile" });
  }
};

// ─── POST /api/brand/analyze-app — Analyze candidate mobile app ──────────────
export const analyzeAppController = async (req, res) => {
  try {
    let { brandId, brandData, candidate, claimedBrand } = req.body;
    if (!candidate) candidate = {};

    // Support flat body fields
    if (req.body.name && !candidate.name) candidate.name = req.body.name;
    if (req.body.storeUrl && !candidate.storeUrl) candidate.storeUrl = req.body.storeUrl;
    if (req.body.publisher && !candidate.publisher) candidate.publisher = req.body.publisher;
    if (req.body.appId && !candidate.appId) candidate.appId = req.body.appId;
    if (req.body.packageId && !candidate.appId) candidate.appId = req.body.packageId;
    if (req.body.description && !candidate.description) candidate.description = req.body.description;
    if (req.body.iconHash && !candidate.iconHash) candidate.iconHash = req.body.iconHash;
    if (req.body.claimedBrand && !claimedBrand) claimedBrand = req.body.claimedBrand;

    // Parse store URL if provided
    let parsedUrl = null;
    if (candidate.storeUrl) {
      parsedUrl = parseAppUrl(candidate.storeUrl);
      if (parsedUrl) {
        if (!candidate.appId && parsedUrl.appId) candidate.appId = parsedUrl.appId;
        if (!candidate.store || candidate.store === "Mobile App Store") candidate.store = parsedUrl.store;
      }
    }

    if (!candidate.name && !candidate.appId && !candidate.storeUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide an app name or app store link to check.",
      });
    }

    if (!candidate.name && candidate.appId) candidate.name = candidate.appId;
    if (!candidate.store) candidate.store = "Google Play";

    // Brand Resolution Hierarchy
    let brand = brandData || null;
    let brandStatus = "BRAND_NOT_VERIFIED";

    if (!brand && brandId) {
      try {
        const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "BrandProfile" WHERE id = $1`, brandId);
        if (rows.length) brand = rows[0];
      } catch (_) {}
    }

    const brandQuery = claimedBrand || candidate.claimedBrand || candidate.brandName;
    if (!brand && brandQuery) {
      try {
        const rows = await prisma.$queryRawUnsafe(
          `SELECT * FROM "BrandProfile" WHERE LOWER(name) = LOWER($1) OR id = $1 LIMIT 1`,
          String(brandQuery).trim()
        );
        if (rows.length) brand = rows[0];
      } catch (_) {}

      if (!brand) {
        const catalogBrand = findCatalogBrand(brandQuery);
        if (catalogBrand) brand = catalogBrand;
      }
    }

    if (!brand) {
      const autoBrand = autoDetectBrandFromCandidate({
        text: `${candidate.name} ${candidate.description || ""} ${candidate.publisher || ""}`,
        name: candidate.name,
        appId: candidate.appId,
        store: candidate.store,
      });
      if (autoBrand) {
        try {
          const rows = await prisma.$queryRawUnsafe(
            `SELECT * FROM "BrandProfile" WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            autoBrand.name.toLowerCase()
          );
          brand = rows.length ? rows[0] : autoBrand;
        } catch (_) {
          brand = autoBrand;
        }
      }
    }

    if (brand && brand.name) {
      brandStatus = "BRAND_RECOGNIZED";
      const cat = findCatalogBrand(brand.name);
      if (cat?.officialApps) {
        brand.officialApps = [...(brand.officialApps || []), ...cat.officialApps];
      }
    } else {
      brand = {
        name: brandQuery ? String(brandQuery).trim() : null,
        domain: null,
        unverified: true,
      };
    }

    // 1. Official App Check
    const isOfficial = !brand.unverified && isOfficialApp(candidate, brand);
    if (isOfficial) {
      brandStatus = "VERIFIED_OFFICIAL";
      return res.json({
        success: true,
        riskLabel: "No Major Warning Signs Found",
        riskLevel: "LOW_SIGNAL",
        riskScore: 0.05,
        score: 5,
        severity: "LOW",
        isOfficial: true,
        brandStatus,
        brand: {
          name: brand.name,
          domain: brand.domain,
          officialApps: brand.officialApps,
        },
        candidate,
        explanation: `The package identifier "${candidate.appId}" matches the verified official mobile application reference for ${brand.name}.`,
        warningSigns: [],
        evidence: [
          {
            label: "Verified Package Identifier",
            value: candidate.appId,
            detail: `Official registered mobile application package for ${brand.name}`,
          },
        ],
        verifiedFacts: [
          `Matches official package ID in the ${brand.name} mobile app registry (${candidate.appId}).`,
          brand.domain ? `Official brand domain: ${brand.domain}.` : "Registered brand reference.",
        ],
        userSubmittedInfo: [
          `App Name: ${candidate.name}`,
          `Store: ${candidate.store}`,
          candidate.publisher ? `Publisher: ${candidate.publisher}` : null,
          candidate.appId ? `Package ID: ${candidate.appId}` : null,
        ].filter(Boolean),
        automatedFindings: [
          "Zero impersonation anomalies detected.",
          "Verified against trusted app registry.",
        ],
        uncompletedChecks: [
          "Live app installation and binary signature verification could not be performed without direct device installation.",
        ],
        nextSteps: [
          "This app appears to be genuine based on official registry references.",
          "Always download applications directly from the official store link provided on the brand's verified website.",
        ],
      });
    }

    // 2. Evidence-Based Detection
    const warningSigns = [];
    const evidence = [];
    const verifiedFacts = [];
    const userSubmittedInfo = [
      `App Name: ${candidate.name}`,
      `Store: ${candidate.store}`,
      candidate.publisher ? `Publisher / Developer: ${candidate.publisher}` : null,
      candidate.appId ? `Package ID: ${candidate.appId}` : null,
      candidate.storeUrl ? `Store URL: ${candidate.storeUrl}` : null,
      candidate.description ? `Description: "${candidate.description.slice(0, 80)}..."` : null,
    ].filter(Boolean);
    const automatedFindings = [];
    const uncompletedChecks = [
      "Live APK permissions, network calls, and digital signing certificates cannot be checked without direct APK binary analysis.",
    ];

    let totalScore = 0;
    const hasBrandRef = Boolean(!brand.unverified && brand.name);

    if (hasBrandRef) {
      verifiedFacts.push(`Official brand record found for "${brand.name}" (domain: ${brand.domain || "N/A"}).`);

      const officialPublishers = (brand.officialApps || []).map((a) => a.publisher).filter(Boolean);
      if (officialPublishers.length) {
        verifiedFacts.push(`Official authorized publisher(s): ${officialPublishers.join(", ")}`);
      }

      // Name & Package ID similarity
      const nameMatch = lookalikeName(candidate.name || "", brand.name);
      const idMatch = candidate.appId ? lookalikeName(candidate.appId.split(".").join(" "), brand.name) : { score: 0, techniques: [] };
      const best = nameMatch.score >= idMatch.score ? nameMatch : idMatch;

      if (best.score >= 0.6) {
        totalScore += best.score * 40;
        const techStr = best.techniques?.length ? ` (${best.techniques.join(", ")})` : "";
        warningSigns.push(`App name similarity to ${brand.name}: ${Math.round(best.score * 100)}%${techStr}`);
        evidence.push({
          label: "Brand Name Lookalike",
          value: `${candidate.name} ≈ ${brand.name}`,
          detail: `Detected lookalike technique: ${best.techniques.join(", ") || "character similarity"}`,
        });
        automatedFindings.push(
          `App name lookalike similarity score ${Math.round(best.score * 100)}% detected.`
        );
      }

      // Publisher check
      if (candidate.publisher && officialPublishers.length) {
        const cleanPub = (p) => String(p || "").toLowerCase()
          .replace(/\b(private limited|pvt ltd|pvt\.?|ltd\.?|limited|llc|inc\.?)\b/gi, "")
          .replace(/[^a-z0-9]/g, "")
          .trim();
        const candClean = cleanPub(candidate.publisher);
        const matchesOfficialPub = officialPublishers.some((op) => {
          const opClean = cleanPub(op);
          return (candClean && opClean && (candClean.includes(opClean) || opClean.includes(candClean))) ||
                 candidate.publisher.toLowerCase().includes(op.toLowerCase()) ||
                 op.toLowerCase().includes(candidate.publisher.toLowerCase());
        });
        if (!matchesOfficialPub) {
          totalScore += 30;
          warningSigns.push(`Publisher "${candidate.publisher}" differs from the official publisher listed for ${brand.name}`);
          evidence.push({
            label: "Publisher Mismatch",
            value: `Submitted: "${candidate.publisher}" vs Official: "${officialPublishers.join(", ")}"`,
            detail: "The developer/publisher name does not match the official organization registered with the brand.",
          });
          automatedFindings.push(`Publisher mismatch detected against ${brand.name} official registry.`);
        }
      } else if (!candidate.publisher) {
        uncompletedChecks.push("Developer / publisher name was not provided for comparison.");
      }

      // Package ID check
      const officialAppIds = (brand.officialApps || []).map((a) => a.appId).filter(Boolean);
      if (candidate.appId && officialAppIds.length) {
        if (!officialAppIds.includes(candidate.appId)) {
          totalScore += 20;
          warningSigns.push(`Package ID "${candidate.appId}" is NOT an official ${brand.name} application`);
          evidence.push({
            label: "Unofficial Package Identifier",
            value: candidate.appId,
            detail: `Official registered package ID(s): ${officialAppIds.join(", ")}`,
          });
        }
      }
    } else {
      verifiedFacts.push(`Brand identity not verified: "${brand.name || candidate.name}" is not in the trusted official brand registry.`);
      uncompletedChecks.push(
        "Could not verify against an official brand profile because no official registry reference exists for this entity."
      );
    }

    // Risky wording in description
    if (candidate.description) {
      const APP_SCAM_WORDS = [
        { word: "instant loan", desc: "Promises instant loan without documents" },
        { word: "processing fee", desc: "Demands upfront fee before disbursement" },
        { word: "guaranteed returns", desc: "Claims guaranteed investment profit" },
        { word: "kyc", desc: "Requests unverified KYC documents" },
        { word: "otp", desc: "Requests OTP sharing" },
        { word: "official", desc: "Claims to be official companion" },
        { word: "hack", desc: "Claims hacking or bypass functionality" },
      ];
      const descLower = candidate.description.toLowerCase();
      const detectedAppPatterns = APP_SCAM_WORDS.filter((item) => descLower.includes(item.word));
      if (detectedAppPatterns.length) {
        totalScore += Math.min(25, detectedAppPatterns.length * 8);
        const labels = detectedAppPatterns.map((d) => d.desc);
        warningSigns.push(`Suspicious claims in description: ${labels.slice(0, 3).join(", ")}`);
        evidence.push({
          label: "Deceptive Description Phrasing",
          value: detectedAppPatterns.map((d) => d.word).join(", "),
          detail: "App store description contains tactics often observed in predatory loan or fake companion apps.",
        });
        automatedFindings.push(`Detected ${detectedAppPatterns.length} suspicious pattern(s) in app description.`);
      }
    }

    // Icon hash comparison
    if (candidate.iconHash && brand?.logoHash) {
      const sim = hashSimilarity(candidate.iconHash, brand.logoHash);
      if (sim >= 0.85) {
        totalScore += 25;
        warningSigns.push(`App icon is ${(sim * 100).toFixed(0)}% identical to official brand logo`);
        evidence.push({
          label: "Logo Imitation",
          value: `${(sim * 100).toFixed(0)}% visual match`,
          detail: "Perceptual icon hashing indicates the app uses an icon that closely imitates the official brand logo.",
        });
      }
    }

    totalScore = Math.min(100, Math.round(totalScore));
    let riskLabel, riskLevel, explanation;

    if (totalScore >= 60 || (hasBrandRef && warningSigns.length >= 2)) {
      riskLabel = "High Risk";
      riskLevel = "HIGH_RISK";
      explanation = hasBrandRef
        ? `The app publisher differs from the publisher listed in the available official reference for ${brand.name}.`
        : "Strong warning signs were detected indicating possible brand impersonation or deceptive publisher claims.";
    } else if (totalScore >= 30 || warningSigns.length >= 1) {
      riskLabel = "Needs a Closer Look";
      riskLevel = "NEEDS_CAUTION";
      explanation = hasBrandRef
        ? `The app name resembles ${brand.name}, but publisher and store details require independent verification.`
        : "Some suspicious indicators were found, but the evidence is incomplete. Verify the developer before installing.";
    } else {
      riskLabel = "No Major Warning Signs Found";
      riskLevel = "LOW_SIGNAL";
      explanation = hasBrandRef
        ? `The checks performed did not reveal significant warning signs for ${brand.name}.`
        : "The checks performed did not reveal significant warning signs. However, brand identity could not be verified against an official registry.";
    }

    const nextSteps =
      riskLabel === "High Risk"
        ? [
            "Do NOT install or grant Android/iOS permissions to this application.",
            hasBrandRef && brand.domain
              ? `Only download official apps directly from verified links on ${brand.domain}.`
              : "Verify the official app through the company's verified website.",
            "Report this app listing to Google Play or Apple App Store as an impersonation scam.",
            "If you have already entered banking credentials, contact your bank immediately to block netbanking.",
          ]
        : riskLabel === "Needs a Closer Look"
        ? [
            "Inspect user reviews in the app store, especially 1-star reviews mentioning scams or unexpected charges.",
            "Confirm that the publisher has a verified developer badge and a verifiable physical address.",
            "Avoid granting sensitive SMS, contact, or camera permissions upon launch.",
          ]
        : [
            "No major warning signs were found in the submitted app information.",
            "Note: A clean initial check does not prove an app is 100% safe. Always verify permissions before installing.",
          ];

    return res.json({
      success: true,
      riskLabel,
      riskLevel,
      riskScore: Math.round(totalScore) / 100,
      score: totalScore,
      severity: riskLevel === "HIGH_RISK" ? "HIGH" : riskLevel === "NEEDS_CAUTION" ? "MEDIUM" : "LOW",
      isOfficial: false,
      brandStatus,
      brand: {
        name: brand.name || "Unverified Brand",
        domain: brand.domain || "N/A",
        officialApps: brand.officialApps || [],
      },
      candidate,
      explanation,
      warningSigns,
      evidence,
      verifiedFacts,
      userSubmittedInfo,
      automatedFindings,
      uncompletedChecks,
      nextSteps,
    });
  } catch (err) {
    console.error("Analyze app error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to analyze mobile app" });
  }
};

// ─── POST /api/brand/submit-case — Submit asset to Analyst Triage Queue ───────
export const submitBrandCaseController = async (req, res) => {
  try {
    const { assetType, candidate, brand, analysisResult } = req.body;
    if (!assetType || !candidate || !brand) {
      return res.status(400).json({ success: false, message: "assetType, candidate, and brand are required" });
    }

    const contentType = assetType === "app" ? "app" : "social";
    const platform = assetType === "app" ? (candidate.store || "App Store") : (candidate.platform || "Social Media");
    const assetTitle = assetType === "app" ? candidate.name : `@${candidate.handle}`;

    const rawContent = JSON.stringify({
      targetBrand: brand.name,
      targetDomain: brand.domain,
      assetType,
      candidate,
      analysisResult,
    }, null, 2);

    const publicSummary = `[IMPERSONATION INVESTIGATION] ${contentType.toUpperCase()}: ${assetTitle} targeting ${brand.name}. Risk Score: ${Math.round((analysisResult?.riskScore || 0) * 100)}/100.`;

    const riskLevel = analysisResult?.riskLevel || "NEEDS_CAUTION";
    const riskScore = analysisResult?.riskScore || 0.6;
    const evidenceJson = JSON.stringify((analysisResult?.reasons || []).map(r => ({ field: "impersonation_signal", value: r, why: r })));
    const storyModeJson = JSON.stringify((analysisResult?.techniques || []).map(t => ({ phrase: assetTitle, tactic: t, explanation: `Used technique: ${t}` })));
    const nextStepsJson = JSON.stringify([
      `Do not install or authenticate with this ${contentType}`,
      `Verify the asset against ${brand.name}'s official website: ${brand.domain}`,
      "Report to brand protection and cyber security helpline 1930"
    ]);

    const rows = await prisma.$queryRawUnsafe(`
      INSERT INTO "Report" (id, "submittedById", "contentType", "rawContent", "publicSummary",
        platform, "targetRegion", "riskLevel", "riskScore", "evidenceJson", "storyModeJson",
        "nextStepsJson", caveat, status, "sourceType", "createdAt", "updatedAt")
      VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, 'IN', $6, $7, $8, $9, $10, $11, 'RECEIVED', 'COMMUNITY', NOW(), NOW())
      RETURNING id, "riskLevel", "riskScore", status, "createdAt"
    `,
      req.user?.id ?? null,
      contentType,
      rawContent,
      publicSummary,
      platform,
      riskLevel,
      riskScore,
      evidenceJson,
      storyModeJson,
      nextStepsJson,
      "Asset submitted through Public Brand Protection portal for analyst review."
    );

    const report = rows[0];

    // Persist Brand & Asset Indicators
    try {
      // 1. Brand Indicator
      const brandVal = brand.name.toLowerCase();
      const existBrand = await prisma.$queryRawUnsafe(`SELECT id FROM "Indicator" WHERE type='BRAND' AND value=$1`, brandVal);
      let brandIndId;
      if (existBrand.length) {
        brandIndId = existBrand[0].id;
      } else {
        const ins = await prisma.$queryRawUnsafe(
          `INSERT INTO "Indicator" (id, type, value, metadata, "createdAt") VALUES (gen_random_uuid()::text, 'BRAND', $1, $2, NOW()) RETURNING id`,
          brandVal, JSON.stringify({ brandName: brand.name })
        );
        brandIndId = ins[0].id;
      }
      await prisma.$queryRawUnsafe(
        `INSERT INTO "ReportIndicator" (id, "reportId", "indicatorId", context) VALUES (gen_random_uuid()::text, $1, $2, $3) ON CONFLICT DO NOTHING`,
        report.id, brandIndId, `Brand targeted: ${brand.name}`
      );

      // 2. Social Handle or App Name Indicator
      const assetVal = (assetType === "app" ? (candidate.appId || candidate.name) : candidate.handle).toLowerCase();
      const indType = assetType === "app" ? "PHRASE" : "SOCIAL_HANDLE";
      const existAsset = await prisma.$queryRawUnsafe(`SELECT id FROM "Indicator" WHERE type=$1 AND value=$2`, indType, assetVal);
      let assetIndId;
      if (existAsset.length) {
        assetIndId = existAsset[0].id;
      } else {
        const ins = await prisma.$queryRawUnsafe(
          `INSERT INTO "Indicator" (id, type, value, metadata, "createdAt") VALUES (gen_random_uuid()::text, $1, $2, $3, NOW()) RETURNING id`,
          indType, assetVal, JSON.stringify({ candidate })
        );
        assetIndId = ins[0].id;
      }
      await prisma.$queryRawUnsafe(
        `INSERT INTO "ReportIndicator" (id, "reportId", "indicatorId", context) VALUES (gen_random_uuid()::text, $1, $2, $3) ON CONFLICT DO NOTHING`,
        report.id, assetIndId, `Suspicious asset: ${assetTitle}`
      );
    } catch (_) {}

    // Audit log
    try {
      await prisma.$queryRawUnsafe(
        `INSERT INTO "AuditEvent" (id, "userId", "reportId", action, detail, "createdAt")
         VALUES (gen_random_uuid()::text, $1, $2, 'REPORT_SUBMITTED', $3, NOW())`,
        req.user?.id ?? null, report.id, JSON.stringify({ assetType, brand: brand.name, score: riskScore })
      );
    } catch (_) {}

    return res.status(201).json({
      success: true,
      reportId: report.id,
      status: report.status,
      riskLevel: report.riskLevel,
      riskScore: report.riskScore,
      message: "Suspicious asset submitted to Analyst Triage Queue for investigation.",
    });
  } catch (err) {
    console.error("Submit brand case error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to submit brand case" });
  }
};

// ─── GET /api/brand/logo-check/presets — Test fixtures & demo presets ────────
export const logoPresetsController = async (req, res) => {
  const presets = [
    {
      id: "sbi-altered-text",
      title: "Altered Character: 'SB1' instead of 'SBI'",
      subtitle: "Lookalike character substitution on State Bank of India logo",
      category: "Character Substitution / Typosquatting",
      claimedBrand: "SBI",
      accountUrl: "https://x.com/sb1_support_official",
      imageUrl: "/test-logos/sbi-altered-text.svg",
      expectedConclusion: "DIFFERENCES_DETECTED",
      description: "Demonstrates high-fidelity visual imitation where the letter 'I' is replaced by numeral '1' (SB1).",
    },
    {
      id: "sbi-original",
      title: "Official State Bank of India Logo",
      subtitle: "Genuine authentic asset from official repository",
      category: "Authentic Reference",
      claimedBrand: "SBI",
      accountUrl: "https://sbi.co.in",
      imageUrl: "/test-logos/sbi-original.svg",
      expectedConclusion: "LIKELY_VISUAL_MATCH",
      description: "Tests near-exact match against official brand guidelines and dimensions.",
    },
    {
      id: "sbi-modified-color",
      title: "Modified Palette & '24x7 Support' Badge",
      subtitle: "Color hue divergence and added scam qualifiers",
      category: "Color & Badge Modification",
      claimedBrand: "SBI",
      accountUrl: "https://instagram.com/sbi_customercare_24x7",
      imageUrl: "/test-logos/sbi-modified-color.svg",
      expectedConclusion: "DIFFERENCES_DETECTED",
      description: "Demonstrates color palette shift (purple/magenta) and added deceptive support badge.",
    },
    {
      id: "netflix-clone",
      title: "Netflix Clone: 'NETFL1X' with Altered Ribbon",
      subtitle: "Altered gold color and leetspeak typography",
      category: "Color Shift & Leetspeak",
      claimedBrand: "Netflix",
      accountUrl: "https://facebook.com/free_netfl1x_hd",
      imageUrl: "/test-logos/netflix-clone.svg",
      expectedConclusion: "DIFFERENCES_DETECTED",
      description: "Demonstrates yellow/gold altered ribbon and 'NETFL1X' modified spelling.",
    },
    {
      id: "unrelated-logo",
      title: "Unrelated Botanical Logo (Apex Botanics)",
      subtitle: "Completely different visual identity against SBI claim",
      category: "Unrelated Logo",
      claimedBrand: "SBI",
      accountUrl: "https://x.com/apex_finance",
      imageUrl: "/test-logos/unrelated-logo.svg",
      expectedConclusion: "DIFFERENCES_DETECTED",
      description: "Demonstrates heavy perceptual divergence (>20 bits Hamming distance) and shape mismatch.",
    },
    {
      id: "nike-candidate",
      title: "Live Search: Nike Official Logo Discovery",
      subtitle: "Dynamic authoritative retrieval of Nike via Wikidata / Wikimedia",
      category: "Dynamic Reference Discovery",
      claimedBrand: "Nike",
      accountUrl: "https://nike.com",
      imageUrl: "/test-logos/nike-candidate.svg",
      expectedConclusion: "LIKELY_VISUAL_MATCH",
      description: "Demonstrates automated server-side reference discovery and image comparison without manual brand registration.",
    },
    {
      id: "failed-search",
      title: "Simulated Search Provider Outage",
      subtitle: "Transparent handling when external search is unreachable",
      category: "Error Handling & Fallback",
      claimedBrand: "Acme International",
      accountUrl: "https://acme-simulated.org",
      imageUrl: "/test-logos/sbi-original.svg",
      expectedConclusion: "UNABLE_TO_VERIFY",
      description: "Demonstrates explainable error reporting when search gateway times out or encounters network failure.",
    },
    {
      id: "unknown-brand",
      title: "Unregistered Geometric Graphic",
      subtitle: "No brand name or domain match in authoritative registry",
      category: "Unverifiable Brand",
      claimedBrand: "Random Company",
      accountUrl: "https://example-random-portal.xyz",
      imageUrl: "/test-logos/unknown-brand.svg",
      expectedConclusion: "UNABLE_TO_VERIFY",
      description: "Demonstrates graceful degradation to 'Unable to Verify' with image-only analysis.",
    },
  ];
  return res.json({ success: true, presets });
};

// ─── POST /api/brand/logo-check — AI & Forensic Logo Authenticity Checker ─────
export const logoCheckController = async (req, res) => {
  let tempFilePath = null;
  try {
    const { brandName, url, handle, appName, testScenario } = req.body;

    let buffer = null;
    let fileMeta = null;
    let previewDataUrl = null;

    let effectiveBrand = brandName;
    let effectiveUrl = url;
    let simulateSearchFailure = Boolean(req.body.simulateSearchFailure);

    // 1. Check if a pre-packaged test scenario was selected
    if (testScenario) {
      const validFixtures = {
        "sbi-original": { file: "sbi-original.svg", brand: "SBI", url: "https://sbi.co.in" },
        "sbi-altered-text": { file: "sbi-altered-text.svg", brand: "SBI", url: "https://x.com/sb1_support_official" },
        "sbi-modified-color": { file: "sbi-modified-color.svg", brand: "SBI", url: "https://instagram.com/sbi_customercare_24x7" },
        "netflix-clone": { file: "netflix-clone.svg", brand: "Netflix", url: "https://facebook.com/free_netfl1x_hd" },
        "unrelated-logo": { file: "unrelated-logo.svg", brand: "SBI", url: "https://x.com/apex_finance" },
        "nike-candidate": { file: "nike-candidate.svg", brand: "Nike", url: "https://nike.com" },
        "failed-search": { file: "sbi-original.svg", brand: "Acme International", url: "https://acme-simulated.org", simulateFailure: true },
        "unknown-brand": { file: "unknown-brand.svg", brand: "", url: "" },
      };
      const fixtureInfo = validFixtures[testScenario];
      if (fixtureInfo) {
        if (!effectiveBrand && fixtureInfo.brand) effectiveBrand = fixtureInfo.brand;
        if (!effectiveUrl && fixtureInfo.url) effectiveUrl = fixtureInfo.url;
        if (fixtureInfo.simulateFailure) simulateSearchFailure = true;
        const fixturePath = path.resolve(process.cwd(), `../frontend/public/test-logos/${fixtureInfo.file}`);
        if (fs.existsSync(fixturePath)) {
          buffer = fs.readFileSync(fixturePath);
          fileMeta = { name: fixtureInfo.file, size: buffer.length, type: "image/svg+xml" };
          previewDataUrl = `/test-logos/${fixtureInfo.file}`;
        }
      }
    }

    // 2. Check if file uploaded via multipart form data
    if (!buffer && req.file) {
      tempFilePath = req.file.path;
      buffer = fs.readFileSync(tempFilePath);
      fileMeta = { name: req.file.originalname, size: req.file.size, type: req.file.mimetype };
      previewDataUrl = `data:${req.file.mimetype};base64,${buffer.toString("base64")}`;
    }

    // 3. Check if candidate URL or Base64 data was supplied in body
    if (!buffer && req.body.candidateUrl) {
      const rawUrl = String(req.body.candidateUrl).trim();
      if (rawUrl.startsWith("data:image/")) {
        const parts = rawUrl.split(",");
        const base64Data = parts[1];
        buffer = Buffer.from(base64Data, "base64");
        fileMeta = { name: "uploaded-image", size: buffer.length, type: "image/png" };
        previewDataUrl = rawUrl;
      } else if (rawUrl.startsWith("/")) {
        const localPath = path.resolve(process.cwd(), `../frontend/public${rawUrl}`);
        if (fs.existsSync(localPath)) {
          buffer = fs.readFileSync(localPath);
          fileMeta = { name: path.basename(localPath), size: buffer.length, type: "image/svg+xml" };
          previewDataUrl = rawUrl;
        }
      } else if (/^https?:\/\//i.test(rawUrl)) {
        try {
          const remoteResp = await fetch(rawUrl, { signal: AbortSignal.timeout(6000) });
          if (remoteResp.ok) {
            buffer = Buffer.from(await remoteResp.arrayBuffer());
            fileMeta = { name: "remote-image", size: buffer.length, type: "image/jpeg" };
            previewDataUrl = rawUrl;
          }
        } catch (fetchErr) {
          console.warn("Could not fetch remote candidate image:", fetchErr.message);
        }
      }
    }

    if (!buffer) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file or select a candidate logo image to compare.",
      });
    }

    // Run the multi-factor comparison pipeline
    const comparisonResult = await compareLogoAuthenticity({
      uploadedBuffer: buffer,
      fileMeta,
      brandNameInput: effectiveBrand,
      urlInput: effectiveUrl,
      handleInput: handle,
      appNameInput: appName,
      simulateSearchFailure,
    });

    return res.json({
      success: true,
      ...comparisonResult,
      uploadedImagePreview: previewDataUrl,
    });
  } catch (err) {
    console.error("Logo check controller error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to complete logo authenticity check.",
    });
  } finally {
    if (tempFilePath) {
      try { fs.unlinkSync(tempFilePath); } catch (_) {}
    }
  }
};


