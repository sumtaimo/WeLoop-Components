import React from "react";
import { IconChevron162, IconChevron163, IconClose16 } from "../../atoms/Icon/Icon";

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
            <IconChevron162 size={16} color="currentColor" />
          </button>
          <button
            type="button"
            onClick={onForward}
            aria-label="Forward"
            style={iconBtnStyle}
          >
            <IconChevron163 size={16} color="currentColor" />
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
        <IconClose16 size={16} color="currentColor" />
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

