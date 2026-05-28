import React, { createContext, useContext, useCallback, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { IconClose16, IconCheck161, IconWarning16, IconClose161, IconInfo16 } from "../Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "warning" | "critical" | "information";
export type ToastPosition =
  | "bottom-right" | "bottom-left" | "bottom-center"
  | "top-right"    | "top-left"    | "top-center";

export interface ToastItem {
  id:      string;
  type:    ToastType;
  message: string;
  /** Auto-dismiss after this many ms (default 4000; 0 = never) */
  duration?: number;
}

// ─── Colors — Figma node 7218:13086 ─────────────────────────────────────────

const TYPE_COLORS: Record<ToastType, { bg: string; icon: React.ReactNode }> = {
  success:     { bg: "#22C55E", icon: <IconCheck161 size={14} color="white" /> },
  warning:     { bg: "#F97316", icon: <IconWarning16 size={14} color="white" /> },
  critical:    { bg: "#EF4444", icon: <IconClose161  size={14} color="white" /> },
  information: { bg: "#1E293B", icon: <IconInfo16    size={14} color="white" /> },
};

// ─── Context / hook ───────────────────────────────────────────────────────────

interface ToastContextValue {
  show:    (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  critical:(message: string, duration?: number) => void;
  info:    (message: string, duration?: number) => void;
}

const ToastCtx = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastContainer>");
  return ctx;
}

// ─── Viewport position styles ─────────────────────────────────────────────────

function viewportStyle(position: ToastPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position:  "fixed",
    zIndex:    9999,
    display:   "flex",
    flexDirection: "column",
    gap:       8,
    padding:   16,
    listStyle: "none",
    outline:   "none",
    maxWidth:  "100vw",
  };
  switch (position) {
    case "bottom-right":  return { ...base, bottom: 0, right: 0, alignItems: "flex-end" };
    case "bottom-left":   return { ...base, bottom: 0, left:  0, alignItems: "flex-start" };
    case "bottom-center": return { ...base, bottom: 0, left:  "50%", transform: "translateX(-50%)", alignItems: "center" };
    case "top-right":     return { ...base, top:    0, right: 0, alignItems: "flex-end",   flexDirection: "column-reverse" };
    case "top-left":      return { ...base, top:    0, left:  0, alignItems: "flex-start", flexDirection: "column-reverse" };
    case "top-center":    return { ...base, top:    0, left:  "50%", transform: "translateX(-50%)", alignItems: "center", flexDirection: "column-reverse" };
  }
}

// ─── ToastContainer (provider + viewport) ────────────────────────────────────

export interface ToastContainerProps {
  children:  React.ReactNode;
  position?: ToastPosition;
}

export function ToastContainer({
  children,
  position = "bottom-right",
}: ToastContainerProps) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const show = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setItems(prev => [...prev, { id, type, message, duration }]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id));
  }, []);

  const ctx: ToastContextValue = {
    show,
    success: (msg, dur) => show("success",     msg, dur),
    warning: (msg, dur) => show("warning",     msg, dur),
    critical:(msg, dur) => show("critical",    msg, dur),
    info:    (msg, dur) => show("information", msg, dur),
  };

  return (
    <ToastCtx.Provider value={ctx}>
      <RadixToast.Provider swipeDirection={
        position.endsWith("right") ? "right" :
        position.endsWith("left")  ? "left"  : "up"
      }>
        {children}

        {/* Individual toasts */}
        {items.map(item => (
          <SingleToast
            key={item.id}
            item={item}
            position={position}
            onClose={() => remove(item.id)}
          />
        ))}

        {/* Viewport — the fixed container Radix mounts toasts into */}
        <RadixToast.Viewport style={viewportStyle(position)} />
      </RadixToast.Provider>
    </ToastCtx.Provider>
  );
}

// ─── Single toast pill ────────────────────────────────────────────────────────

function SingleToast({
  item,
  position,
  onClose,
}: {
  item:     ToastItem;
  position: ToastPosition;
  onClose:  () => void;
}) {
  const { bg, icon } = TYPE_COLORS[item.type];

  return (
    <RadixToast.Root
      duration={item.duration === 0 ? Infinity : (item.duration ?? 4000)}
      onOpenChange={open => { if (!open) onClose(); }}
      className="wl-toast"
      data-pos={position}
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        height:       36,
        borderRadius: 999,
        background:   bg,
        overflow:     "hidden",
        flexShrink:   0,
        boxShadow:    "0 4px 14px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.10)",
        userSelect:   "none",
        minWidth:     140,
        maxWidth:     320,
      }}
    >
      {/* Left: icon + message */}
      <div style={{
        display:    "flex",
        alignItems: "center",
        gap:        6,
        padding:    "0 12px",
        flex:       1,
        minWidth:   0,
      }}>
        {/* Icon */}
        <span style={{ display: "inline-flex", flexShrink: 0, opacity: 0.9 }}>
          {icon}
        </span>

        {/* Message */}
        <RadixToast.Title style={{
          fontFamily:   "Inter, sans-serif",
          fontSize:     13,
          fontWeight:   500,
          color:        "#FFFFFF",
          lineHeight:   "18px",
          whiteSpace:   "nowrap",
          overflow:     "hidden",
          textOverflow: "ellipsis",
        }}>
          {item.message}
        </RadixToast.Title>
      </div>

      {/* Vertical divider */}
      <div style={{
        width:      1,
        alignSelf:  "stretch",
        background: "rgba(255,255,255,0.30)",
        flexShrink: 0,
      }} />

      {/* Close × */}
      <RadixToast.Close asChild>
        <button
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          36,
            height:         36,
            border:         "none",
            background:     "transparent",
            cursor:         "pointer",
            flexShrink:     0,
            padding:        0,
            color:          "rgba(255,255,255,0.85)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.12)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          aria-label="Dismiss"
        >
          <IconClose16 size={10} color="currentColor" />
        </button>
      </RadixToast.Close>
    </RadixToast.Root>
  );
}

