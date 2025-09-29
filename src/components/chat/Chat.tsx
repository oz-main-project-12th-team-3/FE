import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { ChatContent } from "./ChatContent";
import { ChatPosition } from "./ChatPosition";

export function Chat() {
  return (
    <ChatPosition>
      <GlassmorphismDesign>
        <ChatContent/>
      </GlassmorphismDesign>
    </ChatPosition>
  );
}
