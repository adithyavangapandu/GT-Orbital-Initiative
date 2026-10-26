import { CheckSquare, Square } from 'lucide-react';
import { useModuleProgress, useProgressActions } from '../../hooks/useProgress';
import { cn } from '../../lib/utils';
import type { Checkpoint } from '../../types';
import { Callout } from '../ui/Callout';
import { ProgressBar } from '../ui/ProgressBar';
import { StatusChip } from '../ui/StatusChip';

type PracticalCheckpointType = Extract<Checkpoint, { type: 'practical' }>;

/**
 * Self-reported checklist persisted in localStorage. Mentor verification is
 * intentionally not implemented in Phase 1 — flagged clearly to the student.
 */
export function PracticalCheckpoint({ checkpoint }: { checkpoint: PracticalCheckpointType }) {
  const mp = useModuleProgress(checkpoint.moduleId);
  const actions = useProgressActions();
  const done = checkpoint.tasks.filter((t) => mp.completedTaskIds.includes(t.id)).length;
  const total = checkpoint.tasks.length;
  const complete = done === total && total > 0;

  return (
    <section aria-labelledby={`${checkpoint.id}-heading`} className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={`${checkpoint.id}-heading`} className="text-xl font-bold text-slate-100">
          {checkpoint.title}
        </h3>
        <StatusChip tone="gold">Practical checkpoint</StatusChip>
        {complete && <StatusChip tone="success">All tasks done</StatusChip>}
      </div>

      <Callout kind="info" title="Self-reported">
        Check off tasks only when you can actually demonstrate them. Mentor verification is{' '}
        <strong>not yet implemented</strong> — a later phase will add sign-off.
      </Callout>

      <ProgressBar value={total ? done / total : 0} label="Practical tasks completed" />
      <p className="font-mono text-xs text-slate-500">
        {done} of {total} tasks completed
      </p>

      <ul className="space-y-2">
        {checkpoint.tasks.map((task) => {
          const checked = mp.completedTaskIds.includes(task.id);
          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => actions.toggleTask(checkpoint.moduleId, task.id)}
                aria-pressed={checked}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                  checked
                    ? 'border-emerald-400/40 bg-emerald-400/5 text-slate-200'
                    : 'border-slate-700/60 bg-space-900 text-slate-300 hover:border-accent/40',
                )}
              >
                {checked ? (
                  <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Square className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                )}
                <span className={checked ? 'line-through decoration-emerald-400/50' : undefined}>
                  {task.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
