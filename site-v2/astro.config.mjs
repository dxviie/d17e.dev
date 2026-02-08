// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro';

// Configure integrations
const baseIntegrations = [
    mdx(), 
    sitemap({
        filter: (page) => !page.includes('/_astro/'),
        changefreq: 'weekly',
        lastmod: new Date(),
    }), 
    svelte(),
    AstroPWA({
        mode: 'production',
        base: '/',
        scope: '/',
        includeAssets: ['fonts/**/*'],
        manifest: false, // We're using a custom manifest file
        workbox: {
            globDirectory: 'dist',
            globPatterns: [
                '**/*.{js,css,html,svg,woff,woff2,ttf,eot,ico}',
                'icons/*.png',
                'favicon-*.png',
            ],
            // Exclude large source images from src/assets
            globIgnores: [
                '_astro/**/*.{jpg,jpeg,png,webp}',  // Exclude the built images from src/assets
                'assets/*.{jpg,jpeg,png,webp}',     // Exclude large assets 
            ],
            maximumFileSizeToCacheInBytes: 2 * 1024 * 1024, // 2MB limit
            // Don't fallback on document based (e.g. `/some-page`) requests
            // This removes an ugly "flash" that would otherwise happen on such navigations
            navigateFallback: null,
            runtimeCaching: [
                {
                    // Cache UI elements like icons
                    urlPattern: /^https:\/\/d17e\.dev\/icons\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'ui-assets-cache',
                        expiration: {
                            maxEntries: 20,
                            maxAgeSeconds: 60 * 24 * 60 * 60 // 60 days
                        }
                    }
                },
                {
                    // Network-first for content pages
                    urlPattern: /^https:\/\/d17e\.dev\/(posts|blog|projects)\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'content-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
                        }
                    }
                }
            ]
        },
        devOptions: {
            enabled: true,
            type: 'module'
        }
    })
];

// https://astro.build/config
// @ts-ignore
export default defineConfig({
    site: 'https://d17e.dev',
    integrations: baseIntegrations,
    vite: {
        define: {
            // Polyfill for Node.js globals used by hydra-synth dependencies
            global: 'globalThis',
        },
        optimizeDeps: {
            // Ensure hydra-synth and its dependencies are pre-bundled correctly
            include: ['hydra-synth'],
        },
    },
});