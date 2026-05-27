import React, { useState } from "react";
import { Radio, RadioGroup } from "../../src/components/atoms/Radio/Radio";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

export function RadioDemo() {
  const [groupVal, setGroupVal] = useState("option-a");

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: 8 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Radio</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>
        Single-select input. Supports group, sizes xs / sm, states, and error.
      </p>

      <Section title="Group — controlled">
        <RadioGroup value={groupVal} onChange={setGroupVal} style={{ gap: 12 }}>
          <Radio value="option-a" label="Option A" />
          <Radio value="option-b" label="Option B" />
          <Radio value="option-c" label="Option C" />
        </RadioGroup>
        <p style={{ fontSize: 12, color: "#9CA3AF", alignSelf: "center" }}>selected: {groupVal}</p>
      </Section>

      <Section title="Sizes">
        <div>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>xs (16px)</p>
          <RadioGroup defaultValue="xs-b">
            <Radio value="xs-a" label="Label A" size="xs" />
            <Radio value="xs-b" label="Label B" size="xs" />
          </RadioGroup>
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8 }}>sm (20px)</p>
          <RadioGroup defaultValue="sm-a">
            <Radio value="sm-a" label="Label A" size="sm" />
            <Radio value="sm-b" label="Label B" size="sm" />
          </RadioGroup>
        </div>
      </Section>

      <Section title="States">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Radio value="default"   label="Default (unchecked)" />
          <Radio value="checked"   label="Checked"             checked />
          <Radio value="disabled"  label="Disabled unchecked"  disabled />
          <Radio value="dis-chk"   label="Disabled checked"    disabled checked />
        </div>
      </Section>

      <Section title="Error state">
        <RadioGroup error defaultValue="err-a">
          <Radio value="err-a" label="Error — selected" size="xs" />
          <Radio value="err-b" label="Error — unselected" size="xs" />
        </RadioGroup>
      </Section>
    </div>
  );
}
