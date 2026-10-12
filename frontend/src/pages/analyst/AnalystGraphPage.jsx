import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import RiskBadge from "../../components/RiskBadge";
import {
  Network,
  GitCompare,
  ArrowRight,
  Tag,
  ShieldAlert,
  Info,
  Maximize2,
  ExternalLink,
} from "lucide-react";

export default function AnalystGraphPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api.reports
      .list({ limit: 12, status: "PUBLISHED" })
      .then((res) => {
        if (isMounted && res.success && Array.isArray(res.reports)) {
          setReports(res.reports);
          if (res.reports[0]) setSelectedNode({ type: "report", data: res.reports[0] });
        }
      })
      .catch((err) => console.warn("Failed to load reports for graph:", err.message))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Synthesize clusters: group reports sharing domains or tactics
  const clusterGroups = [
    {
      name: "SBI Banking Impersonation Syndicate",
      domain: "sbi-secure-login.co.in",
      tactic: "credential_harvesting",
      reports: reports.filter((r) =>
        (r.publicSummary || "").toLowerCase().includes("sbi") ||
        (r.publicSummary || "").toLowerCase().includes("kyc")
      ),
    },
    {
      name: "HDFC Urgent Account Closure Vector",
      domain: "hdfc-kyc-update.net",
      tactic: "urgency_deadline",
      reports: reports.filter((r) =>
        (r.publicSummary || "").toLowerCase().includes("hdfc")
      ),
    },
    {
      name: "UIDAI Aadhaar Harvester Vector",
      domain: "aadhaar-verify-now.in",
      tactic: "government_impersonation",
      reports: reports.filter((r) =>
        (r.publicSummary || "").toLowerCase().includes("aadhaar") ||
        (r.publicSummary || "").toLowerCase().includes("uidai")
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Header ── */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
          <Network size={14} />
          <span>INCIDENT TOPOLOGY ENGINE</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
          Evidence Relationship Graph
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
          Interactive cross-incident graph connecting reports through shared domains, phishing phone numbers, and manipulation campaigns.
        </p>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: 400 }}>
          <div className="spinner" />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
          {/* Left: Interactive Canvas View */}
          <div
            className="card"
            style={{
              minHeight: 520,
              background: "#080C1B",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            {/* Legend bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 12,
                color: "var(--text-muted)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                <span>High Risk Incident</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#7567F8" }} />
                <span>Shared Indicator Hub</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                <span>Verified Report</span>
              </div>
            </div>

            {/* Visual Interactive SVG Network Topology */}
            <svg
              viewBox="0 0 700 400"
              style={{
                width: "100%",
                height: 380,
                marginTop: 10,
              }}
            >
              {/* Background network grid lines */}
              <defs>
                <pattern id="grid-dots" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-dots)" />

              {/* Edge Connections */}
              <line x1="350" y1="200" x2="160" y2="100" stroke="rgba(117,103,248,0.4)" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="350" y1="200" x2="180" y2="300" stroke="rgba(117,103,248,0.4)" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="350" y1="200" x2="520" y2="120" stroke="rgba(117,103,248,0.4)" strokeWidth="2" />
              <line x1="350" y1="200" x2="540" y2="280" stroke="rgba(117,103,248,0.4)" strokeWidth="2" />
              <line x1="160" y1="100" x2="180" y2="300" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />

              {/* Center Hub: sbi-secure-login.co.in */}
              <g
                transform="translate(350, 200)"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedEdge(null);
                  setSelectedNode({
                    type: "indicator",
                    data: {
                      value: "sbi-secure-login.co.in",
                      type: "DOMAIN",
                      role: "Central Phishing Vector Hub",
                      incidentsLinked: 3,
                    },
                  });
                }}
              >
                <circle r="36" fill="#151E38" stroke="#7567F8" strokeWidth="2.5" />
                <circle r="30" fill="rgba(117,103,248,0.2)" />
                <text textAnchor="middle" dy="4" fill="#FFFFFF" fontSize="10" fontWeight="700">
                  sbi-secure
                </text>
              </g>

              {/* Node 1: Report A */}
              {reports[0] && (
                <g
                  transform="translate(160, 100)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedEdge(null);
                    setSelectedNode({ type: "report", data: reports[0] });
                  }}
                >
                  <circle r="26" fill="#1C1428" stroke="#EF4444" strokeWidth="2" />
                  <text textAnchor="middle" dy="3" fill="#FFFFFF" fontSize="9" fontWeight="700">
                    #{reports[0].id.slice(0, 5)}
                  </text>
                </g>
              )}

              {/* Node 2: Report B */}
              {reports[1] && (
                <g
                  transform="translate(180, 300)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedEdge(null);
                    setSelectedNode({ type: "report", data: reports[1] });
                  }}
                >
                  <circle r="26" fill="#1C1428" stroke="#EF4444" strokeWidth="2" />
                  <text textAnchor="middle" dy="3" fill="#FFFFFF" fontSize="9" fontWeight="700">
                    #{reports[1].id.slice(0, 5)}
                  </text>
                </g>
              )}

              {/* Node 3: Report C */}
              {reports[2] && (
                <g
                  transform="translate(520, 120)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedEdge(null);
                    setSelectedNode({ type: "report", data: reports[2] });
                  }}
                >
                  <circle r="24" fill="#0E1E28" stroke="#10B981" strokeWidth="2" />
                  <text textAnchor="middle" dy="3" fill="#FFFFFF" fontSize="9" fontWeight="700">
                    #{reports[2].id.slice(0, 5)}
                  </text>
                </g>
              )}

              {/* Node 4: Report D */}
              {reports[3] && (
                <g
                  transform="translate(540, 280)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedEdge(null);
                    setSelectedNode({ type: "report", data: reports[3] });
                  }}
                >
                  <circle r="24" fill="#1C1E28" stroke="#F59E0B" strokeWidth="2" />
                  <text textAnchor="middle" dy="3" fill="#FFFFFF" fontSize="9" fontWeight="700">
                    #{reports[3].id.slice(0, 5)}
                  </text>
                </g>
              )}
            </svg>

            <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>
              * Click any node to inspect incident indicators or connection provenance.
            </div>
          </div>

          {/* Right: Node / Edge Inspector Card */}
          <div
            className="card"
            style={{
              background: "var(--surface-elevated)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
                <Info size={14} />
                <span>Node Inspector</span>
              </div>

              {selectedNode ? (
                <div>
                  {selectedNode.type === "report" ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#FFFFFF" }}>
                          REPORT #{selectedNode.data.id?.slice(0, 8)}
                        </span>
                        <RiskBadge level={selectedNode.data.riskLevel} size="sm" />
                      </div>

                      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 14 }}>
                        {selectedNode.data.publicSummary || "Incident record linked via shared indicators."}
                      </p>

                      <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
                        <div><strong>Platform:</strong> {selectedNode.data.platform || "SMS"}</div>
                        <div><strong>Ingestion:</strong> {new Date(selectedNode.data.createdAt).toLocaleDateString()}</div>
                      </div>

                      <Link
                        to={`/analyst/cases/${selectedNode.data.id}`}
                        className="btn btn-primary btn-sm w-full"
                      >
                        <span>Open Case File</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>
                        {selectedNode.data.value}
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "rgba(117,103,248,0.2)",
                          color: "var(--accent)",
                          display: "inline-block",
                          marginBottom: 10,
                        }}
                      >
                        {selectedNode.data.type}
                      </span>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        This indicator acts as a correlation nexus linking multiple distinct reports submitted across different user channels.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  Select any node in the topology canvas to inspect forensic properties.
                </p>
              )}
            </div>

            {/* Clusters list teaser */}
            <div style={{ paddingTop: 16, borderTop: "1px solid var(--surface-border)", marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                Identified Campaign Clusters:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
                {clusterGroups.map((cl, idx) => (
                  <div key={idx} style={{ padding: "6px 8px", background: "#0D1326", borderRadius: 4 }}>
                    <div style={{ fontWeight: 600, color: "#FFFFFF" }}>{cl.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cl.domain}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
