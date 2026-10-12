import { googleLogin, register, login } from "./auth.service.js";
import { prisma } from "../../lib/prisma.js";

// ─── Google OAuth ─────────────────────────────────────────────
export const googleAuthController = async (req, res) => {
  try {
    const { credential, token } = req.body;
    const idToken = credential || token;

    if (!idToken) {
      return res.status(400).json({ success: false, message: "Google credential token is required" });
    }

    const result = await googleLogin(idToken);
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error("Google auth error:", err);
    return res.status(400).json({ success: false, message: err.message || "Google authentication failed" });
  }
};

// ─── Register ─────────────────────────────────────────────────
export const registerController = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const result = await register(email, password, firstName, lastName);
    return res.status(201).json({ success: true, message: "Account created successfully", ...result });
  } catch (err) {
    console.error("Register error:", err);
    const status = err.message.includes("already exists") ? 409 : 400;
    return res.status(status).json({ success: false, message: err.message || "Registration failed" });
  }
};

// ─── Login ────────────────────────────────────────────────────
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const result = await login(email, password);
    return res.status(200).json({ success: true, message: "Login successful", ...result });
  } catch (err) {
    console.error("Login error:", err);
    const status = err.message === "User not found" ? 404 : 401;
    return res.status(status).json({ success: false, message: err.message || "Login failed" });
  }
};

// ─── Logout ───────────────────────────────────────────────────
export const logoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Get Current User ─────────────────────────────────────────
export const getCurrentUserController = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, message: "User fetched successfully" });
  } catch (err) {
    console.error("Get current user error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
