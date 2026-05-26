import React from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps {
  level?: HeadingLevel;
  size?: HeadingLevel;
  color?: "default" | "muted" | "inverse" | "primary";
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl font-bold leading-tight tracking-tight",
  h2: "text-3xl font-bold leading-tight tracking-tight",
  h3: "text-2xl font-semibold leading-snug",
  h4: "text-xl font-semibold leading-snug",
  h5: "text-lg font-medium leading-normal",
  h6: "text-base font-medium leading-normal",
};

const colorStyles = {
  default: "text-gray-900",
  muted: "text-gray-500",
  inverse: "text-white",
  primary: "text-blue-600",
};

export function Heading({
  level = "h2",
  size,
  color = "default",
  className = "",
  children,
}: HeadingProps) {
  const Tag = level;
  const appliedSize = size ?? level;

  return (
    <Tag
      className={[sizeStyles[appliedSize], colorStyles[color], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
