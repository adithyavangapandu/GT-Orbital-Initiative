import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useModuleProgress, useProgressActions } from '../../hooks/useProgress';
import { cn } from '../../lib/utils';
import type { Checkpoint, QuizQuestion } from '../../types';
import { StatusChip } from '../ui/StatusChip';

type KnowledgeCheckpointType = Extract<Checkpoint, { type: 'knowledge' }>;

/**
 * Interactive multiple-choice quiz. Correct answers persist to localStorage
 * through the progress store; a question is "done" when answered correctly.
 */
export function KnowledgeCheckpoint({ checkpoint }: { checkpoint: KnowledgeCheckpointType }) {
  return (
    <section aria-labelledby={`${checkpoint.id}-heading`} className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 id={`${checkpoint.id}-heading`} className="text-xl font-bold text-slate-100">
          {checkpoint.title}
        </h3>
        <StatusChip tone="accent">Knowledge checkpoint</StatusChip>
      </div>
      <p className="text-sm text-slate-400">
        Answer each question correctly to record it. Quizzes do not gate the course — but your mission
        dashboard counts them.
      </p>
      <ol className="space-y-6">
        {checkpoint.questions.map((q, i) => (
          <QuizQuestionCard key={q.id} question={q} index={i} moduleId={checkpoint.moduleId} />
        ))}
      </ol>
    </section>
  );
}

function QuizQuestionCard({
  question,
  index,
  moduleId,
}: {
  question: QuizQuestion;
  index: number;
  moduleId: string;
}) {
  const mp = useModuleProgress(moduleId);
  const actions = useProgressActions();
  const [selected, setSelected] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const answeredCorrectly = mp.answeredQuestionIds.includes(question.id);

  const choose = (optionId: string) => {
    setSelected(optionId);
    setAttempted(true);
    if (optionId === question.correctOptionId) {
      actions.answerQuestion(moduleId, question.id);
    }
  };

  const wrong = attempted && selected !== null && selected !== question.correctOptionId;

  return (
    <li className="panel p-5">
      <fieldset disabled={answeredCorrectly}>
        <legend className="sr-only">Question {index + 1}</legend>
        <div className="flex items-start justify-between gap-4">
          <p className="font-medium text-slate-100">
            <span className="mr-2 font-mono text-sm text-accent">Q{index + 1}.</span>
            {question.prompt}
          </p>
          {answeredCorrectly && (
            <StatusChip tone="success" className="shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" /> Done
            </StatusChip>
          )}
        </div>
        <div className="mt-4 grid gap-2">
          {question.options.map((opt) => {
            const isPicked = selected === opt.id;
            const isCorrect = opt.id === question.correctOptionId;
            const showCorrect = isCorrect && (answeredCorrectly || attempted);
            return (
              <label
                key={opt.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors',
                  showCorrect
                    ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                    : isPicked && wrong
                      ? 'border-red-400/50 bg-red-400/10 text-red-200'
                      : 'border-slate-700/60 bg-space-900 text-slate-300 hover:border-accent/40',
                  answeredCorrectly && 'cursor-default',
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={isPicked}
                  onChange={() => choose(opt.id)}
                  className="mt-0.5 accent-sky-400"
                />
                <span className="flex-1">{opt.text}</span>
                {showCorrect && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />}
                {isPicked && wrong && <XCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />}
              </label>
            );
          })}
        </div>
      </fieldset>
      {wrong && !answeredCorrectly && (
        <p className="mt-3 text-sm text-red-300">Not quite — try another answer.</p>
      )}
      {answeredCorrectly && (
        <p className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-3 text-sm leading-relaxed text-emerald-200/90">
          <span className="font-semibold">Why: </span>
          {question.explanation}
        </p>
      )}
    </li>
  );
}
