import express from "express";
import {
  googleAuthController,
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/google", googleAuthController);
router.post("/logout", logoutController);
router.get("/me", authMiddleware, getCurrentUserController);

export default router;
