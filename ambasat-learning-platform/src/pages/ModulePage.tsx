import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpenCheck, Clock, ListChecks, Target } from 'lucide-react';
import { getComponent } from '../data/components';
import { getCheckpoint } from '../data/checkpoints';
import { getModule, nextModule } from '../data/modules';
import { getLessonContent } from '../content/modules';
import { useModuleProgress, useProgressActions } from '../hooks/useProgress';
import { isKnowledgeComplete, isModuleComplete, isPracticalComplete } from '../lib/progress';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { CurriculumSidebar } from '../components/curriculum/CurriculumSidebar';
import { ModuleNavButtons } from '../components/curriculum/ModuleNavButtons';
import { KnowledgeCheckpoint } from '../components/checkpoints/KnowledgeCheckpoint';
import { PracticalCheckpoint } from '../components/checkpoints/PracticalCheckpoint';
import { LessonSection } from '../components/lesson/LessonSection';
import { Callout } from '../components/ui/Callout';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ComingSoon } from '../components/ui/ComingSoon';
import { DiagramPlaceholder } from '../components/ui/DiagramPlaceholder';
import { LessonMarkdown } from '../components/lesson/LessonMarkdown';
import { StatusChip } from '../components/ui/StatusChip';
import { NotFoundPage } from './NotFoundPage';
import { Link } from 'react-router-dom';
import type { HandsOnStep } from '../types';

/**
 * The shared module template (spec §4.4): header → why → core concepts →
 * interactive → hands-on → troubleshooting → knowledge + practical
 * checkpoints → next module. Every module renders through this page.
 */
export function ModulePage() {
  const { moduleSlug } = useParams();
  const module = moduleSlug ? getModule(moduleSlug) : undefined;
  const actions = useProgressActions();

  useEffect(() => {
    if (module) actions.markVisited(module.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module?.id]);

  if (!module) return <NotFoundPage />;
  return <ModuleBody module={module} />;
}

function ModuleBody({ module }: { module: NonNullable<ReturnType<typeof getModule>> }) {
  const mp = useModuleProgress(module.id);
  const content = getLessonContent(module.id);

  const knowledge = getCheckpoint(module.checkpointIds.knowledge);
  const practical = getCheckpoint(module.checkpointIds.practical);
  const questionIds = knowledge?.type === 'knowledge' ? knowledge.questions.map((q) => q.id) : [];
  const taskIds = practical?.type === 'practical' ? practical.tasks.map((t) => t.id) : [];
  const kDone = isKnowledgeComplete(mp, questionIds);
  const pDone = isPracticalComplete(mp, taskIds);
  const complete = isModuleComplete(mp, questionIds, taskIds);
  const next = nextModule(module.slug);

  // Progress fraction for the header indicator.
  const totalChecks = questionIds.length + taskIds.length;
  const doneChecks =
    questionIds.filter((q) => mp.answeredQuestionIds.includes(q)).length +
    taskIds.filter((t) => mp.completedTaskIds.includes(t)).length;
  const fraction = totalChecks ? doneChecks / totalChecks : 0;

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6">
      <CurriculumSidebar />
      <article className="min-w-0 flex-1">
        <Breadcrumbs items={[{ label: 'Build Your AmbaSat', to: '/curriculum' }, { label: `Module ${module.number}` }]} />

        {/* ===== A. Module header ===== */}
        <header className="panel border-accent/25 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusChip tone="accent">Module {module.number}</StatusChip>
            {complete ? (
              <StatusChip tone="success">Complete</StatusChip>
            ) : mp.lastVisited ? (
              <StatusChip tone="muted">In progress</StatusChip>
            ) : (
              <StatusChip tone="muted">Not started</StatusChip>
            )}
            <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" /> {module.estimatedDuration || 'TBD'}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{module.title}</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-300">{module.summary}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Target className="h-4 w-4 text-accent" /> Learning objectives
              </h2>
              <ul className="mt-2 space-y-1.5">
                {module.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <ListChecks className="h-4 w-4 text-accent" /> Prerequisites
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {module.prerequisites.length ? module.prerequisites.join(' · ') : 'None — start here.'}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-200">Module completion</h2>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700/60" role="progressbar" aria-valuenow={Math.round(fraction * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Module completion">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent-dim to-accent transition-[width]" style={{ width: `${fraction * 100}%` }} />
                </div>
                <p className="mt-1.5 font-mono text-xs text-slate-500">
                  {kDone ? '✓' : '○'} Knowledge checkpoint · {pDone ? '✓' : '○'} Practical checklist
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ===== B. Why are we learning this ===== */}
        <Section id="why" index="B" title="Why are we learning this?">
          <div className="panel border-l-4 border-l-gold/60 p-6">
            <LessonMarkdown>{content?.why ?? '_Content pending._'}</LessonMarkdown>
          </div>
        </Section>

        {/* ===== C. Core concepts ===== */}
        <Section id="concepts" index="C" title="Core concepts">
          {content && content.coreConcepts.length > 0 ? (
            <div className="space-y-10">
              {content.coreConcepts.map((block) => (
                <LessonSection key={block.heading} block={block} />
              ))}
            </div>
          ) : (
            <Callout kind="pending">Detailed lesson content is being written. Structure is in place — check back soon.</Callout>
          )}
        </Section>

        {/* ===== D. Interactive exploration ===== */}
        <Section id="interactive" index="D" title="Interactive exploration">
          {content?.interactive ? (
            <div className="space-y-4">
              <DiagramPlaceholder label={content.interactive.plannedExperience} />
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-300">{content.interactive.title}</span> — planned
                visualization type: <code className="font-mono text-accent-soft">{content.interactive.visualizationType}</code>
              </p>
            </div>
          ) : (
            <ComingSoon title="Interactive visualization planned" description="This module will get an interactive model in a later phase." />
          )}
        </Section>

        {/* ===== E. Hands-on instructions ===== */}
        <Section id="hands-on" index="E" title="Hands-on instructions">
          {content && content.handsOn.length > 0 ? (
            <ol className="space-y-6">
              {content.handsOn.map((step, i) => (
                <HandsOnStepCard key={step.title} step={step} index={i} />
              ))}
            </ol>
          ) : (
            <Callout kind="pending">Step-by-step instructions for this module are being authored — see the manual references below for the source steps.</Callout>
          )}
        </Section>

        {/* ===== F. Troubleshooting ===== */}
        <Section id="troubleshooting" index="F" title="Troubleshooting">
          {content && content.troubleshooting.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-slate-700/50">
              <table className="w-full text-left text-sm">
                <thead className="bg-space-800 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Symptom</th>
                    <th className="hidden px-4 py-3 font-medium md:table-cell">Possible causes</th>
                    <th className="px-4 py-3 font-medium">What to try</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 bg-space-900">
                  {content.troubleshooting.map((t) => (
                    <tr key={t.symptom}>
                      <td className="px-4 py-3 align-top font-medium text-slate-200">{t.symptom}</td>
                      <td className="hidden px-4 py-3 align-top text-slate-400 md:table-cell">
                        <ul className="list-disc space-y-1 pl-4">
                          {t.possibleCauses.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                      </td>
                      <td className="px-4 py-3 align-top text-slate-300">
                        <ul className="list-disc space-y-1 pl-4">
                          {t.suggestions.map((s) => <li key={s}>{s}</li>)}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Callout kind="pending">Known issues and fixes for this module will be documented here.</Callout>
          )}
        </Section>

        {/* ===== G. Knowledge checkpoint ===== */}
        <Section id="knowledge" index="G" title="Knowledge checkpoint">
          {knowledge?.type === 'knowledge' ? (
            <KnowledgeCheckpoint checkpoint={knowledge} />
          ) : (
            <Callout kind="pending">Quiz content pending.</Callout>
          )}
        </Section>

        {/* ===== H. Practical checkpoint ===== */}
        <Section id="practical" index="H" title="Practical checkpoint">
          {practical?.type === 'practical' ? (
            <PracticalCheckpoint checkpoint={practical} />
          ) : (
            <Callout kind="pending">Practical checklist pending.</Callout>
          )}
        </Section>

        {/* ===== I. What comes next ===== */}
        <Section id="next" index="I" title="What comes next?">
          {next ? (
            <div className="panel p-6">
              <p className="mono-label">Next up — Module {next.number}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-100">{next.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{next.summary}</p>
              {content?.nextModuleNote && (
                <p className="mt-3 border-l-2 border-accent/50 pl-3 text-sm italic text-slate-400">
                  {content.nextModuleNote}
                </p>
              )}
            </div>
          ) : (
            <div className="panel p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-slate-100">
                <BookOpenCheck className="h-5 w-5 text-accent" /> End of the curriculum
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                You have reached the last module. Head to <Link to="/mission" className="text-accent hover:underline">My Mission</Link> to review your progress, or revisit any module to finish outstanding checkpoints.
              </p>
            </div>
          )}
        </Section>

        {/* Manual references */}
        {module.manualReferences.length > 0 && (
          <section className="mt-10 rounded-xl border border-slate-700/50 bg-space-900 p-5" aria-label="Manual references">
            <h2 className="mono-label">Manual references</h2>
            <ul className="mt-3 space-y-2">
              {module.manualReferences.map((r, i) => (
                <li key={i} className="flex items-start justify-between gap-4 text-sm text-slate-400">
                  <span>
                    <span className="text-slate-300">{r.sourceDocument}</span>
                    {r.page && <span className="text-slate-500"> · p.{r.page}</span>}
                    {r.section && <span className="text-slate-500"> · {r.section}</span>}
                    <span className="block text-slate-500">{r.description}</span>
                  </span>
                  <StatusChip tone={r.verificationStatus === 'verified' ? 'success' : 'warning'} className="shrink-0">
                    {r.verificationStatus === 'verified' ? 'Verified' : 'Unverified'}
                  </StatusChip>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related components */}
        {module.relatedComponents.length > 0 && (
          <section className="mt-6" aria-label="Related components">
            <h2 className="mono-label">Components in this module</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {module.relatedComponents.map((slug) => {
                const c = getComponent(slug);
                return c ? (
                  <Link
                    key={slug}
                    to={`/explore/components/${slug}`}
                    className="rounded-full border border-slate-600/60 px-3 py-1 text-xs text-slate-300 hover:border-accent/50 hover:text-accent"
                  >
                    {c.name}
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        )}

        <ModuleNavButtons module={module} />
      </article>
    </div>
  );
}

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-12 scroll-mt-24">
      <h2 id={`${id}-heading`} className="mb-5 flex items-baseline gap-3 border-b border-slate-700/50 pb-3">
        <span className="font-mono text-sm font-semibold text-accent">{index}</span>
        <span className="text-2xl font-bold tracking-tight text-slate-100">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function HandsOnStepCard({ step, index }: { step: HandsOnStep; index: number }) {
  return (
    <li className="panel relative p-5 pl-16">
      <span
        aria-hidden="true"
        className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent"
      >
        {index + 1}
      </span>
      <h4 className="font-semibold text-slate-100">
        {step.title}
        {step.domain && (
          <StatusChip tone={step.domain} className="ml-2 align-middle">
            {step.domain}
          </StatusChip>
        )}
        {step.manualReference && (
          <span className="ml-2 font-mono text-xs font-normal text-slate-500">{step.manualReference}</span>
        )}
      </h4>
      <div className="mt-2">
        <LessonMarkdown>{step.body}</LessonMarkdown>
      </div>
      {step.warning && (
        <Callout kind="safety" className="mt-3">
          {step.warning}
        </Callout>
      )}
      {step.code && <div className="mt-3"><CodeBlock {...step.code} /></div>}
    </li>
  );
}
