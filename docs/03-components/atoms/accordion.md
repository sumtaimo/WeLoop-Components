# Accordion

**Tier:** Atoms  
**Source:** `src/components/atoms/Accordion/Accordion.tsx`

An animated expand/collapse list built on Radix Accordion. Supports single-open and multi-open modes, two visual variants, and per-item disabled state. The chevron rotates 180° on open and the content panel animates its height using CSS keyframes.

## Import

```tsx
import { Accordion } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | required | Array of items to render (see type below) |
| `type` | `"single"|"multiple"` | `"single"` | Whether only one or multiple items can be open simultaneously |
| `defaultValue` | `string` | `—` | `id` of the item that is open on first render |
| `variant` | `"default"|"flush"` | `"default"` | `default` adds a bordered card container; `flush` renders borderless, for embedding inside other surfaces |
| `className` | `string` | `—` | Extra class names on the root element |
| `style` | `React.CSSProperties` | `—` | Inline style overrides on the root element |

### AccordionItem type

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | yes | Unique identifier; also used as the Radix value |
| `title` | `string` | yes | Header text displayed in the trigger row |
| `content` | `React.ReactNode` | yes | Body content revealed when the item is open |
| `disabled` | `boolean` | no | Dims the item and prevents interaction |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-surface-default` — card background (default variant)
- `--color-border-default` — card border and item dividers
- `--color-text-default` — closed trigger title color
- `--color-text-brand` — open trigger title color
- `--color-text-subtle` — body content text color
- `--radius-lg` — card corner radius (default variant)
- `--motion-duration-normal` — height animation and chevron rotation duration (default 200ms)

## Code Example

```tsx
const items = [
  {
    id: 'shipping',
    title: 'Shipping information',
    content: 'We ship to over 50 countries. Standard delivery takes 5–7 business days.',
  },
  {
    id: 'returns',
    title: 'Returns & refunds',
    content: 'Items can be returned within 30 days of delivery for a full refund.',
  },
  {
    id: 'payment',
    title: 'Payment methods',
    content: 'We accept Visa, Mastercard, and bank transfers.',
    disabled: true,
  },
];

{/* Single-open with card border */}
<Accordion items={items} type="single" defaultValue="shipping" />

{/* Multi-open, flush (no card border) */}
<Accordion items={items} type="multiple" variant="flush" />
```
