import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssMinify: true,
      minify: "esbuild",
    },
  },
});
