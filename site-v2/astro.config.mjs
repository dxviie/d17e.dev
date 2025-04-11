// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import sentry from '@sentry/astro';
import AstroPWA from '@vite-pwa/astro';

// Determine if we're in production based on environment
const isProd = process.env.NODE_ENV === 'production';

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
        includeAssets: ['fonts/**/*', 'assets/**/*'],
        manifest: false, // We're using a custom manifest file
        workbox: {
            globDirectory: 'dist',
            globPatterns: [
                '**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2,ttf,eot,ico}',
            ],
            // Don't fallback on document based (e.g. `/some-page`) requests
            // This removes an ugly "flash" that would otherwise happen on such navigations
            navigateFallback: null,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/d17e\.dev\/.*(png|jpg|jpeg|webp|svg|gif|tiff|bmp|ico)$/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                        }
                    }
                },
                {
                    urlPattern: /^https:\/\/d17e\.dev\/assets\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'assets-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                        }
                    }
                },
                {
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

// Add Sentry only in production
if (isProd) {
    baseIntegrations.push(
        sentry({
            dsn: "https://326015f0ad330d4959b4fbed8a9f61d3@o4504983358603264.ingest.us.sentry.io/4508942066122752",
            tracesSampleRate: 0,
            replaysSessionSampleRate: 0,
            replaysOnErrorSampleRate: 0,
            sourceMapsUploadOptions: {
                project: "d17e-dev-astro",
                authToken: process.env.SENTRY_AUTH_TOKEN,
            },
        })
    );
}

// https://astro.build/config
// @ts-ignore
export default defineConfig({
    site: 'https://d17e.dev',
    integrations: baseIntegrations,
});