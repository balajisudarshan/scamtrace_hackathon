import React from "react";
import { Clock, Eye, CheckCircle2, AlertCircle, XCircle, Globe2 } from "lucide-react";

export default function StatusBadge({ status }) {
  const norm = (status || "").toUpperCase();

  const configs = {
    PUBLISHED: {
      label: "Published",
      bg: "rgba(59, 130, 246, 0.12)",
      color: "var(--status-published)",
      border: "rgba(59, 130, 246, 0.25)",
      icon: Globe2,
    },
    CORROBORATED: {
      label: "Corroborated",
      bg: "rgba(16, 185, 129, 0.12)",
      color: "var(--status-corroborated)",
      border: "rgba(16, 185, 129, 0.3)",
      icon: CheckCircle2,
    },
    UNDER_REVIEW: {
      label: "Under Review",
      bg: "rgba(59, 130, 246, 0.12)",
      color: "var(--status-review)",
      border: "rgba(59, 130, 246, 0.25)",
      icon: Eye,
    },
    DISPUTED: {
      label: "Disputed",
      bg: "rgba(245, 158, 11, 0.12)",
      color: "var(--status-disputed)",
      border: "rgba(245, 158, 11, 0.3)",
      icon: AlertCircle,
    },
    REJECTED: {
      label: "Rejected",
      bg: "rgba(239, 68, 68, 0.12)",
      color: "var(--status-rejected)",
      border: "rgba(239, 68, 68, 0.3)",
      icon: XCircle,
    },
    RECEIVED: {
      label: "Received",
      bg: "var(--surface-card)",
      color: "var(--status-received)",
      border: "var(--surface-border)",
      icon: Clock,
    },
  };

  const current = configs[norm] || configs.RECEIVED;
  const Icon = current.icon;

  return (
    <span
      className="badge"
      style={{
        background: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`,
        padding: "3px 8px",
        fontSize: "11px",
        borderRadius: "6px",
      }}
    >
      <Icon size={12} />
      {current.label}
    </span>
  );
}
