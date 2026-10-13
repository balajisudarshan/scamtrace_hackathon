import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { api } from "../services/api";
import Navbar, { Footer } from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import StatusBadge from "../components/StatusBadge";
import {
  ShieldAlert,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Globe,
  Phone,
  AtSign,
  Smartphone,
  HelpCircle,
  UploadCloud,
  Image,
} from "lucide-react";

export default function ReportPage() {
  const location = useLocation();

  const [type, setType] = useState(location.state?.initialType || "message");
  const [content, setContent] = useState(location.state?.initialContent || "");
  const [platform, setPlatform] = useState(location.state?.initialPlatform || "SMS");
  const [targetRegion, setTargetRegion] = useState("IN");
  const [consent, setConsent] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Redaction preview helper: simulates what will be sanitized into public summary
  const getRedactionPreview = () => {
    if (!content.trim()) return "Redacted summary will appear here once content is provided.";
    // Redact 10-digit numbers, full names, or potential sensitive strings
    return content
      .replace(/(?:\+91|0)?[6-9]\d{9}/g, "[PHONE_REDACTED]")
      .replace(/(\b\d{4}[ -]?\d{4}[ -]?\d{4}\b)/g, "[ID_REDACTED]")
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]");
  };

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOcrLoading(true);
    setError(null);
    setOcrSuccess(false);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.check.analyzeImage(formData);
      if (res && res.ocrText) {
        setContent(res.ocrText);
        setOcrSuccess(true);
      } else {
        setError("Could not extract readable text from this screenshot. Please paste manually.");
      }
    } catch (err) {
      setError(err?.message || "Failed to process screenshot evidence.");
    } finally {
      setOcrLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please paste the suspicious content or incident text.");
      return;
    }
    if (content.length > 5000) {
      setError("Content exceeds maximum limit of 5000 characters.");
      return;
    }
    if (!consent) {
      setError("Please acknowledge the privacy consent checkbox to submit.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await api.reports.submit({
        type,
        content: content.trim(),
        platform,
        targetRegion,
      });

      if (res && res.success) {
        setSuccessData(res);
      } else {
        setError(res?.message || "Failed to submit report.");
      }
    } catch (err) {
      setError(err?.message || "Server error occurred while submitting report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: 840, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            Report a Scam Incident
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Submit suspicious messages, phishing websites, or fraudulent caller numbers to the SCAMTRACE
            triage desk. Analysts investigate submitted evidence, extract technical indicators, and publish
            safe summaries to warn others.
          </p>
        </div>

        {/* ─── Success Confirmation Screen ─── */}
        {successData ? (
          <div
            className="card fade-in"
            style={{
              background: "#11182B",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              padding: 32,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Report Successfully Submitted
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 540, margin: "0 auto 24px" }}>
              Your report has been entered into the SCAMTRACE intelligence ingestion queue. It has been
              assigned an initial risk assessment and sent to authorized analysts for corroboration and redaction.
            </p>

            {/* Report Reference Details Box */}
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                padding: "16px 20px",
                maxWidth: 480,
                margin: "0 auto 28px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Official Report ID:</span>
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: "var(--accent)" }}>
                  {successData.reportId}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Initial Status:</span>
                <StatusBadge status={successData.status || "RECEIVED"} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Calculated Risk:</span>
                <RiskBadge level={successData.riskLevel} score={successData.riskScore} size="sm" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Timestamp:</span>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  {new Date(successData.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
              <Link to={`/reports/${successData.reportId}`} className="btn btn-primary">
                <span>View Report Status</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/logo-check" className="btn btn-outline">
                <span>Check a Brand Logo</span>
              </Link>
              <button
                onClick={() => {
                  setSuccessData(null);
                  setContent("");
                  setConsent(false);
                }}
                className="btn btn-secondary"
              >
                Submit Another Incident
              </button>
            </div>
          </div>
        ) : (
          /* ─── Structured Report Form ─── */
          <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
            {/* Field 1: Category */}
            <div style={{ marginBottom: 20 }}>
              <label className="input-label">Report Type</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { id: "social", label: "Social Account", icon: AtSign },
                  { id: "app", label: "Mobile App", icon: Smartphone },
                  { id: "url", label: "Website", icon: Globe },
                  { id: "other", label: "Other / Message", icon: MessageSquare },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: active ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                        background: active ? "rgba(117, 103, 248, 0.15)" : "var(--surface-card)",
                        color: active ? "var(--accent)" : "var(--text-secondary)",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Icon size={14} style={{ color: active ? "var(--accent)" : "inherit" }} />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 2: Content */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                <label className="input-label" htmlFor="report-content" style={{ margin: 0 }}>
                  Suspicious Content or Evidence Text *
                </label>
                <label
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "4px",
                    color: "var(--text-secondary)",
                    fontSize: 12,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <UploadCloud size={13} style={{ color: "var(--accent)" }} />
                  <span>{ocrLoading ? "Extracting text..." : "Auto-fill from Screenshot"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    disabled={ocrLoading}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              {ocrSuccess && (
                <div style={{ fontSize: 12, color: "#34D399", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={13} />
                  <span>Text extracted from screenshot and populated below.</span>
                </div>
              )}
              <textarea
                id="report-content"
                className="textarea"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the full suspicious SMS text, message body, malicious URL, or caller transcript..."
                style={{ fontSize: 14 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                <span>Do NOT submit passwords, bank credentials, or OTPs.</span>
                <span>{content.length} / 5000 characters</span>
              </div>
            </div>

            {/* Field 3 & 4: Platform & Region */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <label className="input-label" htmlFor="report-platform">Platform / Delivery Channel</label>
                <select
                  id="report-platform"
                  className="select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="SMS">SMS / Text Message</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Phone Call / Voice</option>
                  <option value="Instagram">Instagram DM</option>
                  <option value="Facebook">Facebook Messenger</option>
                  <option value="Web Browser">Direct Web Page</option>
                  <option value="Other">Other Channel</option>
                </select>
              </div>

              <div>
                <label className="input-label" htmlFor="report-region">Target Region / Country</label>
                <select
                  id="report-region"
                  className="select"
                  value={targetRegion}
                  onChange={(e) => setTargetRegion(e.target.value)}
                >
                  <option value="IN">India (+91 / Indian targets)</option>
                  <option value="US">United States (+1)</option>
                  <option value="UK">United Kingdom (+44)</option>
                  <option value="GLOBAL">Global / International</option>
                </select>
              </div>
            </div>

            {/* Privacy Redaction Preview */}
            <div
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                padding: "16px",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
                <Eye size={14} style={{ color: "var(--accent)" }} />
                <span>Automatic Redaction Preview (What Analysts Review vs What Is Public)</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                Raw content is strictly restricted to authorized security analysts. Only sanitized summaries and technical indicators (domains, tactics) are published.
              </p>
              <div
                style={{
                  background: "#080C1A",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.04)",
                  fontSize: 12,
                  color: "#94A3B8",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
              >
                {getRedactionPreview()}
              </div>
            </div>

            {/* Consent & Disclosure Checkbox */}
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: 3 }}
                />
                <span>
                  I confirm this content was received by me or encountered online. I agree that extracted threat
                  indicators and a redacted public summary may be published to protect the community.
                </span>
              </label>
            </div>

            {error && (
              <div
                style={{
                  background: "var(--risk-high-bg)",
                  border: "1px solid var(--risk-high-border)",
                  color: "#FCA5A5",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !content.trim() || !consent}
              className="btn btn-primary btn-lg w-full"
            >
              {submitting ? (
                <>
                  <div className="spinner" style={{ width: 16, height: 16 }} />
                  <span>Submitting to Intelligence Queue...</span>
                </>
              ) : (
                <span>Submit Scam Report</span>
              )}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
