import React, { useState } from "react";
import { Tabs, type TabItem } from "../../src/components/atoms/Tabs";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Sample tab sets ──────────────────────────────────────────────────────────

const TABS_4: TabItem[] = [
  { id: "a", label: "Tab", count: 50 },
  { id: "b", label: "Tab", count: 50 },
  { id: "c", label: "Tab", count: 50 },
  { id: "d", label: "Tab", count: 50 },
];

const TABS_10: TabItem[] = Array.from({ length: 10 }, (_, i) => ({
  id:    String(i),
  label: "Tab",
  count: 50,
}));

const TABS_NAMED: TabItem[] = [
  { id: "overview",   label: "Overview",   count: 12  },
  { id: "analytics",  label: "Analytics",  count: 4   },
  { id: "reports",    label: "Reports",    count: 29  },
  { id: "settings",   label: "Settings"              },
];

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function TabsDemo() {
  const [boxTab,  setBoxTab]  = useState("a");
  const [lineTab, setLineTab] = useState("0");
  const [namedTab, setNamedTab] = useState("overview");

  return (
    <DemoShell
      title="Tabs"
      description="Figma node 18578:14130 — two variants: Box (pill container, 4 states) and Line (underline, 10 tabs). Powered by @radix-ui/react-tabs — keyboard ← → navigation, ARIA role=tablist."
    >

      {/* ── Box variant ── */}
      <DemoRow label="Box variant — 4 tabs × all states (hover each)" code={`const [tab, setTab] = useState("overview");

const items = [
  { id: "overview",  label: "Overview",  count: 12 },
  { id: "analytics", label: "Analytics", count: 4  },
  { id: "reports",   label: "Reports",   count: 29 },
  { id: "settings",  label: "Settings"             },
];

<Tabs variant="box" items={items} value={tab} onChange={setTab} />`}>
        <Tabs
          variant="box"
          items={TABS_4}
          value={boxTab}
          onChange={setBoxTab}
        />
      </DemoRow>

      {/* ── Box — named tabs ── */}
      <DemoRow label="Box variant — named tabs">
        <Tabs
          variant="box"
          items={TABS_NAMED}
          value={namedTab}
          onChange={setNamedTab}
        />
      </DemoRow>

      {/* ── Line variant ── */}
      <DemoRow label="Line variant — 10 tabs (matches Figma bottom row)" fullWidth>
        <Tabs
          variant="line"
          items={TABS_10}
          value={lineTab}
          onChange={setLineTab}
        />
      </DemoRow>

      {/* ── Line — named + panels ── */}
      <DemoRow label="Line variant — with tab panels" fullWidth>
        <TabsWithPanels />
      </DemoRow>

      {/* ── Both side by side ── */}
      <DemoRow label="States reference — box (hover over each)">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 8 }}>
              Default (none selected hover)
            </p>
            <Tabs variant="box" items={[
              { id: "x", label: "Tab", count: 50 },
              { id: "y", label: "Tab", count: 50 },
              { id: "z", label: "Tab", count: 50 },
            ]} defaultValue="x" />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 8 }}>
              Disabled items
            </p>
            <Tabs variant="box" items={[
              { id: "p", label: "Tab", count: 50 },
              { id: "q", label: "Tab", count: 50, disabled: true },
              { id: "r", label: "Tab", count: 50 },
            ]} defaultValue="p" />
          </div>
        </div>
      </DemoRow>

    </DemoShell>
  );
}

// ─── Tabs with content panels ─────────────────────────────────────────────────

function TabsWithPanels() {
  const [active, setActive] = useState("overview");
  const panels: Record<string, React.ReactNode> = {
    overview: <PanelContent title="Overview" text="Summary of your account activity and key metrics." />,
    analytics:<PanelContent title="Analytics" text="Detailed usage trends, retention and funnel data." />,
    reports:  <PanelContent title="Reports" text="Generated reports ready to download or share." />,
    settings: <PanelContent title="Settings" text="Manage preferences, permissions and integrations." />,
  };
  return (
    <Tabs
      variant="line"
      items={TABS_NAMED}
      value={active}
      onChange={setActive}
      panels={panels}
    />
  );
}

function PanelContent({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ padding: "20px 4px" }}>
      <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 600,
        color: "#111827", marginBottom: 6 }}>
        {title}
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", lineHeight: "20px" }}>
        {text}
      </p>
    </div>
  );
}
