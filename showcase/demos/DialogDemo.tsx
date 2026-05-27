import React, { useState } from "react";
import {
  Dialog,
  DialogCard,
  DEFAULT_EXPORT_FORMATS,
  DEFAULT_LIST_ITEMS,
  DEFAULT_FORM_FIELDS,
} from "../../src/components/organisms/Dialog";
import { DemoShell, DemoRow } from "../DemoShell";

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function DialogDemo() {
  const [openSimple,  setOpenSimple]  = useState(false);
  const [openList,    setOpenList]    = useState(false);
  const [openForm,    setOpenForm]    = useState(false);
  const [openExport,  setOpenExport]  = useState(false);
  const [lastAction,  setLastAction]  = useState<string | null>(null);

  return (
    <DemoShell
      title="Dialog"
      description="Figma node 215:415 — four variants: Simple (confirm/alert), List (progress + data rows), Form (hero icon + 2-col fields), Export (format picker + preview table)."
    >

      {/* ── Trigger buttons ── */}
      <DemoRow label="Open as overlay modal (click backdrop or × to close)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 16px" }}>
          {(["Simple", "List", "Form", "Export"] as const).map(v => (
            <TriggerButton
              key={v}
              label={v}
              onClick={() => {
                if (v === "Simple") setOpenSimple(true);
                else if (v === "List")   setOpenList(true);
                else if (v === "Form")   setOpenForm(true);
                else                     setOpenExport(true);
              }}
            />
          ))}
        </div>
        {lastAction && (
          <p style={{
            marginTop:  12,
            fontFamily: "Inter, sans-serif",
            fontSize:   13,
            color:      "#6B7280",
            margin:     "12px 0 0",
          }}>
            ✓ Last action: <strong style={{ color: "#111827" }}>{lastAction}</strong>
          </p>
        )}
      </DemoRow>

      {/* ── Inline previews ── */}
      <DemoRow label="Simple — confirm / alert">
        <InlineCard>
          <DialogCard
            variant="simple"
            title="Delete Record"
            description="Are you sure you want to delete this record? This action is permanent and cannot be undone."
            cancelLabel="Cancel"
            actionLabel="Delete"
          />
        </InlineCard>
      </DemoRow>

      <DemoRow label="List — progress + data breakdown">
        <InlineCard>
          <DialogCard
            variant="list"
            title="Export Summary"
            description="Your data export is being prepared. Review the breakdown below."
            progressValue={72}
            listItems={DEFAULT_LIST_ITEMS}
            cancelLabel="Cancel"
            actionLabel="Download"
          />
        </InlineCard>
      </DemoRow>

      <DemoRow label="Form — hero icon + fields">
        <InlineCard maxWidth={540}>
          <InlineFormCard />
        </InlineCard>
      </DemoRow>

      <DemoRow label="Export — format picker + preview table" fullWidth>
        <InlineCard maxWidth={760}>
          <InlineExportCard />
        </InlineCard>
      </DemoRow>

      {/* ── Overlay modals (rendered at root level) ── */}
      {openSimple && (
        <Dialog
          variant="simple"
          open={openSimple}
          title="Delete Record"
          description="Are you sure you want to delete this record? This action is permanent and cannot be undone."
          cancelLabel="Cancel"
          actionLabel="Delete"
          onCancel={() => { setOpenSimple(false); setLastAction("Simple → Cancel"); }}
          onAction={() => { setOpenSimple(false); setLastAction("Simple → Delete ✓"); }}
          onClose={() => { setOpenSimple(false); setLastAction("Simple → backdrop closed"); }}
        />
      )}
      {openList && (
        <Dialog
          variant="list"
          open={openList}
          title="Export Summary"
          description="Your data export is being prepared. Review the breakdown below."
          progressValue={72}
          listItems={DEFAULT_LIST_ITEMS}
          cancelLabel="Cancel"
          actionLabel="Download"
          onCancel={() => { setOpenList(false); setLastAction("List → Cancel"); }}
          onAction={() => { setOpenList(false); setLastAction("List → Download ✓"); }}
          onClose={() => { setOpenList(false); setLastAction("List → backdrop closed"); }}
        />
      )}
      {openForm && (
        <Dialog
          variant="form"
          open={openForm}
          title="Add Team Member"
          description="Invite a new member to join your workspace. They'll receive an email notification."
          cancelLabel="Cancel"
          actionLabel="Send Invite"
          fields={DEFAULT_FORM_FIELDS}
          onCancel={() => { setOpenForm(false); setLastAction("Form → Cancel"); }}
          onAction={() => { setOpenForm(false); setLastAction("Form → Send Invite ✓"); }}
          onClose={() => { setOpenForm(false); setLastAction("Form → backdrop closed"); }}
          onSubmit={vals => { console.log("Form submit:", vals); }}
        />
      )}
      {openExport && (
        <Dialog
          variant="export"
          open={openExport}
          exportFormats={DEFAULT_EXPORT_FORMATS}
          cancelLabel="Cancel"
          actionLabel="Export"
          onCancel={() => { setOpenExport(false); setLastAction("Export → Cancel"); }}
          onAction={() => { setOpenExport(false); setLastAction("Export → Export ✓"); }}
          onClose={() => { setOpenExport(false); setLastAction("Export → backdrop closed"); }}
        />
      )}

    </DemoShell>
  );
}

// ─── Stateful inline cards (need local state for interactivity) ───────────────

function InlineFormCard() {
  const [values, setValues] = useState<Record<string, string>>({});
  const handleChange = (id: string, val: string) => setValues(p => ({ ...p, [id]: val }));

  return (
    <DialogCard
      variant="form"
      title="Add Team Member"
      description="Invite a new member to join your workspace. They'll receive an email notification."
      cancelLabel="Cancel"
      actionLabel="Send Invite"
      fields={DEFAULT_FORM_FIELDS}
      formValues={values}
      onFieldChange={handleChange}
    />
  );
}

function InlineExportCard() {
  const [fmt, setFmt] = useState(DEFAULT_EXPORT_FORMATS[0].id);
  return (
    <DialogCard
      variant="export"
      exportFormats={DEFAULT_EXPORT_FORMATS}
      cancelLabel="Cancel"
      actionLabel="Export"
      selectedExportFormat={fmt}
      onSelectExportFormat={setFmt}
    />
  );
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function InlineCard({ children, maxWidth = 420 }: { children: React.ReactNode; maxWidth?: number }) {
  return (
    <div style={{ maxWidth, width: "100%" }}>
      {children}
    </div>
  );
}

function TriggerButton({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height:       38,
        padding:      "0 20px",
        borderRadius: 8,
        border:       "1.5px solid #1D32FF",
        background:   hov ? "#EEF1FF" : "#FFFFFF",
        color:        "#1D32FF",
        fontFamily:   "Inter, sans-serif",
        fontSize:     14,
        fontWeight:   500,
        cursor:       "pointer",
        transition:   "background 0.12s",
      }}
    >
      Open {label}
    </button>
  );
}
