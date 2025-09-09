import { create } from "zustand";

interface MousePosition {
  x: number | null;
  y: number | null;
  setPosition: (val: [number, number]) => void;
  getMousePosition: () => { x: number | null; y: number | null };
}

export const useMousePositionStore = create<MousePosition>((set, get) => ({
  x: null,
  y: null,
  setPosition: (val) => set(() => ({ x: val[0], y: val[1] })),
  getMousePosition: () => {
    const { x, y } = get();
    return { x, y };
  },
}));
