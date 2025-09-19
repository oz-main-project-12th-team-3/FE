import { useMemo } from "react";
import {
  BAR_MARGIN,
  useMousePositionStore,
} from "../../store/useMousePositionStore";
import { motion } from "framer-motion";



export function ChatPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();

  const chatX = useMemo(() => {
    const positions = {
      center: 0,
      left: BAR_MARGIN,
      right: -BAR_MARGIN,
    };
    return positions[whereIsMouse] ?? 0;
  }, [whereIsMouse]);

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: chatX,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
