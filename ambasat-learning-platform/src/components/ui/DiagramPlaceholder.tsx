import { ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Clearly-labelled placeholder for diagrams/illustrations not yet drawn. */
export function DiagramPlaceholder({
  label,
  className,
  compact = false,
}: {
  label: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'diagram-frame flex flex-col items-center justify-center gap-2 text-center',
        compact ? 'min-h-[140px] p-4' : 'min-h-[220px] p-8',
        className,
      )}
      role="img"
      aria-label={`Diagram placeholder: ${label}`}
    >
      {/* Corner ticks — technical-drawing feel */}
      <span aria-hidden="true" className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/50" />
      <span aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/50" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/50" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/50" />
      <ImageIcon className="h-6 w-6 text-slate-500" aria-hidden="true" />
      <p className="max-w-md text-sm text-slate-400">{label}</p>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
        Illustration coming in a later phase
      </span>
    </div>
  );
}
