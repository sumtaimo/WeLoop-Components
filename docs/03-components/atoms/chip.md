# Chip

**Tier:** Atoms  
**Source:** `src/components/atoms/Chip/Chip.tsx`

A compact tag-like element. "suggest" chips are selectable options; "input" chips represent entered values with an optional remove button.

## Import

```tsx
import { Chip } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"suggest"|"input"` | `"suggest"` | Chip mode |
| `size` | `"sm"|"md"` | `"sm"` | Chip size |
| `label` | `string` | `—` | Chip label text |
| `avatar` | `React.ReactNode` | `—` | Optional leading avatar |
| `selected` | `boolean` | `false` | Selected state (suggest type only) |
| `onRemove` | `() => void` | `—` | Called when × is clicked (input type) |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-border-brand`

## Code Example

```tsx
<Chip type="suggest" label="React" selected={false} />
<Chip type="input"   label="TypeScript" onRemove={() => removeTag('TypeScript')} />
```
