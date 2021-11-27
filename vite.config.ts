import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { join } from 'path'

export default defineConfig({
  mode: 'development',
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Track IT',
        short_name: 'Track IT',
        display: 'standalone',
        background_color: '#0098ff',
        theme_color: '#000',
        description: 'Track IT Gym Tracker',
        icons: [
          {
            src: './img/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: './img/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './img/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: './img/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: './img/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
})
