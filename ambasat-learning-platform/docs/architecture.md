# Architecture

Phase-1 static SPA. No backend; the only persistence is `localStorage`.

## Layers

```
src/
├── app/router.tsx            createBrowserRouter; basename from BASE_URL
├── types/index.ts            All domain models (single source of truth)
├── data/                     Typed content registries
│   ├── modules.ts            10 Module records (+ getModule/prev/next)
│   ├── checkpoints.ts        10 knowledge quizzes + 10 practical checklists
│   ├── components.ts         9 KitComponent records (9-section template)
│   ├── labs.ts / telemetry.ts / articles.ts / glossary.ts / resources.ts / milestones.ts
├── content/modules/          LessonContent per module (prose bodies, markdown)
├── lib/progress.ts           ProgressStore → LocalProgressStore → ProgressManager
├── hooks/useProgress.ts      useSyncExternalStore bindings
├── components/
│   ├── layout/               AppLayout, Header, Footer, Breadcrumbs
│   ├── ui/                   Callout, CodeBlock, DiagramPlaceholder, ComingSoon,
│   │                         EmptyState, StatusChip, ProgressBar
│   ├── lesson/               LessonMarkdown (react-markdown), LessonSection
│   ├── curriculum/           ModuleCard, CurriculumSidebar, ModuleNavButtons
│   ├── checkpoints/          KnowledgeCheckpoint, PracticalCheckpoint
│   └── visualizations/       TelemetryPipeline (the live interactive)
└── pages/                    One file per route; ModulePage is the shared
                              A–I module template, ComponentDetailPage the
                              shared 9-section component template
```

## Key decisions

- **Typed TS content instead of an MDX pipeline.** `src/data/*.ts` and
  `src/content/modules/*.ts` are strongly-typed records; lesson prose bodies are
  markdown strings rendered by `LessonMarkdown` (react-markdown). This satisfies
  "Markdown lessons + strongly typed data models" with zero build tooling beyond Vite.
- **Progress abstraction.** Components never touch `localStorage` directly:
  `ProgressStore` (interface) → `LocalProgressStore` (impl) → `ProgressManager`
  (observable) → React hooks. Swapping in accounts/sync later touches one file.
- **Module completion rule** (in `lib/progress.ts`, pure functions): a module is
  complete when every knowledge question is answered correctly AND every practical
  task is checked. Unit-tested.
- **Base-path deploys.** `VITE_BASE_PATH` sets Vite `base`; the router reads
  `import.meta.env.BASE_URL` for `basename`. Works at `/`, `/ambasat/`, or any
  sub-path without code changes.
- **Manual provenance.** `ManualReference { sourceDocument, page, section,
  description, verificationStatus }` is attached to modules, components and
  telemetry stages; `verificationStatus: 'verified' | 'needs-verification'` marks
  anything not confirmed in the manual.
- **Data integrity tests** (`src/tests/data.test.ts`) assert every cross-link
  (module→checkpoint, component→module, lab→module, milestone→module, article
  related links) resolves — no dangling routes.

## Templates

- `ModulePage.tsx` renders every `/curriculum/:slug` page through spec sections
  A–I: header → why → core concepts → interactive exploration (placeholder) →
  hands-on steps → troubleshooting → knowledge checkpoint → practical checkpoint
  → what-comes-next.
- `ComponentDetailPage.tsx` renders the nine required sections in order
  (what / why / rationale / how / connections / failures / testing / modules /
  references).

## Accessibility & performance

Semantic headings, skip link, keyboard-operable checkpoints and pipeline, visible
focus styles, `prefers-reduced-motion` support, single-bundle build (~640 kB JS /
~197 kB gz — acceptable now; route-level code-splitting is a listed Phase-2 item).
