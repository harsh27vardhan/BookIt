// import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  // Load the environment variables for the current mode
  const env = loadEnv(mode, process.cwd());

  // Map VITE_ variables to process.env
  Object.keys(env).forEach((key) => {
    process.env[key] = env[key];
  });

  return {
    define: {
      // "process.env": env, // Makes process.env globally available
      "process.env": JSON.stringify(process.env),
    },
    plugins: [react()], // Enables Vite's React plugin
  };
});
