import React from "react";
import { ListItem } from "../../src/components/atoms/ListItem";
import { DemoShell, DemoBlock } from "../DemoShell";

export function ListItemDemo() {
  return (
    <DemoShell
      title="ListItem"
      description="Six variants: notifi-link, notifi-default, notifi-list, bill-list, bank-list, minimal."
      category="atom"
      importCode={`import { ListItem } from 'weloop-components';`}
    >
      <DemoBlock label="notifi-link — with Learn More">
        <ListItem type="notifi-link" title="Invoice Overdue"  description="Your invoice #4821 is 14 days past due." count={3} showDivider linkText="Learn more"   onLinkClick={() => alert("learn more")} />
        <ListItem type="notifi-link" title="Payment Received" description="£1,200 received from Acme Corp."          count={1} showDivider linkText="View receipt" />
        <ListItem type="notifi-link" title="Account Alert"    description="Unusual login detected on your account." count={1}            linkText="Secure now"   />
      </DemoBlock>

      <DemoBlock label="notifi-default — icon + count">
        <ListItem type="notifi-default" title="New Message"           description="You have 5 unread messages."   count={5} showDivider />
        <ListItem type="notifi-default" title="System Update"         description="Version 2.1.4 is available."   count={1} showDivider />
        <ListItem type="notifi-default" title="Subscription Renewal"  description="Renews on 1 June 2026."         count={0}            />
      </DemoBlock>

      <DemoBlock label="notifi-list — dot indicator + label">
        <ListItem type="notifi-list" title="Pending Approval" description="3 items need your sign-off." label="HIGH PRIORITY" showDivider />
        <ListItem type="notifi-list" title="Report Ready"     description="Q1 2026 summary is ready."   label="REPORT"        showDivider />
        <ListItem type="notifi-list" title="New Comment"      description="Jane left a note on PO #77." label="COMMENT"                    />
      </DemoBlock>

      <DemoBlock label="bill-list — inline icon + count + label">
        <ListItem type="bill-list" title="Electricity Bill" description="Due 5 Jun 2026"  count="£142.00" label="UTILITY"  showDivider />
        <ListItem type="bill-list" title="Broadband"        description="Due 12 Jun 2026" count="£35.00"  label="TELECOMS" showDivider />
        <ListItem type="bill-list" title="Office Supplies"  description="Due 20 Jun 2026" count="£89.50"  label="EXPENSES"             />
      </DemoBlock>

      <DemoBlock label="bank-list — currency badge">
        <ListItem type="bank-list" title="Business Current" description="****4821" currency="GBP" showDivider />
        <ListItem type="bank-list" title="Savings Account"  description="****9012" currency="USD" showDivider />
        <ListItem type="bank-list" title="Euro Account"     description="****3344" currency="EUR"             />
      </DemoBlock>

      <DemoBlock label="minimal — count + chevron">
        <ListItem type="minimal" title="All Transactions"   count={128} showDivider onClick={() => alert("transactions")} />
        <ListItem type="minimal" title="Pending Payments"   count={4}   showDivider onClick={() => alert("pending")}      />
        <ListItem type="minimal" title="Completed Invoices" count={37}              onClick={() => alert("invoices")}     />
      </DemoBlock>
    </DemoShell>
  );
}
