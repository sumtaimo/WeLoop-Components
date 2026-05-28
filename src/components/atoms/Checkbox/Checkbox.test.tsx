import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders label text", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders the checkbox role", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("reflects checked state", () => {
    render(<Checkbox label="Accept" checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("is unchecked by default", () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onChange with true when clicked while unchecked", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with false when clicked while checked", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" checked onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox label="Accept" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("does not call onChange when disabled", () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders both size variants without error", () => {
    const { rerender } = render(<Checkbox label="SM" size="sm" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    rerender(<Checkbox label="LG" size="lg" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
