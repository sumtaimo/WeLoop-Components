# Radio

**Tier:** Atoms  
**Source:** `src/components/atoms/Radio/Radio.tsx`

A radio button component. Use individual `Radio` items inside a `RadioGroup` for mutually exclusive selection, or use a standalone `Radio` in controlled mode.

## Import

```tsx
import { Radio, RadioGroup } from 'weloop-components/components/atoms';
```

## RadioGroup Props

`RadioGroup` manages selection state and provides context to child `Radio` items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `—` | Controlled selected value |
| `defaultValue` | `string` | `""` | Initial uncontrolled value |
| `onChange` | `(value: string) => void` | `—` | Called when selection changes |
| `name` | `string` | `—` | HTML `name` attribute for all child inputs (auto-generated if omitted) |
| `disabled` | `boolean` | `false` | Disable all child radios |
| `error` | `boolean` | `false` | Apply error state to all child radios |
| `children` | `React.ReactNode` | `—` | `Radio` items (required) |
| `style` | `React.CSSProperties` | `—` | Custom container styles |

## Radio Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `—` | This option's value (required) |
| `label` | `string` | `—` | Label text |
| `size` | `"xs"|"sm"` | `"xs"` | Radio circle size — xs=16px, sm=20px |
| `disabled` | `boolean` | `false` | Disable this option (overrides group) |
| `error` | `boolean` | `false` | Error state (overrides group) |
| `checked` | `boolean` | `—` | Controlled checked state for standalone use |
| `onChange` | `(value: string) => void` | `—` | Called when this radio is selected (standalone use) |
| `style` | `React.CSSProperties` | `—` | Custom styles |

## Token Usage

CSS variables consumed by this component:

- `--color-bg-brand-primary`
- `--color-border-brand`
- `--shadow-input-brand`

## Code Example

```tsx
{/* Grouped — recommended usage */}
const [plan, setPlan] = useState('monthly');

<RadioGroup value={plan} onChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="annual"  label="Annual"  />
  <Radio value="lifetime" label="Lifetime" disabled />
</RadioGroup>

{/* Error state */}
<RadioGroup value={plan} onChange={setPlan} error>
  <Radio value="monthly" label="Monthly" />
  <Radio value="annual"  label="Annual"  />
</RadioGroup>

{/* Standalone controlled */}
<Radio
  value="agree"
  label="I agree to the terms"
  checked={agreed}
  onChange={() => setAgreed(true)}
  size="sm"
/>
```
