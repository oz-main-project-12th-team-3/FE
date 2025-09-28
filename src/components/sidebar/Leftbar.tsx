/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { LeftbarPosition } from "./LeftbarPosition";
import { LeftbarWrapper } from "./LeftbarWrapper";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export function Leftbar() {
  return (
    <LeftbarWrapper>
      <LeftbarPosition>
        {/* 바깥 겹: 부모 높이 100% 유지 */}
        <div css={frame}>
          {/* 안쪽 겹: 바로 아래 자식을 강제로 꽉 채우게 */}
          <div css={panel}>
            <GlassmorphismDesign>
              <div css={wrap}>
                <Logo />
                <SearchBar />
                <hr />
                <div css={content}>{/* 리스트/히스토리 섹션 */}</div>
              </div>
            </GlassmorphismDesign>
          </div>
        </div>
      </LeftbarPosition>
    </LeftbarWrapper>
  );
}

const frame = css`
  height: 100%;
  display: flex;
`;

const panel = css`
  flex: 1;
  display: flex;

  /* GlassmorphismDesign의 루트 DOM을 강제로 채우게 */
  > * {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; /* 내부 스크롤 정상화 */
  }
`;

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow: visible; /* 드롭다운 허용 */
`;

const content = css`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
