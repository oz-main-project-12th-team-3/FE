/** @jsxImportSource @emotion/react */
import type { PropsWithChildren } from "react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { css } from "@emotion/react";
import { Stars } from "./stars";

export function DarkThemeBg({ children }: PropsWithChildren<{}>) {
  const { background } = useThemeColors();

  const DarkBgSt = css`
    position: fixed;
    inset: 0;
    background: ${background};
    overflow: hidden;
  `;

  return (
    <div css={DarkBgSt}>
      <Stars />
      {children}
    </div>
  );
}
