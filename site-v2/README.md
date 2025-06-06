# d17e.dev Site v2

Personal website and blog built with Astro, featuring PWA support and Directus CMS integration.

## Features

- **Astro** - Static site generator with hybrid rendering
- **Svelte** - Interactive components
- **TypeScript** - Type-safe development
- **PWA Support** - Progressive Web App capabilities
- **Directus CMS** - Headless content management
- **Sentry** - Error monitoring

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```
   Site will be available at `localhost:4321`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run sync` | Sync Astro content types |
| `npm run generate-pwa-icons` | Generate PWA icons (requires ffmpeg) |

## Project Structure

```
src/
├── components/     # UI components (.astro, .svelte)
├── layouts/        # Page layouts
├── pages/          # Route definitions
├── services/       # API integrations (Directus)
├── styles/         # Global styles
└── utils/          # Utility functions
```

## PWA Support

To enable PWA features:

1. Generate icons: `npm run generate-pwa-icons` (or `:win` on Windows)
2. Build: `npm run build`
3. Preview: `npm run preview`

Requires [ffmpeg](https://ffmpeg.org/download.html) for icon generation.