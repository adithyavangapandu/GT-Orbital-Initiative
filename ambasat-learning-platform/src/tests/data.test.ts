import { describe, expect, it } from 'vitest';
import { articles } from '../data/articles';
import { boardConnections, boardPartForComponent, boardParts, busInfo, getBoardPart } from '../data/board';
import { getCheckpoint } from '../data/checkpoints';
import { components } from '../data/components';
import { glossary } from '../data/glossary';
import { labs } from '../data/labs';
import { milestones } from '../data/milestones';
import { getModule, modules } from '../data/modules';
import { telemetryStages } from '../data/telemetry';

const moduleSlugs = new Set(modules.map((m) => m.slug));
const componentSlugs = new Set(components.map((c) => c.slug));
const articleSlugs = new Set(articles.map((a) => a.slug));

describe('content data consistency (no dangling links)', () => {
  it('module slugs are unique', () => {
    expect(moduleSlugs.size).toBe(modules.length);
  });

  it('every module references existing checkpoints', () => {
    for (const m of modules) {
      expect(getCheckpoint(m.checkpointIds.knowledge)?.type).toBe('knowledge');
      expect(getCheckpoint(m.checkpointIds.practical)?.type).toBe('practical');
    }
  });

  it('component → module links resolve', () => {
    for (const c of components) {
      for (const slug of c.relatedModules) {
        expect(moduleSlugs.has(slug), `${c.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it('lab → module links resolve', () => {
    for (const l of labs) {
      for (const slug of l.associatedModules) {
        expect(moduleSlugs.has(slug), `${l.slug} → ${slug}`).toBe(true);
      }
    }
  });

  it('milestones point at real modules', () => {
    const ids = new Set(modules.map((m) => m.id));
    for (const ms of milestones) {
      expect(ids.has(ms.moduleId), ms.id).toBe(true);
    }
  });

  it('telemetry stage module links resolve', () => {
    for (const s of telemetryStages) {
      if (s.moduleSlug) {
        expect(getModule(s.moduleSlug), s.id).toBeTruthy();
      }
    }
  });

  it('article internal links resolve', () => {
    for (const a of articles) {
      for (const l of a.relatedLinks) {
        if (l.to.startsWith('/learn/')) {
          expect(articleSlugs.has(l.to.replace('/learn/', '')), l.to).toBe(true);
        } else if (l.to.startsWith('/curriculum/')) {
          expect(moduleSlugs.has(l.to.replace('/curriculum/', '')), l.to).toBe(true);
        } else if (l.to.startsWith('/explore/components/')) {
          expect(componentSlugs.has(l.to.replace('/explore/components/', '')), l.to).toBe(true);
        }
      }
    }
  });

  it('glossary is non-empty and terms are unique', () => {
    expect(glossary.length).toBeGreaterThan(5);
    expect(new Set(glossary.map((g) => g.term)).size).toBe(glossary.length);
  });

  it('board map parts and connections resolve', () => {
    expect(new Set(boardParts.map((p) => p.id)).size).toBe(boardParts.length);
    const labSlugs = new Set(labs.map((l) => l.slug));
    for (const p of boardParts) {
      if (p.componentSlug) expect(componentSlugs.has(p.componentSlug), `${p.id} → ${p.componentSlug}`).toBe(true);
      if (p.labSlug) expect(labSlugs.has(p.labSlug), `${p.id} → ${p.labSlug}`).toBe(true);
      for (const slug of p.moduleSlugs) expect(moduleSlugs.has(slug), `${p.id} → ${slug}`).toBe(true);
    }
    for (const c of boardConnections) {
      expect(getBoardPart(c.from), `${c.id}.from`).toBeTruthy();
      expect(getBoardPart(c.to), `${c.id}.to`).toBeTruthy();
      expect(busInfo[c.bus], c.id).toBeTruthy();
    }
  });

  it('every component maps to its own board-map part', () => {
    for (const c of components) {
      expect(boardPartForComponent(c.slug)?.componentSlug, c.slug).toBe(c.slug);
    }
  });
});
