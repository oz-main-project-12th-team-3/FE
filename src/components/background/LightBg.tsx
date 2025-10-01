/** @jsxImportSource @emotion/react */
import type { PropsWithChildren } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { css } from "@emotion/react";

export function LightBg({ children }: PropsWithChildren<{}>) {
  const { background } = useThemeColors();
  const LightBgSt = css`
    position: fixed;
    inset: 0;
    background: ${background};
    overflow: hidden;
  `;

  return <div css={LightBgSt}>{children}</div>;
}
