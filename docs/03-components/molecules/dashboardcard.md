# DashboardCard

**Tier:** Molecules  
**Source:** `src/components/molecules/DashboardCard/DashboardCard.tsx`

A versatile dashboard card that comes in three visual types: `toggle` (a button card with a preview frame and action buttons), `minimal` (a compact gray card with a thumbnail preview), and `headline` (a stat card showing a metric with an optional delta trend).

## Import

```tsx
import { DashboardCard } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"toggle" \| "minimal" \| "headline"` | `"toggle"` | Card layout variant |
| `headline` | `string` | `"Title"` | Primary heading text displayed on the card |
| `description` | `string` | `"Explanatory text shown in the headline in a single or multiple lines."` | Supporting body text (used by `toggle` and `minimal` types) |
| `subtitle` | `string` | `"Subtitle"` | Muted label shown above the headline (used by `headline` type) |
| `trailText` | `string` | `—` | Secondary trailing label on the right of the subtitle row (`headline` type only) |
| `delta` | `string` | `—` | Period-over-period change value, e.g. `"12.4%"` or `"-3%"`. A leading `-` renders a down-chevron in red; anything else renders an up-chevron in green. (`headline` type only) |
| `period` | `string` | `—` | Period label shown after the delta value, e.g. `"vs last month"` (`headline` type only) |
| `selected` | `boolean` | `false` | Renders the card in a selected/active visual state |
| `disabled` | `boolean` | `false` | Disables interactions and renders a muted appearance |
| `onClick` | `() => void` | `—` | Click handler; ignored when `disabled` is true |
| `className` | `string` | `""` | Additional CSS class applied to the outer wrapper |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--shadow-brand-default`
- `--color-text-on-bg-primary`
- `--color-bg-brand-contrast`
- `--color-border-brand`

## Code Example

```tsx
{/* Headline / stat card */}
<DashboardCard
  type="headline"
  subtitle="Monthly Revenue"
  headline="IDR 124,500,000"
  delta="12.4%"
  period="vs last month"
  trailText="Jun 2025"
/>

{/* Toggle card with selection */}
<DashboardCard
  type="toggle"
  headline="Sales Overview"
  description="View and manage your sales pipeline across all regions."
  selected={isSelected}
  onClick={() => setIsSelected(true)}
/>

{/* Minimal card — disabled */}
<DashboardCard
  type="minimal"
  headline="Inventory"
  description="Stock levels across all warehouses."
  disabled
/>
```
