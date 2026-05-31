# Icon

**Tier:** Atoms  
**Source:** `src/components/atoms/Icon/Icon.tsx`

Renders WeLoop design system icons. Icons are individually exported SVG components at 16px, with size and color overrides.

## Import

```tsx
import { Icon } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon width/height in pixels |
| `color` | `string` | `"currentColor"` | Icon fill/stroke color |
| `style` | `React.CSSProperties` | `—` | Custom styles |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
import { IconCheck16, IconClose16, IconInfo16 } from 'weloop-components/icons';

<IconCheck16 size={20} color="var(--color-text-brand)" />
<IconClose16 size={16} color="#E1232E" />
```
