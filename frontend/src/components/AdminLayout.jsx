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
            height: 64,
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
                background: "rgba(117, 103, 248, 0.2)",
                border: "1px solid rgba(117, 103, 248, 0.4)",
                color: "#C7D2FE",
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
                    background: isActive ? "rgba(117, 103, 248, 0.16)" : "transparent",
                    border: isActive ? "1px solid rgba(117, 103, 248, 0.3)" : "1px solid transparent",
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
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                borderRadius: "var(--radius-sm)",
                color: "#FCA5A5",
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
