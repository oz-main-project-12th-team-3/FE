import { create } from "zustand";

interface MousePositionState {
  mousePosition: { x: number | null; y: number | null };
  setMousePosition: (x: number | null, y: number | null) => void;
}

export const useMousePositionStore = create<MousePositionState>((set) => ({
  mousePosition: { x: null, y: null },
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}));
