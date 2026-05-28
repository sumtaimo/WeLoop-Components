import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { IconBolt } from "../Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Which edge of the trigger the tooltip appears on */
export type TooltipSide = "top" | "right" | "bottom" | "left";

/**
 * Alignment along the cross-axis of the chosen side.
 * Figma tail positions map as:
 *   B-L → side=top,    align=start
 *   B-C → side=top,    align=center   (default)
 *   B-R → side=top,    align=end
 *   T-L → side=bottom, align=start
 *   T-C → side=bottom, align=center
 *   T-R → side=bottom, align=end
 *   C-L → side=right,  align=center
 *   C-R → side=left,   align=center
 *   None → showArrow=false
 */
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  /** The element that triggers the tooltip on hover / keyboard-focus */
  children: React.ReactNode;
  /** Tooltip label — text string or any React node */
  content: React.ReactNode;
  /** Which side the bubble appears on (default: "top") */
  side?: TooltipSide;
  /** Arrow alignment along the chosen side (default: "center") */
  align?: TooltipAlign;
  /** Pixel gap between trigger and bubble (default: 6) */
  sideOffset?: number;
  /** Hide the arrow/tail entirely — matches Figma "None" variant */
  showArrow?: boolean;
  /** Delay before showing in ms (default: 400) */
  delayDuration?: number;
  /** Render nothing when true */
  disabled?: boolean;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

/**
 * Figma node 215:425 — dark pill tooltip with ✦ sparkle icon prefix.
 * Powered by @radix-ui/react-tooltip: keyboard focus, hover, ARIA, portal,
 * and enter/exit animations (wl-tooltip keyframes in index.html).
 *
 * Tail positions (side + align) match all 9 Figma variants:
 *   <Tooltip side="top" align="start">…</Tooltip>   → B-L
 *   <Tooltip side="top">…</Tooltip>                 → B-C (default)
 *   <Tooltip side="top" align="end">…</Tooltip>     → B-R
 *   <Tooltip side="bottom" align="start">…</Tooltip>→ T-L
 *   etc.
 *   <Tooltip showArrow={false}>…</Tooltip>           → None
 */
export function Tooltip({
  children,
  content,
  side          = "top",
  align         = "center",
  sideOffset    = 8,
  showArrow     = true,
  delayDuration = 400,
  disabled      = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        {/* asChild: uses the child element as the trigger, no extra wrapper div */}
        <RadixTooltip.Trigger asChild>
          <span style={{ display: "inline-flex" }}>{children}</span>
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className="wl-tooltip"
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          6,
              padding:      "7px 12px",
              borderRadius: 8,
              background:   "#1E293B",
              color:        "#F8FAFC",
              fontFamily:   "Inter, sans-serif",
              fontSize:     12,
              fontWeight:   500,
              lineHeight:   "16px",
              boxShadow:    "0 4px 16px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20)",
              maxWidth:     280,
              zIndex:       9999,
              userSelect:   "none",
              whiteSpace:   "nowrap",
            }}
          >
            {/* ✦ sparkle icon — matches Figma leading icon */}
            <SparkleIcon />

            {/* Content */}
            <span>{content}</span>

            {/* Arrow/tail — matches Figma tail positions */}
            {showArrow && (
              <RadixTooltip.Arrow
                width={10}
                height={5}
                style={{ fill: "#1E293B" }}
              />
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

const SparkleIcon = () => <IconBolt size={12} color="#94A3B8" style={{ flexShrink: 0 }} />;
