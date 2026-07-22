# TipPal Landing

Marketing landing page for [TipPal](https://tippal.com) — the first app made exclusively for tipping. No terminals, no pressure. Just gratitude.

## Stack

- **[Astro 7](https://astro.build)** — static site generation
- **Pure CSS** — design tokens, scroll-driven animations, responsive layout
- **Google Fonts** — Fredoka (display) + Plus Jakarta Sans (body)
- **Node.js** >= 22.12.0

## Project Structure

```text
/
├── public/
│   └── assets/          # Images and static assets
├── src/
│   ├── components/      # Astro components (Hero, Nav, Footer, etc.)
│   ├── layouts/         # Base layout with fonts and metadata
│   ├── pages/           # Route: index.astro → /
│   └── styles/          # Global CSS with design tokens
├── astro.config.mjs     # Astro configuration
└── package.json
```

## Design Tokens

All visual identity lives in CSS custom properties under `src/styles/global.css`:

- **Colors** — `--tippal-*` palette (primary, accent, heart, background, etc.)
- **Typography** — `--tippal-font-family` and `--tippal-font-display`
- **Elevation** — rest, card, and float shadow presets
- **Motion** — easing curves (`--tippal-ease-settle`, `--tippal-ease-joy`) and durations

Animations use scroll-driven `animation-timeline: view()` with `prefers-reduced-motion` fallback.

## Commands

| Command           | Action                                |
| :---------------- | :------------------------------------ |
| `npm install`     | Install dependencies                  |
| `npm run dev`     | Start dev server at `localhost:4321`  |
| `npm run build`   | Build static site to `./dist/`        |
| `npm run preview` | Preview production build locally      |

## Deployment

Static output goes to `dist/`. Deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3).
