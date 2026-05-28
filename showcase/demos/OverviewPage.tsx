import React, { useState } from "react";
import { Avatar } from "../../src/components/atoms/Avatar";
import { ButtonSingle } from "../../src/components/atoms/ButtonSingle";
import { Chip } from "../../src/components/atoms/Chip";
import { Toggle } from "../../src/components/atoms/Toggle";
import { Checkbox } from "../../src/components/atoms/Checkbox";
import { Radio } from "../../src/components/atoms/Radio";
import { Link } from "../../src/components/atoms/Link";
import { PaymentBadge } from "../../src/components/atoms/PaymentBadge";
import { NotifBadge } from "../../src/components/atoms/NotifBadge";
import { ProgressBar } from "../../src/components/atoms/ProgressBar";
import { InlineTip } from "../../src/components/atoms/InlineTip";
import { ListItem } from "../../src/components/atoms/ListItem";
import { Tabs } from "../../src/components/atoms/Tabs";
import { ButtonSegment } from "../../src/components/atoms/ButtonSegment";
import { ButtonDropdown } from "../../src/components/atoms/ButtonDropdown";
import { Banner } from "../../src/components/molecules/Banner";
import { Pagination } from "../../src/components/molecules/Pagination";
import {
  IconAdd,
  IconSearch16,
  IconStar16,
  IconGear16,
  IconBell16,
  IconUser16,
  IconCheck16,
  IconDoc16,
  IconArrow161,
} from "../../src/components/atoms/Icon";

type Category = "all" | "atom" | "molecule" | "organism";

interface ComponentEntry {
  id: string;
  label: string;
  category: "atom" | "molecule" | "organism";
  preview: React.ReactNode;
}

const PREVIEW_SCALE = 0.85;

const COMPONENTS: ComponentEntry[] = [
  {
    id: "avatar",
    label: "Avatar",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6 }}>
        <Avatar type="noProfile" size={24} />
        <Avatar type="textProfile" size={24} text="AB" />
        <Avatar type="office" size={24} src="https://i.pravatar.cc/64?img=3" alt="User" />
      </div>
    ),
  },
  {
    id: "chip",
    label: "Chip",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6 }}>
        <Chip size="s" label="Design" />
        <Chip size="s" label="Dev" />
      </div>
    ),
  },
  {
    id: "tooltip",
    label: "Tooltip",
    category: "atom",
    preview: (
      <div
        style={{
          background: "#1E293B",
          color: "#F8FAFC",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Tooltip label
      </div>
    ),
  },
  {
    id: "toggle",
    label: "Toggle",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 10 }}>
        <Toggle checked={false} />
        <Toggle checked={true} />
      </div>
    ),
  },
  {
    id: "checkbox",
    label: "Checkbox",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8 }}>
        <Checkbox checked={false} />
        <Checkbox checked={true} />
      </div>
    ),
  },
  {
    id: "form-field",
    label: "FormField",
    category: "atom",
    preview: (
      <div
        style={{
          border: "1px solid #D1D5DB",
          borderRadius: 8,
          padding: "6px 10px",
          fontSize: 12,
          color: "#9CA3AF",
          fontFamily: "Inter, sans-serif",
          background: "#fff",
          width: 120,
        }}
      >
        Enter value…
      </div>
    ),
  },
  {
    id: "button-single",
    label: "ButtonSingle",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6 }}>
        <ButtonSingle buttonType="primary" variant="filled" size="xs">
          Primary
        </ButtonSingle>
        <ButtonSingle buttonType="danger" variant="outline" size="xs">
          Danger
        </ButtonSingle>
      </div>
    ),
  },
  {
    id: "button-dropdown",
    label: "ButtonDropdown",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6 }}>
        <ButtonDropdown buttonType="primary" size="xs" label="Actions" />
        <ButtonDropdown buttonType="common" size="xs" label="More" />
      </div>
    ),
  },
  {
    id: "button-segment",
    label: "ButtonSegment",
    category: "atom",
    preview: (
      <ButtonSegment
        segments={[
          { key: "a", label: "Left" },
          { key: "b", label: "Right" },
        ]}
        activeKey="a"
      />
    ),
  },
  {
    id: "link",
    label: "Link",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8 }}>
        <Link href="#" label="Brand link" />
        <Link href="#" label="Disabled" disabled />
      </div>
    ),
  },
  {
    id: "payment-badge",
    label: "PaymentBadge",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6 }}>
        <PaymentBadge status="paid" size="M" />
        <PaymentBadge status="overdue" size="M" />
      </div>
    ),
  },
  {
    id: "notif-badge",
    label: "NotifBadge",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8 }}>
        <NotifBadge size="large" label="3" />
        <NotifBadge size="small" />
      </div>
    ),
  },
  {
    id: "toast",
    label: "Toast",
    category: "atom",
    preview: (
      <div
        style={{
          background: "#22C55E",
          color: "#fff",
          borderRadius: 999,
          padding: "6px 14px",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <IconCheck16 size={12} color="#fff" />
        Saved!
      </div>
    ),
  },
  {
    id: "tabs",
    label: "Tabs",
    category: "atom",
    preview: (
      <Tabs
        variant="box"
        items={[
          { id: "a", label: "Tab A" },
          { id: "b", label: "Tab B" },
        ]}
        defaultValue="a"
      />
    ),
  },
  {
    id: "snackbar",
    label: "Snackbar",
    category: "atom",
    preview: (
      <div
        style={{
          background: "#1E293B",
          color: "#fff",
          borderRadius: 16,
          padding: "8px 14px",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <IconBell16 size={13} color="rgba(255,255,255,0.7)" />
        Snackbar message
      </div>
    ),
  },
  {
    id: "list-item",
    label: "ListItem",
    category: "atom",
    preview: (
      <ListItem
        type="minimal"
        title="List item title"
        description="Supporting text"
        count={12}
      />
    ),
  },
  {
    id: "inline-tip",
    label: "InlineTip",
    category: "atom",
    preview: (
      <InlineTip type="information" title="Tip" description="Helpful info here." />
    ),
  },
  {
    id: "radio",
    label: "Radio",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8 }}>
        <Radio value="a" size="xs" checked={false} />
        <Radio value="b" size="xs" checked={true} />
      </div>
    ),
  },
  {
    id: "progress-bar",
    label: "ProgressBar",
    category: "atom",
    preview: (
      <div style={{ width: 140 }}>
        <ProgressBar value={65} size="md" />
      </div>
    ),
  },
  {
    id: "icon",
    label: "Icons",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8 }}>
        <IconAdd size={18} color="#1D32FF" />
        <IconSearch16 size={18} color="#6B7280" />
        <IconStar16 size={18} color="#F59E0B" />
        <IconGear16 size={18} color="#374151" />
        <IconDoc16 size={18} color="#9CA3AF" />
      </div>
    ),
  },
  {
    id: "bank-logo",
    label: "BankLogo",
    category: "atom",
    preview: (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "#F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          color: "#6B7280",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
        }}
      >
        BANK
      </div>
    ),
  },
  {
    id: "flag",
    label: "Flag",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <div
          style={{
            width: 24,
            height: 18,
            borderRadius: 3,
            background: "linear-gradient(180deg, #002395 33%, #fff 33%, #fff 66%, #ED2939 66%)",
            border: "1px solid #E5E7EB",
          }}
        />
        <div
          style={{
            width: 24,
            height: 18,
            borderRadius: 3,
            background: "linear-gradient(90deg, #006847 33%, #fff 33%, #fff 66%, #CE1126 66%)",
            border: "1px solid #E5E7EB",
          }}
        />
      </div>
    ),
  },
  {
    id: "logo",
    label: "Logo",
    category: "atom",
    preview: (
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ width: 28, height: 18, borderRadius: 3, background: "linear-gradient(90deg,#1D32FF 70%,#F87D39 70%)", opacity: 0.9 }} />
        <div style={{ width: 18, height: 18, borderRadius: 4, background: "#EB001B", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: 0, top: 0, width: 10, height: 18, background: "#F79E1B", mixBlendMode: "multiply" }} />
        </div>
        <div style={{ width: 18, height: 18, borderRadius: 3, background: "#E1232E" }} />
      </div>
    ),
  },
  {
    id: "banner",
    label: "Banner",
    category: "molecule",
    preview: (
      <Banner type="information" message="Information banner" />
    ),
  },
  {
    id: "dashboard-card",
    label: "DashboardCard",
    category: "molecule",
    preview: (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: "10px 14px",
          minWidth: 120,
        }}
      >
        <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>Revenue</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", fontFamily: "Inter, sans-serif" }}>$12,450</div>
      </div>
    ),
  },
  {
    id: "pagination",
    label: "Pagination",
    category: "molecule",
    preview: (
      <Pagination
        page={1}
        totalPages={5}
        pageSize={10}
        variant="simple"
        onPageChange={() => {}}
      />
    ),
  },
  {
    id: "file-upload",
    label: "FileUpload",
    category: "molecule",
    preview: (
      <div
        style={{
          border: "1.5px dashed #D4D4D4",
          borderRadius: 10,
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          background: "#FAFAFA",
        }}
      >
        <IconAdd size={18} color="#9CA3AF" />
        <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>Upload file</span>
      </div>
    ),
  },
  {
    id: "popover",
    label: "Popover",
    category: "molecule",
    preview: (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          padding: "12px 16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          minWidth: 140,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>Confirm?</div>
        <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter, sans-serif" }}>This action cannot be undone.</div>
      </div>
    ),
  },
  {
    id: "date-picker",
    label: "DatePicker",
    category: "molecule",
    preview: (
      <div
        style={{
          border: "1px solid #D1D5DB",
          borderRadius: 8,
          padding: "7px 10px",
          fontSize: 12,
          color: "#9CA3AF",
          fontFamily: "Inter, sans-serif",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: 140,
        }}
      >
        <IconArrow161 size={14} color="#9CA3AF" />
        Select date…
      </div>
    ),
  },
  {
    id: "datarow",
    label: "DataTable",
    category: "organism",
    preview: (
      <div
        style={{
          border: "1px solid #F0F0F0",
          borderRadius: 10,
          overflow: "hidden",
          background: "#fff",
          minWidth: 160,
        }}
      >
        <div
          style={{
            background: "#F9FAFB",
            padding: "6px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "#9CA3AF",
            fontFamily: "Inter, sans-serif",
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            gap: 12,
          }}
        >
          <span>Name</span><span>Status</span>
        </div>
        <div
          style={{
            padding: "6px 10px",
            fontSize: 11,
            color: "#111827",
            fontFamily: "Inter, sans-serif",
            display: "flex",
            gap: 12,
          }}
        >
          <span>Invoice 01</span>
          <span style={{ background: "#EAF3FF", color: "#1D32FF", borderRadius: 4, padding: "1px 5px", fontSize: 10 }}>
            Active
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "dialog",
    label: "Dialog",
    category: "organism",
    preview: (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          padding: "14px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minWidth: 140,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>
          Dialog Title
        </div>
        <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Inter, sans-serif", marginBottom: 10 }}>
          Description text.
        </div>
        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
          <ButtonSingle buttonType="ghost" variant="ghost" size="xs">Cancel</ButtonSingle>
          <ButtonSingle buttonType="primary" variant="filled" size="xs">Confirm</ButtonSingle>
        </div>
      </div>
    ),
  },
  {
    id: "dtopbar",
    label: "DTopBar",
    category: "organism",
    preview: (
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: 160,
          borderRadius: 8,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}>Top Bar</span>
        <div style={{ display: "flex", gap: 8 }}>
          <IconBell16 size={15} color="#6B7280" />
          <IconUser16 size={15} color="#6B7280" />
        </div>
      </div>
    ),
  },
  {
    id: "dbottombar",
    label: "DBottomBar",
    category: "organism",
    preview: (
      <div
        style={{
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: 160,
          borderRadius: 8,
        }}
      >
        <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>12 items</span>
        <ButtonSingle buttonType="primary" variant="filled" size="xs">Save</ButtonSingle>
      </div>
    ),
  },
  {
    id: "appbar",
    label: "AppBar",
    category: "organism",
    preview: (
      <div
        style={{
          background: "var(--color-bg-brand-primary, #1D32FF)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 8,
          minWidth: 140,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconArrow161 size={12} color="#fff" />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif" }}>AppBar</span>
      </div>
    ),
  },
  {
    id: "titlenavbar",
    label: "TitleNavBar",
    category: "organism",
    preview: (
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: 160,
          borderRadius: 8,
        }}
      >
        <IconArrow161 size={15} color="#374151" />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}>Title</span>
        <IconGear16 size={15} color="#374151" />
      </div>
    ),
  },
  {
    id: "dialogsettingbar",
    label: "DialogSettingBar",
    category: "organism",
    preview: (
      <div
        style={{
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 14,
          overflow: "hidden",
          minWidth: 140,
          display: "flex",
        }}
      >
        <div
          style={{
            width: 40,
            background: "#F9FAFB",
            borderRight: "1px solid #E5E7EB",
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <IconUser16 size={14} color="#9CA3AF" />
          <IconGear16 size={14} color="#1D32FF" />
        </div>
        <div style={{ padding: "10px 12px", flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#111827", fontFamily: "Inter, sans-serif" }}>Settings</div>
        </div>
      </div>
    ),
  },
  {
    id: "empty-state",
    label: "EmptyState",
    category: "organism",
    preview: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          padding: "8px 16px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconSearch16 size={18} color="#9CA3AF" />
        </div>
        <div style={{ fontSize: 11, color: "#374151", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>No results</div>
        <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "Inter, sans-serif" }}>Try a different search</div>
      </div>
    ),
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  atom:     { bg: "#EEF0FF", text: "#1D32FF", border: "#C7D0FF" },
  molecule: { bg: "#FDF4FF", text: "#9333EA", border: "#E9D5FF" },
  organism: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
};

const FILTER_TABS: { id: Category; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "atom",     label: "Atoms" },
  { id: "molecule", label: "Molecules" },
  { id: "organism", label: "Organisms" },
];

interface OverviewPageProps {
  onChange: (id: string) => void;
}

export function OverviewPage({ onChange }: OverviewPageProps) {
  const [filter, setFilter]   = useState<Category>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const visible = filter === "all"
    ? COMPONENTS
    : COMPONENTS.filter((c) => c.category === filter);

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#EEF0FF",
            borderRadius: 999,
            padding: "4px 12px 4px 8px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: "#1D32FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <circle cx="5" cy="5" r="3.5" stroke="#fff" strokeWidth="1.2" />
              <path d="M5 2v6M2 5h6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#1D32FF",
            }}
          >
            WeLoop Design System
          </span>
        </div>

        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: 36,
            lineHeight: "44px",
            letterSpacing: "-0.8px",
            color: "var(--showcase-title, #111827)",
            margin: "0 0 10px",
          }}
        >
          WeLoop 2.1
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "26px",
            color: "var(--showcase-text-subtle, #6B7280)",
            margin: "0 0 24px",
            maxWidth: 520,
          }}
        >
          Design system · {COMPONENTS.length} components · 3 themes · Figma-verified
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { label: "Atoms",     count: COMPONENTS.filter((c) => c.category === "atom").length,     color: "#1D32FF" },
            { label: "Molecules", count: COMPONENTS.filter((c) => c.category === "molecule").length, color: "#9333EA" },
            { label: "Organisms", count: COMPONENTS.filter((c) => c.category === "organism").length, color: "#15803D" },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--showcase-shell-bg, #fff)",
                border: "1px solid var(--showcase-shell-border, #E5E7EB)",
                borderRadius: 10,
                padding: "10px 16px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--showcase-title, #111827)",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: 13,
                  color: "var(--showcase-text-subtle, #6B7280)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 24,
          background: "var(--showcase-shell-bg, #F9FAFB)",
          border: "1px solid var(--showcase-shell-border, #E5E7EB)",
          borderRadius: 10,
          padding: 4,
          width: "fit-content",
        }}
      >
        {FILTER_TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            style={{
              padding: "7px 16px",
              borderRadius: 7,
              border: "none",
              background: filter === id ? "#fff" : "transparent",
              boxShadow: filter === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              color: filter === id ? "#111827" : "#6B7280",
              fontFamily: "Inter, sans-serif",
              fontWeight: filter === id ? 500 : 400,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.12s",
            }}
          >
            {label}
            {id !== "all" && (
              <span
                style={{
                  marginLeft: 6,
                  fontSize: 11,
                  fontWeight: 500,
                  color: filter === id ? "#6B7280" : "#D1D5DB",
                  background: filter === id ? "#F3F4F6" : "transparent",
                  borderRadius: 4,
                  padding: "1px 5px",
                }}
              >
                {COMPONENTS.filter((c) => c.category === id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Component grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {visible.map((comp) => {
          const catStyle = CATEGORY_COLORS[comp.category];
          const isHov = hovered === comp.id;
          return (
            <div
              key={comp.id}
              role="button"
              tabIndex={0}
              onClick={() => onChange(comp.id)}
              onKeyDown={(e) => e.key === "Enter" && onChange(comp.id)}
              onMouseEnter={() => setHovered(comp.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "var(--showcase-shell-bg, #fff)",
                border: isHov
                  ? "1.5px solid #1D32FF"
                  : "1.5px solid var(--showcase-shell-border, #E5E7EB)",
                borderRadius: 14,
                padding: "20px 20px 16px",
                cursor: "pointer",
                transition: "border-color 0.15s, box-shadow 0.15s, transform 0.12s",
                transform: isHov ? "translateY(-2px)" : "none",
                boxShadow: isHov
                  ? "0 8px 24px rgba(29,50,255,0.10)"
                  : "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                outline: "none",
              }}
            >
              {/* Mini preview */}
              <div
                style={{
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#F9FAFB",
                  borderRadius: 10,
                  overflow: "hidden",
                  padding: 12,
                }}
              >
                <div style={{ transform: `scale(${PREVIEW_SCALE})`, pointerEvents: "none", transformOrigin: "center" }}>
                  {comp.preview}
                </div>
              </div>

              {/* Card footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      lineHeight: "18px",
                      color: "var(--showcase-title, #111827)",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {comp.label}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: 10,
                      lineHeight: "14px",
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: catStyle.bg,
                      color: catStyle.text,
                      display: "inline-block",
                      marginTop: 3,
                      textTransform: "capitalize",
                    }}
                  >
                    {comp.category}
                  </span>
                </div>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: isHov ? "#EEF0FF" : "#F5F5F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.12s",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    style={{ color: isHov ? "#1D32FF" : "#9CA3AF" }}
                  >
                    <path
                      d="M2.5 6h7M6.5 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
