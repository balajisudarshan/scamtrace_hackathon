import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import {
  Radar,
  Calendar,
  Layers,
  Globe,
  Phone,
  Tag,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function AnalystRadarPage() {
  const [days, setDays] = useState(30);
  const [radarData, setRadarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.admin
      .getPatternRadar(days)
      .then((res) => {
        if (isMounted && res.success) {
          setRadarData(res);
        } else {
          setError(res?.message || "Failed to load Pattern Radar data.");
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Error contacting Pattern Radar API.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [days]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
            <Radar size={14} />
            <span>THREAT SYNDICATE RADAR</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
            Pattern Radar & Tactic Clusters
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
            Real-time clustering of recurring phishing domains, active phone campaigns, and psychological manipulation tactics.
          </p>
        </div>

        {/* Window Selector */}
        <div style={{ display: "flex", gap: 6, background: "var(--bg-subtle)", padding: "4px", borderRadius: "8px", border: "1px solid var(--surface-border)" }}>
          {[14, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: days === d ? "var(--accent)" : "transparent",
                color: days === d ? "#FFFFFF" : "var(--text-secondary)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Last {d} Days
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: 400 }}>
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--risk-high)" }}>
          {error}
        </div>
      ) : radarData ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Top Tactic Clusters & Active Domains Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
            {/* Top Recurring Tactics */}
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <TrendingUp size={16} style={{ color: "var(--accent)" }} />
                <span>Recurring Tactic Clusters ({radarData.tactics?.length || 0})</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {radarData.tactics?.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>
                        {t.tactic?.replace(/_/g, " ")}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        background: "rgba(117,103,248,0.15)",
                        color: "var(--accent)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {t.reportCount} incidents
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Phishing Domains */}
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Globe size={16} style={{ color: "var(--risk-high)" }} />
                <span>High-Frequency Phishing Domains ({radarData.domains?.length || 0})</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {radarData.domains?.map((d, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        {d.domain}
                      </span>
                      {d.metadata?.brand && (
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                          Targeting: {d.metadata.brand}
                        </div>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        background: "var(--risk-high-bg)",
                        color: "var(--risk-high)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {d.reportCount} incidents
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phone Campaigns & Target Platforms Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
            {/* Active Phone Campaigns */}
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Phone size={16} style={{ color: "var(--risk-caution)" }} />
                <span>Active Fraudulent Phone Numbers</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {radarData.phones?.length > 0 ? (
                  radarData.phones.map((p, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--surface-border)",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: "monospace" }}>
                          {p.phone}
                        </span>
                        {p.metadata?.campaign && (
                          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                            Campaign: {p.metadata.campaign}
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--risk-caution)" }}>
                        {p.reportCount} reports
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No high-frequency phone numbers in this window.</p>
                )}
              </div>
            </div>

            {/* Ingestion Platforms */}
            <div className="card">
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Layers size={16} style={{ color: "var(--accent)" }} />
                <span>Target Delivery Channels</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {radarData.platforms?.map((plat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                      {plat.platform || "Direct Web"}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>
                      {plat.reportCount} reports
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
