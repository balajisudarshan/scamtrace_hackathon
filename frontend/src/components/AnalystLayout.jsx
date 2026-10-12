import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  LayoutDashboard,
  Inbox,
  GitCompare,
  Network,
  Radar,
  ScrollText,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Terminal,
  Clock,
} from "lucide-react";

export default function AnalystLayout() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const analystNav = [
    { label: "Overview", path: "/analyst", exact: true, icon: LayoutDashboard },
    { label: "Triage Queue", path: "/analyst/queue", icon: Inbox },
    { label: "Scam DNA Compare", path: "/analyst/dna", icon: GitCompare },
    { label: "Relationship Graph", path: "/analyst/graph", icon: Network },
    { label: "Pattern Radar", path: "/analyst/radar", icon: Radar },
    { label: "Audit Log", path: "/analyst/audit", icon: ScrollText },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#080C1A" }}>
      {/* ── Top Analyst Desk Security Bar ── */}
      <header
        style={{
          height: 56,
          background: "var(--bg-base)",
          borderBottom: "1px solid var(--surface-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Brand Mark */}
          <Link
            to="/analyst"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "6px",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <Terminal size={15} />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.04em" }}>
                SCAM<span style={{ color: "var(--accent)" }}>TRACE</span>
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#93C5FD",
                  background: "rgba(59, 130, 246, 0.12)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Intelligence Desk
              </span>
            </div>
          </Link>

          {/* Security classification tag */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "#EF4444",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 600,
            }}
            className="md-flex"
          >
            <ShieldAlert size={12} />
            RESTRICTED // ANALYST ACCESS ONLY
          </div>
        </div>

        {/* Right tools */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Switch to Protect */}
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--text-secondary)",
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--surface-border)",
              background: "rgba(255, 255, 255, 0.03)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={13} /> Protect Public View
          </Link>

          {/* Analyst profile badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              background: "#11182B",
              border: "1px solid var(--surface-border)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "var(--accent)",
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(user?.firstName || user?.email || "A")[0].toUpperCase()}
            </div>
            <div style={{ fontSize: 12 }}>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                {user?.firstName || user?.email?.split("@")[0]}
              </span>
              <span style={{ marginLeft: 6, fontSize: 10, color: "var(--accent)", fontWeight: 700 }}>
                [{user?.role || "ANALYST"}]
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ padding: "6px 8px" }}
            title="Logout"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* ── Sub-navigation bar with portal tabs ── */}
      <nav
        style={{
          background: "#0A0F21",
          borderBottom: "1px solid var(--surface-border)",
          padding: "0 20px",
          display: "flex",
          gap: 4,
          overflowX: "auto",
        }}
      >
        {analystNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `analyst-tab-link ${isActive ? "active" : ""}`
              }
              style={({ isActive }) => ({
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                borderBottom: isActive
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              })}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ── Main Viewport Content ── */}
      <main style={{ flex: 1, padding: "24px 20px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
        <Outlet />
      </main>

      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
        }
        .analyst-tab-link:hover {
          color: #FFFFFF !important;
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
}
