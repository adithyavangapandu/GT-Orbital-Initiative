import { Link, useParams } from 'react-router-dom';
import { getComponent } from '../data/components';
import { getModule } from '../data/modules';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { LessonMarkdown } from '../components/lesson/LessonMarkdown';
import { Callout } from '../components/ui/Callout';
import { DiagramPlaceholder } from '../components/ui/DiagramPlaceholder';
import { StatusChip } from '../components/ui/StatusChip';
import { NotFoundPage } from './NotFoundPage';

/** Template for every component detail page — the nine spec sections in order. */
export function ComponentDetailPage() {
  const { componentSlug } = useParams();
  const component = componentSlug ? getComponent(componentSlug) : undefined;
  if (!component) return <NotFoundPage />;

  const sections: { title: string; body: string }[] = [
    { title: 'What is it?', body: component.whatIsIt },
    { title: 'Why is it necessary?', body: component.whyNecessary },
    { title: 'Why this component or design?', body: component.designRationale },
    { title: 'How does it work?', body: component.howItWorks },
    { title: 'How does it connect?', body: component.howItConnects },
    { title: 'What can go wrong?', body: component.whatCanGoWrong },
    { title: 'How do we test it?', body: component.howWeTest },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Build Your AmbaSat', to: '/curriculum' },
          { label: 'Component Explorer', to: '/explore/components' },
          { label: component.name },
        ]}
      />

      <header>
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip tone="accent">{component.category}</StatusChip>
          {component.preAssembled && <StatusChip tone="muted">Pre-soldered on MK-II</StatusChip>}
          <StatusChip tone={component.contentStatus === 'starter' ? 'warning' : 'success'}>
            {component.contentStatus === 'starter' ? 'Starter content' : component.contentStatus}
          </StatusChip>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{component.name}</h1>
        <p className="mt-3 text-lg text-slate-400">{component.tagline}</p>
      </header>

      <div className="mt-8">
        <DiagramPlaceholder label={`Annotated photo/diagram of the ${component.name}`} />
      </div>

      {component.notes && (
        <Callout kind="pending" className="mt-6" title="Additional research required">
          {component.notes}
        </Callout>
      )}

      <div className="mt-10 space-y-10">
        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`s-${i}`}>
            <h2 id={`s-${i}`} className="flex items-baseline gap-3 border-b border-slate-700/50 pb-2">
              <span className="font-mono text-sm text-accent">{i + 1}.</span>
              <span className="text-xl font-bold text-slate-100">{s.title}</span>
            </h2>
            <div className="mt-4">
              <LessonMarkdown>{s.body}</LessonMarkdown>
            </div>
          </section>
        ))}

        {/* 8. Where do we use it? */}
        <section aria-labelledby="s-where">
          <h2 id="s-where" className="flex items-baseline gap-3 border-b border-slate-700/50 pb-2">
            <span className="font-mono text-sm text-accent">8.</span>
            <span className="text-xl font-bold text-slate-100">Where do we use it?</span>
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {component.relatedModules.map((slug) => {
              const m = getModule(slug);
              return m ? (
                <li key={slug}>
                  <Link
                    to={`/curriculum/${slug}`}
                    className="panel flex items-center gap-3 p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="font-mono text-sm text-accent">{m.number}</span>
                    <span className="text-sm font-medium text-slate-200">{m.title}</span>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </section>

        {/* 9. References */}
        <section aria-labelledby="s-refs">
          <h2 id="s-refs" className="flex items-baseline gap-3 border-b border-slate-700/50 pb-2">
            <span className="font-mono text-sm text-accent">9.</span>
            <span className="text-xl font-bold text-slate-100">References</span>
          </h2>
          <ul className="mt-4 space-y-3">
            {component.manualReferences.map((r, i) => (
              <li key={i} className="panel p-4 text-sm">
                <p className="font-medium text-slate-200">
                  {r.sourceDocument}
                  {r.page ? `, p. ${r.page}` : ''}
                  {r.section ? ` — ${r.section}` : ''}
                </p>
                <p className="mt-1 text-slate-400">{r.description}</p>
                <StatusChip
                  tone={r.verificationStatus === 'verified' ? 'success' : 'warning'}
                  className="mt-2"
                >
                  {r.verificationStatus}
                </StatusChip>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
