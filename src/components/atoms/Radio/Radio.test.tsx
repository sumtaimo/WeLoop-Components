import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio, RadioGroup } from "./Radio";

describe("Radio (standalone)", () => {
  it("renders radio role", () => {
    render(<Radio value="a" label="Option A" />);
    expect(screen.getByRole("radio", { name: "Option A" })).toBeInTheDocument();
  });

  it("reflects checked state", () => {
    render(<Radio value="a" label="Option A" checked />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("is unchecked by default", () => {
    render(<Radio value="a" label="Option A" />);
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Radio value="a" label="Option A" disabled />);
    expect(screen.getByRole("radio")).toBeDisabled();
  });
});

describe("RadioGroup", () => {
  it("renders all options", () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Alpha" />
        <Radio value="b" label="Beta" />
        <Radio value="c" label="Gamma" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Beta" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Gamma" })).toBeInTheDocument();
  });

  it("has radiogroup role", () => {
    render(
      <RadioGroup>
        <Radio value="a" label="A" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("calls onChange with the selected value", () => {
    const onChange = vi.fn();
    render(
      <RadioGroup onChange={onChange}>
        <Radio value="a" label="Alpha" />
        <Radio value="b" label="Beta" />
      </RadioGroup>
    );
    fireEvent.click(screen.getByRole("radio", { name: "Alpha" }));
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("selects defaultValue on mount", () => {
    render(
      <RadioGroup defaultValue="b">
        <Radio value="a" label="Alpha" />
        <Radio value="b" label="Beta" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Beta" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Alpha" })).not.toBeChecked();
  });

  it("disables all radios when group is disabled", () => {
    render(
      <RadioGroup disabled>
        <Radio value="a" label="Alpha" />
        <Radio value="b" label="Beta" />
      </RadioGroup>
    );
    screen.getAllByRole("radio").forEach(r => expect(r).toBeDisabled());
  });
});
