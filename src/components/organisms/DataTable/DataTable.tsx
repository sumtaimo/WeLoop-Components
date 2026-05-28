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
  const col = active ? "var(--color-text-brand, #1D32FF)" : "#D1D5DB";
  const isAsc = active && dir === "asc";
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
      style={{ transform: isAsc ? "rotate(180deg)" : "none", transition: "transform 150ms" }}>
      <path d="M3 4.5l3 3 3-3" stroke={col} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.1" />
      <path d="M6 5.5v3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="3.8" r="0.6" fill="#9CA3AF" />
    </svg>
  );
}

// ─── Header cell ─────────────────────────────────────────────────────────────

const HEADER_DIVIDER = "1px solid #E5E7EB";

function HeaderCell({
  children,
  width,
  flex,
  padding = "0 12px",
  style,
}: {
  children?: React.ReactNode;
  width?: number | string;
  flex?: string;
  /** Horizontal padding — defaults to "0 12px", pass per-column overrides here */
  padding?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",   // ALWAYS vertically center — never use align here
      height: "100%",
      borderRight: HEADER_DIVIDER,
      padding,
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
  const bg = checked || indeterminate ? "var(--color-bg-brand-primary, #1D32FF)" : hovered ? "#F5F5F5" : "#FFFFFF";
  const border = checked || indeterminate ? "var(--color-bg-brand-primary, #1D32FF)" : hovered ? "#A3A3A3" : "#D4D4D4";

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

/**
 * Per-column config:
 *   align       — horizontal alignment of BOTH header label and data content
 *   cellPadding — passed to HeaderCell.padding; MUST match the DataRow Cell's
 *                 inline padding override for that column so labels stay aligned
 */
const COLUMNS: Array<{
  key: string;
  label: string;
  width?: number;
  flex?: string;
  sortable?: boolean;
  hasInfo?: boolean;
  align?: "center" | "flex-start" | "flex-end";
  cellPadding?: string;
}> = [
  { key: "date",     label: "DATE",     width: 172, sortable: true,  hasInfo: true  },
  { key: "amount",   label: "NUMERIC",  width: 80,  sortable: true,  align: "flex-end" },
  { key: "select",   label: "SELECT",   width: 120, hasInfo: true },
  { key: "assignee", label: "ASSIGNEE", width: 172, hasInfo: true },
  { key: "actions",  label: "ACTIONS",  width: 88,  align: "center", cellPadding: "0 2px" },
  { key: "notes",    label: "NOTES",    flex: "1",  hasInfo: true },
  { key: "status",   label: "STATUS",   width: 136, hasInfo: true, align: "center" },
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

        {COLUMNS.map(col => {
          const isActive   = sortKey === col.key;
          const textAlign  = col.align ?? "flex-start";
          const jc         = textAlign; // justifyContent on the button
          const labelColor = isActive ? "var(--color-text-brand, #1D32FF)" : "#6B7280";

          return (
            <HeaderCell
              key={col.key}
              width={col.width}
              flex={col.flex}
              padding={col.cellPadding ?? "0 12px"}
            >
              <button
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: col.sortable ? "pointer" : "default",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: labelColor,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  userSelect: "none",
                  width: "100%",
                  justifyContent: jc,
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                {/* Label — shrinks + clips if column is too narrow */}
                <span style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
                  // For right-aligned columns the icon comes BEFORE the label visually
                  order: textAlign === "flex-end" ? 2 : 0,
                }}>
                  {col.label}
                </span>

                {/* Icons — info circle and/or sort chevron */}
                {col.hasInfo && (
                  <span style={{ flexShrink: 0, display: "flex", order: textAlign === "flex-end" ? 0 : 2 }}>
                    <InfoCircleIcon />
                  </span>
                )}
                {col.sortable && (
                  <span style={{ flexShrink: 0, order: textAlign === "flex-end" ? 1 : 3, display: "flex" }}>
                    <SortIcon active={isActive} dir={isActive ? sortDir : undefined} />
                  </span>
                )}
              </button>
            </HeaderCell>
          );
        })}

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
