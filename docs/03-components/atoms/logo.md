# Logo

**Tier:** Atoms  
**Source:** `src/components/atoms/Logo/Logo.tsx`

Renders a product or brand logo by name. Automatically scales width to maintain the original SVG aspect ratio based on the provided height.

## Import

```tsx
import { Logo } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `LogoName` | `—` | Which logo to render (required) |
| `height` | `number` | `24` | Height in pixels; width is derived from the SVG aspect ratio |
| `className` | `string` | `—` | Additional CSS class |
| `style` | `React.CSSProperties` | `—` | Custom inline styles |

### `LogoName` values

| Value | Description |
|-------|-------------|
| `"webill365-wordmark"` | WeBill365 full wordmark (orange + blue) |
| `"webill365-mark"` | WeBill365 square icon mark |
| `"webill365-compact"` | WeBill365 compact square icon |
| `"wabooks"` | WaBooks square icon |
| `"mastercard"` | Mastercard logo |
| `"visa"` | Visa logo |
| `"khqr"` | KHQR logo |
| `"ppcb"` | PPCB square icon |
| `"ppcb-wordmark"` | PPCB full wordmark |
| `"new"` | "New" badge icon |
| `"caminv"` | CamInv square icon |
| `"webcash-group"` | WebCash Group full wordmark |
| `"webcash"` | WebCash icon mark |

## Token Usage

This component renders inline SVGs with hardcoded colors and does not consume CSS variables.

## Code Example

```tsx
<Logo name="webill365-wordmark" height={18} />
<Logo name="webill365-mark" height={32} />
<Logo name="mastercard" height={24} />
<Logo name="ppcb-wordmark" height={18} />
```
