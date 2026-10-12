import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../services/api";
import RiskBadge from "../../components/RiskBadge";
import StatusBadge from "../../components/StatusBadge";
import ConfirmModal from "../../components/ConfirmModal";
import StoryModeVisualizer from "../../components/StoryModeVisualizer";
import {
  ArrowLeft,
  ShieldAlert,
  Lock,
  Tag,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  FileText,
  MessageSquare,
  Send,
  Eye,
  GitCompare,
  User,
  ScrollText,
} from "lucide-react";

export default function AnalystCasePage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review & Publish form state
  const [reviewStatus, setReviewStatus] = useState("PUBLISHED");
  const [rationale, setRationale] = useState("");
  const [customSummary, setCustomSummary] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Case note form state
  const [newNote, setNewNote] = useState("");
  const [noteSubmitting, setNoteSubmitting] = useState(false);

  const fetchCase = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.admin.getCase(id);
      if (res && res.success) {
        setData(res);
        setCustomSummary(res.report?.publicSummary || "");
      } else {
        setError(res?.message || "Failed to load case investigation.");
      }
    } catch (err) {
      setError(err?.message || "Network error loading analyst case.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!rationale.trim() || rationale.length < 10) {
      setError("A review rationale of at least 10 characters is required for auditing.");
      setShowConfirmModal(false);
      return;
    }

    setReviewSubmitting(true);
    setError(null);
    try {
      const res = await api.admin.reviewReport(id, {
        status: reviewStatus,
        rationale: rationale.trim(),
        publicSummary: customSummary.trim() || undefined,
      });

      if (res && res.success) {
        setReviewSuccessMsg(`Report successfully marked as ${reviewStatus}!`);
        setShowConfirmModal(false);
        setRationale("");
        // Refresh case data
        await fetchCase();
      } else {
        setError(res?.message || "Failed to update review decision.");
      }
    } catch (err) {
      setError(err?.message || "Failed to submit review decision.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || newNote.length < 5) {
      setError("Case note must be at least 5 characters.");
      return;
    }

    setNoteSubmitting(true);
    setError(null);
    try {
      const res = await api.admin.addNote(id, newNote.trim());
      if (res && res.success) {
        setNewNote("");
        await fetchCase();
      } else {
        setError(res?.message || "Failed to add case note.");
      }
    } catch (err) {
      setError(err?.message || "Error adding note.");
    } finally {
      setNoteSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: 400 }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 40, color: "var(--risk-high)" }}>
        {error}
      </div>
    );
  }

  const { report, indicators = [], decisions = [], caseNotes = [], auditLog = [] } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* ── Breadcrumb & Quick Actions ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <Link
          to="/analyst/queue"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-secondary)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} /> Back to Triage Queue
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            to={`/analyst/dna?reportA=${report.id}`}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: 12 }}
          >
            <GitCompare size={13} />
            <span>Cross-Compare in Scam DNA</span>
          </Link>
          <Link
            to={`/reports/${report.id}`}
            target="_blank"
            className="btn btn-outline btn-sm"
            style={{ fontSize: 12 }}
          >
            <span>Preview Public View</span>
          </Link>
        </div>
      </div>

      {/* ── Case Header ── */}
      <div
        className="card"
        style={{
          background: "var(--surface-elevated)",
          border: "1px solid var(--surface-border-strong)",
          padding: 24,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>
                CASE #{report.id}
              </span>
              <StatusBadge status={report.status} />
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                Source: {report.sourceType || "COMMUNITY"}
              </span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>
              Analyst Case File
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RiskBadge level={report.riskLevel} score={report.riskScore} />
          </div>
        </div>

        {/* Restricted Raw Evidence Panel (Analyst-Only) */}
        <div
          style={{
            background: "#080C1A",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#EF4444" }}>
              <Lock size={13} />
              <span>ORIGINAL SUBMITTED RAW EVIDENCE (RESTRICTED TO ANALYSTS)</span>
            </div>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              Submitted by: {report.submittedByEmail || "Anonymous Public User"}
            </span>
          </div>
          <pre
            style={{
              fontSize: 13,
              color: "#F8FAFC",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              margin: 0,
              background: "#0D1326",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid var(--surface-border)",
            }}
          >
            {report.rawContent || "No raw content recorded."}
          </pre>
        </div>

        {/* Public Summary Preview */}
        <div style={{ fontSize: 13 }}>
          <span style={{ color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
            Current Public-Approved Summary:
          </span>
          <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
            {report.publicSummary || "No public summary approved yet."}
          </p>
        </div>
      </div>

      {/* ── Action Grid: Review & Decisions (Left) / Extracted Indicators (Right) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
        {/* ── Review & Publish Workflow Panel ── */}
        <div
          className="card"
          style={{
            background: "#0F162D",
            border: "1px solid rgba(117, 103, 248, 0.3)",
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle2 size={18} style={{ color: "var(--accent)" }} />
            <span>Record Analyst Review Decision</span>
          </h2>

          {reviewSuccessMsg && (
            <div
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#34D399",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                marginBottom: 14,
              }}
            >
              {reviewSuccessMsg}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Decision Status */}
            <div>
              <label className="input-label">Target Review Status *</label>
              <select
                className="select"
                value={reviewStatus}
                onChange={(e) => setReviewStatus(e.target.value)}
              >
                <option value="UNDER_REVIEW">UNDER_REVIEW (Active Investigation)</option>
                <option value="CORROBORATED">CORROBORATED (Cross-Verified Incident)</option>
                <option value="PUBLISHED">PUBLISHED (Approve for Community Feed)</option>
                <option value="DISPUTED">DISPUTED (Contested / False Signal)</option>
                <option value="REJECTED">REJECTED (Spam / Ineligible)</option>
              </select>
            </div>

            {/* Rationale */}
            <div>
              <label className="input-label">
                Decision Rationale (Mandatory audit justification, min 10 chars) *
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="State forensic grounds: e.g. Domain matches confirmed SBI phishing cluster, or caller number verified against campaign #1..."
              />
            </div>

            {/* Public Summary Editor */}
            <div>
              <label className="input-label">
                Public Summary (Sanitize and approve for community view)
              </label>
              <textarea
                className="textarea"
                rows={3}
                value={customSummary}
                onChange={(e) => setCustomSummary(e.target.value)}
                placeholder="Sanitized description that does not expose private victim details..."
              />
            </div>

            {error && (
              <div style={{ color: "#F87171", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              disabled={reviewSubmitting || !rationale.trim()}
              className="btn btn-primary"
              style={{ marginTop: 6 }}
            >
              <span>Submit Review & Update Lifecycle</span>
            </button>
          </div>
        </div>

        {/* ── Extracted Indicators Panel ── */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Tag size={18} style={{ color: "var(--accent)" }} />
            <span>Extracted Technical Indicators ({indicators.length})</span>
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
                    justifyContent: "space-between",
                    alignItems: "center",
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
                    <span style={{ fontSize: 13, fontFamily: "monospace", color: "#FFFFFF" }}>
                      {ind.value}
                    </span>
                  </div>
                  {ind.context && (
                    <span style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {ind.context}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
              No indicators currently indexed.
            </p>
          )}
        </div>
      </div>

      {/* ── Case Notes & Investigation History ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 20 }}>
        {/* Case Notes */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <MessageSquare size={16} style={{ color: "var(--accent)" }} />
            <span>Internal Case Notes ({caseNotes.length})</span>
          </h2>

          {/* Add Note Form */}
          <form onSubmit={handleAddNote} style={{ marginBottom: 16, display: "flex", gap: 8 }}>
            <input
              type="text"
              className="input"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add investigator note (min 5 chars)..."
              style={{ fontSize: 13 }}
            />
            <button
              type="submit"
              disabled={noteSubmitting || !newNote.trim()}
              className="btn btn-secondary btn-sm"
              style={{ padding: "0 14px" }}
            >
              <Send size={14} />
            </button>
          </form>

          {/* Note List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {caseNotes.length > 0 ? (
              caseNotes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    background: "#0D1326",
                    border: "1px solid var(--surface-border)",
                    padding: "10px 14px",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>
                      {note.authorEmail || "Analyst"}
                    </span>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-primary)", margin: 0, lineHeight: 1.4 }}>
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                No case notes added yet. Use the field above to document investigation progress.
              </p>
            )}
          </div>
        </div>

        {/* Audit Log for this case */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <ScrollText size={16} style={{ color: "var(--accent)" }} />
            <span>Case Audit Log ({auditLog.length})</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
            {auditLog.length > 0 ? (
              auditLog.map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: 12,
                    padding: "8px 12px",
                    background: "#0D1326",
                    borderRadius: "4px",
                    border: "1px solid var(--surface-border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: "#A5B4FC" }}>{ev.action}</span>
                    <span style={{ color: "var(--text-muted)", marginLeft: 6 }}>
                      by {ev.userEmail || "System"}
                    </span>
                  </div>
                  <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                    {new Date(ev.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No audit records for this case.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Confirmation Modal for Review Decisions ── */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title={`Confirm Status Transition: ${reviewStatus}`}
        message={`Are you sure you want to transition Case #${report.id} to '${reviewStatus}'? This action will record an official ReviewDecision and update public visibility.`}
        confirmLabel={`Yes, Mark as ${reviewStatus}`}
        confirmVariant={reviewStatus === "REJECTED" ? "danger" : "primary"}
        loading={reviewSubmitting}
        onConfirm={handleReviewSubmit}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
}
