import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * "information" — blue   (#1D32FF)  — informational guidance
 * "danger"      — red    (#EF4444)  — critical warning or error
 * "suggestion"  — green  (#22C55E)  — positive tip or best practice
 * "warning"     — orange (#F97316)  — caution notice
 */
export type InlineTipType = "information" | "danger" | "suggestion" | "warning";

export interface InlineTipProps {
  type?:        InlineTipType;
  title:        string;
  description?: string;
  /**
   * "filled"  — white card with 1px border and 16px border-radius  (Figma Fill=True)
   * "outline" — flat/no border, inline style                        (Figma Fill=False)
   */
  fill?:        "filled" | "outline";
  /** Show the "Learn more >" link */
  showLink?:    boolean;
  linkText?:    string;
  /** Optional prefix text before the link (e.g. "For urgent situation,") */
  linkPrefix?:  string;
  onLinkClick?: () => void;
  style?:       React.CSSProperties;
}

// ─── Type config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<InlineTipType, { bg: string; symbol: string; label: string }> = {
  information: { bg: "#1F2937", symbol: "?",  label: "Info"       },
  danger:      { bg: "#EF4444", symbol: "!",  label: "Danger"     },
  suggestion:  { bg: "#22C55E", symbol: "✓",  label: "Suggestion" },
  warning:     { bg: "#F97316", symbol: "⚠",  label: "Warning"    },
};

// ─── Icon ─────────────────────────────────────────────────────────────────────

function TypeIcon({ type }: { type: InlineTipType }) {
  const cfg = TYPE_CONFIG[type];
  return (
    <div style={{
      width:          24,
      height:         24,
      borderRadius:   "50%",
      background:     cfg.bg,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      flexShrink:     0,
    }} aria-hidden="true">
      <span style={{
        fontFamily:  "Inter, sans-serif",
        fontSize:    type === "suggestion" ? 11 : 12,
        fontWeight:  700,
        color:       "white",
        lineHeight:  1,
        userSelect:  "none",
      }}>
        {cfg.symbol}
      </span>
    </div>
  );
}

function ChevronRightSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 3L7.5 6L4.5 9" stroke="#1D32FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── InlineTip ────────────────────────────────────────────────────────────────

export function InlineTip({
  type        = "information",
  title,
  description,
  fill        = "filled",
  showLink    = true,
  linkText    = "Learn More",
  linkPrefix,
  onLinkClick,
  style,
}: InlineTipProps) {
  return (
    <div
      style={{
        display:      "flex",
        alignItems:   "flex-start",
        gap:          10,
        padding:      16,
        background:   "#FFFFFF",
        borderRadius: fill === "filled" ? 16 : 0,
        border:       fill === "filled" ? "1px solid #D4D4D4" : "none",
        boxSizing:    "border-box",
        width:        "100%",
        overflow:     "hidden",
        ...style,
      }}
    >
      <TypeIcon type={type} />

      <div style={{
        display:   "flex",
        flexDirection: "column",
        gap:       16,
        flex:      1,
        minWidth:  0,
      }}>
        {/* Text block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{
            fontFamily:    "Inter, sans-serif",
            fontSize:      16,
            fontWeight:    500,
            color:         "#111827",
            lineHeight:    "24px",
            letterSpacing: "-0.2px",
          }}>
            {title}
          </span>
          {description && (
            <span style={{
              fontFamily:    "Inter, sans-serif",
              fontSize:      14,
              fontWeight:    400,
              color:         "#A3A3A3",
              lineHeight:    "20px",
              letterSpacing: "-0.2px",
            }}>
              {description}
            </span>
          )}
        </div>

        {/* Link row */}
        {showLink && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {linkPrefix && (
              <span style={{
                fontFamily:  "Inter, sans-serif",
                fontSize:    14,
                fontWeight:  500,
                color:       "#374151",
                lineHeight:  "16px",
                whiteSpace:  "nowrap",
              }}>
                {linkPrefix}
              </span>
            )}
            <button
              onClick={onLinkClick}
              style={{
                display:     "inline-flex",
                alignItems:  "center",
                gap:         4,
                background:  "none",
                border:      "none",
                padding:     "4px 8px",
                marginLeft:  linkPrefix ? 0 : -8,
                borderRadius: 6,
                cursor:      "pointer",
                fontFamily:  "Inter, sans-serif",
                fontSize:    14,
                fontWeight:  500,
                color:       "#1D32FF",
                lineHeight:  "16px",
              }}
            >
              {linkText}
              <ChevronRightSmall />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
