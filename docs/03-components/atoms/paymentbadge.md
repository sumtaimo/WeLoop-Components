# PaymentBadge

**Tier:** Atoms  
**Source:** `src/components/atoms/PaymentBadge/PaymentBadge.tsx`

Displays a payment method badge (Visa, Mastercard, GoPay, OVO, etc.) by payment type code.

## Import

```tsx
import { PaymentBadge } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `—` | Payment method code (e.g. "VISA", "GOPAY") |
| `size` | `number` | `32` | Badge width in pixels |
| `style` | `React.CSSProperties` | `—` | Custom styles |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
<PaymentBadge type="VISA" size={40} />
<PaymentBadge type="GOPAY" size={32} />
```
