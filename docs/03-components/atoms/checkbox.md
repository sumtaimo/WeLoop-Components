# Checkbox

**Tier:** Atoms  
**Source:** `src/components/atoms/Checkbox/Checkbox.tsx`

An accessible checkbox built on Radix UI. Supports checked, unchecked, and indeterminate states with two size options.

## Import

```tsx
import { Checkbox } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is ticked |
| `indeterminate` | `boolean` | `false` | Partial/indeterminate state (shows a dash) |
| `disabled` | `boolean` | `false` | Disable all interaction |
| `label` | `string` | `—` | Label text beside the box |
| `size` | `"sm"|"lg"` | `"sm"` | Box size — sm=16px, lg=20px |
| `onChange` | `(checked: boolean) => void` | `—` | Called with the new checked value |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-border-brand`
- `--shadow-input-brand`

## Code Example

```tsx
<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={setAccepted}
  size="sm"
/>

<Checkbox
  label="Select all"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>
```
