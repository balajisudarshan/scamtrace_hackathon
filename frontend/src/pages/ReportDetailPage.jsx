import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import StatusBadge from "../components/StatusBadge";
import ReportTimeline from "../components/ReportTimeline";
import StoryModeVisualizer from "../components/StoryModeVisualizer";
import DNAMatchCard from "../components/DNAMatchCard";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Globe,
  Tag,
  ShieldAlert,
  GitCompare,
  Lock,
  ExternalLink,
  HelpCircle,
  Terminal,
} from "lucide-react";

export default function ReportDetailPage() {
  const { id } = useParams();
  const { isAnalyst } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.reports
      .get(id)
      .then((res) => {
        if (isMounted && res.success) {
          setData(res);
        } else {
          setError(res?.message || "Report could not be found.");
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load report details.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
        <Navbar />
        <div className="flex-center" style={{ flex: 1 }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error || !data?.report) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
        <Navbar />
        <main style={{ flex: 1, padding: "60px 20px", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <ShieldAlert size={40} style={{ color: "var(--risk-high)", marginBottom: 16 }} />
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Incident Report Not Found</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            {error || "The requested incident record does not exist or has not been approved for public release."}
          </p>
          <Link to="/community" className="btn btn-secondary">
            <ArrowLeft size={14} /> Return to Community Intelligence
          </Link>
        </main>
      </div>
    );
  }

  const { report, relatedReports } = data;
  const indicators = report.indicators || [];
  const storyMode = report.storyModeJson || [];
  const statusTimeline = report.statusTimeline || [];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "36px 20px 80px", maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <Link
            to="/community"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} /> Back to Community Intel
          </Link>

          {isAnalyst && (
            <Link
              to={`/analyst/cases/${report.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#A5B4FC",
                background: "rgba(117, 103, 248, 0.15)",
                border: "1px solid rgba(117, 103, 248, 0.3)",
                padding: "4px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <Terminal size={13} />
              <span>Open in Analyst Desk</span>
            </Link>
          )}
        </div>

        {/* ─── Case Header Card ─── */}
        <div
          className="card"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--surface-border-strong)",
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>
                  REF: #{report.id}
                </span>
                <StatusBadge status={report.status} />
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>
                Incident Investigation Report
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RiskBadge level={report.riskLevel} score={report.riskScore} />
            </div>
          </div>

          {/* Public Summary */}
          <div
            style={{
              background: "#0D1326",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--radius-md)",
              padding: "16px 20px",
              marginBottom: 20,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
              Approved Public Summary
            </div>
            <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
              {report.publicSummary}
            </p>
          </div>

          {/* Metadata Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
              fontSize: 12,
              paddingTop: 14,
              borderTop: "1px solid var(--surface-border)",
            }}
          >
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Platform:</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{report.platform || "Unspecified"}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Incident Type:</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>{report.contentType}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Source Provenance:</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{report.sourceType || "COMMUNITY"}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block" }}>Submission Date:</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* ─── Two-Column Investigation Details ─── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 28 }}>
          {/* Left: Technical Indicators */}
          <div className="card">
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Tag size={16} style={{ color: "var(--accent)" }} />
              <span>Extracted Threat Indicators ({indicators.length})</span>
            </h2>

            {indicators.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {indicators.map((ind, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#0D1326",
                      border: "1px solid var(--surface-border)",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "rgba(117, 103, 248, 0.15)",
                          color: "var(--accent)",
                        }}
                      >
                        {ind.type}
                      </span>
                      <span style={{ fontSize: 13, fontFamily: "monospace", color: "#F8FAFC" }}>
                        {ind.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                No persistent indicators indexed for this incident record.
              </p>
            )}
          </div>

          {/* Right: Status Timeline & Audit Decisions */}
          <div className="card">
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Layers size={16} style={{ color: "var(--accent)" }} />
              <span>Report Lifecycle & Verification Timeline</span>
            </h2>

            <ReportTimeline
              statusTimeline={statusTimeline}
              currentStatus={report.status}
              createdAt={report.createdAt}
            />
          </div>
        </div>

        {/* Scam Story Mode Visualizer if present */}
        {storyMode.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <StoryModeVisualizer storyMode={storyMode} rawContent={report.publicSummary} />
          </div>
        )}

        {/* Related Reports & Scam DNA */}
        {relatedReports && relatedReports.length > 0 && (
          <div className="card">
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <GitCompare size={16} style={{ color: "var(--accent)" }} />
                <span>Connected Clues & Cross-Report Evidence ({relatedReports.length})</span>
              </h2>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Reports sharing exact domains, phone numbers, or psychological tactic patterns.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
              {relatedReports.map((rel) => (
                <DNAMatchCard key={rel.id} match={rel} currentReportId={report.id} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
