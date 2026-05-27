import React from "react";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { DemoShell, DemoRow } from "../DemoShell";

// Matches the exact 7-column matrix in Figma:
// [P-Filled | P-Outline | P-Ghost | D-Filled | D-Outline | D-Ghost | Ghost-Outline]
// × 4 rows: Default · Hover (interactive) · Pressed (interactive) · Disabled

const STAR_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885 3.91 10.5l.59-3.43L2 4.635l3.455-.505L7 1z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

export function ButtonSingleDemo() {
  return (
    <DemoShell
      title="ButtonSingle"
      description="3 types × 3 variants × 3 sizes — hover and press to see interactive states. Matches Figma node Button: Single."
    >
      {/* ── XS ── */}
      <DemoRow label="XS — Default">
        <ButtonSingle buttonType="primary" variant="filled"  size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="xs" leadIcon={STAR_ICON}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="XS — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="xs" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── SM ── */}
      <DemoRow label="SM — Default (hover &amp; press to see states)">
        <ButtonSingle buttonType="primary" variant="filled"  size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="sm" leadIcon={STAR_ICON}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="SM — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="sm" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── MD ── */}
      <DemoRow label="MD — Default (hover &amp; press to see states)">
        <ButtonSingle buttonType="primary" variant="filled"  size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="md" leadIcon={STAR_ICON}>Button</ButtonSingle>
      </DemoRow>
      <DemoRow label="MD — Disabled">
        <ButtonSingle buttonType="primary" variant="filled"  size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="outline" size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="primary" variant="ghost"   size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="filled"  size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="outline" size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="danger"  variant="ghost"   size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="outline" size="md" leadIcon={STAR_ICON} disabled>Button</ButtonSingle>
      </DemoRow>

      {/* ── Shortcut badge ── */}
      <DemoRow label="With shortcut badge">
        <ButtonSingle buttonType="primary" variant="filled" size="sm" shortcut="⌘K">Action</ButtonSingle>
        <ButtonSingle buttonType="ghost"   variant="filled" size="sm" shortcut="⌘P">Command</ButtonSingle>
      </DemoRow>
    </DemoShell>
  );
}
