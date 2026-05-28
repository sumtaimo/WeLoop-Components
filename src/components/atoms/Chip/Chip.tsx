import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/** "suggest" = checkmark icon · "input" = avatar photo */
export type ChipType = "suggest" | "input";
/** "s" = 24px height · "m" = 32px height */
export type ChipSize = "s" | "m";

export interface ChipProps {
  /** Content type — checkmark icon vs avatar photo */
  type?: ChipType;
  size?: ChipSize;
  label: string;
  /** Avatar URL — required when type="input" */
  avatarSrc?: string;
  /** Squace variant (from Figma) — adds a touch more horizontal spacing */
  squace?: boolean;
  disabled?: boolean;
  onRemove?: () => void;
  /** Optional className for custom styling */
  style?: React.CSSProperties;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE_CFG = {
  s: {
    height:        24,
    fontSize:      12,
    lineHeight:    "16px",
    paddingH:      8,   // horizontal padding of chip container
    gap:           5,   // gap between icon / text / remove
    iconSize:      12,  // checkmark SVG bounding box
    avatarSize:    16,
    removeBtnSize: 14,  // filled circle ×
    removeIconSize:8,
  },
  m: {
    height:        32,
    fontSize:      13,
    lineHeight:    "18px",
    paddingH:      10,
    gap:           6,
    iconSize:      14,
    avatarSize:    22,
    removeBtnSize: 18,
    removeIconSize:10,
  },
} as const;

// ─── State colors ─────────────────────────────────────────────────────────────

type StateColors = {
  bg: string;
  border: string;
  text: string;
  iconColor: string;
  removeBg: string;
  removeX: string;
};

const COLORS: Record<"default" | "hover" | "pressed" | "disabled", StateColors> = {
  default: {
    bg:          "#FFFFFF",
    border:      "#628AFF",
    text:        "#1D32FF",
    iconColor:   "#1D32FF",
    removeBg:    "#1D32FF",
    removeX:     "#FFFFFF",
  },
  hover: {
    bg:          "#EEF1FF",
    border:      "#1D32FF",
    text:        "#1D32FF",
    iconColor:   "#1D32FF",
    removeBg:    "#1D32FF",
    removeX:     "#FFFFFF",
  },
  pressed: {
    bg:          "#1D32FF",
    border:      "#1D32FF",
    text:        "#FFFFFF",
    iconColor:   "#FFFFFF",
    removeBg:    "rgba(255,255,255,0.25)",
    removeX:     "#FFFFFF",
  },
  disabled: {
    bg:          "#F5F5F5",
    border:      "#D4D4D4",
    text:        "#A3A3A3",
    iconColor:   "#A3A3A3",
    removeBg:    "#D4D4D4",
    removeX:     "#FFFFFF",
  },
};

// ─── SVG icons ────────────────────────────────────────────────────────────────

function CheckIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M2 6.5l3 3L10 3"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemoveButton({
  btnSize, iconSize, bg, xColor, onClick, disabled, label,
}: {
  btnSize: number;
  iconSize: number;
  bg: string;
  xColor: string;
  onClick?: () => void;
  disabled?: boolean;
  label: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick?.(); }}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={`Remove ${label}`}
      style={{
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        width:           btnSize,
        height:          btnSize,
        borderRadius:    "50%",
        background:      hov && !disabled ? "rgba(0,0,0,0.15)" : bg,
        border:          "none",
        padding:         0,
        flexShrink:      0,
        cursor:          disabled ? "default" : "pointer",
        transition:      "background 0.12s",
      }}
    >
      <svg
        width={iconSize} height={iconSize}
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 2l6 6M8 2L2 8"
          stroke={xColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

export function Chip({
  type     = "suggest",
  size     = "m",
  label,
  avatarSrc,
  squace   = false,
  disabled = false,
  onRemove,
  style,
}: ChipProps) {
  const [hovered,  setHovered]  = useState(false);
  const [pressed,  setPressed]  = useState(false);

  const cfg = SIZE_CFG[size];
  const extraPad = squace ? 2 : 0;

  const stateKey: keyof typeof COLORS =
    disabled              ? "disabled"
    : pressed && !disabled ? "pressed"
    : hovered && !disabled ? "hover"
    : "default";

  const C = COLORS[stateKey];

  return (
    <div
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display:         "inline-flex",
        alignItems:      "center",
        gap:             cfg.gap,
        height:          cfg.height,
        padding:         `0 ${cfg.paddingH + extraPad}px`,
        borderRadius:    999,
        background:      C.bg,
        border:          `1px solid ${C.border}`,
        boxSizing:       "border-box",
        cursor:          disabled ? "default" : "pointer",
        userSelect:      "none",
        transition:      "background 0.12s, border-color 0.12s",
        flexShrink:      0,
        ...style,
      }}
    >
      {/* ── Left icon ── */}
      {type === "suggest" ? (
        <CheckIcon size={cfg.iconSize} color={C.iconColor} />
      ) : (
        /* Avatar */
        <div style={{
          width:        cfg.avatarSize,
          height:       cfg.avatarSize,
          borderRadius: "50%",
          overflow:     "hidden",
          flexShrink:   0,
          background:   "#E5E7EB",
        }}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            /* Fallback: initials first letter */
            <div style={{
              width:          "100%",
              height:         "100%",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontFamily:     "Inter, sans-serif",
              fontSize:       cfg.avatarSize * 0.45,
              fontWeight:     600,
              color:          C.iconColor,
              background:     C.bg,
            }}>
              {label[0]?.toUpperCase()}
            </div>
          )}
        </div>
      )}

      {/* ── Label ── */}
      <span style={{
        fontFamily:  "Inter, sans-serif",
        fontSize:    cfg.fontSize,
        fontWeight:  500,
        lineHeight:  cfg.lineHeight,
        color:       C.text,
        whiteSpace:  "nowrap",
        transition:  "color 0.12s",
      }}>
        {label}
      </span>

      {/* ── Remove button ── */}
      <RemoveButton
        btnSize={cfg.removeBtnSize}
        iconSize={cfg.removeIconSize}
        bg={C.removeBg}
        xColor={C.removeX}
        onClick={onRemove}
        disabled={disabled}
        label={label}
      />
    </div>
  );
}
