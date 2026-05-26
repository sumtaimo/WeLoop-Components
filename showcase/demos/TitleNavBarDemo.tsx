import React from "react";
import { TitleNavBar } from "../../src/components/organisms/AppNavigate";
import { DemoShell, DemoBlock } from "../DemoShell";

export function TitleNavBarDemo() {
  return (
    <DemoShell
      title="TitleNavBar"
      description="Page title bar (60px) with building icon, breadcrumb navigation, and optional third-level label."
    >
      <DemoBlock label="2-level breadcrumb">
        <TitleNavBar parentLabel="Invoices" currentLabel="Invoice #1024" />
      </DemoBlock>
      <DemoBlock label="3-level breadcrumb">
        <TitleNavBar parentLabel="Finance" currentLabel="Invoices" childLabel="Invoice #1024" />
      </DemoBlock>
    </DemoShell>
  );
}
