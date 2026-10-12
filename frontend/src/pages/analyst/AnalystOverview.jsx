import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import RiskBadge from "../../components/RiskBadge";
import StatusBadge from "../../components/StatusBadge";
import {
  Inbox,
  AlertTriangle,
  GitCompare,
  Tag,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  Layers,
  Database,
} from "lucide-react";

export default function AnalystOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.admin.getStats();
      if (res && res.success) {
        setStats(res.stats);
      } else {
        setError(res?.message || "Failed to load intelligence stats.");
      }
    } catch (err) {
      setError(err?.message || "Failed to contact admin stats API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReconnect = async () => {
    try {
      setLoading(true);
      await api.auth.login("analyst@scamtrace.dev", "analyst123");
      await fetchStats();
    } catch (err) {
      setError(err?.message || "Failed to reconnect session.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: 400 }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 40, maxWidth: 540, margin: "40px auto" }}>
        <AlertTriangle size={36} style={{ color: "var(--risk-high)", marginBottom: 12 }} />
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>
          Unable to Load Overview
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 20 }}>
          {error || "Could not retrieve analyst metrics from server."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={fetchStats} className="btn btn-secondary btn-sm">
            Try Again
          </button>
          <button onClick={handleReconnect} className="btn btn-primary btn-sm">
            ⚡ Reconnect Analyst Session
          </button>
        </div>
      </div>
    );
  }

  // Calculate pending queue count
  const receivedCount =
    stats.reportsByStatus?.find((s) => s.status === "RECEIVED")?.count || 0;
  const underReviewCount =
    stats.reportsByStatus?.find((s) => s.status === "UNDER_REVIEW")?.count || 0;
  const publishedCount =
    stats.reportsByStatus?.find((s) => s.status === "PUBLISHED")?.count || 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Top Overview Banner ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
            Intelligence Desk Overview
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
            Triage queue status, technical indicator index health, and cross-incident correlation workload.
          </p>
        </div>

        <Link to="/analyst/queue" className="btn btn-primary" style={{ fontSize: 13 }}>
          <Inbox size={15} />
          <span>Open Triage Queue ({receivedCount + underReviewCount} Pending)</span>
        </Link>
      </div>

      {/* ── Key Operational Metrics ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {/* Metric 1 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Triage Queue Pending</span>
            <Inbox size={16} style={{ color: "var(--accent)" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF" }}>
            {receivedCount + underReviewCount}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            {receivedCount} unassigned • {underReviewCount} in investigation
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Total Verified Published</span>
            <CheckCircle2 size={16} style={{ color: "#10B981" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#10B981" }}>
            {publishedCount}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Live in community intelligence
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Indexed Indicators</span>
            <Tag size={16} style={{ color: "#60A5FA" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#60A5FA" }}>
            {stats.totalIndicators || 0}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Domains, phones, tactics & phrases
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Scam DNA Matches</span>
            <GitCompare size={16} style={{ color: "#F59E0B" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B" }}>
            {stats.totalDNAMatches || 0}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Correlated cross-report clusters
          </div>
        </div>
      </div>

      {/* ── Two-Column Breakdown ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
        {/* Reports by Lifecycle Status */}
        <div className="card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={16} style={{ color: "var(--accent)" }} />
            <span>Reports by Lifecycle Status</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {stats.reportsByStatus?.map((item, idx) => (
              <Link
                key={idx}
                to={`/analyst/queue?status=${item.status}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  background: "#0D1326",
                  border: "1px solid var(--surface-border)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                className="hover-card"
              >
                <StatusBadge status={item.status} />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
                  {item.count} report{item.count !== 1 ? "s" : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Reports by Risk Level & Content Type */}
        <div className="card">
          <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldAlert size={16} style={{ color: "var(--accent)" }} />
            <span>Severity & Ingestion Category</span>
          </h2>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Severity Breakdown:</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {stats.reportsByRisk?.map((r, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#0D1326",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--surface-border)",
                  }}
                >
                  <RiskBadge level={r.riskLevel} size="sm" />
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Channel / Type Breakdown:</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {stats.reportsByType?.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#0D1326",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--surface-border)",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{t.contentType}: </span>
                  <strong style={{ color: "#FFFFFF" }}>{t.count}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
