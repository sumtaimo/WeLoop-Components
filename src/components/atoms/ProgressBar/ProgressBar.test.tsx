import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders progressbar role", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders label text", () => {
    render(<ProgressBar label="Uploading" value={30} />);
    expect(screen.getByText("Uploading")).toBeInTheDocument();
  });

  it("renders required asterisk when required", () => {
    render(<ProgressBar label="Upload" required value={30} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders explicit progressText", () => {
    render(<ProgressBar value={60} progressText="60 of 100 MB" />);
    expect(screen.getByText("60 of 100 MB")).toBeInTheDocument();
  });

  it("auto-generates progress text from max", () => {
    render(<ProgressBar value={50} max={200} unit=" MB" />);
    expect(screen.getByText("100 MB of 200 MB")).toBeInTheDocument();
  });

  it("shows no progress text when neither progressText nor max is set", () => {
    render(<ProgressBar value={40} />);
    expect(screen.queryByText(/of/)).not.toBeInTheDocument();
  });

  it("clamps value below 0 without throwing", () => {
    expect(() => render(<ProgressBar value={-20} />)).not.toThrow();
  });

  it("clamps value above 100 without throwing", () => {
    expect(() => render(<ProgressBar value={150} />)).not.toThrow();
  });

  it("renders all three variant types without error", () => {
    const { rerender } = render(<ProgressBar value={50} variant="loading" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    rerender(<ProgressBar value={50} variant="fail" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    rerender(<ProgressBar value={50} variant="complete" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders both track sizes without error", () => {
    const { rerender } = render(<ProgressBar value={50} size="sm" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    rerender(<ProgressBar value={50} size="md" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
