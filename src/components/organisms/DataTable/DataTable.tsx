import React from "react";
import { Badge, type BadgeVariant } from "../../atoms/Badge";
import { Text } from "../../atoms/Text";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  caption?: string;
  className?: string;
}

const alignClass = { left: "text-left", center: "text-center", right: "text-right" };

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  rowKey,
  onRowClick,
  caption,
  className = "",
}: DataTableProps<T>) {
  return (
    <div
      className={["rounded-lg border border-gray-200 overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-100">
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  style={col.width ? { width: col.width } : undefined}
                  className={[
                    "px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider",
                    alignClass[col.align ?? "left"],
                  ].join(" ")}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center">
                  <LoadingSkeleton columns={columns.length} />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center">
                  <Text size="sm" color="muted">
                    {emptyMessage}
                  </Text>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={String(row[rowKey])}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={[
                    "transition-colors",
                    onRowClick
                      ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {columns.map((col) => {
                    const value = row[col.key as keyof T];
                    return (
                      <td
                        key={String(col.key)}
                        className={[
                          "px-4 py-3 text-sm text-gray-900 whitespace-nowrap",
                          alignClass[col.align ?? "left"],
                        ].join(" ")}
                      >
                        {col.render
                          ? col.render(value, row, rowIndex)
                          : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoadingSkeleton({ columns }: { columns: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-4 bg-gray-100 rounded animate-pulse flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
