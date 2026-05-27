import React, { useState } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

// ─── Types ────────────────────────────────────────────────────────────────────

/** "sm" = 36×20px · "md" = 44×24px  — matches Figma node 215:424 */
export type ToggleSize = "sm" | "md";

export interface ToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Called when the toggle is clicked */
  onChange?: (checked: boolean) => void;
  /** Size variant — "sm" = 36×20px, "md" = 44×24px */
  size?: ToggleSize;
  disabled?: boolean;
  /** Accessible label for screen readers */
  label?: string;
  /** Render label text beside the toggle */
  showLabel?: boolean;
  style?: React.CSSProperties;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE_CFG = {
  sm: {
    trackW:  36,
    trackH:  20,
    thumbSz: 14,   // thumb diameter
    radius:  999,
    thumbOffset: 2, // gap from track edge to thumb edge
    translateX: 16, // how far thumb moves when checked (trackW - thumbSz - 2*offset)
  },
  md: {
    trackW:  44,
    trackH:  24,
    thumbSz: 18,
    radius:  999,
    thumbOffset: 3,
    translateX: 20, // 44 - 18 - 2*3 = 20
  },
} as const;

// ─── Colors ───────────────────────────────────────────────────────────────────

const COLORS = {
  trackOff:         "#D1D5DB",  // gray-300
  trackOn:          "#1D32FF",  // brand blue
  trackDisabledOff: "#E5E7EB",  // gray-200
  trackDisabledOn:  "#9CA3AF",  // gray-400
  thumb:            "#FFFFFF",
  thumbDisabled:    "#F3F4F6",  // gray-100
  focusRing:        "0 0 0 2px #FFFFFF, 0 0 0 4px #1D32FF",
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

export function Toggle({
  checked   = false,
  onChange,
  size      = "sm",
  disabled  = false,
  label,
  showLabel = false,
  style,
}: ToggleProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const cfg = SIZE_CFG[size];

  // ── Track color ────────────────────────────────────────────────────────────
  let trackBg: string;
  if (disabled) {
    trackBg = checked ? COLORS.trackDisabledOn : COLORS.trackDisabledOff;
  } else {
    trackBg = checked ? COLORS.trackOn : COLORS.trackOff;
  }

  // ── Thumb ──────────────────────────────────────────────────────────────────
  const thumbColor = disabled ? COLORS.thumbDisabled : COLORS.thumb;

  // ── Focus ring (hover or keyboard focus) ──────────────────────────────────
  const ringStyle = !disabled && (focused || hovered) ? COLORS.focusRing : undefined;

  const toggleId = React.useId();

  return (
    <div
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        8,
        ...style,
      }}
    >
      <RadixSwitch.Root
        id={toggleId}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          // Track
          position:     "relative",
          display:      "inline-flex",
          alignItems:   "center",
          width:        cfg.trackW,
          height:       cfg.trackH,
          borderRadius: cfg.radius,
          background:   trackBg,
          border:       "none",
          padding:      0,
          cursor:       disabled ? "not-allowed" : "pointer",
          flexShrink:   0,
          outline:      "none",
          boxShadow:    ringStyle,
          transition:   "background 0.18s ease, box-shadow 0.15s ease",
          WebkitTapHighlightColor: "transparent",
        }}
        aria-label={label}
      >
        <RadixSwitch.Thumb
          style={{
            display:      "block",
            width:        cfg.thumbSz,
            height:       cfg.thumbSz,
            borderRadius: "50%",
            background:   thumbColor,
            boxShadow:    disabled
              ? "none"
              : "0 1px 3px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.12)",
            // Position: offset from left edge; Radix moves it via data-state
            marginLeft:   cfg.thumbOffset,
            // Smooth slide animation
            transition:   "transform 0.18s cubic-bezier(0.34,1.26,0.64,1), background 0.15s",
            willChange:   "transform",
            // Radix sets data-state="checked" when on; we use CSS transform
            transform:    checked
              ? `translateX(${cfg.translateX}px)`
              : "translateX(0px)",
          }}
        />
      </RadixSwitch.Root>

      {showLabel && label && (
        <label
          htmlFor={toggleId}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize:   14,
            fontWeight: 500,
            lineHeight: "20px",
            color:      disabled ? "#A3A3A3" : "#171717",
            cursor:     disabled ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
}
