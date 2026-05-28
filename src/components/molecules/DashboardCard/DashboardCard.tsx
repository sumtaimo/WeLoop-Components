import React, { useState } from "react";
import { IconChevron164, IconChevron165, IconCheck16 } from "../../atoms/Icon/Icon";

export type DashboardCardType = "toggle" | "minimal" | "headline";

export interface DashboardCardProps {
  type?: DashboardCardType;
  headline?: string;
  description?: string;
  subtitle?: string;
  trailText?: string;
  delta?: string;
  period?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// ─── shadows ─────────────────────────────────────────────────────────────────
const S_FLOAT_CARD = "0 0 0 1px rgba(0,0,0,0.12),0 0 1px -1px rgba(0,0,0,0.06),0 0 1px 0 rgba(0,0,0,0.04)";
const S_DEFAULT    = "0 0 0 0.5px #e5e5e5,0 0 0 0 rgba(0,0,0,0.08),0 1px 1px 0 rgba(0,0,0,0.06)";
const S_BODY       = "0 0 0 0.5px #e5e5e5,0 0 0 0 rgba(0,0,0,0.08),0 1px 1px 0 rgba(0,0,0,0.06),0 0 0 0 rgba(0,0,0,0.08)";
const S_BRAND_SEL  = "0 0 1px 1px rgba(29,50,255,0.16),0 0 0 2px #b9d3ff";
const S_GRAY_SEL   = "0 0 1px 1px rgba(107,114,128,0.16),0 0 0 2px #d1d5db";
const S_DISABLED   = "0 0 0 1px #d4d4d4";

// ─── shared typography ────────────────────────────────────────────────────────
const TITLE_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontWeight: 600,
  fontSize: 20, lineHeight: "28px", letterSpacing: "-0.2px",
  color: "#171717",
};
// Description wraps to 2 lines (matching Figma "single or multiple lines")
const DESC_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontWeight: 400,
  fontSize: 12, lineHeight: "16px", letterSpacing: "-0.1px",
  color: "#a3a3a3", width: "100%",
};
const MUTED_STYLE: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontWeight: 400,
  fontSize: 14, lineHeight: "20px", letterSpacing: "-0.2px",
  color: "#a3a3a3", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
};

// ─── card icon (generic chart placeholder) ────────────────────────────────────
function CardIcon({ color = "#6b7280" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="3" y="17" width="5" height="8" rx="1.5" fill={color} opacity="0.6" />
      <rect x="11.5" y="11" width="5" height="14" rx="1.5" fill={color} />
      <rect x="20" y="6" width="5" height="19" rx="1.5" fill={color} opacity="0.8" />
    </svg>
  );
}

// ─── shared: inner frame preview (thumbnail skeleton) ─────────────────────────
function PreviewFrame({
  skeletonLine, skeletonAccent, iconColor,
}: { skeletonLine: string; skeletonAccent: string; iconColor: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minHeight: 0, width: "100%" }}>
      <CardIcon color={iconColor} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
        <div style={{ height: 8, borderRadius: 2, background: skeletonLine, width: "100%" }} />
        <div style={{ height: 8, borderRadius: 2, background: skeletonAccent, width: "60%" }} />
        <div style={{ height: 8, borderRadius: 2, background: skeletonLine, width: "85%" }} />
      </div>
    </div>
  );
}

// ─── ToggleCard ───────────────────────────────────────────────────────────────
function ToggleCard({ headline, description, selected, disabled, hover, onClick }: {
  headline: string; description: string; selected: boolean; disabled: boolean;
  hover: boolean; onClick?: () => void;
}) {
  const headerBg  = disabled ? "#e5e5e5" : selected ? "#d8e9ff" : "#eaf3ff";
  const skeletonLine   = disabled ? "#a3a3a3" : "#d8e9ff";
  const skeletonAccent = disabled ? "#a3a3a3" : "#8eb6ff";
  const iconColor = disabled ? "#a3a3a3" : selected ? "#628aff" : "#93b4e8";
  const outerShadow = disabled ? S_DISABLED : selected ? S_BRAND_SEL : hover ? S_GRAY_SEL : S_FLOAT_CARD;
  const titleColor = disabled ? "#737373" : "#171717";

  const btnPrimary = disabled ? {
    bg: "#e5e5e5", shadow: "0 0 0 1px #d4d4d4", textColor: "#737373",
  } : {
    bg: "var(--color-bg-brand-primary, #1d32ff)", shadow: "var(--shadow-brand-default, 0 0 0 1px #1221c1,0 1px 1px rgba(18,33,193,0.5),0 2px 3px rgba(18,33,193,0.1))", textColor: "var(--color-text-on-bg-primary, #fafafa)",
  };

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      style={{
        width: 240, borderRadius: 16, overflow: "hidden",
        border: "0.5px solid #d1d5db", background: headerBg,
        display: "flex", flexDirection: "column", alignItems: "stretch",
        boxShadow: outerShadow, cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left", padding: 0,
      }}
    >
      {/* Preview area — 120 px matches Figma frame proportion */}
      <div style={{ background: headerBg, height: 120, padding: "12px 16px 0", display: "flex", flexDirection: "column" }}>
        {/* Top tab */}
        <div style={{
          height: 12, width: 180, borderRadius: "8px 8px 0 0",
          border: "1px solid #e5e5e5", background: "white", alignSelf: "center", flexShrink: 0,
        }} />
        {/* Main inner frame */}
        <div style={{
          flex: 1, borderRadius: "8px 8px 0 0", border: "1px solid #e5e5e5",
          background: "white", padding: "8px 16px", display: "flex", alignItems: "center",
        }}>
          <PreviewFrame skeletonLine={skeletonLine} skeletonAccent={skeletonAccent} iconColor={iconColor} />
        </div>
      </div>

      {/* Card body */}
      <div style={{
        background: disabled ? "#e5e5e5" : "white",
        borderTop: "0.5px solid #c3d8ff",
        padding: "12px 16px",
        display: "flex", flexDirection: "column", gap: 8,
        boxShadow: S_BODY,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ ...TITLE_STYLE, color: titleColor }}>{headline}</span>
          <span style={DESC_STYLE}>{description}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center" }}>
          <button type="button" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            height: 24, padding: "4px 8px", borderRadius: 6, border: "none",
            background: "transparent", cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "16px",
            letterSpacing: "-0.2px", color: disabled ? "#737373" : "#1d32ff",
          }}>
            Reset
          </button>
          <button type="button" disabled={disabled} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
            height: 24, minWidth: 24, padding: "4px 8px", borderRadius: 6, border: "none",
            background: btnPrimary.bg, boxShadow: btnPrimary.shadow,
            cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12, lineHeight: "16px",
            letterSpacing: "-0.2px", color: btnPrimary.textColor,
          }}>
            <IconCheck16 size={10} color="currentColor" />
            Button
          </button>
        </div>
      </div>
    </button>
  );
}

// ─── MinimalCard ──────────────────────────────────────────────────────────────
function MinimalCard({ headline, description, selected, disabled, hover, onClick }: {
  headline: string; description: string; selected: boolean; disabled: boolean;
  hover: boolean; onClick?: () => void;
}) {
  const outerShadow = disabled ? S_DISABLED : selected ? S_GRAY_SEL : hover ? S_GRAY_SEL : S_DEFAULT;
  const headerBg  = disabled ? "#e5e5e5" : "#f3f4f6";
  const skeletonBg = disabled ? "#d4d4d4" : "#a3a3a3";
  const titleColor = disabled ? "#737373" : "#171717";

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        width: 240, borderRadius: 10, overflow: "hidden",
        border: "0.5px solid #d1d5db", background: headerBg,
        display: "flex", flexDirection: "column", alignItems: "stretch",
        boxShadow: outerShadow, cursor: onClick ? (disabled ? "not-allowed" : "pointer") : "default",
      }}
    >
      {/* Preview area */}
      <div style={{ background: headerBg, height: 64, padding: "8px 12px 0", display: "flex", flexDirection: "column" }}>
        <div style={{
          height: 10, width: 180, borderRadius: "8px 8px 0 0",
          border: "1px solid #e5e5e5", background: "white", alignSelf: "center", flexShrink: 0,
        }} />
        <div style={{
          flex: 1, borderRadius: "8px 8px 0 0", border: "1px solid #e5e5e5",
          background: "white", padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <CardIcon color={disabled ? "#d4d4d4" : "#a3a3a3"} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
            <div style={{ height: 8, borderRadius: 4, background: skeletonBg, width: "100%" }} />
            <div style={{ height: 10, borderRadius: 4, background: skeletonBg, width: "56px" }} />
          </div>
        </div>
      </div>

      {/* Card body — neutral separator (Minimal is gray-themed, not brand-blue) */}
      <div style={{
        background: disabled ? "#e5e5e5" : "white",
        borderTop: "0.5px solid #e5e5e5",
        padding: "8px 12px",
        display: "flex", flexDirection: "column", gap: 4,
        boxShadow: S_FLOAT_CARD,
      }}>
        <span style={{ ...TITLE_STYLE, color: titleColor }}>{headline}</span>
        <span style={DESC_STYLE}>{description}</span>
      </div>
    </div>
  );
}

// ─── DeltaIcon (trend indicator) ─────────────────────────────────────────────
function DeltaIcon({ direction, disabled }: { direction: "up" | "down"; disabled: boolean }) {
  const color = disabled ? "#d4d4d4" : direction === "up" ? "#15803d" : "#dc2626";
  return direction === "up" ? (
    <IconChevron164 size={10} color={color} style={{ flexShrink: 0 }} />
  ) : (
    <IconChevron165 size={10} color={color} style={{ flexShrink: 0 }} />
  );
}

// ─── HeadlineCard (stat card) ─────────────────────────────────────────────────
function HeadlineCard({ headline, subtitle, trailText, delta, period, selected, disabled, hover, onClick }: {
  headline: string; subtitle: string; trailText?: string; delta?: string; period?: string;
  selected: boolean; disabled: boolean; hover: boolean; onClick?: () => void;
}) {
  const bg     = disabled ? "#f5f5f5" : selected ? "#f3f4f6" : "white";
  const border = selected ? "1px solid #d4d4d4" : "1px solid #d1d5db";
  const shadow = disabled ? S_DISABLED : selected ? S_GRAY_SEL : hover ? S_GRAY_SEL : S_FLOAT_CARD;

  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        width: 240, borderRadius: 16, background: bg, border,
        padding: 16, display: "flex", flexDirection: "column", gap: 4,
        boxShadow: shadow, cursor: onClick ? (disabled ? "not-allowed" : "pointer") : "default",
        overflow: "hidden",
      }}
    >
      {/* Subtitle row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
          <IconCheck16 size={10} color="currentColor" style={{ flexShrink: 0 }} />
          <span style={{ ...MUTED_STYLE, color: disabled ? "#d4d4d4" : "#a3a3a3" }}>{subtitle}</span>
        </div>
        {trailText && (
          <span style={{ ...MUTED_STYLE, flexShrink: 0, color: disabled ? "#d4d4d4" : "#a3a3a3" }}>{trailText}</span>
        )}
      </div>

      {/* Title */}
      <span style={{ ...TITLE_STYLE, color: disabled ? "#a3a3a3" : "#171717" }}>{headline}</span>

      {/* Delta row — solid triangle icon + value + period */}
      {delta && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <DeltaIcon direction={delta.startsWith("-") || delta.startsWith("↓") ? "down" : "up"} disabled={disabled} />
          <span style={{
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 12,
            lineHeight: "16px", letterSpacing: "-0.1px",
            color: disabled ? "#d4d4d4" : (delta.startsWith("-") || delta.startsWith("↓") ? "#dc2626" : "#15803d"),
          }}>
            {/* Strip arrow prefix if caller passed it as part of the string */}
            {delta.replace(/^[↑↓+\-]/, "")}
          </span>
          {period && (
            <span style={{
              fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 12,
              lineHeight: "16px", letterSpacing: "-0.1px", color: disabled ? "#d4d4d4" : "#a3a3a3",
            }}>{period}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── DashboardCard (public) ───────────────────────────────────────────────────
export function DashboardCard({
  type = "toggle",
  headline = "Title",
  description = "Explanatory text shown in the headline in a single or multiple lines.",
  subtitle = "Subtitle",
  trailText,
  delta,
  period,
  selected = false,
  disabled = false,
  onClick,
  className = "",
}: DashboardCardProps) {
  const [hover, setHover] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <div {...hoverProps} className={className} style={{ display: "inline-block" }}>
      {type === "toggle" && (
        <ToggleCard
          headline={headline} description={description}
          selected={selected} disabled={disabled} hover={hover} onClick={onClick}
        />
      )}
      {type === "minimal" && (
        <MinimalCard
          headline={headline} description={description}
          selected={selected} disabled={disabled} hover={hover} onClick={onClick}
        />
      )}
      {type === "headline" && (
        <HeadlineCard
          headline={headline} subtitle={subtitle}
          trailText={trailText} delta={delta} period={period}
          selected={selected} disabled={disabled} hover={hover} onClick={onClick}
        />
      )}
    </div>
  );
}
