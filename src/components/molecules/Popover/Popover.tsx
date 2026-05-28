import React, { useState } from "react";
import * as RadixPopover from "@radix-ui/react-popover";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverSide  = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  /** The trigger element that opens the popover */
  children:       React.ReactNode;
  title?:         string;
  description?:   string;
  /** Left/"cancel" button label (blue text) */
  cancelLabel?:   string;
  /** Right/"action" button label (dark outline) */
  actionLabel?:   string;
  onCancel?:      () => void;
  onAction?:      () => void;
  /** Which side of the trigger the popover appears on */
  side?:          PopoverSide;
  /** Alignment along the cross-axis */
  align?:         PopoverAlign;
  /** Pixel gap between trigger and card (default 8) */
  sideOffset?:    number;
  open?:          boolean;
  defaultOpen?:   boolean;
  onOpenChange?:  (open: boolean) => void;
  /** Max width of the popover card */
  maxWidth?:      number;
  style?:         React.CSSProperties;
}

// ─── Popover ──────────────────────────────────────────────────────────────────

export function Popover({
  children,
  title        = "Popover Title",
  description  = "Write a single or two lines to explain specific objective.",
  cancelLabel  = "Cancel",
  actionLabel  = "Confirm",
  onCancel,
  onAction,
  side         = "top",
  align        = "start",
  sideOffset   = 8,
  open,
  defaultOpen,
  onOpenChange,
  maxWidth     = 260,
  style,
}: PopoverProps) {
  return (
    <RadixPopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <RadixPopover.Trigger asChild>
        <span style={{ display: "inline-flex" }}>{children}</span>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className="wl-popover"
          style={{
            width:        maxWidth,
            background:   "#FFFFFF",
            borderRadius: 14,
            border:       "1px solid #E5E7EB",
            boxShadow:    "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            padding:      "16px 20px 14px",
            display:      "flex",
            flexDirection:"column",
            gap:          10,
            zIndex:       9990,
            outline:      "none",
            ...style,
          }}
        >
          {/* Title */}
          <span style={{
            fontFamily:  "Inter, sans-serif",
            fontSize:    16,
            fontWeight:  700,
            color:       "#111827",
            lineHeight:  "24px",
            display:     "block",
          }}>
            {title}
          </span>

          {/* Description */}
          {description && (
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize:   13,
              fontWeight: 400,
              color:      "#6B7280",
              lineHeight: "20px",
              display:    "block",
            }}>
              {description}
            </span>
          )}

          {/* Footer buttons */}
          <div style={{
            display:        "flex",
            justifyContent: "flex-end",
            alignItems:     "center",
            gap:            8,
            marginTop:      2,
          }}>
            {/* Cancel — text/link style in brand blue */}
            <RadixPopover.Close asChild>
              <CancelBtn label={cancelLabel} onClick={onCancel} />
            </RadixPopover.Close>

            {/* Action — dark outline style */}
            <RadixPopover.Close asChild>
              <ActionBtn label={actionLabel} onClick={onAction} />
            </RadixPopover.Close>
          </div>

          {/* Arrow/tail */}
          <RadixPopover.Arrow
            width={14}
            height={7}
            style={{ fill: "#FFFFFF", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.08))" }}
          />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

// ─── Button sub-components ────────────────────────────────────────────────────

const CancelBtn = React.forwardRef<HTMLButtonElement, { label: string; onClick?: () => void }>(
  ({ label, onClick, ...rest }, ref) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height:       32,
          padding:      "0 12px",
          background:   hov ? "#EEF1FF" : "transparent",
          border:       "none",
          borderRadius: 8,
          cursor:       "pointer",
          fontFamily:   "Inter, sans-serif",
          fontSize:     13,
          fontWeight:   500,
          color:        "var(--color-text-brand, #1D32FF)",
          transition:   "background 0.12s",
        }}
        {...rest}
      >
        {label}
      </button>
    );
  }
);
CancelBtn.displayName = "CancelBtn";

const ActionBtn = React.forwardRef<HTMLButtonElement, { label: string; onClick?: () => void }>(
  ({ label, onClick, ...rest }, ref) => {
    const [hov, setHov] = useState(false);
    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height:       32,
          padding:      "0 14px",
          background:   hov ? "#F9FAFB" : "#FFFFFF",
          border:       "1.5px solid #111827",
          borderRadius: 8,
          cursor:       "pointer",
          fontFamily:   "Inter, sans-serif",
          fontSize:     13,
          fontWeight:   500,
          color:        "#111827",
          transition:   "background 0.12s",
        }}
        {...rest}
      >
        {label}
      </button>
    );
  }
);
ActionBtn.displayName = "ActionBtn";
