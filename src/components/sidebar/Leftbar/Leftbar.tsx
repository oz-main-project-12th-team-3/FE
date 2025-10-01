/** @jsxImportSource @emotion/react */
import { LeftbarPosition } from "./LeftbarPosition";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { flexCenter, sideBarSize, spaceBetween } from "../../../styles/mixins";
import { GlassmorphismDesign } from "../../../styles/baseDesign/GlassmorphismDesign";
import { css } from "@emotion/react";
import { ThemeModeBtn } from "./ThemeModeBtn";
import { Searchbar } from "./Searchbar";
import { NewChat } from "./NewChatBtn";
import { VoiceChat } from "./VoiceChat";
import { ChatLogs } from "./ChatLogs";
import { Logo } from "./Logo";

export function Leftbar() {
  const { text } = useThemeColors();

  const sidebarColor = css`
    hr {
      border-color: ${text};
      opacity: 0.2;
    }
  `;

  return (
    <LeftbarPosition>
      <GlassmorphismDesign>
        <div css={[sideBarSize, sidebarColor]}>
          <div css={[flexCenter("row"), spaceBetween]}>
            <Logo />
              <ThemeModeBtn />
          </div>
          <hr />
          <div css={[flexCenter("row", "0", "0.5rem")]}>
            <Searchbar />
            <NewChat />
          </div>
          <hr />
          <VoiceChat />
          <hr />
          <ChatLogs />
        </div>
      </GlassmorphismDesign>
    </LeftbarPosition>
  );
}

