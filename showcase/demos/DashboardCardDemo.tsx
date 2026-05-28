import React, { useState } from "react";
import { DashboardCard } from "../../src/components/molecules/DashboardCard";
import { DemoShell, DemoRow } from "../DemoShell";

// Figma placeholder description (matches node 760:17352 exactly)
const FIGMA_DESC = "Explanatory text shown in the headline in a single or multiple lines.";

export function DashboardCardDemo() {
  const [toggleSel, setToggleSel] = useState<string | null>(null);
  const [minSel, setMinSel]       = useState<string | null>(null);
  const [headSel, setHeadSel]     = useState<string | null>(null);

  return (
    <DemoShell
      title="DashboardCard"
      description="3 card types from Figma node 760:17352 — Toggle (preview frame + actions), Minimal (compact frame), Headline (stat card). Each with 4 states: Default · Selected · Disabled."
    >

      {/* ── Toggle ── */}
      <DemoRow label="Toggle — Default · Selected · Disabled" code={`// Toggle card — preview frame + action buttons
// type: "toggle" | "minimal" | "headline"
<DashboardCard
  type="toggle"
  headline="Invoices"
  description="Track and manage your invoices."
/>

// Selected state
<DashboardCard type="toggle" headline="Invoices" description="…" selected />

// Interactive (controlled selection)
const [sel, setSel] = useState<string | null>(null);
<DashboardCard
  type="toggle"
  headline="Invoices"
  description="Track and manage your invoices."
  selected={sel === "invoices"}
  onClick={() => setSel(sel === "invoices" ? null : "invoices")}
/>`}>
        {/* Default */}
        <DashboardCard
          type="toggle"
          headline="Title"
          description={FIGMA_DESC}
        />
        {/* Selected */}
        <DashboardCard
          type="toggle"
          headline="Title"
          description={FIGMA_DESC}
          selected
        />
        {/* Disabled */}
        <DashboardCard
          type="toggle"
          headline="Title"
          description={FIGMA_DESC}
          disabled
        />
      </DemoRow>

      {/* ── Toggle interactive ── */}
      <DemoRow label="Toggle — interactive click to select/deselect">
        <DashboardCard
          type="toggle" headline="Invoices" description="Track and manage your invoices."
          selected={toggleSel === "a"} onClick={() => setToggleSel(toggleSel === "a" ? null : "a")}
        />
        <DashboardCard
          type="toggle" headline="Payments" description="View all incoming payments."
          selected={toggleSel === "b"} onClick={() => setToggleSel(toggleSel === "b" ? null : "b")}
        />
        <DashboardCard
          type="toggle" headline="Reports" description="Download monthly summaries."
          selected={toggleSel === "c"} onClick={() => setToggleSel(toggleSel === "c" ? null : "c")}
        />
        <DashboardCard
          type="toggle" headline="Disabled" description="Cannot be selected."
          disabled
        />
      </DemoRow>

      {/* ── Minimal ── */}
      <DemoRow label="Minimal — Default · Selected · Disabled">
        <DashboardCard
          type="minimal"
          headline="Title"
          description={FIGMA_DESC}
        />
        <DashboardCard
          type="minimal"
          headline="Title"
          description={FIGMA_DESC}
          selected
        />
        <DashboardCard
          type="minimal"
          headline="Title"
          description={FIGMA_DESC}
          disabled
        />
      </DemoRow>

      {/* ── Minimal interactive ── */}
      <DemoRow label="Minimal — interactive">
        <DashboardCard
          type="minimal" headline="Customers" description="Manage customer accounts."
          selected={minSel === "a"} onClick={() => setMinSel(minSel === "a" ? null : "a")}
        />
        <DashboardCard
          type="minimal" headline="Products" description="Catalog and pricing."
          selected={minSel === "b"} onClick={() => setMinSel(minSel === "b" ? null : "b")}
        />
        <DashboardCard
          type="minimal" headline="Disabled" description="Not available."
          disabled
        />
      </DemoRow>

      {/* ── Headline (stat cards) ── */}
      <DemoRow label="Headline — Default · Selected · Disabled (Figma row 3)" code={`// Headline card — stat/KPI card with delta indicator
<DashboardCard
  type="headline"
  subtitle="Total Revenue"
  trailText="10K"
  headline="$24,500"
  delta="5%"
  period="vs last week"
  selected={sel === "revenue"}
  onClick={() => setSel(sel === "revenue" ? null : "revenue")}
/>`}>
        <DashboardCard
          type="headline"
          subtitle="Subtitle" trailText="10K"
          headline="Title"
          delta="5%" period="vs last week"
        />
        <DashboardCard
          type="headline"
          subtitle="Subtitle" trailText="10K"
          headline="Title"
          delta="5%" period="vs last week"
          selected
        />
        <DashboardCard
          type="headline"
          subtitle="Subtitle" trailText="10K"
          headline="Title"
          delta="5%" period="vs last week"
          disabled
        />
      </DemoRow>

      {/* ── Headline interactive ── */}
      <DemoRow label="Headline — interactive stat cards">
        <DashboardCard
          type="headline"
          subtitle="Total Revenue" trailText="10K"
          headline="$24,500" delta="5%" period="vs last week"
          selected={headSel === "a"} onClick={() => setHeadSel(headSel === "a" ? null : "a")}
        />
        <DashboardCard
          type="headline"
          subtitle="New Orders" trailText="342"
          headline="1,280" delta="12%" period="vs last month"
          selected={headSel === "b"} onClick={() => setHeadSel(headSel === "b" ? null : "b")}
        />
        <DashboardCard
          type="headline"
          subtitle="Overdue" trailText="8"
          headline="3" delta="-2%" period="vs last week"
          selected={headSel === "c"} onClick={() => setHeadSel(headSel === "c" ? null : "c")}
        />
        <DashboardCard
          type="headline" subtitle="Disabled stat"
          headline="N/A" disabled
        />
      </DemoRow>

    </DemoShell>
  );
}
