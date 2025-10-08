/** @jsxImportSource @emotion/react */
import { type PropsWithChildren } from "react";
import { storeColorMode } from "../../store/storeColorMode";
// import { themeKeys } from "../../styles/constColors";
// import { LightBg } from "./LightBg";
// import { DarkThemeBg } from "./DarkBg";
import { css } from "@emotion/react";

/**
 * 기존 백그라운드 > 리랜더 보장용 wrapper로 변경
 * 시간 부족 관계로 커스텀 백그라운드에서 rive 로 대체
 */
export default function ContentRerender({ children }: PropsWithChildren<{}>) {
  // 리랜더링 보장용 구독(사용 안하는게 정상)
  const { isDark } = storeColorMode();

  // 기존 커스텀 백그라운드 => Rive로 대체
  // const Wrapper = mode === themeKeys[0] ? DarkThemeBg : LightBg;

  return (
    // <Wrapper>
    <div css={contentWrapper}>{children}</div>
    // </Wrapper>
  );
}

const contentWrapper = css`
  position:fixed;
  inset:0;
`