import React, { useState } from "react";
import { DataRow } from "../../src/components/organisms/DataRow";
import { DemoShell, DemoRow } from "../DemoShell";

export function DataRowDemo() {
  const [rows, setRows] = useState([
    { id: "a", checked: false, notes: "",       status: "inProgress" as const, selected: false },
    { id: "b", checked: false, notes: "",       status: "inProgress" as const, selected: true  },
    { id: "c", checked: false, notes: "",       status: "done"       as const, selected: false },
    { id: "d", checked: false, notes: "",       status: "pending"    as const, selected: false },
    { id: "e", checked: false, notes: "",       status: "cancelled"  as const, selected: false },
    { id: "f", checked: true,  notes: "Urgent", status: "inProgress" as const, selected: false },
  ]);

  function toggle(id: string, val: boolean) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, checked: val } : r));
  }
  function setNotes(id: string, val: string) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, notes: val } : r));
  }
  function selectRow(id: string) {
    setRows(prev => prev.map(r => ({ ...r, selected: r.id === id ? !r.selected : false })));
  }

  const STATUS_LABELS: Record<string, string> = {
    inProgress: "In Progress",
    done:       "Done",
    pending:    "Pending",
    cancelled:  "Cancelled",
  };

  const ASSIGNEES = [
    { name: "Olivia Rhye",  avatarSrc: "https://i.pravatar.cc/64?img=5"  },
    { name: "Phoenix Baker", avatarSrc: "https://i.pravatar.cc/64?img=9"  },
    { name: "Lana Steiner", avatarSrc: "https://i.pravatar.cc/64?img=12" },
    { name: "Demi Wilkinson",avatarSrc: "https://i.pravatar.cc/64?img=20" },
    { name: "Candice Wu",   avatarSrc: "https://i.pravatar.cc/64?img=25" },
    { name: "Natali Craig", avatarSrc: "https://i.pravatar.cc/64?img=30" },
  ];

  return (
    <DemoShell
      title="DataRow"
      description="Spreadsheet-style data row from Figma node 215:413 — checkbox, date, amount, select, assignee, edit actions, notes input, status badge. Click a row to select/deselect it."
    >
      {/* ── Column header strip ── */}
      <DemoRow label="Column headers (reference)">
        <div style={{
          display: "flex", alignItems: "center",
          width: "100%", gap: 6, flexWrap: "wrap",
        }}>
          {[
            { w: 48,  label: "" },
            { w: 172, label: "DATE ↑" },
            { w: 80,  label: "NUMERIC" },
            { w: 120, label: "SELECT" },
            { w: 172, label: "ASSIGNEE" },
            { w: 88,  label: "ACTIONS" },
            { w: 120, label: "NOTES" },
            { w: 136, label: "STATUS" },
            { w: 48,  label: "" },
          ].map((col, i) => col.label ? (
            <div key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              height: 28, padding: "0 10px", borderRadius: 8,
              background: "#F3F4F6", border: "1px solid #E5E7EB",
              fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
              color: "#6B7280", letterSpacing: "0.04em", textTransform: "uppercase",
              flexShrink: 0,
            }}>
              {col.label}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
                <path d="M2 3.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <div key={i} style={{ width: col.w, flexShrink: 0 }} />
          ))}
        </div>
      </DemoRow>

      {/* ── Live interactive rows ── */}
      <DemoRow label="Interactive rows — check boxes · click row to select · edit notes">
        <div style={{
          width: "100%",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          {rows.map((row, i) => (
            <DataRow
              key={row.id}
              checked={row.checked}
              onCheck={val => toggle(row.id, val)}
              date={`${i + 18} May 2024`}
              amount={(i * 125.5).toFixed(2)}
              assignee={ASSIGNEES[i]}
              notes={row.notes}
              onNotesChange={val => setNotes(row.id, val)}
              status={STATUS_LABELS[row.status]}
              statusVariant={row.status}
              selected={row.selected}
              onEdit={() => selectRow(row.id)}
            />
          ))}
        </div>
      </DemoRow>

      {/* ── Static state examples ── */}
      <DemoRow label="Individual states — default · selected · checked">
        <div style={{
          width: "100%",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          {/* Default */}
          <DataRow
            date="22 May 2024"
            amount="0.00"
            assignee={{ name: "Olivia Rhye", avatarSrc: "https://i.pravatar.cc/64?img=5" }}
            status="In Progress" statusVariant="inProgress"
          />
          {/* Selected row */}
          <DataRow
            date="22 May 2024"
            amount="0.00"
            assignee={{ name: "Olivia Rhye", avatarSrc: "https://i.pravatar.cc/64?img=5" }}
            status="In Progress" statusVariant="inProgress"
            selected
          />
          {/* Checked */}
          <DataRow
            checked
            date="22 May 2024"
            amount="0.00"
            assignee={{ name: "Olivia Rhye", avatarSrc: "https://i.pravatar.cc/64?img=5" }}
            status="In Progress" statusVariant="inProgress"
          />
        </div>
      </DemoRow>

      {/* ── All status variants ── */}
      <DemoRow label="Status badge variants">
        <div style={{
          width: "100%",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          overflow: "hidden",
        }}>
          <DataRow date="22 May 2024" amount="750.00" status="In Progress" statusVariant="inProgress"
            assignee={{ name: "Olivia Rhye", avatarSrc: "https://i.pravatar.cc/64?img=5" }} />
          <DataRow date="22 May 2024" amount="1,200.00" status="Done" statusVariant="done"
            assignee={{ name: "Phoenix Baker", avatarSrc: "https://i.pravatar.cc/64?img=9" }} />
          <DataRow date="22 May 2024" amount="320.50" status="Pending" statusVariant="pending"
            assignee={{ name: "Lana Steiner", avatarSrc: "https://i.pravatar.cc/64?img=12" }} />
          <DataRow date="22 May 2024" amount="0.00" status="Cancelled" statusVariant="cancelled"
            assignee={{ name: "Demi Wilkinson", avatarSrc: "https://i.pravatar.cc/64?img=20" }} />
        </div>
      </DemoRow>

    </DemoShell>
  );
}
