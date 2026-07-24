# Tippal Design System

**Tippal** is a peer-to-peer tipping app: load money, send a tip ("gratitude") to a person with a personal note, get verified (KYC), withdraw. The brand is joyful fintech — playful where money feels emotional (tips, celebration), calm and reassuring where it feels serious (verification, errors, balances).

Brand mark: `assets/logo.png` (transparent PNG, 452×332) spells **TipPal** (rainbow bubble letters with star confetti); the code and tokens consistently use **Tippal** / `tippal-ds`.

## Sources
- Local codebase mount `tippal-v2/` — "Tippal Components v2" template: `components.jsx` (the 9 synced components, props APIs from `tippal-ds@1.0.0`) + showcase `TippalV2.dc.html`.
- Uploaded token layers: `uploads/_ds_bundle.css` (core synced tokens), `uploads/tippal-type.css` (canonical type families), `uploads/tippal-emotion.css` (motion/elevation/emotional layer), `uploads/styles.css`.
- Uploaded logo: `uploads/logo.png` (transparent PNG) → `assets/logo.png`; earlier `uploads/image.jpg` superseded.

## CONTENT FUNDAMENTALS
- **Warm, human, second person.** Copy talks to "you" and speaks plainly: "We'll never share it.", "One moment…" while loading.
- **Errors are gentle, never alarming.** "Hmm, that email looks incomplete" — conversational, no blame, no exclamation marks in errors.
- **Celebration is verbal too.** Success states name the joy: "Tip sent!". Tipping is framed as *gratitude* ("Send Gratitude" screen title), money movement as human phrases ("Money loaded", "Tip from Carlos R.").
- **Human labels over status codes.** KYC states render as "Verify your identity" / "Verification pending" / "Verified" — never `NOT_STARTED`.
- **Sentence case everywhere** (buttons, labels, titles); title case only for screen titles like "Send Gratitude".
- **No emoji** in product copy; emotion is carried by color, motion, and hearts (drawn icons).
- Dates are humanized: "Today, 2:14 PM", "Yesterday", "Jul 18". Amounts always show cents, tabular numerals.

## VISUAL FOUNDATIONS
- **Colors:** azure primary `#007FFF` (actions, links, focus), purple secondary `#8A2BE2` → deep-purple accent `#30006a` (brand gradients, display text), electric yellow tertiary `#FFF52D` (CTAs *on* purple, e.g. "Load money"), lavender app background `#f3e8ff`, white surfaces. Warm sand borders (`#E0D5C0`/`#F5F0E5`). Semantic error/success/warning each pair with a light tint. Emotional accents: gratitude coral `--tippal-heart #FF7A59` (+soft), smile yellow, calm blue.
- **Type:** Plus Jakarta Sans (400–800) for all UI/body; Fredoka (500–700) strictly for display — screen titles, hero numerals, brand moments, always in deep purple `--tippal-accent` on light. 8-step size scale 10→48px. Money uses `font-variant-numeric: tabular-nums`.
- **Spacing:** 4/8/16/24/32/48. Radii: tokens 8/12/16/24/full; in practice buttons 15, inputs 14, cards 20, BalanceCard 24, pills 9999.
- **Backgrounds:** flat lavender for app screens; brand-purple gradient `linear-gradient(135deg, secondary, accent)` for hero/wallet surfaces, decorated with soft white translucent circles. No photography, no patterns.
- **Elevation:** all shadows are purple-tinted (`rgba(48,0,106,…)`) and soft — rest/card/float, plus colored glows (`glow-primary`, `glow-joy`) under primary buttons. Never harsh black shadows.
- **Glass:** white-alpha capsules (`12%/18%/60%` + 35% white border, 8–20px blur) used ONLY over brand gradients/imagery; `readable` (60%) is the only variant for body text.
- **Animation:** calm by default (`ease-calm`, 150–250ms), joyful overshoot (`ease-joy`, cubic-bezier(.34,1.56,.64,1)) for presses/hearts/checks, `ease-settle` for screens/sheets, 900ms celebrations. Canonical moves: press scale .96 / hover 1.03, success check *pops* (scale 0→1.3→1), errors *wiggle* horizontally ±4px, skeletons *breathe* (opacity), hearts float up.
- **Hover/press:** transform-based (scale), plus soft background tint on rows (`rgba(138,43,226,.045)`); ghost buttons fill with `primary-light`.
- **Cards:** white, radius 20, 20px padding, `shadow-card`; lists inside cards use hairline `border-light` separators and 42px rounded-13 icon chips.
- **Iconography color:** two-tone chips — tinted background + saturated glyph (coral heart on `heart-soft`, green arrow on `success-light`).

## ICONOGRAPHY
- No icon font, no external icon set, no emoji. Icons are **small inline SVGs baked into components**: 24-viewBox, stroke-based (round caps/joins, stroke 2.4–3.2) for arrows/checks/plus; filled paths for hearts, shields, status circles. Sizes 13–19px.
- The gratitude **heart** is the signature glyph (tips sent = coral, received = blue). Money movement uses down/up arrows; KYC uses circle/clock/shield/x glyphs.
- Brand assets: `assets/logo.png` (TipPal wordmark, transparent PNG — works on white and on brand-purple gradients). No other illustrations, photos, or background images were provided.
- If you need glyphs beyond these, match the style: 24-grid stroke SVGs at 2.4 weight (Lucide is the closest CDN match — flag any such substitution).

## Components (namespace `TippalDesignSystem_aee861`)
The inventory is exactly the 9 components synced from `tippal-ds@1.0.0` — no additions:
- `components/actions/` — **Button**
- `components/forms/` — **CustomInput**
- `components/structure/` — **Card**, **GlassCard**, **Divider**, **Header**
- `components/money/` — **BalanceCard**, **TransactionItem**, **KycBadge**

Each has `.jsx` + `.d.ts` + `.prompt.md` and a `@dsCard` showcase per directory.

## Index
- `styles.css` → `tokens/colors.css`, `tokens/typography.css` (Google Fonts import), `tokens/spacing.css`, `tokens/emotion.css` (motion, shadows, emotional accents, celebration keyframes).
- `assets/logo.png` — TipPal wordmark (transparent).
- `guidelines/` — 15 specimen cards (Colors ×7, Type ×3, Spacing/Radius/Elevation/Motion, Brand logo).
- `components/` — see above.
- `ui_kits/app/` — interactive Tippal app (Home + Send Gratitude flow) composed from the components; see its README for the composition disclaimer.
- `SKILL.md` — agent skill entry point.

## Caveats / intentional gaps
- Fonts load from Google Fonts (`@import` in `tokens/typography.css`) — no font binaries were provided.
- No full-screen product designs were in the sources; the UI kit screens are canonical compositions of the 9 components, clearly flagged in `ui_kits/app/README.md`.
