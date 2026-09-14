import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "pages",
  base: "/bodenlabor/herzwerkstatt/",
  plugins: [react()],
  build: { outDir: "../gh-pages-dist", emptyOutDir: true },
});
