import React from "react";

export type ButtonSingleType = "primary" | "danger" | "ghost";
export type ButtonSingleVariant = "filled" | "outline" | "ghost";
export type ButtonSingleSize = "xs" | "sm" | "md";

export interface ButtonSingleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual colour theme */
  buttonType?: ButtonSingleType;
  /** Fill style */
  variant?: ButtonSingleVariant;
  size?: ButtonSingleSize;
  leadIcon?: React.ReactNode;
  /** Keyboard shortcut badge displayed inside the button */
  shortcut?: string;
}

// ─── design tokens ────────────────────────────────────────────────────────────

const sizes: Record<ButtonSingleSize, React.CSSProperties> = {
  xs: { height: 24, padding: "4px 8px", borderRadius: 6, fontSize: 12, lineHeight: "16px", gap: 4 },
  sm: { height: 32, padding: "8px 8px", borderRadius: 8, fontSize: 14, lineHeight: "16px", gap: 4 },
  md: { height: 40, padding: "10px 12px", borderRadius: 8, fontSize: 14, lineHeight: "16px", gap: 4 },
};

// filled styles
const filledStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: {
    background: "#1d32ff",
    color: "#fafafa",
    border: "none",
    boxShadow: "0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5), 0 2px 3px 0 rgba(18,33,193,0.1)",
  },
  danger: {
    background: "#e1232e",
    color: "#fff",
    border: "none",
    boxShadow: "0 0 0 1px #bd1822, 0 1px 1px 0 rgba(189,24,34,0.4), 0 2px 3px 0 rgba(189,24,34,0.1)",
  },
  ghost: {
    background: "#171717",
    color: "#fafafa",
    border: "none",
    boxShadow: "0 0 0 0.5px #e5e5e5, 0 1px 1px 0 rgba(0,0,0,0.06)",
  },
};

// outline styles
const outlineStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "#1d32ff", border: "1.5px solid #1d32ff" },
  danger:  { background: "transparent", color: "#e1232e", border: "1.5px solid #e1232e" },
  ghost:   { background: "transparent", color: "#171717", border: "1.5px solid #d1d5db" },
};

// ghost (text only) styles
const ghostStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "#1d32ff", border: "none" },
  danger:  { background: "transparent", color: "#e1232e", border: "none" },
  ghost:   { background: "transparent", color: "#171717", border: "none" },
};

const disabledStyle: React.CSSProperties = {
  background: "#f5f5f5",
  color: "#a3a3a3",
  border: "1px solid #e5e5e5",
  boxShadow: "none",
  cursor: "not-allowed",
};

export function ButtonSingle({
  buttonType = "primary",
  variant = "filled",
  size = "sm",
  leadIcon,
  shortcut,
  children,
  disabled,
  style,
  ...props
}: ButtonSingleProps) {
  const sizeStyle = sizes[size];

  let variantStyle: React.CSSProperties;
  if (disabled) {
    variantStyle = disabledStyle;
  } else if (variant === "filled") {
    variantStyle = filledStyles[buttonType];
  } else if (variant === "outline") {
    variantStyle = outlineStyles[buttonType];
  } else {
    variantStyle = ghostStyles[buttonType];
  }

  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        letterSpacing: "-0.2px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
        boxSizing: "border-box",
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
    >
      {leadIcon && (
        <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
          {leadIcon}
        </span>
      )}
      {children && (
        <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center" }}>
          {children}
        </span>
      )}
      {shortcut && !disabled && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10,10,10,0.12)",
            borderRadius: 5,
            padding: "2px 4px",
            fontSize: 10,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
            letterSpacing: 0,
            flexShrink: 0,
          }}
        >
          {shortcut}
        </span>
      )}
    </button>
  );
}
