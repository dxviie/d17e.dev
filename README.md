# d17e.dev

Personal website and blog. Find out more in my [blog post about it](https://www.d17e.dev/blog/what-is-this-place).

## Tech Stack

- **[Astro](https://astro.build)** - Static site generator with hybrid rendering capabilities
- **[Svelte](https://svelte.dev)** - Interactive UI components
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Directus](https://directus.io)** - Headless CMS for content management
- **PWA Support** - Progressive Web App capabilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or your preferred package manager

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:4321`

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run sync` | Sync Astro content types |
| `npm run generate-pwa-icons` | Generate PWA icons (requires ffmpeg) |

## Project Structure

```
site-v2/
├── src/
│   ├── components/     # UI components (.astro, .svelte)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route definitions
│   ├── services/       # API integrations (Directus)
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
├── public/             # Static assets
└── dist/               # Build output (generated)
```

## PWA Configuration

To enable Progressive Web App features:

1. Generate PWA icons:
   ```bash
   npm run generate-pwa-icons
   ```
   On Windows, use: `npm run generate-pwa-icons:win`

2. Build the production site:
   ```bash
   npm run build
   ```

3. Preview the PWA locally:
   ```bash
   npm run preview
   ```

**Note:** Icon generation requires [ffmpeg](https://ffmpeg.org/download.html) to be installed on your system.

## Content Management

Content is managed through Directus CMS. The integration is handled via the services layer in `src/services/`.

## License

- **Code**: MIT License - see [LICENSE](LICENSE) file for details
- **Content** (images and copy): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) - Creative Commons Attribution-NonCommercial 4.0 International
