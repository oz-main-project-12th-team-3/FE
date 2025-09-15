/** @jsxImportSource @emotion/react */
import type { PropsWithChildren } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { css } from "@emotion/react";

export function LightBg({ children }: PropsWithChildren<{}>) {
  const { text, background } = useThemeColors();
  const LightBgSt = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${text};
    overflow: hidden;

    .tile {
      background-color: ${background};
      border: 2px solid ${text};
      border-radius: 2rem;
    }
  `;

  return <div css={LightBgSt}>{children}</div>;
}
