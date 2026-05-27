import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AvatarType =
  | "noProfile"     // person silhouette, ring border, light bg
  | "noProfileFill" // person silhouette, gray filled (32px only in Figma)
  | "items"         // items / purpose icon, ring border
  | "bank"          // bank icon, ring border
  | "office"        // circular photo — supply src
  | "textProfile"   // initials text, gray filled
  | "chipLead"      // chip-style: icon or text, gray filled
  | "addMore";      // noProfile base + plus badge in bottom-right

export type AvatarSize = 20 | 24 | 32;

export interface AvatarProps {
  /** Visual type */
  type?: AvatarType;
  /** Pixel size — 20 | 24 | 32 */
  size?: AvatarSize;
  /** Photo URL — used when type="office" */
  src?: string;
  /** Alt text for photo */
  alt?: string;
  /** Initials — used when type="textProfile" or "chipLead" */
  text?: string;
  /** Custom icon node — used when type="chipLead" */
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────
const SIZE_CONFIG: Record<AvatarSize, {
  px: number;
  border: number;
  iconPx: number;
  badgePx: number;
  fontSize: number;
  lineHeight: string;
}> = {
  20: { px: 20, border: 1.25, iconPx: 12, badgePx: 8,  fontSize: 11.25, lineHeight: "10px" },
  24: { px: 24, border: 1.5,  iconPx: 14, badgePx: 10, fontSize: 13.5,  lineHeight: "12px" },
  32: { px: 32, border: 2,    iconPx: 20, badgePx: 13, fontSize: 14,    lineHeight: "16px" },
};

// ─── Colour constants (from Figma token values) ───────────────────────────────
const CLR_BG_LIGHT  = "#F9FAFB";  // bg-default-secondary (ring types)
const CLR_BG_FILLED = "#E5E5E5";  // bg-disabled-secondary (fill types)
const CLR_BORDER    = "#9CA3AF";  // border-selected-onselected
const CLR_ICON      = "#9CA3AF";  // icon stroke / fill
const CLR_TEXT      = "#A3A3A3";  // text-default-secondary

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function PersonIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7.5" r="3.5" stroke={CLR_ICON} strokeWidth="1.4" />
      <path
        d="M3 18c0-3.87 3.134-7 7-7s7 3.13 7 7"
        stroke={CLR_ICON}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PersonFilledIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7.5" r="3.5" fill={CLR_ICON} />
      <path
        d="M3 18c0-3.87 3.134-7 7-7s7 3.13 7 7"
        stroke={CLR_ICON}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ItemsIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="12" height="9" rx="1.5" stroke={CLR_ICON} strokeWidth="1.4" />
      <path
        d="M7.5 8V6a2.5 2.5 0 015 0v2"
        stroke={CLR_ICON}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M4 11h12" stroke={CLR_ICON} strokeWidth="1.2" />
    </svg>
  );
}

function BankIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5L2 7h16L10 2.5z" stroke={CLR_ICON} strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="2" y="7" width="16" height="1.5" fill={CLR_ICON} />
      <rect x="4" y="9" width="2" height="6" rx="0.5" fill={CLR_ICON} />
      <rect x="9" y="9" width="2" height="6" rx="0.5" fill={CLR_ICON} />
      <rect x="14" y="9" width="2" height="6" rx="0.5" fill={CLR_ICON} />
      <rect x="2" y="15.5" width="16" height="1.5" rx="0.5" fill={CLR_ICON} />
    </svg>
  );
}

function PlusIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 2v6M2 5h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
        stroke={CLR_ICON}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M10 2v4h4" stroke={CLR_ICON} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 9h4M6 12h2" stroke={CLR_ICON} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Avatar({
  type = "noProfile",
  size = 24,
  src,
  alt = "",
  text = "A",
  icon,
  onClick,
  className,
}: AvatarProps) {
  const cfg = SIZE_CONFIG[size];
  const isRing = ["noProfile", "items", "bank", "addMore", "office"].includes(type);

  // ── Outer container style ──
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: cfg.px,
    height: cfg.px,
    borderRadius: 9999,
    flexShrink: 0,
    boxSizing: "border-box",
    overflow: type === "office" ? "hidden" : undefined,
    background: type === "office"
      ? "#D1D5DB"          // fallback if no src
      : isRing
        ? CLR_BG_LIGHT
        : CLR_BG_FILLED,
    border: isRing
      ? `${cfg.border}px solid ${CLR_BORDER}`
      : "none",
    cursor: onClick ? "pointer" : undefined,
  };

  // ── Office (photo) ──
  if (type === "office") {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <PersonIcon size={cfg.iconPx} />
        )}
      </div>
    );
  }

  // ── Text-based (textProfile, chipLead without icon) ──
  if (type === "textProfile" || (type === "chipLead" && !icon)) {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            fontSize: cfg.fontSize,
            lineHeight: cfg.lineHeight,
            color: CLR_TEXT,
            userSelect: "none",
          }}
        >
          {text.slice(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  // ── chipLead with custom icon ──
  if (type === "chipLead" && icon) {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </span>
      </div>
    );
  }

  // ── noProfileFill ──
  if (type === "noProfileFill") {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <PersonFilledIcon size={cfg.iconPx} />
      </div>
    );
  }

  // ── addMore ──
  if (type === "addMore") {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <PersonIcon size={cfg.iconPx} />
        {/* Plus badge — bottom-right */}
        <span
          style={{
            position: "absolute",
            bottom: -Math.floor(cfg.badgePx * 0.2),
            right: -Math.floor(cfg.badgePx * 0.2),
            width: cfg.badgePx,
            height: cfg.badgePx,
            borderRadius: 9999,
            background: "#6B7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #F9FAFB",
            boxSizing: "border-box",
          }}
        >
          <PlusIcon size={Math.round(cfg.badgePx * 0.65)} />
        </span>
      </div>
    );
  }

  // ── noProfile ──
  if (type === "noProfile") {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <PersonIcon size={cfg.iconPx} />
      </div>
    );
  }

  // ── items ──
  if (type === "items") {
    return (
      <div style={containerStyle} className={className} onClick={onClick}>
        <ItemsIcon size={cfg.iconPx} />
      </div>
    );
  }

  // ── bank ──
  return (
    <div style={containerStyle} className={className} onClick={onClick}>
      <BankIcon size={cfg.iconPx} />
    </div>
  );
}
