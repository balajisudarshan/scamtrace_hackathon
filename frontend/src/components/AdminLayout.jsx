import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BrandMark } from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import {
  LayoutDashboard,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Shield,
  User,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/admin/login");
  };

  const navLinks = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Reported Scams", path: "/admin/reports", icon: ShieldAlert },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)", transition: "background-color var(--transition-normal)" }}>
      {/* ─── Admin Navigation Header ─── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--nav-bg)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--surface-border)",
          transition: "background-color var(--transition-normal)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            height: 62,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand + Admin Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Link to="/admin/dashboard" style={{ display: "flex", alignItems: "center" }}>
              <BrandMark size={28} />
            </Link>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "var(--radius-sm)",
                background: "var(--accent-subtle)",
                border: "1px solid var(--accent-glow)",
                color: "var(--accent)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Admin Console
            </span>
          </div>

          {/* Admin Navigation: Dashboard | Reported Scams */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path === "/admin/dashboard" && location.pathname === "/admin");
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: "var(--radius-md)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    background: isActive ? "var(--accent-subtle)" : "transparent",
                    border: isActive ? "1px solid var(--accent)" : "1px solid transparent",
                    transition: "var(--transition-fast)",
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? "var(--accent)" : "inherit" }} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle, User Info & Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeToggle />

            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--surface-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                }}
              >
                <User size={15} />
              </div>
              <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email || "admin"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                background: "var(--risk-high-bg)",
                border: "1px solid var(--risk-high-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--risk-high)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "var(--transition-fast)",
              }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content Outlet ─── */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
