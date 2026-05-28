import React from "react";
import { IconInfo16, IconCheck161, IconWarning16, IconClose161, IconClose16 } from "../../atoms/Icon/Icon";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BannerType =
  | "information"
  | "success"
  | "warning"
  | "critical"
  | "actionable"
  | "multiActionable"
  | "multiCritical"
  | "multiWarning";

export interface BannerProps {
  /** Visual style variant — maps to Figma node 7218:13085 */
  type: BannerType;
  /** Primary message text (single-line banners) */
  message?: string;
  /** Title text (multi-line banners) */
  title?: string;
  /** Description text (multi-line banners) */
  description?: string;
  /** Label for the optional action button */
  actionLabel?: string;
  /** Called when the action button is pressed */
  onAction?: () => void;
  /** Called when the close (×) button is pressed; omit to hide close button */
  onClose?: () => void;
  style?: React.CSSProperties;
}

// ─── Config ──────────────────────────────────────────────────────────────────

interface BannerConfig {
  bg: string;
  /** Text + icon color */
  text: string;
  /** Left-border color on the close button separator */
  closeBorder: string;
  /**
   * Outline border for the whole card.
   * - information: visible 1px blue border
   * - multi types: 1px accent border (all sides) + 3px bottom accent
   * - solid types: undefined (solid bg is its own visual boundary)
   */
  cardBorder?: string;
  /** Bottom accent stripe for multi-line subtle variants */
  accentBorder?: string;
  /** true = solid colored bg (success/warning/critical/actionable) */
  isSolid: boolean;
  /** true = multi-line layout */
  isMulti: boolean;
}

const CONFIG: Record<BannerType, BannerConfig> = {
  // ── Single-line ──────────────────────────────────────────────────────────
  // FIX #1: solid text is pure white (Figma row 2-5 all show #FFFFFF)
  // FIX #2: solid close separator is rgba white (Figma shows white separator)
  // FIX #3: information gets a full card border matching its text/icon color
  information:     { bg: "var(--color-bg-brand-subtle, #D8E9FF)", text: "var(--color-text-brand, #1D32FF)", closeBorder: "var(--color-bg-brand-primary, #628AFF)", cardBorder: "var(--color-border-brand, #628AFF)", isSolid: false, isMulti: false },
  success:         { bg: "#22C55E", text: "#FFFFFF",  closeBorder: "rgba(255,255,255,0.5)",                      isSolid: true,  isMulti: false },
  warning:         { bg: "#F65F19", text: "#FFFFFF",  closeBorder: "rgba(255,255,255,0.5)",                      isSolid: true,  isMulti: false },
  critical:        { bg: "#E1232E", text: "#FFFFFF",  closeBorder: "rgba(255,255,255,0.5)",                      isSolid: true,  isMulti: false },
  actionable:      { bg: "#EAB308", text: "#FFFFFF",  closeBorder: "rgba(255,255,255,0.5)",                      isSolid: true,  isMulti: false },
  // ── Multi-line ───────────────────────────────────────────────────────────
  // FIX #4: multi types have cardBorder + accentBorder (all sides + thick bottom)
  multiActionable: { bg: "#FEF9C3", text: "#CA8A04", closeBorder: "#EAB308", cardBorder: "#EAB308", accentBorder: "#EAB308", isSolid: false, isMulti: true },
  multiCritical:   { bg: "#FFE1E3", text: "#E1232E", closeBorder: "#FC6D75", cardBorder: "#FC6D75", accentBorder: "#FC6D75", isSolid: false, isMulti: true },
  multiWarning:    { bg: "#FDCFAB", text: "#BF310F", closeBorder: "#BF310F", cardBorder: "#D97706", accentBorder: "#D97706", isSolid: false, isMulti: true },
};

// ─── Banner Icon ──────────────────────────────────────────────────────────────

function BannerIcon({ type, color, size }: { type: BannerType; color: string; size: number }) {
  switch (type) {
    case "information":     return <IconInfo16 size={size} color={color} style={{ flexShrink: 0 }} />;
    case "success":         return <IconCheck161 size={size} color={color} style={{ flexShrink: 0 }} />;
    case "warning":
    case "multiWarning":    return <IconWarning16 size={size} color={color} style={{ flexShrink: 0 }} />;
    case "critical":
    case "multiCritical":   return <IconClose161 size={size} color={color} style={{ flexShrink: 0 }} />;
    case "actionable":
    case "multiActionable": return <IconWarning16 size={size} color={color} style={{ flexShrink: 0 }} />;
    default:                return <IconInfo16 size={size} color={color} style={{ flexShrink: 0 }} />;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Banner({
  type,
  message,
  title,
  description,
  actionLabel,
  onAction,
  onClose,
  style,
}: BannerProps) {
  const cfg = CONFIG[type];
  const { isMulti, isSolid } = cfg;
  const iconSize = isMulti ? 32 : 24;

  // ── Action button ──────────────────────────────────────────────────────────
  // Solid banners: ghost outline (white border + semi-transparent bg + white text)
  // Subtle/multi banners: white filled (white bg + neutral border + cfg.text color)
  // FIX #6: multi button border → neutral rgba gray (Figma shows subtle gray outline)
  const actionBtnStyle: React.CSSProperties = isSolid
    ? {
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 14px",
        borderRadius: 8,
        border: "1.5px solid rgba(255,255,255,0.8)",
        background: "rgba(255,255,255,0.14)",
        color: "#FFFFFF",
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
        letterSpacing: "0.01em",
        outline: "none",
        flexShrink: 0,
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 14px",
        borderRadius: 8,
        border: "1.5px solid rgba(0,0,0,0.12)",
        background: "#FFFFFF",
        color: cfg.text,
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
        letterSpacing: "0.01em",
        outline: "none",
        flexShrink: 0,
      };

  // ── Close button ───────────────────────────────────────────────────────────
  const closeBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    minWidth: 48,
    alignSelf: "stretch",
    background: "transparent",
    border: "none",
    borderLeft: `1px solid ${cfg.closeBorder}`,
    cursor: "pointer",
    outline: "none",
    padding: 0,
    flexShrink: 0,
  };

  // ── Outer container ────────────────────────────────────────────────────────
  // FIX #3 + #4: information → 1px solid blue border all around
  //              multi types → 1px border all sides + 3px thick bottom accent
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    minHeight: 48,
    background: cfg.bg,
    borderRadius: 10,
    overflow: "hidden",
    boxSizing: "border-box",
    // card border (information + multi types)
    ...(cfg.cardBorder ? { border: `1px solid ${cfg.cardBorder}` } : {}),
    // thick bottom accent for multi types (overrides the 1px set above for bottom)
    ...(cfg.accentBorder ? { borderBottom: `3px solid ${cfg.accentBorder}` } : {}),
    ...style,
  };

  // ── Content area ───────────────────────────────────────────────────────────
  // FIX #5 + #6: multi layout is a single flex row:
  //   [icon] [text-col flex:1] [action-btn] — NOT action-btn inside text col
  // FIX #5b: alignItems "center" for multi (button sits beside the 2-line text)
  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: isMulti ? "12px 16px" : "0 16px",
    minHeight: 48,
  };

  // For single-line: [message flex:1] [action-btn]  — text + btn in same row
  const singleTextStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: cfg.text,
    lineHeight: "20px",
    flex: 1,
  };

  // For multi-line: separate title + description stacked (no action btn inside)
  const multiTextColStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: cfg.text,
    lineHeight: "20px",
    margin: 0,
  };

  const descStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: cfg.text,
    lineHeight: "18px",
    opacity: 0.85,
    margin: 0,
  };

  return (
    <div style={containerStyle} role="alert">
      <div style={contentAreaStyle}>

        {/* Icon */}
        <BannerIcon type={type} color={cfg.text} size={iconSize} />

        {isMulti ? (
          <>
            {/* Text column — title + description only, NO action btn here */}
            <div style={multiTextColStyle}>
              {title       && <p style={titleStyle}>{title}</p>}
              {description && <p style={descStyle}>{description}</p>}
            </div>

            {/* Action button beside text (FIX #5) */}
            {actionLabel && onAction && (
              <button style={actionBtnStyle} onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </>
        ) : (
          <>
            {/* Single-line message */}
            <span style={singleTextStyle}>{message}</span>

            {/* Action button inline */}
            {actionLabel && onAction && (
              <button style={actionBtnStyle} onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </>
        )}
      </div>

      {/* Close button with left-border separator */}
      {onClose && (
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close banner">
          <IconClose16 size={16} color={cfg.text} />
        </button>
      )}
    </div>
  );
}
