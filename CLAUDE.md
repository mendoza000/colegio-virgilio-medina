# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page + content admin panel for a fictional school (**Colegio Virgilio Medina**, C.V.M., primary → high school, located in Santa Ana del Táchira, Venezuela; founded 2020) built with **Astro (server output) + React islands + Tailwind v4 + Framer Motion + Supabase**. The public page is server-rendered on every request and reads its content from Supabase (see "Admin panel & Supabase" below); a single admin account can edit that content at `/admin`. All user-facing copy must be in **Venezuelan Spanish** with an institutional, professional tone.

The full content/animation/section spec lives in `docs/plan.md` and should be treated as the source of truth for what to build, what data to use, and what every section must contain. The plan is divided into 6 phases (Fundación → Pulido final); each phase has a deliverable and the project should compile cleanly between phases.

## Commands

```bash
npm run dev      # astro dev — http://localhost:4321
npm run build    # astro build → server output in /dist (Vercel adapter)
npm run preview  # preview the production build
npm run astro -- check   # type-check .astro + .ts (no test framework configured)
```

Node `>=22.12.0` is required (`engines` in `package.json`). Requires `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env` (see `.env.example`) — without them, every page 500s since `index.astro` fetches content from Supabase on every request.

## Stack divergence from `docs/plan.md` — read before editing styles

`docs/plan.md` was written assuming **Tailwind v3** (`@astrojs/tailwind` + `tailwind.config.mjs`). The actual installed stack is **Tailwind v4** via `@tailwindcss/vite` (see `astro.config.mjs`). This changes how design tokens are declared:

- **No `tailwind.config.mjs`.** Do not create one.
- Define the color/font tokens from the plan inside `src/styles/global.css` using Tailwind v4's `@theme` directive (e.g. `--color-bone: #F9F6F0;`, `--color-green: #43A047;`, `--font-display: "Cormorant Garamond", serif;`). Tailwind v4 auto-generates utilities like `bg-bone`, `text-green`, `font-display` from `@theme` tokens.
- For nested color shades the plan calls `gold.DEFAULT` / `gold.light` (the plan's primary color name), declare them as flat tokens in v4: `--color-green` and `--color-green-light` (utility becomes `bg-green-light`).
- The two CSS variables the plan keeps outside Tailwind (`--shadow-gold`, `--border-gold-subtle`) still go in `:root` in the same file, renamed to `--shadow-green` / `--border-green-subtle`.
- The global stylesheet must be imported from `src/layouts/Layout.astro`; it is **not** auto-injected.

When following the plan's code snippets, mentally translate any `tailwind.config.mjs` instruction into the equivalent `@theme` block in `global.css`.

**Color divergence**: the actual brand primary is **green** (`--color-green: #43A047`, light `#66BB6A`), not the `gold` (`#C9920A`) that `docs/plan.md` specifies — the color was changed after the initial build. Every `gold`/`gold-light` token and utility class in the plan's snippets maps to `green`/`green-light` in this codebase. The `forest`/`forest-light` accent (dark olive green, used only for the light-section `Badge` chip) is unrelated and unchanged.

Missing runtime deps the plan requires (install when entering the relevant phase): `framer-motion`, `lucide-react`, `@fontsource/cormorant-garamond`, `@fontsource/dm-sans`.

## Architecture

- **`src/pages/index.astro`** is the single entry route — one long page composed of section components rendered as React islands. Its frontmatter fetches all content from Supabase in parallel via `src/lib/content.ts` loaders and passes it down as props; components hold no hardcoded copy anymore (except `Stats` and `Testimonials`, intentionally left static — see below).
- **`src/layouts/Layout.astro`** owns `<html lang="es">`, fonts (`@fontsource/*` imports), meta tags, `scroll-behavior: smooth`, the `bg-bone font-body text-ink` body class, and `import "../styles/global.css"`.
- **React islands hydration policy** (from the plan, enforce strictly):
  - `Navbar` and `Hero` → `client:load`
  - Every other section component → `client:visible`
- **Section rhythm** alternates light (`bg-bone`) and dark (`bg-carbon` / `bg-carbon-soft`) backgrounds in this fixed order: Navbar · Hero(dark) · About(light) · Stats(dark) · AcademicLevels(light) · Schedules(carbon-soft) · Subjects(light) · Enrollment(dark) · Gallery(light) · Testimonials(carbon-soft) · Contact(light) · Footer(dark).
- **Animation pattern** — every animated component uses Framer Motion with `useInView({ once: true })` so animations don't replay on re-scroll. Standard variant is `fadeUp` (`opacity 0→1`, `y 40→0`, `duration 0.4–0.8s`, `ease: 'easeOut'`, optional staggered `delay: i * 0.1`). Number counters in `Stats` use `useMotionValue` + `animate`. Don't introduce new easing curves or longer durations.
- **UI primitives** live in `src/components/ui/` (`Button` with `primary`/`outline` variants, `SectionTitle` with `light`/`dark` variant + label chip, `Badge` with `forest`/`green`). Section components live directly under `src/components/`.

## Admin panel & Supabase

- **Rendering**: `astro.config.mjs` sets `output: 'server'` with the `@astrojs/vercel` adapter (required — Astro's default `@astrojs/vercel` version tracks the latest Astro major; this repo pins `@astrojs/vercel@^10` because Astro is on `^6`, not `^7`). Nothing is prerendered — every request (public page and admin) reads fresh from Supabase, so admin edits are visible immediately with no rebuild step.
- **Data layer**: `src/lib/supabase.ts` (anon browser client), `src/lib/supabase-server.ts` (`@supabase/ssr` cookie-based server client for auth + a service-role admin client for privileged writes), `src/lib/content.ts` (one `get*` loader per content type, used by both `index.astro` and the admin pages), `src/lib/icons.ts` (maps a Lucide icon name stored as text in the DB to the actual component — `about_values`, `academic_level_features`, and `schedule_rows` all store icons this way).
- **Auth**: single admin account, Supabase Auth email/password. `src/middleware.ts` guards every `/admin/**` and `/api/admin/**` route except `/admin/login` and `/api/admin/auth/login`.
- **Admin routes**: `src/pages/admin/*.astro` (one page per content area, listed in `src/components/admin/AdminShell.tsx`) + generic CRUD API routes: `/api/admin/lists/[table]` (allow-listed multi-row tables — subjects, schedule_rows, extracurricular_activities, enrollment_steps, about_values, academic_level_features, academic_levels, social_links), `/api/admin/settings/[key]` (allow-listed singleton tables — site_settings, about_content, enrollment_settings), `/api/admin/headings/[section]` (section_headings, keyed by section slug). Gallery and file uploads (`/api/admin/gallery`, `/api/admin/branding-upload`) are bespoke since they involve Supabase Storage, not just table rows.
- **Admin UI primitives**: `src/components/admin/ListEditor.tsx` (generic reorderable CRUD list, with an `icon` field type rendered via `IconPicker` — a visual grid picker over `src/lib/icons.ts`'s curated Lucide set or any other icon map passed via `iconOptions`, e.g. `SOCIAL_ICON_MAP` for social platforms) and `SingletonForm.tsx` (generic one-row settings form) are reused across every content area — don't build a bespoke form per section unless the shape genuinely doesn't fit (image uploads are the one exception: `ImageUploadField`/`DocumentUploadField`). Every list-of-rows content type lives in its own real table (not a JSONB array column) specifically so it can use `ListEditor` — social links included, despite being a tiny 2-4 row list.
- **Database**: normalized tables, not a generic JSON blob — see `supabase/migrations/`. Every table has RLS (public read, authenticated-only write) **and** an explicit `GRANT` to `anon`/`authenticated`/`service_role` (RLS alone is not enough — Postgres denies access at the schema level first). Storage buckets `gallery` and `branding` are public-read, authenticated-write.
- **Local dev**: `supabase start` runs the full stack in Docker; `supabase db reset` re-applies every migration from scratch (including the seed data — the current hardcoded copy was migrated into `supabase/migrations/*_seed_content.sql` verbatim). Create a local test admin via the GoTrue admin API (`POST {API_URL}/auth/v1/admin/users` with the service-role key) since there's no CLI shortcut for it.
- **Out of scope for the admin (still hardcoded)**: `Stats` (the 4 counters) and `Testimonials` — both have DB tables ready (`stats`, `testimonials`) if this is revisited later, but no admin screen exists yet.

## Conventions

- Use Tailwind utility classes only — **no hex literals in JSX/TSX**. Token names are defined in `src/styles/global.css`; honor them exactly (`bone`, `carbon`, `carbon-soft`, `green`, `green-light`, `forest`, `forest-light`, `berry`, `ink`, `ink-muted`).
- Placeholder images: `https://picsum.photos/seed/{seed}/{w}/{h}` — keep the seeds the plan specifies for the Gallery section so visuals stay deterministic.
- The school logo comes from `site_settings.logo_url` (admin-uploadable via `/admin/site-settings`, stored in the `branding` bucket) and has a black background. On `bg-bone` sections wrap it in a localized `bg-carbon` container; on `bg-carbon` sections drop it in directly.
- Mobile-first; verify `sm/md/lg/xl` breakpoints. Tables (e.g. `Schedules`) need horizontal scroll on mobile.
- Heading hierarchy: a single `h1` in `Hero`, `h2` per section, `h3` for subsections.
- Confirm `npm run build` succeeds at the end of each phase before moving on.
