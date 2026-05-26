import React from "react";

export interface DialogSettingBarProps {
  title?: string;
  onBack?: () => void;
  onForward?: () => void;
  onClose?: () => void;
  className?: string;
}

export function DialogSettingBar({
  title = "Dialog Title",
  onBack,
  onForward,
  onClose,
  className = "",
}: DialogSettingBarProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "white",
        borderBottom: "1px solid #d1d5db",
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
      className={className}
    >
      {/* Left: chevron nav + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            style={iconBtnStyle}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={onForward}
            aria-label="Forward"
            style={iconBtnStyle}
          >
            <ChevronRightIcon />
          </button>
        </div>

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
      </div>

      {/* Right: close icon */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={iconBtnStyle}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  padding: 0,
  cursor: "pointer",
  flexShrink: 0,
  color: "#171717",
};

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
