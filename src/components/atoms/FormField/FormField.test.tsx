import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders label text", () => {
    render(<FormField label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders required asterisk", () => {
    render(<FormField label="Email" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders helper text below the field", () => {
    render(<FormField label="Email" helperText="Use your work email address" />);
    expect(screen.getByText("Use your work email address")).toBeInTheDocument();
  });

  it("links helper text to input via aria-describedby", () => {
    render(<FormField label="Email" helperText="Use your work email" />);
    const input = screen.getByRole("textbox");
    const helperId = input.getAttribute("aria-describedby");
    expect(helperId).toBeTruthy();
    const helperEl = document.getElementById(helperId!);
    expect(helperEl).toHaveTextContent("Use your work email");
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<FormField label="Name" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "John" } });
    expect(onChange).toHaveBeenCalledWith("John");
  });

  it("is disabled when disabled prop is set", () => {
    render(<FormField label="Name" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("renders textarea type without error", () => {
    render(<FormField type="textarea" label="Notes" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders numeric type without error", () => {
    render(<FormField type="numeric" label="Amount" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<FormField label="Search" placeholder="Type to search..." />);
    expect(screen.getByPlaceholderText("Type to search...")).toBeInTheDocument();
  });
});
