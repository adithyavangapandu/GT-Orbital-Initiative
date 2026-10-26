# AmbaSat Learning Platform

The interactive training platform for **GT Orbital Initiative**'s AmbaSat program — a
serious satellite-engineering course that takes students with little or no satellite
experience from first principles to building, programming and ground-testing a real
AmbaSat-1 MK-II sprite satellite kit.

Content is grounded in the **AmbaSat-1 How To Guide (MK-II Kit) v1.03**; every module
records the manual pages it derives from. Anything not established in the manual is
explicitly labelled *Content pending* / *Additional research required*.

## Stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 3 · React Router 7 · Lucide icons ·
Vitest + React Testing Library · ESLint 9 (flat config)

No backend, no API keys, no paid services — progress is stored in `localStorage`
behind a `ProgressStore` abstraction (see `src/lib/progress.ts`).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` then production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` only |
| `npm run test:run` | Vitest suite |

## Site map

| Route | Section |
| --- | --- |
| `/` | Home / landing |
| `/learn` + `/learn/:articleSlug` | 4 primer articles (Discover/Understand) |
| `/curriculum` + `/curriculum/:moduleSlug` | 10-module course via one shared template |
| `/explore/components` + `/:componentSlug` | 9-component hardware explorer |
| `/lab` + `/lab/:labSlug` | Engineering Lab — 5 labs; Telemetry Journey is live |
| `/mission` | Personal dashboard: progress, milestones, reset |
| `/resources` | Filterable resources + glossary |
| `/about` | About Orbital Initiative |

## Deployment

The app is static and deploys under a sub-path via the `VITE_BASE_PATH` env var:

```bash
VITE_BASE_PATH=/GT-Orbital-Initiative/ambasat/ npm run build
```

`vite.config.ts` applies the base, the router derives its `basename` from
`import.meta.env.BASE_URL`, `netlify.toml` + `public/_redirects` provide the SPA
fallback for Netlify/Cloudflare Pages, and the repo's
`.github/workflows/pages.yml` builds the app into `_site/ambasat/` with a
`404.html` fallback for GitHub Pages.

See [`docs/architecture.md`](docs/architecture.md),
[`docs/curriculum-map.md`](docs/curriculum-map.md) and
[`docs/future-features.md`](docs/future-features.md).
