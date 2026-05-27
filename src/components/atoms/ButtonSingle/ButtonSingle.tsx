import React, { useState } from "react";

export type ButtonSingleType    = "primary" | "danger" | "ghost";
export type ButtonSingleVariant = "filled" | "outline" | "ghost";
export type ButtonSingleSize    = "xs" | "sm" | "md";

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

// ─── Size tokens ──────────────────────────────────────────────────────────────
const sizes: Record<ButtonSingleSize, React.CSSProperties> = {
  xs: { height: 24, padding: "4px 8px",   borderRadius: 6,  fontSize: 12, lineHeight: "16px", gap: 4 },
  sm: { height: 32, padding: "8px 8px",   borderRadius: 8,  fontSize: 14, lineHeight: "16px", gap: 4 },
  md: { height: 40, padding: "10px 12px", borderRadius: 10, fontSize: 14, lineHeight: "16px", gap: 4 },
};

// ─── Default (rest) styles ────────────────────────────────────────────────────
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

const outlineStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "#1d32ff", border: "1.5px solid #1d32ff" },
  danger:  { background: "transparent", color: "#e1232e", border: "1.5px solid #e1232e" },
  ghost:   { background: "transparent", color: "#171717", border: "1.5px solid #d1d5db" },
};

const ghostStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "#1d32ff", border: "none" },
  danger:  { background: "transparent", color: "#e1232e", border: "none" },
  ghost:   { background: "transparent", color: "#171717", border: "none" },
};

// ─── Hover styles ─────────────────────────────────────────────────────────────
const filledHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: {
    background: "#3E60FF",
    color: "#fafafa",
    border: "none",
    boxShadow: "0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5)",
  },
  danger: {
    background: "#FC6D75",
    color: "#fff",
    border: "none",
    boxShadow: "0 0 0 1px #bd1822, 0 1px 1px 0 rgba(189,24,34,0.4)",
  },
  ghost: {
    background: "#262626",
    color: "#fafafa",
    border: "none",
    boxShadow: "0 0 0 0.5px #e5e5e5, 0 1px 1px 0 rgba(0,0,0,0.06)",
  },
};

const outlineHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#EAF3FF", color: "#1d32ff", border: "1.5px solid #1d32ff" },
  danger:  { background: "#FFE1E3", color: "#e1232e", border: "1.5px solid #e1232e" },
  ghost:   { background: "#F5F5F5", color: "#171717", border: "1.5px solid #d1d5db" },
};

const ghostHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#F5F5F5", color: "#1d32ff", border: "none" },
  danger:  { background: "#F5F5F5", color: "#e1232e", border: "none" },
  ghost:   { background: "#F5F5F5", color: "#171717", border: "none" },
};

// ─── Pressed styles ───────────────────────────────────────────────────────────
const filledPressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#0F1FEA", color: "#fafafa", border: "none", boxShadow: "none" },
  danger:  { background: "#BD1822", color: "#fff",    border: "none", boxShadow: "none" },
  ghost:   { background: "#404040", color: "#fafafa", border: "none", boxShadow: "none" },
};

const outlinePressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#D8E9FF", color: "#1d32ff", border: "1.5px solid #1d32ff" },
  danger:  { background: "#FFE1E3", color: "#e1232e", border: "1.5px solid #bd1822" },
  ghost:   { background: "#E5E5E5", color: "#171717", border: "1.5px solid #d4d4d4" },
};

const ghostPressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#F3F4F6", color: "#1d32ff", border: "none" },
  danger:  { background: "#F3F4F6", color: "#e1232e", border: "none" },
  ghost:   { background: "#F3F4F6", color: "#171717", border: "none" },
};

// ─── Disabled styles (variant-aware) ─────────────────────────────────────────
const disabledFilledStyle: React.CSSProperties = {
  background: "#e5e5e5",
  color: "#a3a3a3",
  border: "none",
  boxShadow: "none",
  cursor: "not-allowed",
};

const disabledOutlineStyle: React.CSSProperties = {
  background: "transparent",
  color: "#a3a3a3",
  border: "1.5px solid #e5e5e5",
  boxShadow: "none",
  cursor: "not-allowed",
};

const disabledGhostStyle: React.CSSProperties = {
  background: "transparent",
  color: "#a3a3a3",
  border: "none",
  boxShadow: "none",
  cursor: "not-allowed",
};

// ─── Helper to resolve the right style object ─────────────────────────────────
function resolveStyle(
  variant: ButtonSingleVariant,
  buttonType: ButtonSingleType,
  disabled: boolean,
  hovered: boolean,
  pressed: boolean,
): React.CSSProperties {
  if (disabled) {
    if (variant === "filled")  return disabledFilledStyle;
    if (variant === "outline") return disabledOutlineStyle;
    return disabledGhostStyle;
  }
  if (pressed) {
    if (variant === "filled")  return filledPressedStyles[buttonType];
    if (variant === "outline") return outlinePressedStyles[buttonType];
    return ghostPressedStyles[buttonType];
  }
  if (hovered) {
    if (variant === "filled")  return filledHoverStyles[buttonType];
    if (variant === "outline") return outlineHoverStyles[buttonType];
    return ghostHoverStyles[buttonType];
  }
  if (variant === "filled")  return filledStyles[buttonType];
  if (variant === "outline") return outlineStyles[buttonType];
  return ghostStyles[buttonType];
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ButtonSingle({
  buttonType = "primary",
  variant = "filled",
  size = "sm",
  leadIcon,
  shortcut,
  children,
  disabled,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}: ButtonSingleProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizeStyle    = sizes[size];
  const variantStyle = resolveStyle(variant, buttonType, !!disabled, hovered, pressed);

  return (
    <button
      {...props}
      disabled={disabled}
      onMouseEnter={(e) => { if (!disabled) setHovered(true);  onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e)  => { if (!disabled) setPressed(true); onMouseDown?.(e); }}
      onMouseUp={(e)    => { setPressed(false); onMouseUp?.(e); }}
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
        transition: "background 0.12s, box-shadow 0.12s, border-color 0.12s",
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
