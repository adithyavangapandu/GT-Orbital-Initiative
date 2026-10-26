import { Rocket } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Honest placeholder for features that are planned but not built yet. */
export function ComingSoon({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-600/60 bg-space-850 p-8 text-center',
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
        <Rocket className="h-5 w-5 text-accent" aria-hidden="true" />
      </span>
      <p className="text-base font-semibold text-slate-200">{title}</p>
      {description && <p className="max-w-md text-sm leading-relaxed text-slate-400">{description}</p>}
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
        Coming in a future phase
      </span>
    </div>
  );
}
