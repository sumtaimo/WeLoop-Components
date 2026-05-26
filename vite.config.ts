import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": resolve(__dirname, "src/components"),
      "@/tokens": resolve(__dirname, "src/tokens"),
      "@/styles": resolve(__dirname, "src/styles"),
    },
  },
  root: ".",
  build: {
    outDir: "dist",
  },
});
