import React from "react";

export interface DBottomBarProps {
  dropdownLabel?: string;
  learnMoreLabel?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onDropdownClick?: () => void;
  onLearnMoreClick?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  /** Hide the left action area entirely */
  hideActions?: boolean;
  className?: string;
}

export function DBottomBar({
  dropdownLabel = "Button Option",
  learnMoreLabel = "Learn more",
  primaryLabel = "Button",
  secondaryLabel = "Button",
  onDropdownClick,
  onLearnMoreClick,
  onPrimaryAction,
  onSecondaryAction,
  hideActions = false,
  className = "",
}: DBottomBarProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "white",
        borderTop: "1px solid #d1d5db",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        padding: "12px 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
      className={className}
    >
      {/* Left: dropdown + learn-more link */}
      {!hideActions && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>

          {/* Dropdown button */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 32,
              background: "white",
              borderRadius: 8,
              boxShadow:
                "0 0 0 0.5px #e5e5e5, 0 0 0 0px rgba(0,0,0,0.08), 0 1px 1px 0px rgba(0,0,0,0.06), 0 0 0 0px rgba(0,0,0,0.08)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={onDropdownClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: "16px",
                letterSpacing: "-0.2px",
                color: "#171717",
                whiteSpace: "nowrap",
                minWidth: 20,
              }}
            >
              {dropdownLabel}
            </button>

            {/* Vertical divider inside dropdown */}
            <div style={{ width: 0.5, alignSelf: "stretch", background: "#e5e5e5" }} />

            <button
              type="button"
              onClick={onDropdownClick}
              aria-label="Open dropdown"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#171717",
              }}
            >
              <ChevronDownIcon />
            </button>
          </div>

          {/* Learn more link */}
          <button
            type="button"
            onClick={onLearnMoreClick}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
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
              borderRadius: 6,
              flexShrink: 0,
            }}
          >
            {learnMoreLabel}
            <ChevronRightSmallIcon />
          </button>
        </div>
      )}

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

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightSmallIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
