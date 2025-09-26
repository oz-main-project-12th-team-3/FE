import {
  SIDEBAR_MARGIN,
  SIDEBAR_WIDTH,
  useMousePositionStore,
} from "../../store/useMousePositionStore";
import { motion } from "framer-motion";

export function LeftbarPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();

  return (
    <motion.div
      initial={{ x: -SIDEBAR_WIDTH - SIDEBAR_MARGIN }}
      animate={{
        x:
          whereIsMouse === "left"
            ? SIDEBAR_MARGIN
            : -SIDEBAR_WIDTH - SIDEBAR_MARGIN,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        top: SIDEBAR_MARGIN,
        left: 0,
        width: SIDEBAR_WIDTH,
        height: `calc(100vh - ${SIDEBAR_MARGIN * 2}px)`,
        overflow: "visible", // 드롭다운 안 잘림
        zIndex: 999,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
