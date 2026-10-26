import { useSyncExternalStore } from 'react';
import {
  emptyModuleProgress,
  progressManager,
  type ModuleProgress,
  type ProgressState,
} from '../lib/progress';

/** Subscribe to the live progress state (re-renders on every change). */
export function useProgressState(): ProgressState {
  return useSyncExternalStore(progressManager.subscribe, progressManager.getState.bind(progressManager));
}

export function useModuleProgress(moduleId: string): ModuleProgress {
  const state = useProgressState();
  return state.modules[moduleId] ?? emptyModuleProgress();
}

export function useProgressActions() {
  return progressManager;
}
