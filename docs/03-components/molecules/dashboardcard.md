# DashboardCard

**Tier:** Molecules  
**Source:** `src/components/molecules/DashboardCard/DashboardCard.tsx`

A stat/metric card for dashboards. Displays a title, primary metric value, optional change indicator, and supporting chart or content area.

## Import

```tsx
import { DashboardCard } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `—` | Card title |
| `value` | `string|number` | `—` | Primary metric value |
| `change` | `number` | `—` | Period-over-period change percentage |
| `trend` | `"up"|"down"|"neutral"` | `"neutral"` | Trend direction for change color |
| `description` | `string` | `—` | Supporting context text |
| `children` | `React.ReactNode` | `—` | Chart or custom content area |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--shadow-floating-gen-card`

## Code Example

```tsx
<DashboardCard
  title="Monthly Revenue"
  value="IDR 124,500,000"
  change={12.4}
  trend="up"
  description="vs previous month"
/>
```
