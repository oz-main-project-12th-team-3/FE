/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import {
  SIDEBAR_MARGIN,
  useMousePositionStore,
} from "../../store/useMousePositionStore";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const centerPosition = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;

export function ChatPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();

  const chatX = useMemo(() => {
    const positions = {
      center: 0,
      left: SIDEBAR_MARGIN,
      right: -SIDEBAR_MARGIN,
    };
    return positions[whereIsMouse] ?? 0;
  }, [whereIsMouse]);

  return (
    <motion.div
      css={centerPosition}
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
