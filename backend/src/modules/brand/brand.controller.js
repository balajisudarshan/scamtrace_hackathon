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

import { scan, lookalikeName, scoreSocial, scoreApp, isOfficialSocial, isOfficialApp } from "../../lib/brandDetect.js";
import { aiExplainDetection, aiCompareLogos, analyzeImageWithOCR, uploadToCloudinary, aiEnabled } from "../../lib/aiVision.js";
import { prisma } from "../../lib/prisma.js";

// ─── Multer (from Certificate pattern) ───────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, tmpdir()),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const imageFilter = (_, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
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

// ─── POST /api/brand/analyze-social — Analyze candidate social account ───────
export const analyzeSocialController = async (req, res) => {
  try {
    const { brandId, brandData, candidate } = req.body;
    if (!candidate || !candidate.handle) {
      return res.status(400).json({ success: false, message: "Candidate social account handle is required" });
    }

    let brand = brandData;
    if (!brand && brandId) {
      const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "BrandProfile" WHERE id = $1`, brandId);
      if (rows.length) brand = rows[0];
    }

    if (!brand || !brand.name) {
      return res.status(400).json({ success: false, message: "Valid brand profile is required for analysis" });
    }

    // Check if official
    const isOfficial = isOfficialSocial(candidate, brand);
    if (isOfficial) {
      return res.json({
        success: true,
        isOfficial: true,
        riskLevel: "LOW_SIGNAL",
        riskScore: 0,
        score: 0,
        verdict: "OFFICIAL_ASSET — Verified official brand account",
        reasons: ["Matches official verified social handle registered in brand profile"],
        techniques: ["verified official identifier"],
        candidate,
        brand: { name: brand.name, domain: brand.domain },
      });
    }

    // Score candidate
    const scored = scoreSocial(candidate, brand);
    const scoreVal = scored ? scored.score : 15;
    const severity = scored ? scored.severity : "LOW";
    const riskLevel = scoreVal >= 75 ? "HIGH_RISK" : scoreVal >= 45 ? "NEEDS_CAUTION" : "LOW_SIGNAL";

    return res.json({
      success: true,
      isOfficial: false,
      riskLevel,
      riskScore: Math.round(scoreVal) / 100,
      score: scoreVal,
      severity,
      verdict: scoreVal >= 75
        ? "HIGH_RISK — Potential fake or impersonating account"
        : scoreVal >= 45
        ? "NEEDS_CAUTION — Suspicious similarities detected"
        : "LOW_SIGNAL — Low resemblance to official brand",
      reasons: scored?.reasons || ["Account name does not closely resemble brand assets"],
      techniques: scored?.techniques || [],
      matchedFields: scored?.matchedFields || {},
      candidate,
      brand: { name: brand.name, domain: brand.domain, officialSocial: brand.officialSocial },
    });
  } catch (err) {
    console.error("Analyze social error:", err);
    return res.status(500).json({ success: false, message: err.message || "Failed to analyze social profile" });
  }
};

// ─── POST /api/brand/analyze-app — Analyze candidate mobile app ──────────────
export const analyzeAppController = async (req, res) => {
  try {
    const { brandId, brandData, candidate } = req.body;
    if (!candidate || (!candidate.name && !candidate.appId)) {
      return res.status(400).json({ success: false, message: "Candidate app name or package/appId is required" });
    }

    let brand = brandData;
    if (!brand && brandId) {
      const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "BrandProfile" WHERE id = $1`, brandId);
      if (rows.length) brand = rows[0];
    }

    if (!brand || !brand.name) {
      return res.status(400).json({ success: false, message: "Valid brand profile is required for analysis" });
    }

    // Check if official
    const isOfficial = isOfficialApp(candidate, brand);
    if (isOfficial) {
      return res.json({
        success: true,
        isOfficial: true,
        riskLevel: "LOW_SIGNAL",
        riskScore: 0,
        score: 0,
        verdict: "OFFICIAL_ASSET — Verified official brand mobile application",
        reasons: ["App package ID matches official brand application record"],
        techniques: ["verified official app package identifier"],
        candidate,
        brand: { name: brand.name, domain: brand.domain },
      });
    }

    // Score app
    const scored = scoreApp(candidate, brand);
    const scoreVal = scored ? scored.score : 15;
    const severity = scored ? scored.severity : "LOW";
    const riskLevel = scoreVal >= 75 ? "HIGH_RISK" : scoreVal >= 45 ? "NEEDS_CAUTION" : "LOW_SIGNAL";

    return res.json({
      success: true,
      isOfficial: false,
      riskLevel,
      riskScore: Math.round(scoreVal) / 100,
      score: scoreVal,
      severity,
      verdict: scoreVal >= 75
        ? "HIGH_RISK — Potential fake mobile app impersonating brand"
        : scoreVal >= 45
        ? "NEEDS_CAUTION — Elevated risk due to name or publisher differences"
        : "LOW_SIGNAL — Minimal risk signal detected",
      reasons: scored?.reasons || ["App identifiers do not show significant brand resemblance"],
      techniques: scored?.techniques || [],
      candidate,
      brand: { name: brand.name, domain: brand.domain, officialApps: brand.officialApps },
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

