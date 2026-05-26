import React from "react";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className = "" }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={["w-px self-stretch bg-gray-200", className].filter(Boolean).join(" ")}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    );
  }

  return (
    <hr
      className={["border-0 border-t border-gray-200", className].filter(Boolean).join(" ")}
    />
  );
}
