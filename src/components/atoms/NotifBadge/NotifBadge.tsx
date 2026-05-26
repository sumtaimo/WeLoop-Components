import React from "react";

export type NotifBadgeSize = "large" | "small" | "size3";

export interface NotifBadgeProps {
  size?: NotifBadgeSize;
  label?: string;
  className?: string;
}

export function NotifBadge({ size = "large", label = "1", className = "" }: NotifBadgeProps) {
  if (size === "small") {
    return (
      <div
        className={className}
        style={{
          width: 6,
          height: 6,
          minWidth: 6,
          minHeight: 6,
          borderRadius: 16,
          background: "#e1232e",
          border: "1px solid #bd1822",
          flexShrink: 0,
        }}
      />
    );
  }

  if (size === "size3") {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            minWidth: 6,
            minHeight: 6,
            borderRadius: 16,
            background: "#3e60ff",
            border: "2px solid #628aff",
            flexShrink: 0,
          }}
        />
      </div>
    );
  }

  // large — count pill
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 14,
        padding: "2px 4px",
        borderRadius: 10,
        background: "#e1232e",
        border: "1px solid #bd1822",
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 10,
        lineHeight: "12px",
        letterSpacing: "-0.1px",
        color: "#fef2f3",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </div>
  );
}
