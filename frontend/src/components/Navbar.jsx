import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Users,
  LifeBuoy,
  BarChart3,
  Terminal,
  LogOut,
  LogIn,
  Menu,
  X,
  PlusCircle,
} from "lucide-react";

export function BrandMark({ size = 28 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 3L6 7.2V15C6 21.6 10.3 27.7 16 29C21.7 27.7 26 21.6 26 15V7.2L16 3Z"
          stroke="url(#shield-nav-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 9V15L12 18M16 15L20 18"
          stroke="#93C5FD"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="15" r="1.8" fill="#FFFFFF" />
        <circle cx="12" cy="18" r="1.3" fill="#3B82F6" />
        <circle cx="20" cy="18" r="1.3" fill="#3B82F6" />
        <defs>
          <linearGradient id="shield-nav-grad" x1="6" y1="3" x2="26" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#93C5FD" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: "#FFFFFF",
            lineHeight: 1,
          }}
        >
          SCAM<span style={{ color: "var(--accent)" }}>TRACE</span>
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.12em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          Protect Portal
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { user, isAnalyst, loginEmail, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Check Scam", path: "/check", icon: Search },
    { label: "Brand Monitor", path: "/brand-monitor", icon: ShieldCheck },
    { label: "Report Scam", path: "/report", icon: PlusCircle },
    { label: "Emergency Help", path: "/damage-control", icon: LifeBuoy },
    { label: "Community Intel", path: "/community", icon: Users },
    { label: "Trends", path: "/pulse", icon: BarChart3 },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleQuickAnalystDemo = async () => {
    try {
      const res = await loginEmail("analyst@scamtrace.dev", "analyst123");
      if (res?.success) {
        navigate("/analyst");
      }
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(11, 16, 32, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--surface-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <BrandMark />
        </Link>

        {/* Desktop Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: 4,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--surface-card)" : "transparent",
                  border: isActive
                    ? "1px solid var(--surface-border-strong)"
                    : "1px solid transparent",
                  transition: "all var(--transition-fast)",
                }}
              >
                <Icon size={14} style={{ color: isActive ? "var(--accent)" : "inherit" }} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Quick Analyst Desk Switcher */}
          {isAnalyst ? (
            <Link
              to="/analyst"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-md)",
                background: "var(--surface-card)",
                border: "1px solid var(--surface-border)",
                color: "var(--text-primary)",
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <Terminal size={14} style={{ color: "var(--accent)" }} />
              <span>Analyst Desk</span>
            </Link>
          ) : (
            <button
              onClick={handleQuickAnalystDemo}
              title="Test the restricted Analyst Desk"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface-card)",
                border: "1px solid var(--surface-border)",
                color: "var(--text-secondary)",
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Terminal size={12} />
              <span>Analyst Mode</span>
            </button>
          )}

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                {user.firstName || user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Sign out"
                style={{ padding: "5px 8px" }}
              >
                <LogOut size={13} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
              <LogIn size={13} />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-outline btn-sm mobile-menu-btn"
            style={{ display: "none", padding: "6px 8px" }}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            background: "#0E1428",
            borderBottom: "1px solid var(--surface-border)",
            padding: "14px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: "var(--radius-md)",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  background: isActive ? "var(--surface-card)" : "transparent",
                  fontSize: 13,
                }}
              >
                <Icon size={15} />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
