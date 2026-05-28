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
      <DemoRow label="All statuses — Size M" code={`// Size M (28 px) — default size
<PaymentBadge status="paid" />
<PaymentBadge status="overdue" />
<PaymentBadge status="inProgress" />
<PaymentBadge status="draft" />
<PaymentBadge status="approvalPending" />
<PaymentBadge status="partiallyPaid" />
<PaymentBadge status="rejected" />
<PaymentBadge status="scheduled" />
<PaymentBadge status="submitted" />
<PaymentBadge status="valid" />
<PaymentBadge status="overpaid" />
<PaymentBadge status="closed" />
<PaymentBadge status="review" />`}>
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="M" />
        ))}
      </DemoRow>
      <DemoRow label="All statuses — Size S (mobile)" code={`// Size S (20 px) — compact / mobile
<PaymentBadge status="paid"       size="S" />
<PaymentBadge status="overdue"    size="S" />
<PaymentBadge status="inProgress" size="S" />`}>
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="S" />
        ))}
      </DemoRow>
      <DemoRow label="Without icon" code={`// Hide the spinner icon — label only
<PaymentBadge status="paid"    showIcon={false} />
<PaymentBadge status="overdue" showIcon={false} size="S" />`}>
        {ALL_STATUSES.map((s) => (
          <PaymentBadge key={s} status={s} size="M" showIcon={false} />
        ))}
      </DemoRow>
    </DemoShell>
  );
}
