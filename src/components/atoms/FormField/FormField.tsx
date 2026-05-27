import React, { useState, useId } from "react";
import * as RadixLabel  from "@radix-ui/react-label";
import * as RadixSelect from "@radix-ui/react-select";

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
  label?: string;
  required?: boolean;

  // ── Input ──────────────────────────────────────────────────────────────────
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;

  // ── Combo select ──────────────────────────────────────────────────────────
  selectValue?: string;
  selectPlaceholder?: string;
  selectOptions?: string[];   // options for the Radix Select dropdown
  onSelectChange?: (value: string) => void;

  // ── Tags ──────────────────────────────────────────────────────────────────
  tags?: string[];
  additionalTagCount?: number;
  onClear?: () => void;

  // ── Visual states ──────────────────────────────────────────────────────────
  error?: boolean;
  success?: boolean;
  disabled?: boolean;

  style?: React.CSSProperties;
}

// ─── Style helpers ────────────────────────────────────────────────────────────

function getBorderColor(focused: boolean, error?: boolean, success?: boolean, disabled?: boolean): string {
  if (disabled) return "#E5E7EB";
  if (error)    return "#E1232E";
  if (success)  return "#22C55E";
  if (focused)  return "#1D32FF";
  return "#D1D5DB";
}

function getBoxShadow(focused: boolean, error?: boolean, success?: boolean, disabled?: boolean): string | undefined {
  if (disabled) return undefined;
  if (error)    return "0 0 0 3px rgba(225,35,46,0.10)";
  if (success)  return "0 0 0 3px rgba(34,197,94,0.10)";
  if (focused)  return "0 0 0 3px rgba(29,50,255,0.10)";
  return undefined;
}

const FIELD_RADIUS = 8;
const FIELD_HEIGHT = 36;
const PLACEHOLDER_COLOR = "#9CA3AF";

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

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6l3 3 5-6" stroke="#1D32FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Radix Select replacement for SelectPart ─────────────────────────────────

function SelectPart({
  value, placeholder = "Choose", disabled, options = [],
  onChange, width = 96, onOpenChange,
}: {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  options?: string[];
  onChange?: (v: string) => void;
  width?: number;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <RadixSelect.Root
      value={value ?? ""}
      onValueChange={onChange}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <RadixSelect.Trigger
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            4,
          width,
          minWidth:       width,
          flexShrink:     0,
          padding:        "0 10px",
          height:         "100%",
          minHeight:      FIELD_HEIGHT,
          background:     "transparent",
          border:         "none",
          cursor:         disabled ? "not-allowed" : "pointer",
          fontFamily:     "Inter, sans-serif",
          fontSize:       13,
          fontWeight:     400,
          color:          value ? (disabled ? "#A3A3A3" : "#171717") : PLACEHOLDER_COLOR,
          outline:        "none",
          boxSizing:      "border-box",
        }}
      >
        <RadixSelect.Value placeholder={placeholder}>
          <span style={{
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            flex: 1, textAlign: "left", display: "block",
          }}>
            {value || placeholder}
          </span>
        </RadixSelect.Value>
        <RadixSelect.Icon>
          <ChevronDown color={disabled ? "#D1D5DB" : "#6B7280"} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="wl-select-content"
          position="popper"
          sideOffset={4}
          style={{
            background:   "#FFFFFF",
            borderRadius: 10,
            border:       "1px solid #E5E7EB",
            boxShadow:    "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)",
            zIndex:       9999,
            overflow:     "hidden",
            minWidth:     "var(--radix-select-trigger-width)",
          }}
        >
          <RadixSelect.Viewport style={{ padding: "4px" }}>
            {options.map(opt => (
              <SelectItem key={opt} value={opt} />
            ))}
            {options.length === 0 && (
              <div style={{ padding: "8px 12px", fontFamily: "Inter, sans-serif", fontSize: 13, color: "#9CA3AF" }}>
                No options
              </div>
            )}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

function SelectItem({ value }: { value: string }) {
  return (
    <RadixSelect.Item
      value={value}
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "7px 10px 7px 12px",
        borderRadius:   6,
        cursor:         "pointer",
        fontFamily:     "Inter, sans-serif",
        fontSize:       13,
        color:          "#171717",
        outline:        "none",
        userSelect:     "none",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#F3F4F6")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      onFocus={e    => (e.currentTarget.style.background = "#F3F4F6")}
      onBlur={e     => (e.currentTarget.style.background = "transparent")}
    >
      <RadixSelect.ItemText>{value}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
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

// ─── Text field ───────────────────────────────────────────────────────────────

function TextField({
  id, placeholder, value, onChange, disabled,
  tags, additionalTagCount, onClear, onFocus, onBlur,
}: {
  id?: string;
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; tags?: string[]; additionalTagCount?: number;
  onClear?: () => void; onFocus: () => void; onBlur: () => void;
}) {
  const hasTags = tags && tags.length > 0;
  const showClear = (value || hasTags) && !disabled;
  return (
    <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 6, padding: "0 10px", minWidth: 0 }}>
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
      <input
        id={id}
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
  id, placeholder = "0.00", value, onChange, disabled, onFocus, onBlur,
}: {
  id?: string;
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <input
      id={id}
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

// ─── Textarea ─────────────────────────────────────────────────────────────────

function TextareaField({
  id, placeholder, value, onChange, disabled, onFocus, onBlur,
}: {
  id?: string;
  placeholder?: string; value?: string; onChange?: (v: string) => void;
  disabled?: boolean; onFocus: () => void; onBlur: () => void;
}) {
  return (
    <textarea
      id={id}
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

// ─── Field shell ──────────────────────────────────────────────────────────────

function FieldShell({
  focused, error, success, disabled, children, style,
}: {
  focused: boolean; error?: boolean; success?: boolean; disabled?: boolean;
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div style={{
      display:    "flex",
      alignItems: "stretch",
      width:      "100%",
      minHeight:  FIELD_HEIGHT,
      borderRadius: FIELD_RADIUS,
      border:     `1.5px solid ${getBorderColor(focused, error, success, disabled)}`,
      background: disabled ? "#F5F5F5" : "#FFFFFF",
      boxShadow:  getBoxShadow(focused, error, success, disabled),
      boxSizing:  "border-box",
      overflow:   "hidden",
      transition: "border-color 0.15s, box-shadow 0.15s",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── FormField (public) ───────────────────────────────────────────────────────

export function FormField({
  type                = "text",
  label,
  required,
  placeholder         = "Placeholder",
  value,
  onChange,
  selectValue,
  selectPlaceholder   = "Choose",
  selectOptions       = ["Option 1", "Option 2", "Option 3"],
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
  const inputId = useId();

  const fo = () => setFocused(true);
  const bl = () => setFocused(false);

  const isTextarea = type === "textarea";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", ...style }}>
      {/* Radix Label — properly linked via htmlFor */}
      {label && (
        <RadixLabel.Root
          htmlFor={inputId}
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          2,
            marginBottom: 6,
            fontFamily:   "Inter, sans-serif",
            fontSize:     12,
            fontWeight:   500,
            lineHeight:   "16px",
            color:        disabled ? "#9CA3AF" : "#171717",
            cursor:       disabled ? "not-allowed" : "default",
            userSelect:   "none",
          }}
        >
          {label}
          {required && (
            <span style={{ fontSize: 12, fontWeight: 600, color: "#E1232E" }}>*</span>
          )}
        </RadixLabel.Root>
      )}

      {/* ── Textarea ── */}
      {isTextarea ? (
        <div style={{
          width:        "100%",
          borderRadius: FIELD_RADIUS,
          border:       `1.5px solid ${getBorderColor(focused, error, success, disabled)}`,
          background:   disabled ? "#F5F5F5" : "#FFFFFF",
          boxShadow:    getBoxShadow(focused, error, success, disabled),
          boxSizing:    "border-box",
          overflow:     "hidden",
          transition:   "border-color 0.15s, box-shadow 0.15s",
        }}>
          <TextareaField
            id={inputId}
            placeholder={placeholder} value={value}
            onChange={onChange} disabled={disabled}
            onFocus={fo} onBlur={bl}
          />
        </div>
      ) : (
        <FieldShell focused={focused} error={error} success={success} disabled={disabled}>

          {type === "text" && (
            <TextField
              id={inputId}
              placeholder={placeholder} value={value} onChange={onChange}
              disabled={disabled} tags={tags}
              additionalTagCount={additionalTagCount}
              onClear={onClear} onFocus={fo} onBlur={bl}
            />
          )}

          {type === "numeric" && (
            <NumericField
              id={inputId}
              placeholder={placeholder} value={value} onChange={onChange}
              disabled={disabled} onFocus={fo} onBlur={bl}
            />
          )}

          {type === "comboLeft" && (
            <>
              <SelectPart
                value={selectValue}
                placeholder={selectPlaceholder}
                options={selectOptions}
                onChange={onSelectChange}
                disabled={disabled}
                onOpenChange={open => { if (open) fo(); else bl(); }}
              />
              <ComboDivider focused={focused} error={error} success={success} disabled={disabled} />
              <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 10px", minWidth: 0 }}>
                <input
                  id={inputId}
                  type="text"
                  value={value ?? ""}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={e => onChange?.(e.target.value)}
                  onFocus={fo} onBlur={bl}
                  aria-required={required}
                  aria-invalid={error}
                  style={{ ...INPUT_TEXT, color: disabled ? "#A3A3A3" : "#171717", cursor: disabled ? "not-allowed" : "text" }}
                />
              </div>
            </>
          )}

          {type === "comboRight" && (
            <>
              <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 10px", minWidth: 0 }}>
                <input
                  id={inputId}
                  type="text"
                  value={value ?? ""}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={e => onChange?.(e.target.value)}
                  onFocus={fo} onBlur={bl}
                  aria-required={required}
                  aria-invalid={error}
                  style={{ ...INPUT_TEXT, color: disabled ? "#A3A3A3" : "#171717", cursor: disabled ? "not-allowed" : "text" }}
                />
              </div>
              <ComboDivider focused={focused} error={error} success={success} disabled={disabled} />
              <SelectPart
                value={selectValue}
                placeholder={selectPlaceholder}
                options={selectOptions}
                onChange={onSelectChange}
                disabled={disabled}
                onOpenChange={open => { if (open) fo(); else bl(); }}
              />
            </>
          )}
        </FieldShell>
      )}
    </div>
  );
}
