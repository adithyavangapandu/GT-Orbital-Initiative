import { ArrowRight, Target } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { articles, getArticle } from '../data/articles';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { LessonSection } from '../components/lesson/LessonSection';
import { Callout } from '../components/ui/Callout';
import { DiagramPlaceholder } from '../components/ui/DiagramPlaceholder';
import { NotFoundPage } from './NotFoundPage';

/** Shared template for the four "Learn" background articles. */
export function ArticlePage() {
  const { articleSlug } = useParams();
  const article = articleSlug ? getArticle(articleSlug) : undefined;
  if (!article) return <NotFoundPage />;

  const idx = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[idx + 1];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Learn', to: '/learn' }, { label: article.title }]} />

      <header>
        <p className="mono-label text-accent">Learn · Topic {String(idx + 1).padStart(2, '0')}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{article.summary}</p>
      </header>

      {/* Learning objectives */}
      <section className="panel mt-8 p-6" aria-labelledby="objectives-heading">
        <h2 id="objectives-heading" className="flex items-center gap-2 font-semibold text-slate-100">
          <Target className="h-4 w-4 text-accent" aria-hidden="true" /> Learning objectives
        </h2>
        <ul className="mt-3 space-y-2">
          {article.objectives.map((o) => (
            <li key={o} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {o}
            </li>
          ))}
        </ul>
      </section>

      {/* Illustration */}
      <div className="mt-8">
        <DiagramPlaceholder label={article.illustrationPlaceholder} />
      </div>

      {/* Content sections */}
      <div className="mt-10 space-y-10">
        {article.sections.map((s) => (
          <LessonSection key={s.heading} block={s} />
        ))}
      </div>

      {/* Why this matters */}
      <Callout kind="engineering" title="Why does this matter?" className="mt-10">
        {article.whyItMatters}
      </Callout>

      {/* Related + next */}
      <footer className="mt-10 border-t border-slate-700/50 pt-6">
        <h2 className="mono-label">Related</h2>
        <ul className="mt-3 space-y-2">
          {article.relatedLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-sm font-medium text-accent hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        {next && (
          <Link
            to={`/learn/${next.slug}`}
            className="panel group mt-6 flex items-center justify-between p-5 transition-colors hover:border-accent/50"
          >
            <div>
              <p className="mono-label">Next topic</p>
              <p className="mt-1 font-semibold text-slate-100">{next.title}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-accent" />
          </Link>
        )}
      </footer>
    </article>
  );
}
