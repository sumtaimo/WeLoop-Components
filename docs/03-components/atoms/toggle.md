# Toggle

**Tier:** Atoms  
**Source:** `src/components/atoms/Toggle/Toggle.tsx`

An accessible on/off toggle switch built on Radix Switch. Animates the thumb position and supports an optional visible label.

## Import

```tsx
import { Toggle } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Controlled checked state |
| `onChange` | `(checked: boolean) => void` | `—` | Called when toggled |
| `size` | `"sm"|"md"` | `"sm"` | Size — sm=36×20px, md=44×24px |
| `disabled` | `boolean` | `false` | Disables the toggle |
| `label` | `string` | `—` | Accessible label (aria-label) |
| `showLabel` | `boolean` | `false` | Render label text beside the toggle |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--shadow-toggle-checked`
- `--shadow-toggle-hover`
- `--shadow-toggle-pressed`

## Code Example

```tsx
<Toggle
  checked={enabled}
  onChange={setEnabled}
  size="md"
  label="Enable notifications"
  showLabel
/>
```
