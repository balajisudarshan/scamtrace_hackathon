import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar, { Footer } from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import StoryModeVisualizer from "../components/StoryModeVisualizer";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  GitCompare,
  LifeBuoy,
  Users,
  ArrowRight,
  Lock,
  ExternalLink,
  MessageSquare,
  Globe,
  Phone,
  AtSign,
  Image as ImageIcon,
  UploadCloud,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import ScanUploadZone from "../components/ScanUploadZone";
import ScanProgressFeedback from "../components/ScanProgressFeedback";
import { CheckResultSkeleton } from "../components/ScanSkeleton";

export default function HomePage() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState("message");
  const [contentInput, setContentInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [inlineResult, setInlineResult] = useState(null);
  const [inlineError, setInlineError] = useState(null);
  const [showDeepDetails, setShowDeepDetails] = useState(false);

  const [recentReports, setRecentReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  // Fetch recent reviewed reports from real backend
  useEffect(() => {
    let isMounted = true;
    api.reports
      .list({ limit: 4, sortBy: "createdAt", sortOrder: "desc" })
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.reports)) {
          setRecentReports(res.reports);
        }
      })
      .catch((err) => {
        console.warn("Could not load recent reports:", err.message);
      })
      .finally(() => {
        if (isMounted) setLoadingReports(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageChange = (file) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
    if (inlineResult) setInlineResult(null);
    if (inlineError) setInlineError(null);
  };

  const runAnalysis = async (typeToUse, textToUse) => {
    const activeType = typeToUse || contentType;

    if (activeType === "image") {
      if (!imageFile) {
        setInlineError("Please select or drop a screenshot image to analyze.");
        return;
      }
      setAnalyzing(true);
      setInlineError(null);
      setInlineResult(null);
      try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await api.check.analyzeImage(formData);
        if (res && res.success) {
          setInlineResult(res);
        } else {
          setInlineError(res?.message || "Screenshot analysis could not be completed.");
        }
      } catch (err) {
        setInlineError(err.message || "Failed to analyze screenshot image.");
      } finally {
        setAnalyzing(false);
      }
      return;
    }

    const text = (textToUse || contentInput).trim();
    if (!text) {
      setInlineError("Please paste or type suspicious content to check.");
      return;
    }

    setAnalyzing(true);
    setInlineError(null);
    setInlineResult(null);

    try {
      const res = await api.check.analyze({ type: activeType, content: text });
      if (res && res.success) {
        setInlineResult(res);
      } else {
        setInlineError(res?.message || "Analysis could not be completed.");
      }
    } catch (err) {
      setInlineError(err.message || "Failed to reach backend analysis engine.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLaunchCheck = (e) => {
    e.preventDefault();
    runAnalysis();
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
      text: "I sent Rs 5000 to your UPI by mistake. Please approve this collect request to refund the amount back to my account.",
    },
  ];

  const handleSelectSample = (sample) => {
    setContentType(sample.type);
    setContentInput(sample.text);
    // Auto run analysis for instant gratification!
    runAnalysis(sample.type, sample.text);
  };

  const handleForwardToReport = () => {
    navigate("/report", {
      state: {
        initialType: contentType,
        initialContent: contentType === "image" ? (inlineResult?.ocrText || "") : contentInput,
        initialPlatform: contentType === "phone" ? "Phone Call" : contentType === "url" ? "Web Browser" : contentType === "image" ? "Screenshot Upload" : "SMS",
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* ─── Hero Section with Two Prominent Cards ─── */}
        <section
          style={{
            padding: "50px 20px 30px",
            maxWidth: 1040,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Subtle Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(117, 103, 248, 0.12)",
              border: "1px solid rgba(117, 103, 248, 0.3)",
              color: "var(--accent)",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
            Digital Risk Protection & Threat Intelligence
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 50px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            Instant Content & Scam Scanner
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              maxWidth: 680,
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Instantly scan suspicious SMS, messages, screenshots, website links, phone numbers, or handles to expose fraud before you click, reply, or pay.
          </p>

          {/* ── Instant Checker Card (Hero Centerpiece) ── */}
          <div
            className="card"
            style={{
              maxWidth: 780,
              margin: "0 auto 20px",
              padding: 24,
              textAlign: "left",
              background: "var(--surface-elevated)",
              border: "1px solid var(--surface-border-strong)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Input Type Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {[
                { id: "message", label: "Message / SMS", icon: MessageSquare },
                { id: "url", label: "Website Link", icon: Globe },
                { id: "phone", label: "Phone Number", icon: Phone },
                { id: "image", label: "Screenshot / Image", icon: ImageIcon },
                { id: "social", label: "Social Handle", icon: AtSign },
              ].map((t) => {
                const Icon = t.icon;
                const active = contentType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setContentType(t.id);
                      setInlineResult(null);
                      setInlineError(null);
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
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Icon size={14} style={{ color: active ? "var(--accent)" : "inherit" }} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLaunchCheck}>
              {contentType === "image" ? (
                <div style={{ marginBottom: 14 }}>
                  <ScanUploadZone
                    isScanning={analyzing}
                    imagePreview={imagePreview}
                    fileName={imageFile?.name}
                    onFileSelect={handleImageChange}
                    onClear={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      if (inlineResult) setInlineResult(null);
                    }}
                    accept="image/*"
                    label="Drop suspicious screenshot here or click to browse"
                    sublabel="Supports WhatsApp chats, SMS screenshots, fake receipts (PNG, JPG, WEBP up to 10MB)"
                    badgeText="SCANNING SCREENSHOT"
                  />
                </div>
              ) : (
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <textarea
                    className="textarea"
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    disabled={analyzing}
                    placeholder={
                      contentType === "message"
                        ? "Paste suspicious SMS, WhatsApp message, email, or DM here..."
                        : contentType === "url"
                        ? "Paste suspicious link or website domain (e.g., sbi-secure-login.co.in)..."
                        : contentType === "phone"
                        ? "Enter caller phone number (e.g., +918888123456)..."
                        : "Enter suspicious social profile handle or channel..."
                    }
                    style={{
                      minHeight: 90,
                      fontSize: 14,
                      padding: "14px",
                      lineHeight: 1.5,
                    }}
                  />
                </div>
              )}

              {/* 1-Click Demo Samples (shown for text types) */}
              {contentType !== "image" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 16,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>⚡ 1-Click Samples:</span>
                  {sampleMessages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(s)}
                      disabled={analyzing}
                      style={{
                        background: "var(--surface-card)",
                        border: "1px solid var(--surface-border)",
                        color: "var(--text-secondary)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: analyzing ? "not-allowed" : "pointer",
                        opacity: analyzing ? 0.6 : 1,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Progress Feedback / Cold Start / Timeout Retry */}
              <ScanProgressFeedback
                isScanning={analyzing}
                error={inlineError}
                onRetry={() => runAnalysis()}
                scanType={contentType}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--surface-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                  <Lock size={13} style={{ color: "var(--accent)" }} />
                  <span>Privacy First: Never submit passwords, PINs, or OTPs.</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {(inlineResult || contentInput || imageFile) && !analyzing && (
                    <button
                      type="button"
                      onClick={() => {
                        setContentInput("");
                        setImageFile(null);
                        setImagePreview(null);
                        setInlineResult(null);
                        setInlineError(null);
                      }}
                      className="btn btn-outline btn-sm"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={analyzing || (contentType === "image" ? !imageFile : !contentInput.trim())}
                    className="btn btn-primary"
                    style={{ padding: "10px 24px", minWidth: 160 }}
                  >
                    {analyzing ? (
                      <>
                        <div className="spinner" style={{ width: 14, height: 14 }} />
                        <span>{contentType === "image" ? "Analyzing Screenshot..." : "Analyzing Content..."}</span>
                      </>
                    ) : (
                      <>
                        <Search size={15} />
                        <span>{contentType === "image" ? "Scan Screenshot" : "Check Now"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* ─── Skeleton Loading State ─── */}
          {analyzing && (
            <div style={{ maxWidth: 780, margin: "0 auto 36px" }}>
              <CheckResultSkeleton scanType={contentType} />
            </div>
          )}

          {/* ─── Instant Inline Verdict Card (Clear & Non-Complex) ─── */}
          {!analyzing && inlineResult && (
            <div
              className="fade-in card"
              style={{
                maxWidth: 780,
                margin: "0 auto 36px",
                padding: 24,
                textAlign: "left",
                background:
                  inlineResult.riskLevel === "HIGH_RISK"
                    ? "linear-gradient(135deg, var(--risk-high-bg) 0%, var(--surface-card) 100%)"
                    : inlineResult.riskLevel === "NEEDS_CAUTION"
                    ? "linear-gradient(135deg, var(--risk-caution-bg) 0%, var(--surface-card) 100%)"
                    : "linear-gradient(135deg, var(--risk-low-bg) 0%, var(--surface-card) 100%)",
                border:
                  inlineResult.riskLevel === "HIGH_RISK"
                    ? "1px solid var(--risk-high-border)"
                    : inlineResult.riskLevel === "NEEDS_CAUTION"
                    ? "1px solid var(--risk-caution-border)"
                    : "1px solid var(--risk-low-border)",
              }}
            >
              {/* Verdict Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      background:
                        inlineResult.riskLevel === "HIGH_RISK"
                          ? "var(--risk-high-bg)"
                          : inlineResult.riskLevel === "NEEDS_CAUTION"
                          ? "var(--risk-caution-bg)"
                          : "var(--risk-low-bg)",
                      color:
                        inlineResult.riskLevel === "HIGH_RISK"
                          ? "var(--risk-high)"
                          : inlineResult.riskLevel === "NEEDS_CAUTION"
                          ? "var(--risk-caution)"
                          : "var(--risk-low)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {inlineResult.riskLevel === "HIGH_RISK" ? (
                      <ShieldAlert size={26} />
                    ) : inlineResult.riskLevel === "NEEDS_CAUTION" ? (
                      <AlertTriangle size={26} />
                    ) : (
                      <ShieldCheck size={26} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>
                      {inlineResult.riskLevel === "HIGH_RISK"
                        ? "🚨 High-Risk Scam Detected"
                        : inlineResult.riskLevel === "NEEDS_CAUTION"
                        ? "⚠️ Suspicious — Exercise Caution"
                        : "✅ Low Threat Signals"}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      Risk Confidence: <strong>{Math.round((inlineResult.riskScore || 0) * 100)}%</strong> • {inlineResult.evidence?.length || 0} threat indicator(s) found
                    </div>
                  </div>
                </div>

                <RiskBadge level={inlineResult.riskLevel} score={inlineResult.riskScore} />
              </div>

              {/* If OCR text was extracted from a screenshot, display it */}
              {inlineResult.ocrText && (
                <div
                  style={{
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent-glow)",
                    borderRadius: "var(--radius-md)",
                    padding: "12px 16px",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", marginBottom: 4 }}>
                    📷 Extracted Text from Screenshot (OCR):
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-primary)", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
                    "{inlineResult.ocrText}"
                  </p>
                </div>
              )}

              {/* Plain English Summary */}
              <div
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px 16px",
                  marginBottom: 18,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                  Plain-Language Summary:
                </div>
                <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
                  {inlineResult.evidence?.length > 0
                    ? inlineResult.evidence.map((e) => e.why).join(" • ")
                    : "No known malicious patterns or phishing domains were detected in this submission."}
                </p>
              </div>

              {/* Emergency Do's and Don'ts */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                  What you should do right now:
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  <div style={{ background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", padding: "10px 12px", borderRadius: "8px", fontSize: 12, color: "var(--risk-high)", display: "flex", alignItems: "center", gap: 8 }}>
                    <XCircle size={15} style={{ flexShrink: 0 }} />
                    <span><strong>Do NOT</strong> click the link or send OTP</span>
                  </div>
                  <div style={{ background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", padding: "10px 12px", borderRadius: "8px", fontSize: 12, color: "var(--risk-high)", display: "flex", alignItems: "center", gap: 8 }}>
                    <XCircle size={15} style={{ flexShrink: 0 }} />
                    <span><strong>Do NOT</strong> call the provided number</span>
                  </div>
                  <div style={{ background: "var(--risk-low-bg)", border: "1px solid var(--risk-low-border)", padding: "10px 12px", borderRadius: "8px", fontSize: 12, color: "var(--risk-low)", display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                    <span><strong>Block</strong> and delete the message</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid var(--surface-border)",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleForwardToReport} className="btn btn-primary btn-sm">
                    <PlusCircle size={14} />
                    <span>Report This Scam</span>
                  </button>
                  <Link to="/damage-control" className="btn btn-secondary btn-sm">
                    <LifeBuoy size={14} />
                    <span>I Already Clicked / Paid</span>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDeepDetails(!showDeepDetails)}
                  className="btn btn-outline btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <span>{showDeepDetails ? "Hide Forensic Clues" : "View Forensic Clues"}</span>
                  {showDeepDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Optional Expandable Deep Forensic Details */}
              {showDeepDetails && (
                <div className="fade-in" style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed var(--surface-border)" }}>
                  {inlineResult.storyMode && inlineResult.storyMode.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <StoryModeVisualizer storyMode={inlineResult.storyMode} rawContent={contentInput} />
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Found {inlineResult.relatedReports?.length || 0} matching reports in database.
                    </span>
                    <Link
                      to="/check"
                      state={{ initialType: contentType, initialContent: contentInput }}
                      className="btn btn-outline btn-sm"
                    >
                      <span>Open in Full Analysis Page</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── Specialized Brand & Mobile Monitoring Quick Access ─── */}
          <div style={{ maxWidth: 780, margin: "24px auto 0", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Specialized Brand & App Monitoring:
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 14,
              }}
            >
              <Link
                to="/social-check"
                className="card"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--surface-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "10px",
                      background: "rgba(117, 103, 248, 0.14)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AtSign size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      Social Media Account Checker
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Detect fake profiles & brand impersonators →
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              </Link>

              <Link
                to="/app-check"
                className="card"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--risk-low)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--surface-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "10px",
                      background: "rgba(16, 185, 129, 0.14)",
                      color: "var(--risk-low)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      Mobile App Checker
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Inspect package IDs & clone publishers →
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "var(--risk-low)", flexShrink: 0 }} />
              </Link>

              <Link
                to="/logo-check"
                className="card"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#F59E0B";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--surface-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "10px",
                      background: "rgba(245, 158, 11, 0.14)",
                      color: "#F59E0B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                      Logo Authenticity Checker
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Compare logos & detect visual imitations →
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "#F59E0B", flexShrink: 0 }} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 3 Clear Steps for Everyday Users ─── */}
        <section
          style={{
            padding: "20px 20px 40px",
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
              3 Simple Steps to Stay Protected
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              No technical expertise required. SCAMTRACE handles the forensic analysis for you.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            <div className="card" style={{ background: "var(--surface-elevated)" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                Check Suspicious Content
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Paste the message or link above. Our system extracts hidden phishing domains and emotional extortion tactics immediately.
              </p>
            </div>

            <div className="card" style={{ background: "var(--surface-elevated)" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--risk-low)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                Read the Plain Verdict
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Get clear answers: Is it an impersonation? Does it request OTPs? What is the real official website vs the fake one?
              </p>
            </div>

            <div className="card" style={{ background: "var(--surface-elevated)" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                Protect the Community
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Submit the scam with 1 click. Your report alerts thousands of other citizens and reaches cyber analysts.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Real Backend Live Community Alerts ─── */}
        <section
          style={{
            padding: "20px 20px 60px",
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Recent Verified Alerts</h2>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Verified incidents published from the SCAMTRACE database
              </p>
            </div>
            <Link
              to="/community"
              className="btn btn-outline btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>View All Reports</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {loadingReports ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card" style={{ height: 120, background: "var(--surface-card)" }} />
              ))}
            </div>
          ) : recentReports.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 14,
              }}
            >
              {recentReports.map((report) => (
                <Link
                  key={report.id}
                  to={`/reports/${report.id}`}
                  className="card card-interactive"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 10,
                    textDecoration: "none",
                    background: "var(--surface-elevated)",
                    padding: 16,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <RiskBadge level={report.riskLevel} size="sm" />
                      <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "capitalize" }}>
                        {report.platform || report.contentType}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        margin: 0,
                      }}
                    >
                      {report.publicSummary || "Incident investigated by analyst desk."}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      paddingTop: 8,
                      borderTop: "1px solid var(--surface-border)",
                    }}
                  >
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 500, display: "flex", alignItems: "center", gap: 3 }}>
                      Details <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: 24, color: "var(--text-muted)" }}>
              No published reports available yet.
            </div>
          )}
        </section>
      </main>

      {/* ─── Footer with Discreet Admin Link ─── */}
      <Footer />
    </div>
  );
}
