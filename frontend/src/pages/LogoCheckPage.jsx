import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import Navbar, { Footer } from "../components/Navbar";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  UploadCloud,
  Search,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Info,
  Sparkles,
  Layers,
  FileText,
  Eye,
  RefreshCw,
  PlusCircle,
  Smartphone,
  AtSign,
  Globe,
  Tag,
  Lock,
} from "lucide-react";
import ScanUploadZone from "../components/ScanUploadZone";
import ScanProgressFeedback from "../components/ScanProgressFeedback";
import { LogoResultSkeleton } from "../components/ScanSkeleton";

export default function LogoCheckPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Inputs
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(location.state?.initialImage || null);
  const [brandName, setBrandName] = useState(location.state?.initialBrand || "");
  const [targetUrl, setTargetUrl] = useState(location.state?.initialUrl || "");
  const [handle, setHandle] = useState(location.state?.initialHandle || "");
  const [appName, setAppName] = useState(location.state?.initialAppName || "");
  const [candidateUrl, setCandidateUrl] = useState(location.state?.initialCandidateUrl || null);

  // States
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  // Fetch test scenarios / presets on mount
  useEffect(() => {
    let isMounted = true;
    api.brand.getLogoPresets()
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.presets)) {
          setPresets(res.presets);
        }
      })
      .catch((err) => {
        console.warn("Could not load logo presets:", err.message);
      });
    return () => { isMounted = false; };
  }, []);

  // Auto-run if location.state gave an initial image/brand
  useEffect(() => {
    if (location.state?.autoCheck && (location.state.initialCandidateUrl || location.state.initialImage)) {
      handleRunCheck(null, location.state.initialCandidateUrl);
    }
  }, []);

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(file.type)) {
      setError("Please upload a valid image file (PNG, JPG, WebP, or SVG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image file exceeds the 10MB size limit.");
      return;
    }

    setError(null);
    setImageFile(file);
    setCandidateUrl(null);
    setSelectedPresetId(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = async (preset) => {
    setSelectedPresetId(preset.id);
    setImageFile(null);
    setImagePreview(preset.imageUrl);
    setCandidateUrl(preset.imageUrl);
    setBrandName(preset.claimedBrand || "");
    setTargetUrl(preset.accountUrl || "");
    setError(null);
    setResult(null);

    // Auto-run comparison with preset fixture
    setAnalyzing(true);
    try {
      const res = await api.brand.checkLogo({
        testScenario: preset.id,
        brandName: preset.claimedBrand,
        url: preset.accountUrl,
      });
      if (res.success) {
        setResult(res);
      } else {
        setError(res.message || "Failed to compare logo.");
      }
    } catch (err) {
      setError(err.message || "Network error while checking logo.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setCandidateUrl(null);
    setSelectedPresetId(null);
    setBrandName("");
    setTargetUrl("");
    setHandle("");
    setAppName("");
    setResult(null);
    setError(null);
  };

  const handleRunCheck = async (e, directCandidateUrl) => {
    if (e) e.preventDefault();

    if (!imageFile && !imagePreview && !candidateUrl && !directCandidateUrl) {
      setError("Please select or drop a logo image to compare.");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      let res;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        if (brandName.trim()) formData.append("brandName", brandName.trim());
        if (targetUrl.trim()) formData.append("url", targetUrl.trim());
        if (handle.trim()) formData.append("handle", handle.trim());
        if (appName.trim()) formData.append("appName", appName.trim());
        res = await api.brand.checkLogo(formData);
      } else {
        res = await api.brand.checkLogo({
          candidateUrl: directCandidateUrl || candidateUrl || imagePreview,
          brandName: brandName.trim(),
          url: targetUrl.trim(),
          handle: handle.trim(),
          appName: appName.trim(),
          testScenario: selectedPresetId,
        });
      }

      if (res && res.success) {
        setResult(res);
      } else {
        setError(res?.message || "Logo comparison could not be completed.");
      }
    } catch (err) {
      setError(err.message || "Failed to reach logo analysis engine.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleForwardToReport = () => {
    navigate("/report", {
      state: {
        initialType: "image",
        initialContent: result?.ocrText || `Suspicious logo claimed as ${brandName || result?.identifiedBrand?.name || "brand"}`,
        initialPlatform: targetUrl?.includes("play.google") ? "App Store" : "Social Media",
        initialNotes: `Logo check result: ${result?.conclusionTitle} (${result?.similarityScore}% similarity). Differences: ${result?.differences?.map(d => d.title).join(", ")}`,
      },
    });
  };

  // Helper for conclusion styling
  const getConclusionBadge = (conclusion) => {
    switch (conclusion) {
      case "LIKELY_VISUAL_MATCH":
        return {
          bg: "var(--risk-low-bg)",
          border: "var(--risk-low-border)",
          color: "var(--risk-low)",
          icon: ShieldCheck,
          label: "Likely Visual Match",
          badgeClass: "badge-low",
        };
      case "DIFFERENCES_DETECTED":
        return {
          bg: "var(--risk-high-bg)",
          border: "var(--risk-high-border)",
          color: "var(--risk-high)",
          icon: ShieldAlert,
          label: "Differences Detected",
          badgeClass: "badge-high",
        };
      case "INSUFFICIENT_EVIDENCE":
        return {
          bg: "var(--risk-caution-bg)",
          border: "var(--risk-caution-border)",
          color: "var(--risk-caution)",
          icon: AlertTriangle,
          label: "Insufficient Evidence",
          badgeClass: "badge-caution",
        };
      case "UNABLE_TO_VERIFY":
      default:
        return {
          bg: "var(--bg-subtle)",
          border: "var(--surface-border)",
          color: "var(--text-secondary)",
          icon: HelpCircle,
          label: "Unable to Verify",
          badgeClass: "badge-neutral",
        };
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: 1040, margin: "0 auto", width: "100%" }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
              marginBottom: 14,
            }}
          >
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            AI & Forensic Brand Protection
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
              lineHeight: 1.15,
            }}
          >
            Check a Logo
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
            Upload any profile avatar, app store icon, or suspicious logo. SCAMTRACE finds the verified original asset and compares visual differences side-by-side.
          </p>
        </div>

        {/* ── 1-Click Test Scenarios (Reviewers & Judges) ── */}
        {presets.length > 0 && (
          <div
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-lg)",
              padding: "16px 20px",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                ⚡ 1-Click Verification Scenarios:
              </div>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                Click any preset to test character substitution, modified palettes, or authentic matches
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
              {presets.map((p) => {
                const active = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      background: active ? "rgba(117, 103, 248, 0.16)" : "var(--surface-elevated)",
                      border: active ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "10px 12px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        style={{ width: 24, height: 24, borderRadius: 4, objectFit: "contain", background: "var(--bg-subtle)" }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: active ? "var(--accent)" : "var(--text-primary)" }}>
                        {p.title}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      {p.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Main Input Card ── */}
        <div
          className="card"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border-strong)",
            borderRadius: "var(--radius-xl)",
            padding: "28px 24px",
            marginBottom: 32,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          <form onSubmit={handleRunCheck}>
            {/* Image Upload Dropzone with Animated Border */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                Upload Suspicious Logo or Icon <span style={{ color: "var(--risk-high)" }}>*</span>
              </label>

              <ScanUploadZone
                isScanning={analyzing}
                imagePreview={imagePreview}
                fileName={imageFile?.name || (candidateUrl ? "Preset Logo Asset" : null)}
                onFileSelect={handleFileSelect}
                onClear={handleClear}
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                label="Drop logo image here or click to browse"
                sublabel="Supports PNG, JPG, WebP, SVG up to 10MB (profile photos, app icons, website header logos)"
                badgeText="VERIFYING LOGO AUTHENTICITY"
                previewMaxHeight={150}
              />
            </div>

            {/* Optional Context Inputs (2 Columns) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  Claimed Brand Name <span style={{ fontSize: 11, color: "var(--text-muted)" }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. SBI, Tata Digital, HDFC Bank, Netflix"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 13,
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  Profile, Website, or App URL <span style={{ fontSize: 11, color: "var(--text-muted)" }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://x.com/sbi_support or sbi-kyc.co.in"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 13,
                  }}
                />
              </div>
            </div>

            {/* Progress Feedback / Cold Start / Timeout Retry */}
            <ScanProgressFeedback
              isScanning={analyzing}
              error={error}
              onRetry={() => handleRunCheck()}
              scanType="logo"
            />

            {/* Action Buttons */}
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
                <span>Privacy Safe: Uploaded logo files are analyzed in-memory and not stored permanently.</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {(imagePreview || result) && !analyzing && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="btn btn-outline btn-sm"
                  >
                    Clear
                  </button>
                )}

                <button
                  type="submit"
                  disabled={analyzing || (!imageFile && !imagePreview && !candidateUrl)}
                  className="btn btn-primary"
                  style={{ padding: "10px 24px", minWidth: 210 }}
                >
                  {analyzing ? (
                    <>
                      <div className="spinner" style={{ width: 14, height: 14 }} />
                      <span>Verifying Authenticity...</span>
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      <span>Find Original & Compare</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ─── SKELETON LOADING VIEW ─── */}
        {analyzing && (
          <div style={{ marginBottom: 40 }}>
            <LogoResultSkeleton />
          </div>
        )}

        {/* ─── RESULTS VIEW: SIDE-BY-SIDE LOGO COMPARISON ─── */}
        {!analyzing && result && (
          <div className="fade-in" style={{ marginBottom: 40 }}>
            {(() => {
              const badge = getConclusionBadge(result.conclusion);
              const BadgeIcon = badge.icon;

              return (
                <div
                  className="card"
                  style={{
                    background: "var(--surface-elevated)",
                    border: `1px solid ${badge.border}`,
                    borderRadius: "var(--radius-xl)",
                    padding: 28,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Verdict Top Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 14,
                      marginBottom: 24,
                      paddingBottom: 20,
                      borderBottom: "1px solid var(--surface-border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "12px",
                          background: badge.bg,
                          color: badge.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <BadgeIcon size={26} />
                      </div>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>
                          {result.conclusionTitle}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                          {result.identifiedBrand?.name
                            ? `Claimed / Matched Brand: ${result.identifiedBrand.fullName || result.identifiedBrand.name}`
                            : "No authoritative brand recognized"}
                          {typeof result.similarityScore === "number" && (
                            <span> • Similarity Score: <strong style={{ color: badge.color }}>{result.similarityScore}%</strong></span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        background: badge.bg,
                        border: `1px solid ${badge.border}`,
                        color: badge.color,
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {badge.label}
                    </div>
                  </div>

                  {/* ── Visual Comparison Side-By-Side ── */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: 20,
                      marginBottom: 28,
                    }}
                  >
                    {/* Left: Uploaded Image */}
                    <div
                      style={{
                        background: "var(--surface-card)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
                        Uploaded Candidate Logo:
                      </div>

                      <div
                        style={{
                          width: 160,
                          height: 160,
                          background: "var(--bg-subtle)",
                          border: "1px solid var(--surface-border)",
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 12,
                          marginBottom: 14,
                        }}
                      >
                        <img
                          src={result.uploadedImagePreview || imagePreview}
                          alt="Uploaded Candidate"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: 6,
                          }}
                        />
                      </div>

                      <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        Resolution: <strong>{result.uploadedMeta?.width}x{result.uploadedMeta?.height} px</strong>
                        {result.uploadedMeta?.dominantColor && (
                          <span> • Color: <span style={{ fontFamily: "monospace", color: "var(--accent)" }}>{result.uploadedMeta.dominantColor}</span></span>
                        )}
                      </div>
                    </div>

                    {/* Right: Retrieved Official Reference Logo */}
                    <div
                      style={{
                        background: result.referenceLogo ? "var(--surface-card)" : "var(--bg-subtle)",
                        border: result.referenceLogo ? "1px solid var(--risk-low-border)" : "1px dashed var(--surface-border)",
                        borderRadius: "var(--radius-lg)",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--risk-low)", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle2 size={14} />
                        <span>Authoritative Reference Logo:</span>
                      </div>

                      {result.referenceLogo ? (
                        <>
                          <div
                            style={{
                              width: 160,
                              height: 160,
                              background: "var(--bg-subtle)",
                              border: "1px solid var(--risk-low-border)",
                              borderRadius: 14,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 12,
                              marginBottom: 14,
                            }}
                          >
                            <img
                              src={result.referenceLogo.dataUrl || result.referenceLogo.url}
                              alt="Official Reference Logo"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: 6,
                              }}
                            />
                          </div>

                          <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, maxWidth: 320 }}>
                            <div style={{ color: "var(--text-primary)", fontWeight: 600, marginBottom: 2 }}>
                              Source: {result.referenceLogo.sourceType}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                              Verified Domain: {result.referenceLogo.sourceUrl} • Retrieved: {result.referenceLogo.retrievedAt}
                            </div>
                            {result.searchMetadata?.provider && (
                              <div style={{ fontSize: 10, color: "var(--accent)", marginTop: 4, fontWeight: 500 }}>
                                🔍 Registry: {result.searchMetadata.provider} {result.searchMetadata.fromCache ? "(Cached)" : ""}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            height: 200,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                            padding: "16px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <HelpCircle size={36} style={{ opacity: 0.5, color: result.searchStatus === "SEARCH_PROVIDER_ERROR" ? "var(--risk-caution)" : "inherit" }} />
                          <div style={{ fontSize: 14, fontWeight: 700, color: result.searchStatus === "SEARCH_PROVIDER_ERROR" ? "var(--risk-caution)" : "var(--text-secondary)" }}>
                            {result.conclusionTitle || "Unable to Verify Original Logo"}
                          </div>
                          <div style={{ fontSize: 12, maxWidth: 280, lineHeight: 1.5, color: "var(--text-muted)" }}>
                            {result.plainExplanation || "No authoritative reference asset could be retrieved from verified repositories for this claimed brand."}
                          </div>
                          {result.searchStatus === "SEARCH_PROVIDER_ERROR" && (
                            <span style={{ fontSize: 11, color: "var(--risk-caution)", background: "var(--risk-caution-bg)", padding: "2px 8px", borderRadius: 4 }}>
                              Search Provider Issue
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Documented Score Calculation Breakdown ── */}
                  {result.scoreBreakdown && (
                    <div
                      style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: "var(--radius-md)",
                        padding: "16px",
                        marginBottom: 20,
                      }}
                    >
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
                        📐 Documented Similarity Metrics:
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 10 }}>
                        <div style={{ background: "var(--surface-card)", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--surface-border)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Perceptual dHash Match</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--accent)" }}>{result.scoreBreakdown.hashSimilarity}%</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Hamming dist: {result.scoreBreakdown.hammingDistance}/64</div>
                        </div>

                        <div style={{ background: "var(--surface-card)", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--surface-border)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Color Palette Similarity</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--risk-low)" }}>{result.scoreBreakdown.colorSimilarity}%</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>RGB centroid distance</div>
                        </div>

                        {typeof result.scoreBreakdown.textSimilarity === "number" && (
                          <div style={{ background: "var(--surface-card)", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--surface-border)" }}>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Text & Spelling Match</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--risk-caution)" }}>{result.scoreBreakdown.textSimilarity}%</div>
                            <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Levenshtein alignment</div>
                          </div>
                        )}

                        <div style={{ background: "var(--surface-card)", padding: "10px 12px", borderRadius: 8, border: "1px solid var(--surface-border)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Overall Visual Similarity</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: badge.color }}>{result.similarityScore}%</div>
                          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Weighted synthesis</div>
                        </div>
                      </div>

                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        Calculation formula: {result.scoreBreakdown.formula}
                      </div>
                    </div>
                  )}

                  {/* ── Plain English Explanation & Security Notice ── */}
                  <div
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                      Plain-Language Verdict:
                    </div>
                    <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6, margin: "0 0 12px" }}>
                      {result.plainExplanation}
                    </p>

                    {result.securityNotice && (
                      <div
                        style={{
                          padding: "10px 12px",
                          background: "rgba(59, 130, 246, 0.08)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                          borderRadius: "6px",
                          fontSize: 12,
                          color: "var(--accent)",
                          lineHeight: 1.5,
                        }}
                      >
                        {result.securityNotice}
                      </div>
                    )}
                  </div>

                  {/* ── Detected Differences Breakdown List ── */}
                  {result.differences && result.differences.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
                        🔎 Detailed Findings & Discrepancies ({result.differences.length}):
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {result.differences.map((diff, idx) => {
                          const isHigh = diff.severity === "HIGH";
                          const isMatch = diff.severity === "MATCH";
                          return (
                            <div
                              key={idx}
                              style={{
                                background: isMatch
                                  ? "var(--risk-low-bg)"
                                  : isHigh
                                  ? "var(--risk-high-bg)"
                                  : "var(--surface-card)",
                                border: isMatch
                                  ? "1px solid var(--risk-low-border)"
                                  : isHigh
                                  ? "1px solid var(--risk-high-border)"
                                  : "1px solid var(--surface-border)",
                                borderRadius: "var(--radius-md)",
                                padding: "12px 14px",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <span
                                    style={{
                                      padding: "2px 8px",
                                      borderRadius: 4,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      background: isMatch ? "var(--risk-low-bg)" : isHigh ? "var(--risk-high-bg)" : "var(--surface-card-hover)",
                                      color: isMatch ? "var(--risk-low)" : isHigh ? "var(--risk-high)" : "var(--text-secondary)",
                                    }}
                                  >
                                    {diff.category}
                                  </span>
                                  <strong style={{ fontSize: 13, color: "var(--text-primary)" }}>{diff.title}</strong>
                                </div>
                              </div>
                              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                {diff.explanation}
                              </p>
                              {diff.evidence && (
                                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, fontStyle: "italic" }}>
                                  Evidence: {diff.evidence}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Practical Next Steps ── */}
                  {result.nextSteps && result.nextSteps.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                        Recommended Next Steps:
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7 }}>
                        {result.nextSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── Action Buttons ── */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      paddingTop: 18,
                      borderTop: "1px solid var(--surface-border)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button onClick={handleForwardToReport} className="btn btn-primary btn-sm">
                        <PlusCircle size={14} />
                        <span>Report This Scam Logo</span>
                      </button>

                      <Link to="/social-check" state={{ initialBrand: brandName || result.identifiedBrand?.name }} className="btn btn-secondary btn-sm">
                        <AtSign size={14} />
                        <span>Check Social Profile</span>
                      </Link>

                      <Link to="/app-check" state={{ initialName: brandName || result.identifiedBrand?.name }} className="btn btn-secondary btn-sm">
                        <Smartphone size={14} />
                        <span>Check Mobile App</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="btn btn-outline btn-sm"
                    >
                      <span>Check Another Logo</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
