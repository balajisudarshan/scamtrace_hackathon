import React, { useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, RefreshCw } from "lucide-react";

/**
 * ScanUploadZone:
 * Animated glowing border container that continuously travels around the perimeter
 * of the image upload field when isScanning is active.
 *
 * Includes:
 * - Travelling gradient border (via conic-gradient in CSS)
 * - Forensic laser sweep beam across uploaded image
 * - Non-intrusive layout preserving existing controls, dimensions, and rounded corners
 * - Fallback for prefers-reduced-motion
 */
export default function ScanUploadZone({
  isScanning = false,
  imagePreview = null,
  fileName = null,
  onFileSelect,
  onClear,
  accept = "image/*",
  label = "Drop suspicious screenshot here or click to browse",
  sublabel = "Supports PNG, JPG, WEBP up to 10MB",
  icon: IconComponent = UploadCloud,
  borderRadius = "var(--radius-lg)",
  previewMaxHeight = 180,
  badgeText = "ANALYZING EVIDENCE",
  style = {},
  className = "",
  children,
}) {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isScanning) return; // Prevent changing file while scan is actively processing
    if (e.dataTransfer.files?.[0] && onFileSelect) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleContainerClick = (e) => {
    // If scanning, do not trigger file selection dialog
    if (isScanning) return;
    // Don't trigger if click came from a button or interactive child
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // If caller passed custom children, wrap them with the scanning border & laser beam
  if (children) {
    return (
      <div
        className={`scan-upload-zone ${isScanning ? "is-scanning" : ""} ${className}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          borderRadius,
          ...style,
        }}
      >
        {isScanning && <div className="scan-laser-beam" aria-hidden="true" />}
        {children}
      </div>
    );
  }

  return (
    <div
      className={`scan-upload-zone ${isScanning ? "is-scanning" : ""} ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleContainerClick}
      style={{
        borderRadius,
        padding: "24px 18px",
        textAlign: "center",
        cursor: isScanning ? "default" : "pointer",
        ...style,
      }}
      role="region"
      aria-label="Image upload container"
    >
      {/* Invisible file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        disabled={isScanning}
        onChange={(e) => {
          if (e.target.files?.[0] && onFileSelect) {
            onFileSelect(e.target.files[0]);
          }
        }}
        style={{ display: "none" }}
        tabIndex={0}
        aria-label="Upload file input"
      />

      {/* Travelling forensic laser sweep line when scanning */}
      {isScanning && <div className="scan-laser-beam" aria-hidden="true" />}

      {imagePreview ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          {/* Active scanning badge tag */}
          {isScanning && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <span className="scan-badge-active">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#38BDF8",
                    display: "inline-block",
                  }}
                />
                {badgeText}
              </span>
            </div>
          )}

          {/* Preview frame */}
          <div
            style={{
              position: "relative",
              padding: 8,
              background: "#080C1A",
              border: isScanning ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid var(--surface-border)",
              borderRadius: 10,
              maxWidth: "100%",
              boxShadow: isScanning ? "0 0 15px rgba(56, 189, 248, 0.15)" : "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <img
              src={imagePreview}
              alt="Uploaded Asset Preview"
              style={{
                maxHeight: previewMaxHeight,
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: 6,
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 8,
              fontSize: 12,
              color: "var(--text-secondary)",
            }}
          >
            <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>
              {fileName || "Selected Image"}
            </span>
            {!isScanning && (
              <>
                <span>•</span>
                <span style={{ color: "var(--text-muted)" }}>Click or drop another image to replace</span>
              </>
            )}
            {!isScanning && onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="btn btn-outline btn-xs"
                style={{
                  padding: "2px 8px",
                  fontSize: 11,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: 4,
                }}
              >
                <X size={11} />
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(59, 130, 246, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
            }}
          >
            <IconComponent size={24} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{label}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{sublabel}</div>
        </div>
      )}
    </div>
  );
}
