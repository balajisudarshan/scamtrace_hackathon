import express from "express";
import { checkController, checkImageController, uploadImageMiddleware } from "./check.controller.js";

const router = express.Router();

router.post("/", checkController);
router.post("/analyze", checkController);
router.post("/image", uploadImageMiddleware, checkImageController);

export default router;
