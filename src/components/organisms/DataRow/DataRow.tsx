import React, { useState } from "react";
import { Checkbox } from "../../atoms/Checkbox";
import { Avatar } from "../../atoms/Avatar";
import { IconPen16, IconCopy16, IconTrash16, IconChevron165 } from "../../atoms/Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataRowStatus = "inProgress" | "done" | "pending" | "cancelled";

export interface DataRowAssignee {
  name: string;
  /** Photo URL — falls back to initials avatar or generic silhouette */
  avatarSrc?: string;
  /** Two-letter initials for textProfile fallback */
  initials?: string;
}

export interface DataRowProps {
  checked?: boolean;
  onCheck?: (checked: boolean) => void;
  /** Primary date value — e.g. "22 May 2024" */
  date?: string;
  /** Numeric value — e.g. "0.00" */
  amount?: string | number;
  /** Select/dropdown current value — "Choose" placeholder when empty */
  selectValue?: string;
  onSelectClick?: () => void;
  /** Assignee: avatar + name */
  assignee?: DataRowAssignee;
  /** Freeform notes (inline text input) */
  notes?: string;
  onNotesChange?: (val: string) => void;
  /** Status badge label */
  status?: string;
  statusVariant?: DataRowStatus;
  /** Highlight entire row with brand-subtle blue */
  selected?: boolean;
  /** Row action callbacks — show corresponding button only when handler is provided */
  onEdit?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  style?: React.CSSProperties;
}

// ─── Status badge tokens ──────────────────────────────────────────────────────

const STATUS_CONFIG: Record<DataRowStatus, { bg: string; text: string; border: string }> = {
  inProgress: { bg: "var(--color-bg-brand-contrast, #EAF3FF)", text: "var(--color-text-brand, #1D32FF)", border: "var(--color-border-brand, #628AFF)" },
  done:       { bg: "#DCFCE7", text: "#15803D", border: "#22C55E" },
  pending:    { bg: "#FEF9C3", text: "#CA8A04", border: "#EAB308" },
  cancelled:  { bg: "#FFE1E3", text: "#E1232E", border: "#FC6D75" },
};

// ─── Cell divider ─────────────────────────────────────────────────────────────

const CELL_DIVIDER = "1px solid #F0F0F0";

// ─── Status icon (custom 13 px shapes — no library equivalent) ───────────────

function StatusIcon({ variant, color }: { variant: DataRowStatus; color: string }) {
  if (variant === "done") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="5" stroke={color} strokeWidth="1.2" />
        <path d="M4 6.5l2 2 3-3" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "pending") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="5" stroke={color} strokeWidth="1.2" />
        <path d="M6.5 4v3l1.5 1.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "cancelled") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="5" stroke={color} strokeWidth="1.2" />
        <path d="M4.5 4.5l4 4M8.5 4.5l-4 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  // inProgress — hourglass
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2.5 1.5h8M2.5 11.5h8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3.5 1.5v2.5l3 2.5-3 2.5v2.5M9.5 1.5v2.5L6.5 6.5l3 2.5v2.5"
        stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Drag handle (6-dot grip) ─────────────────────────────────────────────────

function GripIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
      <circle cx="3" cy="2"  r="1.2" fill="#D1D5DB" />
      <circle cx="7" cy="2"  r="1.2" fill="#D1D5DB" />
      <circle cx="3" cy="7"  r="1.2" fill="#D1D5DB" />
      <circle cx="7" cy="7"  r="1.2" fill="#D1D5DB" />
      <circle cx="3" cy="12" r="1.2" fill="#D1D5DB" />
      <circle cx="7" cy="12" r="1.2" fill="#D1D5DB" />
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

// ─── Action icon button ───────────────────────────────────────────────────────

function ActionBtn({
  icon,
  label,
  onClick,
  variant = "default",
  visible,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);

  const bg     = hov
    ? variant === "danger" ? "#FEF2F2" : "#EEF0FF"
    : "transparent";
  const border = hov
    ? variant === "danger" ? "#FCA5A5" : "#C7CFFF"
    : "#E5E7EB";
  const iconColor = hov
    ? variant === "danger" ? "#DC2626" : "#1D32FF"
    : "#9CA3AF";

  return (
    <button
      title={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 24, height: 24, borderRadius: 5,
        background: bg,
        border: `1px solid ${border}`,
        cursor: onClick ? "pointer" : "default",
        padding: 0, flexShrink: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s, background 0.1s, border-color 0.1s",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, { color: iconColor })
        : icon}
    </button>
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
  onCopy,
  onDelete,
  style,
}: DataRowProps) {
  const [hovered,      setHovered]      = useState(false);
  const [notesFocused, setNotesFocused] = useState(false);

  const rowBg = (selected || checked)
    ? "var(--color-bg-brand-contrast, #EAF3FF)"
    : hovered ? "#F9FAFB" : "#FFFFFF";

  const statusCfg      = STATUS_CONFIG[statusVariant];
  const actionsVisible = hovered || checked || selected;

  const textStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "18px",
    color: "#171717",
    whiteSpace: "nowrap",
  };

  // Resolve assignee avatar
  const assigneeAvatar = assignee
    ? assignee.avatarSrc
      ? <Avatar type="office"       size={20} src={assignee.avatarSrc} alt={assignee.name} />
      : assignee.initials
        ? <Avatar type="textProfile" size={20} text={assignee.initials} />
        : <Avatar type="noProfile"   size={20} />
    : <Avatar type="noProfile" size={20} />;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "stretch",
        height: 44,
        background: rowBg,
        borderBottom: "1px solid #F0F0F0",
        transition: "background 0.1s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── 1. Checkbox ── */}
      <Cell width={48} style={{ justifyContent: "center", padding: "0 14px" }}>
        <Checkbox size="sm" checked={checked} onChange={onCheck} />
      </Cell>

      {/* ── 2. Date ── */}
      <Cell width={172}>
        <span style={textStyle}>{date}</span>
      </Cell>

      {/* ── 3. Amount (right-aligned, tabular nums) ── */}
      <Cell width={80} style={{ justifyContent: "flex-end" }}>
        <span style={{ ...textStyle, fontVariantNumeric: "tabular-nums" }}>{amount}</span>
      </Cell>

      {/* ── 4. Select ── */}
      <Cell width={120}>
        <button
          onClick={onSelectClick}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: "none",
            cursor: onSelectClick ? "pointer" : "default",
            padding: 0, fontFamily: "Inter, sans-serif",
            fontSize: 13, fontWeight: 400,
            color: selectValue ? "#171717" : "#9CA3AF",
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selectValue ?? "Choose"}
          </span>
          <IconChevron165 size={12} color="#6B7280" style={{ flexShrink: 0 }} />
        </button>
      </Cell>

      {/* ── 5. Assignee ── */}
      <Cell width={172}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden" }}>
          <div style={{ flexShrink: 0 }}>{assigneeAvatar}</div>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400,
            color: "#171717", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {assignee?.name ?? "—"}
          </span>
        </div>
      </Cell>

      {/* ── 6. Actions — Edit | Copy | Delete, revealed on row hover ── */}
      <Cell width={96} style={{ justifyContent: "center", gap: 4, padding: "0 6px" }}>
        <ActionBtn
          icon={<IconPen16 size={14} />}
          label="Edit"
          onClick={onEdit}
          variant="default"
          visible={actionsVisible}
        />
        <ActionBtn
          icon={<IconCopy16 size={14} />}
          label="Copy"
          onClick={onCopy}
          variant="default"
          visible={actionsVisible}
        />
        <ActionBtn
          icon={<IconTrash16 size={14} />}
          label="Delete"
          onClick={onDelete}
          variant="danger"
          visible={actionsVisible}
        />
      </Cell>

      {/* ── 7. Notes (inline text input) ── */}
      <Cell flex="1" style={{ padding: "0 10px" }}>
        <input
          type="text"
          value={notes}
          onChange={e => onNotesChange?.(e.target.value)}
          onFocus={() => setNotesFocused(true)}
          onBlur={() => setNotesFocused(false)}
          placeholder="Add a note…"
          style={{
            width: "100%",
            height: 28,
            background: notesFocused ? "#FFFFFF" : "transparent",
            border: `1px solid ${notesFocused ? "#628AFF" : "transparent"}`,
            borderRadius: 6,
            outline: "none",
            padding: "0 8px",
            boxSizing: "border-box",
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: "#171717",
            lineHeight: "18px",
            transition: "border-color 0.12s, background 0.12s",
            boxShadow: notesFocused ? "0 0 0 2px rgba(98,138,255,0.18)" : "none",
          }}
        />
      </Cell>

      {/* ── 8. Status badge ── */}
      <Cell width={136} style={{ justifyContent: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          height: 24, padding: "0 8px", borderRadius: 6,
          background: statusCfg.bg,
          border: `1px solid ${statusCfg.border}`,
          flexShrink: 0,
        }}>
          <StatusIcon variant={statusVariant} color={statusCfg.text} />
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
            color: statusCfg.text, whiteSpace: "nowrap",
          }}>
            {status}
          </span>
        </div>
      </Cell>

      {/* ── 9. Drag handle — shown on hover ── */}
      <Cell width={44} style={{ justifyContent: "center", borderRight: "none", cursor: "grab" }}>
        <div style={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s",
        }}>
          <GripIcon />
        </div>
      </Cell>
    </div>
  );
}
