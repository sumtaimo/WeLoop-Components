import React from "react";
import { IconLoading16, IconStar16 } from "../../atoms/Icon/Icon";

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
            <IconLoading16 size={16} color="currentColor" />
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
        <IconStar16 size={16} color="currentColor" />
        {secondaryLabel}
      </button>
    </div>
  );
}
