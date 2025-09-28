/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SIDEBAR_MARGIN, SIDEBAR_WIDTH } from "../../store/useMousePositionStore";

export function LeftbarWrapper({ children }: { children: React.ReactNode }) {
  return <div css={wrap}>{children}</div>;
}

const wrap = css`
  position: fixed;
  left: ${SIDEBAR_MARGIN}px;
  top: ${SIDEBAR_MARGIN}px;
  width: ${SIDEBAR_WIDTH}px;
  height: 700px;        /* 바 길이 조절 */
  overflow: visible;
  z-index: 999;
`;
