/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { storeColorMode } from "../../../store/storeColorMode";
import { themeKeys } from "../../../styles/constColors";
import { ToggleBtn } from "../../utilComponents/ToggleBtn";
import {
  SIDEBAR_MARGIN,
  SIDEBAR_WIDTH,
  useMousePositionStore,
} from "../../../store/useMousePositionStore";
import { css } from "@emotion/react";

export function ThemeModeBtn() {
  const { mode, toggle } = storeColorMode();
  const { whereIsMouse } = useMousePositionStore();

  return (
    <motion.div
      initial={{
        x:
          whereIsMouse === "left"
            ? SIDEBAR_MARGIN
            : -SIDEBAR_WIDTH - SIDEBAR_MARGIN,
      }}
      animate={{
        x:
          whereIsMouse === "left"
            ? SIDEBAR_MARGIN
            : -SIDEBAR_WIDTH - SIDEBAR_MARGIN,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div css={positionCss} className="mode_btn">
        <ToggleBtn bool={mode === themeKeys[0]} toggle={toggle} />
      </div>
    </motion.div>
  );
}

const positionCss = css`
  position: absolute;

`