import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonSingle } from "./ButtonSingle";

describe("ButtonSingle", () => {
  it("renders label text", () => {
    render(<ButtonSingle>Save</ButtonSingle>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<ButtonSingle onClick={onClick}>Click me</ButtonSingle>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    render(<ButtonSingle disabled>Save</ButtonSingle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(<ButtonSingle disabled onClick={onClick}>Save</ButtonSingle>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders all three buttonType variants without error", () => {
    const { rerender } = render(<ButtonSingle buttonType="primary">Primary</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    rerender(<ButtonSingle buttonType="danger">Danger</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    rerender(<ButtonSingle buttonType="ghost">Ghost</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders all three size variants without error", () => {
    const { rerender } = render(<ButtonSingle size="xs">XS</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    rerender(<ButtonSingle size="sm">SM</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    rerender(<ButtonSingle size="md">MD</ButtonSingle>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders shortcut badge when provided", () => {
    render(<ButtonSingle shortcut="⌘K">Save</ButtonSingle>);
    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });
});
