import create from "zustand";

interface Store {
  joined: number;
  setJoined(joined: number): void;
}

export const useJoinedStore = create<Store>((set) => ({
  joined: 0,
  setJoined: (joined) => set({ joined }),
}));
