import React, { useState } from "react";
import { ButtonSegment } from "../../src/components/atoms/ButtonSegment";
import { DemoShell, DemoRow } from "../DemoShell";

const TABS = [
  { key: "all",     label: "All" },
  { key: "active",  label: "Active" },
  { key: "draft",   label: "Draft" },
  { key: "closed",  label: "Closed" },
];

const MONTHS = [
  { key: "jan", label: "Jan" },
  { key: "feb", label: "Feb" },
  { key: "mar", label: "Mar" },
];

export function ButtonSegmentDemo() {
  const [active, setActive]  = useState("all");
  const [month, setMonth]    = useState("jan");

  return (
    <DemoShell
      title="ButtonSegment"
      description="Pill-style tab group. Active segment gets a white background and shadow."
    >
      <DemoRow label="4 segments" code={`const [active, setActive] = useState("all");

const segments = [
  { key: "all",    label: "All"    },
  { key: "active", label: "Active" },
  { key: "draft",  label: "Draft"  },
  { key: "closed", label: "Closed" },
];

<ButtonSegment segments={segments} activeKey={active} onChange={setActive} />`}>
        <ButtonSegment segments={TABS} activeKey={active} onChange={setActive} />
      </DemoRow>
      <DemoRow label="3 segments">
        <ButtonSegment segments={MONTHS} activeKey={month} onChange={setMonth} />
      </DemoRow>
      <DemoRow label="Disabled" code={`<ButtonSegment segments={segments} activeKey="all" disabled />`}>
        <ButtonSegment segments={TABS} activeKey="all" disabled />
      </DemoRow>
    </DemoShell>
  );
}
