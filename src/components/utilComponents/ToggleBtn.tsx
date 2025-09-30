/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";

export function ToggleBtn ({bool, toggle}:{bool:boolean, toggle:() => void}) {
    const { text, background } = useThemeColors();
      const colorCss = css`
    border: 1px solid ${text};
    background-color: ${background};
    .circle {
      background-color: ${text};
    }
  `;

  return (
    <motion.div
      css={[DarkWhiteModeBtnCss, colorCss]}
      onClick={toggle}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="circle"
        layout
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

const DarkWhiteModeBtnCss = css`
  --btn-height: 2rem;
  width: calc(var(--btn-height) * 2);
  height: var(--btn-height);
  border-radius: 1.5rem;
  position: relative;

  .circle {
    height: calc(var(--btn-height) * 0.9);
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left:calc(var(--btn-height) * 0.5);
  }
`;
