# InlineTip

**Tier:** Atoms  
**Source:** `src/components/atoms/InlineTip/InlineTip.tsx`

An inline contextual hint block. Supports four types (information, danger, suggestion, warning) with filled or outline fill styles.

## Import

```tsx
import { InlineTip } from 'weloop-components/components/atoms';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"information"|"danger"|"suggestion"|"warning"` | `"information"` | Tip type determines color scheme |
| `fill` | `"filled"|"outline"` | `"filled"` | Background fill style |
| `title` | `string` | `—` | Bold title line |
| `description` | `string` | `—` | Description text |
| `linkPrefix` | `string` | `—` | Text before the link |
| `linkText` | `string` | `—` | Clickable link text |
| `onLinkClick` | `() => void` | `—` | Link click handler |
| `showLink` | `boolean` | `false` | Whether to render the link row |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-subtle`
- `--color-text-brand`
- `--color-border-brand`

## Code Example

```tsx
<InlineTip
  type="information"
  fill="filled"
  title="Did you know?"
  description="You can switch themes at any time from the settings panel."
  showLink
  linkPrefix="Learn more in "
  linkText="the docs"
  onLinkClick={() => openDocs()}
/>
```
