/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export function Logo() {
  // 백엔드 쪽에 모델 설정 없음
  const logoCss = css`
    width: 4rem;
    border-radius: 0.5rem;
    border:1px solid #ffffff;
  `;
  return <img src="/logo.png" css={logoCss}></img>;
}
