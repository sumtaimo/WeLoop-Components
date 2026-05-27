import React from "react";

export interface SegmentItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonSegmentProps {
  segments: SegmentItem[];
  activeKey?: string;
  disabled?: boolean;
  onChange?: (key: string) => void;
  className?: string;
}

export function ButtonSegment({
  segments,
  activeKey,
  disabled = false,
  onChange,
  className = "",
}: ButtonSegmentProps) {
  return (
    <div
      role="group"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: 2,
        background: "white",
        borderRadius: 8,
        // Shadow is the same enabled or disabled — matches Figma
        boxShadow: "0 0 0 0.5px #e5e5e5, 0 0 0 0px rgba(0,0,0,0.08), 0 1px 1px 0 rgba(0,0,0,0.06)",
        cursor: disabled ? "not-allowed" : "auto",
      }}
    >
      {segments.map((seg) => {
        const isActive = seg.key === activeKey;

        // Active segment shows #f3f4f6 bg even when disabled (matches Figma)
        const itemBg = isActive ? "#f3f4f6" : "transparent";

        // Figma uses two gray values in disabled state:
        //   • active (selected) disabled item:   label-inactive #a3a3a3
        //   • inactive disabled items:           label-disabled  #737373
        const textColor = disabled
          ? isActive
            ? "#a3a3a3"   // selected-but-disabled → lighter gray
            : "#737373"   // unselected-and-disabled → medium gray
          : "#171717";    // enabled → full black

        return (
          <button
            key={seg.key}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange?.(seg.key)}
            aria-pressed={isActive}
            style={{
              flex: "1 0 0",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              minWidth: 0,
              padding: "4px 8px",
              borderRadius: 6,
              border: "none",
              background: itemBg,
              cursor: disabled ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "16px",
              letterSpacing: "-0.2px",
              color: textColor,
              whiteSpace: "nowrap",
              transition: "background 0.12s",
            }}
          >
            {seg.icon && (
              <span
                style={{
                  display: "inline-flex",
                  flexShrink: 0,
                  opacity: disabled ? 0.4 : 1,
                  transition: "opacity 0.12s",
                }}
              >
                {seg.icon}
              </span>
            )}
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
