import React from "react";
import StatusBadge from "./StatusBadge";
import { CheckCircle2, Clock, Eye, AlertCircle, XCircle, Globe2 } from "lucide-react";

export default function ReportTimeline({ statusTimeline = [], currentStatus = "RECEIVED", createdAt = null }) {
  // Synthesize timeline if statusTimeline has past decisions or fallback
  const timelineEvents = statusTimeline && statusTimeline.length > 0
    ? statusTimeline
    : [
        {
          status: currentStatus,
          createdAt: createdAt || new Date().toISOString(),
          rationale: "Report received into SCAMTRACE intelligence ingestion queue.",
        },
      ];

  const getIcon = (status) => {
    switch ((status || "").toUpperCase()) {
      case "PUBLISHED": return <Globe2 size={14} color="#A5B4FC" />;
      case "CORROBORATED": return <CheckCircle2 size={14} color="#34D399" />;
      case "UNDER_REVIEW": return <Eye size={14} color="#60A5FA" />;
      case "DISPUTED": return <AlertCircle size={14} color="#FBBF24" />;
      case "REJECTED": return <XCircle size={14} color="#F87171" />;
      default: return <Clock size={14} color="#CBD5E1" />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {timelineEvents.map((event, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: 14,
            position: "relative",
          }}
        >
          {/* Vertical connector line */}
          {idx < timelineEvents.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 11,
                width: 2,
                bottom: -16,
                background: "var(--surface-border)",
              }}
            />
          )}

          {/* Icon bubble */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#0E152D",
              border: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            {getIcon(event.status)}
          </div>

          {/* Event Content */}
          <div style={{ flex: 1, paddingBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <StatusBadge status={event.status} />
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {event.createdAt ? new Date(event.createdAt).toLocaleString() : ""}
              </span>
            </div>
            {event.rationale && (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  background: "#0D1326",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--surface-border)",
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {event.rationale}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
