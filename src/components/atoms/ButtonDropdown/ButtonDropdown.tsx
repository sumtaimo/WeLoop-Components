import React, { useState } from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonDropdownType = "primary" | "common";
export type ButtonDropdownSize = "xs" | "sm" | "md";

export interface DropdownMenuItem {
  id:        string;
  label:     string;
  icon?:     React.ReactNode;
  disabled?: boolean;
  danger?:   boolean;
  /** Renders a separator line above this item */
  separator?: boolean;
}

export interface ButtonDropdownProps {
  buttonType?: ButtonDropdownType;
  size?:       ButtonDropdownSize;
  /** Show filled (solid) or outline style */
  filled?:     boolean;
  label?:      string;
  leadIcon?:   React.ReactNode;
  /** Whether the chevron points up — pass to control externally */
  open?:       boolean;
  disabled?:   boolean;
  onLabelClick?:  () => void;
  onChevronClick?: () => void;
  /** Menu items for the Radix dropdown. If provided, clicking chevron opens a real menu. */
  menuItems?: DropdownMenuItem[];
  /** Called when a menu item is selected */
  onMenuSelect?: (id: string) => void;
  className?: string;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const sizes: Record<ButtonDropdownSize, {
  height: number; labelPx: number; chevronPx: number;
  py: number; radius: number; fontSize: number;
}> = {
  xs: { height: 24, labelPx: 8,  chevronPx: 8,  py: 4, radius: 6, fontSize: 12 },
  sm: { height: 32, labelPx: 12, chevronPx: 12, py: 8, radius: 8, fontSize: 14 },
  md: { height: 36, labelPx: 14, chevronPx: 12, py: 8, radius: 8, fontSize: 14 },
};

// ─── Container styles ─────────────────────────────────────────────────────────

const filledStyle: Record<ButtonDropdownType, React.CSSProperties> = {
  primary: {
    background: "#1d32ff",
    boxShadow:  "0 0 0 1px #1221c1, 0 1px 1px 0 rgba(18,33,193,0.5), 0 2px 3px 0 rgba(18,33,193,0.1)",
    color:      "#fafafa",
  },
  common: {
    background: "white",
    boxShadow:  "0 0 0 0.5px #e5e5e5, 0 1px 1px 0 rgba(0,0,0,0.06)",
    color:      "#171717",
  },
};

const outlineStyle: Record<ButtonDropdownType, React.CSSProperties> = {
  primary: { background: "transparent", border: "1.5px solid #1d32ff", color: "#1d32ff" },
  common:  { background: "transparent", border: "1.5px solid #d1d5db", color: "#171717" },
};

const filledHoverOverlay: Record<ButtonDropdownType, string> = {
  primary: "rgba(255,255,255,0.12)",
  common:  "rgba(0,0,0,0.04)",
};
const activeChevronOverlay: Record<ButtonDropdownType, string> = {
  primary: "rgba(0,0,0,0.18)",
  common:  "rgba(0,0,0,0.06)",
};
const dividerColor: Record<ButtonDropdownType, string> = {
  primary: "rgba(255,255,255,0.25)",
  common:  "#e5e5e5",
};

const disabledStyle: React.CSSProperties = {
  background: "#f5f5f5", color: "#a3a3a3",
  border: "1px solid #e5e5e5", boxShadow: "none", cursor: "not-allowed",
};

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms" }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Split button trigger ─────────────────────────────────────────────────────

function SplitTrigger({
  buttonType, size, filled, label, leadIcon, open, disabled,
  onLabelClick, onChevronClick, className,
}: ButtonDropdownProps) {
  const s = sizes[size ?? "sm"];
  const [labelHov,   setLabelHov]   = useState(false);
  const [chevronHov, setChevronHov] = useState(false);

  const containerStyle: React.CSSProperties = disabled
    ? disabledStyle
    : filled
      ? filledStyle[buttonType ?? "primary"]
      : outlineStyle[buttonType ?? "primary"];

  const chevBg = !disabled && filled && (chevronHov || open)
    ? (open ? activeChevronOverlay[buttonType ?? "primary"] : filledHoverOverlay[buttonType ?? "primary"])
    : "transparent";

  return (
    <div
      className={className}
      style={{
        display:    "inline-flex",
        alignItems: "stretch",
        height:     s.height,
        borderRadius: s.radius,
        overflow:   "hidden",
        flexShrink: 0,
        boxSizing:  "border-box",
        transition: "background 0.12s, box-shadow 0.12s",
        ...containerStyle,
      }}
    >
      {/* Label section */}
      <button
        type="button"
        disabled={disabled}
        onClick={onLabelClick}
        onMouseEnter={() => setLabelHov(true)}
        onMouseLeave={() => setLabelHov(false)}
        style={{
          display:     "inline-flex",
          alignItems:  "center",
          gap:         6,
          height:      "100%",
          padding:     `${s.py}px ${s.labelPx}px`,
          border:      "none",
          background:  !disabled && filled && labelHov ? filledHoverOverlay[buttonType ?? "primary"] : "transparent",
          cursor:      disabled ? "not-allowed" : "pointer",
          fontFamily:  "Inter, sans-serif",
          fontWeight:  500,
          fontSize:    s.fontSize,
          lineHeight:  "16px",
          letterSpacing: "-0.2px",
          color:       "inherit",
          whiteSpace:  "nowrap",
          minWidth:    20,
          overflow:    "hidden",
          textOverflow: "ellipsis",
          transition:  "background 0.12s",
        }}
      >
        {leadIcon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{leadIcon}</span>}
        {label}
      </button>

      {/* Divider */}
      <div style={{
        width:     0.5,
        background: disabled ? "#e5e5e5" : dividerColor[buttonType ?? "primary"],
        alignSelf: "stretch",
        flexShrink: 0,
      }} />

      {/* Chevron section */}
      <button
        type="button"
        disabled={disabled}
        onClick={onChevronClick}
        onMouseEnter={() => setChevronHov(true)}
        onMouseLeave={() => setChevronHov(false)}
        aria-label={open ? "Close options" : "Open options"}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          justifyContent: "center",
          height:         "100%",
          padding:        `${s.py}px ${s.chevronPx}px`,
          border:         "none",
          background:     chevBg,
          cursor:         disabled ? "not-allowed" : "pointer",
          color:          "inherit",
          flexShrink:     0,
          transition:     "background 0.12s",
        }}
      >
        <ChevronIcon open={open ?? false} />
      </button>
    </div>
  );
}

// ─── ButtonDropdown ───────────────────────────────────────────────────────────

export function ButtonDropdown({
  buttonType   = "primary",
  size         = "sm",
  filled       = true,
  label        = "Button Option",
  leadIcon,
  open,
  disabled     = false,
  onLabelClick,
  onChevronClick,
  menuItems,
  onMenuSelect,
  className    = "",
}: ButtonDropdownProps) {

  // ── Without menu items: pure trigger (backward-compatible) ───────────────
  if (!menuItems || menuItems.length === 0) {
    return (
      <SplitTrigger
        buttonType={buttonType} size={size} filled={filled}
        label={label} leadIcon={leadIcon} open={open} disabled={disabled}
        onLabelClick={onLabelClick} onChevronClick={onChevronClick}
        className={className}
      />
    );
  }

  // ── With menu items: Radix DropdownMenu ──────────────────────────────────
  return (
    <RadixDropdown.Root onOpenChange={() => {}}>
      <RadixDropdown.Trigger asChild disabled={disabled}>
        <SplitTrigger
          buttonType={buttonType} size={size} filled={filled}
          label={label} leadIcon={leadIcon} open={open} disabled={disabled}
          onLabelClick={onLabelClick}
          className={className}
        />
      </RadixDropdown.Trigger>

      <RadixDropdown.Portal>
        <RadixDropdown.Content
          className="wl-dropdown"
          align="end"
          sideOffset={4}
          style={{
            background:   "#FFFFFF",
            borderRadius: 10,
            border:       "1px solid #E5E7EB",
            boxShadow:    "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
            padding:      "4px",
            minWidth:     180,
            zIndex:       9999,
            transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
          }}
        >
          {menuItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              {item.separator && idx > 0 && (
                <RadixDropdown.Separator style={{
                  height: 1, background: "#F3F4F6", margin: "4px 0",
                }} />
              )}
              <RadixDropdown.Item
                disabled={item.disabled}
                onSelect={() => onMenuSelect?.(item.id)}
                style={{
                  display:     "flex",
                  alignItems:  "center",
                  gap:         8,
                  padding:     "7px 10px",
                  borderRadius: 6,
                  fontFamily:  "Inter, sans-serif",
                  fontSize:    13,
                  fontWeight:  item.danger ? 500 : 400,
                  color:       item.disabled ? "#9CA3AF" : item.danger ? "#DC2626" : "#111827",
                  cursor:      item.disabled ? "not-allowed" : "pointer",
                  outline:     "none",
                  userSelect:  "none",
                  transition:  "background 0.10s",
                }}
                onMouseEnter={e => {
                  if (!item.disabled)
                    e.currentTarget.style.background = item.danger ? "#FEF2F2" : "#F9FAFB";
                }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {item.icon && (
                  <span style={{
                    display:    "inline-flex",
                    flexShrink: 0,
                    color:      item.disabled ? "#D1D5DB" : item.danger ? "#DC2626" : "#6B7280",
                  }}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </RadixDropdown.Item>
            </React.Fragment>
          ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
}
