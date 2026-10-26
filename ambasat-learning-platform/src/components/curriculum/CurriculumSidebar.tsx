import { CheckCircle2, Circle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getCheckpoint } from '../../data/checkpoints';
import { modules } from '../../data/modules';
import { useProgressState } from '../../hooks/useProgress';
import { isModuleComplete } from '../../lib/progress';
import { cn } from '../../lib/utils';

/** Left rail listing all modules with per-module completion state. */
export function CurriculumSidebar() {
  const state = useProgressState();
  return (
    <aside className="hidden w-72 shrink-0 lg:block" aria-label="Curriculum modules">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-slate-700/50 bg-space-900 p-3">
        <p className="mono-label px-2 py-2">Curriculum</p>
        <ol className="mt-1 space-y-0.5">
          {modules.map((m) => {
            const mp = state.modules[m.id];
            const kc = getCheckpoint(m.checkpointIds.knowledge);
            const pc = getCheckpoint(m.checkpointIds.practical);
            const qIds = kc?.type === 'knowledge' ? kc.questions.map((q) => q.id) : [];
            const tIds = pc?.type === 'practical' ? pc.tasks.map((t) => t.id) : [];
            const done = isModuleComplete(mp, qIds, tIds);
            return (
              <li key={m.id}>
                <NavLink
                  to={`/curriculum/${m.slug}`}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                      isActive ? 'bg-accent/10 text-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200',
                    )
                  }
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-label="Completed" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                  )}
                  <span className="font-mono text-xs text-slate-500">{m.number}</span>
                  <span className="truncate">{m.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
