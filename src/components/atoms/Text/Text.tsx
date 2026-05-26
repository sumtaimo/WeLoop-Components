import React from "react";

type TextElement = "p" | "span" | "label" | "div" | "strong" | "em" | "small";
type TextVariant = "body" | "caption" | "overline" | "code";
type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextWeight = "regular" | "medium" | "semibold" | "bold";
type TextColor = "default" | "muted" | "inverse" | "primary" | "error";

export interface TextProps {
  as?: TextElement;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  body: "leading-relaxed",
  caption: "leading-snug",
  overline: "uppercase tracking-widest",
  code: "font-mono",
};

const sizeStyles: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightStyles: Record<TextWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorStyles: Record<TextColor, string> = {
  default: "text-gray-900",
  muted: "text-gray-500",
  inverse: "text-white",
  primary: "text-blue-600",
  error: "text-red-600",
};

export function Text({
  as: Tag = "p",
  variant = "body",
  size = "base",
  weight = "regular",
  color = "default",
  truncate = false,
  className = "",
  children,
}: TextProps) {
  return (
    <Tag
      className={[
        variantStyles[variant],
        sizeStyles[size],
        weightStyles[weight],
        colorStyles[color],
        truncate ? "truncate" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
