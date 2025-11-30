import 'dotenv/config'
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa'

const BUILD_VERSION = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ||
                     process.env.CF_PAGES_COMMIT_SHA?.slice(0, 8) ||
                     Date.now()

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}


export default defineConfig({
  base: process.env.VITE_APP_BASE_PATH,
  plugins: [
    tailwindcss(),
    remix({
      basename: process.env.VITE_APP_BASE_PATH,
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',           // ← important
      injectRegister: null,               // or 'script' / 'inline'

      // THIS IS THE 2025 TRICK — unique cache name per build
      workbox: {
        // Option A — the cleanest (recommended)
        cacheId: `realworld-app-${BUILD_VERSION}`,   // ← forces brand-new cache every deploy

        // Option B — manual cache names (same effect)
        // globPatterns: ['**/*.{js,css,html,woff2,png,jpg,svg}'],
        // runtimeCaching: [...],
        // cleanupOutdatedCaches: true,

        // Let Vite’s [hash] filenames do the revisioning
        dontCacheBustURLsMatching: /\.\w{8,}\./,

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts'
            }
          }
        ],
        globPatterns: ['**/*.{js,css,ico,svg,png,jpg}'],
        navigateFallback: null,
        // navigateFallbackDenylist: [/^\/api/],

        // Optional but recommended
        skipWaiting: false,
        clientsClaim: false,
        cleanupOutdatedCaches: true,
      },

      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],

  build: {
    // Vite already does [hash] filenames by default → perfect for Workbox
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
});

