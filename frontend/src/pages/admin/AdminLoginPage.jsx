import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BrandMark } from "../../components/Navbar";
import ThemeToggle from "../../components/ThemeToggle";
import { ShieldCheck, Lock, Mail, ArrowRight, AlertTriangle, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();

  const [identifier, setIdentifier] = useState("admin@scamtrace.dev");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError("Please enter administrator username/email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await loginAdmin(identifier.trim(), password);
      if (res && res.success) {
        navigate("/admin/dashboard");
      } else {
        setError(res?.message || "Invalid administrator credentials.");
      }
    } catch (err) {
      setError(err?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-base)",
        transition: "background-color var(--transition-normal)",
      }}
    >
      {/* Minimal Top Bar */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--surface-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <BrandMark size={28} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ThemeToggle />
          <Link
            to="/"
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Return to Public Site
          </Link>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            width: "100%",
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border-strong)",
            borderRadius: "var(--radius-xl)",
            padding: "36px 32px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(117, 103, 248, 0.15)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <KeyRound size={26} />
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
              Administrator Portal
            </h1>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Secure access for reviewing reported scam incidents and managing platform safety.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "var(--radius-md)",
                  color: "#FCA5A5",
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <AlertTriangle size={16} style={{ color: "#EF4444", flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                Administrator Username or Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="text"
                  placeholder="admin@scamtrace.dev"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                    fontSize: 14,
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
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
                gap: 8,
                opacity: loading ? 0.75 : 1,
                boxShadow: "0 4px 14px var(--accent-glow)",
              }}
            >
              {loading ? "Authenticating..." : "Sign In to Admin Console"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Discreet Credentials Hint for Evaluation */}
          <div
            style={{
              marginTop: 24,
              padding: "12px 14px",
              background: "var(--surface-elevated)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-md)",
              fontSize: 12,
              color: "var(--text-muted)",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Demo Admin Credentials: <strong style={{ color: "var(--text-secondary)" }}>admin@scamtrace.dev</strong> / <strong style={{ color: "var(--text-secondary)" }}>admin123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
