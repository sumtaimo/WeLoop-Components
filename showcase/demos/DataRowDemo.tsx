import React, { useState } from "react";
import { DataTable, type DataTableRow } from "../../src/components/organisms/DataTable";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const A = [
  { name: "Olivia Rhye",    avatarSrc: "https://i.pravatar.cc/64?img=5"  },
  { name: "Phoenix Baker",  avatarSrc: "https://i.pravatar.cc/64?img=9"  },
  { name: "Lana Steiner",   avatarSrc: "https://i.pravatar.cc/64?img=12" },
  { name: "Demi Wilkinson", avatarSrc: "https://i.pravatar.cc/64?img=20" },
  { name: "Candice Wu",     avatarSrc: "https://i.pravatar.cc/64?img=25" },
  { name: "Natali Craig",   avatarSrc: "https://i.pravatar.cc/64?img=30" },
];

// ─── Section 1 seed rows (interactive) ───────────────────────────────────────

const INIT: DataTableRow[] = [
  {
    id: "r1", checked: false, date: "18 May 2024", amount: "0.00",
    assignee: A[0], notes: "", status: "In Progress", statusVariant: "inProgress", selected: false,
  },
  {
    id: "r2", checked: false, date: "19 May 2024", amount: "125.50",
    selectValue: "Option A", assignee: A[1], notes: "",
    status: "In Progress", statusVariant: "inProgress", selected: true,  // ← selected like Figma
  },
  {
    id: "r3", checked: false, date: "20 May 2024", amount: "251.00",
    selectValue: "Option B", assignee: A[2], notes: "Review required",
    status: "Done", statusVariant: "done", selected: false,
  },
  {
    id: "r4", checked: false, date: "21 May 2024", amount: "376.50",
    assignee: A[3], notes: "", status: "Pending", statusVariant: "pending", selected: false,
  },
  {
    id: "r5", checked: false, date: "22 May 2024", amount: "502.00",
    selectValue: "Option C", assignee: A[4], notes: "On hold",
    status: "Pending", statusVariant: "pending", selected: false,
  },
  {
    id: "r6", checked: true,  date: "23 May 2024", amount: "627.50",  // ← checked like Figma
    selectValue: "Option A", assignee: A[5], notes: "Urgent",
    status: "Cancelled", statusVariant: "cancelled", selected: false,
  },
];

// ─── Section 2 — row states reference (static, matches Figma row order) ──────

const STATE_ROWS: DataTableRow[] = [
  // Row 1 — default, empty
  { id: "s1", checked: false, date: "22 May 2024", amount: "0.00",    assignee: A[0], notes: "", status: "In Progress", statusVariant: "inProgress" },
  // Row 2 — default with content
  { id: "s2", checked: false, date: "22 May 2024", amount: "125.50",  assignee: A[1], selectValue: "Option A", notes: "Default row", status: "In Progress", statusVariant: "inProgress" },
  // Row 3 — selected (blue row bg)
  { id: "s3", checked: false, date: "22 May 2024", amount: "251.00",  assignee: A[2], selectValue: "Option B", notes: "Selected row", status: "Done",        statusVariant: "done",       selected: true },
  // Row 4 — unchecked checkbox visible
  { id: "s4", checked: false, date: "22 May 2024", amount: "376.50",  assignee: A[3], notes: "", status: "Pending",     statusVariant: "pending" },
  // Row 5 — checked
  { id: "s5", checked: true,  date: "22 May 2024", amount: "502.00",  assignee: A[4], selectValue: "Option C", notes: "Checked row", status: "Pending",     statusVariant: "pending" },
  // Row 6 — checked + cancelled
  { id: "s6", checked: true,  date: "22 May 2024", amount: "627.50",  assignee: A[5], selectValue: "Option A", notes: "Urgent",      status: "Cancelled",   statusVariant: "cancelled" },
];

// ─── Section 3 — all four status badges ──────────────────────────────────────

const STATUS_ROWS: DataTableRow[] = [
  { id: "t1", date: "22 May 2024", amount: "750.00",   assignee: A[0], status: "In Progress", statusVariant: "inProgress" },
  { id: "t2", date: "22 May 2024", amount: "1,200.00", assignee: A[1], status: "Done",        statusVariant: "done" },
  { id: "t3", date: "22 May 2024", amount: "320.50",   assignee: A[2], status: "Pending",     statusVariant: "pending" },
  { id: "t4", date: "22 May 2024", amount: "0.00",     assignee: A[3], status: "Cancelled",   statusVariant: "cancelled" },
];

// ─── Main Demo ────────────────────────────────────────────────────────────────

export function DataRowDemo() {
  const [rows, setRows] = useState<DataTableRow[]>(INIT);

  function toggle(id: string, v: boolean) {
    setRows(p => p.map(r => r.id === id ? { ...r, checked: v } : r));
  }
  function setNotes(id: string, v: string) {
    setRows(p => p.map(r => r.id === id ? { ...r, notes: v } : r));
  }
  function selectRow(id: string) {
    setRows(p => p.map(r => ({ ...r, selected: r.id === id ? !r.selected : false })));
  }

  const checkedCount = rows.filter(r => r.checked).length;

  return (
    <DemoShell
      title="DataTable / DataRow"
      description="Spreadsheet-style table from Figma node 215:413 — sortable column headers, row states (default · selected · checked), notes input, and status badges."
    >

      {/* ── 1. Full interactive DataTable ── */}
      <DemoRow label="Full DataTable — interactive" fullWidth code={`import { DataTable, type DataTableRow } from 'weloop-components';

const [rows, setRows] = useState<DataTableRow[]>([
  {
    id: "r1",
    checked: false,
    date: "18 May 2024",
    amount: "125.50",
    selectValue: "Option A",
    assignee: { name: "Olivia Rhye", avatarSrc: "https://…/avatar.jpg" },
    notes: "Review required",
    status: "In Progress",
    statusVariant: "inProgress",
    selected: false,
  },
  // … more rows
]);

<DataTable
  rows={rows}
  onRowCheck={(id, checked) =>
    setRows(p => p.map(r => r.id === id ? { ...r, checked } : r))
  }
  onRowNotesChange={(id, value) =>
    setRows(p => p.map(r => r.id === id ? { ...r, notes: value } : r))
  }
  onRowEdit={id => openEditPanel(id)}
  onRowSelectClick={id => openSelectDropdown(id)}
/>`}>
        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", marginBottom: 10,
        }}>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 13,
            color: checkedCount > 0 ? "#1D32FF" : "#9CA3AF",
            fontWeight: checkedCount > 0 ? 500 : 400, transition: "color .15s",
          }}>
            {checkedCount > 0
              ? `${checkedCount} row${checkedCount > 1 ? "s" : ""} checked`
              : `${rows.length} rows`}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <TinyBtn
              label="+ Add Row"
              onClick={() =>
                setRows(p => [
                  ...p,
                  {
                    id: `r${Date.now()}`, checked: false,
                    date: "27 May 2024", amount: "0.00",
                    assignee: { name: "New User", initials: "NU" },
                    notes: "", status: "Pending", statusVariant: "pending", selected: false,
                  },
                ])
              }
            />
            {checkedCount > 0 && (
              <TinyBtn
                label="Delete checked" variant="danger"
                onClick={() => setRows(p => p.filter(r => !r.checked))}
              />
            )}
          </div>
        </div>

        {/* Table */}
        <DataTable
          rows={rows}
          onRowCheck={toggle}
          onRowNotesChange={setNotes}
          onRowEdit={selectRow}
          style={{ width: "100%" }}
        />

        {/* State legend */}
        <Legend />
      </DemoRow>

      {/* ── 2. Row states reference (Figma rows 1-6) ── */}
      <DemoRow label="Row states — default · selected · checked (Figma rows 1-6)" fullWidth>
        <DataTable rows={STATE_ROWS} style={{ width: "100%" }} />
        <div style={{
          display: "flex", gap: "6px 20px", flexWrap: "wrap",
          marginTop: 10, fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF",
        }}>
          <span>Row 1-2: <b>default</b></span>
          <span>Row 3: <b>selected</b> (blue bg)</span>
          <span>Row 4: unchecked checkbox</span>
          <span>Row 5-6: <b>checked</b> ✓</span>
        </div>
      </DemoRow>

      {/* ── 3. Status badge variants ── */}
      <DemoRow label="Status badge variants — inProgress · done · pending · cancelled" fullWidth>
        <DataTable rows={STATUS_ROWS} style={{ width: "100%" }} />
      </DemoRow>

    </DemoShell>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "6px 18px", marginTop: 12,
      fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF",
    }}>
      {[
        { bg: "#FFFFFF", bd: "#E5E7EB", label: "Default" },
        { bg: "#F9FAFB", bd: "#E5E7EB", label: "Hover" },
        { bg: "#EAF3FF", bd: "#C7D7F5", label: "Selected (click ✏️ icons)" },
        { bg: "#1D32FF", bd: "#1D32FF", label: "Checkbox checked" },
      ].map(({ bg, bd, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 11, height: 11, borderRadius: 3,
            background: bg, border: `1px solid ${bd}`, flexShrink: 0,
          }} />
          {label}
        </div>
      ))}
    </div>
  );
}

// ─── Tiny toolbar button ──────────────────────────────────────────────────────

function TinyBtn({
  label, onClick, variant = "default",
}: { label: string; onClick: () => void; variant?: "default" | "danger" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", height: 30, padding: "0 12px",
        borderRadius: 7, border: "1px solid", cursor: "pointer",
        fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
        transition: "background .1s",
        ...(variant === "danger"
          ? { background: hov ? "#FEE2E2" : "#FFF", borderColor: "#FCA5A5", color: "#DC2626" }
          : { background: hov ? "#F3F4F6" : "#FFF", borderColor: "#E5E7EB", color: "#374151" }),
      }}
    >
      {label}
    </button>
  );
}
