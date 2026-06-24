// vite.config.js
import { defineConfig } from "file:///C:/Users/%E8%BF%AA%E8%BF%A6/Desktop/trae%E9%A1%B9%E7%9B%AE/zuopinji/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/%E8%BF%AA%E8%BF%A6/Desktop/trae%E9%A1%B9%E7%9B%AE/zuopinji/node_modules/@vitejs/plugin-react/dist/index.js";
import { compression } from "file:///C:/Users/%E8%BF%AA%E8%BF%A6/Desktop/trae%E9%A1%B9%E7%9B%AE/zuopinji/node_modules/vite-plugin-compression2/dist/index.mjs";
import terser from "file:///C:/Users/%E8%BF%AA%E8%BF%A6/Desktop/trae%E9%A1%B9%E7%9B%AE/zuopinji/node_modules/@rollup/plugin-terser/dist/es/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\\u8FEA\u8FE6\\Desktop\\trae\u9879\u76EE\\zuopinji";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: ["gzip", "brotliCompress"],
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "gsap"],
          ogl: ["ogl"]
        }
      }
    },
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1e3
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    host: true,
    port: 3e3
  },
  base: "./"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdThGRUFcdThGRTZcXFxcRGVza3RvcFxcXFx0cmFlXHU5ODc5XHU3NkVFXFxcXHp1b3BpbmppXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxcdThGRUFcdThGRTZcXFxcRGVza3RvcFxcXFx0cmFlXHU5ODc5XHU3NkVFXFxcXHp1b3BpbmppXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8lRTglQkYlQUElRTglQkYlQTYvRGVza3RvcC90cmFlJUU5JUExJUI5JUU3JTlCJUFFL3p1b3BpbmppL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJ1xuaW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06IFsnZ3ppcCcsICdicm90bGlDb21wcmVzcyddLFxuICAgICAgdGhyZXNob2xkOiAxMDI0MCxcbiAgICAgIG1pblJhdGlvOiAwLjgsXG4gICAgfSlcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdnc2FwJ10sXG4gICAgICAgICAgb2dsOiBbJ29nbCddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgYmFzZTogJy4vJ1xufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVUsU0FBUyxvQkFBb0I7QUFDcFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLE1BQ1YsV0FBVyxDQUFDLFFBQVEsZ0JBQWdCO0FBQUEsTUFDcEMsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLGFBQWEsTUFBTTtBQUFBLFVBQ3JDLEtBQUssQ0FBQyxLQUFLO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFDUixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
