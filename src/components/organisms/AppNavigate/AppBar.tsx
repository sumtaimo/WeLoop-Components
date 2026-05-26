import React from "react";

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
            <svg width="10.667" height="10.667" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L8 9.8l-3.2 1.6.6-3.6L2.8 5.3l3.6-.5L8 1.5z"
                fill="white"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
            </svg>
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
            <BellIcon />
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
            <DefaultAvatarIcon />
          )}
        </button>

      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 1 7 7v4l1.447 2.894A1 1 0 0 1 19.553 17H4.447a1 1 0 0 1-.894-1.447L5 13V9a7 7 0 0 1 7-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 17v1a2 2 0 1 0 4 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DefaultAvatarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3.5" stroke="#9ca3af" strokeWidth="1.25" />
      <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#9ca3af" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
