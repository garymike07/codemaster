// Shim for use-sync-external-store/shim/with-selector for React 19 compatibility
import { useSyncExternalStore } from 'react';

export { useSyncExternalStore };

// Re-export with selector (simplified implementation for React 19)
export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot: undefined | null | (() => Snapshot),
  selector: (snapshot: Snapshot) => Selection,
  _isEqual?: (a: Selection, b: Selection) => boolean
): Selection {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot ?? getSnapshot);
  return selector(snapshot);
}
