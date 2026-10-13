import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRoutes   from "./modules/auth/auth.routes.js";
import checkRoutes  from "./modules/check/check.routes.js";
import reportRoutes from "./modules/report/report.routes.js";
import adminRoutes  from "./modules/admin/admin.routes.js";
import trendRoutes  from "./modules/trends/trends.routes.js";
import brandRoutes  from "./modules/brand/brand.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

// ─── CORS Configuration ──────────────────────────────────────
const DEFAULT_ALLOWED_ORIGINS = [
  "https://scamtrace-hackathon.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8000",
  "https://scamtrace-hackathon.onrender.com",
];

// Normalize and sanitize environment CORS_ORIGIN
const rawEnvOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

// Auto-correct any accidental http:// typo for production frontend origin
const sanitizedEnvOrigins = rawEnvOrigins.map((origin) => {
  if (origin === "http://scamtrace-hackathon.vercel.app") {
    console.warn(
      "[CORS Warning] Detected 'http://scamtrace-hackathon.vercel.app' in CORS_ORIGIN. Correcting to HTTPS: 'https://scamtrace-hackathon.vercel.app'"
    );
    return "https://scamtrace-hackathon.vercel.app";
  }
  return origin;
});

const allowedOrigins = Array.from(
  new Set([...DEFAULT_ALLOWED_ORIGINS, ...sanitizedEnvOrigins])
);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }
    const normalizedOrigin = origin.trim().replace(/\/+$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 204,
};

// ─── Global Middleware ────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ─── Health Check ─────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ScamTrace API is running", version: "1.0.0" });
});

// ─── Routes ───────────────────────────────────────────────────
app.use("/api/auth",    authRoutes);    // Auth: register, login, google, me
app.use("/api/check",   checkRoutes);   // Public: analyze suspicious content
app.use("/api/reports", reportRoutes);  // Public: submit + community intelligence
app.use("/api/admin",   adminRoutes);   // Analyst Portal B (ANALYST/ADMIN only)
app.use("/api/trends",  trendRoutes);   // ScamPulse: public trend data
app.use("/api/brand",   brandRoutes);   // Digital Risk Protection: brand impersonation scan

// ─── Error Handler ────────────────────────────────────────────
app.use(errorHandler);

export default app;

