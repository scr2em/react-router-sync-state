import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.tsx"],
    platform: "browser",
    format: ["esm"], // Build for commonJS and ES modules
    outDir: "./dist",
    dts: true, // Generate declaration file (.d.ts)
    splitting: false,
    sourcemap: true,
    minify: true,
    clean: true,
  },
]);
