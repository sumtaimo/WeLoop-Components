import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  xs: { container: "w-6 h-6", text: "text-xs" },
  sm: { container: "w-8 h-8", text: "text-sm" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-12 h-12", text: "text-base" },
  xl: { container: "w-16 h-16", text: "text-lg" },
};

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, initials, size = "md", className = "" }: AvatarProps) {
  const { container, text } = sizeStyles[size];

  return (
    <span
      className={[
        "relative inline-flex items-center justify-center rounded-full",
        "overflow-hidden bg-gray-200 select-none shrink-0",
        container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? ""}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={["font-medium text-gray-600", text].join(" ")}>
          {initials ?? getInitials(alt)}
        </span>
      )}
    </span>
  );
}
