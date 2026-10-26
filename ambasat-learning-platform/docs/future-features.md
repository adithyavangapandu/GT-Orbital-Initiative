# Future features (post Phase 1)

Everything below is architected-for but intentionally unbuilt in Phase 1.

## Interactive labs (4 remaining)

- **Component Explorer 3D/board map** — clickable board regions wired to component pages (slot exists on `/explore/components`).
- **Sensor Playground** — simulated serial console + sensor perturbation (slot in Module 06).
- **Payload Decoder** — inspect a LoRaWAN frame byte-by-byte (Module 08 slot).
- **Mission Operations console** — simulated ground-pass timeline + packet log (Module 09 slot).

Each lesson already carries an `interactive` placeholder (`LessonContent.interactive`) —
implementations mount there without layout changes.

## Checkpoints

- New types beyond `knowledge`/`practical` (ordering, fill-in, diagram labelling) — the
  `Checkpoint` union in `types/index.ts` is designed for extension.
- **Mentor verification** — practical checklists are self-reported; a mentor sign-off
  flag is a known gap (UI already discloses this).

## Progress & accounts

- Swap `LocalProgressStore` for an authenticated store (the `ProgressStore`
  interface is the single seam).
- Exportable progress record for program leads.

## Content depth

- Full prose for modules/articles (Phase 1 bodies are concise, manual-grounded
  starters), more quiz questions per module, part-number verification pass on
  `components.ts` entries flagged `needs-verification`.
- Real board photography/diagrams replacing `DiagramPlaceholder` frames.

## Engineering

- Route-level code-splitting (single bundle currently ~197 kB gz).
- Playwright e2e suite; a11y audit pass (axe).
- Orbit-ops content beyond manual scope (TLE, pass prediction) — requires an
  approved secondary source.
