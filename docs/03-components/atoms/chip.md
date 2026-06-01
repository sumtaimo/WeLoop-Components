# Chip

**Tier:** Atoms  
**Source:** `src/components/atoms/Chip/Chip.tsx`

A compact tag-like element. `"suggest"` chips show a checkmark icon and are used as selectable options; `"input"` chips show a circular avatar photo and represent entered values. All chips include a remove button.

## Import

```tsx
import { Chip } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"suggest" \| "input"` | `"suggest"` | Chip mode — checkmark icon vs avatar photo |
| `size` | `"s" \| "m"` | `"m"` | Chip height: `s`=24px, `m`=32px |
| `label` | `string` | — | Chip label text (required) |
| `avatarSrc` | `string` | `—` | Avatar photo URL — used when `type="input"`; falls back to first-letter initial if omitted |
| `squace` | `boolean` | `false` | Adds extra horizontal padding (Figma "squace" variant) |
| `disabled` | `boolean` | `false` | Disables hover/press states and the remove button |
| `onRemove` | `() => void` | `—` | Called when the × remove button is clicked |
| `style` | `React.CSSProperties` | `—` | Custom inline styles on the chip container |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-bg-brand-contrast`
- `--color-text-brand`

## Code Example

```tsx
{/* Suggest chip (checkmark icon) */}
<Chip type="suggest" label="React" />

{/* Suggest chip, small size */}
<Chip type="suggest" size="s" label="TypeScript" onRemove={() => removeTag('TypeScript')} />

{/* Input chip with avatar photo */}
<Chip
  type="input"
  label="Jane Doe"
  avatarSrc="https://example.com/avatar.jpg"
  onRemove={() => removeAssignee('jane')}
/>

{/* Input chip — initials fallback when no avatarSrc */}
<Chip type="input" label="Bob Smith" onRemove={() => {}} />

{/* Squace variant */}
<Chip type="suggest" label="Design" squace={true} onRemove={() => {}} />

{/* Disabled */}
<Chip type="suggest" label="Archived" disabled={true} />
```
