import React from "react";

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
  text: string;
  closeBorder: string;
  /** Accent border color for subtle/multi variants (bottom edge) */
  accentBorder?: string;
  /** true = solid colored bg; false = subtle / light bg */
  isSolid: boolean;
  /** true = multi-line layout */
  isMulti: boolean;
  /** Icon fill color override (defaults to `text`) */
  iconColor?: string;
}

const CONFIG: Record<BannerType, BannerConfig> = {
  information:     { bg: "#D8E9FF", text: "#1D32FF", closeBorder: "#628AFF", isSolid: false, isMulti: false },
  success:         { bg: "#22C55E", text: "#F0FDF4", closeBorder: "#16A34A", isSolid: true,  isMulti: false },
  warning:         { bg: "#F65F19", text: "#FEE9D6", closeBorder: "#BF310F", isSolid: true,  isMulti: false },
  critical:        { bg: "#E1232E", text: "#FEF2F3", closeBorder: "#BD1822", isSolid: true,  isMulti: false },
  actionable:      { bg: "#EAB308", text: "#FEF9C3", closeBorder: "#FEF9C3", isSolid: true,  isMulti: false },
  multiActionable: { bg: "#FEF9C3", text: "#CA8A04", closeBorder: "#EAB308", accentBorder: "#EAB308", isSolid: false, isMulti: true  },
  multiCritical:   { bg: "#FFE1E3", text: "#E1232E", closeBorder: "#FC6D75", accentBorder: "#FC6D75", isSolid: false, isMulti: true  },
  multiWarning:    { bg: "#FDCFAB", text: "#BF310F", closeBorder: "#BF310F", accentBorder: "#F97316", isSolid: false, isMulti: true  },
};

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function InfoIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5" />
      <path d="M12 8v1M12 11v5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.5" />
      <path d="M7.5 12.5l3 3 5.5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v4M12 17v.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CriticalIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      <path d="M15 9l-6 6M9 9l6 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ActionableIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <polygon points="12,2 22,22 2,22"
        fill={color} fillOpacity="0.22" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 9v4M12 17v.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15 5L5 15M5 5l10 10" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BannerIcon({ type, color, size }: { type: BannerType; color: string; size: number }) {
  switch (type) {
    case "information":     return <InfoIcon color={color} size={size} />;
    case "success":         return <CheckCircleIcon color={color} size={size} />;
    case "warning":
    case "multiWarning":    return <WarningIcon color={color} size={size} />;
    case "critical":
    case "multiCritical":   return <CriticalIcon color={color} size={size} />;
    case "actionable":
    case "multiActionable": return <ActionableIcon color={color} size={size} />;
    default:                return <InfoIcon color={color} size={size} />;
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
  const isMulti = cfg.isMulti;
  const iconSize = isMulti ? 32 : 24;

  // Action button styles — ghost outline for solid banners, filled white for subtle
  const actionBtnStyle: React.CSSProperties = cfg.isSolid
    ? {
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 14px",
        borderRadius: 8,
        border: `1.5px solid ${cfg.text}`,
        background: "rgba(255,255,255,0.12)",
        color: cfg.text,
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
        letterSpacing: "0.01em",
        outline: "none",
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 14px",
        borderRadius: 8,
        border: `1.5px solid ${cfg.text}`,
        background: "#ffffff",
        color: cfg.text,
        fontFamily: "Inter, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap" as const,
        letterSpacing: "0.01em",
        outline: "none",
      };

  // Close button
  const closeBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    minWidth: 48,
    height: "100%",
    minHeight: 48,
    background: "transparent",
    border: "none",
    borderLeft: `1px solid ${cfg.closeBorder}`,
    cursor: "pointer",
    outline: "none",
    padding: 0,
    flexShrink: 0,
  };

  // Outer container
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    minHeight: 48,
    background: cfg.bg,
    borderRadius: 10,
    overflow: "hidden",
    boxSizing: "border-box",
    ...(cfg.accentBorder
      ? { borderBottom: `2px solid ${cfg.accentBorder}` }
      : {}),
    ...style,
  };

  // Inner content area (left of close button)
  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: isMulti ? "flex-start" : "center",
    gap: 12,
    padding: isMulti ? "12px 16px" : "0 16px",
    minHeight: 48,
  };

  // Text block
  const textBlockStyle: React.CSSProperties = isMulti
    ? {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingTop: 4,
      }
    : {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 16,
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

  const singleTextStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: cfg.text,
    lineHeight: "20px",
    flex: 1,
  };

  return (
    <div style={containerStyle} role="alert">
      {/* Content + action */}
      <div style={contentAreaStyle}>
        {/* Icon */}
        <BannerIcon type={type} color={cfg.text} size={iconSize} />

        {/* Text + optional action */}
        {isMulti ? (
          <div style={textBlockStyle}>
            {title && <p style={titleStyle}>{title}</p>}
            {description && <p style={descStyle}>{description}</p>}
            {actionLabel && onAction && (
              <div style={{ marginTop: 10 }}>
                <button style={actionBtnStyle} onClick={onAction}>
                  {actionLabel}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={textBlockStyle}>
            <span style={singleTextStyle}>{message}</span>
            {actionLabel && onAction && (
              <button style={actionBtnStyle} onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Close button */}
      {onClose && (
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close banner">
          <CloseIcon color={cfg.text} />
        </button>
      )}
    </div>
  );
}
