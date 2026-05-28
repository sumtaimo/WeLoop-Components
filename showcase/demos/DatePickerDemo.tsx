import React, { useState } from "react";
import { DatePicker, DateRangePicker, DateInput } from "../../src/components/molecules/DatePicker/DatePicker";
import type { DateRange } from "../../src/components/molecules/DatePicker/DatePicker";
import { DemoShell, DemoRow } from "../DemoShell";

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function DatePickerDemo() {
  const [single, setSingle] = useState<Date | null>(null);
  const [range,  setRange]  = useState<DateRange>({ start: null, end: null });

  return (
    <DemoShell
      title="DatePicker"
      description="Single date and date-range pickers. The field opens a calendar popover; DateRangePicker includes 14 preset chips and dual calendars."
      category="molecule"
      importCode={`import { DatePicker, DateRangePicker, DateInput } from 'weloop-components';`}
    >
      <DemoRow label="DateInput — field only" code={`// DateInput — just the field, no calendar popover
// variant: "date" | "due-date"
<DateInput
  variant="date"
  label="Invoice Date"
  required
  placeholder="DD / MM / YYYY"
/>

<DateInput
  variant="due-date"
  label="Due Date"
  placeholder="DD / MM / YYYY"
/>

// Disabled
<DateInput variant="date" label="Posted" disabled placeholder="DD / MM / YYYY" />`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <DateInput variant="date"     label="Date"     required placeholder="DD / MM / YYYY" />
          <DateInput variant="due-date" label="Due Date" placeholder="DD / MM / YYYY" />
          <DateInput variant="date"     label="Disabled" disabled placeholder="DD / MM / YYYY" />
        </div>
      </DemoRow>

      <DemoRow label="DatePicker — single" code={`// DatePicker — field + calendar popover, single date
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  label="Select date"
  placeholder="DD / MM / YYYY"
  value={date}
  onChange={setDate}
/>`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DatePicker
            label="Select date"
            placeholder="DD / MM / YYYY"
            value={single}
            onChange={setSingle}
          />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", margin: 0 }}>
            selected: {fmt(single)}
          </p>
        </div>
      </DemoRow>

      <DemoRow label="DateRangePicker" code={`// DateRangePicker — dual calendar + 14 preset chips (Today, Last 7 days…)
const [range, setRange] = useState<DateRange>({ start: null, end: null });

<DateRangePicker
  value={range}
  onChange={setRange}
  onSave={r => setRange(r)}
  onClear={() => setRange({ start: null, end: null })}
/>`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DateRangePicker
            value={range}
            onChange={setRange}
            onSave={r => setRange(r)}
            onClear={() => setRange({ start: null, end: null })}
          />
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", margin: 0 }}>
            {fmt(range.start)} → {fmt(range.end)}
          </p>
        </div>
      </DemoRow>
    </DemoShell>
  );
}
