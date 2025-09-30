/** @jsxImportSource @emotion/react */
import { useState } from "react";
import type { Message } from "./ChatContent";
import { chatLogApi } from "../../api/chat/chatLog";
import { TbMessageCircle } from "react-icons/tb";
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { SIDEBAR_WIDTH } from "../../store/useMousePositionStore";
import { scrollCss } from "../../styles/mixins";

interface MsgSendBoxProps {
  sessionId: number;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MsgSendBox({ sessionId, setMessages }: MsgSendBoxProps) {
  const [input, setInput] = useState("");
  const { text, scrollColor, background } = useThemeColors();

  // 메시지 전송
  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const newMsg = await chatLogApi.POST.message({
        session_id: sessionId,
        message: input,
        sender: "user",
        is_important: false,
        timestamp: new Date().toISOString(),
      });
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    }
  };

  const colorCss = css`
    background-color: ${background};
    border: 1px solid ${text};
    textarea {
      color: ${text};
    }
    svg {
      color: ${text};
    }
  `;

  return (
    <div css={[msgSendBoxCss, colorCss]}>
      <textarea
        id="user_input"
        css={scrollCss(scrollColor)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onInput={(e) => {
          const target = e.currentTarget;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <TbMessageCircle onClick={handleSend} />
    </div>
  );
}

const msgSendBoxCss = css`
  position: absolute;
  bottom: 1rem;
  display: flex;
  gap: 1rem;
  width: ${SIDEBAR_WIDTH * 3}px;
  border-radius: 0.5rem;
  height: fit-content;
  align-items: center;
  padding: 0.5rem;

  textarea {
    width: 100%;
    max-height: 8rem;
    resize: none;
    overflow-y: auto;
    border: none;
    background-color: transparent;
    width: 100%;
    outline: none;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  svg {
    cursor: pointer;
    font-size: 2rem;
  }
`;
