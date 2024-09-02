import { create } from "zustand";

interface CountState {
  counts: { [key: string]: number };
  increment: (key: string) => void;
  decrement: (key: string) => void;
  setCount: (key: string, value: number) => void;
}

export const useCountStore = create<CountState>((set) => ({
  counts: {},
  increment: (key) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [key]:
          (state.counts[key] || 0) < 10
            ? (state.counts[key] || 0) + 1
            : state.counts[key],
      },
    })),
  decrement: (key) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [key]: state.counts[key] > 0 ? state.counts[key] - 1 : 0,
      },
    })),
  setCount: (key, value) =>
    set((state) => ({
      counts: {
        ...state.counts,
        [key]: value,
      },
    })),
}));
