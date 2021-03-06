import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

const base = '/emoji-picker/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Emoji Picker',
        short_name: 'Emoji Picker',
        description: 'Pick and copy emoji as text or image.',
        start_url: base,
        scope: base,
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
  },
});
