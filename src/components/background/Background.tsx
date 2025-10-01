/** @jsxImportSource @emotion/react */
import { type PropsWithChildren } from "react";
import { storeColorMode } from "../../store/storeColorMode";
import { themeKeys } from "../../styles/constColors";
import { LightBg } from "./LightBg";
import { DarkThemeBg } from "./DarkBg";
import { Logo } from "./Logo";

export default function Background({ children }: PropsWithChildren<{}>) {
  const mode = storeColorMode((state) => state.mode);
  const content = (
    <>
      <Logo />
      {children}
    </>
  );

  if (mode === themeKeys[0]) return <DarkThemeBg>{content}</DarkThemeBg>;
  return <LightBg>{content}</LightBg>;
}
