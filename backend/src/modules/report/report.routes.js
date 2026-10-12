import express from "express";
import {
  submitReportController,
  listReportsController,
  getReportController,
  getScamDNAController,
  getStoryModeController,
} from "./report.controller.js";
import { authMiddleware, optionalAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Community Intelligence — public
router.get("/", listReportsController);
router.get("/:id", optionalAuth, getReportController);
router.get("/:id/story", getStoryModeController);
router.get("/:id/dna", optionalAuth, getScamDNAController);

// Submit — works anon or logged-in
router.post("/", optionalAuth, submitReportController);

export default router;
