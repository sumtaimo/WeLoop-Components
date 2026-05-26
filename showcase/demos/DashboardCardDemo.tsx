import React, { useState } from "react";
import { DashboardCard } from "../../src/components/molecules/DashboardCard";
import { DemoShell, DemoRow } from "../DemoShell";

export function DashboardCardDemo() {
  const [toggleSel, setToggleSel] = useState<string | null>(null);
  const [minSel, setMinSel]       = useState<string | null>(null);
  const [headSel, setHeadSel]     = useState<string | null>(null);

  return (
    <DemoShell
      title="DashboardCard"
      description="3 dashboard card types from the Figma Cards page: Toggle (preview thumbnail + actions), Minimal (compact thumbnail), and Headline (stat card)."
    >
      {/* ── Toggle ── */}
      <DemoRow label="Toggle — Default / Selected / Disabled">
        <DashboardCard
          type="toggle" headline="Invoices" description="Track and manage your invoices."
          selected={toggleSel === "a"} onClick={() => setToggleSel(toggleSel === "a" ? null : "a")}
        />
        <DashboardCard
          type="toggle" headline="Payments" description="View all incoming payments."
          selected={toggleSel === "b"} onClick={() => setToggleSel(toggleSel === "b" ? null : "b")}
        />
        <DashboardCard
          type="toggle" headline="Disabled card" description="This card cannot be selected."
          disabled
        />
      </DemoRow>

      {/* ── Minimal ── */}
      <DemoRow label="Minimal — Default / Selected / Disabled">
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
      <DemoRow label="Headline — Stat cards">
        <DashboardCard
          type="headline"
          subtitle="Total Revenue" trailText="10K"
          headline="$24,500" delta="↑5%" period="vs last week"
          selected={headSel === "a"} onClick={() => setHeadSel(headSel === "a" ? null : "a")}
        />
        <DashboardCard
          type="headline"
          subtitle="New Orders" trailText="342"
          headline="1,280" delta="↑12%" period="vs last month"
          selected={headSel === "b"} onClick={() => setHeadSel(headSel === "b" ? null : "b")}
        />
        <DashboardCard
          type="headline"
          subtitle="Pending" trailText="48"
          headline="7" delta="↓3%" period="vs last week"
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
