import React from "react";
import { Shield, Sparkles, Image as ImageIcon, Search } from "lucide-react";

/**
 * Reusable Shimmer Box Component
 */
export function SkeletonBox({ width = "100%", height = 16, borderRadius = 6, style = {} }) {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * CheckResultSkeleton:
 * Mirrored layout of the Instant Scanner result card on CheckPage and HomePage.
 */
export function CheckResultSkeleton({ scanType = "screenshot" }) {
  return (
    <div
      className="fade-in"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      role="status"
      aria-label="Analyzing content, loading results"
    >
      {/* 1. Main Verdict Header Card Skeleton */}
      <div
        className="card"
        style={{
          padding: "24px",
          background: "var(--surface-elevated)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <SkeletonBox width={46} height={46} borderRadius={12} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <SkeletonBox width={100} height={22} borderRadius={999} />
                <SkeletonBox width={140} height={16} />
              </div>
              <SkeletonBox width={260} height={26} borderRadius={6} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 16px",
              background: "var(--bg-subtle)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--surface-border)",
            }}
          >
            <SkeletonBox width={42} height={42} borderRadius="50%" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <SkeletonBox width={60} height={12} />
              <SkeletonBox width={90} height={18} />
            </div>
          </div>
        </div>

        {/* Narrative / Plain Language Summary Skeleton */}
        <div
          style={{
            padding: "16px",
            background: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--surface-border)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            <SkeletonBox width={160} height={14} />
          </div>
          <SkeletonBox width="94%" height={14} />
          <SkeletonBox width="88%" height={14} />
          <SkeletonBox width="65%" height={14} />
        </div>
      </div>

      {/* 2. Forensic Evidence & Scam Clues Skeleton Card */}
      <div
        className="card"
        style={{
          padding: "22px 24px",
          background: "var(--surface-card)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={16} style={{ color: "var(--accent)" }} />
            <SkeletonBox width={200} height={18} />
          </div>
          <SkeletonBox width={90} height={14} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              style={{
                padding: "14px 16px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <SkeletonBox width={36} height={36} borderRadius={8} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <SkeletonBox width={160} height={16} />
                  <SkeletonBox width={70} height={14} borderRadius={999} />
                </div>
                <SkeletonBox width="85%" height={13} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Action Guidance Skeleton */}
      <div
        className="card"
        style={{
          padding: "20px 24px",
          background: "var(--surface-card)",
          border: "1px solid var(--surface-border)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <SkeletonBox width={220} height={16} />
        <SkeletonBox width="80%" height={13} />
      </div>
    </div>
  );
}

/**
 * LogoResultSkeleton:
 * Mirrored layout of the Logo Authenticity Checker results with side-by-side frames.
 */
export function LogoResultSkeleton() {
  return (
    <div
      className="fade-in"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      role="status"
      aria-label="Searching authoritative reference logo and calculating visual similarity"
    >
      {/* 1. Main Verdict Header Skeleton */}
      <div
        className="card"
        style={{
          padding: "24px",
          background: "var(--surface-elevated)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <SkeletonBox width={46} height={46} borderRadius={12} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <SkeletonBox width={120} height={22} borderRadius={999} />
                <SkeletonBox width={160} height={14} />
              </div>
              <SkeletonBox width={280} height={26} borderRadius={6} />
            </div>
          </div>

          <div
            style={{
              padding: "10px 18px",
              background: "var(--bg-subtle)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <SkeletonBox width={48} height={48} borderRadius="50%" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <SkeletonBox width={70} height={12} />
              <SkeletonBox width={100} height={20} />
            </div>
          </div>
        </div>

        <SkeletonBox width="90%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBox width="75%" height={14} />
      </div>

      {/* 2. Side-by-Side Logo Comparison Skeletons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {/* Uploaded Candidate Frame */}
        <div
          className="card"
          style={{
            padding: "20px",
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SkeletonBox width={150} height={16} />
            <SkeletonBox width={60} height={14} borderRadius={4} />
          </div>
          <div
            style={{
              height: 180,
              background: "var(--bg-subtle)",
              borderRadius: 10,
              border: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkeletonBox width={120} height={120} borderRadius={8} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBox width="90%" height={13} />
            <SkeletonBox width="60%" height={13} />
          </div>
        </div>

        {/* Retrieved Reference Frame */}
        <div
          className="card"
          style={{
            padding: "20px",
            background: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SkeletonBox width={170} height={16} />
            <SkeletonBox width={80} height={14} borderRadius={4} />
          </div>
          <div
            style={{
              height: 180,
              background: "var(--bg-subtle)",
              borderRadius: 10,
              border: "1px solid var(--surface-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkeletonBox width={120} height={120} borderRadius={8} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SkeletonBox width="85%" height={13} />
            <SkeletonBox width="70%" height={13} />
          </div>
        </div>
      </div>

      {/* 3. Forensic Differences List Skeleton */}
      <div
        className="card"
        style={{
          padding: "22px 24px",
          background: "var(--surface-card)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <SkeletonBox width={240} height={18} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                padding: "12px 14px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--surface-border)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <SkeletonBox width={28} height={28} borderRadius={6} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <SkeletonBox width={140} height={14} />
                <SkeletonBox width="80%" height={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * ProfileResultSkeleton:
 * Mirrored layout for Social Profile and App Check results.
 */
export function ProfileResultSkeleton() {
  return (
    <div
      className="fade-in"
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
      role="status"
      aria-label="Scanning account profile and evidence"
    >
      <div
        className="card"
        style={{
          padding: "24px",
          background: "var(--surface-elevated)",
          border: "1px solid var(--surface-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <SkeletonBox width={46} height={46} borderRadius={12} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <SkeletonBox width={130} height={20} borderRadius={999} />
              <SkeletonBox width={260} height={24} />
            </div>
          </div>
          <SkeletonBox width={100} height={40} borderRadius={8} />
        </div>
        <SkeletonBox width="90%" height={14} style={{ marginBottom: 6 }} />
        <SkeletonBox width="70%" height={14} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <SkeletonBox width={160} height={18} />
          <SkeletonBox width="90%" height={14} />
          <SkeletonBox width="75%" height={14} />
        </div>
        <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
          <SkeletonBox width={160} height={18} />
          <SkeletonBox width="90%" height={14} />
          <SkeletonBox width="75%" height={14} />
        </div>
      </div>
    </div>
  );
}
