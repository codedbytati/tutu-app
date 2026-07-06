import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'extract',
      filename: 'remoteEntry.js',
      exposes: {
        './MeuComponente': './src/components/MeuComponente.tsx',
        './ExtractList': './src/features/extract/ExtractList.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5001,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5001,
  },
  build: {
    target: 'esnext',
  },
});