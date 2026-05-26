import React from "react";

export interface PageShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: string;
  sidebarPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export function PageShell({
  header,
  sidebar,
  footer,
  sidebarWidth = "16rem",
  sidebarPosition = "left",
  className = "",
  children,
}: PageShellProps) {
  return (
    <div className={["min-h-screen flex flex-col bg-gray-50", className].filter(Boolean).join(" ")}>
      {header && <div className="shrink-0">{header}</div>}

      <div className="flex flex-1 overflow-hidden">
        {sidebar && sidebarPosition === "left" && (
          <aside
            style={{ width: sidebarWidth, minWidth: sidebarWidth }}
            className="hidden md:flex flex-col border-r border-gray-200 bg-white overflow-y-auto"
          >
            {sidebar}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {sidebar && sidebarPosition === "right" && (
          <aside
            style={{ width: sidebarWidth, minWidth: sidebarWidth }}
            className="hidden md:flex flex-col border-l border-gray-200 bg-white overflow-y-auto"
          >
            {sidebar}
          </aside>
        )}
      </div>

      {footer && (
        <footer className="shrink-0 border-t border-gray-200 bg-white">
          {footer}
        </footer>
      )}
    </div>
  );
}
