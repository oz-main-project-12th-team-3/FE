import { useEffect, useState } from "react";
import { chatLogApi } from "../../api/chat/chatLog";
import { toast, type ToastOptions } from "react-toastify";
import { useParams } from "react-router-dom";

type Sender = "user" | "ai";

interface Message {
  id: number;
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
}

export function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const {session_id} = useParams<{ session_id: string }>();
  const sessionId = Number(session_id)

  // 세션별 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await chatLogApi.GET.messagesBySessionId(sessionId);
        setMessages(res);
      } catch (err: unknown) {
        toast.error("메시지 불러오기 실패:", err as ToastOptions<unknown>);
      }
    };
    fetchMessages();
  }, [sessionId]);

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

  return (
    <div>
      {/* 메시지 리스트 */}
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <p>{msg.message}</p>
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
}
