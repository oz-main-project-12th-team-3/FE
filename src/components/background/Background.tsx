/** @jsxImportSource @emotion/react */
import { type PropsWithChildren } from "react";
import { css } from "@emotion/react";

/**
 * 기존 백그라운드 > 리랜더 보장용 wrapper로 변경
 * 시간 부족 관계로 커스텀 백그라운드에서 rive 로 대체
 */
export default function ContentRerender({ children }: PropsWithChildren<{}>) {

  return (
    <div css={contentWrapper}>{children}</div>
  );
}

const contentWrapper = css`
  position:fixed;
  inset:0;
`