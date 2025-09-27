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

export const scrollbarHidden = css`
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const sideBarMixin = css`
  ${flexColumn()}
  width: ${SIDEBAR_WIDTH}px;
  div {
    padding: 0.3rem;
  }
  font-size: 1.3rem;
  height: 40rem;
  overflow: hidden;
`;

export const itemMixin = css`
  cursor: pointer;
  background-color: white;
  width: 10rem;
  border-radius: 0.5rem;
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

// 기본 버튼 스타일
export const baseButton = css`
  padding: 0.75rem 1rem;
  background: white;
  border: none;
  border-radius: 8px;
  color: black;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e5e5;
    transform: translateY(-1px);
  }
`;

// 기본 프로필 이미지
export const defaultProfileImage = css`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: white;
  ${flexCenter()};

  &::after {
    content: "👤";
    font-size: 2rem;
  }
`;


// const Card = styled.div`
//   ${flexCenter};
//   background: #f5f5f5;
// `;
// or
// <div css={[flexCenter('column'), myStyle]}>
