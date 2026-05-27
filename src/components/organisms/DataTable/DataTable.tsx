import React, { useState } from "react";
import { DataRow, type DataRowAssignee, type DataRowStatus } from "../DataRow";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableRow {
  id: string;
  checked?: boolean;
  date?: string;
  amount?: string | number;
  selectValue?: string;
  assignee?: DataRowAssignee;
  notes?: string;
  status?: string;
  statusVariant?: DataRowStatus;
  selected?: boolean;
}

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  flex?: string;
}

export interface DataTableProps {
  rows?: DataTableRow[];
  /** Called when a row's checkbox is toggled */
  onRowCheck?: (id: string, checked: boolean) => void;
  /** Called when a row's notes change */
  onRowNotesChange?: (id: string, value: string) => void;
  /** Called when an edit action is clicked on a row */
  onRowEdit?: (id: string) => void;
  /** Called when a row's select dropdown is clicked */
  onRowSelectClick?: (id: string) => void;
  /** Controlled sort column */
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string, dir: "asc" | "desc") => void;
  style?: React.CSSProperties;
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir?: "asc" | "desc" }) {
  const col = active ? "#1D32FF" : "#9CA3AF";
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      {/* up chevron */}
      <path
        d="M3 7.5l3-3 3 3"
        stroke={active && dir === "asc" ? col : "#D1D5DB"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* down chevron */}
      <path
        d="M3 4.5l3 3 3-3"
        stroke={active && dir === "desc" ? col : "#D1D5DB"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M1 2.5h9M2.5 5.5h6M4 8.5h3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Header cell ─────────────────────────────────────────────────────────────

const HEADER_DIVIDER = "1px solid #E5E7EB";

function HeaderCell({
  children,
  width,
  flex,
  align = "center",
  style,
}: {
  children?: React.ReactNode;
  width?: number | string;
  flex?: string;
  align?: "center" | "flex-start" | "flex-end";
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: align,
      height: "100%",
      borderRight: HEADER_DIVIDER,
      padding: "0 12px",
      boxSizing: "border-box",
      flexShrink: 0,
      ...(width ? { width } : {}),
      ...(flex  ? { flex, minWidth: 0 } : {}),
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── All-select checkbox ──────────────────────────────────────────────────────

function AllCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (v: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const SIZE = 16;
  const bg = checked || indeterminate ? "#1D32FF" : hovered ? "#F5F5F5" : "#FFFFFF";
  const border = checked || indeterminate ? "#1D32FF" : hovered ? "#A3A3A3" : "#D4D4D4";

  return (
    <div
      style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        width: SIZE, height: SIZE, borderRadius: 4,
        background: bg, border: `1.5px solid ${border}`,
        boxSizing: "border-box",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {indeterminate && (
          <div style={{ width: 8, height: 2, background: "#FFFFFF", borderRadius: 1 }} />
        )}
        {checked && !indeterminate && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{
          position: "absolute", inset: 0, opacity: 0,
          width: "100%", height: "100%", cursor: "pointer", margin: 0,
        }}
      />
    </div>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

const COLUMNS: Array<{
  key: string;
  label: string;
  width?: number;
  flex?: string;
  sortable?: boolean;
  align?: "center" | "flex-start" | "flex-end";
}> = [
  { key: "date",     label: "DATE",     width: 172,           sortable: true },
  { key: "amount",   label: "NUMERIC",  width: 80,            sortable: true, align: "flex-end" },
  { key: "select",   label: "SELECT",   width: 120,           sortable: false },
  { key: "assignee", label: "ASSIGNEE", width: 172,           sortable: false },
  { key: "actions",  label: "ACTIONS",  width: 88,            sortable: false, align: "center" },
  { key: "notes",    label: "NOTES",    flex: "1",            sortable: false },
  { key: "status",   label: "STATUS",   width: 136,           sortable: false, align: "center" },
];

export function DataTable({
  rows = [],
  onRowCheck,
  onRowNotesChange,
  onRowEdit,
  onRowSelectClick,
  sortKey: controlledSortKey,
  sortDir: controlledSortDir,
  onSort,
  style,
}: DataTableProps) {
  const [internalSortKey, setInternalSortKey] = useState<string>("date");
  const [internalSortDir, setInternalSortDir] = useState<"asc" | "desc">("asc");

  const sortKey = controlledSortKey ?? internalSortKey;
  const sortDir = controlledSortDir ?? internalSortDir;

  function handleSort(key: string) {
    const newDir = sortKey === key && sortDir === "asc" ? "desc" : "asc";
    if (onSort) {
      onSort(key, newDir);
    } else {
      setInternalSortKey(key);
      setInternalSortDir(newDir);
    }
  }

  // All-checkbox state
  const checkedCount = rows.filter(r => r.checked).length;
  const allChecked = rows.length > 0 && checkedCount === rows.length;
  const someChecked = checkedCount > 0 && !allChecked;

  function handleAllCheck(checked: boolean) {
    rows.forEach(r => onRowCheck?.(r.id, checked));
  }

  return (
    <div style={{
      width: "100%",
      border: "1px solid #E5E7EB",
      borderRadius: 10,
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
      background: "#FFFFFF",
      ...style,
    }}>
      {/* ── Header row ── */}
      <div style={{
        display: "flex",
        alignItems: "stretch",
        height: 44,
        background: "#F9FAFB",
        borderBottom: "1px solid #E5E7EB",
      }}>
        {/* Checkbox cell */}
        <HeaderCell width={48} style={{ justifyContent: "center", padding: "0 14px" }}>
          <AllCheckbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleAllCheck}
          />
        </HeaderCell>

        {COLUMNS.map(col => (
          <HeaderCell
            key={col.key}
            width={col.width}
            flex={col.flex}
            align={col.align ?? "flex-start"}
            style={!col.width && !col.flex ? undefined : undefined}
          >
            <button
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "none",
                border: "none",
                padding: 0,
                cursor: col.sortable ? "pointer" : "default",
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: sortKey === col.key ? "#1D32FF" : "#6B7280",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                userSelect: "none",
                width: "100%",
                justifyContent: col.align === "flex-end" ? "flex-end" :
                                col.align === "center"   ? "center"   : "flex-start",
              }}
            >
              {col.label}
              {col.sortable && (
                <SortIcon
                  active={sortKey === col.key}
                  dir={sortKey === col.key ? sortDir : undefined}
                />
              )}
              {!col.sortable && col.key !== "actions" && (
                <FilterIcon />
              )}
            </button>
          </HeaderCell>
        ))}

        {/* Trailing cell */}
        <HeaderCell width={48} style={{ borderRight: "none" }} />
      </div>

      {/* ── Data rows ── */}
      {rows.length === 0 ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#9CA3AF",
        }}>
          No data
        </div>
      ) : (
        rows.map((row, i) => (
          <DataRow
            key={row.id}
            checked={row.checked}
            onCheck={v => onRowCheck?.(row.id, v)}
            date={row.date}
            amount={row.amount}
            selectValue={row.selectValue}
            onSelectClick={() => onRowSelectClick?.(row.id)}
            assignee={row.assignee}
            notes={row.notes}
            onNotesChange={v => onRowNotesChange?.(row.id, v)}
            status={row.status}
            statusVariant={row.statusVariant}
            selected={row.selected}
            onEdit={() => onRowEdit?.(row.id)}
            style={i === rows.length - 1 ? { borderBottom: "none" } : undefined}
          />
        ))
      )}
    </div>
  );
}
