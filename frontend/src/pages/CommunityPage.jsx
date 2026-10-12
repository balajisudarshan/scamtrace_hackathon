import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import RiskBadge from "../components/RiskBadge";
import StatusBadge from "../components/StatusBadge";
import {
  Search,
  Filter,
  Users,
  Calendar,
  Layers,
  ArrowRight,
  Database,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export default function CommunityPage() {
  const [reports, setReports] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 350);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch reports on filter change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    api.reports
      .list({
        page,
        limit: 12,
        q: debouncedQuery,
        contentType: selectedType || undefined,
        riskLevel: selectedRisk || undefined,
        platform: selectedPlatform || undefined,
        status: "PUBLISHED",
        sortBy,
        sortOrder,
      })
      .then((res) => {
        if (isMounted && res.success) {
          setReports(res.reports || []);
          setTotal(res.total || 0);
          setTotalPages(res.totalPages || 1);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Failed to load community intelligence.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page, debouncedQuery, selectedType, selectedRisk, selectedPlatform, sortBy, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("");
    setSelectedRisk("");
    setSelectedPlatform("");
    setSortBy("createdAt");
    setSortOrder("desc");
    setPage(1);
  };

  const getProvenanceBadge = (sourceType, datasetSource) => {
    if (sourceType === "COMMUNITY") {
      return { label: "User Submitted", bg: "rgba(117, 103, 248, 0.15)", color: "#A5B4FC" };
    }
    if (sourceType === "IMPORTED" || datasetSource) {
      return {
        label: datasetSource || "Imported Dataset",
        bg: "rgba(16, 185, 129, 0.15)",
        color: "#34D399",
      };
    }
    if (sourceType === "SEEDED") {
      return { label: "Seeded Research Corpus", bg: "rgba(245, 158, 11, 0.15)", color: "#FBBF24" };
    }
    return { label: "Verified Record", bg: "rgba(148, 163, 184, 0.12)", color: "#94A3B8" };
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-base)" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "40px 20px 80px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>
              <Database size={14} />
              <span>LIVE INCIDENT ARCHIVE</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
              Community Intelligence
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              Search across published scam incidents, verified fraud patterns, and known phishing indicators.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Showing {reports.length} of {total} published reports
            </span>
          </div>
        </div>

        {/* ─── Search & Filters Bar ─── */}
        <div
          className="card"
          style={{
            background: "var(--surface-elevated)",
            padding: "16px 20px",
            marginBottom: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Top row: Search input */}
          <div style={{ position: "relative" }}>
            <Search
              size={16}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by keyword, tactic, bank name, or domain..."
              style={{ paddingLeft: 40 }}
            />
          </div>

          {/* Bottom row: Dropdown filters */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            {/* Type */}
            <div style={{ minWidth: 140 }}>
              <select
                className="select"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Categories</option>
                <option value="message">Messages / SMS</option>
                <option value="url">URLs / Links</option>
                <option value="phone">Phone Calls</option>
                <option value="social">Social Handles</option>
              </select>
            </div>

            {/* Risk Level */}
            <div style={{ minWidth: 150 }}>
              <select
                className="select"
                value={selectedRisk}
                onChange={(e) => {
                  setSelectedRisk(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Risk Levels</option>
                <option value="HIGH_RISK">High Risk</option>
                <option value="NEEDS_CAUTION">Needs Caution</option>
                <option value="LOW_SIGNAL">Low Signal</option>
              </select>
            </div>

            {/* Platform */}
            <div style={{ minWidth: 130 }}>
              <select
                className="select"
                value={selectedPlatform}
                onChange={(e) => {
                  setSelectedPlatform(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Platforms</option>
                <option value="SMS">SMS</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Web Browser">Web Browser</option>
              </select>
            </div>

            {/* Sort */}
            <div style={{ minWidth: 140, marginLeft: "auto" }}>
              <select
                className="select"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [sb, so] = e.target.value.split("-");
                  setSortBy(sb);
                  setSortOrder(so);
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="riskScore-desc">Highest Risk First</option>
                <option value="riskScore-asc">Lowest Risk First</option>
              </select>
            </div>

            {(searchQuery || selectedType || selectedRisk || selectedPlatform) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-outline btn-sm"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── Reports Grid ─── */}
        {error ? (
          <div className="card" style={{ textAlign: "center", padding: 36, color: "var(--risk-high)" }}>
            {error}
          </div>
        ) : loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="card" style={{ height: 200, background: "#0E1428" }} />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div
            className="card"
            style={{
              textAlign: "center",
              padding: "48px 20px",
              background: "var(--surface-elevated)",
            }}
          >
            <ShieldCheck size={36} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No reports found</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, maxWidth: 420, margin: "0 auto 18px" }}>
              No published community intelligence matches your current search criteria. Try loosening your filters or submit a new report.
            </p>
            <button onClick={handleResetFilters} className="btn btn-secondary btn-sm">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 16,
            }}
          >
            {reports.map((report) => {
              const prov = getProvenanceBadge(report.sourceType, report.datasetSource);
              return (
                <Link
                  key={report.id}
                  to={`/reports/${report.id}`}
                  className="card card-interactive"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 14,
                    textDecoration: "none",
                  }}
                >
                  <div>
                    {/* Header: Risk + Platform */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <RiskBadge level={report.riskLevel} score={report.riskScore} size="sm" />
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: "4px",
                            background: prov.bg,
                            color: prov.color,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {prov.label}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-primary)",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: 10,
                      }}
                    >
                      {report.publicSummary || "Incident investigated and published by analyst desk."}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      paddingTop: 10,
                      borderTop: "1px solid var(--surface-border)",
                    }}
                  >
                    <span>
                      {report.platform || "Direct"} • {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                    <span style={{ color: "var(--accent)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                      Case Details <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ─── Pagination Controls ─── */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
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
      </main>
    </div>
  );
}
