/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import { ChatPosition } from "./ChatPosition";
import { SIDEBAR_WIDTH } from "../../store/useMousePositionStore";
import { useThemeColors } from "../../hooks/useThemeColors";

interface Message {
  id: number;
  message: string;
  sender: string;
  is_important: boolean;
  timestamp: string;
}

export function Chat() {
  const message1: Message = { id: mocData[0].id, ...mocData[0].detail };
  const message2: Message = { id: mocData[1].id, ...mocData[1].detail };

  const messageArr = [message1, message2];

  const {text} = useThemeColors();

  const textColorCss = css`
    color:${text};
  `

  return (
    <ChatPosition>
      <div css={[centerCss]}>
        <GlassmorphismDesign>
          <div css={chatBoxCss}>
            {messageArr.map((el) => (
              <div css={[speechBubble, textColorCss, el.sender === "user"&&speechBubbleUser]} key={el.id}>{el.message}</div>
            ))}
          </div>
        </GlassmorphismDesign>
        <GlassmorphismDesign>
          <div css={userChatBoxCss}></div>
        </GlassmorphismDesign>
      </div>
    </ChatPosition>
  );
}

const centerCss = css`
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  gap: 2rem;
`;

const chatBoxCss = css`
  width: ${SIDEBAR_WIDTH * 3}px;
  height: 33rem;
`;

const userChatBoxCss = css`
  width: ${SIDEBAR_WIDTH * 3}px;
  height: 5rem;
`;

const speechBubble = css`
  max-width: 90%;
`;
const speechBubbleUser = css`
  margin-left: auto;
  border-radius: 0.5rem;
  width: fit-content;
`;

const mocData = [
  {
    id: 1,
    user_id: 1,
    session_id: 10,
    detail: {
      message: "안녕하세요!",
      sender: "user",
      is_important: false,
      timestamp: "2025-09-19T10:30:00Z",
    },
    created_at: "2025-09-19T10:30:00Z",
    updated_at: "2025-09-19T10:30:00Z",
  },
  {
    id: 2,
    user_id: 1,
    session_id: 10,
    detail: {
      message: "안녕하세요, 무엇을 도와드릴까요?",
      sender: "ai",
      is_important: true,
      timestamp: "2025-09-19T10:31:00Z",
    },
    created_at: "2025-09-19T10:31:00Z",
    updated_at: "2025-09-19T10:31:00Z",
  },
];
