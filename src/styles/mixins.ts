import { css } from "@emotion/react";

export const flexCenter = (direction: "row" | "column" = "row") => css`
  display: flex;
  flex-direction: ${direction};
  align-items: center;
  justify-content: center;
`;

// const Card = styled.div`
//   ${flexCenter};
//   background: #f5f5f5;
// `;
// or
// <div css={[flexCenter('column'), myStyle]}>
