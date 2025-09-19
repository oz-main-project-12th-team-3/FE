import { create } from "zustand";
import { useWindowWidthStore } from "./useWindowWidthStore";
import { useDeviceTypeStore } from "./useDeviceTypeStore";

/**
 * x좌표 트리거
 */
export type WhereIsMouse = "center" | "left" | "right";

export const triggerDistance = 200;
export const barMargin = 50;
interface MousePositionState {
  mousePosition: { x: number | null; y: number | null };
  whereIsMouse: WhereIsMouse;
  setMousePosition: (x: number | null, y: number | null) => void;
}

/**
 * 커서 UI를 사용하는 모든 컴포넌트들을 위한 스토어
 */
export const useMousePositionStore = create<MousePositionState>((set) => ({
  mousePosition: { x: null, y: null },
  whereIsMouse: "center",
  setMousePosition: (x, y) => {
    let where: WhereIsMouse = "center";
    const windowWidth = useWindowWidthStore.getState().windowWidth;
    if (useDeviceTypeStore.getState().platform !== "desktop") return;

    if (x !== null) {
      if (x < triggerDistance) where = "left";
      else if (x > windowWidth - triggerDistance) where = "right";
    }
    set({ mousePosition: { x, y }, whereIsMouse: where });
  },
}));
