import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  AtSign,
  Globe,
  Building2,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  ArrowRight,
  Info,
  Layers,
  ExternalLink,
  Lock,
} from "lucide-react";

export default function BrandMonitorPage() {
  const navigate = useNavigate();

  // Active top-level tab: 'social' | 'app' | 'profiles' | 'namecheck'
  const [activeTab, setActiveTab] = useState("social");

  // Brands state
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [loadingBrands, setLoadingBrands] = useState(true);

  // Brand profile editing modal state
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandForm, setBrandForm] = useState({
    name: "",
    domain: "",
    description: "",
    logoUrl: "",
    officialSocial: [{ platform: "Twitter / X", handle: "", url: "" }],
    officialApps: [{ store: "Google Play", appId: "", publisher: "", name: "" }],
  });
  const [brandSaving, setBrandSaving] = useState(false);
  const [brandError, setBrandError] = useState(null);

  // Social Analysis Form State
  const [socialCandidate, setSocialCandidate] = useState({
    platform: "Twitter / X",
    handle: "SBI_Support_Official",
    displayName: "SBI Official Customer Helpdesk",
    bio: "Official 24/7 customer support for SBI account holders. Send DM for KYC update and net banking reactivation. Visit: http://bit.ly/sbi-kyc",
    link: "http://bit.ly/sbi-kyc",
    followers: 240,
    createdDaysAgo: 18,
  });
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialResult, setSocialResult] = useState(null);
  const [socialError, setSocialError] = useState(null);
  const [socialSubmittedId, setSocialSubmittedId] = useState(null);

  // Mobile App Analysis Form State
  const [appCandidate, setAppCandidate] = useState({
    store: "Google Play",
    name: "SBI Net Banking Pro — Official",
    appId: "com.sbi.netbanking.unofficial",
    publisher: "Dev Studios Pvt Ltd",
    description: "Official companion app for State Bank of India net banking. Check balance, transfer funds, update KYC verification instantly.",
    releasedDaysAgo: 25,
  });
  const [appLoading, setAppLoading] = useState(false);
  const [appResult, setAppResult] = useState(null);
  const [appError, setAppError] = useState(null);
  const [appSubmittedId, setAppSubmittedId] = useState(null);

  // Quick Name Check State
  const [nameCheckQuery, setNameCheckQuery] = useState({ candidate: "S B I Care Desk", brand: "SBI" });
  const [nameCheckResult, setNameCheckResult] = useState(null);
  const [nameCheckLoading, setNameCheckLoading] = useState(false);

  // Load brands on mount
  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const res = await api.brand.getProfiles();
      if (res && res.success) {
        setBrands(res.brands || []);
        if (res.brands?.length && !selectedBrandId) {
          setSelectedBrandId(res.brands[0].id);
        }
      }
    } catch (err) {
      console.warn("Failed to load brands:", err.message);
    } finally {
      setLoadingBrands(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const selectedBrand = brands.find((b) => b.id === selectedBrandId) || brands[0] || {
    name: "SBI",
    domain: "sbi.co.in",
    description: "State Bank of India banking services",
    officialSocial: [{ platform: "Twitter / X", handle: "TheOfficialSBI" }],
    officialApps: [{ store: "Google Play", appId: "com.sbi.lotusintouch", publisher: "State Bank of India" }],
  };

  // ── Social Analysis Action ──
  const handleAnalyzeSocial = async (e) => {
    if (e) e.preventDefault();
    if (!socialCandidate.handle.trim()) {
      setSocialError("Please enter a social handle to check.");
      return;
    }
    setSocialLoading(true);
    setSocialError(null);
    setSocialResult(null);
    setSocialSubmittedId(null);
    try {
      const res = await api.brand.analyzeSocial({
        brandId: selectedBrandId,
        brandData: selectedBrand,
        candidate: socialCandidate,
      });
      if (res && res.success) {
        setSocialResult(res);
      } else {
        setSocialError(res?.message || "Social account analysis failed.");
      }
    } catch (err) {
      setSocialError(err?.message || "Network error checking social profile.");
    } finally {
      setSocialLoading(false);
    }
  };

  // ── App Analysis Action ──
  const handleAnalyzeApp = async (e) => {
    if (e) e.preventDefault();
    if (!appCandidate.name.trim() && !appCandidate.appId.trim()) {
      setAppError("Please enter an app name or package identifier.");
      return;
    }
    setAppLoading(true);
    setAppError(null);
    setAppResult(null);
    setAppSubmittedId(null);
    try {
      const res = await api.brand.analyzeApp({
        brandId: selectedBrandId,
        brandData: selectedBrand,
        candidate: appCandidate,
      });
      if (res && res.success) {
        setAppResult(res);
      } else {
        setAppError(res?.message || "Mobile app analysis failed.");
      }
    } catch (err) {
      setAppError(err?.message || "Network error checking mobile app.");
    } finally {
      setAppLoading(false);
    }
  };

  // ── Quick Name Check Action ──
  const handleQuickNameCheck = async (e) => {
    if (e) e.preventDefault();
    if (!nameCheckQuery.candidate.trim() || !nameCheckQuery.brand.trim()) return;
    setNameCheckLoading(true);
    try {
      const res = await api.brand.checkName(nameCheckQuery.candidate, nameCheckQuery.brand);
      if (res && res.success) {
        setNameCheckResult(res);
      }
    } catch (err) {
      console.warn("Name check failed:", err.message);
    } finally {
      setNameCheckLoading(false);
    }
  };

  // ── Submit Case to Analyst Queue ──
  const handleSubmitCase = async (type) => {
    const isSocial = type === "social";
    const candidate = isSocial ? socialCandidate : appCandidate;
    const result = isSocial ? socialResult : appResult;
    try {
      const res = await api.brand.submitCase({
        assetType: isSocial ? "social" : "app",
        candidate,
        brand: selectedBrand,
        analysisResult: result,
      });
      if (res && res.success) {
        if (isSocial) setSocialSubmittedId(res.reportId);
        else setAppSubmittedId(res.reportId);
      } else {
        alert(res?.message || "Failed to submit case to analyst queue.");
      }
    } catch (err) {
      alert(err.message || "Error submitting case to analyst queue.");
    }
  };

  // ── Open Brand Modal for Add/Edit ──
  const handleOpenBrandModal = (brandToEdit = null) => {
    if (brandToEdit) {
      setEditingBrand(brandToEdit);
      setBrandForm({
        name: brandToEdit.name || "",
        domain: brandToEdit.domain || "",
        description: brandToEdit.description || "",
        logoUrl: brandToEdit.logoUrl || "",
        officialSocial: Array.isArray(brandToEdit.officialSocial) && brandToEdit.officialSocial.length
          ? brandToEdit.officialSocial
          : [{ platform: "Twitter / X", handle: "", url: "" }],
        officialApps: Array.isArray(brandToEdit.officialApps) && brandToEdit.officialApps.length
          ? brandToEdit.officialApps
          : [{ store: "Google Play", appId: "", publisher: "", name: "" }],
      });
    } else {
      setEditingBrand(null);
      setBrandForm({
        name: "",
        domain: "",
        description: "",
        logoUrl: "",
        officialSocial: [{ platform: "Twitter / X", handle: "", url: "" }],
        officialApps: [{ store: "Google Play", appId: "", publisher: "", name: "" }],
      });
    }
    setBrandError(null);
    setShowBrandModal(true);
  };

  // ── Save Brand Profile ──
  const handleSaveBrand = async (e) => {
    e.preventDefault();
    if (!brandForm.name.trim() || !brandForm.domain.trim()) {
      setBrandError("Brand name and official domain are required.");
      return;
    }
    setBrandSaving(true);
    setBrandError(null);
    try {
      if (editingBrand) {
        const res = await api.brand.updateProfile(editingBrand.id, brandForm);
        if (res && res.success) {
          setShowBrandModal(false);
          await fetchBrands();
        } else {
          setBrandError(res?.message || "Failed to update brand profile.");
        }
      } else {
        const res = await api.brand.createProfile(brandForm);
        if (res && res.success) {
          setShowBrandModal(false);
          await fetchBrands();
          if (res.brand?.id) setSelectedBrandId(res.brand.id);
        } else {
          setBrandError(res?.message || "Failed to create brand profile.");
        }
      }
    } catch (err) {
      setBrandError(err.message || "Error saving brand profile.");
    } finally {
      setBrandSaving(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "36px 20px 80px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Page Header */}
        <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59, 130, 246, 0.1)", padding: "4px 10px", borderRadius: 20, color: "var(--accent)", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
              <ShieldCheck size={14} />
              <span>Digital Risk Protection</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 6 }}>
              Social & App Brand Monitoring
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 700 }}>
              Detect fake or impersonating social media accounts, look-alike company pages, and malicious mobile apps targeting your brand identity.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => handleOpenBrandModal(null)}
              className="btn btn-outline btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Plus size={14} />
              <span>Add Brand Profile</span>
            </button>
            <Link
              to="/analyst/queue"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>View Analyst Queue</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Brand Selector Bar */}
        <div
          className="card"
          style={{
            marginBottom: 24,
            padding: "16px 20px",
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <Building2 size={18} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>
              Active Brand Identity:
            </span>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              className="select"
              style={{ padding: "6px 12px", fontSize: 13, minWidth: 180 }}
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.domain})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Domain: <strong style={{ color: "#FFFFFF" }}>{selectedBrand.domain}</strong>
            </span>
            <button
              type="button"
              onClick={() => handleOpenBrandModal(selectedBrand)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: 12 }}
            >
              Edit Brand Assets
            </button>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="tab-nav" style={{ marginBottom: 24 }}>
          {[
            { id: "social", label: "Fake Social Account Check", icon: AtSign },
            { id: "app", label: "Fake Mobile App Check", icon: Smartphone },
            { id: "namecheck", label: "Look-Alike Name Analyzer", icon: Search },
            { id: "profiles", label: "Manage Brand Profiles", icon: Building2 },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`tab-btn ${active ? "active" : ""}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <Icon size={15} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 1: SOCIAL ACCOUNT DETECTION */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === "social" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                  Scan Suspicious Social Media Profile
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Evaluate account handles, homoglyphs, look-alike names, copied biographies, and suspicious links against official assets of{" "}
                  <strong style={{ color: "#FFFFFF" }}>{selectedBrand.name}</strong>.
                </p>
              </div>

              {/* Sample Preset Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Try Test Cases:</span>
                {[
                  {
                    label: "🚨 Look-alike: SBI_Support_Official",
                    data: {
                      platform: "Twitter / X",
                      handle: "SBI_Support_Official",
                      displayName: "SBI Official Customer Helpdesk",
                      bio: "Official SBI support team. DM for KYC update and net banking issues. Verify link: bit.ly/sbi-kyc",
                      link: "http://bit.ly/sbi-kyc",
                      followers: 320,
                      createdDaysAgo: 14,
                    },
                  },
                  {
                    label: "🚨 Spacing Trick: S B I Care Desk",
                    data: {
                      platform: "Twitter / X",
                      handle: "S B I Care Desk",
                      displayName: "State Bank of India Help",
                      bio: "Customer care service for account reactivations and emergency support.",
                      link: "https://sbi.co.in",
                      followers: 110,
                      createdDaysAgo: 8,
                    },
                  },
                  {
                    label: "🚨 Leetspeak/Homoglyph: SB1 Helpdesk",
                    data: {
                      platform: "Twitter / X",
                      handle: "SB1_Helpdesk_India",
                      displayName: "SB1 Banking Support",
                      bio: "Instant KYC and banking support desk.",
                      link: "http://sbi-secure-login.co.in",
                      followers: 45,
                      createdDaysAgo: 5,
                    },
                  },
                  {
                    label: "✅ Official: TheOfficialSBI",
                    data: {
                      platform: "Twitter / X",
                      handle: "TheOfficialSBI",
                      displayName: "State Bank of India",
                      bio: "Official handle of State Bank of India. The banker to every Indian.",
                      link: "https://sbi.co.in",
                      followers: 4500000,
                      createdDaysAgo: 4000,
                    },
                  },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSocialCandidate(s.data);
                      setSocialResult(null);
                      setSocialSubmittedId(null);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--surface-border)",
                      color: "var(--text-secondary)",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAnalyzeSocial}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Platform
                    </label>
                    <select
                      className="select"
                      value={socialCandidate.platform}
                      onChange={(e) => setSocialCandidate({ ...socialCandidate, platform: e.target.value })}
                    >
                      <option value="Twitter / X">Twitter / X</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Telegram">Telegram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="WhatsApp">WhatsApp Channel</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Candidate Handle / Username
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={socialCandidate.handle}
                      onChange={(e) => setSocialCandidate({ ...socialCandidate, handle: e.target.value })}
                      placeholder="e.g. SBI_Support_Official or @S B I"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={socialCandidate.displayName}
                      onChange={(e) => setSocialCandidate({ ...socialCandidate, displayName: e.target.value })}
                      placeholder="e.g. SBI Customer Care Official"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Profile External Link / Website
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={socialCandidate.link}
                      onChange={(e) => setSocialCandidate({ ...socialCandidate, link: e.target.value })}
                      placeholder="e.g. http://bit.ly/sbi-kyc"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                    Account Biography / Description
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={socialCandidate.bio}
                    onChange={(e) => setSocialCandidate({ ...socialCandidate, bio: e.target.value })}
                    placeholder="Paste account bio text here..."
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--text-muted)" }}>
                    <span>Followers: <strong>{socialCandidate.followers}</strong></span>
                    <span>Account Age: <strong>{socialCandidate.createdDaysAgo} days</strong></span>
                  </div>

                  <button
                    type="submit"
                    disabled={socialLoading}
                    className="btn btn-primary"
                    style={{ minWidth: 160 }}
                  >
                    {socialLoading ? (
                      <>
                        <div className="spinner" style={{ width: 14, height: 14 }} />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Search size={15} />
                        <span>Analyze Profile</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {socialError && (
                <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", color: "#FCA5A5", borderRadius: 6, fontSize: 13 }}>
                  {socialError}
                </div>
              )}
            </div>

            {/* Social Result Breakdown */}
            {socialResult && (
              <div className="card fade-in" style={{ padding: 24, border: socialResult.isOfficial ? "1px solid #10B981" : "1px solid var(--surface-border-strong)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: socialResult.isOfficial
                          ? "rgba(16, 185, 129, 0.2)"
                          : socialResult.riskLevel === "HIGH_RISK"
                          ? "rgba(239, 68, 68, 0.2)"
                          : "rgba(245, 158, 11, 0.2)",
                        color: socialResult.isOfficial ? "#10B981" : socialResult.riskLevel === "HIGH_RISK" ? "#EF4444" : "#F59E0B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {socialResult.isOfficial ? (
                        <CheckCircle2 size={26} />
                      ) : socialResult.riskLevel === "HIGH_RISK" ? (
                        <ShieldAlert size={26} />
                      ) : (
                        <AlertTriangle size={26} />
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 3 }}>
                        {socialResult.verdict}
                      </h3>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                        {socialResult.isOfficial ? (
                          <span style={{ color: "#10B981", fontWeight: 600 }}>Verified Official Brand Asset</span>
                        ) : (
                          <>
                            Impersonation Score: <strong>{Math.round(socialResult.score)} / 100</strong> • Level: <RiskBadge level={socialResult.riskLevel} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {!socialResult.isOfficial && (
                    <div>
                      {socialSubmittedId ? (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", color: "#6EE7B7", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                          <CheckCircle2 size={15} />
                          <span>Persisted to Analyst Queue (ID: {socialSubmittedId.slice(0, 8)}...)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSubmitCase("social")}
                          className="btn btn-outline btn-sm"
                          style={{ borderColor: "var(--risk-high)", color: "#FCA5A5" }}
                        >
                          Submit to Analyst Triage Queue
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Evidence & Findings */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
                  <div style={{ background: "rgba(0, 0, 0, 0.2)", padding: 16, borderRadius: 8 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      Detected Threat Patterns & Techniques
                    </h4>
                    {socialResult.techniques?.length ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {socialResult.techniques.map((t, idx) => (
                          <span key={idx} style={{ background: "rgba(59, 130, 246, 0.12)", border: "1px solid rgba(59, 130, 246, 0.25)", color: "#93C5FD", fontSize: 11, padding: "3px 8px", borderRadius: 4, fontFamily: "monospace" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>None detected</span>
                    )}
                  </div>

                  <div style={{ background: "rgba(0, 0, 0, 0.2)", padding: 16, borderRadius: 8 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      Explainable Evidence Breakdown
                    </h4>
                    <ul style={{ listStyle: "disc", paddingLeft: 18, fontSize: 12, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 6 }}>
                      {socialResult.reasons?.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 2: MOBILE APP DETECTION */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === "app" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                  Scan Suspicious Mobile Application
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Verify app title, store package identifier, and publisher against the official developer profile of{" "}
                  <strong style={{ color: "#FFFFFF" }}>{selectedBrand.name}</strong>.
                </p>
              </div>

              {/* Sample Preset Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Try Test Cases:</span>
                {[
                  {
                    label: "🚨 Unofficial Publisher: Dev Studios",
                    data: {
                      store: "Google Play",
                      name: "SBI Net Banking Pro — Official",
                      appId: "com.sbi.netbanking.unofficial",
                      publisher: "Dev Studios Pvt Ltd",
                      description: "Access your State Bank of India account. Complete KYC verification to claim cashback rewards.",
                      releasedDaysAgo: 22,
                    },
                  },
                  {
                    label: "🚨 Look-alike Name: YONO SBI Online",
                    data: {
                      store: "Google Play",
                      name: "YONO SBI — Online Fast Banking",
                      appId: "com.yonosbi.fastloan",
                      publisher: "FinTech Global Soft",
                      description: "Quick personal loans and savings account access for SBI users.",
                      releasedDaysAgo: 10,
                    },
                  },
                  {
                    label: "✅ Official: YONO SBI by State Bank of India",
                    data: {
                      store: "Google Play",
                      name: "YONO SBI",
                      appId: "com.sbi.lotusintouch",
                      publisher: "State Bank of India",
                      description: "Official mobile banking application from State Bank of India.",
                      releasedDaysAgo: 3600,
                    },
                  },
                ].map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAppCandidate(s.data);
                      setAppResult(null);
                      setAppSubmittedId(null);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--surface-border)",
                      color: "var(--text-secondary)",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAnalyzeApp}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      App Store
                    </label>
                    <select
                      className="select"
                      value={appCandidate.store}
                      onChange={(e) => setAppCandidate({ ...appCandidate, store: e.target.value })}
                    >
                      <option value="Google Play">Google Play Store</option>
                      <option value="Apple App Store">Apple App Store</option>
                      <option value="APK / Third-Party">Direct APK / Third-Party Store</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      App Title / Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={appCandidate.name}
                      onChange={(e) => setAppCandidate({ ...appCandidate, name: e.target.value })}
                      placeholder="e.g. SBI Net Banking Pro"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Package / App ID
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={appCandidate.appId}
                      onChange={(e) => setAppCandidate({ ...appCandidate, appId: e.target.value })}
                      placeholder="e.g. com.sbi.netbanking.unofficial"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Publisher / Developer Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={appCandidate.publisher}
                      onChange={(e) => setAppCandidate({ ...appCandidate, publisher: e.target.value })}
                      placeholder="e.g. Dev Studios Pvt Ltd"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                    App Store Description
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={appCandidate.description}
                    onChange={(e) => setAppCandidate({ ...appCandidate, description: e.target.value })}
                    placeholder="Paste app store description..."
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Release Age: <strong>{appCandidate.releasedDaysAgo} days ago</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={appLoading}
                    className="btn btn-primary"
                    style={{ minWidth: 160 }}
                  >
                    {appLoading ? (
                      <>
                        <div className="spinner" style={{ width: 14, height: 14 }} />
                        <span>Analyzing App...</span>
                      </>
                    ) : (
                      <>
                        <Search size={15} />
                        <span>Analyze Mobile App</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {appError && (
                <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--risk-high-bg)", border: "1px solid var(--risk-high-border)", color: "#FCA5A5", borderRadius: 6, fontSize: 13 }}>
                  {appError}
                </div>
              )}
            </div>

            {/* App Result Breakdown */}
            {appResult && (
              <div className="card fade-in" style={{ padding: 24, border: appResult.isOfficial ? "1px solid #10B981" : "1px solid var(--surface-border-strong)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: appResult.isOfficial
                          ? "rgba(16, 185, 129, 0.2)"
                          : appResult.riskLevel === "HIGH_RISK"
                          ? "rgba(239, 68, 68, 0.2)"
                          : "rgba(245, 158, 11, 0.2)",
                        color: appResult.isOfficial ? "#10B981" : appResult.riskLevel === "HIGH_RISK" ? "#EF4444" : "#F59E0B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {appResult.isOfficial ? (
                        <CheckCircle2 size={26} />
                      ) : appResult.riskLevel === "HIGH_RISK" ? (
                        <ShieldAlert size={26} />
                      ) : (
                        <AlertTriangle size={26} />
                      )}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 3 }}>
                        {appResult.verdict}
                      </h3>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                        {appResult.isOfficial ? (
                          <span style={{ color: "#10B981", fontWeight: 600 }}>Verified Official Brand App</span>
                        ) : (
                          <>
                            App Impersonation Score: <strong>{Math.round(appResult.score)} / 100</strong> • Level: <RiskBadge level={appResult.riskLevel} />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {!appResult.isOfficial && (
                    <div>
                      {appSubmittedId ? (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10B981", color: "#6EE7B7", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                          <CheckCircle2 size={15} />
                          <span>Persisted to Analyst Queue (ID: {appSubmittedId.slice(0, 8)}...)</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSubmitCase("app")}
                          className="btn btn-outline btn-sm"
                          style={{ borderColor: "var(--risk-high)", color: "#FCA5A5" }}
                        >
                          Submit to Analyst Triage Queue
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Evidence & Findings */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  <div style={{ background: "rgba(0, 0, 0, 0.2)", padding: 16, borderRadius: 8 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      App Identification Evidence
                    </h4>
                    <ul style={{ listStyle: "disc", paddingLeft: 18, fontSize: 12, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 6 }}>
                      {appResult.reasons?.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: "rgba(0, 0, 0, 0.2)", padding: 16, borderRadius: 8 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      Target Brand Reference Profile
                    </h4>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 4 }}>
                      <div>Brand Name: <strong style={{ color: "#FFFFFF" }}>{selectedBrand.name}</strong></div>
                      <div>Official Domain: <strong style={{ color: "#FFFFFF" }}>{selectedBrand.domain}</strong></div>
                      <div>Official Publisher: <strong style={{ color: "#10B981" }}>State Bank of India</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 3: LOOK-ALIKE NAME ANALYZER */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === "namecheck" && (
          <div className="fade-in card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              Look-Alike Name & Homoglyph Analyzer
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 18 }}>
              Tests for spacing variations (e.g. "S B I"), character substitutions ("SB1", Cyrillic homoglyphs), added words ("Official", "Support"), and edit distances.
            </p>

            <form onSubmit={handleQuickNameCheck} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
              <input
                type="text"
                className="input"
                style={{ flex: 1, minWidth: 200 }}
                placeholder="Candidate name (e.g. S B I or SB1_Care)"
                value={nameCheckQuery.candidate}
                onChange={(e) => setNameCheckQuery({ ...nameCheckQuery, candidate: e.target.value })}
              />
              <input
                type="text"
                className="input"
                style={{ width: 160 }}
                placeholder="Official Brand"
                value={nameCheckQuery.brand}
                onChange={(e) => setNameCheckQuery({ ...nameCheckQuery, brand: e.target.value })}
              />
              <button type="submit" disabled={nameCheckLoading} className="btn btn-primary">
                {nameCheckLoading ? "Analyzing..." : "Check Name"}
              </button>
            </form>

            {nameCheckResult && (
              <div style={{ background: "rgba(0, 0, 0, 0.25)", padding: 18, borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Verdict: </span>
                    <strong style={{ color: nameCheckResult.confidence >= 75 ? "#EF4444" : "#F59E0B" }}>
                      {nameCheckResult.verdict}
                    </strong>
                  </div>
                  <div style={{ fontSize: 13 }}>
                    Similarity Confidence: <strong>{nameCheckResult.confidence}%</strong>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  <div style={{ marginBottom: 6 }}>Matched Techniques:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {nameCheckResult.techniques?.length ? (
                      nameCheckResult.techniques.map((t, idx) => (
                        <span key={idx} style={{ background: "rgba(59, 130, 246, 0.12)", border: "1px solid rgba(59, 130, 246, 0.25)", color: "#93C5FD", fontSize: 11, padding: "2px 8px", borderRadius: 4, fontFamily: "monospace" }}>
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>None</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* TAB 4: MANAGE BRAND PROFILES */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        {activeTab === "profiles" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Registered Brand Profiles</h2>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Configure official logos, domain names, authorized social handles, and app package IDs for automated risk comparisons.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBrandModal(null)}
                className="btn btn-primary btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <Plus size={14} />
                <span>Create New Brand Profile</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
              {brands.map((b) => (
                <div key={b.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>{b.name}</h3>
                      <div style={{ fontSize: 12, color: "var(--accent)" }}>{b.domain}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenBrandModal(b)}
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: 11, padding: "4px 8px" }}
                    >
                      Edit
                    </button>
                  </div>

                  <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 14 }}>
                    {b.description || "No description provided."}
                  </p>

                  <div style={{ borderTop: "1px solid var(--surface-border)", paddingTop: 10, fontSize: 11, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 4 }}>
                    <div>
                      Official Social Accounts: <strong>{(b.officialSocial || []).length} registered</strong>
                    </div>
                    <div>
                      Official Mobile Apps: <strong>{(b.officialApps || []).length} registered</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Brand Profile Modal ── */}
        {showBrandModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: 20,
            }}
          >
            <div
              className="card fade-in"
              style={{
                maxWidth: 640,
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: 24,
                background: "#0F172A",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>
                  {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Create Brand Profile"}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBrandModal(false)}
                  className="btn btn-ghost btn-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveBrand}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={brandForm.name}
                      onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                      placeholder="e.g. State Bank of India"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
                      Official Domain *
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={brandForm.domain}
                      onChange={(e) => setBrandForm({ ...brandForm, domain: e.target.value })}
                      placeholder="e.g. sbi.co.in"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
                    Brand Description & Services
                  </label>
                  <textarea
                    className="textarea"
                    rows={2}
                    value={brandForm.description}
                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                    placeholder="Brief description of official services..."
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>
                    Official Logo URL
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={brandForm.logoUrl}
                    onChange={(e) => setBrandForm({ ...brandForm, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                {/* Official Social Handles */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                      Official Social Handles
                    </label>
                    <button
                      type="button"
                      onClick={() => setBrandForm({
                        ...brandForm,
                        officialSocial: [...brandForm.officialSocial, { platform: "Twitter / X", handle: "", url: "" }]
                      })}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 11, padding: "2px 6px" }}
                    >
                      + Add Handle
                    </button>
                  </div>
                  {brandForm.officialSocial.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <input
                        type="text"
                        className="input"
                        style={{ width: 130 }}
                        value={item.platform}
                        onChange={(e) => {
                          const updated = [...brandForm.officialSocial];
                          updated[idx].platform = e.target.value;
                          setBrandForm({ ...brandForm, officialSocial: updated });
                        }}
                        placeholder="Platform"
                      />
                      <input
                        type="text"
                        className="input"
                        style={{ flex: 1 }}
                        value={item.handle}
                        onChange={(e) => {
                          const updated = [...brandForm.officialSocial];
                          updated[idx].handle = e.target.value;
                          setBrandForm({ ...brandForm, officialSocial: updated });
                        }}
                        placeholder="Official handle e.g. TheOfficialSBI"
                      />
                      {brandForm.officialSocial.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = brandForm.officialSocial.filter((_, i) => i !== idx);
                            setBrandForm({ ...brandForm, officialSocial: updated });
                          }}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "#EF4444" }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Official Apps */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                      Official Mobile Apps
                    </label>
                    <button
                      type="button"
                      onClick={() => setBrandForm({
                        ...brandForm,
                        officialApps: [...brandForm.officialApps, { store: "Google Play", appId: "", publisher: "", name: "" }]
                      })}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: 11, padding: "2px 6px" }}
                    >
                      + Add App
                    </button>
                  </div>
                  {brandForm.officialApps.map((item, idx) => (
                    <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 6, marginBottom: 8 }}>
                      <input
                        type="text"
                        className="input"
                        value={item.appId}
                        onChange={(e) => {
                          const updated = [...brandForm.officialApps];
                          updated[idx].appId = e.target.value;
                          setBrandForm({ ...brandForm, officialApps: updated });
                        }}
                        placeholder="Package ID (e.g. com.sbi.lotusintouch)"
                      />
                      <input
                        type="text"
                        className="input"
                        value={item.publisher}
                        onChange={(e) => {
                          const updated = [...brandForm.officialApps];
                          updated[idx].publisher = e.target.value;
                          setBrandForm({ ...brandForm, officialApps: updated });
                        }}
                        placeholder="Official Publisher"
                      />
                      <input
                        type="text"
                        className="input"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...brandForm.officialApps];
                          updated[idx].name = e.target.value;
                          setBrandForm({ ...brandForm, officialApps: updated });
                        }}
                        placeholder="App Name"
                      />
                      {brandForm.officialApps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = brandForm.officialApps.filter((_, i) => i !== idx);
                            setBrandForm({ ...brandForm, officialApps: updated });
                          }}
                          className="btn btn-ghost btn-sm"
                          style={{ color: "#EF4444" }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {brandError && (
                  <div style={{ marginBottom: 14, padding: "8px 12px", background: "var(--risk-high-bg)", color: "#FCA5A5", borderRadius: 6, fontSize: 12 }}>
                    {brandError}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setShowBrandModal(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={brandSaving}
                    className="btn btn-primary btn-sm"
                  >
                    {brandSaving ? "Saving..." : editingBrand ? "Update Brand" : "Create Brand"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
