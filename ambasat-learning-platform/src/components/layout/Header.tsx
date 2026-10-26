import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Boxes, FlaskConical, Home, Library, Menu, Rocket, Satellite, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/curriculum', label: 'Build Your AmbaSat', icon: Rocket },
  { to: '/lab', label: 'Engineering Lab', icon: FlaskConical },
  { to: '/mission', label: 'My Mission', icon: Satellite },
  { to: '/resources', label: 'Resources', icon: Library },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-space-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="AmbaSat Learning Platform home">
          <svg viewBox="0 0 34 34" className="h-9 w-9 shrink-0" aria-hidden="true">
            <rect x="10" y="10" width="14" height="14" rx="2" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="17" cy="17" rx="15.5" ry="5.8" fill="none" stroke="#b3a369" strokeWidth="1.4" transform="rotate(-28 17 17)" />
            <circle cx="29.4" cy="9.6" r="2.3" fill="#7dd3fc" />
          </svg>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-wide">AmbaSat <span className="text-accent">Learning Platform</span></span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              GT Orbital Initiative
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent/10 text-accent' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn('border-t border-slate-700/50 bg-space-900 lg:hidden', open ? 'block' : 'hidden')}
      >
        <ul className="space-y-1 px-4 py-3">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                    isActive ? 'bg-accent/10 text-accent' : 'text-slate-300 hover:bg-slate-800',
                  )
                }
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="border-t border-slate-700/50 px-4 py-3">
          <NavLink
            to="/explore/components"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <Boxes className="h-3.5 w-3.5" /> Component Explorer
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
