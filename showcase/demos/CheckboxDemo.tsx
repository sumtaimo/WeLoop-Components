import React, { useState } from "react";
import { Checkbox } from "../../src/components/atoms/Checkbox";
import { DemoShell, DemoRow } from "../DemoShell";

export function CheckboxDemo() {
  const [sm,  setSm]  = useState(false);
  const [lg,  setLg]  = useState(false);
  const [grp, setGrp] = useState<boolean[]>([true, false, true]);

  // Derive group parent state
  const allChecked  = grp.every(Boolean);
  const noneChecked = grp.every(v => !v);
  const parentIndeterminate = !allChecked && !noneChecked;
  const parentChecked       = allChecked;

  function toggleGroup(i: number, val: boolean) {
    const next = [...grp];
    next[i] = val;
    setGrp(next);
  }
  function toggleAll(val: boolean) {
    setGrp([val, val, val]);
  }

  return (
    <DemoShell
      title="Checkbox"
      description="2 sizes × 5 states × disabled — from Figma node 215:412. Inline label, indeterminate parent, and controlled group examples."
    >

      {/* ── sm — all states ── */}
      <DemoRow label="sm (16 px) — all states">
        <Checkbox size="sm" label="Default"       />
        <Checkbox size="sm" label="Checked"        checked />
        <Checkbox size="sm" label="Indeterminate"  indeterminate />
        <Checkbox size="sm" label="Dis. unchecked" disabled />
        <Checkbox size="sm" label="Dis. checked"   disabled checked />
        <Checkbox size="sm" label="Dis. indet."    disabled indeterminate />
      </DemoRow>

      {/* ── lg — all states ── */}
      <DemoRow label="lg (20 px) — all states">
        <Checkbox size="lg" label="Default"       />
        <Checkbox size="lg" label="Checked"        checked />
        <Checkbox size="lg" label="Indeterminate"  indeterminate />
        <Checkbox size="lg" label="Dis. unchecked" disabled />
        <Checkbox size="lg" label="Dis. checked"   disabled checked />
        <Checkbox size="lg" label="Dis. indet."    disabled indeterminate />
      </DemoRow>

      {/* ── Interactive sm ── */}
      <DemoRow label="sm — interactive toggle">
        <Checkbox
          size="sm"
          label={sm ? "Checked" : "Unchecked"}
          checked={sm}
          onChange={setSm}
        />
      </DemoRow>

      {/* ── Interactive lg ── */}
      <DemoRow label="lg — interactive toggle">
        <Checkbox
          size="lg"
          label={lg ? "Checked" : "Unchecked"}
          checked={lg}
          onChange={setLg}
        />
      </DemoRow>

      {/* ── Indeterminate parent / group ── */}
      <DemoRow label="Indeterminate parent controlling a group">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Parent */}
          <Checkbox
            size="lg"
            label="Select all"
            checked={parentChecked}
            indeterminate={parentIndeterminate}
            onChange={toggleAll}
          />
          {/* Children — indented */}
          <div style={{ paddingLeft: 28, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Invoices", "Payments", "Reports"].map((item, i) => (
              <Checkbox
                key={item}
                size="lg"
                label={item}
                checked={grp[i]}
                onChange={val => toggleGroup(i, val)}
              />
            ))}
          </div>
        </div>
      </DemoRow>

      {/* ── No label ── */}
      <DemoRow label="Without label (icon only)">
        <Checkbox size="sm" />
        <Checkbox size="sm" checked />
        <Checkbox size="sm" indeterminate />
        <Checkbox size="sm" disabled />
        <Checkbox size="lg" />
        <Checkbox size="lg" checked />
        <Checkbox size="lg" indeterminate />
        <Checkbox size="lg" disabled />
      </DemoRow>

    </DemoShell>
  );
}
