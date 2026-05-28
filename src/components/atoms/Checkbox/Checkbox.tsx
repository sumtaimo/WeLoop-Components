import React, { useId } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

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

// ─── SVG icons (with CSS animation class) ────────────────────────────────────

function CheckIcon({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <svg width={w} height={h} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        className="wl-check-path"
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
      <path
        className="wl-minus-path"
        d="M2 5h6"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export function Checkbox({
  checked      = false,
  indeterminate = false,
  disabled     = false,
  label,
  size         = "sm",
  onChange,
  style,
}: CheckboxProps) {
  const id  = useId();
  const cfg = SIZE[size];

  // Radix uses "indeterminate" as a special checked value
  const radixChecked: RadixCheckbox.CheckedState =
    indeterminate ? "indeterminate" : checked;

  // ── Visual color computation ───────────────────────────────────────────────
  // Radix supplies data-state="checked" | "indeterminate" | "unchecked"
  // and data-disabled on the root. We use inline style logic matching Figma.
  const isActive = checked || indeterminate;

  const computeBoxStyle = (
    isHovered: boolean,
    isFocused: boolean
  ): React.CSSProperties => {
    let bg     = "#FFFFFF";
    let border = "1.5px solid #D4D4D4";
    let shadow: string | undefined;

    if (disabled) {
      bg     = isActive ? "#D4D4D4" : "#F5F5F5";
      border = isActive ? "none"    : "1.5px solid #E5E5E5";
    } else if (isActive) {
      bg     = "#1D32FF";
      border = "none";
    } else if (isFocused) {
      border = "1.5px solid #1D32FF";
      shadow = "0 0 0 3px rgba(29,50,255,0.18)";
    } else if (isHovered) {
      border = "1.5px solid #A3A3A3";
    }

    return {
      width:          cfg.box,
      height:         cfg.box,
      borderRadius:   cfg.radius,
      background:     bg,
      border:         border,
      boxShadow:      shadow,
      boxSizing:      "border-box",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      flexShrink:     0,
      cursor:         disabled ? "not-allowed" : "pointer",
      transition:     "border-color 0.12s, background 0.12s, box-shadow 0.12s",
      // Reset Radix button defaults
      padding:        0,
      margin:         0,
    };
  };

  const iconColor = disabled ? "#9CA3AF" : "#FFFFFF";

  // We track hover/focus via React state so the inline style reacts to them
  const [hovered, setHovered] = React.useState(false);
  const [focused,  setFocused]  = React.useState(false);

  return (
    <div
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        8,
        cursor:     disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
    >
      <RadixCheckbox.Root
        id={id}
        checked={radixChecked}
        disabled={disabled}
        onCheckedChange={val => {
          if (val === "indeterminate") return;
          onChange?.(val);
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={computeBoxStyle(hovered, focused)}
      >
        <RadixCheckbox.Indicator forceMount style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {indeterminate
            ? <MinusIcon w={cfg.iconW} h={cfg.iconH} color={iconColor} />
            : checked
              ? <CheckIcon w={cfg.iconW} h={cfg.iconH} color={iconColor} />
              : null
          }
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {label && (
        <label
          htmlFor={id}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize:   14,
            fontWeight: 500,
            lineHeight: "20px",
            color:      disabled ? "#A3A3A3" : "#171717",
            cursor:     disabled ? "not-allowed" : "pointer",
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
}
