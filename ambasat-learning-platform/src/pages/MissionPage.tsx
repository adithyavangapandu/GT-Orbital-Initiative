import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Circle, Flag, RotateCcw, Satellite } from 'lucide-react';
import { getCheckpoint } from '../data/checkpoints';
import { milestones } from '../data/milestones';
import { getModuleById, modules } from '../data/modules';
import { useProgressActions, useProgressState } from '../hooks/useProgress';
import { isKnowledgeComplete, isModuleComplete, isPracticalComplete } from '../lib/progress';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatusChip } from '../components/ui/StatusChip';
import { cn } from '../lib/utils';

export function MissionPage() {
  const state = useProgressState();
  const actions = useProgressActions();
  const [confirmReset, setConfirmReset] = useState(false);

  // ----- Derived progress -----
  const moduleStatus = modules.map((m) => {
    const mp = state.modules[m.id];
    const kc = getCheckpoint(m.checkpointIds.knowledge);
    const pc = getCheckpoint(m.checkpointIds.practical);
    const qIds = kc?.type === 'knowledge' ? kc.questions.map((q) => q.id) : [];
    const tIds = pc?.type === 'practical' ? pc.tasks.map((t) => t.id) : [];
    return {
      module: m,
      mp,
      kDone: isKnowledgeComplete(mp, qIds),
      pDone: isPracticalComplete(mp, tIds),
      done: isModuleComplete(mp, qIds, tIds),
    };
  });

  const completedCount = moduleStatus.filter((s) => s.done).length;
  const knowledgeCount = moduleStatus.filter((s) => s.kDone).length;
  const practicalCount = moduleStatus.filter((s) => s.pDone).length;
  const visited = moduleStatus.filter((s) => s.mp?.lastVisited);

  const currentModule =
    moduleStatus.find((s) => s.mp?.lastVisited && !s.done) ??
    [...visited].sort((a, b) => (b.mp!.lastVisited! > a.mp!.lastVisited! ? 1 : -1))[0];
  const nextRecommended = moduleStatus.find((s) => !s.done);
  const resumeTarget = currentModule?.module ?? nextRecommended?.module ?? modules[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'My Mission' }]} />
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mono-label flex items-center gap-2 text-accent">
            <Satellite className="h-4 w-4" /> Personal dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">My Mission</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Your progress is stored locally in this browser — no account needed yet.
          </p>
        </div>
        <Link
          to={`/curriculum/${resumeTarget.slug}`}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-space-950 hover:bg-accent-soft"
        >
          {completedCount > 0 || visited.length > 0 ? 'Resume Learning' : 'Start Module 00'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {completedCount === 0 && visited.length === 0 && (
        <Callout kind="info" className="mt-6" title="Fresh mission">
          No progress recorded yet — your dashboard starts at zero and fills in as you complete
          knowledge checkpoints and practical checklists in each module.
        </Callout>
      )}

      {/* Stats */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Progress summary">
        <StatCard label="Curriculum complete" value={`${Math.round((completedCount / modules.length) * 100)}%`}>
          <ProgressBar className="mt-3" value={completedCount / modules.length} label="Curriculum completion" />
        </StatCard>
        <StatCard label="Modules completed" value={`${completedCount} / ${modules.length}`} />
        <StatCard label="Knowledge checkpoints" value={`${knowledgeCount} / ${modules.length}`} />
        <StatCard label="Practical checklists" value={`${practicalCount} / ${modules.length}`} />
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2" aria-label="Position">
        <div className="panel p-5">
          <p className="mono-label">Current module</p>
          <p className="mt-2 font-semibold text-slate-100">
            {currentModule ? `${currentModule.module.number} · ${currentModule.module.title}` : 'Not started — Module 00 awaits'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="mono-label">Next recommended</p>
          <p className="mt-2 font-semibold text-slate-100">
            {nextRecommended ? `${nextRecommended.module.number} · ${nextRecommended.module.title}` : 'All modules complete — nice work!'}
          </p>
        </div>
      </section>

      {/* Milestone timeline */}
      <section className="mt-10" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="flex items-center gap-2 text-xl font-bold text-slate-100">
          <Flag className="h-5 w-5 text-accent" /> Mission milestones
        </h2>
        <ol className="relative mt-6 space-y-0 border-l border-slate-700/70 pl-8">
          {milestones.map((ms) => {
            const st = moduleStatus.find((s) => s.module.id === ms.moduleId);
            const done = st?.done ?? false;
            const started = !!st?.mp?.lastVisited;
            const m = getModuleById(ms.moduleId)!;
            return (
              <li key={ms.id} className="relative pb-8 last:pb-0">
                <span
                  className={cn(
                    'absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2',
                    done
                      ? 'border-emerald-400 bg-emerald-400/20'
                      : started
                        ? 'border-accent bg-accent/20'
                        : 'border-slate-600 bg-space-900',
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-3">
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-label="Reached" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-600" aria-hidden="true" />
                  )}
                  <span className={cn('font-medium', done ? 'text-slate-100' : 'text-slate-400')}>
                    {ms.label}
                  </span>
                  <Link to={`/curriculum/${m.slug}`} className="font-mono text-xs text-slate-500 hover:text-accent">
                    module {m.number}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Per-module detail */}
      <section className="mt-10" aria-labelledby="module-progress-heading">
        <h2 id="module-progress-heading" className="text-xl font-bold text-slate-100">
          Module by module
        </h2>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-700/50">
          <table className="w-full text-left text-sm">
            <thead className="bg-space-800 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Module</th>
                <th className="px-4 py-3 font-medium">Knowledge</th>
                <th className="px-4 py-3 font-medium">Practical</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 bg-space-900">
              {moduleStatus.map((s) => (
                <tr key={s.module.id}>
                  <td className="px-4 py-3">
                    <Link to={`/curriculum/${s.module.slug}`} className="font-medium text-slate-200 hover:text-accent">
                      {s.module.number} · {s.module.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{s.kDone ? '✓' : '—'}</td>
                  <td className="px-4 py-3">{s.pDone ? '✓' : '—'}</td>
                  <td className="px-4 py-3">
                    {s.done ? (
                      <StatusChip tone="success">Complete</StatusChip>
                    ) : s.mp?.lastVisited ? (
                      <StatusChip tone="accent">In progress</StatusChip>
                    ) : (
                      <StatusChip>Not started</StatusChip>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reset */}
      <section className="mt-10 border-t border-slate-700/50 pt-8">
        <h2 className="text-sm font-semibold text-slate-200">Danger zone</h2>
        <p className="mt-1 text-sm text-slate-500">
          Progress is real local data (localStorage) — nothing here is demo data. Resetting clears it permanently.
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-400/40 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-400/10"
          >
            <RotateCcw className="h-4 w-4" /> Reset my progress
          </button>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-red-400/40 bg-red-400/5 p-4">
            <p className="text-sm text-red-200">Really erase all local progress? This cannot be undone.</p>
            <button
              type="button"
              onClick={() => {
                actions.reset();
                setConfirmReset(false);
              }}
              className="rounded-lg bg-red-500/80 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Yes, reset everything
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:border-slate-400"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="panel p-5">
      <p className="mono-label">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100">{value}</p>
      {children}
    </div>
  );
}
