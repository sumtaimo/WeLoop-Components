import React, { useState } from "react";
import { ButtonDropdown } from "../../src/components/atoms/ButtonDropdown";
import { DemoShell, DemoRow } from "../DemoShell";

export function ButtonDropdownDemo() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openCommon,  setOpenCommon]  = useState(false);

  return (
    <DemoShell
      title="ButtonDropdown"
      description="Split button with label + chevron. 2 types × 2 fills × 3 sizes. Hover sections to see individual hover states. Matches Figma Button: Dropdown."
    >
      {/* ── Filled × all sizes ── */}
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

      {/* ── Outline × all sizes ── */}
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

      {/* ── Active (open) state ── */}
      <DemoRow label="Active (open) state — click chevron to toggle">
        <ButtonDropdown
          buttonType="primary"
          size="md"
          label="Button Option"
          open={openPrimary}
          onChevronClick={() => setOpenPrimary(v => !v)}
        />
        <ButtonDropdown
          buttonType="common"
          size="md"
          label="Button Option"
          open={openCommon}
          onChevronClick={() => setOpenCommon(v => !v)}
        />
        <ButtonDropdown
          buttonType="primary"
          size="md"
          filled={false}
          label="Button Option"
          open={openPrimary}
          onChevronClick={() => setOpenPrimary(v => !v)}
        />
      </DemoRow>

      {/* ── Disabled ── */}
      <DemoRow label="Disabled — Filled &amp; Outline">
        <ButtonDropdown buttonType="primary" size="sm" label="Button Option" disabled />
        <ButtonDropdown buttonType="common"  size="sm" label="Button Option" disabled />
        <ButtonDropdown buttonType="primary" size="sm" filled={false} label="Button Option" disabled />
        <ButtonDropdown buttonType="common"  size="sm" filled={false} label="Button Option" disabled />
      </DemoRow>
    </DemoShell>
  );
}
