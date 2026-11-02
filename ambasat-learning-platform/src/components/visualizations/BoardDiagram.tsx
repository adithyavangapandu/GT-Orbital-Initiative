import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { ArrowRight, Boxes, FlaskConical } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BOARD,
  boardConnections,
  busInfo,
  connectionsFor,
  getBoardPart,
  programmingPins,
  sourceLabel,
  topHeaderPins,
} from '../../data/board';
import { getComponent } from '../../data/components';
import { getLab } from '../../data/labs';
import { getModule } from '../../data/modules';
import { cn } from '../../lib/utils';
import type { BoardBus, BoardPart } from '../../types';
import { StatusChip } from '../ui/StatusChip';

const DEFAULT_PART = 'mcu';
const ALL_BUSES = Object.keys(busInfo) as BoardBus[];

const INSTALL_LABEL: Record<BoardPart['install'], string> = {
  'pre-soldered': 'Pre-soldered on MK-II',
  'student-installed': 'You install this',
  external: 'External equipment',
};

/**
 * Interactive 2D rendering of the AmbaSat-1 board and the equipment wired to it.
 * Selecting a part highlights its connections and opens a detail panel with
 * links into the Component Explorer, curriculum modules and labs.
 * The selected part is mirrored in `?part=` so views can be linked to directly.
 */
export function BoardDiagram() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('part');
  const selectedId = requested && getBoardPart(requested) ? requested : DEFAULT_PART;
  const selected = getBoardPart(selectedId)!;

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [hiddenBuses, setHiddenBuses] = useState<Set<BoardBus>>(new Set());

  const activeId = hoverId ?? focusId ?? selectedId;
  const activeConnections = new Set(connectionsFor(activeId).map((c) => c.id));
  const linkedParts = new Set(
    connectionsFor(activeId).flatMap((c) => [c.from, c.to]),
  );

  const select = (id: string) => {
    const next = new URLSearchParams(params);
    next.set('part', id);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const toggleBus = (bus: BoardBus) =>
    setHiddenBuses((prev) => {
      const next = new Set(prev);
      if (next.has(bus)) next.delete(bus);
      else next.add(bus);
      return next;
    });

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(id);
    }
  };

  const partProps = (p: BoardPart) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `${p.label} (${p.partName})`,
    'aria-pressed': p.id === selectedId,
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
      select(p.id);
    },
    onKeyDown: (e: KeyboardEvent) => onKey(e, p.id),
    onMouseEnter: () => setHoverId(p.id),
    onMouseLeave: () => setHoverId(null),
    onFocus: () => setFocusId(p.id),
    onBlur: () => setFocusId(null),
    className: 'cursor-pointer outline-none',
    'data-part': p.id,
  });

  const emphasis = (id: string) =>
    id === activeId ? 'active' : linkedParts.has(id) ? 'linked' : 'idle';

  const usedBuses = ALL_BUSES.filter((b) => boardConnections.some((c) => c.bus === b));

  return (
    <div className="space-y-6">
      {/* Bus legend / layer toggles */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Connection layers">
        <span className="mono-label mr-1">Layers</span>
        {usedBuses.map((bus) => {
          const on = !hiddenBuses.has(bus);
          return (
            <button
              key={bus}
              type="button"
              aria-pressed={on}
              onClick={() => toggleBus(bus)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors',
                on ? 'border-slate-500 text-slate-200' : 'border-slate-700 text-slate-500 line-through',
              )}
            >
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-4 rounded"
                style={{ backgroundColor: busInfo[bus].color, opacity: on ? 1 : 0.3 }}
              />
              {busInfo[bus].label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <figure className="diagram-frame min-w-0 self-start p-2 sm:p-4">
          <svg
            viewBox="0 0 1000 620"
            className="h-auto w-full select-none"
            role="group"
            aria-label="2D map of the AmbaSat-1 board. Each part is a button; selecting one highlights its connections."
          >
            <defs>
              <filter id="board-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="board-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="#1e293b" strokeWidth="0.6" />
              </pattern>
            </defs>

            <rect width="1000" height="620" fill="url(#board-grid)" opacity="0.6" />

            {/* ---------- PCB ---------- */}
            <g {...partProps(getBoardPart('pcb')!)}>
              <rect
                x={BOARD.x}
                y={BOARD.y}
                width={BOARD.size}
                height={BOARD.size}
                rx="6"
                fill="#8f1d22"
                stroke={emphasis('pcb') === 'active' ? '#38bdf8' : '#c2353b'}
                strokeWidth={emphasis('pcb') === 'active' ? 3 : 2}
              />
              {/* Decorative vias */}
              {[
                [352, 205], [345, 250], [372, 275], [420, 210], [500, 275], [560, 285], [612, 285],
                [600, 255], [365, 320], [395, 340], [500, 370], [430, 420], [478, 440], [350, 420],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#d6a74a" stroke="#3b0a0c" strokeWidth="1.4" />
              ))}
              {/* Passive components */}
              {[
                [330, 246, 'C3'], [330, 292, 'C1'], [372, 292, 'R2'], [402, 292, 'C5'], [458, 292, 'R1'],
                [330, 330, 'C4'], [372, 400, 'C9'], [398, 400, 'C6'], [424, 400, 'C8'],
              ].map(([x, y, t]) => (
                <g key={t as string}>
                  <rect x={x as number} y={(y as number) + 4} width="14" height="20" rx="1.5" fill="#3f3f46" />
                  <text x={(x as number) + 7} y={y as number} textAnchor="middle" className="fill-rose-50/80 font-mono" fontSize="8">
                    {t}
                  </text>
                </g>
              ))}
              <text x="590" y="236" textAnchor="middle" className="fill-rose-50 font-mono" fontSize="26" fontWeight="700">
                AmbaSat-1
              </text>
              <text x="590" y="268" textAnchor="middle" className="fill-rose-50 font-mono" fontSize="22" fontWeight="700">
                Satellite
              </text>
              <circle cx="660" cy="262" r="9" fill="#04070d" />
              <text x="586" y="440" textAnchor="middle" className="fill-rose-50/90 font-mono" fontSize="10">
                1.01-NSA-2019
              </text>
              <text x="490" y="478" className="fill-rose-50/70 font-mono" fontSize="8" transform="rotate(-90 490 478)">
                FTDI
              </text>
              <text x="600" y="484" textAnchor="middle" className="fill-rose-50/70 font-mono" fontSize="8">
                RFM95W
              </text>
              <text x="664" y="483" textAnchor="middle" className="fill-rose-50/90 font-mono" fontSize="9" fontWeight="700">
                A
              </text>
            </g>

            {/* ---------- Connections ---------- */}
            <g aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
              {boardConnections
                .filter((c) => !hiddenBuses.has(c.bus))
                .map((c) => {
                  const on = activeConnections.has(c.id);
                  const info = busInfo[c.bus];
                  return (
                    <path
                      key={c.id}
                      d={c.path}
                      stroke={info.color}
                      strokeWidth={on ? 3.5 : 2}
                      strokeDasharray={info.dashed || c.id === 'antenna-gateway' ? '6 5' : undefined}
                      opacity={on ? 1 : 0.28}
                      filter={on ? 'url(#board-glow)' : undefined}
                      className="transition-opacity duration-200 motion-reduce:transition-none"
                    />
                  );
                })}
            </g>

            {/* ---------- Header pins ---------- */}
            <g {...partProps(getBoardPart('sensor-header')!)}>
              <rect x="480" y="134" width="196" height="46" fill="transparent" />
              {topHeaderPins.map((pin) => (
                <g key={pin.x}>
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="8"
                    fill="#cbd5e1"
                    stroke={emphasis('sensor-header') === 'active' ? '#38bdf8' : '#64748b'}
                    strokeWidth="2"
                  />
                  <circle cx={pin.x} cy={pin.y} r="3" fill="#0f172a" />
                  <text x={pin.x} y={pin.y + 24} textAnchor="middle" className="fill-rose-50 font-mono" fontSize="7.5">
                    {pin.label || '·'}
                  </text>
                </g>
              ))}
            </g>

            <g {...partProps(getBoardPart('prog-header')!)}>
              <rect x="332" y="440" width="154" height="46" fill="transparent" />
              {programmingPins.map((pin) => (
                <g key={pin.x}>
                  <text x={pin.x} y={pin.y - 16} textAnchor="middle" className="fill-rose-50 font-mono" fontSize="7.5">
                    {pin.label}
                  </text>
                  <rect
                    x={pin.x - 8}
                    y={pin.y - 12}
                    width="16"
                    height="24"
                    rx="8"
                    fill="#cbd5e1"
                    stroke={emphasis('prog-header') === 'active' ? '#38bdf8' : '#64748b'}
                    strokeWidth="2"
                  />
                  <circle cx={pin.x} cy={pin.y} r="3.2" fill="#0f172a" />
                </g>
              ))}
            </g>

            {/* ---------- On-board chips ---------- */}
            <Chip part={getBoardPart('mcu')!} props={partProps} state={emphasis('mcu')} pins={8} label={['ATMEGA', '328P']} />
            <Chip part={getBoardPart('imu')!} props={partProps} state={emphasis('imu')} pins={4} label={['IMU']} />
            <Chip part={getBoardPart('crystal')!} props={partProps} state={emphasis('crystal')} pins={0} label={['XTAL']} metal />
            <Chip part={getBoardPart('ldo')!} props={partProps} state={emphasis('ldo')} pins={2} label={['VREG']} />

            <g {...partProps(getBoardPart('led')!)}>
              <rect x="426" y="292" width="22" height="30" fill="transparent" />
              <rect x="430" y="296" width="14" height="22" rx="2" fill="#1f2937" stroke={ring(emphasis('led'))} strokeWidth="1.6" />
              <circle cx="437" cy="307" r="4" fill="#4ade80" filter={emphasis('led') === 'active' ? 'url(#board-glow)' : undefined} />
              <text x="437" y="289" textAnchor="middle" className="fill-rose-50/80 font-mono" fontSize="8">
                D1
              </text>
            </g>

            <g {...partProps(getBoardPart('radio')!)}>
              <rect x="510" y="325" width="153" height="143" fill="transparent" />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i}>
                  <rect x="510" y={333 + i * 16} width="10" height="9" fill="#d6a74a" />
                  <rect x="653" y={333 + i * 16} width="10" height="9" fill="#d6a74a" />
                </g>
              ))}
              <rect x="518" y="330" width="137" height="133" rx="3" fill="#14532d" stroke={ring(emphasis('radio'))} strokeWidth="2" />
              <rect x="560" y="368" width="52" height="52" rx="2" fill="#0b0f17" />
              <rect x="622" y="340" width="22" height="14" rx="2" fill="#cbd5e1" />
              <text x="586" y="398" textAnchor="middle" className="fill-slate-300 font-mono" fontSize="9">
                RF95
              </text>
              <text x="664" y="392" textAnchor="middle" className="fill-rose-50 font-mono" fontSize="10">+</text>
              <text x="664" y="455" textAnchor="middle" className="fill-rose-50 font-mono" fontSize="10">−</text>
            </g>

            {/* Antenna pad + wire */}
            <g {...partProps(getBoardPart('antenna')!)}>
              <rect x="652" y="459" width="260" height="24" fill="transparent" />
              <rect x="656" y="465" width="16" height="12" rx="2" fill="#d6a74a" stroke={ring(emphasis('antenna'))} strokeWidth="1.6" />
              <path d="M672 471 H770 l6 -8 l8 16 l6 -8 H905" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
              <text x="840" y="495" textAnchor="middle" className="fill-slate-400 font-mono" fontSize="10">
                wire antenna (not to scale)
              </text>
            </g>

            {/* ---------- Off-board equipment ---------- */}
            <OffBoard part={getBoardPart('sensor')!} props={partProps} state={emphasis('sensor')} />
            <OffBoard part={getBoardPart('programmer')!} props={partProps} state={emphasis('programmer')} />
            <OffBoard part={getBoardPart('battery')!} props={partProps} state={emphasis('battery')} />
            <OffBoard part={getBoardPart('solar')!} props={partProps} state={emphasis('solar')} />
            <OffBoard part={getBoardPart('gateway')!} props={partProps} state={emphasis('gateway')} />

            {/* Scale bar */}
            <g aria-hidden="true">
              <path d="M320 508 V514 H680 V508" fill="none" stroke="#64748b" strokeWidth="1.2" />
              <text x="500" y="528" textAnchor="middle" className="fill-slate-500 font-mono" fontSize="10">
                35 mm
              </text>
            </g>

            {focusId && (
              <FocusRing part={getBoardPart(focusId)!} />
            )}
          </svg>
          <figcaption className="px-2 pt-2 text-xs text-slate-500">
            Layout traced from the AmbaSat-1 PCB reference diagram (rev 1.01). Traces are simplified to show
            which parts talk to each other, not exact copper routing. Click or tab to any part.
          </figcaption>
        </figure>

        <PartPanel part={selected} onSelect={select} />
      </div>

      <ConnectionTable onSelect={select} selectedId={selectedId} />
    </div>
  );
}

type Emphasis = 'active' | 'linked' | 'idle';
type PartPropsFn = (p: BoardPart) => Record<string, unknown>;

const ring = (state: Emphasis) => (state === 'active' ? '#38bdf8' : state === 'linked' ? '#7dd3fc' : '#475569');

function Chip({
  part,
  props,
  state,
  pins,
  label,
  metal = false,
}: {
  part: BoardPart;
  props: PartPropsFn;
  state: Emphasis;
  pins: number;
  label: string[];
  metal?: boolean;
}) {
  const { x, y, w, h } = part.shape;
  const inset = pins > 0 ? 7 : 2;
  const bx = x + inset;
  const by = y + inset;
  const bw = w - inset * 2;
  const bh = h - inset * 2;
  const pinStep = pins > 0 ? bw / (pins + 1) : 0;
  return (
    <g {...props(part)}>
      <rect x={x} y={y} width={w} height={h} fill="transparent" />
      {Array.from({ length: pins }).map((_, i) => {
        const o = (i + 1) * pinStep;
        return (
          <g key={i} fill="#94a3b8">
            <rect x={bx + o - 1.5} y={y} width="3" height={inset} />
            <rect x={bx + o - 1.5} y={by + bh} width="3" height={inset} />
            <rect x={x} y={by + (o * bh) / bw - 1.5} width={inset} height="3" />
            <rect x={bx + bw} y={by + (o * bh) / bw - 1.5} width={inset} height="3" />
          </g>
        );
      })}
      <rect
        x={bx}
        y={by}
        width={bw}
        height={bh}
        rx={metal ? 4 : 2}
        fill={metal ? '#a1a1aa' : '#0b0f17'}
        stroke={ring(state)}
        strokeWidth={state === 'idle' ? 1.2 : 2.4}
        filter={state === 'active' ? 'url(#board-glow)' : undefined}
      />
      {label.map((line, i) => (
        <text
          key={line}
          x={bx + bw / 2}
          y={by + bh / 2 + (i - (label.length - 1) / 2) * 12 + 3}
          textAnchor="middle"
          className={cn('font-mono', metal ? 'fill-slate-900' : 'fill-slate-300')}
          fontSize={bw < 40 ? 7 : 10}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function OffBoard({ part, props, state }: { part: BoardPart; props: PartPropsFn; state: Emphasis }) {
  const { x, y, w, h } = part.shape;
  return (
    <g {...props(part)}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill="#0d1728"
        stroke={ring(state)}
        strokeWidth={state === 'idle' ? 1.4 : 2.4}
        strokeDasharray={state === 'idle' ? '5 4' : undefined}
      />
      <text x={x + w / 2} y={y + h / 2 - 3} textAnchor="middle" className="fill-slate-100" fontSize="14" fontWeight="600">
        {part.label}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" className="fill-slate-400 font-mono" fontSize="10">
        {part.partName}
      </text>
    </g>
  );
}

function FocusRing({ part }: { part: BoardPart }) {
  const { x, y, w, h } = part.shape;
  return (
    <rect
      x={x - 4}
      y={y - 4}
      width={w + 8}
      height={h + 8}
      rx="8"
      fill="none"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeDasharray="4 3"
      pointerEvents="none"
    />
  );
}

function PartPanel({ part, onSelect }: { part: BoardPart; onSelect: (id: string) => void }) {
  const component = part.componentSlug ? getComponent(part.componentSlug) : undefined;
  const lab = part.labSlug ? getLab(part.labSlug) : undefined;
  const conns = connectionsFor(part.id);

  return (
    <aside className="panel flex flex-col gap-5 p-6" aria-live="polite" aria-label="Selected part">
      <div>
        <div className="flex flex-wrap gap-2">
          <StatusChip tone="hardware">hardware</StatusChip>
          <StatusChip tone={part.location === 'on-board' ? 'accent' : 'muted'}>{part.location}</StatusChip>
          <StatusChip tone="muted">{INSTALL_LABEL[part.install]}</StatusChip>
        </div>
        <h2 className="mt-3 text-xl font-bold text-slate-100">{part.label}</h2>
        <p className="font-mono text-xs text-accent-soft">{part.partName}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{part.summary}</p>
      </div>

      {conns.length > 0 && (
        <div>
          <h3 className="mono-label">Connects to</h3>
          <ul className="mt-2 space-y-2">
            {conns.map((c) => {
              const otherId = c.from === part.id ? c.to : c.from;
              const other = getBoardPart(otherId)!;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(otherId)}
                    className="group flex w-full items-start gap-3 rounded-lg border border-slate-700/60 p-2.5 text-left hover:border-accent/50"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-0.5 w-4 shrink-0 rounded"
                      style={{ backgroundColor: busInfo[c.bus].color }}
                    />
                    <span className="text-sm">
                      <span className="font-medium text-slate-100 group-hover:text-accent">{other.label}</span>
                      <span className="block text-xs text-slate-400">
                        {busInfo[c.bus].label} — {c.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div>
        <h3 className="mono-label">Learn more</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {component && (
            <li>
              <Link
                to={`/explore/components/${component.slug}`}
                className="inline-flex items-center gap-2 font-medium text-accent hover:underline"
              >
                <Boxes className="h-4 w-4" /> {component.name} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          )}
          {lab && (
            <li>
              <Link to={`/lab/${lab.slug}`} className="inline-flex items-center gap-2 font-medium text-accent hover:underline">
                <FlaskConical className="h-4 w-4" /> {lab.title} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          )}
        </ul>
        <ul className="mt-3 flex flex-wrap gap-2">
          {part.moduleSlugs.map((slug) => {
            const m = getModule(slug);
            return m ? (
              <li key={slug}>
                <Link
                  to={`/curriculum/${slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/60 px-2.5 py-1 text-xs text-slate-300 hover:border-accent/50 hover:text-accent"
                >
                  <span className="font-mono text-accent">{m.number}</span> {m.title}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>

      <p className="border-t border-slate-700/50 pt-3 text-xs text-slate-500">
        Source: {sourceLabel[part.source]}
        {part.note ? ` · ${part.note}` : ''}
      </p>
    </aside>
  );
}

function ConnectionTable({ onSelect, selectedId }: { onSelect: (id: string) => void; selectedId: string }) {
  return (
    <section aria-labelledby="board-connections" className="panel overflow-hidden">
      <h2 id="board-connections" className="border-b border-slate-700/50 px-6 py-4 text-lg font-bold">
        Every connection on the map
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="mono-label">
            <tr>
              <th scope="col" className="px-6 py-3">From</th>
              <th scope="col" className="px-3 py-3">To</th>
              <th scope="col" className="px-3 py-3">Link</th>
              <th scope="col" className="px-3 py-3">What flows</th>
              <th scope="col" className="px-6 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40">
            {boardConnections.map((c) => {
              const from = getBoardPart(c.from)!;
              const to = getBoardPart(c.to)!;
              const involved = c.from === selectedId || c.to === selectedId;
              return (
                <tr key={c.id} className={cn(involved && 'bg-accent/5')}>
                  <td className="px-6 py-3">
                    <PartLink part={from} onSelect={onSelect} />
                  </td>
                  <td className="px-3 py-3">
                    <PartLink part={to} onSelect={onSelect} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="inline-flex items-center gap-2 text-slate-300">
                      <span aria-hidden="true" className="inline-block h-0.5 w-4 rounded" style={{ backgroundColor: busInfo[c.bus].color }} />
                      {busInfo[c.bus].label}
                    </span>
                  </td>
                  <td className="min-w-[260px] px-3 py-3 text-slate-400">{c.description}</td>
                  <td className="px-6 py-3">
                    <StatusChip tone={c.source === 'inferred' ? 'warning' : 'muted'}>
                      {c.source === 'inferred' ? 'needs-verification' : c.source === 'manual' ? 'manual' : 'pcb diagram'}
                    </StatusChip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PartLink({ part, onSelect }: { part: BoardPart; onSelect: (id: string) => void }) {
  return (
    <button type="button" onClick={() => onSelect(part.id)} className="text-left font-medium text-slate-100 hover:text-accent">
      {part.label}
    </button>
  );
}
