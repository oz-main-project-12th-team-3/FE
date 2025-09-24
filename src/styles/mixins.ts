import { css } from "@emotion/react";
import { SIDEBAR_WIDTH } from "../store/useMousePositionStore";

export const flexCenter = (direction: "row" | "column" = "row") => css`
  display: flex;
  flex-direction: ${direction};
  align-items: center;
  justify-content: center;
`;

export const overlay = css`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(8px);
  z-index: 1000; // 모달이 토스트 메시지보다 아래로 오게 z-index 설정
`;

export const flexWrap = (
  gap: string = "0.5rem",
  padding: string = "0.5rem"
) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
  padding: ${padding};
`;

export const flexColumn = (gap: string = "1rem") =>
  css`
    display: flex;
    flex-direction: column;
    gap: ${gap};
  `;

export const grid = (
  grid_template_columns: string = "1fr",
  gap: string = "1rem"
) => css`
  display: grid;
  grid-template-columns: ${grid_template_columns};
  gap: ${gap};
`;

export const scrollCss = (color: string) => css`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${color};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${color};
  }
`;

export const sideBarMixin = css`
  ${flexColumn()}
  width: ${SIDEBAR_WIDTH}px;
  div {
    border-radius: 0.5rem;
    padding: 0.3rem;
  }
  font-size: 1.3rem;
  height: 40rem;
  overflow: hidden;
`;

export const itemMixin = css`
  cursor: pointer;
`;

export function SidebarColor(text: string, background: string) {
  return css`
    div {
      background-color: ${text};
      color: ${background};
    }
    hr {
      border-color: ${text};
    }
    span {
      color: ${text};
    }
  `;
}

// const Card = styled.div`
//   ${flexCenter};
//   background: #f5f5f5;
// `;
// or
// <div css={[flexCenter('column'), myStyle]}>
