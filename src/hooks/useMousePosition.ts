import { useMousePositionStore } from "../store/useMousePositionStore";

export function setMousePosition(x: number, y: number) {
  const { setPosition } = useMousePositionStore();
  setPosition([x, y]);
  return [x, y];
}
