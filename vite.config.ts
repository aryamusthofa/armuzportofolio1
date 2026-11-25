import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // GitHub Pages butuh base = nama repo (hanya saat build production)
  base: mode === "production" ? "/armuzportofolio1/" : "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}));
