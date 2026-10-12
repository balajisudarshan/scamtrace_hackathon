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
  Sparkles,
  GitCompare,
} from "lucide-react";

export default function CheckPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [type, setType] = useState(location.state?.initialType || "message");
  const [content, setContent] = useState(location.state?.initialContent || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Tab switcher for results: 'simple' (Plain language verdict) vs 'forensic' (Deep clues & DNA)
  const [resultView, setResultView] = useState("simple");

  const sampleMessages = [
    {
      label: "🚨 Fake SBI SMS",
      type: "message",
      text: "Dear customer your SBI account is suspended. Update your KYC immediately at http://sbi-secure-login.co.in or call +918888123456",
    },
    {
      label: "🔗 HDFC Phishing",
      type: "url",
      text: "http://hdfc-kyc-update.net",
    },
    {
      label: "📞 Police Threat",
      type: "phone",
      text: "+917777654321",
    },
    {
      label: "🎁 Paytm Cashback",
      type: "url",
      text: "http://paytm-cashback-win.com",
    },
  ];

  const runCheck = async (checkType, checkContent) => {
    const textToAnalyze = (checkContent !== undefined ? checkContent : content).trim();
    if (!textToAnalyze) {
      setError("Please enter or paste suspicious content to analyze.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.check.analyze({ type: checkType || type, content: textToAnalyze });
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
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {[
              { id: "message", label: "Message / SMS", icon: MessageSquare },
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
                    background: active ? "rgba(117, 103, 248, 0.15)" : "#0E1428",
                    color: active ? "#FFFFFF" : "var(--text-secondary)",
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

          <form onSubmit={handleSubmit}>
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
              />
            </div>

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
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--surface-border)",
                    color: "var(--text-secondary)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  {s.label}
                </button>
              ))}
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
                  marginBottom: 14,
                }}
              >
                <AlertTriangle size={15} />
                <span>{error}</span>
              </div>
            )}

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
                {result && (
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
                  disabled={loading || !content.trim()}
                  className="btn btn-primary"
                  style={{ minWidth: 140 }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: 14, height: 14 }} />
                      <span>Checking...</span>
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

        {/* ─── Results Section ─── */}
        {result && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* 1. Main Verdict Header */}
            <div
              className="card"
              style={{
                padding: "22px 24px",
                background:
                  result.riskLevel === "HIGH_RISK"
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, #11182B 100%)"
                    : result.riskLevel === "NEEDS_CAUTION"
                    ? "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, #11182B 100%)"
                    : "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, #11182B 100%)",
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
                          ? "rgba(239, 68, 68, 0.2)"
                          : result.riskLevel === "NEEDS_CAUTION"
                          ? "rgba(245, 158, 11, 0.2)"
                          : "rgba(16, 185, 129, 0.2)",
                      color:
                        result.riskLevel === "HIGH_RISK"
                          ? "#EF4444"
                          : result.riskLevel === "NEEDS_CAUTION"
                          ? "#F59E0B"
                          : "#10B981",
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
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", marginBottom: 2 }}>
                      {result.riskLevel === "HIGH_RISK"
                        ? "🚨 High-Risk Scam Detected"
                        : result.riskLevel === "NEEDS_CAUTION"
                        ? "⚠️ Suspicious — Needs Caution"
                        : "✅ Low Threat Signals"}
                    </h2>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                      Risk Score: <strong>{Math.round((result.riskScore || 0) * 100)} / 100</strong> •{" "}
                      {result.evidence?.length || 0} threat pattern(s) identified
                    </div>
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

              {/* View Switcher: Plain English vs Forensic Breakdown */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  background: "#0E1428",
                  padding: 4,
                  borderRadius: "8px",
                  border: "1px solid var(--surface-border)",
                  width: "fit-content",
                }}
              >
                <button
                  type="button"
                  onClick={() => setResultView("simple")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: resultView === "simple" ? "var(--surface-card)" : "transparent",
                    color: resultView === "simple" ? "#FFFFFF" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🛡️ Plain-Language Verdict
                </button>
                <button
                  type="button"
                  onClick={() => setResultView("forensic")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: "none",
                    background: resultView === "forensic" ? "var(--surface-card)" : "transparent",
                    color: resultView === "forensic" ? "#FFFFFF" : "var(--text-secondary)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🔬 Deep Forensic Evidence ({result.evidence?.length || 0})
                </button>
              </div>
            </div>

            {/* Mode A: Plain Language Verdict */}
            {resultView === "simple" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                            background: "#0D1326",
                            borderRadius: "6px",
                          }}
                        >
                          <span style={{ color: "var(--risk-high)", fontWeight: 700 }}>•</span>
                          <div>
                            <strong style={{ color: "#FCA5A5" }}>{ev.value}</strong>: {ev.why}
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

                {/* Do's & Don'ts */}
                <div className="card">
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
                    What you should do right now:
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
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
                          background: "#0D1326",
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
                  <div style={{ fontSize: 12, color: "var(--text-muted)", background: "#0E1428", padding: 12, borderRadius: 6, border: "1px solid var(--surface-border)" }}>
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
