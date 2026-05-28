import React from "react";
import { IconStar16, IconBell16, IconUser16 } from "../../atoms/Icon/Icon";

export interface AppBarProps {
  points?: string;
  notificationCount?: string;
  avatarSrc?: string;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
  className?: string;
}

export function AppBar({
  points = "770P",
  notificationCount = "99+",
  avatarSrc,
  onNotificationClick,
  onAvatarClick,
  className = "",
}: AppBarProps) {
  return (
    <div
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "white",
        borderBottom: "1px solid #d1d5db",
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "10px 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
      className={className}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>

        {/* Points badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            height: 24,
            paddingLeft: 4,
            paddingRight: 6,
            background: "#d8e9ff",
            border: "1px solid #8eb6ff",
            borderRadius: 32,
            flexShrink: 0,
          }}
        >
          {/* Yellow coin */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2.667px",
              background: "#eab308",
              border: "1px solid #ca8a04",
              borderRadius: 12,
              flexShrink: 0,
            }}
          >
            <IconStar16 size={11} color="currentColor" />
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "16px",
              letterSpacing: "-0.1px",
              color: "#171717",
              whiteSpace: "nowrap",
            }}
          >
            {points}
          </span>
        </div>

        {/* Bell icon + badge */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
            style={{
              width: 24,
              height: 24,
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#171717",
            }}
          >
            <IconBell16 size={24} color="currentColor" />
          </button>
          {notificationCount && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: "calc(50% + 4px)",
                transform: "translateX(-50%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 14,
                padding: "2px 4px",
                background: "#e1232e",
                border: "1px solid #bd1822",
                borderRadius: 10,
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: 10,
                lineHeight: "12px",
                letterSpacing: "-0.1px",
                color: "#fef2f3",
                whiteSpace: "nowrap",
              }}
            >
              {notificationCount}
            </span>
          )}
        </div>

        {/* Avatar */}
        <button
          type="button"
          onClick={onAvatarClick}
          aria-label="User profile"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#f9fafb",
            border: "1.25px solid #9ca3af",
            overflow: "hidden",
            padding: 0,
            cursor: "pointer",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatarSrc ? (
            <img src={avatarSrc} alt="User avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <IconUser16 size={20} color="currentColor" />
          )}
        </button>

      </div>
    </div>
  );
}

