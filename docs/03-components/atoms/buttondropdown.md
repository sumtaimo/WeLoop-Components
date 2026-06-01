# ButtonDropdown

**Tier:** Atoms  
**Source:** `src/components/atoms/ButtonDropdown/ButtonDropdown.tsx`

A split button with a label section and a chevron section. When `menuItems` is provided, clicking the chevron opens a Radix DropdownMenu; otherwise the component acts as a pure controlled trigger.

## Import

```tsx
import { ButtonDropdown } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `"primary" \| "common"` | `"primary"` | Color scheme — brand blue or neutral |
| `size` | `"xs" \| "sm" \| "md"` | `"sm"` | Button height: `xs`=24px, `sm`=32px, `md`=36px |
| `filled` | `boolean` | `true` | Solid fill vs outline style |
| `label` | `string` | `"Button Option"` | Label text shown in the left section |
| `leadIcon` | `React.ReactNode` | `—` | Optional icon rendered before the label |
| `open` | `boolean` | `—` | Controls chevron rotation (up when `true`) — for external state management |
| `disabled` | `boolean` | `false` | Disables both the label and chevron sections |
| `onLabelClick` | `() => void` | `—` | Called when the label section is clicked |
| `onChevronClick` | `() => void` | `—` | Called when the chevron section is clicked (only when no `menuItems`) |
| `menuItems` | `DropdownMenuItem[]` | `—` | When provided, clicking the chevron opens a Radix dropdown menu |
| `onMenuSelect` | `(id: string) => void` | `—` | Called with the selected item's `id` when a menu item is chosen |
| `className` | `string` | `""` | Additional CSS class |

### DropdownMenuItem interface

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier passed to `onMenuSelect` |
| `label` | `string` | Display text |
| `icon` | `React.ReactNode` | Optional leading icon |
| `disabled` | `boolean` | Prevents selection |
| `danger` | `boolean` | Renders item in red (destructive action) |
| `separator` | `boolean` | Renders a divider line above this item |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--shadow-brand-default`

## Code Example

```tsx
{/* Controlled trigger without menu */}
<ButtonDropdown
  label="Actions"
  buttonType="primary"
  size="sm"
  onLabelClick={() => console.log('label clicked')}
  onChevronClick={() => setOpen(o => !o)}
  open={open}
/>

{/* With Radix dropdown menu */}
<ButtonDropdown
  label="Export"
  buttonType="common"
  filled={true}
  menuItems={[
    { id: 'csv',  label: 'Export as CSV' },
    { id: 'pdf',  label: 'Export as PDF' },
    { id: 'del',  label: 'Delete', danger: true, separator: true },
  ]}
  onMenuSelect={(id) => console.log('selected', id)}
/>

{/* Outline style, disabled */}
<ButtonDropdown
  label="Disabled"
  filled={false}
  disabled={true}
/>
```
