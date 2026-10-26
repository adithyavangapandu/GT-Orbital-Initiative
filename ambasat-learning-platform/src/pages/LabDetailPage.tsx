import { Link, useParams } from 'react-router-dom';
import { getLab } from '../data/labs';
import { getModule } from '../data/modules';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';
import { ComingSoon } from '../components/ui/ComingSoon';
import { StatusChip } from '../components/ui/StatusChip';
import { TelemetryPipeline } from '../components/visualizations/TelemetryPipeline';
import { NotFoundPage } from './NotFoundPage';

/** Shared lab template; Telemetry Journey carries the working visualization. */
export function LabDetailPage() {
  const { labSlug } = useParams();
  const lab = labSlug ? getLab(labSlug) : undefined;
  if (!lab) return <NotFoundPage />;

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Engineering Lab', to: '/lab' }, { label: lab.title }]} />

      <header>
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip tone="accent">{lab.number}</StatusChip>
          <StatusChip tone={lab.status === 'interactive' ? 'success' : 'muted'}>
            {lab.status === 'interactive' ? 'Interactive now' : 'Coming in a future phase'}
          </StatusChip>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{lab.title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-400">{lab.description}</p>
      </header>

      <section className="mt-10">
        {lab.slug === 'telemetry-journey' ? (
          <TelemetryPipeline />
        ) : (
          <ComingSoon
            title={`${lab.title} is planned for a later phase`}
            description={lab.plannedInteractivity}
          />
        )}
      </section>

      {lab.status !== 'interactive' && (
        <Callout kind="info" className="mt-8" title="Planned experience">
          {lab.plannedInteractivity}
        </Callout>
      )}

      {lab.associatedModules.length > 0 && (
        <section className="mt-10" aria-label="Related modules">
          <h2 className="mono-label">Related curriculum modules</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {lab.associatedModules.map((slug) => {
              const m = getModule(slug);
              return m ? (
                <li key={slug}>
                  <Link
                    to={`/curriculum/${slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 px-3 py-1.5 text-xs text-slate-300 hover:border-accent/50 hover:text-accent"
                  >
                    <span className="font-mono text-accent">{m.number}</span> {m.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      )}
    </article>
  );
}
