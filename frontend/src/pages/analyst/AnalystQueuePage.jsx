import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import RiskBadge from "../../components/RiskBadge";
import StatusBadge from "../../components/StatusBadge";
import {
  Inbox,
  Search,
  Filter,
  ArrowRight,
  Clock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Eye,
  Tag,
  AlertTriangle,
} from "lucide-react";

export default function AnalystQueuePage() {
  const navigate = useNavigate();

  const [statusTab, setStatusTab] = useState("RECEIVED");
  const [page, setPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local search filter for loaded queue rows
  const [searchFilter, setSearchFilter] = useState("");

  const statusTabs = [
    { id: "RECEIVED", label: "Received (New)" },
    { id: "UNDER_REVIEW", label: "Under Review" },
    { id: "CORROBORATED", label: "Corroborated" },
    { id: "PUBLISHED", label: "Published" },
    { id: "DISPUTED", label: "Disputed" },
    { id: "REJECTED", label: "Rejected" },
  ];

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.admin
      .getQueue({ status: statusTab, page, limit: 15 })
      .then((res) => {
        if (isMounted && res.success) {
          setReports(res.reports || []);
          setTotal(res.total || 0);
          setTotalPages(res.totalPages || 1);
        } else {
          setError(res?.message || "Failed to load triage queue.");
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to fetch triage queue from backend.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [statusTab, page]);

  // Client-side quick filter on current batch
  const filteredReports = reports.filter((r) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      (r.publicSummary || "").toLowerCase().includes(q) ||
      (r.rawContent || "").toLowerCase().includes(q) ||
      (r.platform || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF", marginBottom: 4 }}>
            Incident Triage Queue
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
            Review incoming evidence submissions, evaluate extracted technical indicators, and approve public summaries.
          </p>
        </div>

        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Showing <strong>{filteredReports.length}</strong> of <strong>{total}</strong> cases in{" "}
          <strong style={{ color: "var(--accent)" }}>{statusTab}</strong>
        </div>
      </div>

      {/* ── Status Tab Navigation ── */}
      <div className="tab-nav" style={{ overflowX: "auto" }}>
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setStatusTab(tab.id);
              setPage(1);
            }}
            className={`tab-btn ${statusTab === tab.id ? "active" : ""}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Search Bar within Queue ── */}
      <div style={{ position: "relative" }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
          }}
        />
        <input
          type="text"
          className="input"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter queue by report ID, domain, platform, or keyword..."
          style={{ paddingLeft: 38 }}
        />
      </div>

      {/* ── Triage Queue Table ── */}
      {error ? (
        <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--risk-high)" }}>
          {error}
        </div>
      ) : loading ? (
        <div className="flex-center" style={{ minHeight: 300 }}>
          <div className="spinner" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "48px 20px",
            color: "var(--text-muted)",
          }}
        >
          <Inbox size={36} style={{ marginBottom: 12, opacity: 0.5 }} />
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
            No incidents in this status queue
          </h3>
          <p style={{ fontSize: 13, maxWidth: 400, margin: "0 auto" }}>
            There are currently no reports marked as <strong>{statusTab}</strong>. Select another status tab
            or wait for incoming user submissions.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Report Ref</th>
                <th>Type & Platform</th>
                <th>Risk Level</th>
                <th>Indicators</th>
                <th>Public / Incident Preview</th>
                <th>Submitted</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/analyst/cases/${report.id}`)}
                >
                  {/* ID */}
                  <td style={{ fontFamily: "monospace", fontWeight: 600, color: "var(--accent)" }}>
                    #{report.id.slice(0, 8)}...
                  </td>

                  {/* Type & Platform */}
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span style={{ fontWeight: 600, textTransform: "capitalize", color: "#FFFFFF" }}>
                        {report.contentType}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {report.platform || "Direct"}
                      </span>
                    </div>
                  </td>

                  {/* Risk */}
                  <td>
                    <RiskBadge level={report.riskLevel} score={report.riskScore} size="sm" />
                  </td>

                  {/* Indicators Count */}
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Tag size={12} style={{ color: "var(--accent)" }} />
                      <strong>{report.indicatorCount || 0}</strong> clues
                    </span>
                  </td>

                  {/* Preview snippet */}
                  <td style={{ maxWidth: 320 }}>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {report.publicSummary || report.rawContent}
                    </p>
                  </td>

                  {/* Date */}
                  <td style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: "right" }}>
                    <Link
                      to={`/analyst/cases/${report.id}`}
                      className="btn btn-outline btn-sm"
                      onClick={(e) => e.stopPropagation()}
                      style={{ padding: "4px 10px", fontSize: 11 }}
                    >
                      <span>Investigate</span>
                      <ArrowRight size={11} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 12 }}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className="btn btn-secondary btn-sm"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="btn btn-secondary btn-sm"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
