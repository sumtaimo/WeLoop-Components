import React, { useState } from "react";
import { FileUploadCard, FileListItem } from "../../src/components/molecules/FileUpload";
import type { FileUploadStatus } from "../../src/components/molecules/FileUpload";
import { DemoShell, DemoRow } from "../DemoShell";

interface UploadedFile {
  name:   string;
  size:   string;
  status: FileUploadStatus;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function LiveUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFiles = (selected: File[]) => {
    const newEntries: UploadedFile[] = selected.map(f => ({
      name:   f.name,
      size:   formatBytes(f.size),
      status: "processing",
    }));
    setFiles(prev => [...prev, ...newEntries]);

    newEntries.forEach((_, i) => {
      setTimeout(() => {
        setFiles(prev => {
          const updated = [...prev];
          const idx = prev.length - newEntries.length + i;
          if (updated[idx]) updated[idx] = { ...updated[idx], status: "completed" };
          return updated;
        });
      }, 1500 + i * 400);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
      <FileUploadCard onFilesSelected={handleFiles} onLinkClick={() => alert("Learn more")} />
      {files.length > 0 && (
        <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E5E7EB", padding: "4px 12px" }}>
          {files.map((f, i) => (
            <FileListItem
              key={i}
              filename={f.name}
              fileSize={f.size}
              status={f.status}
              showDivider={i < files.length - 1}
            />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <button
          onClick={() => setFiles([])}
          style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}
        >
          Clear list
        </button>
      )}
    </div>
  );
}

export function FileUploadDemo() {
  return (
    <DemoShell
      title="FileUpload"
      description="Upload card (4 states) + file list row (4 statuses). Supports click-to-browse and drag-and-drop."
      category="molecule"
      importCode={`import { FileUploadCard, FileListItem } from 'weloop-components';`}
    >
      <DemoRow label="Live — click or drag a file" fullWidth code={`// FileUploadCard — click or drag-and-drop zone
<FileUploadCard
  onFilesSelected={(files: File[]) => handleUpload(files)}
  onLinkClick={() => openLearnMore()}
/>

// FileListItem — one row per uploaded file
// status: "default" | "processing" | "error" | "completed"
<FileListItem
  filename="Q1_Report_Final.xlsx"
  fileSize="2.30 MB"
  status="completed"
  showDivider
/>`}>
        <LiveUpload />
      </DemoRow>

      <DemoRow label="Card states">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Normal (dashed border)</p>
            <FileUploadCard onLinkClick={() => {}} />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 8, marginTop: 0 }}>Disabled</p>
            <FileUploadCard disabled />
          </div>
        </div>
      </DemoRow>

      <DemoRow label="File list — all statuses" code={`// Wrap multiple FileListItems in a card container
<div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E5E7EB", padding: "4px 12px" }}>
  <FileListItem filename="report.xlsx" fileSize="108 KB" status="default"    showDivider />
  <FileListItem filename="report.xlsx" fileSize="108 KB" status="processing" showDivider />
  <FileListItem filename="report.xlsx" fileSize="108 KB" status="error"      showDivider />
  <FileListItem filename="report.xlsx" fileSize="108 KB" status="completed" />
</div>`}>
        <div style={{ background: "#FFFFFF", borderRadius: 10, border: "1px solid #E5E7EB", padding: "4px 12px", maxWidth: 520 }}>
          <FileListItem filename="12 Months Monthly business status Summary.exl" fileSize="108.69 KB" status="default"    showDivider />
          <FileListItem filename="12 Months Monthly business status Summary.exl" fileSize="108.69 KB" status="processing" showDivider />
          <FileListItem filename="12 Months Monthly business status Summary.exl" fileSize="108.69 KB" status="error"      showDivider />
          <FileListItem filename="12 Months Monthly business status Summary.exl" fileSize="108.69 KB" status="completed" />
        </div>
      </DemoRow>

      <DemoRow label="Standalone list items" fullWidth>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 520 }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 4, marginTop: 0 }}>Default — pending upload</p>
            <FileListItem filename="Q1_Report_Final.xlsx" fileSize="2.30 MB" status="default" />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 4, marginTop: 0 }}>Processing — uploading</p>
            <FileListItem filename="Client_Database_Export.csv" fileSize="54.10 KB" status="processing" />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 4, marginTop: 0 }}>Error — upload failed</p>
            <FileListItem filename="corrupted_file.xls" fileSize="1.02 MB" status="error" />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 4, marginTop: 0 }}>Completed — uploaded successfully</p>
            <FileListItem filename="Annual_Summary_2025.xlsx" fileSize="892.00 KB" status="completed" />
          </div>
        </div>
      </DemoRow>
    </DemoShell>
  );
}
