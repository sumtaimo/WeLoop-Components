import React from "react";
import { Avatar, type AvatarSize } from "../../atoms/Avatar";
import { Badge, type BadgeVariant } from "../../atoms/Badge";

export interface UserProfileProps {
  name: string;
  role?: string;
  avatarSrc?: string;
  status?: { label: string; variant: BadgeVariant };
  size?: AvatarSize;
  layout?: "horizontal" | "vertical";
  className?: string;
}

export function UserProfile({
  name,
  role,
  avatarSrc,
  status,
  size = "md",
  layout = "horizontal",
  className = "",
}: UserProfileProps) {
  const isVertical = layout === "vertical";

  return (
    <div
      className={[
        "flex",
        isVertical ? "flex-col items-center text-center gap-2" : "items-center gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Avatar src={avatarSrc} alt={name} size={size} />
      <div className={isVertical ? "" : "min-w-0"}>
        <div className={["text-sm font-semibold text-gray-900", isVertical ? "" : "truncate"].join(" ")}>
          {name}
        </div>
        {role && (
          <div className={["text-xs text-gray-500", isVertical ? "" : "truncate"].join(" ")}>
            {role}
          </div>
        )}
        {status && (
          <div className="mt-1">
            <Badge variant={status.variant} dot size="sm">
              {status.label}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
