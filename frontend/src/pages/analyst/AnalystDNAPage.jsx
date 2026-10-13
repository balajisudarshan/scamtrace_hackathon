import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import RiskBadge from "../../components/RiskBadge";
import {
  GitCompare,
  ArrowRight,
  Tag,
  ShieldAlert,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Search,
} from "lucide-react";

export default function AnalystDNAPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [reportAId, setReportAId] = useState(searchParams.get("reportA") || "");
  const [reportBId, setReportBId] = useState(searchParams.get("reportB") || "");

  // Candidate reports for easy selection
  const [candidateReports, setCandidateReports] = useState([]);

  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load candidate reports for dropdowns - use admin queue to see all reports
  useEffect(() => {
    // First try to get all received reports, then published
    Promise.all([
      api.admin.getQueue({ status: "RECEIVED", page: 1, limit: 10 }),
      api.admin.getQueue({ status: "PUBLISHED", page: 1, limit: 10 }),
      api.admin.getQueue({ status: "CORROBORATED", page: 1, limit: 10 }),
    ])
      .then(([receivedRes, publishedRes, corrobRes]) => {
        const allReports = [
          ...(receivedRes.reports || []),
          ...(publishedRes.reports || []),
          ...(corrobRes.reports || []),
        ];
        // Deduplicate by id
        const unique = Array.from(new Map(allReports.map(r => [r.id, r])).values());
        setCandidateReports(unique);
        if (!reportAId && unique[0]) setReportAId(unique[0].id);
        if (!reportBId && unique[1]) setReportBId(unique[1].id);
      })
      .catch((err) => console.warn("Failed to load candidate reports:", err.message));
  }, []);

  const runComparison = async (a, b) => {
    if (!a || !b) return;
    if (a === b) {
      setError("Please select two distinct reports to compare Scam DNA.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.admin.compareDNA(a, b);
      if (res && res.success) {
        setComparison(res);
        setSearchParams({ reportA: a, reportB: b });
      } else {
        setError(res?.message || "Failed to compare reports.");
      }
    } catch (err) {
      setError(err?.message || "Error contacting Scam DNA comparison API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reportAId && reportBId && reportAId !== reportBId) {
      runComparison(reportAId, reportBId);
    }
  }, [reportAId, reportBId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Header ── */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
          <GitCompare size={14} />
          <span>CROSS-INCIDENT EVIDENCE MATRIX</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
          Scam DNA Side-by-Side Comparison
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
          Correlate shared indicators, isolated unique markers, and forensic divergence between two incident case files.
        </p>
      </div>

      {/* ── Selection Bar ── */}
      <div
        className="card"
        style={{
          background: "var(--surface-elevated)",
          padding: "16px 20px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div>
          <label className="input-label">Report A (Primary Incident)</label>
          <select
            className="select"
            value={reportAId}
            onChange={(e) => setReportAId(e.target.value)}
          >
            <option value="">Select Report A...</option>
            {candidateReports.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id.slice(0, 8)} - {r.publicSummary?.slice(0, 50)}...
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.12)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 18,
          }}
        >
          <GitCompare size={18} />
        </div>

        <div>
          <label className="input-label">Report B (Comparison Incident)</label>
          <select
            className="select"
            value={reportBId}
            onChange={(e) => setReportBId(e.target.value)}
          >
            <option value="">Select Report B...</option>
            {candidateReports.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id.slice(0, 8)} - {r.publicSummary?.slice(0, 50)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="card" style={{ color: "var(--risk-high)", textAlign: "center", padding: 24 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex-center" style={{ minHeight: 300 }}>
          <div className="spinner" />
        </div>
      ) : comparison ? (
        <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Similarity Score Card */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-subtle)",
              border: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Calculated Correlation Score:</span>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--accent)" }}>
                {Math.round((comparison.dna?.similarityScore || 0) * 100)}% Match
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", maxWidth: 500 }}>
              Based on Jaccard indicator set overlap across extracted domain names, phone numbers, and manipulation tactics.
            </div>
          </div>

          {/* Side-by-Side Incident Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Report A */}
            <div className="card" style={{ background: "var(--surface-card)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>
                  INCIDENT #{comparison.reportA?.id?.slice(0, 8)}...
                </span>
                <RiskBadge level={comparison.reportA?.riskLevel} size="sm" />
              </div>
              <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: 16 }}>
                {comparison.reportA?.publicSummary || comparison.reportA?.rawContent}
              </p>

              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
                Indexed Indicators ({comparison.reportA?.indicators?.length || 0}):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {comparison.reportA?.indicators?.map((i, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 11,
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontFamily: "monospace",
                      color: "var(--text-primary)",
                    }}
                  >
                    {i.type}: {i.value}
                  </span>
                ))}
              </div>
            </div>

            {/* Report B */}
            <div className="card" style={{ background: "var(--surface-card)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>
                  INCIDENT #{comparison.reportB?.id?.slice(0, 8)}...
                </span>
                <RiskBadge level={comparison.reportB?.riskLevel} size="sm" />
              </div>
              <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5, marginBottom: 16 }}>
                {comparison.reportB?.publicSummary || comparison.reportB?.rawContent}
              </p>

              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
                Indexed Indicators ({comparison.reportB?.indicators?.length || 0}):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {comparison.reportB?.indicators?.map((i, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 11,
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--surface-border)",
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontFamily: "monospace",
                      color: "var(--text-primary)",
                    }}
                  >
                    {i.type}: {i.value}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Matched Clues & Inferred Differences */}
          <div className="card">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
              Forensic Comparison Breakdown
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Overlapping clues */}
              <div style={{ background: "var(--bg-subtle)", padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--risk-low)", textTransform: "uppercase", marginBottom: 8 }}>
                  Shared / Overlapping Clues
                </div>
                {comparison.dna?.matchedClues?.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {comparison.dna.matchedClues.map((clue, idx) => (
                      <div key={idx} style={{ fontSize: 12, color: "var(--text-primary)", fontFamily: "monospace" }}>
                        • {typeof clue === "string" ? clue : JSON.stringify(clue)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                    No exact matching indicators between these two reports.
                  </p>
                )}
              </div>

              {/* Differences */}
              <div style={{ background: "var(--bg-subtle)", padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--risk-caution)", textTransform: "uppercase", marginBottom: 8 }}>
                  Divergence & Differences
                </div>
                {comparison.dna?.differences?.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {comparison.dna.differences.map((diff, idx) => (
                      <div key={idx} style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                        • {typeof diff === "string" ? diff : JSON.stringify(diff)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>
                    No conflicting indicators detected.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
