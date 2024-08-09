import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export const viteUserConfig: UserConfig = {
  plugins: [react()],
  build: { outDir: "build" },
  server: { open: true, port: 3000 },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     define: {
  //       global: "globalThis",
  //     },
  //   },
  // },
};
export default defineConfig(viteUserConfig);
