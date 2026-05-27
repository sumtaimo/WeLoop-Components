# WeLoop Components 2.1

Figma-verified React component library for the WeLoop 2.1 design system.  
Multi-brand tokens (WeBill365 · WABOOKS · WeCafe) × light/dark modes.  
Built on **Radix UI** primitives — accessibility, keyboard navigation, and smooth animations out of the box.

---

## Installation

```bash
npm install weloop-components
```

> **Peer dependencies** required in your app:
> ```bash
> npm install react react-dom
> ```

---

## ⚠️ Import rule

Only import from the package root or its sub-paths.  
**Do not** reference anything inside `showcase/` — that folder is the internal demo app and is excluded from the published package.

```tsx
// ✅ Correct
import { Toggle, Tooltip, Dialog } from "weloop-components";
import { applyThemeToCSSVars }      from "weloop-components/tokens";

// ❌ Never do this
import { ... } from "weloop-components/showcase/...";
```

---

## Components

### Atoms

| Component | Figma node | Description |
|---|---|---|
| `Avatar` | — | 8 types × 3 sizes. `type="office"` uses Radix Avatar for image fallback |
| `Chip` | 5730:7847 | Suggest (✓) and Input (avatar) types, S/M sizes, removable |
| `Checkbox` | 215:412 | SM/LG, indeterminate — Radix Checkbox |
| `FormField` | 215:423 | Text / Numeric / ComboLeft / ComboRight / Textarea — Radix Select + Label |
| `Tooltip` | 215:425 | Dark pill `#1E293B` with ✦ icon, 9 tail positions — Radix Tooltip |
| `Toggle` | 215:424 | SM (36×20) / MD (44×24), all states — Radix Switch |
| `ButtonSingle` | — | Primary/common, filled/outline, 3 sizes |
| `ButtonDropdown` | — | Split button — pass `menuItems[]` for a real Radix dropdown menu |
| `ButtonSegment` | — | Segmented control |
| `Link` | — | Styled anchor |
| `NotifBadge` | — | Notification count badge |
| `PaymentBadge` | — | Payment method badge |

### Molecules
`Banner` · `DashboardCard`

### Organisms
`DataTable` (sortable, selectable, inline notes/status) · `Dialog` (simple / list / form / export)

---

## Quick examples

```tsx
// Toggle
import { Toggle } from "weloop-components";

const [on, setOn] = useState(false);
<Toggle size="md" checked={on} onChange={setOn} label="Dark mode" showLabel />

// Tooltip (all 9 tail positions supported)
import { Tooltip } from "weloop-components";

<Tooltip content="Save changes" side="top" align="start">
  <button>Save</button>
</Tooltip>

// Dialog — 4 variants
import { Dialog, DEFAULT_FORM_FIELDS } from "weloop-components";

<Dialog
  variant="form"
  open={open}
  title="Add Member"
  fields={DEFAULT_FORM_FIELDS}
  onSubmit={values => console.log(values)}
  onClose={() => setOpen(false)}
/>

// ButtonDropdown with real Radix menu
import { ButtonDropdown } from "weloop-components";

<ButtonDropdown
  label="Actions"
  menuItems={[
    { id: "edit",   label: "Edit",   icon: <EditIcon /> },
    { id: "delete", label: "Delete", danger: true, separator: true },
  ]}
  onMenuSelect={id => console.log(id)}
/>

// FormField with live Select dropdown
import { FormField } from "weloop-components";

<FormField
  type="comboLeft"
  label="Amount"
  selectOptions={["USD", "EUR", "GBP"]}
  selectValue={currency}
  onSelectChange={setCurrency}
  value={amount}
  onChange={setAmount}
/>
```

---

## Tokens

```tsx
import { applyThemeToCSSVars } from "weloop-components/tokens";

// Available: "webill365" | "wabooks" | "wecafe"  ×  "light" | "dark"
applyThemeToCSSVars("webill365", "light");
```

---

## For contributors

The `showcase/` directory is the internal Vite demo app — **not published**.

```bash
git clone https://github.com/sumtaimo/WeLoop-Components.git
cd WeLoop-Components
npm install
npm run dev      # http://localhost:5173
```

---

## License

ISC © Products Operations Dept.
