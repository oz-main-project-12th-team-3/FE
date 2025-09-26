/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { LeftbarPosition } from "./LeftbarPosition";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export function Leftbar() {
  return (
    <LeftbarPosition>
      <GlassmorphismDesign css={wrap}> 
        <Logo />
        <SearchBar />
        <hr />
        <div css={content}>{/* 리스트/히스토리 섹션 */}</div>
      </GlassmorphismDesign>
    </LeftbarPosition>
  );
}

/* minimal styles */
const wrap = css`
  width: 100%;
  height: 100%;            /* 프레임 높이 상속 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: visible;       /* 드롭다운 허용 */
`;

const content = css`
  flex: 1;
  min-height: 0;          /* 내부 스크롤 정상화 */
  overflow-y: auto;       /* 내용 많아지면 내부만 스크롤 */
`;
