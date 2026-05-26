import React from "react";

export interface LinkProps {
  label?: string;
  href?: string;
  showTrailIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Link({
  label = "Learn more",
  href,
  showTrailIcon = true,
  disabled = false,
  onClick,
  className = "",
}: LinkProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 8px",
    borderRadius: 6,
    border: "none",
    background: "transparent",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: "-0.2px",
    color: disabled ? "#a3a3a3" : "#1d32ff",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const inner = (
    <>
      <span>{label}</span>
      {showTrailIcon && (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={className} style={baseStyle} onClick={onClick}>
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
    >
      {inner}
    </button>
  );
}
