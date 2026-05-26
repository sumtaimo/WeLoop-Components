import React from "react";
import { Button } from "../../atoms/Button";
import { Avatar } from "../../atoms/Avatar";

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  logo: React.ReactNode;
  items?: NavItem[];
  actions?: React.ReactNode;
  user?: { name: string; avatarSrc?: string };
  sticky?: boolean;
  className?: string;
}

export function Navbar({
  logo,
  items = [],
  actions,
  user,
  sticky = false,
  className = "",
}: NavbarProps) {
  return (
    <header
      className={[
        "w-full h-16 bg-white border-b border-gray-200",
        sticky ? "sticky top-0 z-40" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6">
        <div className="shrink-0">{logo}</div>

        {items.length > 0 && (
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                ].join(" ")}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-3">
          {actions}
          {user && (
            <Avatar src={user.avatarSrc} alt={user.name} size="sm" />
          )}
        </div>
      </div>
    </header>
  );
}
