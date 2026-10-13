import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import {
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    newReports: 0,
    underReview: 0,
    confirmedScams: 0,
    dismissedOrDuplicate: 0,
  });
  const [recentReports, setRecentReports] = useState([]);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, reportsRes] = await Promise.all([
        api.admin.getStats(),
        api.admin.getReports({ limit: 5 }),
      ]);

      if (statsRes && statsRes.summary) {
        setStats(statsRes.summary);
      } else if (statsRes && statsRes.stats) {
        setStats({
          total: statsRes.stats.total || 0,
          newReports: statsRes.stats.newReports || 0,
          underReview: statsRes.stats.underReview || 0,
          confirmedScams: statsRes.stats.confirmedScams || 0,
          dismissedOrDuplicate: statsRes.stats.dismissedOrDuplicate || 0,
        });
      }

      if (reportsRes && reportsRes.reports) {
        setRecentReports(reportsRes.reports);
      }
    } catch (err) {
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const metricCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: FileText,
      color: "var(--accent)",
      bg: "var(--accent-glow)",
      border: "var(--accent-border)",
      filter: "ALL",
    },
    {
      title: "New Reports",
      value: stats.newReports,
      icon: Clock,
      color: "var(--status-review)",
      bg: "var(--status-review-bg)",
      border: "var(--status-review-bg)",
      filter: "RECEIVED",
    },
    {
      title: "Under Review",
      value: stats.underReview,
      icon: Eye,
      color: "var(--status-disputed)",
      bg: "var(--status-disputed-bg)",
      border: "var(--status-disputed-bg)",
      filter: "UNDER_REVIEW",
    },
    {
      title: "Confirmed Scams",
      value: stats.confirmedScams,
      icon: CheckCircle2,
      color: "var(--status-corroborated)",
      bg: "var(--status-corroborated-bg)",
      border: "var(--status-corroborated-bg)",
      filter: "CORROBORATED",
    },
    {
      title: "Dismissed / Duplicate",
      value: stats.dismissedOrDuplicate,
      icon: XCircle,
      color: "var(--text-muted)",
      bg: "var(--bg-subtle)",
      border: "var(--surface-border)",
      filter: "REJECTED",
    },
  ];

  const getStatusBadge = (status) => {
    const s = String(status || "").toUpperCase();
    if (s === "RECEIVED" || s === "NEW") {
      return { label: "New", color: "var(--status-review)", bg: "var(--status-review-bg)" };
    }
    if (s === "UNDER_REVIEW") {
      return { label: "Under Review", color: "var(--status-disputed)", bg: "var(--status-disputed-bg)" };
    }
    if (s === "CORROBORATED" || s === "PUBLISHED" || s === "CONFIRMED_SCAM") {
      return { label: "Confirmed Scam", color: "var(--status-corroborated)", bg: "var(--status-corroborated-bg)" };
    }
    if (s === "REJECTED" || s === "DISMISSED") {
      return { label: "Dismissed", color: "var(--risk-high)", bg: "var(--risk-high-bg)" };
    }
    if (s === "DISPUTED" || s === "DUPLICATE") {
      return { label: "Duplicate", color: "var(--text-muted)", bg: "var(--bg-subtle)" };
    }
    return { label: status, color: "var(--text-muted)", bg: "var(--bg-subtle)" };
  };

  return (
    <div style={{ padding: "32px 24px 60px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      {/* Page Title & Refresh */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
            Incident Management Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Overview of community-submitted scam reports and verification workflow.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-secondary)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Stats
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            background: "var(--risk-high-bg)",
            border: "1px solid var(--risk-high-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--risk-high)",
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {/* ─── 5 Primary Metric Cards (Phase 6) ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: 16,
          marginBottom: 36,
        }}
      >
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={`/admin/reports?status=${card.filter}`}
              style={{
                background: "var(--surface-card)",
                border: `1px solid ${card.border}`,
                borderRadius: "var(--radius-lg)",
                padding: "20px 18px",
                display: "block",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>
                  {card.title}
                </span>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-sm)",
                    background: card.bg,
                    color: card.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)" }}>
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Recent Reported Scams Quick Table ─── */}
      <div
        className="card"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--surface-border)",
          borderRadius: "var(--radius-xl)",
          padding: "24px 24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              Recent Reported Scams
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Latest submissions awaiting review or updated recently.
            </p>
          </div>

          <Link
            to="/admin/reports"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--accent)",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            View All Reports
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentReports.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>
            No reports found in database.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--surface-border)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Reference ID</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Type</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Platform / Target</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Status</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600 }}>Date</th>
                  <th style={{ padding: "12px 14px", fontWeight: 600, textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => {
                  const badge = getStatusBadge(r.status);
                  return (
                    <tr
                      key={r.id}
                      style={{ borderBottom: "1px solid var(--surface-border)", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)" }}>
                        {r.id.slice(0, 12)}...
                      </td>
                      <td style={{ padding: "14px", textTransform: "capitalize", fontWeight: 600 }}>
                        {r.contentType || "General"}
                      </td>
                      <td style={{ padding: "14px", color: "var(--text-primary)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.platform || "Web / Online"}
                      </td>
                      <td style={{ padding: "14px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: 11,
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: "14px", color: "var(--text-muted)", fontSize: 12 }}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "14px", textAlign: "right" }}>
                        <Link
                          to="/admin/reports"
                          style={{
                            padding: "6px 12px",
                            background: "var(--surface-elevated)",
                            border: "1px solid var(--surface-border)",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--accent)",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
