import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { DEV_PORT } from "./src/config/consts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: DEV_PORT,
    strictPort: true,
  },
  build: {
    outDir: "dist-ui",
  },
});
