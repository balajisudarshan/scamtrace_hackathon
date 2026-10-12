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
} from "./brand.controller.js";
import { optionalAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

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
