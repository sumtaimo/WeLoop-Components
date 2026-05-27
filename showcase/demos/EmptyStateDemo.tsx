import React from "react";
import { EmptyState, ErrorPage } from "../../src/components/organisms/EmptyState";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, color: "#A3A3A3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div style={{ maxWidth: 720, fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>EmptyState</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 40 }}>
        Inline icon states for empty lists/tables and a full-page <strong>ErrorPage</strong> for HTTP errors.
      </p>

      <Section title="Inline empty states">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {/* No results */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
            <EmptyState
              type="no-results"
              onAction={() => alert("Clear filters")}
            />
          </div>

          {/* Failed to load */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
            <EmptyState
              type="failed-to-load"
              onAction={() => alert("Retry")}
            />
          </div>

          {/* No clients */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
            <EmptyState type="no-clients" />
          </div>

          {/* No documents */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 12, width: 220 }}>
            <EmptyState type="no-documents" />
          </div>
        </div>
      </Section>

      <Section title="Custom titles / descriptions">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
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
        </div>
      </Section>

      <Section title="ErrorPage — default (with expandable steps)">
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 16, display: "inline-flex" }}>
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
      </Section>

      <Section title="ErrorPage — general (compact, no steps)">
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 16, display: "inline-flex" }}>
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
      </Section>

      <Section title="ErrorPage — other error codes">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 16, display: "inline-flex" }}>
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
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: 16, display: "inline-flex" }}>
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
        </div>
      </Section>
    </div>
  );
}
