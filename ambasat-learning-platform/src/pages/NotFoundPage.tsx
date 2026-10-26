import { Link } from 'react-router-dom';
import { Satellite } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <Satellite className="h-12 w-12 text-accent/60" aria-hidden="true" />
      <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-accent">404 · Signal lost</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">This page drifted out of range</h1>
      <p className="mt-4 text-slate-400">
        The route you followed doesn&apos;t match any module, lab or page on the platform.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-space-950 hover:bg-accent-soft"
        >
          Back to base
        </Link>
        <Link
          to="/curriculum"
          className="inline-flex h-11 items-center rounded-full border border-slate-600 px-6 text-sm font-semibold text-slate-200 hover:border-accent hover:text-accent"
        >
          Open the curriculum
        </Link>
      </div>
    </div>
  );
}
