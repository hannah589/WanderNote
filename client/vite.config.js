import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    flowbiteReact(),
  ],
  server: {
    port: 3000,

    proxy: { 
      //Proxy API requests from Vite to Express
      //fetch("http://localhost:4000/api/auth/login") turns to fetch("/api/auth/login")
      '/api': {
        //not https. this is a testing server
        //location of the backend, express server
        target: "http://localhost:4000",
        //changes the http headers origin to the target server
        changeOrigin: true,
        //remove the secure
        //if true, verifies HTTP certificates
        secure: false,
      },
    },
  },
})
