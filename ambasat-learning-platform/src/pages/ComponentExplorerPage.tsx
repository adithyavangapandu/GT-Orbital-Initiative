import { Boxes } from 'lucide-react';
import { Link } from 'react-router-dom';
import { components } from '../data/components';
import { getModule } from '../data/modules';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { DiagramPlaceholder } from '../components/ui/DiagramPlaceholder';
import { StatusChip } from '../components/ui/StatusChip';
import type { ComponentCategory } from '../types';

const CATEGORY_LABEL: Record<ComponentCategory, string> = {
  compute: 'Compute',
  sensing: 'Sensing',
  communications: 'Communications',
  power: 'Power',
  structure: 'Structure',
  interface: 'Interface',
};

export function ComponentExplorerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Build Your AmbaSat', to: '/curriculum' }, { label: 'Component Explorer' }]} />
      <header className="max-w-3xl">
        <p className="mono-label flex items-center gap-2 text-accent">
          <Boxes className="h-4 w-4" /> Component Explorer
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Every part of the kit</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          The MK-II kit&apos;s hardware inventory — what each part does, why it was chosen, how it
          fails, and how to test it.
        </p>
      </header>

      <div className="mt-10">
        <DiagramPlaceholder
          label="Interactive AmbaSat-1 board diagram — click a region to open that component"
          compact
        />
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => (
          <li key={c.id}>
            <Link
              to={`/explore/components/${c.slug}`}
              className="panel group flex h-full flex-col gap-3 p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="mono-label">{CATEGORY_LABEL[c.category]}</span>
                {c.preAssembled && <StatusChip tone="accent">Pre-soldered</StatusChip>}
              </div>
              <h2 className="text-lg font-bold text-slate-100 group-hover:text-accent">{c.name}</h2>
              <p className="flex-1 text-sm leading-relaxed text-slate-400">{c.tagline}</p>
              <p className="border-t border-slate-700/50 pt-3 text-xs text-slate-500">
                Used in{' '}
                {c.relatedModules
                  .map((m) => getModule(m)?.number)
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
