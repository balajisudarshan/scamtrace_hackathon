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
  Image as ImageIcon,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Search,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  Trash2,
} from "lucide-react";
import ScanUploadZone from "../components/ScanUploadZone";
import ScanProgressFeedback from "../components/ScanProgressFeedback";
import { ProfileResultSkeleton } from "../components/ScanSkeleton";

export default function SocialCheckPage() {
  const [platform, setPlatform] = useState("X");
  const [profileUrl, setProfileUrl] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Auto-detect handle and platform when user pastes URL
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setProfileUrl(val);

    if (val.trim()) {
      try {
        const clean = /^https?:\/\//i.test(val.trim()) ? val.trim() : `https://${val.trim()}`;
        const parsed = new URL(clean);
        const host = parsed.hostname.toLowerCase();

        if (host.includes("instagram.com")) setPlatform("Instagram");
        else if (host.includes("twitter.com") || host.includes("x.com")) setPlatform("X");
        else if (host.includes("facebook.com") || host.includes("fb.com")) setPlatform("Facebook");
        else if (host.includes("linkedin.com")) setPlatform("LinkedIn");
        else if (host.includes("youtube.com") || host.includes("youtu.be")) setPlatform("YouTube");

        const pathParts = parsed.pathname.split("/").filter(Boolean);
        if (pathParts.length > 0 && !handle) {
          const rawHandle = pathParts[0].replace(/^@/, "");
          if (rawHandle && rawHandle !== "in" && rawHandle !== "company") {
            setHandle(rawHandle);
          } else if (pathParts[1]) {
            setHandle(pathParts[1].replace(/^@/, ""));
          }
        }
      } catch (_) {}
    }
  };

  // Image Upload with Perceptual Hash
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

    // Compute perceptual hash via backend
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.brand.uploadImage(formData);
      if (res && res.hash) {
        setImageHash(res.hash);
      }
    } catch (err) {
      console.warn("Could not compute logo hash:", err.message);
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
      title: "🚨 Fake SBI Helpdesk",
      desc: "Impersonator using brand name and phishing link",
      platform: "X",
      url: "https://x.com/sbi_support_care",
      handle: "sbi_support_care",
      bio: "Official SBI Customer Care 24/7 support. Send DM for KYC update & reactivation: http://bit.ly/sbi-kyc-verify",
    },
    {
      title: "🛡️ Official State Bank of India",
      desc: "Legitimate verified brand handle",
      platform: "X",
      url: "https://x.com/TheOfficialSBI",
      handle: "TheOfficialSBI",
      bio: "The official Twitter handle of the State Bank of India. The largest commercial bank in India.",
    },
    {
      title: "⚠️ Unverified Indie Handle",
      desc: "General account without brand reference",
      platform: "Instagram",
      url: "https://instagram.com/craft_studio_creations",
      handle: "craft_studio_creations",
      bio: "Handmade ceramic pottery and studio decor. Contact via direct message for custom orders.",
    },
  ];

  const handleApplySample = (sample) => {
    setPlatform(sample.platform);
    setProfileUrl(sample.url);
    setHandle(sample.handle);
    setBio(sample.bio);
    setError(null);
    setResult(null);
  };

  // Run Check
  const handleSubmit = async (e) => {
    e?.preventDefault();
    const cleanHandle = handle.trim().replace(/^@/, "");
    const cleanUrl = profileUrl.trim();

    if (!cleanHandle && !cleanUrl) {
      setError("Please provide a social media profile URL or username to check.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        candidate: {
          platform,
          url: cleanUrl || undefined,
          handle: cleanHandle || undefined,
          displayName: cleanHandle || undefined,
          bio: bio.trim() || undefined,
          logoHash: imageHash || undefined,
        },
      };

      const res = await api.brand.analyzeSocial(payload);
      if (res && res.success) {
        setResult(res);
      } else {
        setError(res?.message || "Analysis could not be completed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to monitoring service.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfileUrl("");
    setHandle("");
    setBio("");
    setImageFile(null);
    setImagePreview(null);
    setImageHash(null);
    setResult(null);
    setError(null);
  };

  // Badge helper for the 3 exact result categories
  const renderRiskHeader = (label) => {
    if (label === "High Risk") {
      return {
        bg: "var(--risk-high-bg)",
        border: "1px solid var(--risk-high-border)",
        color: "var(--risk-high)",
        icon: <ShieldAlert size={28} />,
        headline: "High Risk Detected",
      };
    }
    if (label === "Needs a Closer Look") {
      return {
        bg: "var(--risk-caution-bg)",
        border: "1px solid var(--risk-caution-border)",
        color: "var(--risk-caution)",
        icon: <AlertTriangle size={28} />,
        headline: "Needs a Closer Look",
      };
    }
    return {
      bg: "var(--risk-low-bg)",
      border: "1px solid var(--risk-low-border)",
      color: "var(--risk-low)",
      icon: <ShieldCheck size={28} />,
      headline: "No Major Warning Signs Found",
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
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>Social Account Checker</span>
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
              background: "rgba(117, 103, 248, 0.12)",
              border: "1px solid rgba(117, 103, 248, 0.25)",
              color: "var(--accent)",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            Social Media Brand Protection
          </div>

          <h1 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 10 }}>
            Check a Social Media Account
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
            Find out whether a social media account shows signs of impersonation or suspicious activity.
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
              {/* Platform Selector */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                  Platform
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Instagram", "Facebook", "X", "LinkedIn", "YouTube", "Other"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      style={{
                        padding: "8px 16px",
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: "var(--radius-md)",
                        border: platform === p ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                        background: platform === p ? "rgba(117, 103, 248, 0.18)" : "var(--surface-elevated)",
                        color: platform === p ? "var(--accent)" : "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "var(--transition-fast)",
                      }}
                    >
                      {p === "X" ? "X (Twitter)" : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Profile URL */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  Profile URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://x.com/sbi_customer_help or https://instagram.com/tatadigital_support"
                  value={profileUrl}
                  onChange={handleUrlChange}
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
                <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, display: "block" }}>
                  Paste the full link from your browser or social app.
                </span>
              </div>

              {/* Username / Account Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  Account Username or Name <span style={{ color: "var(--risk-high)" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. sbi_support_care or @tatadigital_help"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
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
                <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, display: "block" }}>
                  Required if profile URL is not provided.
                </span>
              </div>

              {/* Bio or Suspicious Message (Optional) */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    Account Bio or Suspicious Message
                  </label>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Optional</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Paste the profile bio, direct message, or comment sent to you (e.g. 'For refund and KYC validation click bit.ly/kyc...')"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
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

              {/* Profile Screenshot or Logo (Optional) */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    Profile Screenshot or Image
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
                      alt="Profile preview"
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "var(--radius-md)" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                        {imageFile?.name || "Uploaded Image"}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {uploadingImage ? "Computing perceptual visual hash..." : imageHash ? "Visual fingerprint generated" : "Ready for analysis"}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={{
                        background: "var(--risk-high-bg)",
                        border: "1px solid var(--risk-high-border)",
                        color: "var(--risk-high)",
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
                    label="Upload profile picture or screenshot"
                    sublabel="JPEG, PNG, or WebP up to 10MB"
                    badgeText="ANALYZING SOCIAL ASSET"
                    previewMaxHeight={130}
                  />
                )}
              </div>

              {/* Progress Feedback / Cold Start / Timeout Retry */}
              <ScanProgressFeedback
                isScanning={loading}
                error={error}
                onRetry={() => handleSubmit()}
                scanType="profile"
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
                    <span>Analyzing Profile & Evidence...</span>
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Check Social Account</span>
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
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--surface-border)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      Target Account: <strong style={{ color: "var(--text-primary)" }}>@{result.candidate?.handle}</strong>
                    </div>
                    <div
                      style={{
                        padding: "6px 12px",
                        background: "var(--bg-subtle)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--surface-border)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      Brand Status:{" "}
                      <strong style={{ color: result.brandStatus === "VERIFIED_OFFICIAL" ? "var(--risk-low)" : result.brandStatus === "BRAND_NOT_VERIFIED" ? "var(--risk-caution)" : "var(--accent)" }}>
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
                background: "var(--accent-subtle)",
                border: "1px solid var(--accent-glow)",
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
                    background: "var(--accent-glow)",
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
                    Check Logo & Profile Avatar Authenticity
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    Compare this profile's logo or icon side-by-side against verified official brand catalog assets.
                  </div>
                </div>
              </div>
              <Link
                to="/logo-check"
                state={{
                  initialBrand: result.brand?.name || "",
                  initialHandle: result.candidate?.handle || handle,
                  initialUrl: profileUrl,
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
                  <AlertTriangle size={18} style={{ color: "var(--risk-caution)" }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Specific Warning Signs Detected</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.warningSigns.map((w, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 14px",
                        background: "var(--risk-caution-bg)",
                        border: "1px solid var(--risk-caution-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <XCircle size={16} style={{ color: "var(--risk-caution)", marginTop: 2, flexShrink: 0 }} />
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
                  <CheckCircle2 size={16} style={{ color: "var(--risk-low)" }} />
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Verified Facts</h4>
                </div>
                <ul style={{ paddingLeft: 18, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {result.verifiedFacts && result.verifiedFacts.length > 0 ? (
                    result.verifiedFacts.map((fact, idx) => <li key={idx} style={{ marginBottom: 6 }}>{fact}</li>)
                  ) : (
                    <li>No official brand registry reference could be verified for this candidate.</li>
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
                    <li>Submitted information logged.</li>
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
                  <Search size={16} style={{ color: "var(--accent)" }} />
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
              <strong>Important Safety Notice:</strong> A low risk score is never a guarantee that an account is 100% genuine.
              Scammers continually modify tactics. Never share bank OTPs, passwords, or personal credentials through social media messages.
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
                Check Another Account
              </button>
              <Link
                to="/logo-check"
                state={{
                  initialBrand: result.brand?.name || "",
                  initialHandle: result.candidate?.handle || handle,
                  initialUrl: profileUrl,
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
                Check a Logo
              </Link>
              <Link
                to="/app-check"
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
                Check a Mobile App
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/report"
                state={{
                  initialType: "social",
                  initialContent: `@${result.candidate?.handle} (${result.candidate?.platform}): ${result.explanation}`,
                  initialPlatform: result.candidate?.platform || "Social Media",
                }}
                style={{
                  padding: "12px 24px",
                  background: "var(--risk-high-bg)",
                  border: "1px solid var(--risk-high-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--risk-high)",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ShieldAlert size={16} />
                Report This Account
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
