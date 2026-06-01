# EmptyState

**Tier:** Organisms  
**Source:** `src/components/organisms/EmptyState/EmptyState.tsx`

An inline empty-state block that renders an icon, title, description, and an optional call-to-action button. The `type` prop selects a preset icon and default text. Also exports `ErrorPage` — a full-panel error screen with an illustration, error code, action buttons, and a collapsible troubleshooting steps section.

## Import

```tsx
import { EmptyState, ErrorPage } from 'weloop-components/components/organisms';
```

## Types

```ts
export type EmptyStateType =
  | "no-results"      // gray search icon, neutral tone, "Clear filters" action
  | "failed-to-load"  // red search icon, error tone, "Retry" action
  | "no-clients"      // green check icon, positive tone
  | "no-documents"    // gray document icon, neutral tone
  | "custom";         // supply your own icon via the `icon` prop
```

## Props — EmptyState

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `EmptyStateType` | `"no-results"` | Preset variant; selects default icon, title, description, and action label |
| `title` | `string` | *(type default)* | Overrides the preset title text |
| `description` | `string` | *(type default)* | Overrides the preset description text |
| `actionLabel` | `string` | *(type default)* | Overrides the preset CTA button label |
| `onAction` | `() => void` | `—` | CTA button click handler; button is hidden when omitted |
| `icon` | `React.ReactNode` | *(type default)* | Custom icon node used when `type="custom"` or to override the preset icon |
| `style` | `React.CSSProperties` | `—` | Additional inline styles applied to the wrapper |

### Type presets

| `type` | Default title | Default action label |
|--------|--------------|----------------------|
| `"no-results"` | "No results" | "Clear filters" |
| `"failed-to-load"` | "Failed to load" | "Retry" |
| `"no-clients"` | "No clients registered." | *(none)* |
| `"no-documents"` | "No documents" | *(none)* |
| `"custom"` | "Nothing here" | *(none)* |

## Props — ErrorPage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `errorCode` | `string` | `"500"` | Error code displayed above the title |
| `title` | `string` | `"Oops! Something went wrong."` | Main error heading |
| `description` | `string` | `"We've encountered an unexpected error…"` | Supporting description text |
| `primaryLabel` | `string` | `"Return to Homepage"` | Primary action button label |
| `onPrimary` | `() => void` | `—` | Primary action button click handler |
| `secondaryLabel` | `string` | `"Go back"` | Secondary action button label |
| `onSecondary` | `() => void` | `—` | Secondary action button click handler |
| `steps` | `string[]` | *default step text* | Steps shown in the collapsible "Try these steps" section |
| `urgentContact` | `string` | `"023 900 750"` | Phone/link shown at the bottom of the steps section |
| `onContactClick` | `() => void` | `—` | Called when the contact link is clicked |
| `timestamp` | `string` | `—` | ISO string or formatted timestamp shown below the steps accordion |
| `variant` | `"default" \| "general"` | `"default"` | `"default"` shows steps + timestamp; `"general"` is compact without those |
| `style` | `React.CSSProperties` | `—` | Additional inline styles applied to the wrapper |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-bg-brand-subtle-press`
- `--color-text-brand`

## Code Example

```tsx
import { EmptyState, ErrorPage } from 'weloop-components/components/organisms';

// No results after filtering
<EmptyState
  type="no-results"
  onAction={() => clearFilters()}
/>

// Failed to load with retry
<EmptyState
  type="failed-to-load"
  onAction={() => retryFetch()}
/>

// Custom icon and text
<EmptyState
  type="custom"
  icon={<MyIcon />}
  title="No payments yet"
  description="Your payment history will appear here."
  actionLabel="Make a payment"
  onAction={() => router.push('/pay')}
/>

// Full-page error screen
<ErrorPage
  errorCode="404"
  title="Page not found"
  description="The page you are looking for doesn't exist or has been moved."
  primaryLabel="Return to Homepage"
  onPrimary={() => router.push('/')}
  secondaryLabel="Go back"
  onSecondary={() => router.back()}
  timestamp={new Date().toISOString()}
/>
```
