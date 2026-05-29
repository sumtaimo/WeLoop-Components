import React, { useState } from "react";
import { IconChevron162, IconChevron163, IconChevron165 } from "../../atoms/Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Current page, 1-based */
  page:             number;
  /** Total number of pages */
  totalPages:       number;
  /** Items shown per page */
  pageSize:         number;
  /** Total item count; used to build "X of Y" label */
  totalItems?:      number;
  /** Extra right-hand label for paged variant (e.g. "Total Amt: £689,429") */
  totalLabel?:      string;
  /** Options for the page-size selector */
  pageSizeOptions?: number[];
  /**
   * "simple" — Page rows selector + "X of Y" text + first/prev/next/last buttons
   * "paged"  — Page-size selector + first/prev + numbered buttons + next/last + info
   */
  variant?:         "simple" | "paged";
  onPageChange:     (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  style?:           React.CSSProperties;
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children:  React.ReactNode;
  onClick:   () => void;
  disabled:  boolean;
  label:     string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:          28,
        height:         28,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        border:         "none",
        borderRadius:   6,
        background:     disabled ? "transparent" : (hov ? "#F3F4F6" : "transparent"),
        color:          disabled ? "#D1D5DB" : "#374151",
        cursor:         disabled ? "not-allowed" : "pointer",
        transition:     "background 0.12s, color 0.12s",
        padding:        0,
        flexShrink:     0,
      }}
    >
      {children}
    </button>
  );
}

// ─── Page size select ─────────────────────────────────────────────────────────

function PageSizeSelect({
  value,
  options,
  onChange,
}: {
  value:    number;
  options:  number[];
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <select
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label="Rows per page"
        style={{
          height:       32,
          padding:      "0 24px 0 12px",
          borderRadius: 8,
          border:       "none",
          boxShadow:    "0 0 0 0.5px #E5E5E5, 0 1px 1px rgba(0,0,0,0.06)",
          background:   "#FFFFFF",
          fontFamily:   "Inter, sans-serif",
          fontSize:     14,
          fontWeight:   500,
          color:        "#111827",
          cursor:       "pointer",
          appearance:   "none",
          outline:      "none",
          minWidth:     56,
        }}
      >
        {options.map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      {/* Chevron */}
      <span style={{ position: "absolute", right: 6, pointerEvents: "none", display: "flex", alignItems: "center" }}>
        <IconChevron165 size={14} color="#6B7280" />
      </span>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  totalLabel,
  pageSizeOptions = [10, 25, 50, 100],
  variant         = "simple",
  onPageChange,
  onPageSizeChange,
  style,
}: PaginationProps) {
  const infoText = totalItems != null
    ? totalItems === 0
      ? `0 of 0`
      : `${pageSize * (page - 1) + 1}–${Math.min(pageSize * page, totalItems)} of ${totalItems}`
    : totalPages === 0 ? `0 of 0` : `${page} of ${totalPages}`;

  const disableFirst = page <= 1;
  const disableLast  = page >= totalPages;

  if (variant === "simple") {
    return (
      <div style={{
        display:    "flex",
        alignItems: "center",
        gap:        35,
        height:     32,
        fontFamily: "Inter, sans-serif",
        ...style,
      }}>
        {/* Page rows */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>
            Page rows
          </span>
          <PageSizeSelect
            value={pageSize}
            options={pageSizeOptions}
            onChange={v => onPageSizeChange?.(v)}
          />
        </div>

        {/* Info */}
        <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", whiteSpace: "nowrap" }}>
          {infoText}
        </span>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <NavBtn onClick={() => onPageChange(1)}          disabled={disableFirst} label="First page"><IconChevron162 size={16} color="currentColor" /></NavBtn>
          <NavBtn onClick={() => onPageChange(page - 1)}   disabled={disableFirst} label="Previous page"><IconChevron162 size={16} color="currentColor" /></NavBtn>
          <NavBtn onClick={() => onPageChange(page + 1)}   disabled={disableLast}  label="Next page"><IconChevron163 size={16} color="currentColor" /></NavBtn>
          <NavBtn onClick={() => onPageChange(totalPages)} disabled={disableLast}  label="Last page"><IconChevron163 size={16} color="currentColor" /></NavBtn>
        </div>
      </div>
    );
  }

  // ── Paged variant — numbered page buttons ──────────────────────────────────
  const MAX_VISIBLE = 10;
  const pages: (number | "…")[] = [];
  if (totalPages <= MAX_VISIBLE) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    // always show first, last, current ±2, and ellipsis
    const around = new Set([1, totalPages, page - 2, page - 1, page, page + 1, page + 2].filter(p => p >= 1 && p <= totalPages));
    const sorted  = Array.from(around).sort((a, b) => a - b);
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) pages.push("…");
      pages.push(p);
    });
  }

  return (
    <div style={{
      display:     "flex",
      alignItems:  "center",
      gap:         8,
      height:      32,
      fontFamily:  "Inter, sans-serif",
      flexWrap:    "wrap",
      ...style,
    }}>
      {/* Page size */}
      <PageSizeSelect
        value={pageSize}
        options={pageSizeOptions}
        onChange={v => onPageSizeChange?.(v)}
      />

      {/* First / Prev */}
      <NavBtn onClick={() => onPageChange(1)}        disabled={disableFirst} label="First page"><IconChevron162 size={16} color="currentColor" /></NavBtn>
      <NavBtn onClick={() => onPageChange(page - 1)} disabled={disableFirst} label="Previous page"><IconChevron162 size={16} color="currentColor" /></NavBtn>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} style={{
            width: 28, textAlign: "center", fontSize: 14, color: "#9CA3AF",
          }}>…</span>
        ) : (
          <PageBtn key={p} n={p as number} active={p === page} onClick={() => onPageChange(p as number)} />
        )
      )}

      {/* Next / Last */}
      <NavBtn onClick={() => onPageChange(page + 1)}   disabled={disableLast} label="Next page"><IconChevron163 size={16} color="currentColor" /></NavBtn>
      <NavBtn onClick={() => onPageChange(totalPages)} disabled={disableLast}  label="Last page"><IconChevron163 size={16} color="currentColor" /></NavBtn>

      {/* Info */}
      <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", whiteSpace: "nowrap", marginLeft: 4 }}>
        {infoText}{totalLabel ? ` / ${totalLabel}` : ""}
      </span>
    </div>
  );
}

function PageBtn({ n, active, onClick }: { n: number; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-label={`Page ${n}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:        28,
        height:       28,
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        border:       active ? "1.5px solid #E5E7EB" : "none",
        borderRadius: 6,
        background:   active ? "#FFFFFF" : (hov ? "#F3F4F6" : "transparent"),
        color:        "#111827",
        fontFamily:   "Inter, sans-serif",
        fontSize:     14,
        fontWeight:   active ? 600 : 400,
        cursor:       "pointer",
        transition:   "background 0.12s",
        padding:      0,
        flexShrink:   0,
        boxShadow:    active ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {n}
    </button>
  );
}
