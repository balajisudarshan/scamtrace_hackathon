import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import {
  BarChart3,
  Calendar,
  Layers,
  Activity,
  ShieldAlert,
  Info,
  Clock,
  TrendingUp,
  Tag,
  Radio,
} from "lucide-react";

export default function ScamPulsePage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [indicatorData, setIndicatorData] = useState([]);
  const [selectedIndType, setSelectedIndType] = useState("TACTIC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      api.trends.get({ days }),
      api.trends.getIndicators({ type: selectedIndType, days }),
    ])
      .then(([trendsRes, indRes]) => {
        if (isMounted) {
          if (trendsRes.success) setData(trendsRes);
          if (indRes.success) setIndicatorData(indRes.indicators || []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load trend data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [days, selectedIndType]);

  const summary = data?.summary || {};
  const meta = data?.meta || {};
  const topTactics = data?.topTactics || [];
  const topPlatforms = data?.topPlatforms || [];
  const dailyTrends = data?.dailyTrends || [];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
              <Radio size={14} className="pulse" />
              <span>COMMUNITY THREAT PULSE</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
              ScamPulse Trend Monitor
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              Aggregate volume, emerging manipulation tactics, and delivery channel distribution from live backend reports.
            </p>
          </div>

          {/* Time Window Buttons */}
          <div style={{ display: "flex", gap: 6, background: "#0E1428", padding: "4px", borderRadius: "8px", border: "1px solid var(--surface-border)" }}>
            {[
              { label: "Last 7 Days", val: 7 },
              { label: "Last 30 Days", val: 30 },
              { label: "Last 90 Days", val: 90 },
            ].map((w) => (
              <button
                key={w.val}
                onClick={() => setDays(w.val)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: days === w.val ? "var(--accent)" : "transparent",
                  color: days === w.val ? "#FFFFFF" : "var(--text-secondary)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Methodology Transparency Notice ─── */}
        <div
          style={{
            background: "#0D1326",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 24,
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Info size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <span>
              {meta.note || "Counts represent submitted community reports and seeded demo data — not confirmed real-world scam incidents."}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>Sample size: <strong style={{ color: "var(--text-primary)" }}>{meta.sampleSize || 0} reports</strong></span>
            {meta.lastUpdated && (
              <span>Updated: <strong style={{ color: "var(--text-primary)" }}>{new Date(meta.lastUpdated).toLocaleTimeString()}</strong></span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex-center" style={{ minHeight: 300 }}>
            <div className="spinner" />
          </div>
        ) : error ? (
          <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--risk-high)" }}>
            {error}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* ─── Top Stats Grid ─── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              <div className="card">
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Total Submissions</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF" }}>{summary.totalReports || 0}</div>
                <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 4 }}>
                  In past {days} days
                </div>
              </div>

              <div className="card">
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>High Risk Volume</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#EF4444" }}>{summary.highRisk || 0}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                  {summary.totalReports ? `${Math.round(((summary.highRisk || 0) / summary.totalReports) * 100)}% of total` : "0%"}
                </div>
              </div>

              <div className="card">
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Needs Caution</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#F59E0B" }}>{summary.needsCaution || 0}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                  Moderate signal level
                </div>
              </div>

              <div className="card">
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Published / Verified</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#10B981" }}>{summary.published || 0}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                  Approved by analyst desk
                </div>
              </div>
            </div>

            {/* ─── Middle Section: Top Tactics & Platforms ─── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                gap: 20,
              }}
            >
              {/* Top Tactics */}
              <div className="card">
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <TrendingUp size={16} style={{ color: "var(--accent)" }} />
                  <span>Top Manipulation Tactics Detected</span>
                </h2>

                {topTactics.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {topTactics.map((tac, idx) => {
                      const maxCount = topTactics[0]?.count || 1;
                      const pct = Math.round((tac.count / maxCount) * 100);
                      return (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>
                              {tac.tactic?.replace(/_/g, " ")}
                            </span>
                            <span style={{ color: "var(--text-muted)" }}>{tac.count} reports</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 3, background: "#0D1326", overflow: "hidden" }}>
                            <div
                              style={{
                                height: "100%",
                                width: `${pct}%`,
                                background: "linear-gradient(90deg, #7567F8, #A5B4FC)",
                                borderRadius: 3,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                    No tactic cluster data recorded for this period.
                  </div>
                )}
              </div>

              {/* Delivery Channels */}
              <div className="card">
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Layers size={16} style={{ color: "var(--accent)" }} />
                  <span>Delivery Channels Breakdown</span>
                </h2>

                {topPlatforms.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {topPlatforms.map((plat, idx) => {
                      const maxCount = topPlatforms[0]?.count || 1;
                      const pct = Math.round((plat.count / maxCount) * 100);
                      return (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                              {plat.platform || "Direct Web"}
                            </span>
                            <span style={{ color: "var(--text-muted)" }}>{plat.count} reports</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 3, background: "#0D1326", overflow: "hidden" }}>
                            <div
                              style={{
                                height: "100%",
                                width: `${pct}%`,
                                background: "linear-gradient(90deg, #3B82F6, #60A5FA)",
                                borderRadius: 3,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
                    No platform distribution recorded for this period.
                  </div>
                )}
              </div>
            </div>

            {/* ─── Indicator Frequency Explorer ─── */}
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag size={16} style={{ color: "var(--accent)" }} />
                    <span>Active Threat Indicators Frequency</span>
                  </h2>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Real indicator counts grouped by type from backend indicator indices
                  </p>
                </div>

                <div style={{ display: "flex", gap: 6 }}>
                  {["TACTIC", "DOMAIN", "PHONE", "PHRASE"].map((it) => (
                    <button
                      key={it}
                      onClick={() => setSelectedIndType(it)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: "4px",
                        border: "1px solid var(--surface-border)",
                        background: selectedIndType === it ? "var(--surface-card)" : "transparent",
                        color: selectedIndType === it ? "#FFFFFF" : "var(--text-secondary)",
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {it}
                    </button>
                  ))}
                </div>
              </div>

              {indicatorData.length > 0 ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Indicator Value</th>
                        <th>Type</th>
                        <th>Appears in Reports</th>
                        <th>First Seen</th>
                        <th>Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indicatorData.map((ind, idx) => (
                        <tr key={idx}>
                          <td style={{ fontFamily: "monospace", color: "#F8FAFC", fontWeight: 500 }}>
                            {ind.value}
                          </td>
                          <td>
                            <span style={{ fontSize: 10, background: "rgba(117,103,248,0.15)", color: "var(--accent)", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                              {selectedIndType}
                            </span>
                          </td>
                          <td style={{ fontWeight: 600 }}>{ind.reportCount} incidents</td>
                          <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                            {ind.firstSeen ? new Date(ind.firstSeen).toLocaleDateString() : "—"}
                          </td>
                          <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                            {ind.lastSeen ? new Date(ind.lastSeen).toLocaleDateString() : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "30px 0" }}>
                  No indicators of type {selectedIndType} registered in this time window.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
