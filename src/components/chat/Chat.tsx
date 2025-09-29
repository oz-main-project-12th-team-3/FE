import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { ChatContent } from "./ChatContent";
import { ChatPosition } from "./ChatPosition";
import { SIDEBAR_WIDTH } from "../../store/useMousePositionStore";
import { useThemeColors } from "../../hooks/useThemeColors";

export function Chat() {
  return (
    <ChatPosition>
      <GlassmorphismDesign>
        <ChatContent/>
      </GlassmorphismDesign>
    </ChatPosition>
  );
}
