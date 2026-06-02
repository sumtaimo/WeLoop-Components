import React, { useState, useEffect } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

// ─── CSS injection (once) ─────────────────────────────────────────────────────

const DRAWER_STYLE_ID = "wl-drawer-styles";

function injectDrawerStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DRAWER_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DRAWER_STYLE_ID;
  style.textContent = `
    @keyframes wl-drawer-bottom-in  { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes wl-drawer-bottom-out { from { transform: translateY(0); } to { transform: translateY(100%); } }
    @keyframes wl-drawer-left-in    { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    @keyframes wl-drawer-left-out   { from { transform: translateX(0); } to { transform: translateX(-100%); } }
    @keyframes wl-drawer-right-in   { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes wl-drawer-right-out  { from { transform: translateX(0); } to { transform: translateX(100%); } }
    @keyframes wl-overlay-in  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes wl-overlay-out { from { opacity: 1; } to { opacity: 0; } }

    .wl-drawer-overlay[data-state="open"] {
      animation: wl-overlay-in var(--motion-duration-slow, 300ms) var(--motion-easing-enter, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
    }
    .wl-drawer-overlay[data-state="closed"] {
      animation: wl-overlay-out var(--motion-duration-slow, 300ms) var(--motion-easing-exit, cubic-bezier(0.55, 0, 0.45, 1)) forwards;
    }

    .wl-drawer-panel-bottom[data-state="open"] {
      animation: wl-drawer-bottom-in var(--motion-duration-slow, 300ms) var(--motion-easing-enter, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
    }
    .wl-drawer-panel-bottom[data-state="closed"] {
      animation: wl-drawer-bottom-out var(--motion-duration-slow, 300ms) var(--motion-easing-exit, cubic-bezier(0.55, 0, 0.45, 1)) forwards;
    }

    .wl-drawer-panel-left[data-state="open"] {
      animation: wl-drawer-left-in var(--motion-duration-slow, 300ms) var(--motion-easing-enter, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
    }
    .wl-drawer-panel-left[data-state="closed"] {
      animation: wl-drawer-left-out var(--motion-duration-slow, 300ms) var(--motion-easing-exit, cubic-bezier(0.55, 0, 0.45, 1)) forwards;
    }

    .wl-drawer-panel-right[data-state="open"] {
      animation: wl-drawer-right-in var(--motion-duration-slow, 300ms) var(--motion-easing-enter, cubic-bezier(0.22, 1, 0.36, 1)) forwards;
    }
    .wl-drawer-panel-right[data-state="closed"] {
      animation: wl-drawer-right-out var(--motion-duration-slow, 300ms) var(--motion-easing-exit, cubic-bezier(0.55, 0, 0.45, 1)) forwards;
    }
  `;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrawerSide = "left" | "right" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Which edge the drawer slides in from (default: "bottom") */
  side?: DrawerSide;
  /**
   * Panel size:
   * - bottom: sm=40vh, md=60vh, lg=80vh, full=100vh
   * - left/right: sm=320px, md=400px, lg=520px, full=100%
   */
  size?: DrawerSize;
  /** Show a drag-handle bar at the top of a bottom drawer (default: true) */
  showHandle?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Size helpers ─────────────────────────────────────────────────────────────

const BOTTOM_SIZE: Record<DrawerSize, string> = {
  sm:   "40vh",
  md:   "60vh",
  lg:   "80vh",
  full: "100vh",
};

const SIDE_SIZE: Record<DrawerSize, string> = {
  sm:   "320px",
  md:   "400px",
  lg:   "520px",
  full: "100%",
};

function getPanelSize(side: DrawerSide, size: DrawerSize): { width?: string; height?: string } {
  if (side === "bottom") return { width: "100%", height: BOTTOM_SIZE[size] };
  return { width: SIDE_SIZE[size], height: "100%" };
}

function getPanelRadius(side: DrawerSide): React.CSSProperties {
  const r = "var(--radius-xl, 16px)";
  if (side === "bottom") return { borderTopLeftRadius: r, borderTopRightRadius: r };
  if (side === "left")   return { borderTopRightRadius: r, borderBottomRightRadius: r };
  /* right */            return { borderTopLeftRadius:  r, borderBottomLeftRadius:  r };
}

function getPanelPosition(side: DrawerSide): React.CSSProperties {
  if (side === "bottom") return { bottom: 0, left: 0, right: 0 };
  if (side === "left")   return { top: 0, left: 0, bottom: 0 };
  /* right */            return { top: 0, right: 0, bottom: 0 };
}

function getPanelClass(side: DrawerSide): string {
  if (side === "bottom") return "wl-drawer-panel-bottom";
  if (side === "left")   return "wl-drawer-panel-left";
  /* right */            return "wl-drawer-panel-right";
}

// ─── Close button ─────────────────────────────────────────────────────────────

function DrawerCloseButton() {
  const [hov, setHov] = useState(false);
  return (
    <RadixDialog.Close asChild>
      <button
        aria-label="Close drawer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position:       "absolute",
          top:            16,
          right:          16,
          width:          32,
          height:         32,
          borderRadius:   "50%",
          border:         "none",
          background:     hov
            ? "var(--color-bg-surface-hover, #F3F4F6)"
            : "var(--color-bg-surface-subtle, #F9FAFB)",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          padding:        0,
          zIndex:         1,
          flexShrink:     0,
          transition:     "background 0.12s",
        }}
      >
        {/* × icon drawn inline to avoid importing atoms */}
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="var(--color-text-subtle, #6B7280)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </RadixDialog.Close>
  );
}

// ─── Handle bar ───────────────────────────────────────────────────────────────

function HandleBar() {
  return (
    <div
      aria-hidden="true"
      style={{
        display:        "flex",
        justifyContent: "center",
        paddingTop:     12,
        paddingBottom:  4,
        flexShrink:     0,
      }}
    >
      <div style={{
        width:        40,
        height:       4,
        borderRadius: 999,
        background:   "var(--color-border-default, #D1D5DB)",
      }} />
    </div>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  side        = "bottom",
  size        = "md",
  showHandle  = true,
  className,
  style,
}: DrawerProps) {
  // Inject keyframe styles once on mount
  useEffect(() => { injectDrawerStyles(); }, []);

  const panelSize     = getPanelSize(side, size);
  const panelRadius   = getPanelRadius(side);
  const panelPosition = getPanelPosition(side);
  const panelClass    = getPanelClass(side);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={handleOpenChange}>
      <RadixDialog.Portal>
        {/* ── Overlay ─────────────────────────────────────────────────────── */}
        <RadixDialog.Overlay
          className="wl-drawer-overlay"
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     1000,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* ── Panel ───────────────────────────────────────────────────────── */}
        <RadixDialog.Content
          className={[panelClass, className].filter(Boolean).join(" ")}
          onEscapeKeyDown={onClose}
          onPointerDownOutside={onClose}
          style={{
            position:       "fixed",
            zIndex:         1001,
            background:     "var(--color-bg-surface-default, #FFFFFF)",
            boxShadow:      "0 -4px 32px rgba(0,0,0,0.12), 0 -1px 8px rgba(0,0,0,0.06)",
            display:        "flex",
            flexDirection:  "column",
            overflow:       "hidden",
            outline:        "none",
            ...panelPosition,
            ...panelSize,
            ...panelRadius,
            ...style,
          }}
        >
          {/* Visually-hidden title for a11y */}
          <RadixDialog.Title
            style={{
              position:   "absolute",
              width:      1,
              height:     1,
              overflow:   "hidden",
              clip:       "rect(0,0,0,0)",
              whiteSpace: "nowrap",
              padding:    0,
              margin:     0,
            }}
          >
            {title ?? "Drawer"}
          </RadixDialog.Title>

          {/* Handle bar (bottom drawer only) */}
          {side === "bottom" && showHandle && <HandleBar />}

          {/* Close button */}
          <DrawerCloseButton />

          {/* Header */}
          {(title || description) && (
            <div
              style={{
                padding:      side === "bottom"
                  ? "16px 24px 12px"
                  : "20px 56px 12px 24px",
                flexShrink:   0,
                borderBottom: "1px solid var(--color-border-subtle, #E5E7EB)",
              }}
            >
              {title && (
                <h2
                  style={{
                    margin:     0,
                    fontFamily: "Inter, sans-serif",
                    fontSize:   18,
                    fontWeight: 700,
                    lineHeight: "26px",
                    color:      "var(--color-text-default, #111827)",
                    // Leave room for the close button on bottom drawers
                    paddingRight: side === "bottom" ? 40 : 0,
                  }}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  style={{
                    margin:     "6px 0 0",
                    fontFamily: "Inter, sans-serif",
                    fontSize:   14,
                    lineHeight: "22px",
                    color:      "var(--color-text-subtle, #6B7280)",
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Scrollable body */}
          <div
            style={{
              flex:       1,
              overflowY:  "auto",
              padding:    "20px 24px",
            }}
          >
            {children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
