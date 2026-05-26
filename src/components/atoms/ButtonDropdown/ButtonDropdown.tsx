import React from "react";

export type ButtonDropdownType = "primary" | "common";
export type ButtonDropdownSize = "xs" | "sm" | "md";

export interface ButtonDropdownProps {
  buttonType?: ButtonDropdownType;
  size?: ButtonDropdownSize;
  /** Show filled (solid) or outline style */
  filled?: boolean;
  label?: string;
  leadIcon?: React.ReactNode;
  /** Whether the chevron points up (open state) */
  open?: boolean;
  disabled?: boolean;
  onLabelClick?: () => void;
  onChevronClick?: () => void;
  className?: string;
}

const sizes: Record<ButtonDropdownSize, {
  height: number;
  labelPx: number;
  chevronPx: number;
  py: number;
  radius: number;
  fontSize: number;
}> = {
  xs: { height: 24, labelPx: 8,  chevronPx: 8,  py: 4, radius: 6, fontSize: 12 },
  sm: { height: 32, labelPx: 12, chevronPx: 12, py: 8, radius: 8, fontSize: 14 },
  md: { height: 36, labelPx: 14, chevronPx: 12, py: 8, radius: 8, fontSize: 14 },
};

// filled
const filledContainerStyle: Record<ButtonDropdownType, React.CSSProperties> = {
  primary: {
    background: "#1d32ff",
    boxShadow: "0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5), 0 2px 3px 0 rgba(18,33,193,0.1)",
    color: "#fafafa",
  },
  common: {
    background: "white",
    boxShadow: "0 0 0 0.5px #e5e5e5, 0 0 0 0px rgba(0,0,0,0.08), 0 1px 1px 0 rgba(0,0,0,0.06)",
    color: "#171717",
  },
};

// outline
const outlineContainerStyle: Record<ButtonDropdownType, React.CSSProperties> = {
  primary: {
    background: "transparent",
    border: "1.5px solid #1d32ff",
    color: "#1d32ff",
  },
  common: {
    background: "transparent",
    border: "1.5px solid #d1d5db",
    color: "#171717",
  },
};

const disabledContainerStyle: React.CSSProperties = {
  background: "#f5f5f5",
  color: "#a3a3a3",
  border: "1px solid #e5e5e5",
  boxShadow: "none",
  cursor: "not-allowed",
};

const dividerColor: Record<ButtonDropdownType, string> = {
  primary: "rgba(255,255,255,0.25)",
  common: "#e5e5e5",
};

export function ButtonDropdown({
  buttonType = "primary",
  size = "sm",
  filled = true,
  label = "Button Option",
  leadIcon,
  open = false,
  disabled = false,
  onLabelClick,
  onChevronClick,
  className = "",
}: ButtonDropdownProps) {
  const s = sizes[size];

  let containerStyle: React.CSSProperties;
  if (disabled) {
    containerStyle = disabledContainerStyle;
  } else if (filled) {
    containerStyle = filledContainerStyle[buttonType];
  } else {
    containerStyle = outlineContainerStyle[buttonType];
  }

  const divColor = disabled ? "#e5e5e5" : dividerColor[buttonType];

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "stretch",
        height: s.height,
        borderRadius: s.radius,
        overflow: "hidden",
        flexShrink: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        ...containerStyle,
      }}
    >
      {/* Label section */}
      <button
        type="button"
        disabled={disabled}
        onClick={onLabelClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: "100%",
          padding: `${s.py}px ${s.labelPx}px`,
          border: "none",
          background: "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: s.fontSize,
          lineHeight: "16px",
          letterSpacing: "-0.2px",
          color: "inherit",
          whiteSpace: "nowrap",
          minWidth: 20,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {leadIcon && (
          <span style={{ display: "inline-flex", flexShrink: 0 }}>{leadIcon}</span>
        )}
        {label}
      </button>

      {/* Vertical divider */}
      <div style={{ width: 0.5, background: divColor, alignSelf: "stretch", flexShrink: 0 }} />

      {/* Chevron section */}
      <button
        type="button"
        disabled={disabled}
        onClick={onChevronClick ?? onLabelClick}
        aria-label={open ? "Close options" : "Open options"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: `${s.py}px ${s.chevronPx}px`,
          border: "none",
          background: "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
          color: "inherit",
          flexShrink: 0,
        }}
      >
        <ChevronIcon open={open} />
      </button>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
