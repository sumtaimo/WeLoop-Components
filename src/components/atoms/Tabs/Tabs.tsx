import React, { useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * "box"  — tabs inside a rounded container; selected tab gets pill bg.
 *          Figma node 18578:14130 — top variant.
 * "line" — flat tab bar; selected tab has a blue bottom-border underline.
 *          Figma node 18578:14130 — bottom variant.
 */
export type TabsVariant = "box" | "line";

export interface TabItem {
  id:       string;
  label:    string;
  count?:   number;
  disabled?: boolean;
}

export interface TabsProps {
  items:         TabItem[];
  value?:        string;
  onChange?:     (value: string) => void;
  defaultValue?: string;
  variant?:      TabsVariant;
  /** Optional panel content keyed by tab id */
  panels?:       Record<string, React.ReactNode>;
  style?:        React.CSSProperties;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export function Tabs({
  items,
  value,
  onChange,
  defaultValue,
  variant = "line",
  panels,
  style,
}: TabsProps) {
  // internal uncontrolled fallback
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id ?? "");
  const active   = value ?? internal;
  const setActive = (v: string) => { setInternal(v); onChange?.(v); };

  return (
    <RadixTabs.Root
      value={active}
      onValueChange={setActive}
      style={{ width: "100%", ...style }}
    >
      {variant === "box"
        ? <BoxList  items={items} active={active} />
        : <LineList items={items} active={active} />
      }

      {panels && items.map(tab => (
        <RadixTabs.Content
          key={tab.id}
          value={tab.id}
          style={{ outline: "none" }}
        >
          {panels[tab.id]}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}

// ─── Box variant ─────────────────────────────────────────────────────────────
// Container pill, selected = light-blue pill bg, hover = gray pill bg

function BoxList({ items, active }: { items: TabItem[]; active: string }) {
  return (
    <RadixTabs.List
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        gap:          2,
        padding:      "5px 6px",
        borderRadius: 10,
        border:       "1px solid #E5E7EB",
        background:   "#FFFFFF",
        outline:      "none",
      }}
    >
      {items.map(tab => (
        <BoxTrigger key={tab.id} tab={tab} selected={tab.id === active} />
      ))}
    </RadixTabs.List>
  );
}

function BoxTrigger({ tab, selected }: { tab: TabItem; selected: boolean }) {
  const [hov, setHov] = useState(false);

  // ── Color logic ────────────────────────────────────────────────────────────
  // Selected + hover  → blue-tinted bg (#EEF1FF), blue text
  // Selected only     → subtle underline inside the pill, blue text
  // Hover (unselected)→ gray bg (#F3F4F6), gray text
  // Default           → transparent, gray text

  let bg    = "transparent";
  let color = "#6B7280";
  let shadow: string | undefined;

  if (tab.disabled) {
    color = "#D1D5DB";
  } else if (selected && hov) {
    bg    = "#EEF1FF";
    color = "#1D32FF";
  } else if (selected) {
    bg    = "#EEF1FF";
    color = "#1D32FF";
    shadow = "inset 0 -2px 0 0 #1D32FF";
  } else if (hov) {
    bg    = "#F3F4F6";
    color = "#374151";
  }

  return (
    <RadixTabs.Trigger
      value={tab.id}
      disabled={tab.disabled}
      onMouseEnter={() => !tab.disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        gap:          4,
        padding:      "8px 12px",
        borderRadius: 7,
        border:       "none",
        background:   bg,
        color:        color,
        boxShadow:    shadow,
        cursor:       tab.disabled ? "not-allowed" : "pointer",
        outline:      "none",
        userSelect:   "none",
        transition:   "background 0.15s, color 0.15s",
        fontFamily:   "Inter, sans-serif",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: selected ? 600 : 500, lineHeight: "18px" }}>
        {tab.label}
      </span>
      {tab.count !== undefined && (
        <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.6, lineHeight: "16px" }}>
          {tab.count}
        </span>
      )}
    </RadixTabs.Trigger>
  );
}

// ─── Line variant ─────────────────────────────────────────────────────────────
// Flat bar, selected = blue text + thick blue bottom border

function LineList({ items, active }: { items: TabItem[]; active: string }) {
  return (
    <div style={{ borderBottom: "1.5px solid #E5E7EB", width: "100%" }}>
      <RadixTabs.List
        style={{
          display: "flex",
          gap:     0,
          outline: "none",
        }}
      >
        {items.map(tab => (
          <LineTrigger key={tab.id} tab={tab} selected={tab.id === active} />
        ))}
      </RadixTabs.List>
    </div>
  );
}

function LineTrigger({ tab, selected }: { tab: TabItem; selected: boolean }) {
  const [hov, setHov] = useState(false);

  const color = tab.disabled
    ? "#D1D5DB"
    : selected
      ? "#1D32FF"
      : hov
        ? "#374151"
        : "#6B7280";

  return (
    <RadixTabs.Trigger
      value={tab.id}
      disabled={tab.disabled}
      onMouseEnter={() => !tab.disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:   "relative",
        display:    "inline-flex",
        alignItems: "center",
        gap:        5,
        padding:    "0 4px",
        height:     40,
        border:     "none",
        background: "transparent",
        color:      color,
        cursor:     tab.disabled ? "not-allowed" : "pointer",
        outline:    "none",
        userSelect: "none",
        flexShrink: 0,
        fontFamily: "Inter, sans-serif",
        // Blue underline when selected — sits below the tab on top of the border
        boxShadow:  selected ? "inset 0 -2px 0 0 #1D32FF" : "none",
        transition: "color 0.15s, box-shadow 0.15s",
        marginBottom: selected ? "-1.5px" : "0",  // overlap the list border
      }}
    >
      <span style={{
        fontSize:   13,
        fontWeight: selected ? 600 : 500,
        lineHeight: "18px",
        padding:    "0 12px",
      }}>
        {tab.label}
      </span>
      {tab.count !== undefined && (
        <span style={{
          fontSize:   11,
          fontWeight: 400,
          opacity:    0.6,
          lineHeight: "16px",
          marginLeft: -8,
          paddingRight: 12,
        }}>
          {tab.count}
        </span>
      )}
    </RadixTabs.Trigger>
  );
}
