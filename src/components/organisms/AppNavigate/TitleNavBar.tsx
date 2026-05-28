import React from "react";
import { IconBuilding16, IconChevron163 } from "../../atoms/Icon/Icon";

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
        <IconBuilding16 size={16} color="currentColor" />
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
          <IconChevron163 size={16} color="currentColor" />
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
              <IconChevron163 size={16} color="currentColor" />
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

