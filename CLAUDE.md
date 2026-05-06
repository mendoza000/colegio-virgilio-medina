# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for a fictional school (**Institución Educativa San Isidro**, primary → high school) built with **Astro + React islands + Tailwind v4 + Framer Motion**. No backend, no auth, no real forms — enrollment buttons are decorative `<a href="#">`. All copy must be in **Colombian Spanish** with an institutional, professional tone.

The full content/animation/section spec lives in `docs/plan.md` and should be treated as the source of truth for what to build, what data to use, and what every section must contain. The plan is divided into 6 phases (Fundación → Pulido final); each phase has a deliverable and the project should compile cleanly between phases.

## Commands

```bash
npm run dev      # astro dev — http://localhost:4321
npm run build    # astro build → static output in /dist
npm run preview  # preview the production build
npm run astro -- check   # type-check .astro + .ts (no test framework configured)
```

Node `>=22.12.0` is required (`engines` in `package.json`).

## Stack divergence from `docs/plan.md` — read before editing styles

`docs/plan.md` was written assuming **Tailwind v3** (`@astrojs/tailwind` + `tailwind.config.mjs`). The actual installed stack is **Tailwind v4** via `@tailwindcss/vite` (see `astro.config.mjs`). This changes how design tokens are declared:

- **No `tailwind.config.mjs`.** Do not create one.
- Define the color/font tokens from the plan inside `src/styles/global.css` using Tailwind v4's `@theme` directive (e.g. `--color-bone: #F9F6F0;`, `--color-gold: #C9920A;`, `--font-display: "Cormorant Garamond", serif;`). Tailwind v4 auto-generates utilities like `bg-bone`, `text-gold`, `font-display` from `@theme` tokens.
- For nested color shades the plan calls `gold.DEFAULT` / `gold.light`, declare them as flat tokens in v4: `--color-gold` and `--color-gold-light` (utility becomes `bg-gold-light`).
- The two CSS variables the plan keeps outside Tailwind (`--shadow-gold`, `--border-gold-subtle`) still go in `:root` in the same file.
- The global stylesheet must be imported from `src/layouts/Layout.astro`; it is **not** auto-injected.

When following the plan's code snippets, mentally translate any `tailwind.config.mjs` instruction into the equivalent `@theme` block in `global.css`.

Missing runtime deps the plan requires (install when entering the relevant phase): `framer-motion`, `lucide-react`, `@fontsource/cormorant-garamond`, `@fontsource/dm-sans`.

## Architecture

- **`src/pages/index.astro`** is the single entry route — one long page composed of section components rendered as React islands.
- **`src/layouts/Layout.astro`** owns `<html lang="es">`, fonts (`@fontsource/*` imports), meta tags, `scroll-behavior: smooth`, the `bg-bone font-body text-ink` body class, and `import "../styles/global.css"`.
- **React islands hydration policy** (from the plan, enforce strictly):
  - `Navbar` and `Hero` → `client:load`
  - Every other section component → `client:visible`
- **Section rhythm** alternates light (`bg-bone`) and dark (`bg-carbon` / `bg-carbon-soft`) backgrounds in this fixed order: Navbar · Hero(dark) · About(light) · Stats(dark) · AcademicLevels(light) · Schedules(carbon-soft) · Subjects(light) · Enrollment(dark) · Gallery(light) · Testimonials(carbon-soft) · Contact(light) · Footer(dark).
- **Animation pattern** — every animated component uses Framer Motion with `useInView({ once: true })` so animations don't replay on re-scroll. Standard variant is `fadeUp` (`opacity 0→1`, `y 40→0`, `duration 0.4–0.8s`, `ease: 'easeOut'`, optional staggered `delay: i * 0.1`). Number counters in `Stats` use `useMotionValue` + `animate`. Don't introduce new easing curves or longer durations.
- **UI primitives** live in `src/components/ui/` (`Button` with `primary`/`outline` variants, `SectionTitle` with `light`/`dark` variant + green label chip, `Badge` with `green`/`gold`). Section components live directly under `src/components/`.

## Conventions

- Use Tailwind utility classes only — **no hex literals in JSX/TSX**. Token names are defined in the plan's color table; honor them exactly (`bone`, `carbon`, `carbon-soft`, `gold`, `gold-light`, `forest`, `forest-light`, `berry`, `ink`, `ink-muted`).
- Placeholder images: `https://picsum.photos/seed/{seed}/{w}/{h}` — keep the seeds the plan specifies for the Gallery section so visuals stay deterministic.
- The school logo (`/public/images/logo.png`) has a black background. On `bg-bone` sections wrap it in a localized `bg-carbon` container; on `bg-carbon` sections drop it in directly.
- Mobile-first; verify `sm/md/lg/xl` breakpoints. Tables (e.g. `Schedules`) need horizontal scroll on mobile.
- Heading hierarchy: a single `h1` in `Hero`, `h2` per section, `h3` for subsections.
- Confirm `npm run build` succeeds at the end of each phase before moving on.
