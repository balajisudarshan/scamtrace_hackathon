import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import StoryModeVisualizer from "../components/StoryModeVisualizer";
import DNAMatchCard from "../components/DNAMatchCard";
import {
  Search,
  MessageSquare,
  Globe,
  Phone,
  AtSign,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  PlusCircle,
  Lock,
  Tag,
  CheckCircle2,
  XCircle,
  LifeBuoy,
  GitCompare,
  Image,
  UploadCloud,
  FileText,
} from "lucide-react";
import ScanUploadZone from "../components/ScanUploadZone";
import ScanProgressFeedback from "../components/ScanProgressFeedback";
import { CheckResultSkeleton } from "../components/ScanSkeleton";

export default function CheckPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [type, setType] = useState(location.state?.initialType || "message");
  const [content, setContent] = useState(location.state?.initialContent || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Tab switcher for results: 'simple' (Plain language verdict) vs 'forensic' (Deep clues & DNA)
  const [resultView, setResultView] = useState("simple");

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    if (result) setResult(null);
  };

  const sampleMessages = [
    {
      label: "KYC Suspension SMS",
      type: "message",
      text: "Dear SBI customer your account has been suspended. Update your KYC immediately at http://sbi-secure-login.co.in or call +918888123456",
    },
    {
      label: "Banking Phishing Link",
      type: "url",
      text: "http://hdfc-kyc-update.net",
    },
    {
      label: "Digital Arrest Threat",
      type: "message",
      text: "This is CBI speaking. A case has been filed against you for money laundering. You are under digital arrest. Do not tell anyone and stay on the call.",
    },
    {
      label: "UPI Payment Reversal",
      type: "message",
      text: "I sent money to your UPI by mistake. Please return it via this collect request. Approve the payment to refund Rs 5000 to my account.",
    },
    {
      label: "Lottery Reward URL",
      type: "url",
      text: "http://paytm-cashback-win.com",
    },
  ];

  const runCheck = async (checkType, checkContent) => {
    const activeType = checkType || type;

    if (activeType === "image") {
      if (!imageFile) {
        setError("Please select or drop a screenshot image to analyze.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await api.check.analyzeImage(formData);
        if (res && res.success) {
          setResult(res);
        } else {
          setError(res?.message || "Screenshot analysis could not be completed.");
        }
      } catch (err) {
        setError(err?.message || "Failed to analyze screenshot.");
      } finally {
        setLoading(false);
      }
      return;
    }

    const textToAnalyze = (checkContent !== undefined ? checkContent : content).trim();
    if (!textToAnalyze) {
      setError("Please enter or paste suspicious content to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.check.analyze({ type: activeType, content: textToAnalyze });
      if (res && res.success) {
        setResult(res);
      } else {
        setError(res?.message || "Analysis could not be completed.");
      }
    } catch (err) {
      setError(err?.message || "Network error occurred while contacting analysis engine.");
    } finally {
      setLoading(false);
    }
  };

  // If initialContent was passed from home page, auto run check
  useEffect(() => {
    if (location.state?.initialContent && !result && !loading) {
      runCheck(location.state.initialType || "message", location.state.initialContent);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runCheck();
  };

  const handleSelectSample = (s) => {
    setType(s.type);
    setContent(s.text);
    runCheck(s.type, s.text);
  };

  const handleReset = () => {
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  const handleForwardToReport = () => {
    navigate("/report", {
      state: {
        initialType: type,
        initialContent: content,
        initialPlatform: type === "phone" ? "Phone Call" : type === "url" ? "Web Browser" : "SMS",
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "36px 20px 80px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            Check Suspicious Content
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 600, margin: "0 auto" }}>
            Paste any suspicious message, link, or phone number. We check it against known scam databases
            and give you a plain-language verdict.
          </p>
        </div>

        {/* Checker Form Card */}
        <div
          className="card"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border-strong)",
            padding: 24,
            marginBottom: 28,
          }}
        >
          {/* Input Type Selector */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {[
                { id: "message", label: "Message / SMS", icon: MessageSquare },
                { id: "image", label: "Screenshot / Image", icon: Image },
                { id: "url", label: "Website Link", icon: Globe },
                { id: "phone", label: "Phone Number", icon: Phone },
                { id: "social", label: "Social Handle", icon: AtSign },
              ].map((t) => {
                const Icon = t.icon;
                const active = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setType(t.id);
                      if (result) setResult(null);
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: active ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                      background: active ? "rgba(59, 130, 246, 0.12)" : "var(--surface-card)",
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <Icon size={14} style={{ color: active ? "var(--accent)" : "inherit" }} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <Link
              to="/brand-monitor"
              className="btn btn-outline btn-sm"
              style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6, borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}
            >
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>Brand & Mobile App Monitor →</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {type === "image" ? (
              <div style={{ marginBottom: 14 }}>
                <ScanUploadZone
                  isScanning={loading}
                  imagePreview={imagePreview}
                  fileName={imageFile?.name}
                  onFileSelect={handleImageChange}
                  onClear={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    if (result) setResult(null);
                  }}
                  accept="image/*"
                  label="Drop suspicious screenshot here or click to browse"
                  sublabel="Supports WhatsApp chats, SMS screenshots, fake receipts (PNG, JPG, WEBP up to 10MB)"
                  badgeText="SCANNING SCREENSHOT"
                />
              </div>
            ) : (
              <div style={{ marginBottom: 12 }}>
                <textarea
                  className="textarea"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    type === "message"
                      ? "Paste message text: e.g., 'Dear customer your SBI account is suspended...'"
                      : type === "url"
                      ? "Paste website link: e.g., http://sbi-secure-login.co.in"
                      : type === "phone"
                      ? "Enter phone number: e.g., +918888123456"
                      : "Enter social handle: e.g., @fraud_account"
                  }
                  style={{ fontSize: 14 }}
                  disabled={loading}
                />
              </div>
            )}

            {/* Quick 1-Click Samples */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 14,
                fontSize: 12,
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>Try samples:</span>
              {sampleMessages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(s)}
                  disabled={loading}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--text-secondary)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: 11,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Progress Feedback / Cold-Start Status / Error Retry */}
            <ScanProgressFeedback
              isScanning={loading}
              error={error}
              onRetry={() => runCheck()}
              scanType={type}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                <Lock size={13} style={{ color: "var(--accent)" }} />
                <span>Never enter personal passwords or OTPs.</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {result && !loading && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-outline btn-sm"
                    disabled={loading}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || (type === "image" ? !imageFile : !content.trim())}
                  className="btn btn-primary"
                  style={{ minWidth: 160 }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: 14, height: 14 }} />
                      <span>{type === "image" ? "Analyzing Image..." : "Checking Content..."}</span>
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      <span>Analyze Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ─── Skeleton Loading State ─── */}
        {loading && <CheckResultSkeleton scanType={type} />}

        {/* ─── Results Section ─── */}
        {!loading && result && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 1. Main Verdict Header */}
            <div
              className="card"
              style={{
                padding: "22px 24px",
                background:
                  result.riskLevel === "HIGH_RISK"
                    ? "linear-gradient(135deg, var(--risk-high-bg) 0%, var(--surface-card) 100%)"
                    : result.riskLevel === "NEEDS_CAUTION"
                    ? "linear-gradient(135deg, var(--risk-caution-bg) 0%, var(--surface-card) 100%)"
                    : "linear-gradient(135deg, var(--risk-low-bg) 0%, var(--surface-card) 100%)",
                border:
                  result.riskLevel === "HIGH_RISK"
                    ? "1px solid var(--risk-high-border)"
                    : result.riskLevel === "NEEDS_CAUTION"
                    ? "1px solid var(--risk-caution-border)"
                    : "1px solid var(--risk-low-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      background:
                        result.riskLevel === "HIGH_RISK"
                          ? "var(--risk-high-bg)"
                          : result.riskLevel === "NEEDS_CAUTION"
                          ? "var(--risk-caution-bg)"
                          : "var(--risk-low-bg)",
                      color:
                        result.riskLevel === "HIGH_RISK"
                          ? "var(--risk-high)"
                          : result.riskLevel === "NEEDS_CAUTION"
                          ? "var(--risk-caution)"
                          : "var(--risk-low)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {result.riskLevel === "HIGH_RISK" ? (
                      <ShieldAlert size={28} />
                    ) : result.riskLevel === "NEEDS_CAUTION" ? (
                      <AlertTriangle size={28} />
                    ) : (
                      <ShieldCheck size={28} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                      <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
                        {result.verdictTitle ||
                          (result.riskLevel === "HIGH_RISK"
                            ? "🚨 High-Risk Scam Detected"
                            : result.riskLevel === "NEEDS_CAUTION"
                            ? "⚠️ Suspicious — Needs Caution"
                            : "✅ Low Threat Signals")}
                      </h2>
                      {result.threatType && (
                        <span
                          style={{
                            background: "var(--accent-subtle)",
                            color: "var(--accent)",
                            border: "1px solid var(--accent-glow)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "monospace",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {result.threatType}
                        </span>
                      )}
                      {result.aiAnalysis?.enabled && (
                        <span
                          style={{
                            background: "var(--surface-card)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--surface-border)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: 11,
                            fontWeight: 500,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontFamily: "monospace",
                          }}
                        >
                          <ShieldCheck size={11} />
                          <span>Signal Match • {result.aiAnalysis.confidence}%</span>
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      Risk Score: <strong>{Math.round((result.riskScore || 0) * 100)} / 100</strong> •{" "}
                      {result.evidence?.length || 0} threat pattern(s) identified
                    </div>
                    {result.verdictSummary && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 13,
                          color: "var(--text-primary)",
                          background: "var(--bg-subtle)",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          borderLeft: "3px solid var(--accent)",
                        }}
                      >
                        <strong>Summary:</strong> {result.verdictSummary}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleForwardToReport} className="btn btn-primary btn-sm">
                    <PlusCircle size={14} />
                    <span>Report This Scam</span>
                  </button>
                  <Link to="/damage-control" className="btn btn-secondary btn-sm">
                    <LifeBuoy size={14} />
                    <span>Emergency Help</span>
                  </Link>
                </div>
              </div>

              {/* View Switcher */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  background: "var(--surface-elevated)",
                  padding: 3,
                  borderRadius: "6px",
                  border: "1px solid var(--surface-border)",
                  width: "fit-content",
                }}
              >
                <button
                  type="button"
                  onClick={() => setResultView("simple")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "4px",
                    border: "none",
                    background: resultView === "simple" ? "var(--surface-card)" : "transparent",
                    color: resultView === "simple" ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setResultView("forensic")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "4px",
                    border: "none",
                    background: resultView === "forensic" ? "var(--surface-card)" : "transparent",
                    color: resultView === "forensic" ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Technical Evidence ({result.evidence?.length || 0})
                </button>
              </div>
            </div>

            {/* Mode A: Plain Language Verdict */}
            {resultView === "simple" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Extracted Screenshot Text (if Image) */}
                {result.ocrText && (
                  <div className="card" style={{ background: "var(--surface-elevated)", border: "1px solid var(--surface-border)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                      <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 6, color: "var(--text-primary)" }}>
                        <FileText size={15} style={{ color: "var(--accent)" }} />
                        <span>Extracted Content (OCR)</span>
                      </h3>
                      {result.imageUrl && (
                        <a
                          href={result.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: 11, color: "var(--accent)", textDecoration: "underline" }}
                        >
                          View uploaded image
                        </a>
                      )}
                    </div>
                    <pre
                      style={{
                        background: "var(--input-bg)",
                        padding: 12,
                        borderRadius: 6,
                        border: "1px solid var(--surface-border)",
                        fontSize: 12,
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "var(--text-primary)",
                        margin: 0,
                        maxHeight: 180,
                        overflowY: "auto",
                      }}
                    >
                      {result.ocrText}
                    </pre>
                  </div>
                )}

                {/* What Is This Scam */}
                <div className="card">
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
                    What is this scam trying to do?
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {result.evidence?.length > 0 ? (
                      result.evidence.map((ev, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: 13,
                            color: "var(--text-primary)",
                            padding: "8px 12px",
                            background: "var(--bg-subtle)",
                            borderRadius: "6px",
                          }}
                        >
                          <span style={{ color: "var(--risk-high)", fontWeight: 700 }}>•</span>
                          <div>
                            <strong style={{ color: "var(--risk-high)" }}>{ev.value}</strong>: {ev.why}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: "var(--text-muted)", fontSize: 13, margin: 0 }}>
                        No specific phishing vectors or malicious indicators found.
                      </p>
                    )}
                  </div>
                </div>

                {/* Dynamic Next Steps from Backend */}
                <div className="card">
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
                    What you should do right now:
                  </h3>
                  {result.nextSteps && result.nextSteps.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
                      {result.nextSteps.map((step, idx) => {
                        const isEmergency = step.includes("🚨") || step.includes("EMERGENCY") || step.includes("CRITICAL");
                        const isWarning = step.includes("⚠️") || step.includes("Do NOT") || step.includes("Do not") || step.includes("Never");
                        const isSafe = step.includes("✅") || step.includes("Block") || step.includes("Report") || step.includes("Verify") || step.includes("Contact") || step.includes("Screenshot") || step.includes("File") || step.includes("Check") || step.includes("Talk") || step.includes("community report");

                        const bg = isEmergency
                          ? "rgba(239, 68, 68, 0.12)"
                          : isWarning
                          ? "rgba(239, 68, 68, 0.08)"
                          : isSafe
                          ? "rgba(16, 185, 129, 0.08)"
                          : "rgba(245, 158, 11, 0.08)";

                        const border = isEmergency
                          ? "1px solid rgba(239, 68, 68, 0.3)"
                          : isWarning
                          ? "1px solid rgba(239, 68, 68, 0.2)"
                          : isSafe
                          ? "1px solid rgba(16, 185, 129, 0.2)"
                          : "1px solid rgba(245, 158, 11, 0.2)";

                        const color = isEmergency
                          ? "#FCA5A5"
                          : isWarning
                          ? "#FCA5A5"
                          : isSafe
                          ? "#6EE7B7"
                          : "#FCD34D";

                        const Icon = isWarning || isEmergency ? XCircle : CheckCircle2;

                        return (
                          <div
                            key={idx}
                            style={{
                              background: bg,
                              border,
                              padding: "12px",
                              borderRadius: "8px",
                              fontSize: 13,
                              color,
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <Icon size={16} style={{ flexShrink: 0 }} />
                            <span>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "12px", borderRadius: "8px", fontSize: 13, color: "#FCA5A5", display: "flex", alignItems: "center", gap: 8 }}>
                        <XCircle size={16} style={{ flexShrink: 0 }} />
                        <span><strong>Do NOT</strong> click any link or send an OTP</span>
                      </div>
                      <div style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "12px", borderRadius: "8px", fontSize: 13, color: "#FCA5A5", display: "flex", alignItems: "center", gap: 8 }}>
                        <XCircle size={16} style={{ flexShrink: 0 }} />
                        <span><strong>Do NOT</strong> call the sender number</span>
                      </div>
                      <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "12px", borderRadius: "8px", fontSize: 13, color: "#6EE7B7", display: "flex", alignItems: "center", gap: 8 }}>
                        <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
                        <span><strong>Block & delete</strong> the message</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Mode B: Deep Forensic Breakdown */
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Story Mode */}
                {result.storyMode && result.storyMode.length > 0 && (
                  <StoryModeVisualizer storyMode={result.storyMode} rawContent={content} />
                )}

                {/* Technical Indicators List */}
                <div className="card">
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    Extracted Technical Indicators ({result.indicators?.length || 0})
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {result.indicators?.map((ind, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: 12,
                          background: "var(--bg-subtle)",
                          border: "1px solid var(--surface-border)",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                        }}
                      >
                        <strong style={{ color: "var(--accent)" }}>{ind.type}:</strong> {ind.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Community Reports (Scam DNA) */}
                {result.relatedReports && result.relatedReports.length > 0 && (
                  <div className="card">
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                      <GitCompare size={16} style={{ color: "var(--accent)" }} />
                      <span>Connected Incident Reports ({result.relatedReports.length})</span>
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                      {result.relatedReports.map((rel) => (
                        <DNAMatchCard key={rel.id} match={rel} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Caveat */}
                {result.caveat && (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg-subtle)", padding: 12, borderRadius: 6, border: "1px solid var(--surface-border)" }}>
                    <strong>Forensic Caveat:</strong> {result.caveat}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
