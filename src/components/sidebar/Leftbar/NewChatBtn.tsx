/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { flexCenter } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { apiChat } from "../../../api/chat/chatSession";
import { toast } from "react-toastify";

export function NewChat() {
  const { text } = useThemeColors();
  const navi = useNavigate();

  const colorCss = css`
    svg {
      color: ${text};
    }
  `;

  const newChat: Partial<Chat.Session> = {
    title: "새 채팅",
  };

  const handleNewChat = async () => {
    try {
      // partial로 받는지 확인 필요함
      const res = await apiChat.POST.chatSession(newChat);
      navi(`/chat/${res.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "새 채팅 생성 실패");
    }
  };

  return (
    <div css={[NewChatCss, colorCss]} onClick={handleNewChat}>
      <TbEdit title="새 채팅" />
    </div>
  );
}

const NewChatCss = css`
  ${flexCenter()}
  cursor: pointer;
  svg {
    font-size: 2rem;
  }
`;
