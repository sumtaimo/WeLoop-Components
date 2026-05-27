import React, { useState } from "react";
import { ButtonDropdown, type DropdownMenuItem } from "../../src/components/atoms/ButtonDropdown";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Shared menu sets ─────────────────────────────────────────────────────────

const BASIC_ITEMS: DropdownMenuItem[] = [
  { id: "edit",   label: "Edit",   icon: <EditIcon /> },
  { id: "copy",   label: "Copy",   icon: <CopyIcon /> },
  { id: "delete", label: "Delete", icon: <TrashIcon />, danger: true, separator: true },
];

const FULL_ITEMS: DropdownMenuItem[] = [
  { id: "view",     label: "View details",  icon: <EyeIcon /> },
  { id: "edit",     label: "Edit",          icon: <EditIcon /> },
  { id: "duplicate",label: "Duplicate",     icon: <CopyIcon /> },
  { id: "archive",  label: "Archive",       icon: <ArchiveIcon />, separator: true },
  { id: "delete",   label: "Delete",        icon: <TrashIcon />,  danger: true },
];

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function ButtonDropdownDemo() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openCommon,  setOpenCommon]  = useState(false);
  const [lastAction,  setLastAction]  = useState<string | null>(null);

  return (
    <DemoShell
      title="ButtonDropdown"
      description="Split button with label + chevron. 2 types × 2 fills × 3 sizes. Pass menuItems to activate a real Radix dropdown — keyboard navigable, properly positioned."
    >
      {/* ── Section 1: Live dropdown (Radix) ── */}
      <DemoRow label="With menu items — click chevron to open Radix dropdown">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 16px" }}>
          <ButtonDropdown
            buttonType="primary" size="md" label="Actions"
            menuItems={FULL_ITEMS}
            onLabelClick={() => setLastAction("Primary label clicked")}
            onMenuSelect={id => setLastAction(`Primary → ${id}`)}
          />
          <ButtonDropdown
            buttonType="common" size="md" label="Options"
            menuItems={BASIC_ITEMS}
            onLabelClick={() => setLastAction("Common label clicked")}
            onMenuSelect={id => setLastAction(`Common → ${id}`)}
          />
          <ButtonDropdown
            buttonType="primary" size="md" filled={false} label="More"
            menuItems={FULL_ITEMS}
            onMenuSelect={id => setLastAction(`Outline → ${id}`)}
          />
        </div>
        {lastAction && (
          <p style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
            ✓ <strong style={{ color: "#111827" }}>{lastAction}</strong>
          </p>
        )}
      </DemoRow>

      {/* ── Section 2: Filled × all sizes ── */}
      <DemoRow label="Primary — Filled × XS · SM · MD">
        <ButtonDropdown buttonType="primary" size="xs" label="Button Option" />
        <ButtonDropdown buttonType="primary" size="sm" label="Button Option" />
        <ButtonDropdown buttonType="primary" size="md" label="Button Option" />
      </DemoRow>
      <DemoRow label="Common — Filled × XS · SM · MD">
        <ButtonDropdown buttonType="common" size="xs" label="Button Option" />
        <ButtonDropdown buttonType="common" size="sm" label="Button Option" />
        <ButtonDropdown buttonType="common" size="md" label="Button Option" />
      </DemoRow>

      {/* ── Section 3: Outline × all sizes ── */}
      <DemoRow label="Primary — Outline × XS · SM · MD">
        <ButtonDropdown buttonType="primary" size="xs" filled={false} label="Button Option" />
        <ButtonDropdown buttonType="primary" size="sm" filled={false} label="Button Option" />
        <ButtonDropdown buttonType="primary" size="md" filled={false} label="Button Option" />
      </DemoRow>
      <DemoRow label="Common — Outline × XS · SM · MD">
        <ButtonDropdown buttonType="common" size="xs" filled={false} label="Button Option" />
        <ButtonDropdown buttonType="common" size="sm" filled={false} label="Button Option" />
        <ButtonDropdown buttonType="common" size="md" filled={false} label="Button Option" />
      </DemoRow>

      {/* ── Section 4: Active (open) state ── */}
      <DemoRow label="Active (open) state — click chevron to toggle chevron rotation">
        <ButtonDropdown
          buttonType="primary" size="md" label="Button Option"
          open={openPrimary}
          onChevronClick={() => setOpenPrimary(v => !v)}
        />
        <ButtonDropdown
          buttonType="common" size="md" label="Button Option"
          open={openCommon}
          onChevronClick={() => setOpenCommon(v => !v)}
        />
        <ButtonDropdown
          buttonType="primary" size="md" filled={false} label="Button Option"
          open={openPrimary}
          onChevronClick={() => setOpenPrimary(v => !v)}
        />
      </DemoRow>

      {/* ── Section 5: Disabled ── */}
      <DemoRow label="Disabled — Filled &amp; Outline">
        <ButtonDropdown buttonType="primary" size="sm" label="Button Option" disabled />
        <ButtonDropdown buttonType="common"  size="sm" label="Button Option" disabled />
        <ButtonDropdown buttonType="primary" size="sm" filled={false} label="Button Option" disabled />
        <ButtonDropdown buttonType="common"  size="sm" filled={false} label="Button Option" disabled />
      </DemoRow>
    </DemoShell>
  );
}

// ─── Micro icons ─────────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M10 2l2 2-7 7H3v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M3 9V3a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4h10M5 4V2.5h4V4M6 7v3.5M8 7v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <rect x="3" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}
function ArchiveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 5v6a1 1 0 001 1h8a1 1 0 001-1V5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
