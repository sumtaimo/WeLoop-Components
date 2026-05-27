import React from "react";

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

// ─── Default lead icon (document / notification icon) ─────────────────────────

function DefaultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="2" width="14" height="18" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="6" y1="7"  x2="14" y2="7"  stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="11" x2="14" y2="11" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="15" x2="11" y2="15" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="10" height="13" rx="1.5" stroke="#9CA3AF" strokeWidth="1.2" />
      <line x1="4" y1="5"  x2="10" y2="5"  stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" />
      <line x1="4" y1="8"  x2="10" y2="8"  stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M4.5 3L7.5 6L4.5 9" stroke="#1D32FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
          {icon ?? <DefaultIcon />}
        </div>
      )}

      {hasSmallIcon && (
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
          {icon ?? <SmallIcon />}
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
              <ChevronRight />
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
              color:       "#1D32FF",
              lineHeight:  "16px",
            }}
          >
            {linkText}
            <ChevronRightSmall />
          </button>
        )}
      </div>
    </div>
  );
}
