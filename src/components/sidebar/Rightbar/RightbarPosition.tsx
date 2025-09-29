/** @jsxImportSource @emotion/react */
import {
  SIDEBAR_MARGIN,
  SIDEBAR_WIDTH,
  useMousePositionStore,
} from "../../../store/useMousePositionStore";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

export function RightbarPosition({ children }: { children: React.ReactNode }) {
  const { whereIsMouse } = useMousePositionStore();
  return (
    <motion.div
      css={rightFix}
      initial={{ x: SIDEBAR_WIDTH + SIDEBAR_MARGIN }}
      animate={{
        x:
          whereIsMouse === "right"
            ? -SIDEBAR_MARGIN
            : SIDEBAR_WIDTH + SIDEBAR_MARGIN,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
const rightFix = css`
  position: fixed;
  right: 0;
`;
