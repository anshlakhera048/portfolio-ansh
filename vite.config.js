import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

<<<<<<< HEAD
  // Prevent duplicate React / Three instances across chunks
=======
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
  },

>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
  resolve: {
    dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
  },

<<<<<<< HEAD
  // Pre-bundle the R3F ecosystem so Vite sees one copy at dev time too
=======
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
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
<<<<<<< HEAD
          // React MUST be isolated — mixing it into any other chunk causes
          // the "Cannot read properties of undefined (reading 'useLayoutEffect')"
          // crash in minified production builds.
=======
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

<<<<<<< HEAD
          // Three.js + R3F ecosystem — isolated from React
=======
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
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

<<<<<<< HEAD
          // Everything else from node_modules goes into a generic vendor chunk
=======
>>>>>>> 9d0c45aa13deaa634b289621b65c93c965649a7a
          if (id.includes("/node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
});
