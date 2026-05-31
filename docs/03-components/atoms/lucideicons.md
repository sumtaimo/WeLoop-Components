# LucideIcons

**Tier:** Atoms  
**Source:** `src/components/atoms/LucideIcons/LucideIcons.tsx`

Re-exports all Lucide React icons with WeLoop style defaults. Use for supplemental iconography not covered by the WeLoop icon set.

## Import

```tsx
import { LucideIcons } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon size in pixels |
| `color` | `string` | `"currentColor"` | Icon color |
| `strokeWidth` | `number` | `2` | SVG stroke width |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
import { Home, Settings, Bell } from 'weloop-components/components/atoms';

<Home size={20} color="var(--color-text-brand)" />
```
