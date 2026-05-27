import React, { useState, useEffect, useCallback } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DialogVariant = "simple" | "list" | "form" | "export";

/** A single form field for the "form" variant */
export interface DialogFormField {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "select";
  options?: string[];     // for select
  fullWidth?: boolean;    // spans both columns
  required?: boolean;
}

/** A list item for the "list" variant */
export interface DialogListItem {
  label: string;
  count?: number | string;
}

/** A format option for the "export" variant */
export interface DialogExportFormat {
  id: string;
  label: string;
  ext: string;
  color: string;
  iconBg: string;
}

export interface DialogProps {
  variant?: DialogVariant;
  open?: boolean;
  title?: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
  onCancel?: () => void;
  onAction?: () => void;
  /** Called when the dialog requests closure (Esc key, backdrop click, × button) */
  onClose?: () => void;

  // ── "list" variant ─────────────────────────────────────────
  progressValue?: number;
  progressLabel?: string;
  listItems?: DialogListItem[];

  // ── "form" variant ─────────────────────────────────────────
  fields?: DialogFormField[];
  onSubmit?: (values: Record<string, string>) => void;

  // ── "export" variant ───────────────────────────────────────
  exportFormats?: DialogExportFormat[];
  exportPreviewRows?: Array<Record<string, string | number>>;
  exportPreviewColumns?: string[];
}

// ─── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_EXPORT_FORMATS: DialogExportFormat[] = [
  { id: "csv",     label: "CSV",     ext: ".csv",     color: "#16A34A", iconBg: "#DCFCE7" },
  { id: "json",    label: "JSON",    ext: ".json",    color: "#D97706", iconBg: "#FEF3C7" },
  { id: "parquet", label: "Parquet", ext: ".parquet", color: "#2563EB", iconBg: "#DBEAFE" },
  { id: "css",     label: "CSS",     ext: ".css",     color: "#7C3AED", iconBg: "#EDE9FE" },
];

export const DEFAULT_LIST_ITEMS: DialogListItem[] = [
  { label: "Total Records",    count: "1,240" },
  { label: "Active Users",     count: 984 },
  { label: "Pending Tasks",    count: 57 },
  { label: "Completed Items",  count: 199 },
  { label: "Archived Entries", count: 22 },
];

export const DEFAULT_FORM_FIELDS: DialogFormField[] = [
  { id: "firstName", label: "First Name",  placeholder: "John",             type: "text"  },
  { id: "lastName",  label: "Last Name",   placeholder: "Doe",              type: "text"  },
  { id: "email",     label: "Email",       placeholder: "john@example.com", type: "email",    fullWidth: true },
  { id: "role",      label: "Role",        placeholder: "Select role",      type: "select",
    options: ["Admin", "Editor", "Viewer"], fullWidth: true },
  { id: "remarks",   label: "Remarks",     placeholder: "Add any notes here…", type: "textarea", fullWidth: true },
];

// ─── Dialog widths ────────────────────────────────────────────────────────────

const DIALOG_WIDTH: Record<DialogVariant, number> = {
  simple: 406,
  list:   406,
  form:   520,
  export: 740,
};

// ─── Shared sub-components ───────────────────────────────────────────────────

/** Radix DialogClose wrapping our custom × button */
function CloseButton() {
  const [hov, setHov] = useState(false);
  return (
    <RadixDialog.Close asChild>
      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label="Close dialog"
        style={{
          position:       "absolute",
          top:            16,
          right:          16,
          width:          28,
          height:         28,
          borderRadius:   "50%",
          border:         "none",
          background:     hov ? "#F3F4F6" : "transparent",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          transition:     "background 0.12s",
          padding:        0,
          zIndex:         1,
          flexShrink:     0,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </RadixDialog.Close>
  );
}

function DialogFooter({
  cancelLabel = "Cancel",
  actionLabel = "Confirm",
  onCancel,
  onAction,
}: {
  cancelLabel?: string;
  actionLabel?: string;
  onCancel?: () => void;
  onAction?: () => void;
}) {
  const [actionHov, setActionHov] = useState(false);
  const [cancelHov, setCancelHov] = useState(false);

  return (
    <div style={{
      borderTop:      "1px solid #E5E7EB",
      padding:        "14px 24px",
      display:        "flex",
      justifyContent: "flex-end",
      alignItems:     "center",
      gap:            12,
      flexShrink:     0,
    }}>
      {/* Cancel — wraps with Radix Close so it also fires onOpenChange(false) */}
      <RadixDialog.Close asChild>
        <button
          onClick={onCancel}
          onMouseEnter={() => setCancelHov(true)}
          onMouseLeave={() => setCancelHov(false)}
          style={{
            height:       36,
            padding:      "0 20px",
            borderRadius: 8,
            border:       "none",
            background:   cancelHov ? "#F3F4F6" : "transparent",
            color:        "#1D32FF",
            fontFamily:   "Inter, sans-serif",
            fontSize:     14,
            fontWeight:   500,
            cursor:       "pointer",
            transition:   "background 0.12s",
          }}
        >
          {cancelLabel}
        </button>
      </RadixDialog.Close>

      {/* Primary action */}
      <button
        onClick={onAction}
        onMouseEnter={() => setActionHov(true)}
        onMouseLeave={() => setActionHov(false)}
        style={{
          height:       36,
          padding:      "0 20px",
          borderRadius: 8,
          border:       "none",
          background:   actionHov ? "#1527E0" : "#1D32FF",
          color:        "#FFFFFF",
          fontFamily:   "Inter, sans-serif",
          fontSize:     14,
          fontWeight:   500,
          cursor:       "pointer",
          transition:   "background 0.12s",
        }}
      >
        {actionLabel}
      </button>
    </div>
  );
}

// ─── Variant bodies ───────────────────────────────────────────────────────────

function SimpleBody({ title = "Confirm Action", description = "Are you sure you want to proceed? This action cannot be undone." }: Pick<DialogProps, "title" | "description">) {
  return (
    <div style={{ padding: "28px 24px 24px" }}>
      <RadixDialog.Title style={{
        margin:       0,
        fontFamily:   "Inter, sans-serif",
        fontSize:     20,
        fontWeight:   600,
        color:        "#111827",
        lineHeight:   "28px",
        paddingRight: 36,
      }}>
        {title}
      </RadixDialog.Title>
      {description && (
        <RadixDialog.Description style={{
          margin:     "10px 0 0",
          fontFamily: "Inter, sans-serif",
          fontSize:   14,
          color:      "#6B7280",
          lineHeight: "22px",
        }}>
          {description}
        </RadixDialog.Description>
      )}
    </div>
  );
}

function ListBody({
  title         = "Export Summary",
  description   = "Your export is being prepared. Here's a breakdown of the data included.",
  progressValue = 72,
  progressLabel,
  listItems     = DEFAULT_LIST_ITEMS,
}: Pick<DialogProps, "title" | "description" | "progressValue" | "progressLabel" | "listItems">) {
  return (
    <div style={{ padding: "28px 24px 24px" }}>
      <RadixDialog.Title style={{
        margin:       0,
        fontFamily:   "Inter, sans-serif",
        fontSize:     20,
        fontWeight:   600,
        color:        "#111827",
        lineHeight:   "28px",
        paddingRight: 36,
      }}>
        {title}
      </RadixDialog.Title>
      {description && (
        <RadixDialog.Description style={{
          margin:     "8px 0 0",
          fontFamily: "Inter, sans-serif",
          fontSize:   14,
          color:      "#6B7280",
          lineHeight: "22px",
        }}>
          {description}
        </RadixDialog.Description>
      )}

      {/* Progress bar */}
      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B7280" }}>Progress</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "#1D32FF" }}>
            {progressLabel ?? `${progressValue}%`}
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 999, background: "#E5E7EB", overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${Math.min(100, Math.max(0, progressValue ?? 0))}%`,
            background: "#1D32FF",
            borderRadius: 999,
            transition: "width 0.4s cubic-bezier(0.34,1.26,0.64,1)",
          }} />
        </div>
      </div>

      {/* Items */}
      <div style={{ marginTop: 20 }}>
        {listItems?.map((item, i) => (
          <ListRow key={i} item={item} last={i === (listItems?.length ?? 0) - 1} />
        ))}
      </div>
    </div>
  );
}

function ListRow({ item, last }: { item: DialogListItem; last?: boolean }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = item.count !== undefined ? String(item.count) : item.label;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "10px 0",
      borderBottom:   last ? "none" : "1px solid #F3F4F6",
    }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#111827" }}>
        {item.label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {item.count !== undefined && (
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#374151" }}>
            {typeof item.count === "number" ? item.count.toLocaleString() : item.count}
          </span>
        )}
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy"}
          style={{
            width:          24,
            height:         24,
            borderRadius:   6,
            border:         "none",
            background:     "transparent",
            cursor:         "pointer",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:        0,
            color:          copied ? "#16A34A" : "#9CA3AF",
            transition:     "color 0.15s",
          }}
        >
          {copied ? (
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <rect x="5" y="5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M3 9V3a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function FormBody({
  title       = "Configure Settings",
  description = "Fill in the details below.",
  fields      = DEFAULT_FORM_FIELDS,
  values,
  onChange,
}: Pick<DialogProps, "title" | "description" | "fields"> & {
  values:   Record<string, string>;
  onChange: (id: string, val: string) => void;
}) {
  const inlineFields    = fields?.filter(f => !f.fullWidth) ?? [];
  const fullWidthFields = fields?.filter(f =>  f.fullWidth) ?? [];

  return (
    <div style={{ padding: "28px 24px 24px" }}>
      {/* Hero icon */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div style={{
          width:          56,
          height:         56,
          borderRadius:   14,
          background:     "#F3F4F6",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}>
          <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="22" height="20" rx="3" stroke="#6B7280" strokeWidth="1.8"/>
            <line x1="3" y1="10" x2="25" y2="10" stroke="#6B7280" strokeWidth="1.8"/>
            <circle cx="7"  cy="7" r="1.2" fill="#9CA3AF"/>
            <circle cx="11" cy="7" r="1.2" fill="#9CA3AF"/>
            <circle cx="15" cy="7" r="1.2" fill="#9CA3AF"/>
          </svg>
        </div>
      </div>

      <RadixDialog.Title style={{
        margin:       "0 0 8px",
        fontFamily:   "Inter, sans-serif",
        fontSize:     20,
        fontWeight:   600,
        color:        "#111827",
        lineHeight:   "28px",
        textAlign:    "center",
        paddingRight: 32,
      }}>
        {title}
      </RadixDialog.Title>

      {description && (
        <RadixDialog.Description style={{
          margin:     "0 0 24px",
          fontFamily: "Inter, sans-serif",
          fontSize:   14,
          color:      "#6B7280",
          lineHeight: "22px",
          textAlign:  "center",
        }}>
          {description}
        </RadixDialog.Description>
      )}

      {/* 2-col inline fields */}
      {inlineFields.length > 0 && (
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "14px 16px",
          marginBottom:        14,
        }}>
          {inlineFields.map(f => (
            <FieldControl key={f.id} field={f} value={values[f.id] ?? ""} onChange={onChange} />
          ))}
        </div>
      )}

      {/* Full-width fields */}
      {fullWidthFields.map(f => (
        <div key={f.id} style={{ marginBottom: 14 }}>
          <FieldControl field={f} value={values[f.id] ?? ""} onChange={onChange} />
        </div>
      ))}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: DialogFormField;
  value: string;
  onChange: (id: string, val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const fieldId = React.useId();

  const base: React.CSSProperties = {
    width:        "100%",
    boxSizing:    "border-box",
    borderRadius: 8,
    border:       `1px solid ${focused ? "#1D32FF" : "#D1D5DB"}`,
    boxShadow:    focused ? "0 0 0 3px rgba(29,50,255,0.10)" : "none",
    outline:      "none",
    fontFamily:   "Inter, sans-serif",
    fontSize:     14,
    color:        "#111827",
    background:   "#FFFFFF",
    transition:   "border-color 0.15s, box-shadow 0.15s",
  };

  return (
    <div>
      <label
        htmlFor={fieldId}
        style={{
          display:      "block",
          fontFamily:   "Inter, sans-serif",
          fontSize:     13,
          fontWeight:   500,
          color:        "#374151",
          marginBottom: 6,
        }}
      >
        {field.label}
        {field.required && <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={fieldId}
          value={value}
          placeholder={field.placeholder}
          onChange={e => onChange(field.id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={3}
          style={{ ...base, padding: "8px 12px", resize: "vertical", lineHeight: "22px" }}
        />
      ) : field.type === "select" ? (
        <select
          id={fieldId}
          value={value}
          onChange={e => onChange(field.id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, height: 38, padding: "0 12px", cursor: "pointer" }}
        >
          {field.placeholder && <option value="">{field.placeholder}</option>}
          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          id={fieldId}
          type={field.type ?? "text"}
          value={value}
          placeholder={field.placeholder}
          onChange={e => onChange(field.id, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, height: 38, padding: "0 12px" }}
        />
      )}
    </div>
  );
}

function ExportBody({
  exportFormats       = DEFAULT_EXPORT_FORMATS,
  exportPreviewRows,
  exportPreviewColumns,
  selectedFormat,
  onSelectFormat,
}: {
  exportFormats?:        DialogExportFormat[];
  exportPreviewRows?:    Array<Record<string, string | number>>;
  exportPreviewColumns?: string[];
  selectedFormat:        string;
  onSelectFormat:        (id: string) => void;
}) {
  const cols = exportPreviewColumns ?? ["Date", "Numeric", "TextField", "Date 2"];
  const rows = exportPreviewRows ?? [
    { Date: "Jan 2025", Numeric: "1,234", TextField: "Sample text", "Date 2": "Feb 2025" },
    { Date: "Mar 2025", Numeric: "5,678", TextField: "Another row", "Date 2": "Apr 2025" },
    { Date: "May 2025", Numeric: "9,012", TextField: "Third entry",  "Date 2": "Jun 2025" },
  ];

  return (
    <div style={{ padding: "24px 24px 20px" }}>
      {/* Hidden Radix title/description for a11y */}
      <RadixDialog.Title style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Export Data
      </RadixDialog.Title>
      <RadixDialog.Description style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Choose a format to export your data.
      </RadixDialog.Description>

      <div style={{ display: "flex", gap: 24 }}>
        {/* Left: format picker */}
        <div style={{ width: 184, flexShrink: 0 }}>
          <p style={{
            margin: "0 0 12px",
            fontFamily: "Inter, sans-serif",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF",
          }}>Format</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {exportFormats.map(fmt => (
              <FormatOption key={fmt.id} fmt={fmt} selected={selectedFormat === fmt.id} onSelect={() => onSelectFormat(fmt.id)} />
            ))}
          </div>
        </div>

        {/* Right: preview table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: "0 0 12px",
            fontFamily: "Inter, sans-serif",
            fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF",
          }}>Preview</p>
          <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              {cols.map(col => (
                <div key={col} style={{
                  flex: 1, padding: "8px 10px",
                  fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
                  color: "#6B7280", letterSpacing: "0.06em", textTransform: "uppercase",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{col}</div>
              ))}
            </div>
            {rows.map((row, ri) => (
              <div key={ri} style={{
                display: "flex", background: "#FFFFFF",
                borderBottom: ri < rows.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                {cols.map(col => (
                  <div key={col} style={{
                    flex: 1, padding: "9px 10px",
                    fontFamily: "Inter, sans-serif", fontSize: 12, color: "#374151",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{String(row[col] ?? "—")}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatOption({ fmt, selected, onSelect }: {
  fmt: DialogExportFormat;
  selected: boolean;
  onSelect: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          10,
        padding:      "8px 10px",
        borderRadius: 8,
        border:       selected ? `1.5px solid ${fmt.color}` : "1.5px solid transparent",
        background:   selected ? fmt.iconBg : (hov ? "#F9FAFB" : "transparent"),
        cursor:       "pointer",
        textAlign:    "left",
        transition:   "background 0.12s, border-color 0.12s",
        width:        "100%",
        boxSizing:    "border-box",
      }}
    >
      <div style={{
        width:          34, height:         34,
        borderRadius:   8,  background:     fmt.iconBg,
        display:        "flex", alignItems: "center", justifyContent: "center",
        flexShrink:     0,
      }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 800, color: fmt.color, letterSpacing: "0.02em" }}>
          {fmt.ext.replace(".", "").toUpperCase()}
        </span>
      </div>
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: selected ? 600 : 500, color: selected ? fmt.color : "#374151" }}>{fmt.label}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#9CA3AF" }}>{fmt.ext}</div>
      </div>
    </button>
  );
}

// ─── DialogCard — white card without backdrop (for inline demos) ──────────────

export interface DialogCardProps extends Omit<DialogProps, "open"> {
  formValues?:           Record<string, string>;
  onFieldChange?:        (id: string, val: string) => void;
  selectedExportFormat?: string;
  onSelectExportFormat?: (id: string) => void;
}

export function DialogCard({
  variant            = "simple",
  title,
  description,
  cancelLabel        = "Cancel",
  actionLabel        = "Confirm",
  onCancel,
  onAction,
  onClose,
  progressValue      = 72,
  progressLabel,
  listItems          = DEFAULT_LIST_ITEMS,
  fields             = DEFAULT_FORM_FIELDS,
  exportFormats      = DEFAULT_EXPORT_FORMATS,
  exportPreviewRows,
  exportPreviewColumns,
  formValues         = {},
  onFieldChange      = () => {},
  selectedExportFormat,
  onSelectExportFormat = () => {},
}: DialogCardProps) {
  const activeFmt = selectedExportFormat ?? exportFormats[0]?.id ?? "csv";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position:      "relative",
        width:         "100%",
        maxWidth:      DIALOG_WIDTH[variant],
        background:    "#FFFFFF",
        borderRadius:  12,
        boxShadow:     "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07)",
        display:       "flex",
        flexDirection: "column",
        overflow:      "hidden",
      }}
    >
      {/* Standalone close button (not Radix-connected, used in inline mode) */}
      <button
        onClick={onClose ?? onCancel}
        aria-label="Close dialog"
        style={{
          position:       "absolute",
          top:            16,
          right:          16,
          width:          28,
          height:         28,
          borderRadius:   "50%",
          border:         "none",
          background:     "transparent",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          padding:        0,
          zIndex:         1,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {variant === "simple" && <SimpleBody title={title} description={description} />}
      {variant === "list" && (
        <ListBody title={title} description={description} progressValue={progressValue} progressLabel={progressLabel} listItems={listItems} />
      )}
      {variant === "form" && (
        <FormBody title={title} description={description} fields={fields} values={formValues} onChange={onFieldChange} />
      )}
      {variant === "export" && (
        <ExportBody exportFormats={exportFormats} exportPreviewRows={exportPreviewRows} exportPreviewColumns={exportPreviewColumns} selectedFormat={activeFmt} onSelectFormat={onSelectExportFormat} />
      )}

      <DialogFooter
        cancelLabel={cancelLabel}
        actionLabel={actionLabel}
        onCancel={onCancel ?? onClose}
        onAction={onAction}
      />
    </div>
  );
}

// ─── Dialog — Radix-powered overlay modal ────────────────────────────────────

export function Dialog({
  open    = true,
  onClose,
  onCancel,
  onAction,
  onSubmit,
  variant = "simple",
  exportFormats = DEFAULT_EXPORT_FORMATS,
  fields  = DEFAULT_FORM_FIELDS,
  ...rest
}: DialogProps) {
  const [formValues,  setFormValues]  = useState<Record<string, string>>({});
  const [selectedFmt, setSelectedFmt] = useState(exportFormats[0]?.id ?? "csv");

  // Reset form when dialog opens
  useEffect(() => {
    if (open) setFormValues({});
  }, [open]);

  const handleFieldChange = useCallback((id: string, val: string) => {
    setFormValues(prev => ({ ...prev, [id]: val }));
  }, []);

  const handleAction = () => {
    if (variant === "form") onSubmit?.(formValues);
    onAction?.();
  };

  // onOpenChange fires on Esc key, backdrop click, and Radix Close buttons
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose?.();
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={handleOpenChange}>
      <RadixDialog.Portal>
        {/* Backdrop */}
        <RadixDialog.Overlay
          className="wl-dialog-overlay"
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         1000,
            background:     "rgba(17, 24, 39, 0.48)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Centered content wrapper */}
        <div style={{
          position:       "fixed",
          inset:          0,
          zIndex:         1001,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          padding:        24,
          pointerEvents:  "none",
        }}>
          <RadixDialog.Content
            className="wl-dialog-content"
            onEscapeKeyDown={() => onClose?.()}
            onPointerDownOutside={() => onClose?.()}
            style={{
              position:       "relative",
              width:          "100%",
              maxWidth:       DIALOG_WIDTH[variant],
              background:     "#FFFFFF",
              borderRadius:   12,
              boxShadow:      "0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              display:        "flex",
              flexDirection:  "column",
              overflow:       "hidden",
              maxHeight:      "90vh",
              overflowY:      "auto",
              pointerEvents:  "all",
            }}
          >
            {/* Radix Close × */}
            <CloseButton />

            {/* Variant body */}
            {variant === "simple" && <SimpleBody title={rest.title} description={rest.description} />}
            {variant === "list" && (
              <ListBody
                title={rest.title}
                description={rest.description}
                progressValue={rest.progressValue}
                progressLabel={rest.progressLabel}
                listItems={rest.listItems}
              />
            )}
            {variant === "form" && (
              <FormBody
                title={rest.title}
                description={rest.description}
                fields={fields}
                values={formValues}
                onChange={handleFieldChange}
              />
            )}
            {variant === "export" && (
              <ExportBody
                exportFormats={exportFormats}
                exportPreviewRows={rest.exportPreviewRows}
                exportPreviewColumns={rest.exportPreviewColumns}
                selectedFormat={selectedFmt}
                onSelectFormat={setSelectedFmt}
              />
            )}

            <DialogFooter
              cancelLabel={rest.cancelLabel}
              actionLabel={rest.actionLabel}
              onCancel={onCancel ?? onClose}
              onAction={handleAction}
            />
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
