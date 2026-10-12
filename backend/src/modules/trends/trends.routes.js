import express from "express";
import { getTrendsController, getIndicatorTrendsController } from "./trends.controller.js";

const router = express.Router();

router.get("/", getTrendsController);
router.get("/indicators", getIndicatorTrendsController);

export default router;
