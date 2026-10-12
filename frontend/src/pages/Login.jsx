import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Search, Network, Compass, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import "./auth-pages.css";

/**
 * Custom SCAMTRACE Brand Monogram
 * Precision-cut geometric shield with internal forensic trace node
 */
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
  const { loginGoogle, error, setError } = useAuth();
  const navigate = useNavigate();
  const [authProcessing, setAuthProcessing] = useState(false);

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
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err?.message || "Authentication failed. Please verify connection.");
    } finally {
      setAuthProcessing(false);
    }
  };

  const handleGoogleFailure = () => {
    setError("Google sign-in was closed or could not be completed.");
  };

  const benefits = [
    {
      icon: Search,
      label: "Check suspicious messages and links."
    },
    {
      icon: Network,
      label: "Discover connections between reported scams."
    },
    {
      icon: Compass,
      label: "Get clear, practical safety guidance."
    }
  ];

  return (
    <div className="scamtrace-login-root">
      {/* Ambient background refractive luminous blooms for glassmorphism */}
      <div className="glass-ambient-orb glass-orb-top" aria-hidden="true" />
      <div className="glass-ambient-orb glass-orb-bottom" aria-hidden="true" />
      <div className="glass-grid-overlay" aria-hidden="true" />

      <main className="scamtrace-split-viewport" id="login-container">
        {/* ── Left Section: Brand & Value Proposition ── */}
        <section className="scamtrace-brand-col" aria-labelledby="brand-title">
          <header className="brand-header-wrap">
            <BrandLogo size={32} />
          </header>

          <div className="brand-copy-stack">
            <h1 id="brand-title" className="brand-main-headline">
              Spot the scam.<br />
              <span className="brand-headline-sub">Stay one step ahead.</span>
            </h1>

            <p className="brand-lead-summary">
              Check suspicious messages, uncover connected scam reports, and make safer decisions with evidence you can understand.
            </p>

            {/* Compact Benefits in Frosted Glass Tiles */}
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

        {/* ── Right Section: Frosted Glass Login Card ── */}
        <section className="scamtrace-card-col" aria-label="Sign in">
          <div className="frost-login-card">
            {/* Specular glass highlight line */}
            <div className="glass-card-rim" aria-hidden="true" />

            <header className="frost-card-header">
              <h2 className="frost-card-title">Welcome to SCAMTRACE</h2>
              <p className="frost-card-sub">
                Sign in to continue to your safety workspace.
              </p>
            </header>

            <div className="frost-card-interactive">
              {/* Subtle divider */}
              <div className="glass-divider" aria-hidden="true">
                <span className="glass-divider-line" />
                <span className="glass-divider-tag">Secure Access</span>
                <span className="glass-divider-line" />
              </div>

              {/* Error feedback banner */}
              {error && (
                <div className="frost-error-alert" role="alert">
                  <AlertCircle size={15} className="frost-error-icon" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              {/* Prominent Google Authentication Button */}
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

              {/* Privacy Assurance Note */}
              <div className="frost-privacy-banner">
                <Lock size={14} className="frost-privacy-icon" aria-hidden="true" />
                <p className="frost-privacy-text">
                  We never ask for your passwords or OTPs to analyze a suspicious message.
                </p>
              </div>
            </div>

            {/* Footer with Legal Links */}
            <footer className="frost-card-footer">
              <nav className="frost-legal-nav" aria-label="Terms and Privacy">
                <a
                  href="#privacy"
                  className="frost-legal-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy
                </a>
                <span className="frost-legal-separator" aria-hidden="true">·</span>
                <a
                  href="#terms"
                  className="frost-legal-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms
                </a>
              </nav>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
