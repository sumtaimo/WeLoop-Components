# Avatar

**Tier:** Atoms  
**Source:** `src/components/atoms/Avatar/Avatar.tsx`

Displays a user avatar with support for photos, initials, icons, and several special design-system types. Photo avatars use Radix Avatar for proper image load/fallback handling.

## Import

```tsx
import { Avatar } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"noProfile" \| "noProfileFill" \| "items" \| "bank" \| "office" \| "textProfile" \| "chipLead" \| "addMore"` | `"noProfile"` | Avatar visual type |
| `size` | `20 \| 24 \| 32` | `24` | Avatar size in pixels |
| `src` | `string` | `—` | Photo URL — used when `type="office"` |
| `alt` | `string` | `""` | Alt text for photo; also used to derive initials in the fallback |
| `text` | `string` | `"A"` | Initials text — used when `type="textProfile"` or `type="chipLead"` without an icon |
| `icon` | `React.ReactNode` | `—` | Custom icon node — used when `type="chipLead"` |
| `onClick` | `() => void` | `—` | Click handler; adds `cursor: pointer` |
| `className` | `string` | `—` | Additional CSS class |

### Type descriptions

| Value | Description |
|-------|-------------|
| `noProfile` | Person silhouette, ring border, light background |
| `noProfileFill` | Person silhouette, solid gray fill (no border) |
| `items` | Bag/items icon, ring border |
| `bank` | Bank icon, ring border |
| `office` | Circular photo with Radix Avatar fallback |
| `textProfile` | Initials text, solid gray fill |
| `chipLead` | Chip-style: icon or initials text, solid gray fill |
| `addMore` | Person silhouette with a plus badge in the bottom-right corner |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`

## Code Example

```tsx
{/* Default person silhouette */}
<Avatar />

{/* Profile photo with initials fallback */}
<Avatar type="office" size={32} src="https://example.com/photo.jpg" alt="Jane Doe" />

{/* Initials avatar */}
<Avatar type="textProfile" size={24} text="JD" />

{/* Chip lead with custom icon */}
<Avatar type="chipLead" size={20} icon={<IconSearch16 size={12} color="#9CA3AF" />} />

{/* Add-more badge */}
<Avatar type="addMore" size={32} onClick={() => console.log('add')} />
```
