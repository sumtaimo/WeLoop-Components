import React from "react";
import { Accordion } from "../../src/components/atoms/Accordion";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Sample items ─────────────────────────────────────────────────────────────

const BASIC_ITEMS = [
  {
    id: "item-1",
    title: "What is WeLoop Components?",
    content:
      "WeLoop Components is a design-system library built with React and Radix UI primitives. It provides fully-themed, accessible UI components that map 1-to-1 with Figma designs.",
  },
  {
    id: "item-2",
    title: "How do I install it?",
    content:
      'Run `npm install weloop-components` in your project, then wrap your app with the ThemeProvider and choose a theme (e.g. "webill365"). Every component will automatically pick up design tokens.',
  },
  {
    id: "item-3",
    title: "Is it accessible?",
    content:
      "Yes. All interactive components are built on Radix UI primitives which implement the WAI-ARIA patterns. Keyboard navigation, focus management, and screen-reader announcements are handled out of the box.",
  },
];

const FLUSH_ITEMS = [
  {
    id: "flush-1",
    title: "Flush variant — no outer border",
    content:
      "The flush variant removes the outer card border and border-radius, making the accordion blend seamlessly into a page section or sidebar without visual chrome.",
  },
  {
    id: "flush-2",
    title: "When should I use flush?",
    content:
      "Use flush when the accordion is embedded in a container that already provides its own border or background — for example inside a settings panel or an inline FAQ block.",
  },
  {
    id: "flush-3",
    title: "Can I mix variants?",
    content:
      "Each Accordion instance takes a single variant prop, so you can place a default accordion next to a flush one on the same page, but individual items always share the same variant.",
  },
];

const MULTIPLE_ITEMS = [
  {
    id: "multi-1",
    title: "Notifications",
    content:
      "You have 3 unread notifications. Push alerts are enabled for payments and security events. Marketing emails are turned off.",
  },
  {
    id: "multi-2",
    title: "Privacy & Security",
    content:
      "Two-factor authentication is active. Your last login was from Lagos, NG on 2 Jun 2026. No suspicious activity detected.",
  },
  {
    id: "multi-3",
    title: "Linked Accounts",
    content:
      "You have 2 bank accounts linked: Access Bank (●●●● 4501) and Zenith Bank (●●●● 8823). All accounts are verified.",
  },
];

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function AccordionDemo() {
  return (
    <DemoShell
      title="Accordion"
      category="atom"
      description="Collapsible sections built on @radix-ui/react-accordion. Supports single and multiple open modes, default and flush variants, and keyboard navigation."
      importCode={`import { Accordion } from 'weloop-components';`}
    >

      {/* ── Default variant ── */}
      <DemoRow
        label="Default variant — single type (click to expand, click again to collapse)"
        code={`<Accordion
  variant="default"
  type="single"
  items={[
    { id: "item-1", title: "What is WeLoop Components?", content: "..." },
    { id: "item-2", title: "How do I install it?",        content: "..." },
    { id: "item-3", title: "Is it accessible?",           content: "..." },
  ]}
/>`}
        fullWidth
      >
        <Accordion variant="default" type="single" items={BASIC_ITEMS} />
      </DemoRow>

      {/* ── Flush variant ── */}
      <DemoRow
        label="Flush variant — no outer border or radius"
        code={`<Accordion
  variant="flush"
  type="single"
  items={[
    { id: "flush-1", title: "Flush variant — no outer border", content: "..." },
    { id: "flush-2", title: "When should I use flush?",        content: "..." },
    { id: "flush-3", title: "Can I mix variants?",             content: "..." },
  ]}
/>`}
        fullWidth
      >
        <Accordion variant="flush" type="single" items={FLUSH_ITEMS} />
      </DemoRow>

      {/* ── Multiple type ── */}
      <DemoRow
        label='Multiple type — several items can be open simultaneously'
        code={`<Accordion
  variant="default"
  type="multiple"
  items={[
    { id: "multi-1", title: "Notifications",       content: "..." },
    { id: "multi-2", title: "Privacy & Security",  content: "..." },
    { id: "multi-3", title: "Linked Accounts",     content: "..." },
  ]}
/>`}
        fullWidth
      >
        <Accordion variant="default" type="multiple" items={MULTIPLE_ITEMS} />
      </DemoRow>

      {/* ── With a disabled item ── */}
      <DemoRow
        label="With a disabled item"
        code={`<Accordion
  variant="default"
  type="single"
  items={[
    { id: "a", title: "Available",                content: "This item can be opened." },
    { id: "b", title: "Disabled (not clickable)", content: "...", disabled: true },
    { id: "c", title: "Also available",           content: "This one too." },
  ]}
/>`}
        fullWidth
      >
        <Accordion
          variant="default"
          type="single"
          items={[
            { id: "a", title: "Available",                content: "This item can be opened and its content is shown here." },
            { id: "b", title: "Disabled (not clickable)", content: "You should not be able to open this.", disabled: true },
            { id: "c", title: "Also available",           content: "This one is fully interactive." },
          ]}
        />
      </DemoRow>

    </DemoShell>
  );
}
