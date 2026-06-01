# Icon

**Tier:** Atoms  
**Source:** `src/components/atoms/Icon/Icon.tsx`

WeLoop design-system icons are individually exported SVG components. There is no generic `<Icon>` wrapper — each icon is a named export such as `IconCheck16` or `IconClose16`. All icon components share the same `IconProps` interface.

## Import

```tsx
// Import individual named icons directly from the Icon module
import { IconCheck16, IconClose16, IconSearch16 } from 'weloop-components/components/atoms';
```

## IconProps (shared by all icon components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon width and height in pixels |
| `color` | `string` | `—` | CSS color applied via `currentColor`; falls back to the SVG's own fill/stroke if omitted |
| `className` | `string` | `—` | Additional CSS class |
| `style` | `React.CSSProperties` | `—` | Custom inline styles |

## Available icons (representative selection)

| Export name | Description |
|-------------|-------------|
| `IconCheck16` | Checkmark |
| `IconClose16` | X / close |
| `IconChevron16` | Chevron (down) |
| `IconChevron161`–`IconChevron169` | Chevron variants |
| `IconPlus16` | Plus / add |
| `IconSearch16` | Search / magnifier |
| `IconInfo16` | Info circle |
| `IconBell16` | Notification bell |
| `IconUser16` | Person silhouette |
| `IconBag16` | Bag / items |
| `IconBanking16` | Bank |
| `IconFilter16` | Filter |
| `IconClock16` | Clock |
| `IconHeart16` | Heart |
| `IconStar16` | Star |
| `IconCopy16` | Copy |
| `IconArrow16` | Arrow (and variants `IconArrow161`–`IconArrow1623`) |

The full list of exports can be found in `src/components/atoms/Icon/Icon.tsx`.

## Token Usage

Icon components use hardcoded SVG paths and do not consume CSS variables. Pass a `color` prop or set `color` in CSS via `currentColor` to theme them.

## Code Example

```tsx
import {
  IconCheck16,
  IconClose16,
  IconSearch16,
  IconUser16,
  IconChevron165,
} from 'weloop-components/components/atoms';

{/* Default 16px */}
<IconCheck16 />

{/* Custom size and color */}
<IconCheck16 size={20} color="var(--color-text-brand)" />
<IconClose16 size={16} color="#E1232E" />

{/* Inherits color from CSS currentColor */}
<span style={{ color: '#6B7280' }}>
  <IconSearch16 />
</span>

{/* With extra styles */}
<IconChevron165
  size={16}
  color="currentColor"
  style={{ transform: 'rotate(180deg)', transition: 'transform 150ms' }}
/>
```
