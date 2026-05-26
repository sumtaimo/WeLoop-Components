import React from "react";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  errorText,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  const hasError = Boolean(errorText);

  return (
    <div className={["flex flex-col gap-1.5", className].filter(Boolean).join(" ")}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hasError && (
        <p id={`${htmlFor}-error`} className="text-xs text-red-600" role="alert">
          {errorText}
        </p>
      )}
      {!hasError && helperText && (
        <p id={`${htmlFor}-helper`} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
