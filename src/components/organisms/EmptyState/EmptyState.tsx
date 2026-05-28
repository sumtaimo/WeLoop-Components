import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * "no-results"     — gray search icon, neutral tone, "Clear filters" action
 * "failed-to-load" — red search icon, error tone, "Retry" action
 * "no-clients"     — green check icon, positive tone
 * "no-documents"   — gray document icon, neutral tone
 * "custom"         — supply your own icon via the `icon` prop
 */
export type EmptyStateType =
  | "no-results"
  | "failed-to-load"
  | "no-clients"
  | "no-documents"
  | "custom";

export interface EmptyStateProps {
  type?:         EmptyStateType;
  title?:        string;
  description?:  string;
  actionLabel?:  string;
  onAction?:     () => void;
  /** Custom icon node — used when type="custom" */
  icon?:         React.ReactNode;
  style?:        React.CSSProperties;
}

export interface ErrorPageProps {
  errorCode?:       string;
  title?:           string;
  description?:     string;
  primaryLabel?:    string;
  onPrimary?:       () => void;
  secondaryLabel?:  string;
  onSecondary?:     () => void;
  /** Steps shown in the collapsible "Try these steps" section */
  steps?:           string[];
  /** Contact phone/link shown at bottom of steps */
  urgentContact?:   string;
  onContactClick?:  () => void;
  /** ISO string or formatted timestamp displayed at the bottom */
  timestamp?:       string;
  /** "default" shows steps + timestamp; "general" is compact without those */
  variant?:         "default" | "general";
  style?:           React.CSSProperties;
}

// ─── Inline empty-state icon configs ─────────────────────────────────────────

const TYPE_DEFAULTS: Record<EmptyStateType, { title: string; description: string; actionLabel?: string; actionColor?: string }> = {
  "no-results":     { title: "No results",             description: "Try adjusting your search or filters.", actionLabel: "Clear filters" },
  "failed-to-load": { title: "Failed to load",          description: "Something went wrong. Please try again.", actionLabel: "Retry", actionColor: "#EF4444" },
  "no-clients":     { title: "No clients registered.",  description: "Something went wrong. Please try again." },
  "no-documents":   { title: "No documents",            description: "Click 'Register Client' at the top right to add one." },
  "custom":         { title: "Nothing here",            description: "" },
};

// ─── Inline icons ─────────────────────────────────────────────────────────────

function SearchIcon({ color = "#9CA3AF" }: { color?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={color === "#9CA3AF" ? "#F3F4F6" : "#FEE2E2"} />
      <circle cx="15" cy="14" r="6" stroke={color} strokeWidth="2" />
      <path d="M20 19l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 11.5l1.5 1 1.5-1" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="#DCFCE7" />
      <circle cx="16" cy="16" r="10" fill="#22C55E" />
      <path d="M11.5 16l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="7" y="4" width="18" height="24" rx="3" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="11" y1="11" x2="21" y2="11" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="15" x2="19" y2="15" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="19" x2="17" y2="19" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export function EmptyState({
  type        = "no-results",
  title,
  description,
  actionLabel,
  onAction,
  icon,
  style,
}: EmptyStateProps) {
  const [hov, setHov] = useState(false);
  const defaults = TYPE_DEFAULTS[type];

  const resolvedTitle       = title       ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const actionColor         = defaults.actionColor ?? "#374151";
  const actionBg            = defaults.actionColor ? "#EF4444" : undefined;

  const titleColor = type === "failed-to-load" ? "#EF4444"
                   : type === "no-clients"     ? "#22C55E"
                   : "#374151";

  const renderedIcon = icon ?? (() => {
    switch (type) {
      case "no-results":     return <SearchIcon color="#9CA3AF" />;
      case "failed-to-load": return <SearchIcon color="#EF4444" />;
      case "no-clients":     return <CheckCircleIcon />;
      case "no-documents":   return <DocumentIcon />;
      default:               return null;
    }
  })();

  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      gap:            8,
      padding:        "24px 16px",
      textAlign:      "center",
      ...style,
    }}>
      {renderedIcon && (
        <div style={{ marginBottom: 4 }}>{renderedIcon}</div>
      )}

      <span style={{
        fontFamily: "Inter, sans-serif",
        fontSize:   14,
        fontWeight: 600,
        color:      titleColor,
        lineHeight: "20px",
      }}>
        {resolvedTitle}
      </span>

      {resolvedDescription && (
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize:   12,
          fontWeight: 400,
          color:      "#9CA3AF",
          lineHeight: "18px",
          maxWidth:   220,
        }}>
          {resolvedDescription}
        </span>
      )}

      {resolvedActionLabel && onAction && (
        <button
          onClick={onAction}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            marginTop:    4,
            height:       32,
            padding:      "0 14px",
            borderRadius: 8,
            border:       actionBg ? "none" : "1.5px solid #D1D5DB",
            background:   actionBg ? (hov ? "#DC2626" : "#EF4444") : (hov ? "#F9FAFB" : "#FFFFFF"),
            color:        actionBg ? "#FFFFFF" : actionColor,
            fontFamily:   "Inter, sans-serif",
            fontSize:     13,
            fontWeight:   500,
            cursor:       "pointer",
            transition:   "background 0.12s",
          }}
        >
          {resolvedActionLabel}
        </button>
      )}
    </div>
  );
}

// ─── ErrorPage illustration ───────────────────────────────────────────────────

function ErrorIllustration() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      {/* Back document */}
      <rect x="28" y="24" width="72" height="88" rx="6" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.2" transform="rotate(-6 28 24)" />
      {/* Middle document */}
      <rect x="44" y="18" width="72" height="88" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2" transform="rotate(-2 44 18)" />
      {/* Front document */}
      <rect x="36" y="14" width="76" height="92" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
      {/* WeLoop logo text on front doc */}
      <text x="52" y="36" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="700" fill="#1D32FF">We</text>
      <text x="64" y="36" fontFamily="Inter,sans-serif" fontSize="9" fontWeight="400" fill="#94A3B8">*</text>
      {/* Horizontal lines on front doc */}
      <line x1="48" y1="46" x2="102" y2="46" stroke="#E5E7EB" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="48" y1="54" x2="96"  y2="54" stroke="#E5E7EB" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="48" y1="62" x2="100" y2="62" stroke="#E5E7EB" strokeWidth="1.2" strokeLinecap="round" />
      {/* Warning triangle badge */}
      <circle cx="108" cy="84" r="22" fill="#FFFFFF" />
      <path d="M108 66l18 32H90l18-32Z" fill="#F59E0B" />
      <path d="M108 74v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="108" cy="90" r="1.5" fill="white" />
    </svg>
  );
}

// ─── ErrorPage ────────────────────────────────────────────────────────────────

export function ErrorPage({
  errorCode      = "500",
  title          = "Oops! Something went wrong.",
  description    = "We've encountered an unexpected error while processing your request.",
  primaryLabel   = "Return to Homepage",
  onPrimary,
  secondaryLabel = "Go back",
  onSecondary,
  steps          = [
    "Refresh the page, clear your browser cache and cookies, check internet connection, or try again in a few minutes.",
  ],
  urgentContact  = "023 900 750",
  onContactClick,
  timestamp,
  variant        = "default",
  style,
}: ErrorPageProps) {
  const [primHov, setPrimHov] = useState(false);
  const [secHov,  setSecHov]  = useState(false);

  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      textAlign:      "center",
      padding:        variant === "default" ? "40px 24px" : "32px 24px",
      gap:            0,
      maxWidth:       variant === "default" ? 480 : 360,
      width:          "100%",
      boxSizing:      "border-box",
      ...style,
    }}>
      {/* Illustration */}
      <div style={{ marginBottom: 24 }}>
        <ErrorIllustration />
      </div>

      {/* Error code */}
      {errorCode && (
        <span style={{
          fontFamily: "Inter, sans-serif",
          fontSize:   13,
          fontWeight: 400,
          color:      "#9CA3AF",
          marginBottom: 8,
          display:    "block",
        }}>
          Error code: {errorCode}
        </span>
      )}

      {/* Title */}
      <span style={{
        fontFamily:   "Inter, sans-serif",
        fontSize:     variant === "default" ? 22 : 18,
        fontWeight:   700,
        color:        "#111827",
        lineHeight:   "1.3",
        marginBottom: 10,
        display:      "block",
      }}>
        {title}
      </span>

      {/* Description */}
      <span style={{
        fontFamily:   "Inter, sans-serif",
        fontSize:     14,
        fontWeight:   400,
        color:        "#6B7280",
        lineHeight:   "22px",
        marginBottom: 24,
        display:      "block",
      }}>
        {description}
      </span>

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: variant === "default" ? 20 : 0 }}>
        <button
          onClick={onPrimary}
          onMouseEnter={() => setPrimHov(true)}
          onMouseLeave={() => setPrimHov(false)}
          style={{
            display:      "inline-flex",
            alignItems:   "center",
            gap:          6,
            height:       36,
            padding:      "0 18px",
            borderRadius: 8,
            border:       "none",
            background:   primHov ? "#1527E0" : "#1D32FF",
            color:        "#FFFFFF",
            fontFamily:   "Inter, sans-serif",
            fontSize:     14,
            fontWeight:   500,
            cursor:       "pointer",
            transition:   "background 0.12s",
          }}
        >
          <RefreshIcon />
          {primaryLabel}
        </button>

        <button
          onClick={onSecondary}
          onMouseEnter={() => setSecHov(true)}
          onMouseLeave={() => setSecHov(false)}
          style={{
            height:       36,
            padding:      "0 14px",
            borderRadius: 8,
            border:       "none",
            background:   "transparent",
            color:        secHov ? "#111827" : "#6B7280",
            fontFamily:   "Inter, sans-serif",
            fontSize:     14,
            fontWeight:   500,
            cursor:       "pointer",
            transition:   "color 0.12s",
          }}
        >
          {secondaryLabel}
        </button>
      </div>

      {/* Steps section — Radix Accordion for proper keyboard + focus management */}
      {variant === "default" && steps.length > 0 && (
        <Accordion.Root
          type="single"
          collapsible
          className="wl-accordion"
          style={{
            width:        "100%",
            background:   "#F9FAFB",
            borderRadius: 10,
            border:       "1px solid #E5E7EB",
            overflow:     "hidden",
            textAlign:    "left",
          }}
        >
          <Accordion.Item value="steps">
            <Accordion.Header>
              <Accordion.Trigger
                style={{
                  width:      "100%",
                  display:    "flex",
                  alignItems: "center",
                  gap:        8,
                  padding:    "12px 16px",
                  background: "transparent",
                  border:     "none",
                  cursor:     "pointer",
                  textAlign:  "left",
                  outline:    "none",
                }}
              >
                <QuestionIcon />
                <span style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize:   14,
                  fontWeight: 600,
                  color:      "#374151",
                  flex:       1,
                }}>
                  Try these steps:
                </span>
                <ChevronIcon />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="wl-accordion-content">
              <div style={{ padding: "0 16px 14px" }}>
                {steps.map((step, i) => (
                  <p key={i} style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize:   13,
                    fontWeight: 400,
                    color:      "#6B7280",
                    lineHeight: "20px",
                    margin:     "0 0 8px",
                  }}>
                    {step}
                  </p>
                ))}
                {urgentContact && (
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize:   13,
                    fontWeight: 400,
                    color:      "#6B7280",
                    lineHeight: "20px",
                    margin:     0,
                  }}>
                    For urgent situation,{" "}
                    <button
                      onClick={onContactClick}
                      style={{
                        background:     "none",
                        border:         "none",
                        padding:        0,
                        cursor:         "pointer",
                        fontFamily:     "Inter, sans-serif",
                        fontSize:       13,
                        fontWeight:     500,
                        color:          "#1D32FF",
                        textDecoration: "underline",
                      }}
                    >
                      call us at {urgentContact}
                    </button>
                  </p>
                )}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      )}

      {/* Timestamp */}
      {variant === "default" && timestamp && (
        <span style={{
          fontFamily:  "Inter, sans-serif",
          fontSize:    12,
          fontWeight:  400,
          color:       "#C4C4C4",
          marginTop:   16,
          display:     "block",
        }}>
          {timestamp}
        </span>
      )}
    </div>
  );
}

// ─── Small SVG icons ──────────────────────────────────────────────────────────

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1.5 7A5.5 5.5 0 0 1 7 1.5c2.1 0 3.9 1.2 4.8 2.9" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12.5 7A5.5 5.5 0 0 1 7 12.5c-2.1 0-3.9-1.2-4.8-2.9" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10.5 1.5l2 2-2 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 12.5l-2-2 2-2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="#EEF1FF" />
      <text x="10" y="14" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="700" fill="#1D32FF" textAnchor="middle">?</text>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      className="wl-accordion-chevron"
      style={{ flexShrink: 0, transition: "transform 0.2s" }}
    >
      <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
