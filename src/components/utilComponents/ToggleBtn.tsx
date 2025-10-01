/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import React from "react";
// import { useThemeColors } from "../../hooks/useThemeColors";

export const ToggleBtn = React.memo(
  ({ bool, toggle }: { bool: boolean; toggle: () => void }) => {
    // const { text, background } = useThemeColors();
    // const colorCss = css`
    //   border: 1px solid ${text};
    //   background-color: ${background};
    //   .circle {
    //     background-color: ${text};
    //   }
    // `;

    return (
      <motion.div
        css={[DarkWhiteModeBtnCss]}
        onClick={toggle}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="circle"
          initial={{ x: bool ? 16 : -15 }}
          animate={{
            x: bool ? 16 : -15,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.div>
    );
  }
);

const DarkWhiteModeBtnCss = css`
  --btn-height: 2rem;
  width: calc(var(--btn-height) * 2);
  height: var(--btn-height);
  border-radius: 1.5rem;
  position: relative;

  border: 1px solid #fff;
  background-color: #000;

  .circle {
    height: calc(var(--btn-height) * 0.9);
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: calc(var(--btn-height) * 0.5);
    
    border: 1px solid #000;
    background-color: #fff;
  }
`;
