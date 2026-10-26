import { describe, expect, it } from 'vitest';
import {
  LocalProgressStore,
  ProgressManager,
  isKnowledgeComplete,
  isModuleComplete,
  isPracticalComplete,
} from '../lib/progress';
import { getCheckpoint } from '../data/checkpoints';
import { modules } from '../data/modules';

describe('progress completion rules', () => {
  const m = modules[0];
  const kc = getCheckpoint(m.checkpointIds.knowledge);
  const pc = getCheckpoint(m.checkpointIds.practical);
  const qIds = kc?.type === 'knowledge' ? kc.questions.map((q) => q.id) : [];
  const tIds = pc?.type === 'practical' ? pc.tasks.map((t) => t.id) : [];

  it('a fresh module is incomplete', () => {
    expect(isModuleComplete(undefined, qIds, tIds)).toBe(false);
  });

  it('module completes only when all questions AND all tasks are done', () => {
    const partial = {
      answeredQuestionIds: qIds,
      completedTaskIds: tIds.slice(0, -1),
      lastVisited: null,
    };
    expect(isKnowledgeComplete(partial, qIds)).toBe(true);
    expect(isPracticalComplete(partial, tIds)).toBe(false);
    expect(isModuleComplete(partial, qIds, tIds)).toBe(false);

    const full = { answeredQuestionIds: qIds, completedTaskIds: tIds, lastVisited: null };
    expect(isModuleComplete(full, qIds, tIds)).toBe(true);
  });
});

describe('ProgressManager', () => {
  it('persists answers and tasks to localStorage and resets cleanly', () => {
    const pm = new ProgressManager(new LocalProgressStore());
    pm.markVisited('m00');
    pm.answerQuestion('m00', 'kc-m00-q1');
    pm.toggleTask('m00', 'pc-m00-t1');

    const fresh = new ProgressManager(new LocalProgressStore());
    const mp = fresh.getState().modules['m00'];
    expect(mp.lastVisited).toBeTruthy();
    expect(mp.answeredQuestionIds).toContain('kc-m00-q1');
    expect(mp.completedTaskIds).toContain('pc-m00-t1');

    fresh.reset();
    expect(fresh.getState().modules).toEqual({});
  });

  it('notifies subscribers on change', () => {
    const pm = new ProgressManager(new LocalProgressStore());
    let calls = 0;
    const unsub = pm.subscribe(() => calls++);
    pm.markVisited('m00');
    expect(calls).toBe(1);
    unsub();
    pm.markVisited('m01');
    expect(calls).toBe(1);
  });
});
