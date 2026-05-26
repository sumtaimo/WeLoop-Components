import React from "react";

export interface CardProps {
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  rounded?: "none" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const shadowStyles = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const roundedStyles = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function Card({
  padding = "md",
  shadow = "sm",
  border = true,
  rounded = "lg",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={[
        "bg-white",
        border ? "border border-gray-200" : "",
        paddingStyles[padding],
        shadowStyles[shadow],
        roundedStyles[rounded],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className = "" }: CardHeaderProps) {
  return (
    <div className={["flex items-start justify-between gap-4", className].filter(Boolean).join(" ")}>
      <div className="min-w-0">
        <div className="text-base font-semibold text-gray-900 truncate">{title}</div>
        {subtitle && <div className="mt-0.5 text-sm text-gray-500">{subtitle}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function CardBody({ className = "", children }: CardBodyProps) {
  return <div className={["mt-4", className].filter(Boolean).join(" ")}>{children}</div>;
}

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className = "", children }: CardFooterProps) {
  return (
    <div
      className={[
        "mt-4 pt-4 border-t border-gray-100 flex items-center gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
