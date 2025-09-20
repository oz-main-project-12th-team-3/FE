import { create } from "zustand";

interface WindowWidth {
  windowWidth: number;
  setWindowWidth: (w: number) => void;
}

/**
 * 브라우저 너비 저장 스토어
 */
export const useWindowWidthStore = create<WindowWidth>((set) => ({
  windowWidth: 0,
  setWindowWidth: (w) => set({ windowWidth: w }),
}));
