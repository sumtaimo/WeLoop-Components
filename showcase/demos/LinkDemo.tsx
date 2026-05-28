import React from "react";
import { Link } from "../../src/components/atoms/Link";
import { DemoShell, DemoRow } from "../DemoShell";

export function LinkDemo() {
  return (
    <DemoShell
      title="Link"
      description="4 interactive states matching Figma: Default · Hover (blue bg) · Pressed (focus ring) · Disabled. Hover and click to see states."
    >
      <DemoRow label="Default" code={`// Button (no href) — fires onClick
<Link label="Learn more"  showTrailIcon onClick={() => handleClick()} />
<Link label="See all"     showTrailIcon={false} onClick={() => navigate('/list')} />

// Anchor (with href) — renders <a> tag
<Link label="Open page" href="/dashboard" showTrailIcon />

// Disabled
<Link label="Unavailable" disabled showTrailIcon />`}>
        <Link label="Learn more" showTrailIcon />
        <Link label="View details" showTrailIcon />
        <Link label="See all" showTrailIcon={false} />
      </DemoRow>
      <DemoRow label="With href (renders &lt;a&gt;)">
        <Link label="Open page" href="#" showTrailIcon />
      </DemoRow>
      <DemoRow label="Disabled">
        <Link label="Learn more" disabled showTrailIcon />
        <Link label="View details" disabled showTrailIcon />
      </DemoRow>
      {/* Static state previews to match Figma showcase panel */}
      <DemoRow label="State preview — hover &amp; press the buttons above to see live">
        <StaticLink state="default" />
        <StaticLink state="hover" />
        <StaticLink state="pressed" />
        <StaticLink state="disabled" />
      </DemoRow>
    </DemoShell>
  );
}

// Renders a static non-interactive preview for each state
function StaticLink({ state }: { state: "default" | "hover" | "pressed" | "disabled" }) {
  const colorMap = {
    default:  "#1d32ff",
    hover:    "#1d32ff",
    pressed:  "#1d32ff",
    disabled: "#a3a3a3",
  };
  const bgMap = {
    default:  "transparent",
    hover:    "#D8E9FF",
    pressed:  "#EAF3FF",
    disabled: "transparent",
  };
  const shadowMap = {
    default:  undefined,
    hover:    undefined,
    pressed:  "0 0 0 2px #ffffff, 0 0 0 4px #8EB6FF",
    disabled: undefined,
  };
  const labelMap = {
    default:  "Default",
    hover:    "Hover",
    pressed:  "Pressed",
    disabled: "Disabled",
  };

  const color  = colorMap[state];
  const bg     = bgMap[state];
  const shadow = shadowMap[state];
  const label  = labelMap[state];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        borderRadius: 6,
        background: bg,
        boxShadow: shadow,
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        color,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}>
        {label}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
