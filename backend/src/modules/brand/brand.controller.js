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

import { scan, lookalikeName, scoreSocial, scoreApp } from "../../lib/brandDetect.js";
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
