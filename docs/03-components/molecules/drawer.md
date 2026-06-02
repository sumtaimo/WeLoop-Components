# Drawer

**Tier:** Molecules  
**Source:** `src/components/molecules/Drawer/Drawer.tsx`

A slide-in panel built on Radix Dialog. Opens from the bottom, left, or right edge of the viewport with an animated overlay backdrop. Includes an optional drag handle (bottom only), a close button, an optional header section, and a scrollable body. Focus is trapped and the Escape key dismisses the drawer.

## Import

```tsx
import { Drawer } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Controls whether the drawer is visible |
| `onClose` | `() => void` | required | Called when the drawer requests to close (Escape key, overlay click, or close button) |
| `children` | `React.ReactNode` | required | Content rendered in the scrollable body |
| `title` | `string` | `—` | Visible heading inside the drawer header; also used as the accessible dialog title |
| `description` | `string` | `—` | Subtitle text below the title |
| `side` | `"left"|"right"|"bottom"` | `"bottom"` | Edge the drawer slides in from |
| `size` | `"sm"|"md"|"lg"|"full"` | `"md"` | Panel size (see size table below) |
| `showHandle` | `boolean` | `true` | Show the drag-handle bar at the top of a bottom drawer |
| `className` | `string` | `—` | Extra class names on the panel element |
| `style` | `React.CSSProperties` | `—` | Inline style overrides on the panel element |

### Size values

| Size | bottom | left / right |
|------|--------|-------------|
| `sm` | 40vh | 320px |
| `md` | 60vh | 400px |
| `lg` | 80vh | 520px |
| `full` | 100vh | 100% |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-surface-default` — panel background
- `--color-bg-surface-subtle` — close button resting background
- `--color-bg-surface-hover` — close button hover background
- `--color-border-subtle` — header bottom border
- `--color-text-default` — title text color
- `--color-text-subtle` — description text and close icon color
- `--color-border-default` — drag handle color
- `--radius-xl` — panel corner radius (16px)
- `--motion-duration-slow` — panel and overlay animation duration (default 300ms)
- `--motion-easing-enter` — enter easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`)
- `--motion-easing-exit` — exit easing curve (`cubic-bezier(0.55, 0, 0.45, 1)`)

## Code Example

```tsx
const [open, setOpen] = useState(false);

{/* Bottom sheet (default) */}
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Filter results"
  description="Narrow down the list using the options below."
>
  <FilterForm />
</Drawer>

{/* Right-side panel, large */}
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  size="lg"
  title="Edit profile"
>
  <ProfileForm />
</Drawer>
```
