import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Environment configuration logger plugin
function envLogger(env: Record<string, string>) {
  const envType = env.VITE_ENV_TYPE || 'prod';
  const apiUrl = envType === 'local' 
    ? env.VITE_LOCAL_API_URL 
    : env.VITE_PROD_API_URL;

  return {
    name: 'env-logger',
    configResolved() {
      console.log('\n\x1b[34m=== ContentPilot Environment Configuration ===\x1b[0m');
      console.log(`\x1b[32m🌍 Environment:\x1b[0m ${envType.toUpperCase()}`);
      console.log(`\x1b[32m🔗 API URL:\x1b[0m ${apiUrl}`);
      console.log('\x1b[34m==========================================\x1b[0m\n');
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, __dirname, '');
  
  return {
    server: {
      host: "::",
      port: 8081,
      proxy: {
        // Proxy all /api requests to backend
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          // Rewrite the path if needed
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      react(),
      envLogger(env),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
