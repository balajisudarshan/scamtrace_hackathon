import React, { useState, useEffect } from "react";
import { Clock, AlertCircle, RefreshCw, X } from "lucide-react";

/**
 * ScanProgressFeedback:
 * Real contextual progress feedback, cold-start disclosure for free-tier hosting,
 * and friendly retry action when requests take longer or time out.
 */
export default function ScanProgressFeedback({
  isScanning = false,
  error = null,
  onRetry = null,
  onCancel = null,
  scanType = "image", // "image" | "logo" | "profile" | "app"
  style = {},
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isScanning) {
      setElapsed(0);
      timer = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isScanning]);

  if (!isScanning && !error) return null;

  // Determine stage description based on actual elapsed time
  let statusText = "";

  if (isScanning) {
    if (elapsed < 3) {
      statusText = "Preparing asset and computing digital fingerprint...";
    } else if (elapsed < 8) {
      statusText = "Connecting to SCAMTRACE verification services...";
    } else if (elapsed < 20) {
      statusText = "Validating visual indicators and official registries...";
    } else {
      statusText = "Deep visual comparison and forensic checks in progress...";
    }
  }

  // Error / Timeout Retry State
  if (error && !isScanning) {
    const isTimeout =
      error.isTimeout ||
      error.isColdStart ||
      (typeof error.message === "string" && (error.message.includes("timed out") || error.message.includes("Network connection")));

    return (
      <div
        className="fade-in"
        style={{
          padding: "14px 16px",
          background: isTimeout ? "rgba(245, 158, 11, 0.12)" : "var(--risk-high-bg)",
          border: isTimeout ? "1px solid rgba(245, 158, 11, 0.35)" : "1px solid var(--risk-high-border)",
          borderRadius: "var(--radius-md)",
          color: isTimeout ? "#FDE68A" : "#FCA5A5",
          fontSize: 13,
          marginBottom: 16,
          ...style,
        }}
        role="alert"
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <AlertCircle size={18} style={{ color: isTimeout ? "#F59E0B" : "#EF4444", flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>
              {isTimeout ? "Connection Response Delayed" : "Scan Could Not Be Completed"}
            </div>
            <div style={{ lineHeight: 1.5, marginBottom: onRetry ? 10 : 0 }}>
              {error.message || String(error)}
            </div>
            {isTimeout && (
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
                💡 The verification took longer than expected. Your image and inputs are preserved. Click "Retry Scan" to continue.
              </div>
            )}
            {onRetry && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <button
                  type="button"
                  onClick={onRetry}
                  className="btn btn-sm"
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                  }}
                >
                  <RefreshCw size={12} />
                  <span>Retry Scan</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Scanning Progress State
  return (
    <div
      className="fade-in"
      style={{
        padding: "12px 14px",
        background: "rgba(59, 130, 246, 0.08)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        borderRadius: "var(--radius-md)",
        fontSize: 12.5,
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 16,
        ...style,
      }}
      role="status"
      aria-live="polite"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 260 }}>
        <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2, flexShrink: 0 }} />
        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{statusText}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: "var(--text-muted)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--text-secondary)", fontWeight: 500 }}>
          <Clock size={12} style={{ color: "var(--accent)" }} />
          Elapsed: {elapsed}s
        </span>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: 11,
              padding: "2px 6px",
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
            }}
            title="Cancel scan"
          >
            <X size={11} />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
