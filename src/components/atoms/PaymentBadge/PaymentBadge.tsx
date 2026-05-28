import React from "react";
import { IconLoading } from "../Icon/Icon";

export type PaymentBadgeStatus =
  | "draft"
  | "scheduled"
  | "inProgress"
  | "approvalPending"
  | "partiallyPaid"
  | "paid"
  | "overdue"
  | "rejected"
  | "valid"
  | "overpaid"
  | "closed"
  | "review"
  | "submitted";

export type PaymentBadgeSize = "M" | "S";

export interface PaymentBadgeProps {
  status: PaymentBadgeStatus;
  size?: PaymentBadgeSize;
  showIcon?: boolean;
  className?: string;
}

interface StatusTokens {
  bg: string;
  border: string;
  color: string;
  label: string;
}

const STATUS_MAP: Record<PaymentBadgeStatus, StatusTokens> = {
  draft:           { bg: "#f5f5f5", border: "#d4d4d4", color: "#737373",  label: "Draft" },
  scheduled:       { bg: "#fafafa", border: "#a3a3a3", color: "#404040",  label: "Scheduled" },
  inProgress:      { bg: "#d8e9ff", border: "#628aff", color: "#1d32ff",  label: "In Progress" },
  approvalPending: { bg: "#f65f19", border: "#bf310f", color: "#fee9d6",  label: "Approval Pending" },
  partiallyPaid:   { bg: "#fef9c3", border: "#eab308", color: "#ca8a04",  label: "Partially Paid" },
  paid:            { bg: "#dcfce7", border: "#22c55e", color: "#15803d",  label: "Paid" },
  overdue:         { bg: "#ffe1e3", border: "#fc6d75", color: "#e1232e",  label: "Overdue" },
  rejected:        { bg: "#e1232e", border: "#bd1822", color: "#fef2f3",  label: "Rejected" },
  valid:           { bg: "#3e60ff", border: "#0f1fea", color: "#eaf3ff",  label: "Valid" },
  overpaid:        { bg: "#22c55e", border: "#16a34a", color: "#f0fdf4",  label: "Overpaid" },
  closed:          { bg: "#6b7280", border: "#374151", color: "#f9fafb",  label: "Closed" },
  review:          { bg: "#e0eefe", border: "#36a2fa", color: "#0060b9",  label: "Review" },
  submitted:       { bg: "#0c87eb", border: "#0152a3", color: "#f0f7ff",  label: "Submitted" },
};

const SpinnerIcon = ({ size }: { size: number }) => <IconLoading size={size} color="currentColor" />;

export function PaymentBadge({
  status,
  size = "M",
  showIcon = true,
  className = "",
}: PaymentBadgeProps) {
  const tokens = STATUS_MAP[status];
  const isM = size === "M";

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    height: isM ? 28 : 20,
    padding: isM ? "4px 12px" : "2px 8px",
    borderRadius: isM ? 8 : 6,
    border: `1px solid ${tokens.border}`,
    background: tokens.bg,
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    fontSize: isM ? 14 : 12,
    lineHeight: isM ? "16px" : "14px",
    letterSpacing: "-0.2px",
    color: tokens.color,
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return (
    <div style={containerStyle} className={className}>
      {showIcon && <SpinnerIcon size={isM ? 16 : 12} />}
      <span>{tokens.label}</span>
    </div>
  );
}
