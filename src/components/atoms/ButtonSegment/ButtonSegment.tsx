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
        background: disabled ? "#f9fafb" : "white",
        borderRadius: 8,
        boxShadow: disabled
          ? "none"
          : "0 0 0 0.5px #e5e5e5, 0 0 0 0 rgba(0,0,0,0.08), 0 1px 1px 0 rgba(0,0,0,0.06)",
        cursor: disabled ? "not-allowed" : "auto",
      }}
    >
      {segments.map((seg) => {
        const isActive = seg.key === activeKey;
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
              background: isActive && !disabled ? "#f3f4f6" : "transparent",
              cursor: disabled ? "not-allowed" : "pointer",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              lineHeight: "16px",
              letterSpacing: "-0.2px",
              color: disabled ? "#a3a3a3" : "#171717",
              whiteSpace: "nowrap",
            }}
          >
            {seg.icon && (
              <span
                style={{
                  display: "inline-flex",
                  flexShrink: 0,
                  opacity: disabled ? 0.4 : 1,
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
