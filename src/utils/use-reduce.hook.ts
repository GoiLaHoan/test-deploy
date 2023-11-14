import { useReducer } from "react";

// yes this is a lazy abstraction
export function useReduce<T>(
  initialState: T,
): [state: T, setField: (update: Partial<T>) => void] {
  const [state, setField] = useReducer(
    (current: T, update: Partial<T>): T => ({
      ...current,
      ...update,
    }),
    initialState,
  );

  return [state, setField];
}
