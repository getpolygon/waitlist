import create from "zustand";

interface Store {
    count: number;
    setCount(count: number): void;
}

export const useCountStore = create<Store>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
}));
