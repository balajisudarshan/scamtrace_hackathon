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

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:5174", "http://localhost:8000"];

// ─── Global Middleware ────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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

