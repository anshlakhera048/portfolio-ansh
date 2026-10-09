import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Prevent duplicate React / Three instances across chunks
  resolve: {
    dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
  },

  // Pre-bundle the R3F ecosystem so Vite sees one copy at dev time too
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
          // React MUST be isolated — mixing it into any other chunk causes
          // the "Cannot read properties of undefined (reading 'useLayoutEffect')"
          // crash in minified production builds.
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

          // Three.js + R3F ecosystem — isolated from React
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

          // Everything else from node_modules goes into a generic vendor chunk
          if (id.includes("/node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
