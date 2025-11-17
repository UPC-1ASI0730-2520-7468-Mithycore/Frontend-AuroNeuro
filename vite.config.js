import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],

    // ⚠️ Fix para Vercel: evita que esbuild rompa vue.runtime.esm-bundler.js
    optimizeDeps: {
        exclude: ['vue']
    },

    build: {
        commonjsOptions: {
            include: []
        }
    }
})
