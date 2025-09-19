import {
  BAR_MARGIN,
  TRIGGER_DISTANCE,
  useMousePositionStore,
} from "../../store/useMousePositionStore";
import { motion } from "framer-motion";

export function LeftbarPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();
  return (
    <motion.div
      initial={{ x: -TRIGGER_DISTANCE }}
      animate={{
        x: whereIsMouse === "left" ? BAR_MARGIN : -TRIGGER_DISTANCE,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
