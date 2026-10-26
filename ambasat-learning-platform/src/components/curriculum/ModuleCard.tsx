import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModuleProgress } from '../../hooks/useProgress';
import { isModuleComplete } from '../../lib/progress';
import { getCheckpoint } from '../../data/checkpoints';
import type { Module } from '../../types';
import { StatusChip } from '../ui/StatusChip';

export function ModuleCard({ module }: { module: Module }) {
  const mp = useModuleProgress(module.id);

  const knowledge = getCheckpoint(module.checkpointIds.knowledge);
  const practical = getCheckpoint(module.checkpointIds.practical);
  const questionIds = knowledge?.type === 'knowledge' ? knowledge.questions.map((q) => q.id) : [];
  const taskIds = practical?.type === 'practical' ? practical.tasks.map((t) => t.id) : [];
  const done = isModuleComplete(mp, questionIds, taskIds);

  return (
    <Link
      to={`/curriculum/${module.slug}`}
      className="group panel relative flex flex-col gap-4 p-6 transition-colors hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-3xl font-bold text-slate-700 transition-colors group-hover:text-accent/60">
          {module.number}
        </span>
        {done ? (
          <StatusChip tone="success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Complete
          </StatusChip>
        ) : mp.lastVisited ? (
          <StatusChip tone="accent">In progress</StatusChip>
        ) : (
          <StatusChip>Not started</StatusChip>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent">{module.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{module.summary}</p>
      </div>
      <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {module.estimatedDuration || 'TBD'}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Open <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
