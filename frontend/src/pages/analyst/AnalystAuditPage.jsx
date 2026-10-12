import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import {
  ScrollText,
  Clock,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function AnalystAuditPage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.admin
      .getAuditLog({ page, limit: 25 })
      .then((res) => {
        if (isMounted && res.success) {
          setEvents(res.events || []);
        } else {
          setError(res?.message || "Failed to load audit events.");
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Error contacting Audit API.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  const getActionBadge = (action) => {
    const act = (action || "").toUpperCase();
    if (act.includes("PUBLISHED")) return { bg: "rgba(117,103,248,0.2)", color: "#A5B4FC" };
    if (act.includes("REJECTED")) return { bg: "rgba(239,68,68,0.2)", color: "#F87171" };
    if (act.includes("SUBMITTED")) return { bg: "rgba(16,185,129,0.2)", color: "#34D399" };
    if (act.includes("RESTRICTED")) return { bg: "rgba(245,158,11,0.2)", color: "#FBBF24" };
    return { bg: "rgba(255,255,255,0.08)", color: "#CBD5E1" };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
            <ScrollText size={14} />
            <span>IMMUTABLE SYSTEM LEDGER</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
            Compliance & Investigation Audit Trail
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
            Full chronological record of report submissions, restricted evidence views, case notes, and review status changes.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ minHeight: 300 }}>
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--risk-high)" }}>
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
          No audit records found.
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Action Type</th>
                <th>Actor Email</th>
                <th>Target Report</th>
                <th>Audit Detail</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => {
                const badge = getActionBadge(ev.action);
                let parsedDetail = "";
                if (ev.detail) {
                  try {
                    parsedDetail =
                      typeof ev.detail === "string"
                        ? ev.detail
                        : JSON.stringify(ev.detail);
                  } catch {
                    parsedDetail = String(ev.detail);
                  }
                }
                return (
                  <tr key={ev.id}>
                    <td>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {ev.action}
                      </span>
                    </td>

                    <td style={{ fontSize: 12, color: "var(--text-primary)" }}>
                      {ev.userEmail || "System / Guest"}
                    </td>

                    <td>
                      {ev.reportId ? (
                        <Link
                          to={`/analyst/cases/${ev.reportId}`}
                          style={{
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: "var(--accent)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          #{ev.reportId.slice(0, 8)}...
                          <ArrowRight size={10} />
                        </Link>
                      ) : (
                        <span style={{ color: "var(--text-muted)", fontSize: 12 }}>—</span>
                      )}
                    </td>

                    <td style={{ maxWidth: 300, fontSize: 12, color: "var(--text-secondary)", fontFamily: "monospace" }}>
                      <span
                        style={{
                          display: "inline-block",
                          maxWidth: 280,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={parsedDetail}
                      >
                        {parsedDetail || "—"}
                      </span>
                    </td>

                    <td style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                      {new Date(ev.createdAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 12 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page <= 1}
          className="btn btn-secondary btn-sm"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={events.length < 25}
          className="btn btn-secondary btn-sm"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
