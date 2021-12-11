import create from "zustand";

interface Store {
  joined: boolean;
  setJoined(joined: boolean): void;
}

export const useJoinedStore = create<Store>((set) => ({
  joined: false,
  setJoined: (joined) => set({ joined }),
}));
