# PaymentBadge

**Tier:** Atoms  
**Source:** `src/components/atoms/PaymentBadge/PaymentBadge.tsx`

A status badge for payment records. Renders a colored pill with a label and optional spinner icon reflecting the current payment status (e.g. Draft, In Progress, Paid, Overdue).

## Import

```tsx
import { PaymentBadge } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `PaymentBadgeStatus` | `—` | Payment status to display (required) |
| `size` | `"M"|"S"` | `"M"` | Badge size — M=28px height, S=20px height |
| `showIcon` | `boolean` | `true` | Show the spinner icon alongside the label |
| `className` | `string` | `""` | Additional CSS class |

### `PaymentBadgeStatus` values

| Value | Label | Colors |
|-------|-------|--------|
| `"draft"` | Draft | Gray |
| `"scheduled"` | Scheduled | Neutral |
| `"inProgress"` | In Progress | Blue |
| `"approvalPending"` | Approval Pending | Orange |
| `"partiallyPaid"` | Partially Paid | Yellow |
| `"paid"` | Paid | Green |
| `"overdue"` | Overdue | Red (light) |
| `"rejected"` | Rejected | Red (solid) |
| `"valid"` | Valid | Brand blue (solid) |
| `"overpaid"` | Overpaid | Green (solid) |
| `"closed"` | Closed | Gray (solid) |
| `"review"` | Review | Light blue |
| `"submitted"` | Submitted | Dark blue (solid) |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
<PaymentBadge status="paid" />
<PaymentBadge status="overdue" size="S" />
<PaymentBadge status="inProgress" showIcon={false} />
<PaymentBadge status="approvalPending" size="M" />
```
