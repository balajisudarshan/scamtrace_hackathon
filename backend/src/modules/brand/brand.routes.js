import express from "express";
import {
  brandScanController,
  imageOCRController,
  getScanController,
  nameCheckController,
  logoCompareController,
  explainController,
  demoScanController,
  uploadMiddleware,
  listBrandProfilesController,
  getBrandProfileController,
  createBrandProfileController,
  updateBrandProfileController,
  deleteBrandProfileController,
  analyzeSocialController,
  analyzeAppController,
  submitBrandCaseController,
  uploadImageController,
  logoCheckController,
  logoPresetsController,
} from "./brand.controller.js";
import { optionalAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ─── AI-Powered Logo Authenticity Checker (Public) ───────────────────────────
router.get("/logo-check/presets", logoPresetsController);             // GET /api/brand/logo-check/presets
router.post("/logo-check", (req, res, next) => {                      // POST /api/brand/logo-check
  uploadMiddleware(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, logoCheckController);

// Brand Profiles Management (Public / Authenticated)
router.get("/profiles", listBrandProfilesController);                 // GET /api/brand/profiles
router.get("/profiles/:id", getBrandProfileController);               // GET /api/brand/profiles/:id
router.post("/profiles", optionalAuth, createBrandProfileController); // POST /api/brand/profiles
router.put("/profiles/:id", optionalAuth, updateBrandProfileController); // PUT /api/brand/profiles/:id
router.delete("/profiles/:id", optionalAuth, deleteBrandProfileController); // DELETE /api/brand/profiles/:id

// Image Upload with Perceptual Hash
router.post("/upload-image", optionalAuth, (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, uploadImageController);

// Social & App Impersonation Analysis
router.post("/analyze-social", analyzeSocialController);               // POST /api/brand/analyze-social
router.post("/analyze-app", analyzeAppController);                     // POST /api/brand/analyze-app
router.post("/submit-case", optionalAuth, submitBrandCaseController);  // POST /api/brand/submit-case

// Public endpoints (no auth required — for hackathon demo ease)
router.get("/demo", demoScanController);                              // GET /api/brand/demo
router.get("/name-check", nameCheckController);                       // GET /api/brand/name-check?candidate=X&brand=Y
router.get("/scan/:scanId", getScanController);                       // GET /api/brand/scan/:id

// Authenticated-optional endpoints
router.post("/scan", optionalAuth, brandScanController);              // POST /api/brand/scan
router.post("/scan/image", optionalAuth, (req, res, next) => {        // POST /api/brand/scan/image
  uploadMiddleware(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, imageOCRController);
router.post("/logo/compare", optionalAuth, logoCompareController);    // POST /api/brand/logo/compare
router.post("/explain", optionalAuth, explainController);             // POST /api/brand/explain

export default router;
