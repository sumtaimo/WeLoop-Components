import React, { useState } from "react";
import { Button } from "../components/atoms/Button";
import { Avatar } from "../components/atoms/Avatar";
import { Badge } from "../components/atoms/Badge";
import { Input } from "../components/atoms/Input";
import { Alert } from "../components/molecules/Alert";
import { Card, CardHeader, CardBody, CardFooter } from "../components/molecules/Card";
import { Navbar } from "../components/organisms/Navbar";
import { colors, spacing, typography, radii } from "../tokens";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function App() {
  const [alertVisible, setAlertVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        logo={
          <span className="text-lg font-bold text-blue-600 tracking-tight">
            WeLoop
          </span>
        }
        items={[
          { label: "Components", href: "#components", active: true },
          { label: "Tokens", href: "#tokens" },
          { label: "GitHub", href: "https://github.com/sumtaimo/weloop-components" },
        ]}
        actions={
          <Badge variant="primary" dot>
            v1.0.0
          </Badge>
        }
        user={{ name: "Taimo Sum" }}
        sticky
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">WeLoop Components</h1>
          <p className="text-lg text-gray-600">
            A clean, accessible React component library built with TypeScript and Tailwind CSS.
          </p>
        </div>

        {/* ── BUTTONS ── */}
        <Section title="Button">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth variant="primary">
              Full Width
            </Button>
          </Row>
          <Row label="With Icons">
            <Button
              variant="primary"
              leftIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              }
            >
              Add Item
            </Button>
            <Button
              variant="secondary"
              rightIcon={
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Next
            </Button>
          </Row>
        </Section>

        {/* ── AVATAR ── */}
        <Section title="Avatar">
          <Row label="Sizes">
            <Avatar size="xs" alt="Alice Johnson" />
            <Avatar size="sm" alt="Bob Smith" />
            <Avatar size="md" alt="Carol White" />
            <Avatar size="lg" alt="David Brown" />
            <Avatar size="xl" alt="Eva Green" />
          </Row>
          <Row label="With Image">
            <Avatar
              size="md"
              src="https://i.pravatar.cc/80?img=1"
              alt="User 1"
            />
            <Avatar
              size="lg"
              src="https://i.pravatar.cc/80?img=5"
              alt="User 5"
            />
            <Avatar
              size="xl"
              src="https://i.pravatar.cc/80?img=9"
              alt="User 9"
            />
          </Row>
          <Row label="Custom Initials">
            <Avatar size="md" initials="WL" />
            <Avatar size="lg" initials="JS" />
          </Row>
        </Section>

        {/* ── BADGE ── */}
        <Section title="Badge">
          <Row label="Variants">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </Row>
          <Row label="With Dot">
            <Badge variant="neutral" dot>Neutral</Badge>
            <Badge variant="primary" dot>Primary</Badge>
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="danger" dot>Critical</Badge>
          </Row>
          <Row label="Sizes">
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="md">Medium</Badge>
          </Row>
        </Section>

        {/* ── INPUT ── */}
        <Section title="Input">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <Input
              label="Username"
              placeholder="john.doe"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
              errorText="Password must be at least 8 characters"
              fullWidth
            />
            <Input
              label="Disabled field"
              placeholder="Not editable"
              disabled
              fullWidth
            />
          </div>
        </Section>

        {/* ── ALERT ── */}
        <Section title="Alert">
          <div className="space-y-3 max-w-2xl">
            <Alert variant="info" title="Heads up">
              This is an informational message to let you know something useful.
            </Alert>
            <Alert variant="success" title="All done!">
              Your changes have been saved successfully.
            </Alert>
            <Alert variant="warning" title="Attention needed">
              Your subscription will expire in 3 days. Renew to keep access.
            </Alert>
            <Alert variant="error" title="Something went wrong">
              We couldn't process your request. Please try again later.
            </Alert>
            {alertVisible && (
              <Alert
                variant="info"
                title="Dismissible alert"
                onDismiss={() => setAlertVisible(false)}
              >
                Click the × to dismiss this alert.
              </Alert>
            )}
          </div>
        </Section>

        {/* ── CARD ── */}
        <Section title="Card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader
                title="Basic card"
                subtitle="With header and body"
                action={<Badge variant="success" dot>Active</Badge>}
              />
              <CardBody>
                <p className="text-sm text-gray-600">
                  Cards are flexible containers that group related content and
                  actions together.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="primary">
                  View
                </Button>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </CardFooter>
            </Card>

            <Card shadow="md">
              <CardHeader title="User profile" />
              <CardBody>
                <div className="flex items-center gap-3">
                  <Avatar size="lg" src="https://i.pravatar.cc/80?img=3" alt="Jane Doe" />
                  <div>
                    <p className="font-semibold text-gray-900">Jane Doe</p>
                    <p className="text-sm text-gray-500">Product Designer</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card padding="lg" shadow="lg">
              <CardHeader title="Metric" subtitle="Last 30 days" />
              <CardBody>
                <p className="text-4xl font-bold text-gray-900">2,841</p>
                <p className="mt-1 text-sm text-green-600 font-medium">↑ 12.5% vs last month</p>
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* ── TOKENS ── */}
        <Section title="Design Tokens">
          <div className="mb-8">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Color Palette
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(colors.primary).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm border border-black/5"
                    style={{ background: v }}
                  />
                  <span className="text-[10px] text-gray-500">{k}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Semantic Colors
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(colors.semantic).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm border border-black/5"
                    style={{ background: v }}
                  />
                  <span className="text-[10px] text-gray-500">{k}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Border Radii
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {Object.entries(radii).map(([k, v]) => (
                <div key={k} className="flex flex-col items-center gap-1">
                  <div
                    className="w-12 h-12 bg-blue-100 border-2 border-blue-300"
                    style={{ borderRadius: v }}
                  />
                  <span className="text-[10px] text-gray-500">{k}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
        WeLoop Components — Built with React &amp; Tailwind CSS
      </footer>
    </div>
  );
}
