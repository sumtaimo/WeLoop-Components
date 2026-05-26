import React, { useState } from "react";
import { ButtonDropdown } from "../../src/components/atoms/ButtonDropdown";
import { DemoShell, DemoRow } from "../DemoShell";

export function ButtonDropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoShell
      title="ButtonDropdown"
      description="Split button with a label section and a chevron section. Chevron rotates when open."
    >
      <DemoRow label="Primary × Sizes">
        <ButtonDropdown buttonType="primary" size="xs" label="Action" />
        <ButtonDropdown buttonType="primary" size="sm" label="Action" />
        <ButtonDropdown buttonType="primary" size="md" label="Action" />
      </DemoRow>
      <DemoRow label="Common × Sizes">
        <ButtonDropdown buttonType="common" size="xs" label="Options" />
        <ButtonDropdown buttonType="common" size="sm" label="Options" />
        <ButtonDropdown buttonType="common" size="md" label="Options" />
      </DemoRow>
      <DemoRow label="Open State (click chevron)">
        <ButtonDropdown
          buttonType="common"
          size="md"
          label="Toggle me"
          open={open}
          onChevronClick={() => setOpen((v) => !v)}
        />
      </DemoRow>
      <DemoRow label="Disabled">
        <ButtonDropdown buttonType="primary" size="md" label="Disabled" disabled />
      </DemoRow>
    </DemoShell>
  );
}
