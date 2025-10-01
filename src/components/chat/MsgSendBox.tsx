/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import type { Message } from "./ChatContent";
import { chatLogApi } from "../../api/chat/chatLog";
import { TbMessageCircle } from "react-icons/tb";
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { SIDEBAR_WIDTH } from "../../store/useMousePositionStore";
import { scrollCss } from "../../styles/mixins";
import { storeVoiceChat } from "../../store/storeVoiceChat";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { voiceLogApi } from "../../api/voice/voiceLog";
import { toast } from "react-toastify";
import { TokenManager } from "../../api/apiClient";

interface MsgSendBoxProps {
  sessionId: number;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function MsgSendBox({ sessionId, setMessages }: MsgSendBoxProps) {
  const [input, setInput] = useState("");
  const { text, scrollColor, background } = useThemeColors();
  const { isVoiceOn } = storeVoiceChat();
  const userId = TokenManager.getUserId();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  const handleVoiceChat = async () => {
    if (isRecording) {
      // 녹음 중지
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    } else {
      if (!userId) {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        toast.info("로그인이 필요한 서비스 입니다.");
        return;
      }
      // 녹음 시작
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          await uploadAudioToServer(audioBlob);

          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (e) {
        toast.error(`마이크 접근 실패: ${e}`);
      }
    }
  };

  // 오디오를 서버에 업로드
  const uploadAudioToServer = async (audioBlob: Blob) => {
    if (!userId) return;
    try {
      const base64Audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(audioBlob);
      });
      const payload = {
        user_id: userId,
        session_id: sessionId,
        input_audio_url: base64Audio,
      };

      const res = await voiceLogApi.POST.voiceLog(payload);

      if (res.transcribed_text) {
        setInput(res.transcribed_text);
      }

      setIsRecording(false);
    } catch (e) {
      toast.error(`음성 업로드 실패: ${e}`);
      setIsRecording(false);
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
      {isVoiceOn && (
        <div onClick={handleVoiceChat}>
          {isRecording ? (
            <IoMdMic title="현재 녹음 중!" className="recoding" />
          ) : (
            <IoMdMicOff title="버튼을 눌러 음성채팅을 시작하세요" />
          )}
        </div>
      )}
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
    min-height: 3rem;
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
    flex-shrink:0;
    font-size: 2rem;
  }
`;
