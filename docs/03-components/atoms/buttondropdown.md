# ButtonDropdown

**Tier:** Atoms  
**Source:** `src/components/atoms/ButtonDropdown/ButtonDropdown.tsx`

A button with an attached dropdown menu. Combines a trigger button with a Radix DropdownMenu for accessible popover menus.

## Import

```tsx
import { ButtonDropdown } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `—` | Button label text |
| `items` | `Array<{ label: string; onClick: () => void }>` | `[]` | Dropdown menu items |
| `variant` | `"filled"|"outline"|"ghost"` | `"filled"` | Button visual variant |
| `size` | `"xs"|"sm"|"md"` | `"sm"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button and dropdown |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--shadow-brand-default`

## Code Example

```tsx
<ButtonDropdown
  label="Actions"
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>
```
