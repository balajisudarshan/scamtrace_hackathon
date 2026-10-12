import React from "react";
import { Link } from "react-router-dom";
import { GitCompare, ArrowRight, ShieldAlert, Tag, ExternalLink } from "lucide-react";
import RiskBadge from "./RiskBadge";

export default function DNAMatchCard({ match, currentReportId = null }) {
  if (!match) return null;

  // Handles both precomputed MatchEvidence and live findRelatedReports structures
  const isMatchEvidence = Boolean(match.matchedClues || match.similarityScore !== undefined);
  const similarity = isMatchEvidence
    ? Math.round((match.similarityScore || 0) * 100)
    : null;

  const otherReportId =
    currentReportId && match.reportAId === currentReportId
      ? match.reportBId
      : match.reportBId === currentReportId
      ? match.reportAId
      : match.id || match.reportBId || match.reportAId;

  const summary =
    match.publicSummary ||
    (currentReportId && match.reportAId === currentReportId
      ? match.summaryB
      : match.summaryA) ||
    "Connected scam incident with overlapping threat indicators.";

  const riskLevel =
    match.riskLevel ||
    (currentReportId && match.reportAId === currentReportId
      ? match.riskLevelB
      : match.riskLevelA) ||
    "NEEDS_CAUTION";

  const clues = Array.isArray(match.matchedClues)
    ? match.matchedClues
    : match.matchedIndicators || [];

  const diffs = Array.isArray(match.differences) ? match.differences : [];

  return (
    <div
      className="card card-interactive"
      style={{
        background: "var(--surface-elevated)",
        border: "1px solid var(--surface-border)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "6px",
              background: "rgba(117, 103, 248, 0.15)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GitCompare size={15} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
              Report #{otherReportId?.slice(0, 8)}...
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {match.platform ? `Platform: ${match.platform} • ` : ""}
              {match.createdAt ? new Date(match.createdAt).toLocaleDateString() : ""}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RiskBadge level={riskLevel} size="sm" />
          {similarity !== null && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "4px",
                background:
                  similarity > 60
                    ? "rgba(239, 68, 68, 0.15)"
                    : "rgba(117, 103, 248, 0.15)",
                color: similarity > 60 ? "#EF4444" : "var(--accent)",
                border: "1px solid currentColor",
              }}
            >
              {similarity}% DNA Match
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
        {summary}
      </p>

      {/* Matched Clues */}
      {clues.length > 0 && (
        <div style={{ background: "#0E152D", padding: "10px 12px", borderRadius: "8px", border: "1px solid var(--surface-border)" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
            Matched Forensic Clues ({clues.length}):
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {clues.map((c, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: 11,
                  background: "rgba(117, 103, 248, 0.1)",
                  border: "1px solid rgba(117, 103, 248, 0.25)",
                  color: "#C7D2FE",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Tag size={10} />
                {typeof c === "string" ? c : `${c.type || c.field || ""}: ${c.value || c.clue || ""}`}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Differences (if any) */}
      {diffs.length > 0 && (
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
          <span style={{ fontWeight: 600 }}>Differences:</span> {diffs.slice(0, 2).map((d) => (typeof d === "string" ? d : d.difference || d.field)).join(", ")}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--surface-border)" }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>
          * Similarity is pattern correlation, not criminal proof.
        </span>
        {otherReportId && (
          <Link
            to={`/reports/${otherReportId}`}
            className="btn btn-outline btn-sm"
            style={{ fontSize: 11, padding: "4px 10px" }}
          >
            Investigate Incident <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}
