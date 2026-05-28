import React, { useState } from "react";
import { FormField } from "../../src/components/atoms/FormField";
import { DemoShell, DemoRow } from "../DemoShell";

// Helper — show a grid of state variants for one field type
function StateGrid({
  label, children, code,
}: { label: string; children: React.ReactNode; code?: string }) {
  return (
    <DemoRow label={label} fullWidth code={code}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px 16px",
        width: "100%",
      }}>
        {children}
      </div>
    </DemoRow>
  );
}

export function FormFieldDemo() {
  const [textVal,    setTextVal]    = useState("");
  const [numVal,     setNumVal]     = useState("");
  const [comboLText, setComboLText] = useState("");
  const [comboLSel,  setComboLSel]  = useState("");
  const [comboRText, setComboRText] = useState("");
  const [comboRSel,  setComboRSel]  = useState("");
  const [area,       setArea]       = useState("");

  return (
    <DemoShell
      title="FormField"
      description="5 input types × 5 states from Figma node 215:423 — text, numeric, comboLeft, comboRight, textarea. Each with default · focus · error · success · disabled."
    >

      {/* ── Text ── */}
      <StateGrid label="text — all states" code={`// Controlled text input
const [val, setVal] = useState("");

<FormField
  label="Invoice reference"
  required
  type="text"
  placeholder="e.g. INV-0042"
  value={val}
  onChange={setVal}
/>

// Error state
<FormField label="Email" type="text" value={val} onChange={setVal} error />

// Success state
<FormField label="Email" type="text" value={val} onChange={setVal} success />

// With clear button + tag count
<FormField label="Tags" type="text" value={val} onChange={setVal}
  tags={["React"]} additionalTagCount={3} onClear={() => setVal("")} />

// Disabled
<FormField label="Read-only" type="text" placeholder="…" disabled />`}>
        <FormField label="Label" required type="text"
          placeholder="Placeholder" />

        <FormField label="Label" required type="text"
          placeholder="Placeholder" value="Placeholder|"
          onChange={() => {}} />

        <FormField label="Label" required type="text"
          placeholder="Placeholder" value="Placeholder|"
          error onChange={() => {}} />

        <FormField label="Label" required type="text"
          placeholder="Placeholder" value="Placeholder|"
          success onChange={() => {}} />

        <FormField label="Label" required type="text"
          placeholder="Placeholder"
          value="Placeholder"
          tags={[]} additionalTagCount={1}
          onClear={() => {}} onChange={() => {}} />

        <FormField label="Label" required type="text"
          placeholder="Placeholder" disabled />
      </StateGrid>

      {/* ── Numeric ── */}
      <StateGrid label="numeric — all states" code={`// Numeric field — right-aligns value, shows currency-style formatting
<FormField label="Amount" required type="numeric" placeholder="0.00"
  value={val} onChange={setVal} />`}>
        <FormField label="Label" required type="numeric"
          placeholder="0.00" />

        <FormField label="Label" required type="numeric"
          placeholder="0.00" value="0.00"
          onChange={() => {}} />

        <FormField label="Label" required type="numeric"
          placeholder="0.00" value="0.00"
          error onChange={() => {}} />

        <FormField label="Label" required type="numeric"
          placeholder="0.00" value="0.00"
          success onChange={() => {}} />

        <FormField label="Label" required type="numeric"
          placeholder="0.00" />

        <FormField label="Label" required type="numeric"
          placeholder="0.00" disabled />
      </StateGrid>

      {/* ── ComboLeft ── */}
      <StateGrid label="comboLeft (Select | Text) — all states" code={`// comboLeft: dropdown selector on the left, text input on the right
<FormField
  label="Phone"
  type="comboLeft"
  placeholder="Enter number"
  selectValue={countryCode}
  onSelectClick={() => openCountryPicker()}
  value={phone}
  onChange={setPhone}
/>`}>
        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" />

        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" value="Placeholder|"
          onChange={() => {}} />

        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" value="Placeholder|"
          error onChange={() => {}} />

        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" value="Placeholder|"
          success onChange={() => {}} />

        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" />

        <FormField label="Label" required type="comboLeft"
          placeholder="Placeholder" disabled />
      </StateGrid>

      {/* ── ComboRight ── */}
      <StateGrid label="comboRight (Text | Select) — all states" code={`// comboRight: text input on the left, dropdown selector on the right
<FormField
  label="Amount"
  type="comboRight"
  placeholder="0.00"
  value={amount}
  onChange={setAmount}
  selectValue={currency}
  onSelectClick={() => openCurrencyPicker()}
/>`}>
        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" />

        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" value="Placeholder|"
          onChange={() => {}} />

        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" value="Placeholder|"
          error onChange={() => {}} />

        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" value="Placeholder|"
          success onChange={() => {}} />

        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" />

        <FormField label="Label" required type="comboRight"
          placeholder="Placeholder" disabled />
      </StateGrid>

      {/* ── Textarea ── */}
      <StateGrid label="textarea — all states" code={`// Multi-line textarea
<FormField
  label="Remarks"
  required
  type="textarea"
  placeholder="Add notes…"
  value={notes}
  onChange={setNotes}
/>`}>
        <FormField label="Remarks" required type="textarea"
          placeholder="Placeholder" />

        <FormField label="Remarks" required type="textarea"
          placeholder="Placeholder" value="Placeholder|"
          onChange={() => {}} />

        <FormField label="Remarks" required type="textarea"
          placeholder="Placeholder" />

        <FormField label="Remarks" required type="textarea"
          placeholder="Placeholder" disabled />
      </StateGrid>

      {/* ── Interactive ── */}
      <DemoRow label="Interactive — controlled fields">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px 16px",
          width: "100%",
        }}>
          <FormField label="Text" required type="text"
            placeholder="Type something…"
            value={textVal} onChange={setTextVal}
            onClear={() => setTextVal("")}
            error={textVal.length > 0 && textVal.length < 3}
            success={textVal.length >= 3}
          />

          <FormField label="Amount" required type="numeric"
            placeholder="0.00"
            value={numVal} onChange={setNumVal}
          />

          <FormField label="Combo Left" required type="comboLeft"
            placeholder="Type here…"
            value={comboLText} onChange={setComboLText}
            selectValue={comboLSel} onSelectChange={setComboLSel}
          />

          <FormField label="Combo Right" required type="comboRight"
            placeholder="Type here…"
            value={comboRText} onChange={setComboRText}
            selectValue={comboRSel} onSelectChange={setComboRSel}
          />

          <FormField label="Remarks" required type="textarea"
            placeholder="Add a note…"
            value={area} onChange={setArea}
          />
        </div>
      </DemoRow>

    </DemoShell>
  );
}
