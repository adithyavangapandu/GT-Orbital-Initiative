import { ArrowRight, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { labs } from '../data/labs';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { StatusChip } from '../components/ui/StatusChip';

export function LabPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Engineering Lab' }]} />
      <header className="max-w-3xl">
        <p className="mono-label flex items-center gap-2 text-accent">
          <FlaskConical className="h-4 w-4" /> Engineering Lab
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Interactive engineering labs</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Visualizations that make the satellite&apos;s systems tangible before you touch hardware.
          One lab is live now; the rest are planned for a later phase.
        </p>
      </header>

      <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {labs.map((lab) => (
          <li key={lab.id}>
            <Link
              to={`/lab/${lab.slug}`}
              className="panel group flex h-full flex-col gap-4 p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label">{lab.number}</span>
                <StatusChip tone={lab.status === 'interactive' ? 'success' : 'muted'}>
                  {lab.status === 'interactive' ? 'Interactive' : 'Coming soon'}
                </StatusChip>
              </div>
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-accent">{lab.title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-slate-400">{lab.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Open lab <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
