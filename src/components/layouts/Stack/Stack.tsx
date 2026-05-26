import React from "react";

type StackDirection = "row" | "column";
type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface StackProps {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: StackWrap;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const directionClass: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

const alignClass: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClass: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const gapClass: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

const wrapClass: Record<StackWrap, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

export function Stack({
  direction = "column",
  align = "stretch",
  justify = "start",
  gap = 0,
  wrap = "nowrap",
  as: Tag = "div",
  className = "",
  children,
}: StackProps) {
  return (
    <Tag
      className={[
        "flex",
        directionClass[direction],
        alignClass[align],
        justifyClass[justify],
        gapClass[gap],
        wrapClass[wrap],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
