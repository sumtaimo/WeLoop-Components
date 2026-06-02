# Motion & Radius Tokens

Motion and radius tokens are theme-invariant: every WeLoop theme uses the same values. They are written to CSS custom properties by `applyThemeToCSSVars` and are therefore available to any component or custom CSS without importing JavaScript.

---

## Motion Duration Tokens

Controls how long transitions and animations run. Use faster values for micro-interactions and slower values for larger layout shifts.

| CSS Variable | Value | Use Cases |
|---|---|---|
| `--motion-duration-fast` | `100ms` | Tooltip appear/hide, hover colour changes, chip selection |
| `--motion-duration-normal` | `200ms` | Accordion open/close, dropdown menus, badge colour transitions |
| `--motion-duration-slow` | `300ms` | Drawer enter/exit, modal open/close, spinner rotation cycle |
| `--motion-duration-slower` | `500ms` | Skeleton shimmer loop, progress bar fill, onboarding reveals |

---

## Motion Easing Tokens

Controls the acceleration curve of transitions. Pair with the appropriate duration for natural-feeling motion.

| CSS Variable | Value | Description | Use Cases |
|---|---|---|---|
| `--motion-easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth ease-in-out (Material standard) | General state transitions: color, opacity, scale |
| `--motion-easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoots then settles (spring feel) | Popover/tooltip appear, chip expand, badge bounce |
| `--motion-easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerates to rest (ease-out) | Drawers, modals, overlays sliding into view |
| `--motion-easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerates away (ease-in) | Drawers, modals, overlays leaving the screen |

---

## Radius Tokens

Border-radius scale used across components. Prefer semantic tokens over hardcoded pixel values so corners respond correctly to any future radius re-scale.

| CSS Variable | Value | Typical Use |
|---|---|---|
| `--radius-none` | `0px` | Sharp-edged containers, dividers, images |
| `--radius-xs` | `2px` | Keyboard shortcut badges, tiny chips |
| `--radius-sm` | `4px` | Skeleton text, small tags, tooltip arrows |
| `--radius-md` | `8px` | Input fields, combo boxes, skeleton rects |
| `--radius-lg` | `12px` | Cards, accordion containers, dropdown menus |
| `--radius-xl` | `16px` | Drawer panels, modals, large card surfaces |
| `--radius-xxl` | `24px` | Full-bleed bottom sheets, hero image frames |
| `--radius-full` | `9999px` | Pills, avatar circles, skeleton circles, toggle thumbs |

---

## Usage Example

Apply tokens in inline styles or a stylesheet anywhere inside a `<ThemeProvider>`:

```tsx
// Inline styles
<div
  style={{
    borderRadius: 'var(--radius-lg)',
    transition: `opacity var(--motion-duration-normal) var(--motion-easing-default)`,
  }}
>
  Content
</div>
```

```css
/* External stylesheet */
.my-panel {
  border-radius: var(--radius-xl);
}

.my-panel[data-state="open"] {
  animation: slide-in var(--motion-duration-slow) var(--motion-easing-enter) forwards;
}

.my-panel[data-state="closed"] {
  animation: slide-out var(--motion-duration-slow) var(--motion-easing-exit) forwards;
}
```

> These variables are set on `document.documentElement` — they do not require any React context to consume in plain CSS.
