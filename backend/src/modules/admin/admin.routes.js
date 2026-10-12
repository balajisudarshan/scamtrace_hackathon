import express from "express";
import {
  getTriageQueueController,
  getAnalystCaseController,
  reviewReportController,
  addCaseNoteController,
  compareDNAController,
  getStatsController,
  getPatternRadarController,
  getAuditLogController,
  adminLoginController,
} from "./admin.controller.js";
import { authMiddleware, requireAnalyst } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ─── Public Administrator Login (No Auth Required) ───────────────────────────
router.post("/login", adminLoginController);

// All subsequent admin routes require authentication AND admin/analyst role
router.use(authMiddleware, requireAnalyst);

// Overview
router.get("/stats", getStatsController);

// Reported Scams / Triage Queue
router.get("/reports", getTriageQueueController);
router.get("/queue", getTriageQueueController);

// Case Management
router.get("/reports/:id", getAnalystCaseController);
router.post("/reports/:id/review", reviewReportController);
router.patch("/reports/:id/review", reviewReportController);
router.post("/reports/:id/notes", addCaseNoteController);

// Scam DNA
router.get("/dna/compare", compareDNAController);

// Pattern Radar
router.get("/pattern-radar", getPatternRadarController);

// Audit Log
router.get("/audit", getAuditLogController);

export default router;
