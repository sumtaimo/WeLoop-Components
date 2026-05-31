# Avatar

**Tier:** Atoms  
**Source:** `src/components/atoms/Avatar/Avatar.tsx`

Displays a user avatar with support for image, initials, or office/special types. Falls back gracefully when image fails to load.

## Import

```tsx
import { Avatar } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"default"|"initials"|"office"|string` | `"default"` | Avatar style type |
| `size` | `"sm"|"md"|"lg"` | `"md"` | Avatar size |
| `src` | `string` | `—` | Image URL |
| `name` | `string` | `—` | Full name used to generate initials |
| `fallback` | `React.ReactNode` | `—` | Custom fallback content |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`

## Code Example

```tsx
<Avatar type="initials" size="md" name="Jane Doe" />
```
