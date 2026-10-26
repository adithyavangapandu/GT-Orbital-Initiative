import { cn } from '../../lib/utils';

const styles: Record<string, string> = {
  accent: 'border-accent/40 bg-accent/10 text-accent-soft',
  success: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  muted: 'border-slate-600/60 bg-slate-800/60 text-slate-400',
  gold: 'border-gold/40 bg-gold/10 text-gold',
  hardware: 'border-orange-400/40 bg-orange-400/10 text-orange-300',
  software: 'border-violet-400/40 bg-violet-400/10 text-violet-300',
};

export function StatusChip({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider',
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
