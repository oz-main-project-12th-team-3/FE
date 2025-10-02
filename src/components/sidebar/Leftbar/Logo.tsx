/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export function Logo() {
  const navi = useNavigate();
  // 백엔드 쪽에 모델 설정 없음
  const handleClick = () => {
    navi("/");
  };

  return <img src="/logo.png" css={logoCss} onClick={handleClick}></img>;
}

const logoCss = css`
  width: 4rem;
  border-radius: 0.5rem;
  border: 1px solid #ffffff;
  cursor: pointer;
`;
