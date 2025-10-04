/** @jsxImportSource @emotion/react */
import { type PropsWithChildren } from "react";
import { storeColorMode } from "../../store/storeColorMode";
import { themeKeys } from "../../styles/constColors";
import { LightBg } from "./LightBg";
import { DarkThemeBg } from "./DarkBg";

export default function Background({ children }: PropsWithChildren<{}>) {
  const mode = storeColorMode((state) => state.mode);
  const Wrapper = mode === themeKeys[0] ? DarkThemeBg : LightBg;
  
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}
