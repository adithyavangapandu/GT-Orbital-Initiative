import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'About Orbital Initiative' }]} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Orbital Initiative</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-300">
        <p>
          The <strong className="text-slate-100">Georgia Tech Orbital Initiative</strong> is a student
          aerospace engineering organization designing, building and testing small satellites —
          and working toward launching one.
        </p>
        <p>
          This platform powers the organization&apos;s AmbaSat program: the on-ramp where new
          members go from zero satellite experience to a working, sensor-equipped sprite-class
          satellite built from the AmbaSat-1 MK-II kit.
        </p>
        <p>
          The course content is grounded in the official{' '}
          <em>AmbaSat-1 How To Guide (MK-II Kit) v1.03</em>; every module records the manual
          pages it derives from so instructors can audit technical accuracy.
        </p>
      </div>

      <Callout kind="engineering" title="Scope honesty" className="mt-8">
        Completing this educational kit is real engineering training, but it does not by itself
        qualify hardware for launch. Flight preparation (frequency configuration, antenna work,
        pin removal, solar board checks) is performed by AmbaSat engineers under UKSA
        requirements for satellites that go forward to a launch provider.
      </Callout>

      <div className="panel mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-bold text-slate-100">The organization site</h2>
          <p className="mt-1 text-sm text-slate-400">
            Programs, subsystem teams, roadmap and how to join.
          </p>
        </div>
        <a
          href="https://adithyavangapandu.github.io/GT-Orbital-Initiative/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-600 px-5 text-sm font-semibold text-slate-200 hover:border-accent hover:text-accent"
        >
          Visit adithyavangapandu.github.io/GT-Orbital-Initiative <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Want to contribute content? See <Link to="/resources" className="text-accent hover:underline">Resources</Link> for
        the course repositories and documentation.
      </p>
    </div>
  );
}
