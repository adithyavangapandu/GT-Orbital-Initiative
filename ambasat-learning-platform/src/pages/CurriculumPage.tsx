import { Rocket } from 'lucide-react';
import { modules } from '../data/modules';
import { getCheckpoint } from '../data/checkpoints';
import { useProgressState } from '../hooks/useProgress';
import { isModuleComplete } from '../lib/progress';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ModuleCard } from '../components/curriculum/ModuleCard';
import { ProgressBar } from '../components/ui/ProgressBar';

export function CurriculumPage() {
  const state = useProgressState();
  const completed = modules.filter((m) => {
    const mp = state.modules[m.id];
    const kc = getCheckpoint(m.checkpointIds.knowledge);
    const pc = getCheckpoint(m.checkpointIds.practical);
    const q = kc?.type === 'knowledge' ? kc.questions.map((x) => x.id) : [];
    const t = pc?.type === 'practical' ? pc.tasks.map((x) => x.id) : [];
    return isModuleComplete(mp, q, t);
  }).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Build Your AmbaSat' }]} />
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <p className="mono-label flex items-center gap-2 text-accent">
            <Rocket className="h-4 w-4" /> Build curriculum
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Build Your AmbaSat</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Ten modules that follow the real MK-II kit workflow in the AmbaSat-1 How To Guide:
            antenna first, then programming pins, firmware, sensor, radio — and finally live data
            on your own dashboard.
          </p>
        </div>
        <div className="panel w-full min-w-[260px] p-5 sm:w-auto">
          <p className="mono-label">Course progress</p>
          <ProgressBar className="mt-3" value={completed / modules.length} label="Modules completed" />
          <p className="mt-2 text-xs text-slate-500">
            {completed} of {modules.length} modules complete — saved in this browser
          </p>
        </div>
      </header>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => (
          <li key={m.id}>
            <ModuleCard module={m} />
          </li>
        ))}
      </ol>
    </div>
  );
}
