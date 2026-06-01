# AppNavigate

**Tier:** Organisms  
**Source:** `src/components/organisms/AppNavigate/`

A collection of five independent navigation bar components. Each is imported and used separately — there is no unified `AppNavigate` wrapper.

| Component | File | Purpose |
|-----------|------|---------|
| `AppBar` | `AppBar.tsx` | Top application bar with points badge, notification bell, and avatar |
| `DTopBar` | `DTopBar.tsx` | Dialog/page top bar with title, draft badge, and two action buttons |
| `DBottomBar` | `DBottomBar.tsx` | Bottom action bar with a split dropdown, a learn-more link, and two action buttons |
| `TitleNavBar` | `TitleNavBar.tsx` | Breadcrumb title bar with a home icon and up to three breadcrumb levels |
| `DialogSettingBar` | `DialogSettingBar.tsx` | Settings dialog header with back/forward chevrons, title, and a close button |

## Import

```tsx
import {
  AppBar,
  DTopBar,
  DBottomBar,
  TitleNavBar,
  DialogSettingBar,
} from 'weloop-components/components/organisms';
```

---

## AppBar

Top-of-page application bar aligned to the right. Displays a gamification points badge, a notification bell with a count badge, and a user avatar button.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `points` | `string` | `"770P"` | Points value displayed in the coin badge |
| `notificationCount` | `string` | `"99+"` | Badge text on the notification bell; omit to hide the badge |
| `avatarSrc` | `string` | `—` | URL for the user avatar image; falls back to a generic user icon |
| `onNotificationClick` | `() => void` | `—` | Called when the notification bell button is clicked |
| `onAvatarClick` | `() => void` | `—` | Called when the avatar button is clicked |
| `className` | `string` | `""` | Additional CSS class applied to the bar wrapper |

### Code Example

```tsx
import { AppBar } from 'weloop-components/components/organisms';

<AppBar
  points="1,240P"
  notificationCount="3"
  avatarSrc="/user-photo.jpg"
  onNotificationClick={() => openNotificationPanel()}
  onAvatarClick={() => openProfileMenu()}
/>
```

---

## DTopBar

Dialog or page-level top bar with a title, an optional "Draft" badge, and two action buttons (a ghost button and a solid button with a star icon).

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Dialog Title"` | Title text displayed on the left |
| `showDraftBadge` | `boolean` | `true` | Show/hide the "Draft" badge next to the title |
| `primaryLabel` | `string` | `"Button"` | Label for the ghost (text) button on the right |
| `secondaryLabel` | `string` | `"Button"` | Label for the solid (icon + text) button on the right |
| `onPrimaryAction` | `() => void` | `—` | Called when the ghost button is clicked |
| `onSecondaryAction` | `() => void` | `—` | Called when the solid button is clicked |
| `className` | `string` | `""` | Additional CSS class applied to the bar wrapper |

### Code Example

```tsx
import { DTopBar } from 'weloop-components/components/organisms';

<DTopBar
  title="New Invoice"
  showDraftBadge={true}
  primaryLabel="Preview"
  secondaryLabel="Publish"
  onPrimaryAction={() => openPreview()}
  onSecondaryAction={() => publish()}
/>
```

---

## DBottomBar

Bottom action bar for dialogs or full-screen panels. The left side contains a split dropdown button and a "learn more" link (hideable); the right side contains a ghost button and a solid button with a star icon.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dropdownLabel` | `string` | `"Button Option"` | Label for the split dropdown button |
| `learnMoreLabel` | `string` | `"Learn more"` | Label for the learn-more link button |
| `primaryLabel` | `string` | `"Button"` | Label for the ghost (text) button |
| `secondaryLabel` | `string` | `"Button"` | Label for the solid (icon + text) button |
| `onDropdownClick` | `() => void` | `—` | Called when either part of the split dropdown is clicked |
| `onLearnMoreClick` | `() => void` | `—` | Called when the learn-more link is clicked |
| `onPrimaryAction` | `() => void` | `—` | Called when the ghost button is clicked |
| `onSecondaryAction` | `() => void` | `—` | Called when the solid button is clicked |
| `hideActions` | `boolean` | `false` | Hides the entire left action area (dropdown + learn-more link) |
| `className` | `string` | `""` | Additional CSS class applied to the bar wrapper |

### Code Example

```tsx
import { DBottomBar } from 'weloop-components/components/organisms';

<DBottomBar
  dropdownLabel="Save as draft"
  learnMoreLabel="Learn more"
  primaryLabel="Cancel"
  secondaryLabel="Submit"
  onDropdownClick={() => saveAsDraft()}
  onLearnMoreClick={() => openHelp()}
  onPrimaryAction={() => cancel()}
  onSecondaryAction={() => submit()}
/>
```

---

## TitleNavBar

Breadcrumb navigation bar. Shows a home (building) icon button, a vertical divider, and a breadcrumb trail of up to three levels.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `parentLabel` | `string` | `"Headline"` | First (parent) breadcrumb label — rendered muted |
| `currentLabel` | `string` | `"Headline"` | Current (active) breadcrumb label — rendered in full colour |
| `childLabel` | `string` | `—` | Optional third-level breadcrumb label |
| `onHomeClick` | `() => void` | `—` | Called when the home/building icon button is clicked |
| `onParentClick` | `() => void` | `—` | Called when the parent breadcrumb is clicked; omit to make it non-interactive |
| `className` | `string` | `""` | Additional CSS class applied to the bar wrapper |

### Code Example

```tsx
import { TitleNavBar } from 'weloop-components/components/organisms';

<TitleNavBar
  parentLabel="Clients"
  currentLabel="Jane Doe"
  childLabel="Invoice #001"
  onHomeClick={() => router.push('/')}
  onParentClick={() => router.push('/clients')}
/>
```

---

## DialogSettingBar

Compact settings dialog header. Provides back and forward chevron navigation buttons, a centred title, and a close (×) button.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Dialog Title"` | Title text displayed in the bar |
| `onBack` | `() => void` | `—` | Called when the back (left chevron) button is clicked |
| `onForward` | `() => void` | `—` | Called when the forward (right chevron) button is clicked |
| `onClose` | `() => void` | `—` | Called when the close (×) button is clicked |
| `className` | `string` | `""` | Additional CSS class applied to the bar wrapper |

### Code Example

```tsx
import { DialogSettingBar } from 'weloop-components/components/organisms';

<DialogSettingBar
  title="Account Settings"
  onBack={() => goBack()}
  onForward={() => goForward()}
  onClose={() => closeDialog()}
/>
```

---

## Token Usage

CSS variables consumed across the AppNavigate components:

- `--color-text-brand` (used for brand-coloured button text)
