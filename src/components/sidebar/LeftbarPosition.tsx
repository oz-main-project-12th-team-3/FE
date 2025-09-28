import { motion } from "framer-motion";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_MARGIN,
  useMousePositionStore,
} from "../../store/useMousePositionStore";

export function LeftbarPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();
  const isOpen = whereIsMouse === "left";

  return (
    <motion.div
      initial={{ x: -SIDEBAR_WIDTH - SIDEBAR_MARGIN }}              // 닫힘: 완전 밖
      animate={{ x: isOpen ? 0 : -SIDEBAR_WIDTH - SIDEBAR_MARGIN }} // 열림: 0
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ height: "100%", willChange: "transform" }}           // 부모 높이 상속
    >
      {children}
    </motion.div>
  );
}
