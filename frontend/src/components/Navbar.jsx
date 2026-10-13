import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  AtSign,
  PlusCircle,
  Home,
  LogOut,
  LogIn,
  Menu,
  X,
  LayoutDashboard,
  Lock,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
          stroke="#A5B4FC"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="15" r="1.8" fill="#FFFFFF" />
        <circle cx="12" cy="18" r="1.3" fill="#818CF8" />
        <circle cx="20" cy="18" r="1.3" fill="#818CF8" />
        <defs>
          <linearGradient id="shield-nav-grad" x1="6" y1="3" x2="26" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#A5B4FC" />
            <stop offset="1" stopColor="#7567F8" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: "var(--text-primary)",
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
          Risk Protection
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--surface-border)",
        background: "var(--bg-base)",
        padding: "32px 20px 24px",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontSize: 13,
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandMark size={20} />
          <span>© {new Date().getFullYear()} SCAMTRACE. Digital Risk & Impersonation Protection.</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <Link to="/social-check" style={{ color: "var(--text-secondary)" }}>Social Account Check</Link>
          <Link to="/app-check" style={{ color: "var(--text-secondary)" }}>Mobile App Check</Link>
          <Link to="/logo-check" style={{ color: "var(--text-secondary)" }}>Check a Logo</Link>
          <Link to="/report" style={{ color: "var(--text-secondary)" }}>Report a Scam</Link>
          {/* Discreet Admin Portal Link */}
          <Link
            to="/admin/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              color: "var(--text-muted)",
              fontSize: 12,
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Lock size={11} />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Navbar() {
  const { user, isAdmin, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Phase 8: Public navigation — Home | Social Account Check | Mobile App Check | Check a Logo | Report a Scam
  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Social Account Check", path: "/social-check", icon: AtSign },
    { label: "Mobile App Check", path: "/app-check", icon: Smartphone },
    { label: "Check a Logo", path: "/logo-check", icon: Sparkles },
    { label: "Report a Scam", path: "/report", icon: PlusCircle },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--surface-border)",
        transition: "background-color var(--transition-normal)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 20px",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <BrandMark />
        </Link>

        {/* Public Desktop Navigation */}
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
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--surface-card)" : "transparent",
                  border: isActive
                    ? "1px solid var(--surface-border-strong)"
                    : "1px solid transparent",
                  transition: "all var(--transition-fast)",
                }}
              >
                <Icon size={15} style={{ color: isActive ? "var(--accent)" : "inherit" }} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle, Admin Dashboard Link, Sign In / Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle />

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-md)",
                background: "rgba(117, 103, 248, 0.15)",
                border: "1px solid rgba(117, 103, 248, 0.35)",
                color: "#C7D2FE",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <LayoutDashboard size={14} style={{ color: "var(--accent)" }} />
              <span>Admin Dashboard</span>
            </Link>
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
            <Link to="/admin/login" className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
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
            background: "var(--surface-elevated)",
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
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  background: isActive ? "var(--surface-card)" : "transparent",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <Icon size={16} />
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
