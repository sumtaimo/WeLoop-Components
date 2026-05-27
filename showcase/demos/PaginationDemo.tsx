import React, { useState } from "react";
import { Pagination } from "../../src/components/molecules/Pagination";

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

function LiveSimple() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const total = 347;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Pagination
        variant="simple"
        page={page}
        totalPages={Math.ceil(total / size)}
        pageSize={size}
        totalItems={total}
        onPageChange={setPage}
        onPageSizeChange={s => { setSize(s); setPage(1); }}
      />
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
        Page {page} of {Math.ceil(total / size)} — {size} rows/page — {total} total items
      </p>
    </div>
  );
}

function LivePaged() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(25);
  const total = 689429;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Pagination
        variant="paged"
        page={page}
        totalPages={Math.ceil(total / size)}
        pageSize={size}
        totalItems={total}
        totalLabel="Total Amt: £689,429"
        pageSizeOptions={[10, 25, 50, 100]}
        onPageChange={setPage}
        onPageSizeChange={s => { setSize(s); setPage(1); }}
      />
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280" }}>
        Page {page} of {Math.ceil(total / size).toLocaleString()}
      </p>
    </div>
  );
}

export function PaginationDemo() {
  return (
    <div style={{ maxWidth: 800, fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Pagination</h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 40 }}>
        Two variants: <strong>simple</strong> (rows selector + X of Y + nav) and <strong>paged</strong> (numbered pages with ellipsis).
      </p>

      <Section title="Simple variant — live">
        <LiveSimple />
      </Section>

      <Section title="Paged variant — live">
        <LivePaged />
      </Section>

      <Section title="Simple — edge cases">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>First page (First/Prev disabled)</p>
            <Pagination variant="simple" page={1}  totalPages={10} pageSize={10} totalItems={100} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Last page (Next/Last disabled)</p>
            <Pagination variant="simple" page={10} totalPages={10} pageSize={10} totalItems={100} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Single page (all nav disabled)</p>
            <Pagination variant="simple" page={1}  totalPages={1}  pageSize={50} totalItems={12}  onPageChange={() => {}} />
          </div>
        </div>
      </Section>

      <Section title="Paged — ellipsis behaviour">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Page 1 of 50 — ellipsis on right</p>
            <Pagination variant="paged" page={1}  totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Page 25 of 50 — ellipsis on both sides</p>
            <Pagination variant="paged" page={25} totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Page 50 of 50 — ellipsis on left</p>
            <Pagination variant="paged" page={50} totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>≤10 pages — no ellipsis</p>
            <Pagination variant="paged" page={3}  totalPages={8}  pageSize={10} onPageChange={() => {}} />
          </div>
        </div>
      </Section>
    </div>
  );
}
