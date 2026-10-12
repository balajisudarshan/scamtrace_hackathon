import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./auth-pages.css";

const FEATURES = [
  "Real-time scam detection & alerts",
  "Community-powered scam database",
  "Threat intelligence reports",
  "Browser & app integrations",
];

export default function Login() {
  const { loginGoogle, loginEmail, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await loginGoogle(credentialResponse.credential);
    if (res?.success) navigate("/dashboard");
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    const res = await loginEmail(e.target.email.value, e.target.password.value);
    setFormLoading(false);
    if (res?.success) navigate("/dashboard");
  };

  return (
    <div className="auth-root">
      {/* ── Left Brand Panel ── */}
      <div className="auth-brand">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <span className="auth-logo-name">ScamTrace</span>
        </div>

        <p className="auth-tagline">
          Protect yourself from <span>digital scams</span> in real time
        </p>

        <p className="auth-description">
          ScamTrace uses AI and community intelligence to detect, report, and
          neutralize scams before they reach you.
        </p>

        <div className="auth-features">
          {FEATURES.map((f) => (
            <div key={f} className="auth-feature-item">
              <span className="auth-feature-check">✓</span>
              {f}
            </div>
          ))}
        </div>

        <div className="auth-stats">
          <div className="auth-stat">
            <span className="auth-stat-value">2.4M+</span>
            <span className="auth-stat-label">Scams Blocked</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">180+</span>
            <span className="auth-stat-label">Countries</span>
          </div>
          <div className="auth-stat">
            <span className="auth-stat-value">99.1%</span>
            <span className="auth-stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          {/* Mobile logo */}
          <div className="auth-mobile-logo">
            <div className="auth-logo-icon" style={{ width: 38, height: 38, borderRadius: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className="auth-logo-name" style={{ fontSize: 18 }}>ScamTrace</span>
          </div>

          <div className="auth-form-heading">
            <h1 className="auth-form-title">Welcome back</h1>
            <p className="auth-form-subtitle">Sign in to your ScamTrace account</p>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="auth-google-wrap">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed. Please try again.")}
              theme="filled_black"
              size="large"
              width="100%"
            />
          </div>

          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with email</span>
            <div className="auth-divider-line" />
          </div>

          <form className="auth-form" onSubmit={handleEmailLogin}>
            <div>
              <label className="auth-label">Email Address</label>
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={loading || formLoading} className="auth-submit-btn">
              {loading || formLoading ? (
                "Signing in…"
              ) : (
                <>
                  <span>Sign In</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-footer-link">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
