import React from "react";

export interface TitleNavBarProps {
  /** First (parent) breadcrumb label — rendered muted */
  parentLabel?: string;
  /** Current (active) breadcrumb label — rendered bold */
  currentLabel?: string;
  /** Optional third-level breadcrumb label */
  childLabel?: string;
  onHomeClick?: () => void;
  onParentClick?: () => void;
  className?: string;
}

export function TitleNavBar({
  parentLabel = "Headline",
  currentLabel = "Headline",
  childLabel,
  onHomeClick,
  onParentClick,
  className = "",
}: TitleNavBarProps) {
  return (
    <div
      style={{
        background: "white",
        borderBottom: "1px solid #d1d5db",
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "100%",
        boxSizing: "border-box",
        minHeight: 60,
      }}
      className={className}
    >
      {/* Building / home icon button */}
      <button
        type="button"
        onClick={onHomeClick}
        aria-label="Home"
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          padding: 8,
          background: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.08)",
          marginLeft: 24,
          color: "#171717",
        }}
      >
        <BuildingIcon />
      </button>

      {/* Vertical divider */}
      <div
        aria-hidden="true"
        style={{
          width: 1,
          height: 24,
          background: "#d1d5db",
          flexShrink: 0,
        }}
      />

      {/* Breadcrumb trail */}
      <div style={{ display: "flex", alignItems: "center", padding: "16px 0", flexShrink: 0 }}>

        {/* Parent (muted) */}
        <button
          type="button"
          onClick={onParentClick}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "28px",
            letterSpacing: "-0.2px",
            color: "#a3a3a3",
            background: "none",
            border: "none",
            padding: 0,
            cursor: onParentClick ? "pointer" : "default",
            whiteSpace: "nowrap",
          }}
        >
          {parentLabel}
        </button>

        {/* Separator chevron */}
        <span style={{ margin: "0 4px", color: "#a3a3a3", display: "inline-flex", alignItems: "center" }}>
          <ChevronRightIcon size={16} />
        </span>

        {/* Current (active) */}
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "28px",
            letterSpacing: "-0.2px",
            color: "#171717",
            whiteSpace: "nowrap",
          }}
        >
          {currentLabel}
        </span>

        {/* Optional third level */}
        {childLabel && (
          <>
            <span style={{ margin: "0 4px", color: "#a3a3a3", display: "inline-flex", alignItems: "center" }}>
              <ChevronRightIcon size={16} />
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: "28px",
                letterSpacing: "-0.2px",
                color: "rgba(255,255,255,0.64)",
                whiteSpace: "nowrap",
              }}
            >
              {childLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="4.5" width="13" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 14.5V10h5v4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 7.5h13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="4" y="1.5" width="8" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
