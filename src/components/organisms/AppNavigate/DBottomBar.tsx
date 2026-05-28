import React from "react";
import { IconChevron165, IconChevron163, IconStar16 } from "../../atoms/Icon/Icon";

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
              <IconChevron165 size={16} color="currentColor" />
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
            <IconChevron163 size={12} color="currentColor" />
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
        <IconStar16 size={16} color="currentColor" />
        {secondaryLabel}
      </button>
    </div>
  );
}
