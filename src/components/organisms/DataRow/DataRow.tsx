import React, { useState } from "react";
import { Checkbox } from "../../atoms/Checkbox";
import { Avatar } from "../../atoms/Avatar";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataRowStatus = "inProgress" | "done" | "pending" | "cancelled";

export interface DataRowAssignee {
  name: string;
  /** Photo URL — falls back to initials or generic avatar */
  avatarSrc?: string;
  /** Two-letter initials for textProfile fallback */
  initials?: string;
}

export interface DataRowProps {
  /** Checkbox state (left-most cell) */
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  /** Primary date value — e.g. "22 May 2024" */
  date?: string;
  /** Numeric value — e.g. "0.00" */
  amount?: string | number;
  /** Select/dropdown value — "Choose" when empty */
  selectValue?: string;
  onSelectClick?: () => void;
  /** Assignee: avatar + name */
  assignee?: DataRowAssignee;
  /** Freeform notes (text input cell) */
  notes?: string;
  onNotesChange?: (val: string) => void;
  /** Status badge */
  status?: string;
  statusVariant?: DataRowStatus;
  /** Highlight the entire row in brand-subtle blue */
  selected?: boolean;
  /** Pen icon action handlers (up to 3) */
  onEdit?: () => void;
  style?: React.CSSProperties;
}

// ─── Status badge config ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<DataRowStatus, { bg: string; text: string; border: string }> = {
  inProgress: { bg: "#EAF3FF", text: "#1D32FF", border: "#628AFF" },
  done:       { bg: "#DCFCE7", text: "#15803D", border: "#22C55E" },
  pending:    { bg: "#FEF9C3", text: "#CA8A04", border: "#EAB308" },
  cancelled:  { bg: "#FFE1E3", text: "#E1232E", border: "#FC6D75" },
};

// ─── Cell divider ─────────────────────────────────────────────────────────────

const CELL_DIVIDER = "1px solid #F0F0F0";

// ─── Mini SVG icons ───────────────────────────────────────────────────────────

function SyncIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10 6A4 4 0 112.1 3.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 2.5V6H6.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CmdChip() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 18, height: 18, borderRadius: 4,
      background: "#F3F4F6", border: "1px solid #E5E7EB",
      fontSize: 10, lineHeight: 1, color: "#9CA3AF", flexShrink: 0,
    }}>
      ⌘
    </span>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 2.5l2 2-8.5 8.5H3v-2l8.5-8.5z"
        stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9.5 4.5l2 2" stroke="#9CA3AF" strokeWidth="1.3" />
    </svg>
  );
}

function HourglassIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 1.5h8M2.5 11.5h8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3.5 1.5v2.5l3 2.5-3 2.5v2.5M9.5 1.5v2.5L6.5 6.5l3 2.5v2.5"
        stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Shared cell wrapper ──────────────────────────────────────────────────────

function Cell({
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
      borderRight: CELL_DIVIDER,
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

// ─── DataRow ──────────────────────────────────────────────────────────────────

export function DataRow({
  checked = false,
  onCheck,
  date = "22 May 2024",
  amount = "0.00",
  selectValue,
  onSelectClick,
  assignee,
  notes = "",
  onNotesChange,
  status = "In Progress",
  statusVariant = "inProgress",
  selected = false,
  onEdit,
  style,
}: DataRowProps) {
  const [hovered, setHovered] = useState(false);

  const rowBg = selected
    ? "#EAF3FF"
    : hovered
      ? "#F9FAFB"
      : "#FFFFFF";

  const statusCfg = STATUS_CONFIG[statusVariant];

  const textStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#171717",
    whiteSpace: "nowrap",
  };

  const mutedText: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#9CA3AF",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "stretch",
        minHeight: 56,
        background: rowBg,
        borderBottom: "1px solid #F0F0F0",
        transition: "background 0.1s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── 1. Checkbox ── */}
      <Cell width={48} style={{ justifyContent: "center", padding: "0 14px" }}>
        <Checkbox
          size="sm"
          checked={checked}
          onChange={onCheck}
        />
      </Cell>

      {/* ── 2. Date ── */}
      <Cell width={172}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <span style={textStyle}>{date}</span>
          <SyncIcon />
          <CmdChip />
        </div>
      </Cell>

      {/* ── 3. Amount ── */}
      <Cell width={80} style={{ justifyContent: "flex-end" }}>
        <span style={{ ...textStyle, fontVariantNumeric: "tabular-nums" }}>{amount}</span>
      </Cell>

      {/* ── 4. Select ── */}
      <Cell width={120}>
        <button
          onClick={onSelectClick}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: "none", cursor: "pointer",
            padding: 0, fontFamily: "Inter, sans-serif",
            fontSize: 13, fontWeight: 400, color: selectValue ? "#171717" : "#9CA3AF",
          }}
        >
          <span>{selectValue ?? "Choose"}</span>
          <ChevronDown />
        </button>
      </Cell>

      {/* ── 5. Assignee ── */}
      <Cell width={172}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
          {assignee ? (
            assignee.avatarSrc ? (
              <Avatar type="office" size={20} src={assignee.avatarSrc} alt={assignee.name} />
            ) : assignee.initials ? (
              <Avatar type="textProfile" size={20} text={assignee.initials} />
            ) : (
              <Avatar type="noProfile" size={20} />
            )
          ) : (
            <Avatar type="office" size={20} src="https://i.pravatar.cc/64?img=5" alt="Olivia Rhye" />
          )}
          <span style={{ ...textStyle, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
            {assignee?.name ?? "Olivia Rhye"}
          </span>
          <CmdChip />
        </div>
      </Cell>

      {/* ── 6. Edit actions (3 pencil icons) ── */}
      <Cell width={88} style={{ justifyContent: "center", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={onEdit}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 24, height: 24, borderRadius: 6,
              background: "transparent", border: "1px solid #E5E7EB",
              cursor: "pointer", padding: 0, flexShrink: 0,
            }}
          >
            <PencilIcon />
          </button>
        ))}
      </Cell>

      {/* ── 7. Notes (text input) ── */}
      <Cell flex="1" style={{ padding: "0 12px" }}>
        <input
          type="text"
          value={notes}
          onChange={e => onNotesChange?.(e.target.value)}
          placeholder="Placeholder"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#171717",
            lineHeight: "18px",
          }}
        />
      </Cell>

      {/* ── 8. Status badge ── */}
      <Cell width={136} style={{ justifyContent: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          height: 28, padding: "0 10px", borderRadius: 8,
          background: statusCfg.bg,
          border: `1px solid ${statusCfg.border}`,
          flexShrink: 0,
        }}>
          <HourglassIcon color={statusCfg.text} />
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12, fontWeight: 500,
            color: statusCfg.text, whiteSpace: "nowrap",
          }}>
            {status}
          </span>
        </div>
      </Cell>

      {/* ── 9. Trailing cell (drag handle / action) ── */}
      <Cell width={48} style={{ justifyContent: "center", borderRight: "none" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: "#F3F4F6",
          border: "1px solid #E5E7EB",
        }} />
      </Cell>
    </div>
  );
}
