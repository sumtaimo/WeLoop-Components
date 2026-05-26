import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  helperText,
  errorText,
  leftAddon,
  rightAddon,
  fullWidth = false,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasError = Boolean(errorText);

  return (
    <div className={fullWidth ? "w-full" : "inline-flex flex-col"}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">
            {leftAddon}
          </span>
        )}
        <input
          {...props}
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={[
            "h-10 w-full rounded-lg border bg-white text-sm text-gray-900",
            "placeholder:text-gray-400 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
            hasError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20",
            leftAddon ? "pl-9" : "pl-3",
            rightAddon ? "pr-9" : "pr-3",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {rightAddon && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">
            {rightAddon}
          </span>
        )}
      </div>
      {hasError && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600">
          {errorText}
        </p>
      )}
      {!hasError && helperText && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
