import React, { useState } from "react";

// Atoms
import { Avatar } from "../components/atoms/Avatar";
import { Badge } from "../components/atoms/Badge";
import { Button } from "../components/atoms/Button";
import { ButtonDropdown } from "../components/atoms/ButtonDropdown";
import { ButtonSegment } from "../components/atoms/ButtonSegment";
import { ButtonSingle } from "../components/atoms/ButtonSingle";
import { Divider } from "../components/atoms/Divider";
import { Heading } from "../components/atoms/Heading";
import { Input } from "../components/atoms/Input";
import { Link } from "../components/atoms/Link";
import { NotifBadge } from "../components/atoms/NotifBadge";
import { PaymentBadge } from "../components/atoms/PaymentBadge";
import { Text } from "../components/atoms/Text";

// Molecules
import { Alert } from "../components/molecules/Alert";
import { Card, CardHeader, CardBody, CardFooter } from "../components/molecules/Card";
import { FormField } from "../components/molecules/FormField";
import { UserProfile } from "../components/molecules/UserProfile";

// Organisms
import { AppBar } from "../components/organisms/AppNavigate/AppBar";
import { DataTable, type Column } from "../components/organisms/DataTable";
import { Navbar } from "../components/organisms/Navbar";

// Layouts
import { Container } from "../components/layouts/Container";
import { Grid, GridItem } from "../components/layouts/Grid";
import { Stack } from "../components/layouts/Stack";

// Tokens
import { colors, radii, shadows, spacing, typography } from "../tokens";

// ─── helpers ────────────────────────────────────────────────────────────────

const SECTIONS = [
  "Atoms",
  "Molecules",
  "Organisms",
  "Layouts",
  "Tokens",
] as const;

function SectionBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mb-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </section>
  );
}

function ComponentBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{title}</p>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {children}
      </div>
    </div>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      {label && <p className="text-[11px] text-gray-400 mb-2">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ─── table data ─────────────────────────────────────────────────────────────

type InvoiceRow = Record<string, unknown> & {
  id: string;
  vendor: string;
  amount: string;
  status: string;
  date: string;
};

const TABLE_COLS: Column<InvoiceRow>[] = [
  { key: "id", header: "Invoice", width: "100px" },
  { key: "vendor", header: "Vendor" },
  { key: "amount", header: "Amount", align: "right" },
  {
    key: "status",
    header: "Status",
    render: (v) => <PaymentBadge status={v as never} size="S" />,
  },
  { key: "date", header: "Date", align: "right" },
];

const TABLE_DATA: InvoiceRow[] = [
  { id: "INV-001", vendor: "Acme Corp",    amount: "$4,200.00", status: "paid",       date: "2 May 2026" },
  { id: "INV-002", vendor: "Beta Ltd",     amount: "$1,800.00", status: "inProgress", date: "10 May 2026" },
  { id: "INV-003", vendor: "Gamma Inc",    amount: "$950.00",   status: "overdue",    date: "1 Apr 2026" },
  { id: "INV-004", vendor: "Delta Co",     amount: "$3,400.00", status: "review",     date: "20 May 2026" },
];

// ─── App ────────────────────────────────────────────────────────────────────

export function App() {
  const [activeSegment, setActiveSegment] = useState("week");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <Navbar
        logo={<span className="text-base font-bold text-blue-600 tracking-tight">WeLoop</span>}
        items={[
          { label: "Components", href: "#atoms", active: true },
          { label: "Tokens",     href: "#tokens" },
        ]}
        actions={<Badge variant="primary" dot size="sm">v1.0</Badge>}
        user={{ name: "Taimo Sum" }}
        sticky
      />

      <Container size="xl" className="py-12">

        {/* ── hero ── */}
        <div className="mb-14">
          <Heading level="h1" className="mb-3">WeLoop Components</Heading>
          <Text size="lg" color="muted">
            React component library — TypeScript + Tailwind CSS.
          </Text>
        </div>

        {/* ════════════════════════════════════════════
            ATOMS
        ════════════════════════════════════════════ */}
        <SectionBlock id="atoms" title="Atoms">

          {/* Button */}
          <ComponentBlock title="Button">
            <Row label="variant">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </Row>
            <Row label="size">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </Row>
            <Row label="state">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </Row>
            <Row label="icons">
              <Button
                variant="primary"
                leftIcon={
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                }
              >
                Add
              </Button>
              <Button
                variant="secondary"
                rightIcon={
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                }
              >
                Next
              </Button>
            </Row>
          </ComponentBlock>

          {/* ButtonSingle */}
          <ComponentBlock title="ButtonSingle">
            <Row label="filled">
              <ButtonSingle buttonType="primary" variant="filled">Primary</ButtonSingle>
              <ButtonSingle buttonType="danger"  variant="filled">Danger</ButtonSingle>
              <ButtonSingle buttonType="ghost"   variant="filled">Ghost</ButtonSingle>
            </Row>
            <Row label="outline">
              <ButtonSingle buttonType="primary" variant="outline">Primary</ButtonSingle>
              <ButtonSingle buttonType="danger"  variant="outline">Danger</ButtonSingle>
              <ButtonSingle buttonType="ghost"   variant="outline">Ghost</ButtonSingle>
            </Row>
            <Row label="ghost (text)">
              <ButtonSingle buttonType="primary" variant="ghost">Primary</ButtonSingle>
              <ButtonSingle buttonType="danger"  variant="ghost">Danger</ButtonSingle>
              <ButtonSingle buttonType="ghost"   variant="ghost">Ghost</ButtonSingle>
            </Row>
            <Row label="size">
              <ButtonSingle size="xs">XSmall</ButtonSingle>
              <ButtonSingle size="sm">Small</ButtonSingle>
              <ButtonSingle size="md">Medium</ButtonSingle>
            </Row>
            <Row label="shortcut + disabled">
              <ButtonSingle shortcut="⌘K">With shortcut</ButtonSingle>
              <ButtonSingle disabled>Disabled</ButtonSingle>
            </Row>
          </ComponentBlock>

          {/* ButtonDropdown */}
          <ComponentBlock title="ButtonDropdown">
            <Row label="filled">
              <ButtonDropdown buttonType="primary" filled label="Primary" open={dropdownOpen} onChevronClick={() => setDropdownOpen(o => !o)} />
              <ButtonDropdown buttonType="common"  filled label="Common" />
            </Row>
            <Row label="outline">
              <ButtonDropdown buttonType="primary" filled={false} label="Primary" />
              <ButtonDropdown buttonType="common"  filled={false} label="Common" />
            </Row>
            <Row label="size">
              <ButtonDropdown size="xs" label="XSmall" />
              <ButtonDropdown size="sm" label="Small" />
              <ButtonDropdown size="md" label="Medium" />
            </Row>
            <Row label="disabled">
              <ButtonDropdown disabled label="Disabled" />
            </Row>
          </ComponentBlock>

          {/* ButtonSegment */}
          <ComponentBlock title="ButtonSegment">
            <Row label="interactive">
              <ButtonSegment
                segments={[
                  { key: "day",   label: "Day" },
                  { key: "week",  label: "Week" },
                  { key: "month", label: "Month" },
                ]}
                activeKey={activeSegment}
                onChange={setActiveSegment}
              />
            </Row>
            <Row label="disabled">
              <ButtonSegment
                segments={[{ key: "a", label: "Option A" }, { key: "b", label: "Option B" }]}
                activeKey="a"
                disabled
              />
            </Row>
          </ComponentBlock>

          {/* Avatar */}
          <ComponentBlock title="Avatar">
            <Row label="size">
              <Avatar size="xs" alt="Alice Johnson" />
              <Avatar size="sm" alt="Bob Smith" />
              <Avatar size="md" alt="Carol White" />
              <Avatar size="lg" alt="David Brown" />
              <Avatar size="xl" alt="Eva Green" />
            </Row>
            <Row label="custom initials">
              <Avatar size="md" initials="WL" />
              <Avatar size="lg" initials="JS" />
            </Row>
          </ComponentBlock>

          {/* Badge */}
          <ComponentBlock title="Badge">
            <Row label="variant">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </Row>
            <Row label="dot">
              <Badge variant="success" dot>Active</Badge>
              <Badge variant="warning" dot>Pending</Badge>
              <Badge variant="danger"  dot>Critical</Badge>
            </Row>
            <Row label="size">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
            </Row>
          </ComponentBlock>

          {/* NotifBadge */}
          <ComponentBlock title="NotifBadge">
            <Row label="size">
              <NotifBadge size="large" label="5" />
              <NotifBadge size="large" label="99+" />
              <NotifBadge size="size3" />
              <NotifBadge size="small" />
            </Row>
          </ComponentBlock>

          {/* PaymentBadge */}
          <ComponentBlock title="PaymentBadge">
            <Row label="size M">
              {(["draft","scheduled","inProgress","approvalPending","partiallyPaid","paid","overdue","rejected"] as const).map(s => (
                <PaymentBadge key={s} status={s} size="M" />
              ))}
            </Row>
            <Row label="size S">
              {(["valid","overpaid","closed","review","submitted"] as const).map(s => (
                <PaymentBadge key={s} status={s} size="S" />
              ))}
            </Row>
            <Row label="no icon">
              <PaymentBadge status="paid"       showIcon={false} />
              <PaymentBadge status="inProgress" showIcon={false} />
              <PaymentBadge status="overdue"    showIcon={false} />
            </Row>
          </ComponentBlock>

          {/* Heading */}
          <ComponentBlock title="Heading">
            <Stack direction="column" gap={2}>
              <Heading level="h1">Heading H1</Heading>
              <Heading level="h2">Heading H2</Heading>
              <Heading level="h3">Heading H3</Heading>
              <Heading level="h4">Heading H4</Heading>
              <Heading level="h5">Heading H5</Heading>
              <Heading level="h6">Heading H6</Heading>
            </Stack>
            <div className="mt-4 flex flex-wrap gap-4">
              <Heading level="h3" color="default">Default</Heading>
              <Heading level="h3" color="muted">Muted</Heading>
              <Heading level="h3" color="primary">Primary</Heading>
            </div>
          </ComponentBlock>

          {/* Text */}
          <ComponentBlock title="Text">
            <Stack direction="column" gap={2}>
              <Text variant="body" size="lg">Body large — The quick brown fox</Text>
              <Text variant="body" size="base">Body base — The quick brown fox</Text>
              <Text variant="body" size="sm">Body small — The quick brown fox</Text>
              <Text variant="caption" size="xs" color="muted">Caption / muted — helper description text</Text>
              <Text variant="overline" size="xs" weight="semibold">Overline label</Text>
              <Text variant="code" size="sm">const x = "code variant";</Text>
            </Stack>
            <div className="mt-4 flex flex-wrap gap-4">
              <Text color="default" weight="semibold">Default</Text>
              <Text color="muted"   weight="semibold">Muted</Text>
              <Text color="primary" weight="semibold">Primary</Text>
              <Text color="error"   weight="semibold">Error</Text>
            </div>
          </ComponentBlock>

          {/* Input */}
          <ComponentBlock title="Input">
            <Grid cols={1} colsMd={2} gap={5}>
              <Input
                label="Username"
                placeholder="john.doe"
                helperText="Your public display name"
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="hello@example.com"
                fullWidth
                leftAddon={
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                errorText="Must be at least 8 characters"
                fullWidth
              />
              <Input label="Disabled" placeholder="Read only" disabled fullWidth />
            </Grid>
          </ComponentBlock>

          {/* Link */}
          <ComponentBlock title="Link">
            <Row label="variants">
              <Link label="Learn more" href="#" />
              <Link label="No trail icon" href="#" showTrailIcon={false} />
              <Link label="Disabled" disabled />
            </Row>
          </ComponentBlock>

          {/* Divider */}
          <ComponentBlock title="Divider">
            <Stack direction="column" gap={4}>
              <Divider />
              <Divider label="OR" />
              <div className="flex items-center gap-4 h-8">
                <span className="text-sm text-gray-500">Left</span>
                <Divider orientation="vertical" />
                <span className="text-sm text-gray-500">Right</span>
              </div>
            </Stack>
          </ComponentBlock>

        </SectionBlock>

        {/* ════════════════════════════════════════════
            MOLECULES
        ════════════════════════════════════════════ */}
        <SectionBlock id="molecules" title="Molecules">

          {/* Alert */}
          <ComponentBlock title="Alert">
            <Stack direction="column" gap={3}>
              <Alert variant="info"    title="Informational">Something useful to know.</Alert>
              <Alert variant="success" title="Success">Your changes were saved.</Alert>
              <Alert variant="warning" title="Warning">Subscription expires in 3 days.</Alert>
              <Alert variant="error"   title="Error">Something went wrong. Try again.</Alert>
              {alertVisible && (
                <Alert variant="info" title="Dismissible" onDismiss={() => setAlertVisible(false)}>
                  Click × to dismiss this alert.
                </Alert>
              )}
            </Stack>
          </ComponentBlock>

          {/* Card */}
          <ComponentBlock title="Card">
            <Grid cols={1} colsMd={3} gap={4}>
              <Card>
                <CardHeader
                  title="Basic card"
                  subtitle="Header + body + footer"
                  action={<Badge variant="success" dot>Active</Badge>}
                />
                <CardBody>
                  <Text size="sm" color="muted">Cards group related content and actions together.</Text>
                </CardBody>
                <CardFooter>
                  <Button size="sm" variant="primary">View</Button>
                  <Button size="sm" variant="ghost">Dismiss</Button>
                </CardFooter>
              </Card>

              <Card shadow="md">
                <CardHeader title="User" />
                <CardBody>
                  <UserProfile
                    name="Jane Doe"
                    role="Product Designer"
                    status={{ label: "Active", variant: "success" }}
                  />
                </CardBody>
              </Card>

              <Card padding="lg" shadow="lg">
                <CardHeader title="Metric" subtitle="Last 30 days" />
                <CardBody>
                  <Heading level="h2">2,841</Heading>
                  <Text size="sm" color="primary" weight="medium">↑ 12.5%</Text>
                </CardBody>
              </Card>
            </Grid>
          </ComponentBlock>

          {/* FormField */}
          <ComponentBlock title="FormField">
            <Grid cols={1} colsMd={2} gap={5}>
              <FormField label="Full name" htmlFor="fname" required helperText="As on your ID">
                <Input id="fname" placeholder="Jane Doe" fullWidth />
              </FormField>
              <FormField label="Email" htmlFor="femail" errorText="Enter a valid email">
                <Input id="femail" type="email" placeholder="jane@example.com" fullWidth errorText="Enter a valid email" />
              </FormField>
            </Grid>
          </ComponentBlock>

          {/* UserProfile */}
          <ComponentBlock title="UserProfile">
            <Row label="horizontal">
              <UserProfile name="Alice Johnson" role="Engineering Lead" status={{ label: "Online", variant: "success" }} size="md" />
              <UserProfile name="Bob Smith"     role="Designer"         size="sm" />
              <UserProfile name="Carol White"   role="PM"               size="lg" status={{ label: "Away", variant: "warning" }} />
            </Row>
            <Row label="vertical">
              <UserProfile name="David Brown" role="Analyst"  size="xl" layout="vertical" />
              <UserProfile name="Eva Green"   role="Director" size="xl" layout="vertical" status={{ label: "Active", variant: "primary" }} />
            </Row>
          </ComponentBlock>

        </SectionBlock>

        {/* ════════════════════════════════════════════
            ORGANISMS
        ════════════════════════════════════════════ */}
        <SectionBlock id="organisms" title="Organisms">

          {/* AppBar */}
          <ComponentBlock title="AppBar">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <AppBar points="770P" notificationCount="12" />
            </div>
          </ComponentBlock>

          {/* Navbar */}
          <ComponentBlock title="Navbar">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <Navbar
                logo={<span className="font-bold text-blue-600">WeLoop</span>}
                items={[
                  { label: "Dashboard", href: "#", active: true },
                  { label: "Invoices",  href: "#" },
                  { label: "Settings",  href: "#" },
                ]}
                actions={<Button size="sm" variant="primary">New Invoice</Button>}
                user={{ name: "Taimo Sum" }}
              />
            </div>
          </ComponentBlock>

          {/* DataTable */}
          <ComponentBlock title="DataTable">
            <DataTable
              columns={TABLE_COLS}
              data={TABLE_DATA}
              rowKey="id"
              caption="Invoice list"
            />
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Loading state</p>
              <DataTable columns={TABLE_COLS} data={[]} rowKey="id" loading caption="Loading" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Empty state</p>
              <DataTable columns={TABLE_COLS} data={[]} rowKey="id" emptyMessage="No invoices found" caption="Empty" />
            </div>
          </ComponentBlock>

        </SectionBlock>

        {/* ════════════════════════════════════════════
            LAYOUTS
        ════════════════════════════════════════════ */}
        <SectionBlock id="layouts" title="Layouts">

          {/* Stack */}
          <ComponentBlock title="Stack">
            <Row label="direction=row, gap=3">
              <Stack direction="row" gap={3} align="center">
                {["A","B","C","D"].map(l => (
                  <div key={l} className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-sm font-semibold text-blue-600">{l}</div>
                ))}
              </Stack>
            </Row>
            <Row label="direction=column, gap=2">
              <Stack direction="column" gap={2}>
                {["X","Y","Z"].map(l => (
                  <div key={l} className="w-full h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center px-3 text-sm font-semibold text-gray-600">{l}</div>
                ))}
              </Stack>
            </Row>
          </ComponentBlock>

          {/* Grid */}
          <ComponentBlock title="Grid">
            <p className="text-[11px] text-gray-400 mb-2">cols=3, gap=4</p>
            <Grid cols={1} colsMd={3} gap={4}>
              {["1","2","3","4","5","6"].map(n => (
                <div key={n} className="h-16 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-semibold text-blue-500">{n}</div>
              ))}
            </Grid>
            <p className="text-[11px] text-gray-400 mt-5 mb-2">GridItem colSpan</p>
            <Grid cols={3} gap={4}>
              <GridItem colSpan={2}><div className="h-12 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-sm font-semibold text-amber-600">span 2</div></GridItem>
              <GridItem colSpan={1}><div className="h-12 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center text-sm font-semibold text-amber-600">span 1</div></GridItem>
            </Grid>
          </ComponentBlock>

          {/* Container */}
          <ComponentBlock title="Container">
            {(["sm","md","lg","xl"] as const).map(sz => (
              <div key={sz} className="mb-2">
                <p className="text-[11px] text-gray-400 mb-1">size={sz}</p>
                <Container size={sz} centered={false} className="h-8 bg-gray-100 border border-gray-200 rounded-lg flex items-center px-3">
                  <span className="text-xs text-gray-500 font-medium">max-w-screen-{sz}</span>
                </Container>
              </div>
            ))}
          </ComponentBlock>

        </SectionBlock>

        {/* ════════════════════════════════════════════
            TOKENS
        ════════════════════════════════════════════ */}
        <SectionBlock id="tokens" title="Tokens">

          <ComponentBlock title="Colors — primary">
            <div className="flex flex-wrap gap-2">
              {Object.entries(colors.primary).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg shadow-sm border border-black/5" style={{ background: v }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Colors — neutral">
            <div className="flex flex-wrap gap-2">
              {Object.entries(colors.neutral).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg border border-gray-200" style={{ background: v }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Colors — semantic">
            <div className="flex flex-wrap gap-2">
              {Object.entries(colors.semantic).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-lg shadow-sm border border-black/5" style={{ background: v }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Radii">
            <div className="flex flex-wrap items-end gap-4">
              {Object.entries(radii).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 bg-blue-100 border-2 border-blue-300" style={{ borderRadius: v }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                  <span className="text-[10px] text-gray-300">{v}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Shadows">
            <div className="flex flex-wrap items-end gap-6">
              {Object.entries(shadows).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-xl" style={{ boxShadow: v }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Spacing">
            <div className="flex flex-wrap items-end gap-3">
              {Object.entries(spacing).map(([k, v]) => (
                <div key={k} className="flex flex-col items-end gap-1">
                  <div className="bg-blue-400 rounded" style={{ width: v, height: v, minWidth: 2, minHeight: 2 }} />
                  <span className="text-[10px] text-gray-400">{k}</span>
                </div>
              ))}
            </div>
          </ComponentBlock>

          <ComponentBlock title="Typography — font sizes">
            <Stack direction="column" gap={2}>
              {Object.entries(typography.fontSize).map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-3">
                  <span className="text-[10px] text-gray-400 w-10 shrink-0">{k}</span>
                  <span className="text-gray-900" style={{ fontSize: v, fontFamily: typography.fontFamily.sans }}>
                    The quick brown fox — {v}
                  </span>
                </div>
              ))}
            </Stack>
          </ComponentBlock>

        </SectionBlock>

      </Container>

      <footer className="border-t border-gray-200 bg-white py-6 text-center">
        <Text size="sm" color="muted">WeLoop Components — React + TypeScript + Tailwind CSS</Text>
      </footer>
    </div>
  );
}
