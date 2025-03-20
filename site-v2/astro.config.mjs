// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import sentry from '@sentry/astro';

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
    svelte()
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