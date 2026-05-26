import React from "react";

export interface DTopBarProps {
  title?: string;
  showDraftBadge?: boolean;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
}

export function DTopBar({
  title = "Dialog Title",
  showDraftBadge = true,
  onPrimaryAction,
  onSecondaryAction,
  primaryLabel = "Button",
  secondaryLabel = "Button",
  className = "",
}: DTopBarProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "white",
        borderBottom: "1px solid #d1d5db",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 24px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
      className={className}
    >
      {/* Left: title + badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "-0.2px",
            color: "#171717",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>

        {showDraftBadge && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              height: 28,
              padding: "4px 12px",
              background: "#f5f5f5",
              border: "1px solid #d4d4d4",
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            {/* loading/draft icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 2a6 6 0 1 0 6 6"
                stroke="#737373"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "16px",
                letterSpacing: "-0.2px",
                color: "#737373",
                whiteSpace: "nowrap",
              }}
            >
              Draft
            </span>
          </span>
        )}
      </div>

      {/* Right: ghost button */}
      <button
        type="button"
        onClick={onPrimaryAction}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 32,
          minWidth: 32,
          padding: "8px",
          borderRadius: 8,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "16px",
          letterSpacing: "-0.2px",
          color: "#1d32ff",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {primaryLabel}
      </button>

      {/* Right: solid button with star icon */}
      <button
        type="button"
        onClick={onSecondaryAction}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          height: 32,
          minWidth: 32,
          padding: "8px",
          borderRadius: 8,
          border: "none",
          background: "white",
          cursor: "pointer",
          boxShadow:
            "0 0 0 0.5px #e5e5e5, 0 0 0 0px rgba(0,0,0,0.08), 0 1px 1px 0px rgba(0,0,0,0.06), 0 0 0 0px rgba(0,0,0,0.08)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "16px",
          letterSpacing: "-0.2px",
          color: "#171717",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        <StarIcon />
        {secondaryLabel}
      </button>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L8 9.8l-3.2 1.6.6-3.6L2.8 5.3l3.6-.5L8 1.5z"
        stroke="#171717"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
