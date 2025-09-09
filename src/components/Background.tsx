/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { flexCenter } from "../styles/mixins";
import { useThemeColors } from "../hooks/useThemeColors";
import type { PropsWithChildren } from "react";

export default function Background({ children }: PropsWithChildren<{}>) {
  const { gradientBg1, gradientBg2, gradientBg3 } = useThemeColors();

  const backgroundSt = css`
    position: fixed;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${gradientBg1},
      ${gradientBg2},
      ${gradientBg3}
    );
    background-size: 170% 170%;
    animation: waveGradient 10s ease infinite;

    @keyframes waveGradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;

  return <div css={[flexCenter("column"), backgroundSt]}>{children}</div>;
}
