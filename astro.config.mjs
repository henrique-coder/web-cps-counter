import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://cpscounter.henriquecoder.com",
  compressHTML: true,
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
