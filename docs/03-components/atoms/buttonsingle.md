# ButtonSingle

**Tier:** Atoms  
**Source:** `src/components/atoms/ButtonSingle/ButtonSingle.tsx`

The core action button. Supports three visual types (primary, danger, ghost) each with three fill variants (filled, outline, ghost) and three sizes.

## Import

```tsx
import { ButtonSingle } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `"primary"|"danger"|"ghost"` | `"primary"` | Visual colour theme |
| `variant` | `"filled"|"outline"|"ghost"` | `"filled"` | Fill style |
| `size` | `"xs"|"sm"|"md"` | `"sm"` | Button size |
| `leadIcon` | `React.ReactNode` | `—` | Icon rendered before the label |
| `shortcut` | `string` | `—` | Keyboard shortcut badge inside the button |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows a spinning loader, hides label/icons, and disables the button |
| `iconOnly` | `boolean` | `false` | When `true` and `leadIcon` is provided, renders a square icon-only button with no label or shortcut |
| `onClick` | `React.MouseEventHandler` | `—` | Click handler |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--shadow-brand-default`
- `--shadow-brand-hover`
- `--shadow-brand-pressed`
- `--color-bg-danger-default`
- `--shadow-danger-default`
- `--shadow-danger-hover`
- `--color-text-brand`
- `--color-border-brand`
- `--color-text-danger`
- `--color-border-danger`
- `--color-bg-brand-subtle`
- `--color-bg-brand-contrast`
- `--color-bg-danger-subtle`
- `--color-bg-brand-subtle-hover`
- `--color-bg-brand-subtle-press`

## Code Example

```tsx
<ButtonSingle buttonType="primary" variant="filled" size="md">
  Save changes
</ButtonSingle>

<ButtonSingle buttonType="danger" variant="outline" size="sm">
  Delete
</ButtonSingle>

<ButtonSingle buttonType="ghost" variant="ghost" size="xs" disabled>
  Cancel
</ButtonSingle>
```
