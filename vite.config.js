import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  plugins: [react(), compression({ algorithm: "brotliCompress" })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("sweetalert2")) {
              return "ui";
            }
          }
        },
      },
    },
  },
});
