import { AlertTriangle, Info, Lightbulb, ShieldAlert, Wrench } from 'lucide-react';
import type { CalloutKind } from '../../types';
import { cn } from '../../lib/utils';

const config: Record<CalloutKind, { icon: typeof Info; label: string; cls: string }> = {
  info: { icon: Info, label: 'Note', cls: 'border-accent/40 bg-accent/5 text-slate-200' },
  tip: { icon: Lightbulb, label: 'Tip', cls: 'border-emerald-400/40 bg-emerald-400/5 text-slate-200' },
  engineering: { icon: Wrench, label: 'Engineering note', cls: 'border-gold/40 bg-gold/5 text-slate-200' },
  warning: { icon: AlertTriangle, label: 'Warning', cls: 'border-amber-400/40 bg-amber-400/5 text-slate-200' },
  safety: { icon: ShieldAlert, label: 'Safety', cls: 'border-red-400/50 bg-red-400/5 text-slate-200' },
  pending: { icon: Info, label: 'Content pending', cls: 'border-slate-500/50 bg-slate-800/40 text-slate-300' },
};

const iconCls: Record<CalloutKind, string> = {
  info: 'text-accent',
  tip: 'text-emerald-300',
  engineering: 'text-gold',
  warning: 'text-amber-300',
  safety: 'text-red-300',
  pending: 'text-slate-400',
};

export function Callout({
  kind,
  title,
  children,
  className,
}: {
  kind: CalloutKind;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const c = config[kind];
  const Icon = c.icon;
  return (
    <aside className={cn('rounded-xl border p-4', c.cls, className)} role="note">
      <div className="flex items-center gap-2">
        <Icon className={cn('h-4 w-4 shrink-0', iconCls[kind])} aria-hidden="true" />
        <span className={cn('font-mono text-xs font-semibold uppercase tracking-wider', iconCls[kind])}>
          {title ?? c.label}
        </span>
      </div>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
