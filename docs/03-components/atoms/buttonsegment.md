# ButtonSegment

**Tier:** Atoms  
**Source:** `src/components/atoms/ButtonSegment/ButtonSegment.tsx`

A segmented control that acts as a single-select tab strip. Each segment is a button; only one can be active at a time.

## Import

```tsx
import { ButtonSegment } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{ value: string; label: string }>` | `[]` | Segment items |
| `value` | `string` | `—` | Currently selected value |
| `onValueChange` | `(value: string) => void` | `—` | Called when selection changes |
| `size` | `"xs"|"sm"|"md"` | `"sm"` | Segment size |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`

## Code Example

```tsx
<ButtonSegment
  items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }]}
  value="day"
  onValueChange={setValue}
/>
```
