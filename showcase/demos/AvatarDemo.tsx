import React from "react";
import { Avatar } from "../../src/components/atoms/Avatar";
import { DemoShell, DemoRow } from "../DemoShell";

// Simple doc icon for chipLead demo
const DOC_ICON = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
      stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M10 2v4h4" stroke="#9CA3AF" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 9h4M6 12h2" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Sample photo for "office" type
const PHOTO_SRC = "https://i.pravatar.cc/64?img=5";

export function AvatarDemo() {
  return (
    <DemoShell
      title="Avatar"
      description="8 types × 3 sizes — circular graphical elements representing users, profiles, or entities. Matches Figma node 6567:1331."
    >
      {/* ── 20px ── */}
      <DemoRow label="20px — all types">
        <LabeledAvatar label="noProfile">
          <Avatar type="noProfile" size={20} />
        </LabeledAvatar>
        <LabeledAvatar label="items">
          <Avatar type="items" size={20} />
        </LabeledAvatar>
        <LabeledAvatar label="bank">
          <Avatar type="bank" size={20} />
        </LabeledAvatar>
        <LabeledAvatar label="addMore">
          <Avatar type="addMore" size={20} />
        </LabeledAvatar>
        <LabeledAvatar label="office">
          <Avatar type="office" size={20} src={PHOTO_SRC} alt="User photo" />
        </LabeledAvatar>
        <LabeledAvatar label="textProfile">
          <Avatar type="textProfile" size={20} text="KK" />
        </LabeledAvatar>
        <LabeledAvatar label="chipLead (text)">
          <Avatar type="chipLead" size={20} text="A" />
        </LabeledAvatar>
        <LabeledAvatar label="chipLead (icon)">
          <Avatar type="chipLead" size={20} icon={DOC_ICON} />
        </LabeledAvatar>
      </DemoRow>

      {/* ── 24px ── */}
      <DemoRow label="24px — all types">
        <LabeledAvatar label="noProfile">
          <Avatar type="noProfile" size={24} />
        </LabeledAvatar>
        <LabeledAvatar label="items">
          <Avatar type="items" size={24} />
        </LabeledAvatar>
        <LabeledAvatar label="bank">
          <Avatar type="bank" size={24} />
        </LabeledAvatar>
        <LabeledAvatar label="addMore">
          <Avatar type="addMore" size={24} />
        </LabeledAvatar>
        <LabeledAvatar label="office">
          <Avatar type="office" size={24} src={PHOTO_SRC} alt="User photo" />
        </LabeledAvatar>
        <LabeledAvatar label="textProfile">
          <Avatar type="textProfile" size={24} text="KK" />
        </LabeledAvatar>
        <LabeledAvatar label="chipLead (text)">
          <Avatar type="chipLead" size={24} text="A" />
        </LabeledAvatar>
        <LabeledAvatar label="chipLead (icon)">
          <Avatar type="chipLead" size={24} icon={DOC_ICON} />
        </LabeledAvatar>
      </DemoRow>

      {/* ── 32px ── */}
      <DemoRow label="32px — all types (incl. noProfileFill)">
        <LabeledAvatar label="noProfile">
          <Avatar type="noProfile" size={32} />
        </LabeledAvatar>
        <LabeledAvatar label="noProfileFill">
          <Avatar type="noProfileFill" size={32} />
        </LabeledAvatar>
        <LabeledAvatar label="items">
          <Avatar type="items" size={32} />
        </LabeledAvatar>
        <LabeledAvatar label="bank">
          <Avatar type="bank" size={32} />
        </LabeledAvatar>
        <LabeledAvatar label="addMore">
          <Avatar type="addMore" size={32} />
        </LabeledAvatar>
        <LabeledAvatar label="office">
          <Avatar type="office" size={32} src={PHOTO_SRC} alt="User photo" />
        </LabeledAvatar>
        <LabeledAvatar label="textProfile">
          <Avatar type="textProfile" size={32} text="KK" />
        </LabeledAvatar>
        <LabeledAvatar label="chipLead (text)">
          <Avatar type="chipLead" size={32} text="A" />
        </LabeledAvatar>
      </DemoRow>

      {/* ── Initials examples ── */}
      <DemoRow label="textProfile — initials examples">
        <Avatar type="textProfile" size={32} text="KK" />
        <Avatar type="textProfile" size={32} text="TA" />
        <Avatar type="textProfile" size={32} text="WL" />
        <Avatar type="textProfile" size={24} text="AB" />
        <Avatar type="textProfile" size={20} text="CD" />
      </DemoRow>

      {/* ── Photo + fallback ── */}
      <DemoRow label="office — photo and no-src fallback">
        <Avatar type="office" size={32} src="https://i.pravatar.cc/64?img=5" alt="Profile 1" />
        <Avatar type="office" size={32} src="https://i.pravatar.cc/64?img=9" alt="Profile 2" />
        <Avatar type="office" size={32} src="https://i.pravatar.cc/64?img=12" alt="Profile 3" />
        <Avatar type="office" size={32} />
      </DemoRow>
    </DemoShell>
  );
}

// Helper: small label under each avatar for the showcase
function LabeledAvatar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {children}
      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 9,
        fontWeight: 500,
        color: "var(--showcase-label, #A3A3A3)",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}>
        {label}
      </span>
    </div>
  );
}
