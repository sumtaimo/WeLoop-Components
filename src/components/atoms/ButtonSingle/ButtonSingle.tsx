import React, { useState, useEffect } from "react";

// ─── Spinner keyframes (injected once into the document) ──────────────────────
const SPIN_KEYFRAMES = `@keyframes wl-spin { to { transform: rotate(360deg); } }`;

function injectSpinKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("wl-spin-keyframes")) return;
  const style = document.createElement("style");
  style.id = "wl-spin-keyframes";
  style.textContent = SPIN_KEYFRAMES;
  document.head.appendChild(style);
}

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
  /** When true, shows a spinning loader and disables the button */
  loading?: boolean;
  /** When true and leadIcon is provided, shows only the icon (square button, no label) */
  iconOnly?: boolean;
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
    background: "var(--color-bg-brand-primary, #1d32ff)",
    color: "var(--color-text-on-bg-primary, #fafafa)",
    border: "none",
    boxShadow: "var(--shadow-brand-default, 0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5), 0 2px 3px 0 rgba(18,33,193,0.1))",
  },
  danger: {
    background: "var(--color-bg-danger-default, #e1232e)",
    color: "#fff",
    border: "none",
    boxShadow: "var(--shadow-danger-default, 0 0 0 1px #bd1822, 0 1px 1px 0 rgba(189,24,34,0.4), 0 2px 3px 0 rgba(189,24,34,0.1))",
  },
  ghost: {
    background: "#171717",
    color: "#fafafa",
    border: "none",
    boxShadow: "var(--shadow-default-default, 0 0 0 0.5px #e5e5e5, 0 1px 1px 0 rgba(0,0,0,0.06))",
  },
};

const outlineStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "var(--color-text-brand, #1d32ff)", border: "1.5px solid var(--color-border-brand, #1d32ff)" },
  danger:  { background: "transparent", color: "var(--color-text-danger, #e1232e)", border: "1.5px solid var(--color-border-danger, #e1232e)" },
  ghost:   { background: "transparent", color: "#171717", border: "1.5px solid #d1d5db" },
};

const ghostStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "transparent", color: "var(--color-text-brand, #1d32ff)", border: "none" },
  danger:  { background: "transparent", color: "var(--color-text-danger, #e1232e)", border: "none" },
  ghost:   { background: "transparent", color: "#171717", border: "none" },
};

// ─── Hover styles ─────────────────────────────────────────────────────────────
const filledHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: {
    background: "var(--color-bg-brand-subtle-hover, #3E60FF)",
    color: "var(--color-text-on-bg-primary, #fafafa)",
    border: "none",
    boxShadow: "var(--shadow-brand-hover, 0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5))",
  },
  danger: {
    background: "var(--color-bg-danger-subtle-hover, #FC6D75)",
    color: "#fff",
    border: "none",
    boxShadow: "var(--shadow-danger-hover, 0 0 0 1px #bd1822, 0 1px 1px 0 rgba(189,24,34,0.4))",
  },
  ghost: {
    background: "#262626",
    color: "#fafafa",
    border: "none",
    boxShadow: "var(--shadow-default-hover, 0 0 0 0.5px #e5e5e5, 0 1px 1px 0 rgba(0,0,0,0.06))",
  },
};

const outlineHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "var(--color-bg-brand-contrast, #EAF3FF)", color: "var(--color-text-brand, #1d32ff)", border: "1.5px solid var(--color-border-brand, #1d32ff)" },
  danger:  { background: "var(--color-bg-danger-subtle, #FFE1E3)",   color: "var(--color-text-danger, #e1232e)", border: "1.5px solid var(--color-border-danger, #e1232e)" },
  ghost:   { background: "#F5F5F5", color: "#171717", border: "1.5px solid #d1d5db" },
};

const ghostHoverStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#F5F5F5", color: "var(--color-text-brand, #1d32ff)", border: "none" },
  danger:  { background: "#F5F5F5", color: "var(--color-text-danger, #e1232e)", border: "none" },
  ghost:   { background: "#F5F5F5", color: "#171717", border: "none" },
};

// ─── Pressed styles ───────────────────────────────────────────────────────────
const filledPressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "var(--color-bg-brand-subtle-press, #0F1FEA)", color: "var(--color-text-on-bg-primary, #fafafa)", border: "none", boxShadow: "none" },
  danger:  { background: "var(--color-bg-danger-default, #BD1822)",     color: "#fff",    border: "none", boxShadow: "none" },
  ghost:   { background: "#404040", color: "#fafafa", border: "none", boxShadow: "none" },
};

const outlinePressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "var(--color-bg-brand-subtle, #D8E9FF)",   color: "var(--color-text-brand, #1d32ff)", border: "1.5px solid var(--color-border-brand, #1d32ff)" },
  danger:  { background: "var(--color-bg-danger-subtle, #FFE1E3)",  color: "var(--color-text-danger, #e1232e)", border: "1.5px solid var(--color-border-danger, #bd1822)" },
  ghost:   { background: "#E5E5E5", color: "#171717", border: "1.5px solid #d4d4d4" },
};

const ghostPressedStyles: Record<ButtonSingleType, React.CSSProperties> = {
  primary: { background: "#F3F4F6", color: "var(--color-text-brand, #1d32ff)", border: "none" },
  danger:  { background: "#F3F4F6", color: "var(--color-text-danger, #e1232e)", border: "none" },
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

// ─── Square size tokens for iconOnly ─────────────────────────────────────────
const iconOnlySizes: Record<ButtonSingleSize, React.CSSProperties> = {
  xs: { height: 24, width: 24, padding: 0, borderRadius: 6,  fontSize: 12, lineHeight: "16px", gap: 0 },
  sm: { height: 32, width: 32, padding: 0, borderRadius: 8,  fontSize: 14, lineHeight: "16px", gap: 0 },
  md: { height: 40, width: 40, padding: 0, borderRadius: 10, fontSize: 14, lineHeight: "16px", gap: 0 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function ButtonSingle({
  buttonType = "primary",
  variant = "filled",
  size = "sm",
  leadIcon,
  shortcut,
  children,
  disabled,
  loading = false,
  iconOnly = false,
  style,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}: ButtonSingleProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Inject spinner keyframes on first render
  useEffect(() => { injectSpinKeyframes(); }, []);

  const isDisabled = !!disabled || loading;
  const sizeStyle    = (iconOnly && leadIcon) ? iconOnlySizes[size] : sizes[size];
  const variantStyle = resolveStyle(variant, buttonType, isDisabled, hovered, pressed);

  return (
    <button
      {...props}
      disabled={isDisabled}
      onMouseEnter={(e) => { if (!isDisabled) setHovered(true);  onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e)  => { if (!isDisabled) setPressed(true); onMouseDown?.(e); }}
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
        cursor: isDisabled ? "not-allowed" : "pointer",
        flexShrink: 0,
        boxSizing: "border-box",
        transition: "background 0.12s, box-shadow 0.12s, border-color 0.12s",
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
    >
      {loading ? (
        <span
          style={{
            display: "inline-block",
            width: 14,
            height: 14,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "wl-spin var(--motion-duration-slow, 300ms) linear infinite",
            flexShrink: 0,
          }}
        />
      ) : (
        <>
          {leadIcon && (
            <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
              {leadIcon}
            </span>
          )}
          {!iconOnly && children && (
            <span style={{ display: "inline-flex", flexDirection: "column", justifyContent: "center" }}>
              {children}
            </span>
          )}
          {!iconOnly && shortcut && !isDisabled && (
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
        </>
      )}
    </button>
  );
}
