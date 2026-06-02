import React from "react";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { IconAdd, IconSearch16, IconStar16 } from "../../src/components/atoms/Icon";
import { IconBolt } from "../../src/components/atoms/Icon/Icon";
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
      <DemoRow label="XS — Default" code={`<ButtonSingle buttonType="primary" variant="filled" size="xs" leadIcon={<IconAdd />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="primary" variant="outline" size="xs" leadIcon={<IconAdd />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="danger" variant="filled" size="xs" leadIcon={<IconAdd />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="ghost" variant="outline" size="xs" leadIcon={<IconAdd />}>
  Button
</ButtonSingle>`}>
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
      <DemoRow label="SM — Default (hover &amp; press to see states)" code={`<ButtonSingle buttonType="primary" variant="filled" size="sm" leadIcon={<IconSearch16 />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="primary" variant="outline" size="sm" leadIcon={<IconSearch16 />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="danger" variant="filled" size="sm" leadIcon={<IconSearch16 />}>
  Button
</ButtonSingle>`}>
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
      <DemoRow label="MD — Default (hover &amp; press to see states)" code={`<ButtonSingle buttonType="primary" variant="filled" size="md" leadIcon={<IconStar16 />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="primary" variant="ghost" size="md" leadIcon={<IconStar16 />}>
  Button
</ButtonSingle>

<ButtonSingle buttonType="danger" variant="filled" size="md" leadIcon={<IconStar16 />}>
  Button
</ButtonSingle>`}>
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
      <DemoRow label="With shortcut badge" code={`<ButtonSingle buttonType="primary" variant="filled" size="sm" shortcut="⌘K">
  Action
</ButtonSingle>

<ButtonSingle buttonType="ghost" variant="filled" size="sm" shortcut="⌘P">
  Command
</ButtonSingle>`}>
        <ButtonSingle buttonType="primary" variant="filled" size="sm" shortcut="⌘K">Action</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="filled" size="sm" shortcut="⌘P">Command</ButtonSingle>
      </DemoRow>

      {/* ── Loading state ── */}
      <DemoRow label="Loading state — primary, secondary (outline), ghost" code={`{/* Shows a spinner; button is disabled while loading */}
<ButtonSingle buttonType="primary" variant="filled"  size="md" loading>
  Saving…
</ButtonSingle>

<ButtonSingle buttonType="primary" variant="outline" size="md" loading>
  Loading…
</ButtonSingle>

<ButtonSingle buttonType="primary" variant="ghost"   size="md" loading>
  Processing…
</ButtonSingle>

<ButtonSingle buttonType="danger"  variant="filled"  size="md" loading>
  Deleting…
</ButtonSingle>`}>
        <ButtonSingle buttonType="primary" variant="filled"  size="md" loading>Saving…</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md" loading>Loading…</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md" loading>Processing…</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" loading>Deleting…</ButtonSingle>
      </DemoRow>

      {/* ── Icon-only ── */}
      <DemoRow label="Icon-only — square button with leadIcon, no label" code={`import { IconAdd } from 'weloop-components';
import { IconBolt, IconStar16, IconSearch16 } from 'weloop-components';

{/* XS */}
<ButtonSingle buttonType="primary" variant="filled"  size="xs" iconOnly leadIcon={<IconAdd />} />
<ButtonSingle buttonType="primary" variant="outline" size="xs" iconOnly leadIcon={<IconAdd />} />
<ButtonSingle buttonType="primary" variant="ghost"   size="xs" iconOnly leadIcon={<IconAdd />} />

{/* SM */}
<ButtonSingle buttonType="primary" variant="filled"  size="sm" iconOnly leadIcon={<IconStar16 />} />
<ButtonSingle buttonType="primary" variant="outline" size="sm" iconOnly leadIcon={<IconStar16 />} />
<ButtonSingle buttonType="primary" variant="ghost"   size="sm" iconOnly leadIcon={<IconStar16 />} />

{/* MD */}
<ButtonSingle buttonType="primary"  variant="filled"  size="md" iconOnly leadIcon={<IconBolt />} />
<ButtonSingle buttonType="primary"  variant="outline" size="md" iconOnly leadIcon={<IconBolt />} />
<ButtonSingle buttonType="danger"   variant="filled"  size="md" iconOnly leadIcon={<IconBolt />} />
<ButtonSingle buttonType="ghost"    variant="outline" size="md" iconOnly leadIcon={<IconSearch16 />} disabled />`}>
        {/* XS */}
        <ButtonSingle buttonType="primary" variant="filled"  size="xs" iconOnly leadIcon={<IconAdd />} />
        <ButtonSingle buttonType="primary" variant="outline" size="xs" iconOnly leadIcon={<IconAdd />} />
        <ButtonSingle buttonType="primary" variant="ghost"   size="xs" iconOnly leadIcon={<IconAdd />} />
        {/* SM */}
        <ButtonSingle buttonType="primary" variant="filled"  size="sm" iconOnly leadIcon={<IconStar16 />} />
        <ButtonSingle buttonType="primary" variant="outline" size="sm" iconOnly leadIcon={<IconStar16 />} />
        <ButtonSingle buttonType="primary" variant="ghost"   size="sm" iconOnly leadIcon={<IconStar16 />} />
        {/* MD */}
        <ButtonSingle buttonType="primary" variant="filled"  size="md" iconOnly leadIcon={<IconBolt />} />
        <ButtonSingle buttonType="primary" variant="outline" size="md" iconOnly leadIcon={<IconBolt />} />
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" iconOnly leadIcon={<IconBolt />} />
        <ButtonSingle buttonType="ghost"   variant="outline" size="md" iconOnly leadIcon={<IconSearch16 />} disabled />
      </DemoRow>
    </DemoShell>
  );
}
