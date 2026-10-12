import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  RotateCw,
} from "lucide-react";

export default function AnalystQueuePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStatus = searchParams.get("status") || "RECEIVED";
  const [statusTab, setStatusTab] = useState(initialStatus);
  const [assetTypeFilter, setAssetTypeFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});

  // Local search filter for loaded queue rows
  const [searchFilter, setSearchFilter] = useState("");

  const statusTabs = [
    { id: "RECEIVED", label: "Received (New)" },
    { id: "UNDER_REVIEW", label: "Under Review" },
    { id: "CORROBORATED", label: "Corroborated" },
    { id: "PUBLISHED", label: "Published" },
    { id: "DISPUTED", label: "Disputed" },
    { id: "REJECTED", label: "Rejected" },
    { id: "ALL", label: "All Incidents" },
  ];

  // Fetch status counts for tab badges
  const fetchCounts = async () => {
    try {
      const res = await api.admin.getStats();
      if (res && res.success && res.stats?.reportsByStatus) {
        const countsMap = {};
        let allTotal = 0;
        res.stats.reportsByStatus.forEach((s) => {
          countsMap[s.status] = s.count;
          allTotal += s.count;
        });
        countsMap["ALL"] = allTotal;
        setStatusCounts(countsMap);
      }
    } catch (_) {}
  };

  const fetchQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.admin.getQueue({
        status: statusTab,
        contentType: assetTypeFilter,
        riskLevel: riskFilter,
        page,
        limit: 15,
      });

      if (res && res.success) {
        setReports(res.reports || []);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } else {
        setError(res?.message || "Failed to load triage queue.");
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch triage queue from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  useEffect(() => {
    const s = searchParams.get("status");
    if (s && s !== statusTab) {
      setStatusTab(s);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchQueue();
  }, [statusTab, assetTypeFilter, riskFilter, page]);

  const handleTabChange = (tabId) => {
    setStatusTab(tabId);
    setPage(1);
    setSearchParams({ status: tabId });
  };

  const handleReconnect = async () => {
    try {
      setLoading(true);
      await api.auth.login("analyst@scamtrace.dev", "analyst123");
      await fetchCounts();
      await fetchQueue();
    } catch (err) {
      setError(err?.message || "Failed to reconnect session.");
      setLoading(false);
    }
  };

  // Client-side quick filter on current batch
  const filteredReports = reports.filter((r) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      (r.id || "").toLowerCase().includes(q) ||
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

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Showing <strong>{filteredReports.length}</strong> of <strong>{total}</strong> cases in{" "}
            <strong style={{ color: "var(--accent)" }}>{statusTab}</strong>
          </div>
          <button
            onClick={() => {
              fetchCounts();
              fetchQueue();
            }}
            className="btn btn-secondary btn-sm"
            title="Refresh queue"
            style={{ padding: "6px 10px" }}
          >
            <RotateCw size={13} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Status Tab Navigation ── */}
      <div className="tab-nav" style={{ overflowX: "auto" }}>
        {statusTabs.map((tab) => {
          const count = statusCounts[tab.id];
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`tab-btn ${statusTab === tab.id ? "active" : ""}`}
              style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>{tab.label}</span>
              {count !== undefined && (
                <span
                  style={{
                    fontSize: 11,
                    padding: "1px 6px",
                    borderRadius: "10px",
                    background: statusTab === tab.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    color: statusTab === tab.id ? "#FFFFFF" : "var(--text-muted)",
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Filter Bar: Asset Type, Risk Level, and Keyword Search ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            className="input"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search within page by keyword or ID..."
            style={{ paddingLeft: 38 }}
          />
        </div>

        {/* Asset Type Filter Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Asset Type:</span>
          <select
            className="select"
            value={assetTypeFilter}
            onChange={(e) => {
              setAssetTypeFilter(e.target.value);
              setPage(1);
            }}
            style={{ padding: "8px 12px", fontSize: 13, minWidth: 140 }}
          >
            <option value="ALL">All Assets</option>
            <option value="social">Social Media</option>
            <option value="app">Mobile Apps</option>
            <option value="message">SMS / Messages</option>
            <option value="url">URLs / Websites</option>
            <option value="phone">Phone Calls</option>
          </select>
        </div>

        {/* Risk Level Filter Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Risk:</span>
          <select
            className="select"
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setPage(1);
            }}
            style={{ padding: "8px 12px", fontSize: 13, minWidth: 140 }}
          >
            <option value="ALL">All Risk Levels</option>
            <option value="HIGH_RISK">High Risk (🚨)</option>
            <option value="NEEDS_CAUTION">Needs Caution (⚠️)</option>
            <option value="LOW_SIGNAL">Low Signal (✅)</option>
          </select>
        </div>
      </div>

      {/* ── Triage Queue Table ── */}
      {error ? (
        <div className="card" style={{ textAlign: "center", padding: 36, maxWidth: 540, margin: "20px auto" }}>
          <AlertTriangle size={32} style={{ color: "var(--risk-high)", marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginBottom: 6 }}>
            Queue Retrieval Error
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
            {error}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={fetchQueue} className="btn btn-secondary btn-sm">
              Try Again
            </button>
            <button onClick={handleReconnect} className="btn btn-primary btn-sm">
              ⚡ Reconnect Analyst Session
            </button>
          </div>
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
