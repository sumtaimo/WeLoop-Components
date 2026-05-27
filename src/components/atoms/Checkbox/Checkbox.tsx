import React, { useRef, useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/** sm = 16×16 px · lg = 20×20 px */
export type CheckboxSize = "sm" | "lg";

export interface CheckboxProps {
  /** Whether the checkbox is ticked */
  checked?: boolean;
  /** Indeterminate / partial-selection state (dash icon) */
  indeterminate?: boolean;
  /** Disable all interaction */
  disabled?: boolean;
  /** Label text rendered beside the box */
  label?: string;
  /** Box size — Figma node 215:412 */
  size?: CheckboxSize;
  /** Called with the new checked value on change */
  onChange?: (checked: boolean) => void;
  style?: React.CSSProperties;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE: Record<CheckboxSize, { box: number; radius: number; iconW: number; iconH: number }> = {
  sm: { box: 16, radius: 4, iconW: 10, iconH: 10 },
  lg: { box: 20, radius: 5, iconW: 12, iconH: 12 },
};

// ─── SVG icons ────────────────────────────────────────────────────────────────

function CheckIcon({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <svg width={w} height={h} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M1.5 5.5L4 8l4.5-5.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <svg width={w} height={h} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5h6" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  size = "sm",
  onChange,
  style,
}: CheckboxProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cfg = SIZE[size];

  // Sync the native indeterminate property (not an HTML attribute)
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  // ── Visual box style ───────────────────────────────────────────────────────
  //
  //  State priority (high → low):
  //   disabled checked / indeterminate → gray-filled
  //   disabled unchecked               → gray-outlined
  //   checked / indeterminate (enabled)→ brand-filled (#1D32FF)
  //   focused (unchecked)              → blue border + ring
  //   hovered (unchecked)              → medium gray border
  //   default (unchecked)              → light gray border
  //
  const isActive = checked || indeterminate;

  let boxBg     = "#FFFFFF";
  let boxBorder = "1.5px solid #D4D4D4";
  let boxShadow: string | undefined;

  if (disabled) {
    if (isActive) {
      boxBg     = "#D4D4D4";
      boxBorder = "none";
    } else {
      boxBg     = "#F5F5F5";
      boxBorder = "1.5px solid #E5E5E5";
    }
  } else if (isActive) {
    boxBg     = "#1D32FF";
    boxBorder = "none";
  } else if (focused) {
    boxBorder = "1.5px solid #1D32FF";
    boxShadow = "0 0 0 3px rgba(29,50,255,0.18)";
  } else if (hovered) {
    boxBorder = "1.5px solid #A3A3A3";
  }
  // else: default border already set above

  const iconColor = disabled ? "#A3A3A3" : "#FFFFFF";

  return (
    <label
      onMouseEnter={() => { if (!disabled) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
    >
      {/* The custom-box wrapper also positions the hidden native input */}
      <div style={{ position: "relative", width: cfg.box, height: cfg.box, flexShrink: 0 }}>
        {/* Native input — transparent, covers the box so it receives focus/click */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            margin: 0,
            cursor: disabled ? "not-allowed" : "pointer",
            zIndex: 1,
          }}
        />

        {/* Visual box — pointer-events:none so clicks pass to the input */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: cfg.radius,
            background: boxBg,
            border: boxBorder,
            boxSizing: "border-box",
            boxShadow: boxShadow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            transition: "border-color 0.1s, background 0.1s, box-shadow 0.1s",
          }}
        >
          {indeterminate && <MinusIcon w={cfg.iconW} h={cfg.iconH} color={iconColor} />}
          {!indeterminate && checked && <CheckIcon w={cfg.iconW} h={cfg.iconH} color={iconColor} />}
        </div>
      </div>

      {/* Label */}
      {label && (
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            lineHeight: "20px",
            color: disabled ? "#A3A3A3" : "#171717",
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}
