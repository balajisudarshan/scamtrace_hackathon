import express from "express";
import { checkController } from "./check.controller.js";

const router = express.Router();

router.post("/", checkController);
router.post("/analyze", checkController);

export default router;
