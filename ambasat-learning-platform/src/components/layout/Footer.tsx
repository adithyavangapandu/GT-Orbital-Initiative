import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-space-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold">
            AmbaSat <span className="text-accent">Learning Platform</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            A hands-on satellite engineering course from the Georgia Tech Orbital Initiative,
            built around the AmbaSat-1 MK-II educational kit.
          </p>
          <p className="mt-3 font-mono text-xs text-slate-500">
            Educational use only — completing the kit does not qualify it for launch.
          </p>
        </div>
        <nav aria-label="Footer — course">
          <h2 className="mono-label mb-4">Course</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link className="hover:text-accent" to="/learn">Learn</Link></li>
            <li><Link className="hover:text-accent" to="/curriculum">Build Your AmbaSat</Link></li>
            <li><Link className="hover:text-accent" to="/explore/components">Component Explorer</Link></li>
            <li><Link className="hover:text-accent" to="/lab">Engineering Lab</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer — organization">
          <h2 className="mono-label mb-4">Orbital Initiative</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link className="hover:text-accent" to="/about">About the team</Link></li>
            <li><Link className="hover:text-accent" to="/mission">My Mission</Link></li>
            <li><Link className="hover:text-accent" to="/resources">Resources</Link></li>
            <li>
              <a
                className="hover:text-accent"
                href="https://adithyavangapandu.github.io/GT-Orbital-Initiative/"
                target="_blank"
                rel="noreferrer"
              >
                Organization website
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-700/50 py-5 text-center font-mono text-xs text-slate-500">
        Georgia Tech Orbital Initiative · AmbaSat-1 course content references the MK-II How To Guide v1.03
      </div>
    </footer>
  );
}
