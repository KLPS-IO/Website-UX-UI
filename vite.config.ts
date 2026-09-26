import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://klps-lema-production.up.railway.app",
        changeOrigin: true,
        cookieDomainRewrite: "",
        configure(proxy) {
          proxy.on("proxyRes", (response) => {
            // Local HTTP preview only; retain HttpOnly and production settings.
            const cookies = response.headers["set-cookie"];
            if (cookies) response.headers["set-cookie"] = cookies.map(cookie =>
              cookie.replace(/;\s*Secure\b/gi, "").replace(/SameSite=None/gi, "SameSite=Lax"),
            );
          });
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
