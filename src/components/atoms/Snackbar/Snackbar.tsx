import React, { useState, createContext, useContext, useCallback } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { IconCheck161, IconWarning16, IconClose161, IconInfo16 } from "../Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * "success"     — green  #22C55E
 * "warning"     — orange #F97316
 * "critical"    — red    #EF4444
 * "information" — dark   #1E293B
 */
export type SnackbarType = "success" | "warning" | "critical" | "information";

export type SnackbarPosition =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right"
  | "top-left";

export interface SnackbarAction {
  /** Button label shown inside the snackbar (e.g. "Undo") */
  label:   string;
  onClick: () => void;
}

export interface SnackbarItem {
  id:        string;
  type:      SnackbarType;
  message:   string;
  /** ms — pass 0 for persistent; default 4 000 */
  duration?: number;
  action?:   SnackbarAction;
}

export interface SnackbarContainerProps {
  children:  React.ReactNode;
  position?: SnackbarPosition;
}

// ─── Visual config per type ───────────────────────────────────────────────────

const TYPE_CONFIG: Record<SnackbarType, { bg: string; divider: string; text: string }> = {
  success:     { bg: "#22C55E", divider: "#16A34A", text: "#F0FDF4" },
  warning:     { bg: "#F97316", divider: "#EA580C", text: "#FFF7ED" },
  critical:    { bg: "#EF4444", divider: "#DC2626", text: "#FEF2F2" },
  information: { bg: "#1E293B", divider: "#334155", text: "#F8FAFC" },
};

// ─── Type icon (SVG) ──────────────────────────────────────────────────────────

function TypeIcon({ type, color }: { type: SnackbarType; color: string }) {
  switch (type) {
    case "success":     return <IconCheck161  size={20} color={color} style={{ flexShrink: 0 }} />;
    case "warning":     return <IconWarning16 size={20} color={color} style={{ flexShrink: 0 }} />;
    case "critical":    return <IconClose161  size={20} color={color} style={{ flexShrink: 0 }} />;
    case "information": return <IconInfo16    size={20} color={color} style={{ flexShrink: 0 }} />;
  }
}

// ─── Viewport position styles ─────────────────────────────────────────────────

function viewportStyle(pos: SnackbarPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position:      "fixed",
    zIndex:        9999,
    listStyle:     "none",
    display:       "flex",
    flexDirection: "column",
    gap:           8,
    margin:        0,
    padding:       0,
    outline:       "none",
  };
  switch (pos) {
    case "bottom-center": return { ...base, bottom: 24, left: "50%", transform: "translateX(-50%)", alignItems: "center" };
    case "bottom-right":  return { ...base, bottom: 24, right: 24, alignItems: "flex-end" };
    case "bottom-left":   return { ...base, bottom: 24, left:  24, alignItems: "flex-start" };
    case "top-center":    return { ...base, top:    24, left: "50%", transform: "translateX(-50%)", alignItems: "center" };
    case "top-right":     return { ...base, top:    24, right: 24, alignItems: "flex-end" };
    case "top-left":      return { ...base, top:    24, left:  24, alignItems: "flex-start" };
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface SnackbarContextValue {
  show:        (type: SnackbarType, message: string, duration?: number, action?: SnackbarAction) => void;
  success:     (message: string, action?: SnackbarAction, duration?: number) => void;
  warning:     (message: string, action?: SnackbarAction, duration?: number) => void;
  critical:    (message: string, action?: SnackbarAction, duration?: number) => void;
  info:        (message: string, action?: SnackbarAction, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used inside <SnackbarContainer>");
  return ctx;
}

// ─── Container ────────────────────────────────────────────────────────────────

export function SnackbarContainer({
  children,
  position = "bottom-center",
}: SnackbarContainerProps) {
  const [items, setItems] = useState<SnackbarItem[]>([]);

  const add = useCallback((
    type:      SnackbarType,
    message:   string,
    duration   = 4000,
    action?:   SnackbarAction,
  ) => {
    const id = `snackbar-${Date.now()}-${Math.random()}`;
    setItems(prev => [...prev, { id, type, message, duration, action }]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(x => x.id !== id));
  }, []);

  const ctx: SnackbarContextValue = {
    show:     (type, message, duration, action)  => add(type, message, duration ?? 4000, action),
    success:  (message, action, duration)        => add("success",     message, duration ?? 4000, action),
    warning:  (message, action, duration)        => add("warning",     message, duration ?? 4000, action),
    critical: (message, action, duration)        => add("critical",    message, duration ?? 4000, action),
    info:     (message, action, duration)        => add("information", message, duration ?? 4000, action),
  };

  // swipe direction matches the edge the snackbar lives on
  const swipe = position.includes("right") ? "right"
    : position.includes("left")  ? "left"
    : position.startsWith("top") ? "up"
    : "up";

  return (
    <SnackbarContext.Provider value={ctx}>
      <RadixToast.Provider swipeDirection={swipe}>
        {children}

        {items.map(item => (
          <SingleSnackbar
            key={item.id}
            item={item}
            position={position}
            onClose={() => remove(item.id)}
          />
        ))}

        <RadixToast.Viewport style={viewportStyle(position)} />
      </RadixToast.Provider>
    </SnackbarContext.Provider>
  );
}

// ─── Single snackbar pill ─────────────────────────────────────────────────────

function SingleSnackbar({
  item,
  position,
  onClose,
}: {
  item:     SnackbarItem;
  position: SnackbarPosition;
  onClose:  () => void;
}) {
  const cfg = TYPE_CONFIG[item.type];

  return (
    <RadixToast.Root
      duration={item.duration === 0 ? Infinity : (item.duration ?? 4000)}
      onOpenChange={open => { if (!open) onClose(); }}
      className="wl-snackbar"
      data-pos={position}
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        height:       48,
        borderRadius: 16,
        background:   cfg.bg,
        overflow:     "hidden",
        boxShadow:    "0 4px 16px rgba(0,0,0,0.20), 0 1px 3px rgba(0,0,0,0.08)",
        flexShrink:   0,
        maxWidth:     400,
        minWidth:     260,
      }}
    >
      {/* Left: icon + message ─────────────────────────────────────── */}
      <div style={{
        display:    "flex",
        alignItems: "center",
        gap:        8,
        padding:    "0 12px 0 16px",
        flex:       1,
        overflow:   "hidden",
        minWidth:   0,
      }}>
        <TypeIcon type={item.type} color={cfg.text} />
        <RadixToast.Title
          style={{
            fontFamily:   "Inter, sans-serif",
            fontSize:     14,
            fontWeight:   500,
            color:        cfg.text,
            lineHeight:   "20px",
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.message}
        </RadixToast.Title>
      </div>

      {/* Right: optional action + divider + close ────────────────── */}
      <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        {item.action && (
          <RadixToast.Action
            altText={item.action.label}
            onClick={item.action.onClick}
            style={{
              height:       32,
              padding:      "0 10px",
              borderRadius: 8,
              border:       `1px solid rgba(255,255,255,0.55)`,
              background:   "rgba(255,255,255,0.14)",
              color:        cfg.text,
              fontFamily:   "Inter, sans-serif",
              fontSize:     13,
              fontWeight:   500,
              cursor:       "pointer",
              lineHeight:   "16px",
              marginRight:  8,
              whiteSpace:   "nowrap",
              outline:      "none",
              transition:   "background 0.12s",
            }}
          >
            {item.action.label}
          </RadixToast.Action>
        )}

        {/* Divider + close button area (48 × 48 — matches Figma) */}
        <div style={{
          width:          48,
          height:         48,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          borderLeft:     `1px solid ${cfg.divider}`,
          flexShrink:     0,
        }}>
          <RadixToast.Close
            style={{
              width:      48,
              height:     48,
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              border:     "none",
              background: "transparent",
              color:      `rgba(255,255,255,0.75)`,
              cursor:     "pointer",
              fontSize:   18,
              outline:    "none",
              transition: "color 0.12s",
            }}
            aria-label="Dismiss"
          >
            ×
          </RadixToast.Close>
        </div>
      </div>
    </RadixToast.Root>
  );
}
