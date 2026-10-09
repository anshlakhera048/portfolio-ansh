import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },

  resolve: {
    dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "postprocessing",
    ],
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("/node_modules/three/") ||
            id.includes("/node_modules/@react-three/") ||
            id.includes("/node_modules/postprocessing/") ||
            id.includes("/node_modules/three-stdlib/") ||
            id.includes("/node_modules/troika-") ||
            id.includes("/node_modules/meshline/")
          ) {
            return "three-vendor";
          }

          if (id.includes("/node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
