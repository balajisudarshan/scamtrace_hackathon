import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle({ showLabel = false, size = 15, style = {}, className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? "Switch to Soft Beige Light mode" : "Switch to GitHub Dark mode"}
      title={isDark ? "Switch to Soft Beige Light Mode" : "Switch to GitHub Dark Mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: showLabel ? "6px 12px" : "7px 8px",
        borderRadius: "var(--radius-md)",
        background: "var(--theme-toggle-bg, var(--surface-card))",
        border: "1px solid var(--surface-border)",
        color: "var(--text-secondary)",
        cursor: "pointer",
        transition: "all var(--transition-fast)",
        outline: "none",
        fontSize: 12,
        fontWeight: 600,
        ...style,
      }}
    >
      {isDark ? (
        <>
          <Sun
            size={size}
            className="theme-toggle-icon"
            style={{ color: "#E3B341", transition: "transform 0.3s ease" }}
          />
          {showLabel && <span>Light</span>}
        </>
      ) : (
        <>
          <Moon
            size={size}
            className="theme-toggle-icon"
            style={{ color: "#2F81F7", transition: "transform 0.3s ease" }}
          />
          {showLabel && <span>Dark</span>}
        </>
      )}
    </button>
  );
}
