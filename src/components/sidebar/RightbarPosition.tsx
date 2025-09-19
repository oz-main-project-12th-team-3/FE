import {
  barMargin,
  triggerDistance,
  useMousePositionStore,
} from "../../store/useMousePositionStore";
import { motion } from "framer-motion";

export function RightbarPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();
  return (
    <motion.div
      initial={{ x: triggerDistance }}
      animate={{
        x: whereIsMouse === "right" ? -barMargin : triggerDistance,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
