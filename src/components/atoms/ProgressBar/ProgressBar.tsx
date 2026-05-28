import React, { useId } from "react";
import * as RadixProgress from "@radix-ui/react-progress";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressBarVariant = "loading" | "fail" | "complete";
export type ProgressBarSize    = "sm" | "md";

export interface ProgressBarProps {
  /** Progress 0–100 (will be clamped) */
  value?:        number;
  /** Denominator for auto-generated progress text (e.g. 200 for "200 MB") */
  max?:          number;
  size?:         ProgressBarSize;
  variant?:      ProgressBarVariant;
  /** Field label above the bar */
  label?:        string;
  /** Show red required asterisk after the label */
  required?:     boolean;
  /** Override progress text. Auto-generated when `max` is set. */
  progressText?: string;
  /** Unit string appended to the auto-generated progress text */
  unit?:         string;
  style?:        React.CSSProperties;
}

// ─── Color map ────────────────────────────────────────────────────────────────

const VARIANT_COLOR: Record<ProgressBarVariant, string> = {
  loading:  "#1D32FF",
  fail:     "#EF4444",
  complete: "#16A34A",
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────

export function ProgressBar({
  value    = 0,
  max,
  size     = "md",
  variant  = "loading",
  label,
  required = false,
  progressText,
  unit     = "MB",
  style,
}: ProgressBarProps) {
  const labelId   = useId();
  const pct       = Math.min(100, Math.max(0, value));
  const trackH    = size === "sm" ? 2 : 8;
  const fillColor = VARIANT_COLOR[variant];

  const autoText = max != null
    ? `${Math.round(pct / 100 * max)}${unit} of ${max}${unit}`
    : undefined;
  const displayText = progressText ?? autoText;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", ...style }}>

      {/* Label */}
      {label && (
        <div id={labelId} style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize:   13,
            fontWeight: 500,
            color:      "#374151",
            lineHeight: "16px",
          }}>
            {label}
          </span>
          {required && (
            <span style={{ color: "#EF4444", fontSize: 13, fontWeight: 500 }} aria-hidden="true">*</span>
          )}
        </div>
      )}

      {/* Track + fill — Radix manages role="progressbar" + aria-valuenow/min/max */}
      <RadixProgress.Root
        value={pct}
        max={100}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? variant : undefined}
        style={{
          width:        "100%",
          height:       trackH,
          borderRadius: 999,
          background:   "#E5E7EB",
          overflow:     "hidden",
          position:     "relative",
        }}
      >
        <RadixProgress.Indicator
          style={{
            height:     "100%",
            width:      `${pct}%`,
            borderRadius: 999,
            background: fillColor,
            transition: "width 0.3s ease",
            minWidth:   pct > 0 ? trackH : 0,
          }}
        />
      </RadixProgress.Root>

      {/* Progress text */}
      {displayText && (
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize:   12,
          fontWeight: 400,
          color:      "#9CA3AF",
          lineHeight: "16px",
        }}>
          {displayText}
        </span>
      )}
    </div>
  );
}
