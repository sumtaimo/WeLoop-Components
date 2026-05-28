import React, { useState } from "react";
import { ButtonDropdown, type DropdownMenuItem } from "../../src/components/atoms/ButtonDropdown";
import { IconPen16, IconCopy16, IconTrash16, IconEye16, IconDoc16 } from "../../src/components/atoms/Icon";
import { DemoShell, DemoRow } from "../DemoShell";

const BASIC_ITEMS: DropdownMenuItem[] = [
  { id: "edit",   label: "Edit",   icon: <IconPen16 /> },
  { id: "copy",   label: "Copy",   icon: <IconCopy16 /> },
  { id: "delete", label: "Delete", icon: <IconTrash16 />, danger: true, separator: true },
];

const FULL_ITEMS: DropdownMenuItem[] = [
  { id: "view",      label: "View details", icon: <IconEye16 /> },
  { id: "edit",      label: "Edit",         icon: <IconPen16 /> },
  { id: "duplicate", label: "Duplicate",    icon: <IconCopy16 /> },
  { id: "archive",   label: "Archive",      icon: <IconDoc16 />, separator: true },
  { id: "delete",    label: "Delete",       icon: <IconTrash16 />, danger: true },
];

export function ButtonDropdownDemo() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openCommon,  setOpenCommon]  = useState(false);
  const [lastAction,  setLastAction]  = useState<string | null>(null);

  return (
    <DemoShell
      title="ButtonDropdown"
      category="atom"
      description="Split button with label + chevron. 2 types × 2 fills × 3 sizes. Pass menuItems to activate a real Radix dropdown — keyboard navigable, properly positioned."
      importCode={`import { ButtonDropdown } from 'weloop-components';\nimport { IconPen16, IconCopy16, IconTrash16, IconEye16, IconDoc16 } from 'weloop-components';`}
    >
      {/* ── Section 1: Live dropdown (Radix) ── */}
      <DemoRow label="With menu items — click chevron to open Radix dropdown" code={`import { ButtonDropdown, type DropdownMenuItem } from 'weloop-components';
import { IconPen16, IconCopy16, IconTrash16 } from 'weloop-components';

const menuItems: DropdownMenuItem[] = [
  { id: "edit",   label: "Edit",   icon: <IconPen16 /> },
  { id: "copy",   label: "Copy",   icon: <IconCopy16 /> },
  { id: "delete", label: "Delete", icon: <IconTrash16 />, danger: true, separator: true },
];

// Primary (blue) filled — default
<ButtonDropdown
  buttonType="primary"
  size="md"
  label="Actions"
  menuItems={menuItems}
  onLabelClick={() => handlePrimaryAction()}
  onMenuSelect={id => handleMenuSelect(id)}
/>

// Common (grey) filled
<ButtonDropdown buttonType="common" size="md" label="Options" menuItems={menuItems} />

// Outline variant
<ButtonDropdown buttonType="primary" size="md" filled={false} label="More" menuItems={menuItems} />`}>
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
      <DemoRow label="Primary — Filled × XS · SM · MD" code={`// 3 sizes: "xs" | "sm" | "md"
<ButtonDropdown buttonType="primary" size="xs" label="Button Option" />
<ButtonDropdown buttonType="primary" size="sm" label="Button Option" />
<ButtonDropdown buttonType="primary" size="md" label="Button Option" />`}>
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
