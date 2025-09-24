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
      initial={{ x: -SIDEBAR_WIDTH-SIDEBAR_MARGIN }}
      animate={{
        x: whereIsMouse === "left" ? SIDEBAR_MARGIN : -SIDEBAR_WIDTH-SIDEBAR_MARGIN,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
