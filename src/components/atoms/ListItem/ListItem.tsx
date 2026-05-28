import React from "react";
import { IconDoc16, IconChevron163 } from "../Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * "notifi-link"    — circle icon, title + count, description, "Learn more >" link
 * "notifi-default" — circle icon, title + count, description
 * "notifi-list"    — circle icon, title + dot indicator, description, uppercase label
 * "bill-list"      — small inline icon, title + count, description, uppercase label
 * "bank-list"      — small inline icon, title + currency badge, description
 * "minimal"        — no lead icon, title + count + chevron, description
 */
export type ListItemType =
  | "notifi-link"
  | "notifi-default"
  | "notifi-list"
  | "bill-list"
  | "bank-list"
  | "minimal";

export interface ListItemProps {
  type?:         ListItemType;
  title:         string;
  description?:  string;
  /** Numeric or string count shown on the right (most types) */
  count?:        number | string;
  /** Uppercase meta label below description (notifi-list, bill-list) */
  label?:        string;
  /** Currency badge text shown on right for bank-list (default "USD") */
  currency?:     string;
  /** Custom 24×24 icon replacing the default lead icon */
  icon?:         React.ReactNode;
  /** Link text shown below description (notifi-link); default "Learn more" */
  linkText?:     string;
  /** Called when the link button is clicked */
  onLinkClick?:  () => void;
  /** Show a 1px bottom border divider */
  showDivider?:  boolean;
  style?:        React.CSSProperties;
  onClick?:      () => void;
}

// ─── Shared text styles ───────────────────────────────────────────────────────

const titleStyle: React.CSSProperties = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      16,
  fontWeight:    500,
  color:         "#111827",
  lineHeight:    "24px",
  letterSpacing: "-0.2px",
  whiteSpace:    "nowrap",
  overflow:      "hidden",
  textOverflow:  "ellipsis",
  flexShrink:    1,
  minWidth:      0,
};

const descStyle: React.CSSProperties = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      14,
  fontWeight:    400,
  color:         "#A3A3A3",
  lineHeight:    "20px",
  letterSpacing: "-0.2px",
  whiteSpace:    "nowrap",
  overflow:      "hidden",
  textOverflow:  "ellipsis",
};

const countStyle: React.CSSProperties = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      14,
  fontWeight:    400,
  color:         "#111827",
  lineHeight:    "20px",
  letterSpacing: "-0.2px",
  whiteSpace:    "nowrap",
  flexShrink:    0,
};

const labelStyle: React.CSSProperties = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      11,
  fontWeight:    500,
  color:         "#A3A3A3",
  lineHeight:    "12px",
  letterSpacing: "-0.2px",
  textTransform: "uppercase",
};

// ─── ListItem ─────────────────────────────────────────────────────────────────

export function ListItem({
  type         = "notifi-default",
  title,
  description,
  count,
  label,
  currency     = "USD",
  icon,
  linkText     = "Learn more",
  onLinkClick,
  showDivider  = false,
  style,
  onClick,
}: ListItemProps) {
  const hasCircleIcon  = type.startsWith("notifi");
  const hasSmallIcon   = type === "bill-list" || type === "bank-list";
  const isMinimal      = type === "minimal";
  const hasLink        = type === "notifi-link";
  const hasDotIndicator = type === "notifi-list";
  const hasCurrency    = type === "bank-list";
  const hasLabel       = type === "notifi-list" || type === "bill-list";

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? e => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      style={{
        display:       "flex",
        alignItems:    "flex-start",
        gap:           12,
        padding:       isMinimal ? "12px 0" : "12px 12px 12px 16px",
        width:         "100%",
        boxSizing:     "border-box",
        borderBottom:  showDivider ? "1px solid #F3F4F6" : undefined,
        cursor:        onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {/* ── Lead icon ─────────────────────────────────────────────────────── */}
      {hasCircleIcon && (
        <div style={{
          width:          36,
          height:         36,
          borderRadius:   24,
          background:     "#F9FAFB",
          border:         "1px solid #D1D5DB",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}>
          {icon ?? <IconDoc16 size={24} color="#9CA3AF" />}
        </div>
      )}

      {hasSmallIcon && (
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
          {icon ?? <IconDoc16 size={16} color="#9CA3AF" />}
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div style={{
        display:   "flex",
        flexDirection: "column",
        gap:       hasLink || hasLabel ? 8 : 4,
        flex:      1,
        minWidth:  0,
        paddingLeft: 4,
      }}>
        {/* Title row */}
        <div style={{
          display:   "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap:        8,
          width:      "100%",
        }}>
          <span style={titleStyle}>{title}</span>

          {/* Right: count / dot / currency / chevron */}
          {hasDotIndicator && (
            <div style={{
              width:        8,
              height:       8,
              borderRadius: "50%",
              background:   "#EF4444",
              flexShrink:   0,
            }} />
          )}
          {!hasDotIndicator && !hasCurrency && !isMinimal && count !== undefined && (
            <span style={countStyle}>{count}</span>
          )}
          {hasCurrency && (
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          4,
              padding:      "4px 8px",
              borderRadius: 999,
              border:       "1px solid #A3A3A3",
              background:   "#FAFAFA",
              flexShrink:   0,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="#A3A3A3" strokeWidth="1" />
                <text x="6" y="9" textAnchor="middle" fontSize="6" fill="#A3A3A3" fontFamily="Inter">$</text>
              </svg>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                color: "#404040", lineHeight: "16px",
              }}>
                {currency}
              </span>
            </div>
          )}
          {isMinimal && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
              {count !== undefined && <span style={countStyle}>{count}</span>}
              <IconChevron163 size={20} color="#A3A3A3" />
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <span style={descStyle}>{description}</span>
        )}

        {/* Label (notifi-list, bill-list) */}
        {hasLabel && label && (
          <span style={labelStyle}>{label}</span>
        )}

        {/* Learn more link (notifi-link) */}
        {hasLink && (
          <button
            onClick={e => { e.stopPropagation(); onLinkClick?.(); }}
            style={{
              display:     "inline-flex",
              alignItems:  "center",
              gap:         4,
              background:  "none",
              border:      "none",
              padding:     "4px 8px",
              marginLeft:  -8,
              borderRadius: 6,
              cursor:      "pointer",
              fontFamily:  "Inter, sans-serif",
              fontSize:    14,
              fontWeight:  500,
              color:       "var(--color-text-brand, #1D32FF)",
              lineHeight:  "16px",
            }}
          >
            {linkText}
            <IconChevron163 size={12} color="var(--color-text-brand, #1D32FF)" />
          </button>
        )}
      </div>
    </div>
  );
}
