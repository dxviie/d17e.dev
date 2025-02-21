// @ts-check
import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import svelte from '@astrojs/svelte';

// https://astro.build/config
// @ts-ignore
export default defineConfig({
    site: 'https://www.d17e.dev',

    integrations: [mdx(), sitemap(), svelte()],
});