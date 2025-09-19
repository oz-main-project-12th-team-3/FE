import { useEffect } from "react";
import { useDeviceTypeStore } from "../../store/useDeviceTypeStore";
import { useWindowWidthStore } from "../../store/useWindowWidthStore";

const MOBILE_THRESHOLD = 640;

/**
 * 브라우저 너비 계산 및 저장용 기능성 컴포넌트
 * @returns {null}
 */
export default function WindowSizeProvider() {
  const setWindowWidth = useWindowWidthStore((s) => s.setWindowWidth);
  const setPlatform = useDeviceTypeStore((s) => s.setPlatform);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let prevPlatform = useDeviceTypeStore.getState().platform;

    const handle = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      const newPlatform = w < MOBILE_THRESHOLD ? "mobile" : "desktop";
      if (prevPlatform !== newPlatform) {
        setPlatform(newPlatform);
        prevPlatform = newPlatform;
      }
    };

    handle(); // 초기 실행
    let raf = 0;
    const onResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handle);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [setWindowWidth, setPlatform]);

  return null;
}
