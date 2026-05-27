import React, { useState } from "react";
import { DataTable, type DataTableRow } from "../../src/components/organisms/DataTable";
import { DemoShell } from "../DemoShell";

// ─── Seed data ────────────────────────────────────────────────────────────────

const INITIAL_ROWS: DataTableRow[] = [
  {
    id: "r1",
    checked: false,
    date: "18 May 2024",
    amount: "0.00",
    selectValue: undefined,
    assignee: { name: "Olivia Rhye",    avatarSrc: "https://i.pravatar.cc/64?img=5"  },
    notes: "",
    status: "In Progress",
    statusVariant: "inProgress",
    selected: false,
  },
  {
    id: "r2",
    checked: false,
    date: "19 May 2024",
    amount: "125.50",
    selectValue: "Option A",
    assignee: { name: "Phoenix Baker",  avatarSrc: "https://i.pravatar.cc/64?img=9"  },
    notes: "",
    status: "In Progress",
    statusVariant: "inProgress",
    selected: true,
  },
  {
    id: "r3",
    checked: false,
    date: "20 May 2024",
    amount: "251.00",
    selectValue: "Option B",
    assignee: { name: "Lana Steiner",   avatarSrc: "https://i.pravatar.cc/64?img=12" },
    notes: "Review required",
    status: "Done",
    statusVariant: "done",
    selected: false,
  },
  {
    id: "r4",
    checked: false,
    date: "21 May 2024",
    amount: "376.50",
    selectValue: undefined,
    assignee: { name: "Demi Wilkinson", avatarSrc: "https://i.pravatar.cc/64?img=20" },
    notes: "",
    status: "Pending",
    statusVariant: "pending",
    selected: false,
  },
  {
    id: "r5",
    checked: false,
    date: "22 May 2024",
    amount: "502.00",
    selectValue: "Option C",
    assignee: { name: "Candice Wu",     avatarSrc: "https://i.pravatar.cc/64?img=25" },
    notes: "On hold",
    status: "Pending",
    statusVariant: "pending",
    selected: false,
  },
  {
    id: "r6",
    checked: true,
    date: "23 May 2024",
    amount: "627.50",
    selectValue: "Option A",
    assignee: { name: "Natali Craig",   avatarSrc: "https://i.pravatar.cc/64?img=30" },
    notes: "Urgent",
    status: "Cancelled",
    statusVariant: "cancelled",
    selected: false,
  },
];

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function DataRowDemo() {
  const [rows, setRows] = useState<DataTableRow[]>(INITIAL_ROWS);

  function handleCheck(id: string, checked: boolean) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, checked } : r));
  }

  function handleNotes(id: string, value: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, notes: value } : r));
  }

  function handleEdit(id: string) {
    // Toggle selected on click
    setRows(prev => prev.map(r => ({
      ...r,
      selected: r.id === id ? !r.selected : false,
    })));
  }

  const checkedIds = rows.filter(r => r.checked).map(r => r.id);

  return (
    <DemoShell
      title="DataTable"
      description="Spreadsheet-style table from Figma node 215:413 — column headers with sort/filter, checkbox selection, date, amount, select, assignee, edit actions, notes input, status badge. Click a row's edit icons to select/deselect it."
    >
      {/* ── Toolbar strip ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: checkedIds.length > 0 ? "#1D32FF" : "#9CA3AF",
          fontWeight: checkedIds.length > 0 ? 500 : 400,
          transition: "color 0.15s",
        }}>
          {checkedIds.length > 0
            ? `${checkedIds.length} row${checkedIds.length > 1 ? "s" : ""} selected`
            : `${rows.length} rows`}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <ActionButton
            label="+ Add Row"
            onClick={() =>
              setRows(prev => [
                ...prev,
                {
                  id: `r${Date.now()}`,
                  checked: false,
                  date: "27 May 2024",
                  amount: "0.00",
                  assignee: { name: "New User", initials: "NU" },
                  notes: "",
                  status: "Pending",
                  statusVariant: "pending",
                  selected: false,
                },
              ])
            }
          />
          {checkedIds.length > 0 && (
            <ActionButton
              label="Delete selected"
              variant="danger"
              onClick={() =>
                setRows(prev => prev.filter(r => !r.checked))
              }
            />
          )}
        </div>
      </div>

      {/* ── The table ── */}
      <DataTable
        rows={rows}
        onRowCheck={handleCheck}
        onRowNotesChange={handleNotes}
        onRowEdit={handleEdit}
      />

      {/* ── State legend ── */}
      <div style={{
        marginTop: 20,
        display: "flex",
        flexWrap: "wrap",
        gap: "8px 20px",
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        color: "#6B7280",
      }}>
        {[
          { dot: "#E5E7EB", label: "Default" },
          { dot: "#F9FAFB", label: "Hover" },
          { dot: "#EAF3FF", label: "Selected" },
          { dot: "#1D32FF", label: "Checked (blue ✓)" },
        ].map(({ dot, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 12, height: 12, borderRadius: 3,
              background: dot, border: "1px solid #E5E7EB", flexShrink: 0,
            }} />
            {label}
          </div>
        ))}
      </div>
    </DemoShell>
  );
}

// ─── Tiny toolbar button ──────────────────────────────────────────────────────

function ActionButton({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}) {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    height: 32,
    padding: "0 14px",
    borderRadius: 7,
    fontFamily: "Inter, sans-serif",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    border: "1px solid",
    transition: "background 0.1s, color 0.1s",
  };

  const styles: Record<string, React.CSSProperties> = {
    default: {
      background: hovered ? "#F3F4F6" : "#FFFFFF",
      borderColor: "#E5E7EB",
      color: "#374151",
    },
    danger: {
      background: hovered ? "#FEE2E2" : "#FFFFFF",
      borderColor: "#FCA5A5",
      color: "#DC2626",
    },
  };

  return (
    <button
      style={{ ...base, ...styles[variant] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
