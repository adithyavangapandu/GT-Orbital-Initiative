import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export function LearnPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Learn' }]} />
      <header className="max-w-3xl">
        <p className="mono-label flex items-center gap-2 text-accent">
          <BookOpen className="h-4 w-4" /> Foundations
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Learn</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Satellite fundamentals before the soldering starts — the background that makes the
          build curriculum make sense. These are reading modules, separate from the hands-on
          curriculum.
        </p>
      </header>

      <ol className="mt-12 grid gap-4 md:grid-cols-2">
        {articles.map((a, i) => (
          <li key={a.slug}>
            <Link
              to={`/learn/${a.slug}`}
              className="panel group flex h-full flex-col gap-4 p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-slate-500">Topic {String(i + 1).padStart(2, '0')}</span>
                <ArrowRight className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-accent">{a.title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-slate-400">{a.summary}</p>
              <ul className="space-y-1 border-t border-slate-700/50 pt-4">
                {a.objectives.slice(0, 2).map((o) => (
                  <li key={o} className="text-xs text-slate-500">
                    · {o}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ol>

      <div className="panel mt-12 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-bold text-slate-100">Ready for hardware?</h2>
          <p className="mt-1 text-sm text-slate-400">
            The ten-module build curriculum walks the real AmbaSat-1 assembly sequence.
          </p>
        </div>
        <Link
          to="/curriculum"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-space-950 hover:bg-accent-soft"
        >
          Open the curriculum <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
