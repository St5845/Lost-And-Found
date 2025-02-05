import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {}, // Ensure compatibility with environment variables
  },
  optimizeDeps: {
    include: ["crypto-browserify", "buffer"],
  },
});
