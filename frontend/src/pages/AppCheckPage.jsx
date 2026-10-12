import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  UploadCloud,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Search,
  Sparkles,
  Info,
  Smartphone,
  ChevronRight,
  Trash2,
} from "lucide-react";
import ScanUploadZone from "../components/ScanUploadZone";
import ScanProgressFeedback from "../components/ScanProgressFeedback";
import { ProfileResultSkeleton } from "../components/ScanSkeleton";

export default function AppCheckPage() {
  const [store, setStore] = useState("Google Play");
  const [name, setName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [publisher, setPublisher] = useState("");
  const [appId, setAppId] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-detect store and package id when URL pasted
  const handleStoreUrlChange = (e) => {
    const val = e.target.value;
    setStoreUrl(val);

    if (val.trim()) {
      try {
        const clean = /^https?:\/\//i.test(val.trim()) ? val.trim() : `https://${val.trim()}`;
        const parsed = new URL(clean);
        const host = parsed.hostname.toLowerCase();

        if (host.includes("play.google.com")) {
          setStore("Google Play");
          const pkg = parsed.searchParams.get("id");
          if (pkg && !appId) setAppId(pkg);
        } else if (host.includes("apps.apple.com")) {
          setStore("Apple App Store");
          const match = parsed.pathname.match(/id(\d+)/i);
          if (match && !appId) setAppId(`id${match[1]}`);
        }
      } catch (_) {}
    }
  };

  // Icon upload with Perceptual Hash
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds maximum limit of 10MB.");
      return;
    }

    setImageFile(file);
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setError(null);

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.brand.uploadImage(formData);
      if (res && res.hash) {
        setImageHash(res.hash);
      }
    } catch (err) {
      console.warn("Could not compute icon hash:", err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageHash(null);
  };

  // Quick preset test samples
  const sampleScenarios = [
    {
      title: "🚨 Fake Tata Digital Loan App",
      desc: "Impersonator using brand name with unauthorized developer",
      store: "Google Play",
      name: "Tata Digital Instant Loan Pro",
      publisher: "QuickCash Finance Studio",
      appId: "com.tatadigital.instantloan.pro",
      description: "Get instant personal loans up to Rs 5 Lakh in 5 minutes with zero documents. Advance processing fee applies.",
      storeUrl: "https://play.google.com/store/apps/details?id=com.tatadigital.instantloan.pro",
    },
    {
      title: "🛡️ Official Tata Neu Superapp",
      desc: "Legitimate verified brand application",
      store: "Google Play",
      name: "Tata Neu — Rewards & Shopping",
      publisher: "Tata Digital Private Limited",
      appId: "com.tatadigital.tcp",
      description: "Welcome to Tata Neu: reward points on UPI payments, flights, grocery, electronics, and hotels.",
      storeUrl: "https://play.google.com/store/apps/details?id=com.tatadigital.tcp",
    },
    {
      title: "⚠️ Unverified Utility App",
      desc: "Independent app with no brand registry reference",
      store: "Google Play",
      name: "Smart Calculator & Expense Tracker",
      publisher: "Sunrise Dev Lab",
      appId: "com.sunrise.calc.smart",
      description: "Simple offline calculator with currency exchange converter.",
      storeUrl: "https://play.google.com/store/apps/details?id=com.sunrise.calc.smart",
    },
  ];

  const handleApplySample = (sample) => {
    setStore(sample.store);
    setName(sample.name);
    setPublisher(sample.publisher);
    setAppId(sample.appId);
    setDescription(sample.description);
    setStoreUrl(sample.storeUrl);
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const cleanName = name.trim();
    const cleanAppId = appId.trim();
    const cleanUrl = storeUrl.trim();

    if (!cleanName && !cleanAppId && !cleanUrl) {
      setError("Please provide an app name or app store link to check.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        candidate: {
          store,
          name: cleanName || cleanAppId,
          publisher: publisher.trim() || undefined,
          appId: cleanAppId || undefined,
          storeUrl: cleanUrl || undefined,
          description: description.trim() || undefined,
          iconHash: imageHash || undefined,
        },
      };

      const res = await api.brand.analyzeApp(payload);
      if (res && res.success) {
        setResult(res);
      } else {
        setError(res?.message || "Analysis could not be completed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to app monitoring service.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setStoreUrl("");
    setPublisher("");
    setAppId("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setImageHash(null);
    setResult(null);
    setError(null);
  };

  const renderRiskHeader = (label) => {
    if (label === "High Risk") {
      return {
        bg: "rgba(239, 68, 68, 0.12)",
        border: "1px solid rgba(239, 68, 68, 0.4)",
        color: "#EF4444",
        icon: <ShieldAlert size={28} />,
      };
    }
    if (label === "Needs a Closer Look") {
      return {
        bg: "rgba(245, 158, 11, 0.12)",
        border: "1px solid rgba(245, 158, 11, 0.4)",
        color: "#F59E0B",
        icon: <AlertTriangle size={28} />,
      };
    }
    return {
      bg: "rgba(16, 185, 129, 0.12)",
      border: "1px solid rgba(16, 185, 129, 0.4)",
      color: "#10B981",
      icon: <ShieldCheck size={28} />,
    };
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "36px 20px 80px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/brand-monitor" style={{ color: "var(--text-secondary)" }}>Brand Monitoring</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>Mobile App Checker</span>
        </div>

        {/* ─── Hero Header ─── */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#6EE7B7",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            <Smartphone size={14} style={{ color: "var(--risk-low)" }} />
            App Store Risk Protection
          </div>

          <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>
            Check a Mobile App
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Check an app for warning signs such as misleading names, suspicious publishers, and possible brand impersonation.
            No brand registration required.
          </p>
        </div>

        {/* ─── 1-Click Interactive Test Scenarios ─── */}
        {!result && (
          <div
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-lg)",
              padding: "16px 20px",
              marginBottom: 28,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Try a Quick Example Scenario:
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
              {sampleScenarios.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(s)}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--surface-border)")}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── Form Section ─── */}
        {!result ? (
          <div
            className="card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-xl)",
              padding: "32px 28px",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Store Selector */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                  App Store
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Google Play", "Apple App Store", "Third-Party Store"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStore(s)}
                      style={{
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: "var(--radius-md)",
                        border: store === s ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                        background: store === s ? "rgba(117, 103, 248, 0.18)" : "var(--surface-elevated)",
                        color: store === s ? "#FFFFFF" : "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "var(--transition-fast)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* App Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  App Name <span style={{ color: "var(--risk-high)" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tata Neu Instant Loan Pro or SBI Mobile Banking"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Store URL */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    App Store or Google Play URL
                  </label>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. https://play.google.com/store/apps/details?id=com.tatadigital.tcp"
                  value={storeUrl}
                  onChange={handleStoreUrlChange}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                  }}
                />
              </div>

              {/* Developer / Publisher Name & Package ID Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                      Developer / Publisher
                    </label>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Tata Digital Pvt Ltd or Dev Studio"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="input"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                      Package ID / Store ID
                    </label>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. com.tatadigital.tcp or id159841234"
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    className="input"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              {/* App Description (Optional) */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    App Description or Claims
                  </label>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Paste store description claims (e.g. 'Instant loan in 5 mins without verification, upfront processing charge...')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* App Icon or Screenshot (Optional) */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    App Icon or Screenshot
                  </label>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                </div>

                {imagePreview ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: 14,
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Icon preview"
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "var(--radius-md)" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {imageFile?.name || "Uploaded Icon"}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {uploadingImage ? "Computing perceptual visual hash..." : imageHash ? "Visual fingerprint generated" : "Ready for analysis"}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{
                        background: "rgba(239, 68, 68, 0.12)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#EF4444",
                        padding: "8px 12px",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                ) : (
                  <ScanUploadZone
                    isScanning={loading}
                    imagePreview={imagePreview}
                    fileName={imageFile?.name}
                    onFileSelect={handleImageSelect}
                    onClear={handleRemoveImage}
                    accept="image/jpeg,image/png,image/webp"
                    label="Upload app icon or store screenshot"
                    sublabel="JPEG, PNG, or WebP up to 10MB"
                    badgeText="ANALYZING APP STORE ASSET"
                    previewMaxHeight={130}
                  />
                )}
              </div>

              {/* Progress Feedback / Cold Start / Timeout Retry */}
              <ScanProgressFeedback
                isScanning={loading}
                error={error}
                onRetry={() => handleSubmit()}
                scanType="app"
              />

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "var(--accent)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: "0 4px 14px var(--accent-glow)",
                  opacity: loading ? 0.75 : 1,
                  transition: "var(--transition-fast)",
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Scanning App Store Asset...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Check Mobile App</span>
                  </>
                )}
              </button>
            </form>

            {/* Skeleton Loading State */}
            {loading && (
              <div style={{ marginTop: 24 }}>
                <ProfileResultSkeleton />
              </div>
            )}
          </div>
        ) : (
          /* ─── Result Screen ─── */
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Risk Header Banner */}
            {(() => {
              const headerMeta = renderRiskHeader(result.riskLabel);
              return (
                <div
                  style={{
                    background: headerMeta.bg,
                    border: headerMeta.border,
                    borderRadius: "var(--radius-xl)",
                    padding: "28px 24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                    <div style={{ color: headerMeta.color }}>{headerMeta.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: headerMeta.color }}>
                        Risk Assessment
                      </div>
                      <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>
                        {result.riskLabel}
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.6, marginTop: 4 }}>
                    {result.explanation}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
                    <div
                      style={{
                        padding: "6px 12px",
                        background: "rgba(0,0,0,0.2)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      App Name: <strong style={{ color: "#FFF" }}>{result.candidate?.name}</strong>
                    </div>
                    {result.candidate?.publisher && (
                      <div
                        style={{
                          padding: "6px 12px",
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 12,
                          color: "var(--text-secondary)",
                        }}
                      >
                        Publisher: <strong style={{ color: "#FFF" }}>{result.candidate?.publisher}</strong>
                      </div>
                    )}
                    <div
                      style={{
                        padding: "6px 12px",
                        background: "rgba(0,0,0,0.2)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      Brand Status:{" "}
                      <strong style={{ color: result.brandStatus === "VERIFIED_OFFICIAL" ? "#10B981" : result.brandStatus === "BRAND_NOT_VERIFIED" ? "#F59E0B" : "#A5B4FC" }}>
                        {result.brandStatus === "VERIFIED_OFFICIAL"
                          ? `Official ${result.brand?.name}`
                          : result.brandStatus === "BRAND_NOT_VERIFIED"
                          ? "Brand Identity Not Verified"
                          : `Recognized (${result.brand?.name})`}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Logo Authenticity Cross-Link Banner */}
            <div
              style={{
                background: "rgba(117, 103, 248, 0.08)",
                border: "1px solid rgba(117, 103, 248, 0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    background: "rgba(117, 103, 248, 0.2)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                    Verify App Icon & Brand Logo Authenticity
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    Compare this mobile app's icon side-by-side against verified official app assets and brand catalog.
                  </div>
                </div>
              </div>
              <Link
                to="/logo-check"
                state={{
                  initialBrand: result.brand?.name || "",
                  initialAppName: result.candidate?.name || name,
                  initialUrl: storeUrl,
                  initialImage: imagePreview,
                }}
                style={{
                  padding: "8px 16px",
                  background: "var(--accent)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>Verify in Logo Checker</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Warning Signs & Evidence (if any) */}
            {result.warningSigns && result.warningSigns.length > 0 && (
              <div
                className="card"
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <AlertTriangle size={18} style={{ color: "#F59E0B" }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Specific Warning Signs Detected</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.warningSigns.map((w, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 14px",
                        background: "rgba(245, 158, 11, 0.08)",
                        border: "1px solid rgba(245, 158, 11, 0.25)",
                        borderRadius: "var(--radius-md)",
                        fontSize: 14,
                        color: "#FDE68A",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <XCircle size={16} style={{ color: "#F59E0B", marginTop: 2, flexShrink: 0 }} />
                      <div>{w}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Three-Column Transparent Breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {/* Verified Facts */}
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <CheckCircle2 size={16} style={{ color: "#10B981" }} />
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Verified Facts</h4>
                </div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {result.verifiedFacts && result.verifiedFacts.length > 0 ? (
                    result.verifiedFacts.map((fact, idx) => <li key={idx} style={{ marginBottom: 6 }}>{fact}</li>)
                  ) : (
                    <li>No official brand registry reference could be verified for this application.</li>
                  )}
                </ul>
              </div>

              {/* User-Submitted Information */}
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Info size={16} style={{ color: "var(--accent)" }} />
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>User-Submitted Information</h4>
                </div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {result.userSubmittedInfo && result.userSubmittedInfo.length > 0 ? (
                    result.userSubmittedInfo.map((info, idx) => <li key={idx} style={{ marginBottom: 6 }}>{info}</li>)
                  ) : (
                    <li>Submitted app details logged.</li>
                  )}
                </ul>
              </div>

              {/* Automated Findings */}
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Search size={16} style={{ color: "#60A5FA" }} />
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Automated Findings</h4>
                </div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {result.automatedFindings && result.automatedFindings.length > 0 ? (
                    result.automatedFindings.map((finding, idx) => <li key={idx} style={{ marginBottom: 6 }}>{finding}</li>)
                  ) : (
                    <li>No automated heuristic anomalies detected.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Checks Not Completed (Disclosures) */}
            {result.uncompletedChecks && result.uncompletedChecks.length > 0 && (
              <div
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <Info size={16} style={{ color: "var(--text-muted)" }} />
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Checks That Could Not Be Completed
                  </h4>
                </div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {result.uncompletedChecks.map((uc, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>{uc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practical Next Steps */}
            <div
              className="card"
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
                Practical Next Steps
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.nextSteps &&
                  result.nextSteps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 14,
                        color: "var(--text-primary)",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "var(--accent-subtle)",
                          color: "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div style={{ lineHeight: 1.5 }}>{step}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Safety Caveat */}
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--text-muted)",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              <strong>Important Safety Notice:</strong> A low risk score is never proof that an application is 100% safe.
              Malicious apps can side-load payloads after installation. Always verify links through the brand's verified domain.
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 8 }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "12px 24px",
                  background: "var(--accent)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <RefreshCw size={16} />
                Check Another App
              </button>
              <Link
                to="/logo-check"
                state={{
                  initialBrand: result.brand?.name || "",
                  initialAppName: result.candidate?.name || name,
                  initialUrl: storeUrl,
                  initialImage: imagePreview,
                }}
                style={{
                  padding: "12px 24px",
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Sparkles size={16} style={{ color: "var(--accent)" }} />
                Check App Icon / Logo
              </Link>
              <Link
                to="/social-check"
                style={{
                  padding: "12px 24px",
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Check a Social Account
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/report"
                state={{
                  initialType: "app",
                  initialContent: `App "${result.candidate?.name}" (${result.candidate?.publisher || "Unknown pub"}): ${result.explanation}`,
                  initialPlatform: result.candidate?.store || "Mobile App Store",
                }}
                style={{
                  padding: "12px 24px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "var(--radius-md)",
                  color: "#FCA5A5",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ShieldAlert size={16} />
                Report This App
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
