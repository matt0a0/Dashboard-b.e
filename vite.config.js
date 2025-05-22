import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite com plugin React e proxy para o Flask
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/data': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
      '/history': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
      },
        build: {
          sourcemap: false,  // Desabilita a geração de sourcemaps
      },
    },
  },
});
