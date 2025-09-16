import { create } from "zustand";

interface MousePosition {
  x: number | null;
  y: number | null;
  setPosition: (arg0: number, arg1: number) => void;
  getMousePosition: () => { x: number | null; y: number | null };
}

export const useMousePositionStore = create<MousePosition>((set, get) => ({
  x: null,
  y: null,
  setPosition:  (x:number, y:number) => set({ x:x, y:y }),
  getMousePosition: () => {
    const { x, y } = get();
    return { x, y };
  },
}));
