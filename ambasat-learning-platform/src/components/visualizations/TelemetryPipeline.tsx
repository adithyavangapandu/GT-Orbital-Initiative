import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Boxes,
  Cpu,
  FileCode2,
  Hammer,
  LayoutDashboard,
  Network,
  Radio,
  Satellite,
  SatelliteDish,
  Send,
  Thermometer,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { telemetryModes, telemetryStages } from '../../data/telemetry';
import { getModule } from '../../data/modules';
import { cn } from '../../lib/utils';
import { StatusChip } from '../ui/StatusChip';

const STAGE_ICONS: Record<string, typeof Cpu> = {
  'source-code': FileCode2,
  compile: Hammer,
  upload: Upload,
  execute: Cpu,
  request: Send,
  sense: Thermometer,
  package: Boxes,
  transmit: Radio,
  gateway: SatelliteDish,
  route: Network,
  dashboard: LayoutDashboard,
};

type ModeId = (typeof telemetryModes)[number]['id'];

/**
 * Telemetry Journey — the phase-1 interactive visualization.
 * Clickable pipeline stages over two phases: firmware deploy (wired upload)
 * and runtime telemetry (sensor → dashboard). A mode toggle distinguishes
 * ground testing (battery) from on-orbit (solar) operation.
 */
export function TelemetryPipeline() {
  const [selectedId, setSelectedId] = useState(telemetryStages[3].id);
  const [mode, setMode] = useState<ModeId>('ground');

  const selected = useMemo(
    () => telemetryStages.find((s) => s.id === selectedId) ?? telemetryStages[0],
    [selectedId],
  );
  const selectedModule = selected.moduleSlug ? getModule(selected.moduleSlug) : undefined;
  const activeMode = telemetryModes.find((m) => m.id === mode)!;

  const deployStages = telemetryStages.filter((s) => s.phase === 'deploy');
  const runtimeStages = telemetryStages.filter((s) => s.phase === 'runtime');

  return (
    <div className="space-y-6">
      {/* Mode toggle: ground vs on-orbit architecture */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Operating mode">
        {telemetryModes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            className={cn(
              'rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
              mode === m.id
                ? 'border-accent/60 bg-accent/15 text-accent'
                : 'border-slate-600/60 text-slate-400 hover:border-accent/40 hover:text-slate-200',
            )}
          >
            {m.label}
          </button>
        ))}
        <span className="ml-auto">
          <StatusChip tone="warning">Simulated data</StatusChip>
        </span>
      </div>

      <p className="rounded-lg border border-slate-700/50 bg-space-900 p-3 text-sm text-slate-300">
        <span className="font-semibold text-accent-soft">Power: </span>
        {activeMode.power}
        <span className="mx-2 text-slate-600">·</span>
        <span className="font-semibold text-accent-soft">Radio path: </span>
        {activeMode.radio}
      </p>

      <PipelineRow title="Phase 1 — Code deployment (wired)" stages={deployStages} selectedId={selectedId} onSelect={setSelectedId} />
      <PipelineRow title="Phase 2 — Sensor → dashboard (wireless)" stages={runtimeStages} selectedId={selectedId} onSelect={setSelectedId} />

      {/* Detail panel */}
      <div className="panel border-accent/30 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <StageGlyph id={selected.id} active />
          <h3 className="text-lg font-bold text-slate-100">{selected.title}</h3>
          <StatusChip tone={selected.phase === 'deploy' ? 'muted' : 'accent'}>
            {selected.phase === 'deploy' ? 'Deploy phase' : 'Runtime phase'}
          </StatusChip>
          {selected.manualReference && (
            <span className="ml-auto font-mono text-xs text-slate-500">{selected.manualReference}</span>
          )}
        </div>
        <p className="mt-3 leading-relaxed text-slate-300">{selected.detail}</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <Fact label="Input" value={selected.inputs} />
          <Fact label="Output" value={selected.outputs} />
          <Fact label="Hardware" value={selected.hardware} />
          <Fact label="Software" value={selected.software} />
        </dl>
        {selectedModule && (
          <p className="mt-5 border-t border-slate-700/50 pt-4 text-sm">
            Covered in:{' '}
            <Link
              to={`/curriculum/${selectedModule.slug}`}
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              Module {selectedModule.number} — {selectedModule.title}
            </Link>
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-slate-500">{activeMode.note}</p>
    </div>
  );
}

function PipelineRow({
  title,
  stages,
  selectedId,
  onSelect,
}: {
  title: string;
  stages: typeof telemetryStages;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section aria-label={title}>
      <h4 className="mono-label mb-3">{title}</h4>
      <ol className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {stages.map((stage, i) => {
          const active = stage.id === selectedId;
          return (
            <li key={stage.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(stage.id)}
                aria-pressed={active}
                className={cn(
                  'flex h-full w-full flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors',
                  active
                    ? 'border-accent bg-accent/10 shadow-[0_0_24px_rgba(56,189,248,0.12)]'
                    : 'border-slate-700/60 bg-space-850 hover:border-accent/40',
                )}
              >
                <StageGlyph id={stage.id} active={active} />
                <span className={cn('text-sm font-semibold leading-snug', active ? 'text-accent-soft' : 'text-slate-200')}>
                  {stage.title}
                </span>
                <StatusChip tone={stage.domain === 'both' ? 'accent' : stage.domain}>
                  {stage.domain === 'both' ? 'HW + SW' : stage.domain}
                </StatusChip>
                <span className="text-xs leading-snug text-slate-500">{stage.summary}</span>
                <span className="mt-auto font-mono text-[10px] text-slate-600">
                  stage {telemetryStages.indexOf(stage) + 1}
                </span>
              </button>
              {i < stages.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-slate-600 xl:block"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function StageGlyph({ id, active }: { id: string; active: boolean }) {
  const Icon = STAGE_ICONS[id] ?? Satellite;
  return (
    <span
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border',
        active ? 'border-accent/60 bg-accent/15 text-accent' : 'border-slate-600/60 bg-space-800 text-slate-400',
      )}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </span>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-space-900 p-3">
      <dt className="mono-label">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{value}</dd>
    </div>
  );
}
