import React, { createContext, useContext, useState, useId } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioSize = "xs" | "sm";

export interface RadioGroupProps {
  value?:       string;
  defaultValue?: string;
  onChange?:    (value: string) => void;
  name?:        string;
  disabled?:    boolean;
  error?:       boolean;
  children:     React.ReactNode;
  style?:       React.CSSProperties;
}

export interface RadioProps {
  value:        string;
  label?:       string;
  size?:        RadioSize;
  disabled?:    boolean;
  error?:       boolean;
  /** Used standalone (outside a group) — controlled checked state */
  checked?:     boolean;
  onChange?:    (value: string) => void;
  style?:       React.CSSProperties;
}

// ─── RadioGroup context ───────────────────────────────────────────────────────

interface RadioCtxValue {
  groupValue:    string;
  groupName:     string;
  groupDisabled: boolean;
  groupError:    boolean;
  select:        (value: string) => void;
}

const RadioCtx = createContext<RadioCtxValue | null>(null);

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE = {
  xs: { circle: 16, dot: 6,  fontSize: 13, gap: 6 },
  sm: { circle: 20, dot: 8,  fontSize: 14, gap: 8 },
} as const;

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export function RadioGroup({
  value,
  defaultValue = "",
  onChange,
  name,
  disabled = false,
  error    = false,
  children,
  style,
}: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const groupName = name ?? useId();
  const groupValue = value ?? internal;

  const select = (v: string) => {
    setInternal(v);
    onChange?.(v);
  };

  return (
    <RadioCtx.Provider value={{ groupValue, groupName, groupDisabled: disabled, groupError: error, select }}>
      <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10, ...style }}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  value,
  label,
  size      = "xs",
  disabled: propDisabled,
  error:    propError,
  checked:  propChecked,
  onChange,
  style,
}: RadioProps) {
  const ctx = useContext(RadioCtx);
  const id  = useId();

  const [hov,     setHov]     = useState(false);
  const [focused, setFocused] = useState(false);

  const disabled = propDisabled ?? ctx?.groupDisabled ?? false;
  const error    = propError    ?? ctx?.groupError    ?? false;
  const checked  = propChecked  ?? (ctx ? ctx.groupValue === value : false);
  const name     = ctx?.groupName;

  const cfg = SIZE[size];

  // ── Visual ring/border computation ───────────────────────────────────────
  let borderColor  = "#D1D5DB";
  let fillColor    = "transparent";
  let boxShadow: string | undefined;
  let labelColor   = "#374151";

  if (disabled) {
    borderColor = "#E5E7EB";
    labelColor  = "#A3A3A3";
    if (checked) fillColor = "#D1D5DB";
  } else if (error) {
    borderColor = "#EF4444";
    labelColor  = "#EF4444";
    if (checked) { fillColor = "#EF4444"; borderColor = "#EF4444"; }
    if (focused) boxShadow = "0 0 0 3px rgba(239,68,68,0.18)";
  } else if (checked) {
    fillColor   = "var(--color-bg-brand-primary, #1D32FF)";
    borderColor = "var(--color-bg-brand-primary, #1D32FF)";
    if (focused) boxShadow = "var(--shadow-input-brand, 0 0 0 3px rgba(29,50,255,0.18))";
  } else if (focused) {
    borderColor = "var(--color-border-brand, #1D32FF)";
    boxShadow   = "var(--shadow-input-brand, 0 0 0 3px rgba(29,50,255,0.18))";
  } else if (hov && !disabled) {
    borderColor = "#9CA3AF";
  }

  const handleChange = () => {
    if (disabled) return;
    ctx?.select(value);
    onChange?.(value);
  };

  return (
    <label
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        cfg.gap,
        cursor:     disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        ...style,
      }}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Hidden native input for semantics + keyboard */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        id={id}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0, pointerEvents: "none" }}
      />

      {/* Custom circle */}
      <div
        aria-hidden="true"
        style={{
          width:        cfg.circle,
          height:       cfg.circle,
          borderRadius: "50%",
          border:       `2px solid ${borderColor}`,
          background:   fillColor === "transparent" ? "#FFFFFF" : fillColor,
          boxShadow,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          flexShrink:   0,
          transition:   "border-color 0.12s, background 0.12s, box-shadow 0.12s",
          boxSizing:    "border-box",
        }}
      >
        {/* Inner dot — shown when checked */}
        {checked && (
          <div style={{
            width:        cfg.dot,
            height:       cfg.dot,
            borderRadius: "50%",
            background:   disabled ? "#9CA3AF" : "#FFFFFF",
          }} />
        )}
      </div>

      {/* Label */}
      {label && (
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize:   cfg.fontSize,
          fontWeight: 400,
          color:      labelColor,
          lineHeight: "1.4",
          transition: "color 0.12s",
        }}>
          {label}
        </span>
      )}
    </label>
  );
}
