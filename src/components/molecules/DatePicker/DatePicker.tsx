import React, { useState, useRef, useEffect, useCallback } from "react";
import * as RadixPopover from "@radix-ui/react-popover";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DateInputVariant = "date" | "due-date";

export interface DateInputProps {
  value?:         Date | null;
  onChange?:      (date: Date | null) => void;
  placeholder?:   string;
  disabled?:      boolean;
  required?:      boolean;
  label?:         string;
  variant?:       DateInputVariant;
  /** "due-date" variant: left dropdown options (e.g. ["7 Days", "30 Days", "60 Days"]) */
  durationOptions?: string[];
  durationValue?:   string;
  onDurationChange?:(v: string) => void;
  style?:         React.CSSProperties;
}

export interface DatePickerProps {
  value?:         Date | null;
  defaultValue?:  Date | null;
  onChange?:      (date: Date | null) => void;
  disabled?:      boolean;
  required?:      boolean;
  label?:         string;
  placeholder?:   string;
  minDate?:       Date;
  maxDate?:       Date;
  style?:         React.CSSProperties;
}

export type PresetId =
  | "today" | "yesterday" | "this-week" | "last-week"
  | "this-month" | "last-month" | "last-3-months"
  | "1st-half" | "2nd-half" | "q1" | "q2" | "q3" | "q4" | "custom";

export interface DateRange {
  start: Date | null;
  end:   Date | null;
}

export interface DateRangePickerProps {
  value?:         DateRange;
  defaultValue?:  DateRange;
  onChange?:      (range: DateRange) => void;
  onSave?:        (range: DateRange) => void;
  onClear?:       () => void;
  minDate?:       Date;
  maxDate?:       Date;
  style?:         React.CSSProperties;
}

// ─── Date utilities ───────────────────────────────────────────────────────────

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_HEADS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function formatDate(d: Date | null): string {
  if (!d) return "";
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function sameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toMidnight(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function startOf(unit: "week" | "month" | "year", d: Date): Date {
  const r = toMidnight(d);
  if (unit === "week")  { r.setDate(r.getDate() - r.getDay()); return r; }
  if (unit === "month") { r.setDate(1); return r; }
  r.setMonth(0); r.setDate(1); return r;
}

function endOf(unit: "week" | "month" | "year", d: Date): Date {
  if (unit === "week")  return addDays(startOf("week", d), 6);
  if (unit === "month") { const r = new Date(d.getFullYear(), d.getMonth() + 1, 0); return r; }
  return new Date(d.getFullYear(), 11, 31);
}

function resolvePreset(id: PresetId): DateRange {
  const today = toMidnight(new Date());
  const yr = today.getFullYear();
  switch (id) {
    case "today":        return { start: today, end: today };
    case "yesterday":    { const y = addDays(today, -1); return { start: y, end: y }; }
    case "this-week":    return { start: startOf("week", today), end: endOf("week", today) };
    case "last-week":    { const lw = addDays(today, -7); return { start: startOf("week", lw), end: endOf("week", lw) }; }
    case "this-month":   return { start: startOf("month", today), end: endOf("month", today) };
    case "last-month":   { const lm = new Date(yr, today.getMonth() - 1, 1); return { start: lm, end: endOf("month", lm) }; }
    case "last-3-months":{ const s = new Date(yr, today.getMonth() - 3, 1); return { start: s, end: endOf("month", today) }; }
    case "1st-half":     return { start: new Date(yr, 0, 1), end: new Date(yr, 5, 30) };
    case "2nd-half":     return { start: new Date(yr, 6, 1), end: new Date(yr, 11, 31) };
    case "q1":           return { start: new Date(yr, 0, 1),  end: new Date(yr, 2, 31) };
    case "q2":           return { start: new Date(yr, 3, 1),  end: new Date(yr, 5, 30) };
    case "q3":           return { start: new Date(yr, 6, 1),  end: new Date(yr, 8, 30) };
    case "q4":           return { start: new Date(yr, 9, 1),  end: new Date(yr, 11, 31) };
    default:             return { start: null, end: null };
  }
}

function buildCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay  = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysCount; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ─── CalendarGrid ─────────────────────────────────────────────────────────────

interface CalendarGridProps {
  year:        number;
  month:       number;
  onYearChange: (y: number) => void;
  onMonthChange:(m: number) => void;
  selected?:   Date | null;
  rangeStart?: Date | null;
  rangeEnd?:   Date | null;
  hoverDate?:  Date | null;
  onSelect?:   (d: Date) => void;
  onHover?:    (d: Date | null) => void;
  minDate?:    Date;
  maxDate?:    Date;
  disableNav?: "prev" | "next" | "both" | "none";
}

function CalendarGrid({
  year, month, onYearChange, onMonthChange,
  selected, rangeStart, rangeEnd, hoverDate,
  onSelect, onHover, minDate, maxDate, disableNav = "none",
}: CalendarGridProps) {
  const cells = buildCalendarDays(year, month);
  const today = toMidnight(new Date());
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);

  const isInRange = (d: Date) => {
    const start = rangeStart;
    const end   = rangeEnd ?? hoverDate;
    if (!start || !end) return false;
    const lo = start <= end ? start : end;
    const hi = start <= end ? end   : start;
    return d > lo && d < hi;
  };

  const isRangeEdge = (d: Date, edge: "start" | "end") => {
    const start = rangeStart;
    const end   = rangeEnd ?? hoverDate;
    if (!start) return false;
    const lo = start <= (end ?? start) ? start : (end ?? start);
    const hi = start <= (end ?? start) ? (end ?? start) : start;
    if (edge === "start") return sameDay(d, lo);
    return sameDay(d, hi);
  };

  const prevMonth = () => {
    if (month === 0) { onMonthChange(11); onYearChange(year - 1); }
    else onMonthChange(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { onMonthChange(0); onYearChange(year + 1); }
    else onMonthChange(month + 1);
  };

  return (
    <div style={{ width: 280, fontFamily: "Inter, sans-serif", userSelect: "none" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12, padding: "0 4px" }}>
        {/* Month select */}
        <div style={{ position: "relative", flex: 1 }}>
          <select
            value={month}
            onChange={e => onMonthChange(Number(e.target.value))}
            style={{
              appearance: "none", border: "none", background: "transparent",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#111827",
              cursor: "pointer", paddingRight: 14, outline: "none", width: "100%",
            }}
          >
            {MONTH_NAMES.map((n, i) => <option key={n} value={i}>{n}</option>)}
          </select>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
            style={{ position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Year select */}
        <div style={{ position: "relative" }}>
          <select
            value={year}
            onChange={e => onYearChange(Number(e.target.value))}
            style={{
              appearance: "none", border: "none", background: "transparent",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#111827",
              cursor: "pointer", paddingRight: 14, outline: "none",
            }}
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
            style={{ position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div style={{ flex: 1 }} />

        {/* Prev */}
        <NavArrowBtn onClick={prevMonth} dir="prev" disabled={disableNav === "prev" || disableNav === "both"} />
        {/* Next */}
        <NavArrowBtn onClick={nextMonth} dir="next" disabled={disableNav === "next" || disableNav === "both"} />
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 40px)", gap: 0 }}>
        {DAY_HEADS.map(h => (
          <div key={h} style={{
            textAlign: "center", fontSize: 11, fontWeight: 600, color: "#9CA3AF",
            height: 32, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {h}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;

          const isToday     = sameDay(d, today);
          const isSel       = sameDay(d, selected ?? null);
          const isStart     = isRangeEdge(d, "start");
          const isEnd       = isRangeEdge(d, "end");
          const inRange     = isInRange(d);
          const isEdge      = isStart || isEnd;
          const isDisabled  = (minDate && d < minDate) || (maxDate && d > maxDate) || false;
          const isHov       = sameDay(d, hoverDate ?? null);

          let bg        = "transparent";
          let color     = "#374151";
          let fontWeight: number = 400;
          let border    = "none";
          let innerBg   = "transparent";
          let radius    = 8;

          if (isDisabled) {
            color = "#D1D5DB";
          } else if (isEdge || isSel) {
            innerBg   = "var(--color-bg-brand-primary, #1D32FF)";
            color     = "#FFFFFF";
            fontWeight = 600;
            radius    = 999;
          } else if (inRange) {
            bg    = "var(--color-bg-brand-contrast, #EEF1FF)";
            color = "var(--color-text-brand, #1D32FF)";
          } else if (isToday) {
            border = "1.5px solid var(--color-border-brand, #1D32FF)";
            color  = "var(--color-text-brand, #1D32FF)";
            fontWeight = 600;
            radius = 999;
          } else if (isHov) {
            innerBg = "#F3F4F6";
            radius  = 8;
          }

          return (
            <div
              key={i}
              onClick={() => !isDisabled && onSelect?.(toMidnight(d))}
              onMouseEnter={() => !isDisabled && onHover?.(d)}
              onMouseLeave={() => onHover?.(null)}
              style={{
                height:          40,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                cursor:          isDisabled ? "not-allowed" : "pointer",
                background:      bg,
              }}
            >
              <div style={{
                width:           32,
                height:          32,
                borderRadius:    radius,
                border,
                background:      innerBg,
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        13,
                fontWeight,
                color,
                transition:      "background 0.1s",
              }}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavArrowBtn({ onClick, dir, disabled }: { onClick: () => void; dir: "prev" | "next"; disabled?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Previous month" : "Next month"}
      style={{
        width: 28, height: 28, borderRadius: 6, border: "none",
        background: hov && !disabled ? "#F3F4F6" : "transparent",
        color: disabled ? "#D1D5DB" : "#374151",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {dir === "prev"
          ? <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

// ─── DateInput field ──────────────────────────────────────────────────────────

export function DateInput({
  value,
  onChange,
  placeholder   = "DD MMM YYYY",
  disabled      = false,
  required      = false,
  label,
  variant       = "date",
  durationOptions = ["7 Days", "14 Days", "30 Days", "60 Days", "90 Days"],
  durationValue,
  onDurationChange,
  style,
}: DateInputProps) {
  const [hov, setHov] = useState(false);
  const [focused, setFocused] = useState(false);

  let border = "1px solid #E5E7EB";
  let boxShadow: string | undefined;
  if (disabled) { border = "1px solid #E5E7EB"; }
  else if (focused) { border = "1px solid var(--color-border-brand, #1D32FF)"; boxShadow = "var(--shadow-input-brand, 0 0 0 3px rgba(29,50,255,0.10))"; }
  else if (hov) { border = "1px solid #D1D5DB"; }

  const displayVal = value ? formatDate(value) : "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: disabled ? "#A3A3A3" : "#374151" }}>
            {label}
          </span>
          {required && <span style={{ color: "#EF4444", fontSize: 13 }}>*</span>}
        </div>
      )}

      <div
        style={{
          display: "inline-flex", alignItems: "center", height: 32,
          borderRadius: 8, border, boxShadow, background: disabled ? "#F9FAFB" : "#FFFFFF",
          transition: "border 0.12s, box-shadow 0.12s", overflow: "hidden",
        }}
        onMouseEnter={() => !disabled && setHov(true)}
        onMouseLeave={() => setHov(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {/* Due-date: left duration dropdown */}
        {variant === "due-date" && (
          <>
            <select
              disabled={disabled}
              value={durationValue ?? durationOptions[0]}
              onChange={e => onDurationChange?.(e.target.value)}
              style={{
                height: "100%", padding: "0 8px", border: "none", borderRight: "1px solid #E5E7EB",
                background: disabled ? "#F9FAFB" : "#F9FAFB",
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                color: disabled ? "#9CA3AF" : "#374151", cursor: disabled ? "not-allowed" : "pointer",
                outline: "none", appearance: "none", paddingRight: 20, minWidth: 60,
              }}
            >
              {durationOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
              style={{ marginLeft: -18, marginRight: 8, flexShrink: 0, pointerEvents: "none", color: "#6B7280" }}>
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}

        {/* Date value */}
        <button
          onClick={() => !disabled && onChange?.(value ?? null)}
          disabled={disabled}
          style={{
            flex: 1, height: "100%", padding: "0 10px", border: "none",
            background: "transparent", textAlign: "left",
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400,
            color: disabled ? "#9CA3AF" : displayVal ? "#111827" : "#9CA3AF",
            cursor: disabled ? "not-allowed" : "pointer", outline: "none",
            whiteSpace: "nowrap",
          }}
        >
          {displayVal || placeholder}
        </button>

        {/* Calendar icon */}
        <div style={{ padding: "0 8px", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <rect x="1" y="2" width="12" height="11" rx="2" stroke={disabled ? "#D1D5DB" : "#9CA3AF"} strokeWidth="1.2"/>
            <line x1="1" y1="5.5" x2="13" y2="5.5" stroke={disabled ? "#D1D5DB" : "#9CA3AF"} strokeWidth="1.2"/>
            <line x1="4" y1="1" x2="4" y2="4" stroke={disabled ? "#D1D5DB" : "#9CA3AF"} strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="10" y1="1" x2="10" y2="4" stroke={disabled ? "#D1D5DB" : "#9CA3AF"} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── DatePicker (single) ──────────────────────────────────────────────────────

export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  disabled = false,
  required = false,
  label,
  placeholder,
  minDate,
  maxDate,
  style,
}: DatePickerProps) {
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const selected = value ?? internal;

  const now = new Date();
  const [calYear,  setCalYear]  = useState(selected?.getFullYear() ?? now.getFullYear());
  const [calMonth, setCalMonth] = useState(selected?.getMonth()    ?? now.getMonth());
  const [open, setOpen] = useState(false);

  const handleSelect = (d: Date) => {
    setInternal(d);
    onChange?.(d);
    setOpen(false);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={v => !disabled && setOpen(v)}>
      <RadixPopover.Trigger asChild>
        <div style={style}>
          <DateInput
            value={selected}
            label={label}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side="bottom" align="start" sideOffset={6}
          style={{
            background: "#FFFFFF", border: "1px solid #E5E7EB",
            borderRadius: 12, padding: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            zIndex: 9990, outline: "none",
          }}
        >
          <CalendarGrid
            year={calYear} month={calMonth}
            onYearChange={setCalYear} onMonthChange={setCalMonth}
            selected={selected}
            onSelect={handleSelect}
            minDate={minDate} maxDate={maxDate}
          />
          <RadixPopover.Arrow style={{ fill: "#FFFFFF" }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

// ─── Date range presets ───────────────────────────────────────────────────────

const PRESETS: { id: PresetId; label: string }[] = [
  { id: "today",         label: "Today" },
  { id: "yesterday",     label: "Yesterday" },
  { id: "this-week",     label: "This week" },
  { id: "last-week",     label: "Last week" },
  { id: "this-month",    label: "This month" },
  { id: "last-month",    label: "Last month" },
  { id: "last-3-months", label: "Last 3 months" },
  { id: "1st-half",      label: "1st half" },
  { id: "2nd-half",      label: "2nd half" },
  { id: "q1",            label: "Q1" },
  { id: "q2",            label: "Q2" },
  { id: "q3",            label: "Q3" },
  { id: "q4",            label: "Q4" },
  { id: "custom",        label: "Custom" },
];

// ─── DateRangePicker ──────────────────────────────────────────────────────────

export function DateRangePicker({
  value,
  defaultValue = { start: null, end: null },
  onChange,
  onSave,
  onClear,
  minDate,
  maxDate,
  style,
}: DateRangePickerProps) {
  const [internal, setInternal] = useState<DateRange>(defaultValue);
  const range = value ?? internal;

  const now = new Date();
  const [leftYear,   setLeftYear]   = useState(now.getFullYear());
  const [leftMonth,  setLeftMonth]  = useState(now.getMonth());
  const [rightYear,  setRightYear]  = useState(now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear());
  const [rightMonth, setRightMonth] = useState((now.getMonth() + 1) % 12);

  const [hoverDate,  setHoverDate]  = useState<Date | null>(null);
  const [activePreset, setActivePreset] = useState<PresetId | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const applyRange = (r: DateRange) => {
    setInternal(r);
    onChange?.(r);
  };

  const handlePreset = (id: PresetId) => {
    setActivePreset(id);
    if (id === "custom") return;
    const r = resolvePreset(id);
    applyRange(r);
    setSelecting("start");
  };

  const handleDaySelect = (d: Date) => {
    if (selecting === "start") {
      applyRange({ start: d, end: null });
      setSelecting("end");
      setActivePreset("custom");
    } else {
      const start = range.start;
      if (start && d < start) {
        applyRange({ start: d, end: start });
      } else {
        applyRange({ start, end: d });
      }
      setSelecting("start");
    }
  };

  const sharedGridProps = {
    onSelect:  handleDaySelect,
    onHover:   setHoverDate,
    hoverDate,
    rangeStart: range.start,
    rangeEnd:   range.end,
    minDate,
    maxDate,
  };

  // Keep right month always 1 ahead of left
  const handleLeftMonthChange = (m: number) => {
    setLeftMonth(m);
    const nextM = m === 11 ? 0 : m + 1;
    const nextY = m === 11 ? leftYear + 1 : leftYear;
    setRightMonth(nextM);
    setRightYear(nextY);
  };
  const handleLeftYearChange = (y: number) => {
    setLeftYear(y);
    setRightYear(leftMonth === 11 ? y + 1 : y);
  };

  return (
    <div style={{
      background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 14,
      padding: 20, fontFamily: "Inter, sans-serif", display: "inline-flex",
      flexDirection: "column", gap: 16, ...style,
    }}>
      {/* Preset chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {PRESETS.map(p => {
          const active = activePreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handlePreset(p.id)}
              style={{
                height: 28, padding: "0 12px", borderRadius: 999,
                border: active ? "1.5px solid var(--color-border-brand, #1D32FF)" : "1px solid #E5E7EB",
                background: active ? "var(--color-bg-brand-contrast, #EEF1FF)" : "#FFFFFF",
                color: active ? "var(--color-text-brand, #1D32FF)" : "#374151",
                fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                transition: "all 0.12s",
              }}
            >
              {active && p.id !== "custom" && (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="var(--color-text-brand, #1D32FF)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Two calendars */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <CalendarGrid
          year={leftYear} month={leftMonth}
          onYearChange={handleLeftYearChange}
          onMonthChange={handleLeftMonthChange}
          disableNav="next"
          {...sharedGridProps}
        />

        {/* Arrow between */}
        <div style={{ display: "flex", alignItems: "center", paddingTop: 52, flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <CalendarGrid
          year={rightYear} month={rightMonth}
          onYearChange={setRightYear}
          onMonthChange={setRightMonth}
          disableNav="prev"
          {...sharedGridProps}
        />
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F3F4F6", paddingTop: 14 }}>
        <span style={{ fontSize: 12, color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>
          {range.start && range.end
            ? `${formatDate(range.start)} — ${formatDate(range.end)}`
            : range.start
              ? `From ${formatDate(range.start)}`
              : "Select a date range"}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => { applyRange({ start: null, end: null }); setActivePreset(null); onClear?.(); }}
            style={{
              height: 32, padding: "0 14px", borderRadius: 8,
              border: "none", background: "transparent",
              fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
              color: "var(--color-text-brand, #1D32FF)", cursor: "pointer",
            }}
          >
            Clear
          </button>
          <SaveBtn onClick={() => onSave?.(range)} />
        </div>
      </div>
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 32, padding: "0 18px", borderRadius: 8,
        border: "none", background: hov ? "var(--color-bg-brand-subtle-press, #1527E0)" : "var(--color-bg-brand-primary, #1D32FF)",
        color: "#FFFFFF", fontFamily: "Inter, sans-serif",
        fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.12s",
      }}
    >
      Save
    </button>
  );
}
