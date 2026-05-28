import React from "react";
import { EmptyState, ErrorPage } from "../../src/components/organisms/EmptyState";
import { DemoShell, DemoRow } from "../DemoShell";

export function EmptyStateDemo() {
  return (
    <DemoShell
      title="EmptyState"
      description="Inline icon states for empty lists/tables and a full-page ErrorPage for HTTP errors."
      category="organism"
      importCode={`import { EmptyState, ErrorPage } from 'weloop-components';`}
    >
      <DemoRow label="Inline empty states">
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState type="no-results" onAction={() => alert("Clear filters")} />
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState type="failed-to-load" onAction={() => alert("Retry")} />
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState type="no-clients" />
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState type="no-documents" />
        </div>
      </DemoRow>

      <DemoRow label="Custom titles / descriptions">
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState
            type="no-results"
            title="No transactions"
            description="No transactions match your current date range."
            actionLabel="Reset date"
            onAction={() => alert("Reset date")}
          />
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
          <EmptyState
            type="failed-to-load"
            title="Connection error"
            description="Check your internet connection and try again."
            actionLabel="Try again"
            onAction={() => alert("Retry")}
          />
        </div>
      </DemoRow>

      <DemoRow label="ErrorPage — default (with expandable steps)" fullWidth>
        <div style={{ display: "inline-flex" }}>
          <ErrorPage
            variant="default"
            errorCode="500"
            title="Oops! Something went wrong."
            description="We've encountered an unexpected error while processing your request."
            primaryLabel="Return to Homepage"
            secondaryLabel="Go back"
            onPrimary={() => alert("homepage")}
            onSecondary={() => alert("back")}
            steps={[
              "Refresh the page, clear your browser cache and cookies, check internet connection, or try again in a few minutes.",
            ]}
            urgentContact="023 900 750"
            onContactClick={() => alert("call")}
            timestamp="21/03/2025, 11:54:23 AM UTC"
          />
        </div>
      </DemoRow>

      <DemoRow label="ErrorPage — general (compact, no steps)" fullWidth>
        <div style={{ display: "inline-flex" }}>
          <ErrorPage
            variant="general"
            errorCode="404"
            title="Page not found."
            description="The page you're looking for doesn't exist or has been moved."
            primaryLabel="Return to Homepage"
            secondaryLabel="Go back"
            onPrimary={() => alert("homepage")}
            onSecondary={() => alert("back")}
          />
        </div>
      </DemoRow>

      <DemoRow label="ErrorPage — other error codes">
        <div style={{ display: "inline-flex" }}>
          <ErrorPage
            variant="general"
            errorCode="403"
            title="Access denied."
            description="You don't have permission to view this page."
            primaryLabel="Return to Homepage"
            secondaryLabel="Contact support"
            onPrimary={() => {}}
            onSecondary={() => {}}
          />
        </div>
        <div style={{ display: "inline-flex" }}>
          <ErrorPage
            variant="general"
            errorCode="503"
            title="Service unavailable."
            description="We're undergoing maintenance. Please check back shortly."
            primaryLabel="Return to Homepage"
            secondaryLabel="Go back"
            onPrimary={() => {}}
            onSecondary={() => {}}
          />
        </div>
      </DemoRow>
    </DemoShell>
  );
}
