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
} from "./admin.controller.js";
import { authMiddleware, requireAnalyst } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// All admin routes require authentication AND analyst/admin role
router.use(authMiddleware, requireAnalyst);

// Overview
router.get("/stats", getStatsController);

// Triage Queue
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
