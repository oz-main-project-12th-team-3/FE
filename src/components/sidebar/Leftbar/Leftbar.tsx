/** @jsxImportSource @emotion/react */
import { LeftbarPosition } from "./LeftbarPosition";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { flexCenter, spaceBetween } from "../../../styles/mixins";
import { GlassmorphismDesign } from "../../../styles/baseDesign/GlassmorphismDesign";
import { css } from "@emotion/react";
import {
  SIDEBAR_HEIGHT,
  SIDEBAR_WIDTH,
} from "../../../store/useMousePositionStore";
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
          <div css={flexCenter("row")}>
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

export const sideBarSize = css`
  width: ${SIDEBAR_WIDTH}px;
  height: ${SIDEBAR_HEIGHT}px;
`;



