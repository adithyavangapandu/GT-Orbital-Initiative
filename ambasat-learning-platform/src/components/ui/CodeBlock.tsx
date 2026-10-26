import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({
  code,
  language = 'text',
  caption,
}: {
  code: string;
  language?: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — button simply does nothing permanent
    }
  };

  return (
    <figure className="overflow-hidden rounded-xl border border-slate-700/60 bg-space-900">
      <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          aria-label="Copy code to clipboard"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
      {caption && (
        <figcaption className="border-t border-slate-700/60 px-4 py-2 text-xs text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
