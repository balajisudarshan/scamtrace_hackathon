import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../services/api";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  XCircle,
  AlertTriangle,
  RefreshCw,
  X,
  FileText,
  Lock,
  ChevronRight,
  Send,
  ShieldAlert,
} from "lucide-react";

export default function AdminReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "ALL";

  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected report modal
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reportDetail, setReportDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Status update form state
  const [targetStatus, setTargetStatus] = useState("UNDER_REVIEW");
  const [rationale, setRationale] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Internal note form state
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(null);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.admin.getReports({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        page,
        limit: 25,
      });
      if (res && res.reports) {
        setReports(res.reports);
        setTotal(res.total || res.reports.length);
      }
    } catch (err) {
      setError(err?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter, page]);

  const handleOpenReport = async (id) => {
    setSelectedReportId(id);
    setDetailLoading(true);
    setModalFeedback(null);
    setRationale("");
    setNoteContent("");
    try {
      const res = await api.admin.getCase(id);
      if (res && res.report) {
        setReportDetail(res);
        setTargetStatus(res.report.status || "UNDER_REVIEW");
      }
    } catch (err) {
      setModalFeedback({ type: "error", message: "Failed to load report details" });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedReportId(null);
    setReportDetail(null);
    setModalFeedback(null);
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    if (!selectedReportId) return;

    setUpdatingStatus(true);
    setModalFeedback(null);
    try {
      const res = await api.admin.reviewReport(selectedReportId, {
        status: targetStatus,
        rationale: rationale.trim() || `Status updated to ${targetStatus} by administrator.`,
      });
      if (res && res.success) {
        setModalFeedback({ type: "success", message: `Status updated to ${res.newStatus}` });
        // Refresh detail
        const updated = await api.admin.getCase(selectedReportId);
        if (updated?.report) setReportDetail(updated);
        // Refresh list
        fetchReports();
      } else {
        setModalFeedback({ type: "error", message: res?.message || "Failed to update status" });
      }
    } catch (err) {
      setModalFeedback({ type: "error", message: err?.message || "Failed to update status" });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim() || !selectedReportId) return;

    setAddingNote(true);
    setModalFeedback(null);
    try {
      const res = await api.admin.addNote(selectedReportId, noteContent.trim());
      if (res && res.success) {
        setNoteContent("");
        setModalFeedback({ type: "success", message: "Private review note added successfully" });
        const updated = await api.admin.getCase(selectedReportId);
        if (updated?.report) setReportDetail(updated);
      } else {
        setModalFeedback({ type: "error", message: res?.message || "Failed to add internal note" });
      }
    } catch (err) {
      setModalFeedback({ type: "error", message: err?.message || "Failed to add note" });
    } finally {
      setAddingNote(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = String(status || "").toUpperCase();
    if (s === "RECEIVED" || s === "NEW") {
      return { label: "New", color: "#60A5FA", bg: "rgba(59, 130, 246, 0.15)" };
    }
    if (s === "UNDER_REVIEW") {
      return { label: "Under Review", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)" };
    }
    if (s === "CORROBORATED" || s === "PUBLISHED" || s === "CONFIRMED_SCAM") {
      return { label: "Confirmed Scam", color: "#10B981", bg: "rgba(16, 185, 129, 0.15)" };
    }
    if (s === "REJECTED" || s === "DISMISSED") {
      return { label: "Dismissed", color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)" };
    }
    if (s === "DISPUTED" || s === "DUPLICATE") {
      return { label: "Duplicate", color: "#94A3B8", bg: "rgba(148, 163, 184, 0.15)" };
    }
    return { label: status, color: "#94A3B8", bg: "rgba(148, 163, 184, 0.15)" };
  };

  const filterTabs = [
    { label: "All Reports", value: "ALL" },
    { label: "New", value: "RECEIVED" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Confirmed Scam", value: "CORROBORATED" },
    { label: "Dismissed", value: "REJECTED" },
    { label: "Duplicate", value: "DISPUTED" },
  ];

  return (
    <div style={{ padding: "32px 24px 60px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
            Reported Scams
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            Publicly submitted incident reports awaiting investigation, status update, or triage.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchReports}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-secondary)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {filterTabs.map((tab) => {
          const isActive = statusFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setStatusFilter(tab.value);
                setSearchParams({ status: tab.value });
              }}
              style={{
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "var(--radius-md)",
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--surface-border)",
                background: isActive ? "rgba(117, 103, 248, 0.18)" : "var(--surface-elevated)",
                color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Reports Table Card */}
      <div
        className="card"
        style={{
          background: "var(--surface-card)",
          border: "1px solid var(--surface-border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)" }}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 12px" }} />
            Loading submitted reports...
          </div>
        ) : reports.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)" }}>
            No reports found for this filter.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--surface-border)", background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Reference ID</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Type</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Reported URL / Target</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Description</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Submission Date</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600 }}>Status</th>
                  <th style={{ padding: "14px 16px", fontWeight: 600, textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => {
                  const badge = getStatusBadge(r.status);
                  return (
                    <tr
                      key={r.id}
                      style={{ borderBottom: "1px solid var(--surface-border)", transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-elevated)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>
                        {r.id.slice(0, 14)}...
                      </td>
                      <td style={{ padding: "16px", textTransform: "capitalize", fontWeight: 600 }}>
                        {r.contentType || "General"}
                      </td>
                      <td style={{ padding: "16px", color: "var(--text-primary)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.platform || "Online"}
                      </td>
                      <td style={{ padding: "16px", color: "var(--text-secondary)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.publicSummary || r.rawContent || "No description provided"}
                      </td>
                      <td style={{ padding: "16px", color: "var(--text-muted)", fontSize: 12 }}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "var(--radius-sm)",
                            fontSize: 11,
                            fontWeight: 700,
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => handleOpenReport(r.id)}
                          style={{
                            padding: "6px 14px",
                            background: "var(--accent)",
                            border: "none",
                            borderRadius: "var(--radius-sm)",
                            color: "#FFFFFF",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Review Report
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Detail & Review Modal ─── */}
      {selectedReportId && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              maxWidth: 780,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#11182B",
              border: "1px solid var(--surface-border-strong)",
              borderRadius: "var(--radius-xl)",
              padding: "32px 28px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
              position: "relative",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                  Report Review & Triage
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                  Reference ID: <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{selectedReportId}</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Allegation Disclaimer */}
            <div
              style={{
                padding: "10px 14px",
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                borderRadius: "var(--radius-md)",
                color: "#FDE68A",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <AlertTriangle size={15} style={{ color: "#F59E0B", flexShrink: 0 }} />
              <span>Public allegation — do not automatically classify as fraudulent without verifying evidence.</span>
            </div>

            {detailLoading || !reportDetail ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-muted)" }}>
                <RefreshCw size={20} className="animate-spin" style={{ margin: "0 auto 10px" }} />
                Loading report data...
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Modal Feedback Alert */}
                {modalFeedback && (
                  <div
                    style={{
                      padding: "12px 14px",
                      background: modalFeedback.type === "success" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                      border: modalFeedback.type === "success" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "var(--radius-md)",
                      color: modalFeedback.type === "success" ? "#6EE7B7" : "#FCA5A5",
                      fontSize: 13,
                    }}
                  >
                    {modalFeedback.message}
                  </div>
                )}

                {/* Submitted Content Box */}
                <div
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    padding: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6 }}>
                    Submitted Content / Allegation
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text-primary)", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                    {reportDetail.report?.rawContent || reportDetail.report?.publicSummary || "No content details"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10 }}>
                    Submitted on: {new Date(reportDetail.report?.createdAt).toLocaleString()} | Platform: {reportDetail.report?.platform || "Unknown"}
                  </div>
                </div>

                {/* Change Status Form */}
                <form
                  onSubmit={handleStatusChange}
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    padding: 18,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                    Update Review Status
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>
                        New Status
                      </label>
                      <select
                        value={targetStatus}
                        onChange={(e) => setTargetStatus(e.target.value)}
                        className="input"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--surface-border)",
                          borderRadius: "var(--radius-sm)",
                          color: "var(--text-primary)",
                          fontSize: 13,
                        }}
                      >
                        <option value="RECEIVED">New (Pending)</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="CORROBORATED">Confirmed Scam</option>
                        <option value="REJECTED">Dismissed</option>
                        <option value="DISPUTED">Duplicate</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>
                        Review Rationale / Notes
                      </label>
                      <input
                        type="text"
                        placeholder="Reason for this decision (e.g. Lookalike domain matches known phishing campaign)..."
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}
                        className="input"
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          background: "var(--surface-elevated)",
                          border: "1px solid var(--surface-border)",
                          borderRadius: "var(--radius-sm)",
                          color: "var(--text-primary)",
                          fontSize: 13,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={updatingStatus}
                    style={{
                      padding: "8px 18px",
                      background: "var(--accent)",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      color: "#FFFFFF",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: updatingStatus ? "not-allowed" : "pointer",
                    }}
                  >
                    {updatingStatus ? "Saving..." : "Save Status Change"}
                  </button>
                </form>

                {/* Private Internal Notes Section */}
                <div
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "var(--radius-md)",
                    padding: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
                    <Lock size={15} style={{ color: "var(--accent)" }} />
                    <span>Private Internal Review Notes</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 400 }}>(Not visible to public)</span>
                  </div>

                  {reportDetail.caseNotes && reportDetail.caseNotes.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                      {reportDetail.caseNotes.map((note) => (
                        <div
                          key={note.id}
                          style={{
                            padding: "10px 12px",
                            background: "var(--surface-elevated)",
                            border: "1px solid var(--surface-border)",
                            borderRadius: "var(--radius-sm)",
                            fontSize: 13,
                          }}
                        >
                          <div style={{ color: "var(--text-primary)", marginBottom: 4 }}>{note.content}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                            By {note.authorEmail || "Admin"} • {new Date(note.createdAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>
                      No internal notes recorded yet.
                    </div>
                  )}

                  <form onSubmit={handleAddNote} style={{ display: "flex", gap: 10 }}>
                    <input
                      type="text"
                      placeholder="Add an internal investigator note..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="input"
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--text-primary)",
                        fontSize: 13,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={addingNote || !noteContent.trim()}
                      style={{
                        padding: "10px 16px",
                        background: "var(--surface-elevated)",
                        border: "1px solid var(--surface-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--accent)",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: addingNote ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Send size={14} />
                      Add Note
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
