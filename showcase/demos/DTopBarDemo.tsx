import React from "react";
import { DTopBar } from "../../src/components/organisms/AppNavigate";
import { DemoShell, DemoBlock } from "../DemoShell";

export function DTopBarDemo() {
  return (
    <DemoShell
      title="DTopBar"
      description="Dialog top bar (56px). Left: title + optional Draft badge. Right: ghost action + solid star button."
    >
      <DemoBlock label="Default — with Draft badge">
        <DTopBar title="Create Invoice" showDraftBadge />
      </DemoBlock>
      <DemoBlock label="No Draft badge">
        <DTopBar title="Edit Customer" showDraftBadge={false} primaryLabel="Cancel" secondaryLabel="Save" />
      </DemoBlock>
    </DemoShell>
  );
}
