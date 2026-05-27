import React from "react";
import { InlineTip } from "../../src/components/atoms/InlineTip";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#A3A3A3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

export function InlineTipDemo() {
  return (
    <div style={{ maxWidth: 600, fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>InlineTip</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 40 }}>
        Four types × two fills. Optionally show a "Learn more" link with prefix text.
      </p>

      <Section title="Filled (card with border)">
        <InlineTip
          type="information"
          fill="filled"
          title="Information"
          description="This action will update settings for all users in your organisation."
          showLink
          onLinkClick={() => alert("info link")}
        />
        <InlineTip
          type="danger"
          fill="filled"
          title="Danger"
          description="Deleting this record is permanent and cannot be undone."
          showLink
          linkText="Contact support"
          onLinkClick={() => alert("danger link")}
        />
        <InlineTip
          type="suggestion"
          fill="filled"
          title="Suggestion"
          description="Enable two-factor authentication to strengthen account security."
          showLink
          linkText="Set up 2FA"
          onLinkClick={() => alert("suggestion link")}
        />
        <InlineTip
          type="warning"
          fill="filled"
          title="Warning"
          description="Your subscription expires in 3 days. Renew now to avoid interruption."
          showLink
          linkPrefix="For urgent situation,"
          linkText="Renew now"
          onLinkClick={() => alert("warning link")}
        />
      </Section>

      <Section title="Outline (flat / inline)">
        <InlineTip
          type="information"
          fill="outline"
          title="Information (outline)"
          description="Inline tips can appear without a card border for lighter contexts."
          showLink={false}
        />
        <InlineTip
          type="danger"
          fill="outline"
          title="Danger (outline)"
          description="This action will permanently remove all selected records."
          showLink={false}
        />
        <InlineTip
          type="suggestion"
          fill="outline"
          title="Suggestion (outline)"
          description="Batch actions can save you time when processing multiple items."
          showLink={false}
        />
        <InlineTip
          type="warning"
          fill="outline"
          title="Warning (outline)"
          description="Unsaved changes will be lost if you navigate away from this page."
          showLink={false}
        />
      </Section>

      <Section title="Title only (no description)">
        <InlineTip type="information" fill="filled" title="Your session will expire in 10 minutes." showLink linkText="Extend session" />
        <InlineTip type="warning"     fill="filled" title="Maintenance window scheduled for 02:00 UTC." showLink={false} />
      </Section>
    </div>
  );
}
