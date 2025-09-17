import { css } from "@emotion/react";

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

export const flexWrap = (gap?: "0.5rem", padding?: "0.5rem") => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
  padding: ${padding};
`;

// const Card = styled.div`
//   ${flexCenter};
//   background: #f5f5f5;
// `;
// or
// <div css={[flexCenter('column'), myStyle]}>
