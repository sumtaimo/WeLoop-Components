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

## Import rule — single source of truth

Always import from the package root. The `showcase/` folder is an internal demo app — it is **not published** and must never be imported from.

```tsx
// ✅ Correct
import { Toggle, Tooltip, Dialog, ListItem, Pagination } from "weloop-components";
import { applyThemeToCSSVars } from "weloop-components/tokens";

// ❌ Never do this
import { ... } from "weloop-components/showcase/...";
```

---

## Brand colours & theming

WeLoop ships three brand themes. Apply the theme once at app startup; all components read CSS custom properties automatically.

```tsx
import { applyThemeToCSSVars } from "weloop-components/tokens";

// Signatures
applyThemeToCSSVars(theme: "webill365" | "wabooks" | "wecafe", mode: "light" | "dark");

// Examples
applyThemeToCSSVars("webill365", "light");  // WeBill365 — default corporate blue
applyThemeToCSSVars("wabooks",   "dark");   // WABOOKS    — dark accounting UI
applyThemeToCSSVars("wecafe",    "light");  // WeCafe     — warm hospitality palette
```

### Colour palette reference

These are the **fixed design-system colours** used across all components. Use them when building custom layouts that sit alongside WeLoop components so the UI stays consistent.

| Token | Hex | Usage |
|---|---|---|
| `--wl-primary` | `#1D32FF` | Brand blue — links, active states, CTA |
| `--wl-success` | `#22C55E` | Positive feedback, success badges |
| `--wl-warning` | `#F97316` | Caution notices, warning tips |
| `--wl-danger`  | `#EF4444` | Errors, destructive actions, danger tips |
| `--wl-surface` | `#FFFFFF` | Card / panel background |
| `--wl-canvas`  | `#F9FAFB` | Page / canvas background |
| `--wl-border`  | `#E5E7EB` | Default border |
| `--wl-border-subtle` | `#D4D4D4` | Card borders, input outlines |
| `--wl-text-primary`  | `#111827` | Body text, headings |
| `--wl-text-secondary`| `#374151` | Secondary text |
| `--wl-text-muted`    | `#A3A3A3` | Descriptions, meta labels |
| `--wl-text-disabled` | `#D1D5DB` | Disabled controls |

### Semantic colours — InlineTip / Snackbar / Toast

When you need to show contextual feedback or instructional copy, use `InlineTip` (inline) or `Snackbar`/`Toast` (transient) rather than raw colours. The type prop maps to:

| `type=` | Background | Use for |
|---|---|---|
| `"information"` | `#1F2937` dark | General guidance, neutral info |
| `"danger"`      | `#EF4444` red  | Critical errors, destructive actions |
| `"suggestion"`  | `#22C55E` green| Best practices, positive tips |
| `"warning"`     | `#F97316` orange | Caution, temporary disruption |

---

## Components

### Atoms

| Component | Figma | Description |
|---|---|---|
| `Avatar` | — | 8 types × 3 sizes. `type="office"` uses Radix Avatar for image fallback |
| `Chip` | 5730:7847 | Suggest (✓) and Input (avatar) types, S/M sizes, removable |
| `Checkbox` | 215:412 | SM/LG, indeterminate — Radix Checkbox |
| `FormField` | 215:423 | Text / Numeric / ComboLeft / ComboRight / Textarea — Radix Select + Label |
| `Tooltip` | 215:425 | Dark pill `#1E293B` with ✦ icon, 9 tail positions — Radix Tooltip |
| `Toggle` | 215:424 | SM (36×20) / MD (44×24), all states — Radix Switch |
| `ButtonSingle` | — | Primary/common, filled/outline, 3 sizes |
| `ButtonDropdown` | — | Split button — pass `menuItems[]` for a Radix dropdown menu |
| `ButtonSegment` | — | Segmented control |
| `Link` | — | Styled anchor |
| `NotifBadge` | — | Notification count badge |
| `PaymentBadge` | — | Payment method badge |
| `Toast` | — | Transient feedback pill (Radix Toast) |
| `Tabs` | — | Horizontal tab strip (Radix Tabs) |
| `Snackbar` | 1544:1893 | Bottom/top snackbar with action button (Radix Toast) |
| `ListItem` | 215:416 | 6 variants: notifi-link / notifi-default / notifi-list / bill-list / bank-list / minimal |
| `InlineTip` | 7673:11877 | Instructional tip: 4 types × filled/outline fill |

### Molecules

| Component | Figma | Description |
|---|---|---|
| `Banner` | — | Full-width announcement banner |
| `DashboardCard` | — | KPI summary card |
| `Pagination` | 618:1150 | `simple` (rows + X of Y + nav) · `paged` (numbered with ellipsis) |

### Organisms

| Component | Figma | Description |
|---|---|---|
| `DataTable` | — | Sortable, selectable table with inline notes and status |
| `Dialog` | — | Modal: simple / list / form / export variants |
| `DTopBar` | — | Desktop top bar |
| `DBottomBar` | — | Desktop bottom bar |
| `AppBar` | — | Mobile app bar |
| `TitleNavBar` | — | Title + back navigation bar |
| `DialogSettingBar` | — | Settings dialog bar |

---

## Quick examples

### ListItem

```tsx
import { ListItem } from "weloop-components";

// Notification with learn-more link
<ListItem
  type="notifi-link"
  title="Invoice Overdue"
  description="Your invoice #4821 is 14 days past due."
  count={3}
  linkText="Learn more"
  onLinkClick={() => navigate("/invoices")}
  showDivider
/>

// Bill row with label
<ListItem
  type="bill-list"
  title="Electricity Bill"
  description="Due 5 Jun 2026"
  count="£142.00"
  label="UTILITY"
/>

// Minimal row with chevron (clickable)
<ListItem
  type="minimal"
  title="All Transactions"
  count={128}
  onClick={() => navigate("/transactions")}
/>
```

### InlineTip

```tsx
import { InlineTip } from "weloop-components";

// Filled card (default)
<InlineTip
  type="warning"
  title="Your subscription expires in 3 days."
  description="Renew now to avoid service interruption."
  linkPrefix="For urgent situation,"
  linkText="Renew now"
  onLinkClick={() => navigate("/billing")}
/>

// Flat outline style — no card border
<InlineTip
  type="information"
  fill="outline"
  title="Batch actions can save time when processing multiple items."
  showLink={false}
/>
```

### Pagination

```tsx
import { Pagination } from "weloop-components";

// Simple variant — rows selector + "X of Y" text
<Pagination
  variant="simple"
  page={page}
  totalPages={Math.ceil(total / pageSize)}
  pageSize={pageSize}
  totalItems={total}
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1); }}
/>

// Paged variant — numbered buttons + ellipsis
<Pagination
  variant="paged"
  page={page}
  totalPages={200}
  pageSize={pageSize}
  totalItems={5000}
  totalLabel="Total Amt: £689,429"
  onPageChange={setPage}
  onPageSizeChange={size => { setPageSize(size); setPage(1); }}
/>
```

### Snackbar

```tsx
import { SnackbarContainer, useSnackbar } from "weloop-components";

// Wrap your page/app once
function App() {
  return (
    <SnackbarContainer position="bottom-center">
      <MyPage />
    </SnackbarContainer>
  );
}

// Call the hook anywhere inside the container
function MyPage() {
  const { success, warning, critical, info } = useSnackbar();
  return (
    <button onClick={() => success("Payment processed", { action: { label: "View", onClick: () => {} } })}>
      Pay
    </button>
  );
}
```

### Toggle

```tsx
import { Toggle } from "weloop-components";

const [on, setOn] = useState(false);
<Toggle size="md" checked={on} onChange={setOn} label="Dark mode" showLabel />
```

### Tooltip

```tsx
import { Tooltip } from "weloop-components";

<Tooltip content="Save changes" side="top" align="start">
  <button>Save</button>
</Tooltip>
```

### Dialog

```tsx
import { Dialog, DEFAULT_FORM_FIELDS } from "weloop-components";

<Dialog
  variant="form"
  open={open}
  title="Add Member"
  fields={DEFAULT_FORM_FIELDS}
  onSubmit={values => console.log(values)}
  onClose={() => setOpen(false)}
/>
```

### ButtonDropdown

```tsx
import { ButtonDropdown } from "weloop-components";

<ButtonDropdown
  label="Actions"
  menuItems={[
    { id: "edit",   label: "Edit" },
    { id: "delete", label: "Delete", danger: true, separator: true },
  ]}
  onMenuSelect={id => console.log(id)}
/>
```

### FormField

```tsx
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

## Animations

`Snackbar` and `Toast` require CSS keyframe animations registered in your app's HTML. Add the following block to your `index.html` (or global stylesheet):

```html
<style>
  /* Toast */
  @keyframes wl-toast-in  { from { opacity:0; transform:translateY(8px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes wl-toast-out { from { opacity:1; transform:translateY(0)   scale(1);    } to { opacity:0; transform:translateY(8px) scale(0.95); } }
  .wl-toast[data-state="open"]   { animation: wl-toast-in  0.25s ease; }
  .wl-toast[data-state="closed"] { animation: wl-toast-out 0.18s ease; }

  /* Snackbar */
  @keyframes wl-snackbar-in-up    { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes wl-snackbar-out-down { from{opacity:1;transform:translateY(0) scale(1)}      to{opacity:0;transform:translateY(14px) scale(.97)} }
  @keyframes wl-snackbar-in-down  { from{opacity:0;transform:translateY(-14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes wl-snackbar-out-up   { from{opacity:1;transform:translateY(0) scale(1)}       to{opacity:0;transform:translateY(-14px) scale(.97)} }
  .wl-snackbar[data-state="open"][data-pos^="bottom"]   { animation: wl-snackbar-in-up    0.30s cubic-bezier(.34,1.26,.64,1); }
  .wl-snackbar[data-state="closed"][data-pos^="bottom"] { animation: wl-snackbar-out-down 0.20s ease; }
  .wl-snackbar[data-state="open"][data-pos^="top"]      { animation: wl-snackbar-in-down  0.30s cubic-bezier(.34,1.26,.64,1); }
  .wl-snackbar[data-state="closed"][data-pos^="top"]    { animation: wl-snackbar-out-up   0.20s ease; }
</style>
```

---

## For contributors

The `showcase/` directory is the internal Vite demo app — **not published**.

```bash
git clone https://github.com/sumtaimo/WeLoop-Components.git
cd WeLoop-Components
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + Vite build
```

Only `src/components`, `src/tokens`, and `src/index.ts` are published to npm — see the `files` field in `package.json`.

---

## License

ISC © Products Operations Dept.
