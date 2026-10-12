import React from "react";
import { Clock, Eye, CheckCircle2, AlertCircle, XCircle, Globe2 } from "lucide-react";

export default function StatusBadge({ status }) {
  const norm = (status || "").toUpperCase();

  const configs = {
    PUBLISHED: {
      label: "Published",
      bg: "rgba(117, 103, 248, 0.15)",
      color: "#A5B4FC",
      border: "rgba(117, 103, 248, 0.3)",
      icon: Globe2,
    },
    CORROBORATED: {
      label: "Corroborated",
      bg: "rgba(16, 185, 129, 0.15)",
      color: "#34D399",
      border: "rgba(16, 185, 129, 0.3)",
      icon: CheckCircle2,
    },
    UNDER_REVIEW: {
      label: "Under Review",
      bg: "rgba(59, 130, 246, 0.15)",
      color: "#60A5FA",
      border: "rgba(59, 130, 246, 0.3)",
      icon: Eye,
    },
    DISPUTED: {
      label: "Disputed",
      bg: "rgba(245, 158, 11, 0.15)",
      color: "#FBBF24",
      border: "rgba(245, 158, 11, 0.3)",
      icon: AlertCircle,
    },
    REJECTED: {
      label: "Rejected",
      bg: "rgba(239, 68, 68, 0.15)",
      color: "#F87171",
      border: "rgba(239, 68, 68, 0.3)",
      icon: XCircle,
    },
    RECEIVED: {
      label: "Received",
      bg: "rgba(148, 163, 184, 0.12)",
      color: "#CBD5E1",
      border: "rgba(148, 163, 184, 0.25)",
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
