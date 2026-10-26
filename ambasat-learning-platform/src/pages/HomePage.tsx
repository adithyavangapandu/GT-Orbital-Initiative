import { ArrowRight, BookOpen, Compass, Cpu, FlaskConical, Radio, Satellite, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { labs } from '../data/labs';
import { modules } from '../data/modules';
import { StatusChip } from '../components/ui/StatusChip';

const JOURNEY = [
  { label: 'Discover', desc: 'Meet your satellite' },
  { label: 'Understand', desc: 'Why it is built this way' },
  { label: 'Explore', desc: 'Every component, mapped' },
  { label: 'Build', desc: 'Solder, assemble, verify' },
  { label: 'Program', desc: 'Compile & upload firmware' },
  { label: 'Communicate', desc: 'LoRaWAN to the world' },
  { label: 'Operate', desc: 'Your own ground station' },
  { label: 'Demonstrate', desc: 'Prove the mission' },
];

export function HomePage() {
  return (
    <div>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-slate-700/50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(56,189,248,0.16),transparent_70%),radial-gradient(ellipse_50%_40%_at_80%_110%,rgba(179,163,105,0.10),transparent_70%)]"
        />
        <StarField />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <StatusChip tone="gold">GT Orbital Initiative · Hands-on satellite engineering</StatusChip>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Build a satellite.
            <br />
            <span className="bg-gradient-to-r from-accent-soft to-accent bg-clip-text text-transparent">
              Actually hold it.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            The AmbaSat Learning Platform is a structured engineering course that takes you from zero
            satellite experience to assembling, programming, and operating a real AmbaSat-1
            sprite-class satellite — soldering iron to live telemetry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/curriculum"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-space-950 transition-colors hover:bg-accent-soft"
            >
              Start Learning <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-600 px-6 text-sm font-semibold text-slate-200 transition-colors hover:border-accent hover:text-accent"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" /> Explore the Curriculum
            </Link>
          </div>
          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-6 border-t border-slate-700/50 pt-8 sm:grid-cols-4">
            <Stat value="35 mm²" label="Sprite-class satellite" />
            <Stat value="10" label="Hands-on modules" />
            <Stat value="8" label="Sensor options" />
            <Stat value="700 km+" label="Proven LoRaWAN range" />
          </dl>
        </div>
      </section>

      {/* ====================== LEARNING JOURNEY ====================== */}
      <section className="border-b border-slate-700/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The mission path</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            A deliberate progression from first concepts to a demonstrated, working satellite —
            every step verified with a checkpoint.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((step, i) => (
              <li key={step.label} className="panel relative p-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-semibold text-slate-100">{step.label}</p>
                <p className="mt-1 text-sm text-slate-400">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== CURRICULUM PREVIEW ===================== */}
      <section className="border-b border-slate-700/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The curriculum</h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Ten modules that follow the real MK-II build sequence in the AmbaSat-1 How To Guide —
                antenna first, dashboard last.
              </p>
            </div>
            <Link to="/curriculum" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Full curriculum <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {modules.slice(0, 10).map((m) => (
              <li key={m.id}>
                <Link
                  to={`/curriculum/${m.slug}`}
                  className="panel group flex h-full flex-col p-4 transition-colors hover:border-accent/50"
                >
                  <span className="font-mono text-sm text-slate-600 group-hover:text-accent/70">{m.number}</span>
                  <span className="mt-2 text-sm font-semibold leading-snug text-slate-200 group-hover:text-accent">
                    {m.title}
                  </span>
                  <span className="mt-2 text-xs text-slate-500">{m.milestone}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================= LABS PREVIEW ======================== */}
      <section className="border-b border-slate-700/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Engineering Lab</h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Interactive visualizations that let you poke at the systems before you solder them.
              </p>
            </div>
            <Link to="/lab" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              All labs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {labs.slice(0, 3).map((lab) => (
              <Link
                key={lab.id}
                to={`/lab/${lab.slug}`}
                className="panel group flex flex-col gap-3 p-6 transition-colors hover:border-accent/50"
              >
                <span className="mono-label">{lab.number}</span>
                <h3 className="font-bold text-slate-100 group-hover:text-accent">{lab.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-slate-400">{lab.description}</p>
                <StatusChip tone={lab.status === 'interactive' ? 'accent' : 'muted'} className="self-start">
                  {lab.status === 'interactive' ? 'Interactive now' : 'Coming soon'}
                </StatusChip>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT YOU'LL DO ===================== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What you will actually do</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={Wrench} title="Assemble real hardware">
              Solder the antenna, programming pins and sensor daughterboard onto a flight-pattern PCB.
            </Feature>
            <Feature icon={Cpu} title="Flash real firmware">
              Compile and upload C/C++ firmware through the CH340 programmer until the LED blinks.
            </Feature>
            <Feature icon={Radio} title="Transmit real telemetry">
              Configure LoRaWAN keys and send sensor data through The Things Network&apos;s gateways.
            </Feature>
            <Feature icon={Satellite} title="Operate a ground station">
              Watch your packets land in the AmbaSat Dashboard — the same path an orbiting sprite uses.
            </Feature>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/curriculum"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-space-950 hover:bg-accent-soft"
            >
              <Compass className="h-4 w-4" /> Begin Module 00
            </Link>
            <Link to="/lab/telemetry-journey" className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-600 px-5 text-sm font-semibold text-slate-200 hover:border-accent hover:text-accent">
              <FlaskConical className="h-4 w-4" /> Try the Telemetry Journey lab
            </Link>
          </div>
          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-slate-500">
            This platform teaches with the MK-II educational kit. Completing the kit is real
            engineering training — it does not by itself qualify hardware for launch; flight
            preparation is performed by AmbaSat engineers under UKSA requirements.
          </p>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-bold tracking-tight text-slate-100">{value}</dd>
      <dd className="mt-1 text-sm text-slate-400">{label}</dd>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Cpu;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel flex flex-col gap-3 p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
      </span>
      <h3 className="font-semibold text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">{children}</p>
    </div>
  );
}

/** Decorative star field (pure CSS dots, no canvas needed). */
function StarField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          'radial-gradient(1px 1px at 12% 30%, rgba(255,255,255,.5) 50%, transparent 50%),' +
          'radial-gradient(1px 1px at 32% 70%, rgba(255,255,255,.4) 50%, transparent 50%),' +
          'radial-gradient(1.5px 1.5px at 55% 20%, rgba(125,211,252,.6) 50%, transparent 50%),' +
          'radial-gradient(1px 1px at 70% 55%, rgba(255,255,255,.4) 50%, transparent 50%),' +
          'radial-gradient(1px 1px at 85% 35%, rgba(255,255,255,.5) 50%, transparent 50%),' +
          'radial-gradient(1.5px 1.5px at 45% 85%, rgba(255,255,255,.3) 50%, transparent 50%),' +
          'radial-gradient(1px 1px at 92% 80%, rgba(125,211,252,.5) 50%, transparent 50%)',
      }}
    />
  );
}
