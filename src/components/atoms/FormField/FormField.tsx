import React, { useState, useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Input variant — from Figma node 215:423
 *
 *  text       — single-line text, optional tags + clear button
 *  numeric    — right-aligned number input
 *  comboLeft  — [Select ∨] | [text input]
 *  comboRight — [text input] | [Select ∨]
 *  textarea   — multi-line text area
 */
export type FormFieldType =
  | "text"
  | "numeric"
  | "comboLeft"
  | "comboRight"
  | "textarea";

export interface FormFieldProps {
  type?: FormFieldType;

  // ── Label ──────────────────────────────────────────────────────────────────
  /** Label text shown above the field */
  label?: string;
  /** Adds a red * required marker */
  required?: boolean;

  // ── Input ──────────────────────────────────────────────────────────────────
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;

  // ── Combo select (comboLeft / comboRight) ──────────────────────────────────
  selectValue?: string;
  selectPlaceholder?: string;
  onSelectChange?: (value: string) => void;

  // ── Tags variant (text type with selected pills) ───────────────────────────
  /** Tags shown as pills inside the field */
  tags?: string[];
  /** Extra count badge: "+N more" */
  additionalTagCount?: number;
  /** Called when the clear × button is clicked */
  onClear?: () => void;

  // ── Visual states ──────────────────────────────────────────────────────────
  /** Red border + shadow */
  error?: boolean;
  /** Green border + shadow */
  success?: boolean;
  /** Grays out the field, blocks input */
  disabled?: boolean;

  style?: React.CSSProperties;
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

function getBorderColor(
  focused: boolean,
  error?: boolean,
  success?: boolean,
  disabled?: boolean
): string {
  if (disabled) return "#E5E7EB";
  if (error)    return "#E1232E";
  if (success)  return "#22C55E";
  if (focused)  return "#1D32FF";
  return "#D1D5DB";
}

function getBoxShadow(
  focused: boolean,
  error?: boolean,
  success?: boolean,
  disabled?: boolean
): string | undefined {
  if (disabled) return undefined;
  if (error)    return "0 0 0 3px rgba(225,35,46,0.10)";
  if (success)  return "0 0 0 3px rgba(34,197,94,0.10)";
  if (focused)  return "0 0 0 3px rgba(29,50,255,0.10)";
  return undefined;
}

const FIELD_RADIUS = 8;
const FIELD_HEIGHT = 36;

const INPUT_TEXT: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "18px",
  color: "#171717",
  background: "transparent",
  border: "none",
  outline: "none",
  padding: 0,
  width: "100%",
};

const PLACEHOLDER_COLOR = "#9CA3AF";

// ─── Mini SVG icons ───────────────────────────────────────────────────────────

function ChevronDown({ color = "#6B7280" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClearIcon({ color = "#9CA3AF" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill={color} fillOpacity="0.2" />
      <path d="M9 5l-4 4M5 5l4 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Label row ────────────────────────────────────────────────────────────────

function FieldLabel({ label, required }: { label?: string; required?: boolean }) {
  if (!label) return null;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 2,
      marginBottom: 6,
    }}>
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "16px",
        color: "#171717",
      }}>
        {label}
      </span>
      {required && (
        <span style={{ fontSize: 12, fontWeight: 600, color: "#E1232E", lineHeight: "16px" }}>
          *
        </span>
      )}
    </div>
  );
}

// ─── Outer field shell ────────────────────────────────────────────────────────

function FieldShell({
  focused, error, success, disabled, children, style, onClick,
}: {
  focused: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: FIELD_HEIGHT,
        borderRadius: FIELD_RADIUS,
        border: `1.5px solid ${getBorderColor(focused, error, success, disabled)}`,
        background: disabled ? "#F5F5F5" : "#FFFFFF",
        boxShadow: getBoxShadow(focused, error, success, disabled),
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "border-color 0.15s, box-shadow 0.15s",
        cursor: disabled ? "not-allowed" : "text",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Text field ───────────────────────────────────────────────────────────────

function TextField({
  placeholder, value, onChange, disabled,
  tags, additionalTagCount, onClear,
  onFocus, onBlur,
}: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; tags?: string[]; additionalTagCount?: number;
  onClear?: () => void; onFocus: () => void; onBlur: () => void;
}) {
  const hasTags = tags && tags.length > 0;
  const showClear = (value || hasTags) && !disabled;

  return (
    <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 6, padding: "0 10px", minWidth: 0 }}>
      {/* Tags */}
      {hasTags && tags!.map((t, i) => (
        <span key={i} style={{
          display: "inline-flex", alignItems: "center",
          padding: "2px 6px", borderRadius: 4,
          background: "#F3F4F6", border: "1px solid #E5E7EB",
          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
          color: "#4B5563", whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {t}
        </span>
      ))}
      {additionalTagCount && additionalTagCount > 0 ? (
        <span style={{
          display: "inline-flex", alignItems: "center",
          padding: "2px 6px", borderRadius: 4,
          background: "#F3F4F6", border: "1px solid #E5E7EB",
          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 500,
          color: "#6B7280", whiteSpace: "nowrap", flexShrink: 0,
        }}>
          +{additionalTagCount} more
        </span>
      ) : null}

      {/* Text input */}
      <input
        type="text"
        value={value ?? ""}
        placeholder={hasTags ? "" : placeholder}
        disabled={disabled}
        onChange={e => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          ...INPUT_TEXT,
          flex: 1,
          color: disabled ? "#A3A3A3" : "#171717",
          cursor: disabled ? "not-allowed" : "text",
        }}
      />

      {/* Clear button */}
      {showClear && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); onClear?.(); onChange?.(""); }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", padding: 0,
            cursor: "pointer", flexShrink: 0,
          }}
          aria-label="Clear"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
}

// ─── Numeric field ────────────────────────────────────────────────────────────

function NumericField({
  placeholder = "0.00", value, onChange, disabled, onFocus, onBlur,
}: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      onChange={e => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...INPUT_TEXT,
        flex: 1,
        textAlign: "right",
        fontVariantNumeric: "tabular-nums",
        padding: "0 12px",
        color: disabled ? "#A3A3A3" : "#171717",
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  );
}

// ─── Select part (used in combo fields) ──────────────────────────────────────

function SelectPart({
  value, placeholder = "Choose", disabled, onChange,
  width = 96, onFocus, onBlur,
}: {
  value?: string; placeholder?: string; disabled?: boolean;
  onChange?: (v: string) => void; width?: number;
  onFocus: () => void; onBlur: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 4, width, minWidth: width, flexShrink: 0,
        padding: "0 10px", height: "100%",
        background: "transparent", border: "none", cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400,
        color: value ? (disabled ? "#A3A3A3" : "#171717") : PLACEHOLDER_COLOR,
        overflow: "hidden",
      }}
    >
      <span style={{
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
        textAlign: "left",
      }}>
        {value ?? placeholder}
      </span>
      <ChevronDown color={disabled ? "#D1D5DB" : "#6B7280"} />
    </button>
  );
}

// ─── Combo divider ────────────────────────────────────────────────────────────

function ComboDivider({ focused, error, success, disabled }: {
  focused: boolean; error?: boolean; success?: boolean; disabled?: boolean;
}) {
  return (
    <div style={{
      width: 1, alignSelf: "stretch",
      background: getBorderColor(focused, error, success, disabled),
      opacity: 0.6, flexShrink: 0,
    }} />
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

function TextareaField({
  placeholder, value, onChange, disabled, onFocus, onBlur,
}: {
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <textarea
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      onChange={e => onChange?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        ...INPUT_TEXT,
        resize: "none",
        minHeight: 72,
        padding: "9px 12px",
        width: "100%",
        boxSizing: "border-box",
        color: disabled ? "#A3A3A3" : "#171717",
        cursor: disabled ? "not-allowed" : "text",
      }}
    />
  );
}

// ─── FormField (public) ───────────────────────────────────────────────────────

export function FormField({
  type = "text",
  label,
  required,
  placeholder = "Placeholder",
  value,
  onChange,
  selectValue,
  selectPlaceholder = "Choose",
  onSelectChange,
  tags,
  additionalTagCount,
  onClear,
  error,
  success,
  disabled,
  style,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  const id = useId();

  const fo = () => setFocused(true);
  const bl = () => setFocused(false);

  const isTextarea = type === "textarea";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", ...style }}>
      {label && <FieldLabel label={label} required={required} />}

      {/* ── textarea shell ── */}
      {isTextarea ? (
        <div style={{
          width: "100%",
          borderRadius: FIELD_RADIUS,
          border: `1.5px solid ${getBorderColor(focused, error, success, disabled)}`,
          background: disabled ? "#F5F5F5" : "#FFFFFF",
          boxShadow: getBoxShadow(focused, error, success, disabled),
          boxSizing: "border-box",
          overflow: "hidden",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}>
          <TextareaField
            placeholder={placeholder} value={value}
            onChange={onChange} disabled={disabled}
            onFocus={fo} onBlur={bl}
          />
        </div>
      ) : (

        /* ── all single-line shells ── */
        <FieldShell
          focused={focused} error={error} success={success} disabled={disabled}
        >
          {type === "text" && (
            <TextField
              placeholder={placeholder} value={value} onChange={onChange}
              disabled={disabled} tags={tags}
              additionalTagCount={additionalTagCount}
              onClear={onClear} onFocus={fo} onBlur={bl}
            />
          )}

          {type === "numeric" && (
            <NumericField
              placeholder={placeholder} value={value} onChange={onChange}
              disabled={disabled} onFocus={fo} onBlur={bl}
            />
          )}

          {type === "comboLeft" && (
            <>
              <SelectPart
                value={selectValue} placeholder={selectPlaceholder}
                onChange={onSelectChange} disabled={disabled}
                onFocus={fo} onBlur={bl}
              />
              <ComboDivider focused={focused} error={error} success={success} disabled={disabled} />
              <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 10px", minWidth: 0 }}>
                <input
                  type="text"
                  value={value ?? ""}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={e => onChange?.(e.target.value)}
                  onFocus={fo} onBlur={bl}
                  style={{ ...INPUT_TEXT, color: disabled ? "#A3A3A3" : "#171717", cursor: disabled ? "not-allowed" : "text" }}
                />
              </div>
            </>
          )}

          {type === "comboRight" && (
            <>
              <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 10px", minWidth: 0 }}>
                <input
                  type="text"
                  value={value ?? ""}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={e => onChange?.(e.target.value)}
                  onFocus={fo} onBlur={bl}
                  style={{ ...INPUT_TEXT, color: disabled ? "#A3A3A3" : "#171717", cursor: disabled ? "not-allowed" : "text" }}
                />
              </div>
              <ComboDivider focused={focused} error={error} success={success} disabled={disabled} />
              <SelectPart
                value={selectValue} placeholder={selectPlaceholder}
                onChange={onSelectChange} disabled={disabled}
                onFocus={fo} onBlur={bl}
              />
            </>
          )}
        </FieldShell>
      )}
    </div>
  );
}
