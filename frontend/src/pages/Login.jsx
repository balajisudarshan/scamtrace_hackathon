import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import {
  Search,
  Network,
  Compass,
  Lock,
  ShieldCheck,
  AlertCircle,
  Terminal,
  User,
  ArrowRight,
  LogIn,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import "./auth-pages.css";

function BrandLogo({ size = 32 }) {
  return (
    <div className="scamtrace-brand-mark" aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="brand-shield-svg"
      >
        <path
          d="M16 3L6 7.2V15C6 21.6 10.3 27.7 16 29C21.7 27.7 26 21.6 26 15V7.2L16 3Z"
          stroke="url(#shield-specular-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9V15L12 18M16 15L20 18"
          stroke="#A5B4FC"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="15" r="1.8" fill="#FFFFFF" />
        <circle cx="12" cy="18" r="1.3" fill="#818CF8" />
        <circle cx="20" cy="18" r="1.3" fill="#818CF8" />
        <defs>
          <linearGradient id="shield-specular-gradient" x1="6" y1="3" x2="26" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#A5B4FC" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
      <span className="scamtrace-wordmark">SCAMTRACE</span>
    </div>
  );
}

export default function Login() {
  const { loginGoogle, loginEmail, error, setError } = useAuth();
  const navigate = useNavigate();

  const [authProcessing, setAuthProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError("No Google credential received.");
      return;
    }
    setAuthProcessing(true);
    setError(null);
    try {
      const res = await loginGoogle(credentialResponse.credential);
      if (res?.success) {
        if (res.user?.role === "ANALYST" || res.user?.role === "ADMIN") {
          navigate("/analyst");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err?.message || "Google authentication failed. Please verify connection.");
    } finally {
      setAuthProcessing(false);
    }
  };

  const handleGoogleFailure = () => {
    setError("Google sign-in was closed or could not be completed.");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setAuthProcessing(true);
    setError(null);
    try {
      const res = await loginEmail(email, password);
      if (res?.success) {
        if (res.user?.role === "ANALYST" || res.user?.role === "ADMIN") {
          navigate("/analyst");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err?.message || "Invalid credentials or login failed.");
    } finally {
      setAuthProcessing(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setAuthProcessing(true);
    setError(null);
    try {
      const res = await loginEmail(demoEmail, demoPass);
      if (res?.success) {
        if (res.user?.role === "ANALYST" || res.user?.role === "ADMIN") {
          navigate("/analyst");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err?.message || "Demo login failed.");
    } finally {
      setAuthProcessing(false);
    }
  };

  const benefits = [
    { icon: Search, label: "Check suspicious messages, links, and unknown caller IDs." },
    { icon: Network, label: "Discover connected patterns across community intelligence." },
    { icon: Compass, label: "Get practical, calm damage control and containment guidance." },
  ];

  return (
    <div className="scamtrace-login-root">
      <div className="glass-ambient-orb glass-orb-top" aria-hidden="true" />
      <div className="glass-ambient-orb glass-orb-bottom" aria-hidden="true" />
      <div className="glass-grid-overlay" aria-hidden="true" />

      <main className="scamtrace-split-viewport" id="login-container">
        {/* ── Left Section: Brand & Value Proposition ── */}
        <section className="scamtrace-brand-col" aria-labelledby="brand-title">
          <header className="brand-header-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <BrandLogo size={32} />
            <ThemeToggle />
          </header>

          <div className="brand-copy-stack">
            <h1 id="brand-title" className="brand-main-headline">
              Spot the scam.<br />
              <span className="brand-headline-sub">Stay one step ahead.</span>
            </h1>

            <p className="brand-lead-summary">
              Check suspicious messages, uncover connected scam reports, and make safer decisions with evidence you can understand.
            </p>

            <ul className="brand-benefits-grid" aria-label="Key Capabilities">
              {benefits.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx} className="glass-benefit-row">
                    <div className="glass-benefit-icon-badge" aria-hidden="true">
                      <IconComponent size={15} strokeWidth={2.2} />
                    </div>
                    <span className="glass-benefit-title">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <footer className="brand-trust-row">
            <span className="trust-pulse-dot" aria-hidden="true" />
            <p className="trust-manifesto-text">
              Built to make scam intelligence accessible to everyone.
            </p>
          </footer>
        </section>

        {/* ── Right Section: Login Card ── */}
        <section className="scamtrace-card-col" aria-label="Sign in">
          <div className="frost-login-card" style={{ maxWidth: 440 }}>
            <div className="glass-card-rim" aria-hidden="true" />

            <header className="frost-card-header">
              <h2 className="frost-card-title">Welcome to SCAMTRACE</h2>
              <p className="frost-card-sub">
                Sign in to access community intelligence or the analyst desk.
              </p>
            </header>

            <div className="frost-card-interactive">
              {error && (
                <div className="frost-error-alert" role="alert" style={{ marginBottom: 14 }}>
                  <AlertCircle size={15} className="frost-error-icon" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* ── Quick Demo Login Accounts (For Reviewers & Judges) ── */}
              <div
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--surface-border-strong)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                  ⚡ Quick Demo Accounts:
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("analyst@scamtrace.dev", "analyst123")}
                    disabled={authProcessing}
                    style={{
                      background: "rgba(59, 130, 246, 0.12)",
                      border: "1px solid rgba(59, 130, 246, 0.25)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "var(--accent)",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Terminal size={13} style={{ color: "var(--accent)" }} />
                    <div>
                      <div>Analyst (Priya)</div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 400 }}>Full Desk Access</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("user@scamtrace.dev", "user123")}
                    disabled={authProcessing}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      color: "var(--text-secondary)",
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <User size={13} />
                    <div>
                      <div>Public User</div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 400 }}>Standard Protect</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* ── Standard Email / Password Form ── */}
              <form onSubmit={handleEmailSubmit} style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 12 }}>
                  <label className="input-label" htmlFor="login-email">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@scamtrace.dev"
                    required
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label className="input-label" htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={authProcessing || !email || !password}
                  className="btn btn-primary w-full"
                >
                  {authProcessing ? "Signing in..." : "Sign In with Email"}
                </button>
              </form>

              {/* Subtle divider */}
              <div className="glass-divider" aria-hidden="true" style={{ margin: "14px 0" }}>
                <span className="glass-divider-line" />
                <span className="glass-divider-tag">or Google OAuth</span>
                <span className="glass-divider-line" />
              </div>

              {/* Google OAuth Button */}
              <div
                className={`frost-google-container ${authProcessing ? "is-processing" : ""}`}
                aria-live="polite"
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="100%"
                />
              </div>

              {/* Sign up prompt */}
              <div style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--text-muted)" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>
                  Create an account
                </Link>
              </div>

              <div className="frost-privacy-banner" style={{ marginTop: 14 }}>
                <Lock size={14} className="frost-privacy-icon" aria-hidden="true" />
                <p className="frost-privacy-text">
                  We never ask for passwords or OTPs to analyze suspicious messages.
                </p>
              </div>
            </div>

            <footer className="frost-card-footer">
              <Link to="/" style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}>
                ← Return to SCAMTRACE Protect
              </Link>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
