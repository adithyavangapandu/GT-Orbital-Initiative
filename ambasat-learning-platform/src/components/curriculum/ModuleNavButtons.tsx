import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { nextModule, prevModule } from '../../data/modules';
import type { Module } from '../../types';

export function ModuleNavButtons({ module }: { module: Module }) {
  const prev = prevModule(module.slug);
  const next = nextModule(module.slug);
  return (
    <nav className="mt-10 grid gap-4 border-t border-slate-700/50 pt-8 sm:grid-cols-2" aria-label="Module navigation">
      {prev ? (
        <Link
          to={`/curriculum/${prev.slug}`}
          className="panel group flex items-center gap-3 p-4 transition-colors hover:border-accent/50"
        >
          <ArrowLeft className="h-5 w-5 text-slate-500 group-hover:text-accent" aria-hidden="true" />
          <div>
            <p className="mono-label">Previous</p>
            <p className="font-semibold text-slate-200">
              {prev.number} · {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/curriculum/${next.slug}`}
          className="panel group flex items-center justify-end gap-3 p-4 text-right transition-colors hover:border-accent/50"
        >
          <div>
            <p className="mono-label">Next module</p>
            <p className="font-semibold text-slate-200">
              {next.number} · {next.title}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-accent" aria-hidden="true" />
        </Link>
      ) : (
        <Link
          to="/mission"
          className="panel group flex items-center justify-end gap-3 p-4 text-right transition-colors hover:border-accent/50"
        >
          <div>
            <p className="mono-label">You made it</p>
            <p className="font-semibold text-slate-200">Review your mission dashboard</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-accent" aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
