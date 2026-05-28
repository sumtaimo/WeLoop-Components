import React, { useState } from "react";
import { Pagination } from "../../src/components/molecules/Pagination";
import { DemoShell, DemoRow } from "../DemoShell";

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
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: 0 }}>
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
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B7280", margin: 0 }}>
        Page {page} of {Math.ceil(total / size).toLocaleString()}
      </p>
    </div>
  );
}

export function PaginationDemo() {
  return (
    <DemoShell
      title="Pagination"
      description="Two variants: simple (rows selector + X of Y + nav) and paged (numbered pages with ellipsis)."
      category="molecule"
      importCode={`import { Pagination } from 'weloop-components';`}
    >
      <DemoRow label="Simple variant — live" fullWidth code={`// "simple" variant: rows-per-page selector + "X of Y" + prev/next nav
const [page, setPage] = useState(1);
const [size, setSize] = useState(10);

<Pagination
  variant="simple"
  page={page}
  totalPages={Math.ceil(totalItems / size)}
  pageSize={size}
  totalItems={totalItems}
  onPageChange={setPage}
  onPageSizeChange={newSize => { setSize(newSize); setPage(1); }}
/>`}>
        <LiveSimple />
      </DemoRow>

      <DemoRow label="Paged variant — live" fullWidth code={`// "paged" variant: numbered page buttons with ellipsis + optional total label
const [page, setPage] = useState(1);
const [size, setSize] = useState(25);

<Pagination
  variant="paged"
  page={page}
  totalPages={Math.ceil(total / size)}
  pageSize={size}
  totalItems={total}
  totalLabel="Total Amt: £689,429"
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setPage}
  onPageSizeChange={newSize => { setSize(newSize); setPage(1); }}
/>`}>
        <LivePaged />
      </DemoRow>

      <DemoRow label="Simple — edge cases" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>First page (First/Prev disabled)</p>
            <Pagination variant="simple" page={1}  totalPages={10} pageSize={10} totalItems={100} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Last page (Next/Last disabled)</p>
            <Pagination variant="simple" page={10} totalPages={10} pageSize={10} totalItems={100} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Single page (all nav disabled)</p>
            <Pagination variant="simple" page={1}  totalPages={1}  pageSize={50} totalItems={12}  onPageChange={() => {}} />
          </div>
        </div>
      </DemoRow>

      <DemoRow label="Paged — ellipsis behaviour" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Page 1 of 50 — ellipsis on right</p>
            <Pagination variant="paged" page={1}  totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Page 25 of 50 — ellipsis on both sides</p>
            <Pagination variant="paged" page={25} totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Page 50 of 50 — ellipsis on left</p>
            <Pagination variant="paged" page={50} totalPages={50} pageSize={25} onPageChange={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>≤10 pages — no ellipsis</p>
            <Pagination variant="paged" page={3}  totalPages={8}  pageSize={10} onPageChange={() => {}} />
          </div>
        </div>
      </DemoRow>
    </DemoShell>
  );
}
