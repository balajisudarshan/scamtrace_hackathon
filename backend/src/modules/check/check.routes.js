import express from "express";
import { checkController } from "./check.controller.js";

const router = express.Router();

router.post("/", checkController);

export default router;
