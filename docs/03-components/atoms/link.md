# Link

**Tier:** Atoms  
**Source:** `src/components/atoms/Link/Link.tsx`

A styled link/button component with brand color and interactive hover/press states. Renders as an `<a>` tag when `href` is supplied (and not disabled), otherwise as a `<button>`.

## Import

```tsx
import { Link } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Learn more"` | Link text |
| `href` | `string` | `—` | URL — renders an `<a>` tag when provided and not disabled |
| `showTrailIcon` | `boolean` | `true` | Show a trailing chevron icon after the label |
| `disabled` | `boolean` | `false` | Disables interaction and applies muted color |
| `onClick` | `() => void` | `—` | Click handler |
| `className` | `string` | `""` | Additional CSS class |

## Token Usage

This component uses hardcoded color values and does not consume CSS variables.

## Code Example

```tsx
{/* Default — button with trailing chevron */}
<Link label="Learn more" onClick={() => navigate('/docs')} />

{/* Anchor tag — navigates to URL */}
<Link label="Visit WeLoop" href="https://weloop.com" />

{/* Without trailing chevron */}
<Link label="Back" showTrailIcon={false} onClick={() => router.back()} />

{/* Disabled */}
<Link label="Unavailable" disabled={true} />
```
