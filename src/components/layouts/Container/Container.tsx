import React from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps {
  size?: ContainerSize;
  padded?: boolean;
  centered?: boolean;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const sizeClass: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function Container({
  size = "xl",
  padded = true,
  centered = true,
  as: Tag = "div",
  className = "",
  children,
}: ContainerProps) {
  return (
    <Tag
      className={[
        "w-full",
        sizeClass[size],
        centered ? "mx-auto" : "",
        padded ? "px-4 sm:px-6 lg:px-8" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
