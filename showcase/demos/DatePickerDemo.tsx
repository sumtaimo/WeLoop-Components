import React, { useState } from "react";
import { DatePicker, DateRangePicker, DateInput } from "../../src/components/molecules/DatePicker/DatePicker";
import type { DateRange } from "../../src/components/molecules/DatePicker/DatePicker";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        {children}
      </div>
    </div>
  );
}

function fmt(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function DatePickerDemo() {
  const [single, setSingle]     = useState<Date | null>(null);
  const [range,  setRange]      = useState<DateRange>({ start: null, end: null });

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: 8 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4 }}>DatePicker</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32 }}>
        Single date and date-range pickers. The field opens a calendar popover; DateRangePicker includes 14 preset chips and dual calendars.
      </p>

      <Section title="DateInput — field only">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <DateInput variant="date"     label="Date"     required placeholder="DD / MM / YYYY" />
          <DateInput variant="due-date" label="Due Date" placeholder="DD / MM / YYYY" />
          <DateInput variant="date"     label="Disabled" disabled placeholder="DD / MM / YYYY" />
        </div>
      </Section>

      <Section title="DatePicker — single">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DatePicker
            label="Select date"
            placeholder="DD / MM / YYYY"
            value={single}
            onChange={setSingle}
          />
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>selected: {fmt(single)}</p>
        </div>
      </Section>

      <Section title="DateRangePicker">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <DateRangePicker
            value={range}
            onChange={setRange}
            onSave={r => setRange(r)}
            onClear={() => setRange({ start: null, end: null })}
          />
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>
            {fmt(range.start)} → {fmt(range.end)}
          </p>
        </div>
      </Section>
    </div>
  );
}
