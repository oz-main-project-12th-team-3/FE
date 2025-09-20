import { useEffect } from "react";
import { useMousePositionStore } from "../../store/useMousePositionStore";

/**
 * 마우스 포지션 실시간으로 스토어에 저장해주는 기능성 컴포넌트
 * requestAnimationFrame으로 성능 개선
 * @returns {null}
 */
export function MousePositonSetter() {
  let raf = 0;
  const onMove = (e: MouseEvent) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      useMousePositionStore.getState().setMousePosition(e.clientX, e.clientY);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", onMove);
    window.addEventListener("dragover", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("dragover", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
