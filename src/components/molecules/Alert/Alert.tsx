import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
  children: React.ReactNode;
}

const variantConfig: Record<
  AlertVariant,
  { container: string; icon: string; iconPath: string }
> = {
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "text-blue-500",
    iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  success: {
    container: "bg-green-50 border-green-200 text-green-800",
    icon: "text-green-500",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "text-amber-500",
    iconPath:
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  error: {
    container: "bg-red-50 border-red-200 text-red-800",
    icon: "text-red-500",
    iconPath:
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

export function Alert({
  variant = "info",
  title,
  action,
  onDismiss,
  className = "",
  children,
}: AlertProps) {
  const { container, icon, iconPath } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={[
        "flex gap-3 rounded-lg border p-4",
        container,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        className={["mt-0.5 h-5 w-5 shrink-0", icon].join(" ")}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? "mt-1 text-sm opacity-90" : "text-sm"}>
          {children}
        </div>
        {action && <div className="mt-3">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
