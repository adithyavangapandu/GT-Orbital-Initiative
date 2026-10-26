import type { LessonBlock } from '../../types';
import { Callout } from '../ui/Callout';
import { CodeBlock } from '../ui/CodeBlock';
import { DiagramPlaceholder } from '../ui/DiagramPlaceholder';
import { LessonMarkdown } from './LessonMarkdown';

/** Renders one structured lesson block: heading, prose, optional callout/code/diagram. */
export function LessonSection({ block }: { block: LessonBlock }) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold tracking-tight text-slate-100">{block.heading}</h3>
      <LessonMarkdown>{block.body}</LessonMarkdown>
      {block.callout && (
        <Callout kind={block.callout.kind} title={block.callout.title}>
          {block.callout.text}
        </Callout>
      )}
      {block.code && (
        <CodeBlock language={block.code.language} code={block.code.code} caption={block.code.caption} />
      )}
      {block.diagramPlaceholder && <DiagramPlaceholder label={block.diagramPlaceholder} />}
    </section>
  );
}
