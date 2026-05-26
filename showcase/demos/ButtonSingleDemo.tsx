import React from "react";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { DemoShell, DemoRow } from "../DemoShell";

export function ButtonSingleDemo() {
  return (
    <DemoShell
      title="ButtonSingle"
      description="Single-action button with 3 types (primary, danger, ghost), 3 variants (filled, outline, ghost text), and 3 sizes."
    >
      <DemoRow label="Type × Variant — Size MD">
        <ButtonSingle buttonType="primary" variant="filled"  size="md">Primary Filled</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md">Primary Outline</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md">Primary Ghost</ButtonSingle>
      </DemoRow>
      <DemoRow label="Danger">
        <ButtonSingle buttonType="danger" variant="filled"  size="md">Danger Filled</ButtonSingle>
        <ButtonSingle buttonType="danger" variant="outline" size="md">Danger Outline</ButtonSingle>
        <ButtonSingle buttonType="danger" variant="ghost"   size="md">Danger Ghost</ButtonSingle>
      </DemoRow>
      <DemoRow label="Sizes — Primary Filled">
        <ButtonSingle buttonType="primary" variant="filled" size="xs">XSmall</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="filled" size="sm">Small</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="filled" size="md">Medium</ButtonSingle>
      </DemoRow>
      <DemoRow label="Disabled">
        <ButtonSingle disabled size="md">Disabled</ButtonSingle>
      </DemoRow>
    </DemoShell>
  );
}
