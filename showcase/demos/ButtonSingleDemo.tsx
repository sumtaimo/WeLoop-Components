import React from "react";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { IconAdd, IconSearch16, IconStar16 } from "../../src/components/atoms/Icon";
import { DemoShell, DemoRow } from "../DemoShell";

const LEAD_ICON = <IconAdd />;

export function ButtonSingleDemo() {
  return (
    <DemoShell
      title="ButtonSingle"
      category="atom"
      description="3 types × 3 variants × 3 sizes — hover and press to see interactive states. Matches Figma node Button: Single."
      importCode={`import { ButtonSingle } from 'weloop-components';\nimport { IconAdd, IconSearch16, IconStar16 } from 'weloop-components';`}
    >
      {/* ── XS ── */}
      <DemoRow label="XS — Default">
        <ButtonSingle buttonType="primary" variant="filled"  size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="xs" leadIcon={LEAD_ICON}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="XS — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="xs" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── SM ── */}
      <DemoRow label="SM — Default (hover &amp; press to see states)">
        <ButtonSingle buttonType="primary" variant="filled"  size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="sm" leadIcon={<IconSearch16 />}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="SM — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="sm" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── MD ── */}
      <DemoRow label="MD — Default (hover &amp; press to see states)">
        <ButtonSingle buttonType="primary" variant="filled"  size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="md" leadIcon={<IconStar16 />}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="MD — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="md" leadIcon={LEAD_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── Shortcut badge ── */}
      <DemoRow label="With shortcut badge">
        <ButtonSingle buttonType="primary" variant="filled" size="sm" shortcut="⌘K">Action</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="filled" size="sm" shortcut="⌘P">Command</ButtonSingle>
      </DemoRow>
    </DemoShell>
  );
}
