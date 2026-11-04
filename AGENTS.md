## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design checks (Impeccable)

The `impeccable` skill is installed at project level under `.opencode/skills/impeccable/`.

Use it as a **verifier**, not as a design generator:

- `npm run lint:design` — builds the site and runs the deterministic detector over `dist/`.
  Source files alone only run the regex rules; the rendered HTML is what catches contrast,
  font size, and heading-order problems.
- `critique` and `audit` for scored UX and technical reviews of a specific component or page.
- `detect` against the dev server for a live check: `astro dev --background` then
  `.opencode/skills/impeccable/scripts/impeccable detect http://localhost:4321`

Do **not** run the creative-direction commands (`bolder`, `quieter`, `delight`, `overdrive`,
`colorize`, `shape`, `init`) on this project. The visual system is already decided and lives in
`src/styles/global.css` as `--tippal-*` tokens. New visual decisions go through those tokens,
not through a skill regenerating the design language.

Detector ignores are brand decisions and live in `.impeccable/config.json` with a recorded
reason. Add one only when the finding is a deliberate brand choice, never to silence a real
accessibility problem.

### Disabled rules and why

| Rule | Why it is off |
|---|---|
| `ai-color-palette` | TipPal's brand is violet by design. The rule fires once per heading. |
| `overused-font` / `plus jakarta sans` | Brand font, paired with Fredoka for display. |
| `hero-eyebrow-chip` | The badge above the h1 is brand copy, not a decorative eyebrow. |
| `tight-leading` | `.hero__title` (1.06) and `.hero__tagline` (1.1) are display type at 26–68px; the 1.3 floor is a body-text rule. |
| `marquee` | The scrolling banner is an intentional brand motif. |
| `cramped-padding` | Same banner: a marquee is edge-to-edge by definition. |
| `nested-cards` | `.truth__industry` is a rounded block on the white section surface, not a card inside a card. |

Everything else stays on. In particular, keep `low-contrast`, `skipped-heading`,
`undersized-ui-text` and `gray-on-color` active: they were all zero after the November 2026
accessibility pass, and the site publicly claims WCAG 2.1 AA on `/accessibility`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
