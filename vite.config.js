import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@images": path.resolve(__dirname, "src/images"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@componentsMain": path.resolve(
        __dirname,
        "src/components/Main/components"
      ),
      "@blocks": path.resolve(__dirname, "src/blocks"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
