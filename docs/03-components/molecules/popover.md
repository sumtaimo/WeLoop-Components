# Popover

**Tier:** Molecules  
**Source:** `src/components/molecules/Popover/Popover.tsx`

A confirmation-style floating card that appears relative to any trigger element. Built on Radix Popover. The card contains a title, optional description, and two footer buttons (a text-style "cancel" and an outlined "action" button). The trigger is passed as `children`.

## Import

```tsx
import { Popover } from 'weloop-components/components/molecules';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | *(required)* | The trigger element that opens the popover |
| `title` | `string` | `"Popover Title"` | Bold heading rendered at the top of the card |
| `description` | `string` | `"Write a single or two lines to explain specific objective."` | Supporting body text rendered below the title |
| `cancelLabel` | `string` | `"Cancel"` | Label for the left (text/link-style) button |
| `actionLabel` | `string` | `"Confirm"` | Label for the right (dark-outline) button |
| `onCancel` | `() => void` | `—` | Called when the cancel button is clicked; popover closes automatically |
| `onAction` | `() => void` | `—` | Called when the action button is clicked; popover closes automatically |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Preferred side of the trigger to display the popover |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment along the cross-axis |
| `sideOffset` | `number` | `8` | Pixel gap between the trigger edge and the popover card |
| `open` | `boolean` | `—` | Controlled open state |
| `defaultOpen` | `boolean` | `—` | Uncontrolled initial open state |
| `onOpenChange` | `(open: boolean) => void` | `—` | Called when the open state changes |
| `maxWidth` | `number` | `260` | Maximum width of the popover card in pixels |
| `style` | `React.CSSProperties` | `—` | Inline styles applied to the popover content element |

## Token Usage

CSS variables consumed by this component:

- `--color-text-brand`
- `--shadow-floating-default`

## Code Example

```tsx
<Popover
  title="Delete record?"
  description="This action cannot be undone. The record will be permanently removed."
  cancelLabel="Cancel"
  actionLabel="Delete"
  onCancel={() => console.log('cancelled')}
  onAction={() => handleDelete()}
  side="top"
  align="center"
>
  <button>Delete</button>
</Popover>
```
