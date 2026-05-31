# Link

**Tier:** Atoms  
**Source:** `src/components/atoms/Link/Link.tsx`

A styled anchor/link component with brand color and hover underline behaviour.

## Import

```tsx
import { Link } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `—` | Link URL |
| `children` | `React.ReactNode` | `—` | Link label content |
| `external` | `boolean` | `false` | Opens in new tab with rel="noopener noreferrer" |
| `disabled` | `boolean` | `false` | Prevents navigation |
| `style` | `React.CSSProperties` | `—` | Custom styles |

## Token Usage

CSS variables consumed by this component:

- `--color-text-brand`

## Code Example

```tsx
<Link href="https://weloop.com" external>
  Visit WeLoop
</Link>
```
