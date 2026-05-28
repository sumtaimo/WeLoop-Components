import React, { useState } from "react";
import { Radio, RadioGroup } from "../../src/components/atoms/Radio/Radio";
import { DemoShell, DemoRow } from "../DemoShell";

export function RadioDemo() {
  const [groupVal, setGroupVal] = useState("option-a");

  return (
    <DemoShell
      title="Radio"
      description="Single-select input. Supports group, sizes xs / sm, states, and error."
      category="atom"
      importCode={`import { Radio, RadioGroup } from 'weloop-components';`}
    >
      <DemoRow label="Group — controlled" code={`const [value, setValue] = useState("option-a");

<RadioGroup value={value} onChange={setValue}>
  <Radio value="option-a" label="Option A" />
  <Radio value="option-b" label="Option B" />
  <Radio value="option-c" label="Option C" />
</RadioGroup>`}>
        <RadioGroup value={groupVal} onChange={setGroupVal} style={{ gap: 12 }}>
          <Radio value="option-a" label="Option A" />
          <Radio value="option-b" label="Option B" />
          <Radio value="option-c" label="Option C" />
        </RadioGroup>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", margin: 0 }}>
          selected: {groupVal}
        </p>
      </DemoRow>

      <DemoRow label="Sizes" code={`// xs — 16px (default)
<Radio value="a" label="Label A" size="xs" />

// sm — 20px
<Radio value="a" label="Label A" size="sm" />`}>
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>xs (16px)</p>
          <RadioGroup defaultValue="xs-b">
            <Radio value="xs-a" label="Label A" size="xs" />
            <Radio value="xs-b" label="Label B" size="xs" />
          </RadioGroup>
        </div>
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>sm (20px)</p>
          <RadioGroup defaultValue="sm-a">
            <Radio value="sm-a" label="Label A" size="sm" />
            <Radio value="sm-b" label="Label B" size="sm" />
          </RadioGroup>
        </div>
      </DemoRow>

      <DemoRow label="States" code={`<Radio value="default"  label="Default (unchecked)" />
<Radio value="checked"  label="Checked"             checked />
<Radio value="disabled" label="Disabled"             disabled />
<Radio value="dis-chk"  label="Disabled checked"     disabled checked />`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Radio value="default"  label="Default (unchecked)" />
          <Radio value="checked"  label="Checked"             checked />
          <Radio value="disabled" label="Disabled unchecked"  disabled />
          <Radio value="dis-chk"  label="Disabled checked"    disabled checked />
        </div>
      </DemoRow>

      <DemoRow label="Error state" code={`// Wrap in RadioGroup with error prop — all children show error styling
<RadioGroup error defaultValue="err-a">
  <Radio value="err-a" label="Selected option"   size="xs" />
  <Radio value="err-b" label="Unselected option" size="xs" />
</RadioGroup>`}>
        <RadioGroup error defaultValue="err-a">
          <Radio value="err-a" label="Error — selected"   size="xs" />
          <Radio value="err-b" label="Error — unselected" size="xs" />
        </RadioGroup>
      </DemoRow>
    </DemoShell>
  );
}
