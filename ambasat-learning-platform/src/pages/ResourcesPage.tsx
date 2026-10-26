import { useMemo, useState } from 'react';
import { ExternalLink, Library, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { glossary } from '../data/glossary';
import { resourceSections } from '../data/resources';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EmptyState } from '../components/ui/EmptyState';
import { StatusChip } from '../components/ui/StatusChip';

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!q) return resourceSections;
    return resourceSections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [q]);

  const filteredGlossary = q
    ? glossary.filter((g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
    : glossary;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Resources' }]} />
      <header className="max-w-3xl">
        <p className="mono-label flex items-center gap-2 text-accent">
          <Library className="h-4 w-4" /> Resources
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Resources & glossary</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          The manual, tools, references and support channels used across the course — plus the
          glossary of terms.
        </p>
      </header>

      <div className="relative mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources and glossary…"
          aria-label="Search resources and glossary"
          className="h-11 w-full rounded-full border border-slate-600/70 bg-space-850 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent"
        />
      </div>

      <div className="mt-10 space-y-10">
        {filteredSections.map((section) => (
          <section key={section.id} aria-labelledby={`res-${section.id}`}>
            <h2 id={`res-${section.id}`} className="border-b border-slate-700/50 pb-2 text-xl font-bold text-slate-100">
              {section.title}
            </h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {section.items.map((item) => {
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-slate-100 group-hover:text-accent">{item.title}</h3>
                      {item.url ? (
                        <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                      ) : item.pending ? (
                        <StatusChip tone="warning">Content pending</StatusChip>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </>
                );
                return (
                  <li key={item.title}>
                    {item.to ? (
                      <Link to={item.to} className="panel group block h-full p-4 transition-colors hover:border-accent/50">
                        {inner}
                      </Link>
                    ) : item.url ? (
                      <a href={item.url} target="_blank" rel="noreferrer" className="panel group block h-full p-4 transition-colors hover:border-accent/50">
                        {inner}
                      </a>
                    ) : (
                      <div className="panel h-full border-dashed p-4 opacity-80">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {/* Glossary */}
        <section aria-labelledby="res-glossary">
          <h2 id="res-glossary" className="border-b border-slate-700/50 pb-2 text-xl font-bold text-slate-100">
            Glossary
          </h2>
          {filteredGlossary.length === 0 && <div className="mt-4"><EmptyState title="No glossary terms match" hint="Try a shorter search." /></div>}
          <dl className="mt-4 grid gap-3 md:grid-cols-2">
            {filteredGlossary.map((g) => (
              <div key={g.term} className="panel p-4">
                <dt className="font-semibold text-slate-100">
                  {g.term}
                  {g.manualPage && (
                    <span className="ml-2 font-mono text-xs font-normal text-slate-500">manual p.{g.manualPage}</span>
                  )}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-400">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        {filteredSections.length === 0 && (
          <EmptyState title="No resources match your search" hint="Try a different term." />
        )}
      </div>
    </div>
  );
}
