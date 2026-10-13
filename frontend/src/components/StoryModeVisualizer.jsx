import React, { useState } from "react";
import { Fingerprint, AlertOctagon, HelpCircle, ChevronRight } from "lucide-react";

/**
 * StoryModeVisualizer
 * Renders interactive phrase-by-phrase forensic breakdown from backend storyMode array.
 */
export default function StoryModeVisualizer({ storyMode = [], rawContent = "" }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!storyMode || storyMode.length === 0) {
    return (
      <div
        style={{
          background: "var(--surface-card)",
          border: "1px dashed var(--surface-border)",
          borderRadius: "var(--radius-lg)",
          padding: "24px",
          textAlign: "center",
          color: "var(--text-muted)",
        }}
      >
        <Fingerprint size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
        <p style={{ fontSize: 14 }}>
          No specific social engineering tactic phrases matched for this content.
        </p>
      </div>
    );
  }

  const getTacticBadge = (tactic) => {
    const t = (tactic || "").toLowerCase();
    if (t.includes("urgency") || t.includes("deadline")) {
      return { label: "Artificial Urgency", color: "var(--risk-high)", bg: "var(--risk-high-bg)" };
    }
    if (t.includes("authority") || t.includes("impersonat")) {
      return { label: "False Authority", color: "var(--risk-caution)", bg: "var(--risk-caution-bg)" };
    }
    if (t.includes("reward") || t.includes("lure")) {
      return { label: "Bait / Reward", color: "var(--risk-low)", bg: "var(--risk-low-bg)" };
    }
    if (t.includes("otp") || t.includes("credential")) {
      return { label: "Credential Harvesting", color: "var(--risk-high)", bg: "var(--risk-high-bg)" };
    }
    return { label: tactic.replace(/_/g, " "), color: "var(--accent)", bg: "var(--accent-subtle)" };
  };

  const activeItem = storyMode[selectedIdx] || storyMode[0];
  const activeBadge = getTacticBadge(activeItem.tactic);

  return (
    <div
      style={{
        background: "var(--surface-elevated)",
        border: "1px solid var(--surface-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--surface-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--table-header-bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "6px",
              background: "rgba(59, 130, 246, 0.12)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fingerprint size={17} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>Tactic & Trigger Breakdown</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Phrase-level extraction of manipulation patterns and psychological lures
            </p>
          </div>
        </div>
        <span
          style={{
            fontSize: 12,
            background: "rgba(255, 255, 255, 0.05)",
            padding: "4px 8px",
            borderRadius: "4px",
            color: "var(--text-secondary)",
          }}
        >
          {storyMode.length} tactic clue{storyMode.length > 1 ? "s" : ""} detected
        </span>
      </div>

      {/* Main Story Content Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          padding: "20px",
        }}
      >
        {/* Left: Clue list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
            Detected Clues
          </div>
          {storyMode.map((item, idx) => {
            const badge = getTacticBadge(item.tactic);
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  background: isSelected ? "var(--surface-card)" : "var(--bg-subtle)",
                  border: isSelected
                    ? "1px solid var(--accent)"
                    : "1px solid var(--surface-border)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: badge.color,
                      textTransform: "uppercase",
                    }}
                  >
                    {badge.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                      fontStyle: "italic",
                    }}
                  >
                    "{item.phrase}"
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  style={{
                    color: isSelected ? "var(--accent)" : "var(--text-muted)",
                    transform: isSelected ? "translateX(2px)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Right: Forensic Explanation Card */}
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "var(--radius-md)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span
                style={{
                  background: activeBadge.bg,
                  color: activeBadge.color,
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                {activeBadge.label}
              </span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                Signal #{selectedIdx + 1} of {storyMode.length}
              </span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                Exact Matched Phrase:
              </div>
              <div
                style={{
                  background: "var(--risk-high-bg)",
                  border: "1px solid var(--risk-high-border)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "var(--risk-high)",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "monospace",
                }}
              >
                "{activeItem.phrase}"
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                Why this manipulation pattern matters:
              </div>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {activeItem.explanation}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              paddingTop: 12,
              borderTop: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--text-muted)",
            }}
          >
            <HelpCircle size={14} style={{ color: "var(--accent)" }} />
            <span>Deterministic rule engine grounded in exact matched substrings.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
