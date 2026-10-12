import React from "react";
import { ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";

export default function RiskBadge({ level, score = null, size = "md" }) {
  const norm = (level || "").toUpperCase();

  if (norm.includes("HIGH") || norm.includes("CRITICAL")) {
    return (
      <span className={`badge badge-high ${size === "sm" ? "text-xs" : ""}`}>
        <ShieldAlert size={size === "sm" ? 12 : 14} />
        High Risk {score !== null ? `(${Math.round(score * 100)}%)` : ""}
      </span>
    );
  }

  if (norm.includes("CAUTION") || norm.includes("MEDIUM")) {
    return (
      <span className={`badge badge-caution ${size === "sm" ? "text-xs" : ""}`}>
        <AlertTriangle size={size === "sm" ? 12 : 14} />
        Needs Caution {score !== null ? `(${Math.round(score * 100)}%)` : ""}
      </span>
    );
  }

  return (
    <span className={`badge badge-low ${size === "sm" ? "text-xs" : ""}`}>
      <ShieldCheck size={size === "sm" ? 12 : 14} />
      Low Signal {score !== null ? `(${Math.round(score * 100)}%)` : ""}
    </span>
  );
}
