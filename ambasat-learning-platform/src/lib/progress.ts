/**
 * Progress persistence abstraction.
 *
 * Phase 1 stores progress in browser localStorage. All reads/writes go through
 * the `ProgressStore` interface so a remote backend (e.g. Supabase) can replace
 * LocalProgressStore later without changing curriculum code.
 */

export interface ModuleProgress {
  /** ISO timestamp of last visit, or null. */
  lastVisited: string | null;
  /** Knowledge-checkpoint question ids answered correctly. */
  answeredQuestionIds: string[];
  /** Practical-checkpoint task ids checked off. */
  completedTaskIds: string[];
}

export interface ProgressState {
  version: 1;
  modules: Record<string, ModuleProgress>;
}

const STORAGE_KEY = 'ambasat.progress.v1';

export const emptyModuleProgress = (): ModuleProgress => ({
  lastVisited: null,
  answeredQuestionIds: [],
  completedTaskIds: [],
});

const emptyState = (): ProgressState => ({ version: 1, modules: {} });

export interface ProgressStore {
  load(): ProgressState;
  save(state: ProgressState): void;
  reset(): void;
}

export class LocalProgressStore implements ProgressStore {
  load(): ProgressState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const parsed = JSON.parse(raw) as ProgressState;
      if (parsed.version !== 1 || typeof parsed.modules !== 'object') return emptyState();
      return parsed;
    } catch {
      return emptyState();
    }
  }

  save(state: ProgressState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode etc.) — progress stays in memory.
    }
  }

  reset(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

/* ------------------------------------------------------------------ */
/* A tiny observable wrapper so React components re-render on changes. */
/* ------------------------------------------------------------------ */

type Listener = () => void;

export class ProgressManager {
  private store: ProgressStore;
  private state: ProgressState;
  private listeners = new Set<Listener>();

  constructor(store: ProgressStore) {
    this.store = store;
    this.state = store.load();
  }

  getState(): ProgressState {
    return this.state;
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private update(next: ProgressState) {
    this.state = next;
    this.store.save(next);
    this.listeners.forEach((l) => l());
  }

  private module(id: string): ModuleProgress {
    return this.state.modules[id] ?? emptyModuleProgress();
  }

  markVisited(moduleId: string) {
    const mp = { ...this.module(moduleId), lastVisited: new Date().toISOString() };
    this.update({ ...this.state, modules: { ...this.state.modules, [moduleId]: mp } });
  }

  answerQuestion(moduleId: string, questionId: string) {
    const mp = this.module(moduleId);
    if (mp.answeredQuestionIds.includes(questionId)) return;
    this.update({
      ...this.state,
      modules: {
        ...this.state.modules,
        [moduleId]: { ...mp, answeredQuestionIds: [...mp.answeredQuestionIds, questionId] },
      },
    });
  }

  toggleTask(moduleId: string, taskId: string) {
    const mp = this.module(moduleId);
    const done = mp.completedTaskIds.includes(taskId);
    this.update({
      ...this.state,
      modules: {
        ...this.state.modules,
        [moduleId]: {
          ...mp,
          completedTaskIds: done
            ? mp.completedTaskIds.filter((t) => t !== taskId)
            : [...mp.completedTaskIds, taskId],
        },
      },
    });
  }

  reset() {
    this.store.reset();
    this.state = emptyState();
    this.listeners.forEach((l) => l());
  }
}

export const progressManager = new ProgressManager(new LocalProgressStore());

/* ------- Derived helpers (pure; easy to unit-test) ------- */

export function isKnowledgeComplete(
  mp: ModuleProgress | undefined,
  requiredQuestionIds: string[],
): boolean {
  if (requiredQuestionIds.length === 0) return false;
  return requiredQuestionIds.every((q) => mp?.answeredQuestionIds.includes(q));
}

export function isPracticalComplete(
  mp: ModuleProgress | undefined,
  requiredTaskIds: string[],
): boolean {
  if (requiredTaskIds.length === 0) return false;
  return requiredTaskIds.every((t) => mp?.completedTaskIds.includes(t));
}

export function isModuleComplete(
  mp: ModuleProgress | undefined,
  requiredQuestionIds: string[],
  requiredTaskIds: string[],
): boolean {
  return isKnowledgeComplete(mp, requiredQuestionIds) && isPracticalComplete(mp, requiredTaskIds);
}
