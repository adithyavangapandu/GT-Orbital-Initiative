import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { CodeBlock } from '../ui/CodeBlock';

/**
 * Shared Markdown renderer for lesson prose. Maps fenced code blocks to the
 * platform CodeBlock and styles the rest with Tailwind classes. Headings,
 * bold, links, lists and inline code all work out of the box.
 */
export function LessonMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: (p) => <h3 className="mb-3 mt-6 text-xl font-bold" {...p} />,
        h2: (p) => <h4 className="mb-3 mt-6 text-lg font-bold" {...p} />,
        h3: (p) => <h5 className="mb-2 mt-5 text-base font-semibold" {...p} />,
        p: (p) => <p className="mb-3 leading-relaxed text-slate-300" {...p} />,
        ul: (p) => <ul className="mb-4 list-disc space-y-1.5 pl-5 text-slate-300 marker:text-accent" {...p} />,
        ol: (p) => <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-slate-300 marker:text-accent" {...p} />,
        li: (p) => <li className="leading-relaxed" {...p} />,
        strong: (p) => <strong className="font-semibold text-slate-100" {...p} />,
        // Internal root-relative links must go through React Router so they
        // honour the basename (e.g. /GT-Orbital-Initiative/ambasat/) on the
        // deployed Pages site; external and fragment links stay plain anchors.
        a: ({ href, children, ...rest }) => {
          const className =
            'font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent';
          if (href?.startsWith('/')) {
            return (
              <Link to={href} className={className} {...rest}>
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              className={className}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noreferrer' : undefined}
              {...rest}
            >
              {children}
            </a>
          );
        },
        code({ className, children, ...props }) {
          const text = String(children).replace(/\n$/, '');
          const match = /language-(\w+)/.exec(className ?? '');
          const isBlock = text.includes('\n') || match;
          if (!isBlock) {
            return (
              <code
                className="rounded bg-space-700/80 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-soft"
                {...props}
              >
                {text}
              </code>
            );
          }
          return <CodeBlock language={match?.[1] ?? 'text'} code={text} />;
        },
        pre: ({ children }) => <>{children}</>,
        blockquote: (p) => (
          <blockquote
            className="mb-4 border-l-2 border-accent/50 pl-4 italic text-slate-400"
            {...p}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
