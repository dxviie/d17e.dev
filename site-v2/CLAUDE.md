# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm install` - Install dependencies
- `npm run dev` - Start local dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run sync` - Sync Astro content types
- `npm run astro ...` - Run Astro CLI commands

## Code Style Guidelines
- **TypeScript**: Use strong typing with interfaces/types
- **Formatting**: Use 2-space indentation
- **Components**: 
  - Use `.astro` for templating and styling
  - Use `.svelte` for interactive components
- **Imports**: Group imports by type (framework, local)
- **Paths**: Use absolute imports with `$root/` prefix
- **Naming**: Use camelCase for variables, PascalCase for components
- **Errors**: Use explicit error handling with typed errors
- **CSS**: Use component-scoped CSS in style tags

## Project Structure
- `src/components/` - UI components
- `src/layouts/` - Page layouts
- `src/pages/` - Route definitions
- `src/services/` - API integrations
- `src/utils/` - Utility functions and constants
- `src/assets/` - Static assets
- `src/styles/` - Global styles and themes
