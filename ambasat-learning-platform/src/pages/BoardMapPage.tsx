import { CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Callout } from '../components/ui/Callout';
import { BoardDiagram } from '../components/visualizations/BoardDiagram';

export function BoardMapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Build Your AmbaSat', to: '/curriculum' },
          { label: 'Component Explorer', to: '/explore/components' },
          { label: 'Board Map' },
        ]}
      />
      <header className="max-w-3xl">
        <p className="mono-label flex items-center gap-2 text-accent">
          <CircuitBoard className="h-4 w-4" /> Board Map
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">How the AmbaSat-1 fits together</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          A 2D map of the 35 mm board and everything wired to it. Select any part to see what it does,
          which parts it talks to, and where to learn more. Toggle the layers to follow one kind of
          connection — data, power or radio — at a time.
        </p>
      </header>

      <div className="mt-10">
        <BoardDiagram />
      </div>

      <Callout kind="info" className="mt-8" title="Reading the map">
        Solid lines are electrical connections; the dashed grey line is a mechanical mount and the dashed
        yellow arc is the over-the-air radio link. Connections marked <em>needs-verification</em> come from
        the chip datasheets rather than AmbaSat&apos;s own documents. For the full story of each part, open
        the <Link to="/explore/components" className="font-medium text-accent underline">Component Explorer</Link>.
      </Callout>
    </div>
  );
}
