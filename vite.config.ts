import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      entry: "src/main/index.ts",
      vite: {
        build: {
          rollupOptions: {
            // here you define the packages used in the server process
            external: ["fastify", "ws"],
          },
        },
      },
    }),
  ],
});
