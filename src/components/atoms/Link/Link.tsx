import React, { useState } from "react";

export interface LinkProps {
  label?: string;
  href?: string;
  showTrailIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// Chevron SVG (12×12)
function TrailChevron({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M6 4l4 4-4 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Link({
  label = "Learn more",
  href,
  showTrailIcon = true,
  disabled = false,
  onClick,
  className = "",
}: LinkProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Resolve state styles
  let bg    = "transparent";
  let color = disabled ? "#a3a3a3" : "#1d32ff";
  let shadow: string | undefined;

  if (!disabled) {
    if (pressed) {
      bg     = "#EAF3FF";
      shadow = "0 0 0 2px #ffffff, 0 0 0 4px #8EB6FF";
    } else if (hovered) {
      bg = "#D8E9FF";
    }
  }

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 8px",
    borderRadius: 6,
    border: "none",
    background: bg,
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: "-0.2px",
    color,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxShadow: shadow,
    transition: "background 0.12s, box-shadow 0.12s",
    boxSizing: "border-box" as const,
  };

  const handlers = disabled
    ? {}
    : {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => { setHovered(false); setPressed(false); },
        onMouseDown:  () => setPressed(true),
        onMouseUp:    () => setPressed(false),
      };

  const inner = (
    <>
      <span>{label}</span>
      {showTrailIcon && <TrailChevron color={color} />}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={className} style={baseStyle} onClick={onClick} {...handlers}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={baseStyle}
      {...handlers}
    >
      {inner}
    </button>
  );
}
