import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { KnowledgeCheckpoint } from '../components/checkpoints/KnowledgeCheckpoint';
import { getCheckpoint } from '../data/checkpoints';
import type { Checkpoint } from '../types';

type KnowledgeCheckpointType = Extract<Checkpoint, { type: 'knowledge' }>;

const checkpoint = getCheckpoint('kc-m00');
if (!checkpoint || checkpoint.type !== 'knowledge') throw new Error('kc-m00 must exist');

describe('KnowledgeCheckpoint', () => {
  it('evaluates an answer and shows feedback + explanation, persisted', () => {
    const kc = checkpoint as KnowledgeCheckpointType;
    const q = kc.questions[0];
    const first = render(<KnowledgeCheckpoint checkpoint={kc} />);

    const correct = q.options.find((o) => o.id === q.correctOptionId)!;
    const option = screen.getAllByRole('radio', { name: new RegExp(correct.text.slice(0, 12)) })[0];
    fireEvent.click(option);

    // Correct answers surface the explanation ("Why: …").
    expect(screen.getByText(new RegExp(q.explanation.slice(0, 12), 'i'))).toBeInTheDocument();

    // Persisted: re-render shows the recorded answer, no re-answering needed.
    first.unmount();
    const { unmount } = render(<KnowledgeCheckpoint checkpoint={kc} />);
    expect(screen.getByText(new RegExp(q.explanation.slice(0, 12), 'i'))).toBeInTheDocument();
    unmount();
  });
});
