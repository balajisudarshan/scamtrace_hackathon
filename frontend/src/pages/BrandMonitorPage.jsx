import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  AtSign,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Search,
  AlertTriangle,
  Layers,
  Globe,
} from "lucide-react";

export default function BrandMonitorPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "50px 20px 80px", maxWidth: 1040, margin: "0 auto", width: "100%" }}>
        {/* ─── Hero Headline & Supporting Text ─── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(117, 103, 248, 0.12)",
              border: "1px solid rgba(117, 103, 248, 0.25)",
              color: "var(--accent)",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            Digital Risk & Impersonation Protection
          </div>

          <h1
            style={{
              fontSize: "clamp(30px, 4.5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Is this account or app really genuine?
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              maxWidth: 680,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Check suspicious social media profiles and mobile apps for signs of scams and brand impersonation before you trust them.
          </p>
        </div>

        {/* ─── Two Prominent Monitoring Cards ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* Card 1: Social Media Account Checker */}
          <div
            className="card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-xl)",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--surface-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 140,
                height: 140,
                background: "radial-gradient(circle, rgba(117,103,248,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(117, 103, 248, 0.15)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <AtSign size={28} />
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "var(--text-primary)" }}>
                Social Media Account Checker
              </h2>

              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                Check whether a social profile may be fake or impersonating a brand.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                {[
                  "Lookalike username & handle detection",
                  "Scam keywords (KYC urgency, OTP requests)",
                  "Deceptive link & URL shortener scanning",
                  "Perceptual logo similarity checks",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/social-check"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "var(--accent)",
                borderRadius: "var(--radius-md)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 4px 14px var(--accent-glow)",
                textAlign: "center",
              }}
            >
              Check a Social Account
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Card 2: Mobile App Checker */}
          <div
            className="card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-xl)",
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--risk-low)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--surface-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 140,
                height: 140,
                background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--risk-low)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Smartphone size={28} />
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "var(--text-primary)" }}>
                Mobile App Checker
              </h2>

              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                Check suspicious apps for misleading names, publishers, and possible brand impersonation.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                {[
                  "Publisher & developer mismatch detection",
                  "Unofficial package ID identification",
                  "Predatory loan & advance fee wording",
                  "App icon imitation & visual comparison",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                    <CheckCircle2 size={15} style={{ color: "var(--risk-low)", flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/app-check"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "var(--risk-low)",
                borderRadius: "var(--radius-md)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
                textAlign: "center",
              }}
            >
              Check a Mobile App
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ─── Trust & Reference Hierarchy Explanation ─── */}
        <div
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px 28px",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
            How Verification Works Without Brand Registration
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            SCAMTRACE evaluates submitted candidates against official trusted references (like State Bank of India, Tata Digital, Paytm, HDFC Bank, etc.),
            homoglyphic character patterns, lookalike algorithms, and known scam tactics.
            If a brand is not in the registry, the engine still investigates all suspicious indicators and clearly labels the entity as <strong>Brand identity not verified</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
