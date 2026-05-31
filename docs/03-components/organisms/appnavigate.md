# AppNavigate

**Tier:** Organisms  
**Source:** `src/components/organisms/AppNavigate/AppNavigate.tsx`

Top-level navigation organism composed of sub-components: AppBar (top desktop), DBottomBar (mobile bottom nav), DTopBar (mobile top), DialogSettingBar (settings overlay), and TitleNavBar (page title + back navigation).

## Import

```tsx
import { AppNavigate } from 'weloop-components/components/organisms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brand` | `"wabooks"|"webill365"|"wecafe"` | `—` | Brand identity for logo and colors |
| `activeRoute` | `string` | `—` | Current active route path |
| `navItems` | `Array<{ label: string; href: string; icon: React.ReactNode }>` | `[]` | Navigation items |
| `onNavigate` | `(href: string) => void` | `—` | Called when a nav item is clicked |
| `user` | `{ name: string; avatar?: string }` | `—` | Current user info |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-text-on-bg-primary`
- `--color-bg-surface-default`
- `--shadow-floating-default`

## Code Example

```tsx
<AppNavigate
  brand="webill365"
  activeRoute="/dashboard"
  navItems={[
    { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
    { label: 'Transactions', href: '/transactions', icon: <ListIcon /> },
  ]}
  onNavigate={(href) => router.push(href)}
  user={{ name: 'Jane Doe', avatar: '/avatar.jpg' }}
/>
```
