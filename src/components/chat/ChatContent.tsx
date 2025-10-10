/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { toast, type ToastOptions } from "react-toastify";
import { useParams } from "react-router-dom";
import { AIChatBox } from "./AIChatBox";
import { UserChatBox } from "./UserChatBox";
import { MsgSendBox } from "./MsgSendBox";
import { useThemeColors } from "../../hooks/useThemeColors";
import { css } from "@emotion/react";
import { SIDEBAR_WIDTH } from "../../store/useMousePositionStore";
// import { dummyMessages } from "../../api/dummyData/dummyChat";
import { scrollCss } from "../../styles/mixins";
import { AnimatePresence, motion } from "framer-motion";
import { apiChat } from "../../api/chat/chatSession";

export function ChatContent() {
  const [messages, setMessages] = useState<Chat.Log[]>([]);
  const { session_id } = useParams<{ session_id: string }>();
  const sessionId = Number(session_id);
  const { text, scrollColor } = useThemeColors();
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 20;

  // 세션별 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // const res = await chatLogApi.GET.messagesBySessionId(sessionId);
        const pageOption: API.PageReq = {
          page: page,
          page_size: PAGE_SIZE,
        };
        const res = await apiChat.GET.messagesBySessionId(
          sessionId,
          pageOption
        );
        setMessages(res.results);
        setPage((p) => p + 1);
      } catch (err: unknown) {
        toast.error("메시지 불러오기 실패:", err as ToastOptions<unknown>);
      } finally {
        // 일단 더미데이터 활용
        // setMessages(
        //   dummyMessages.filter((msg) => msg.session_id === sessionId)
        // );
      }
    };
    fetchMessages();
  }, [sessionId]);

  const borderColorCss = css`
    border-color: ${text};
  `;

  return (
    <div css={chatContentCss}>
      <AnimatePresence mode="wait">
        <motion.div
          key={sessionId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="chats"
          css={scrollCss(scrollColor)}
        >
          {messages.map((el) => (
            <>
              {el.sender === "ai" ? (
                <AIChatBox msg={el} />
              ) : (
                <UserChatBox msg={el} />
              )}
              <hr css={borderColorCss} />
            </>
          ))}
          <MsgSendBox sessionId={sessionId} setMessages={setMessages} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const chatContentCss = css`
  width: ${SIDEBAR_WIDTH * 3}px;
  height: 40rem;
  padding-bottom: 4rem;

  .chats {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: auto;
    max-height: 100%;
    padding-bottom: 10rem;

    hr {
      opacity: 0.3;
      margin: auto;
      width: 80%;
    }
  }
`;
