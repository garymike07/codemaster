import { startTransition, useCallback, useEffect, useState } from 'react';

type InitialValue<T> = T | (() => T);
type SetValue<T> = T | ((val: T) => T);

function resolveInitialValue<T>(initialValue: InitialValue<T>): T {
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function useLocalStorage<T>(key: string, initialValue: InitialValue<T>) {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return resolveInitialValue(initialValue);
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item == null) {
        return resolveInitialValue(initialValue);
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}"`, error);
      return resolveInitialValue(initialValue);
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: SetValue<T>) => {
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;

        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
          console.error(`Failed to write localStorage key "${key}"`, error);
        }

        return valueToStore;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(resolveInitialValue(initialValue));
    } catch (error) {
      console.error(`Failed to remove localStorage key "${key}"`, error);
    }
  }, [initialValue, key]);

  useEffect(() => {
    startTransition(() => {
      setStoredValue(readValue());
    });
  }, [readValue]);

  return [storedValue, setValue, removeValue] as const;
}
