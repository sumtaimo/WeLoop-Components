import React from "react";
import { PaymentBadge, type PaymentBadgeStatus } from "../../src/components/atoms/PaymentBadge";
import { DemoShell, DemoRow } from "../DemoShell";

const ALL_STATUSES: PaymentBadgeStatus[] = [
  "draft", "scheduled", "inProgress", "approvalPending",
  "partiallyPaid", "paid", "overdue", "rejected",
  "valid", "overpaid", "closed", "review", "submitted",
];

export function PaymentBadgeDemo() {
  return (
    <DemoShell
      title="PaymentBadge"
      description="13 payment status variants × 2 sizes (M=28px, S=20px). Colors match Figma design tokens exactly."
    >
      <DemoRow label="All statuses — Size M">
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="M" />
        ))}
      </DemoRow>
      <DemoRow label="All statuses — Size S (mobile)">
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="S" />
        ))}
      </DemoRow>
      <DemoRow label="Without icon">
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="M" showIcon={false} />
        ))}
      </DemoRow>
    </DemoShell>
  );
}
