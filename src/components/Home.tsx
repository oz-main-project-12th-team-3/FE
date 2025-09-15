// src/components/Home.tsx
import React from "react";
import { useThemeColorsWithTokens } from "../hooks/useThemeColors";

export default function Home() {
  const colors = useThemeColorsWithTokens();

  return (
    <div style={wrap}>
      <section
        style={{
          ...panel,
          background: `${colors.chatSurface}E6`, // #3C4082 + 투명도(약 90%)
          color: colors.text,
        }}
      >
        <h1 style={title}>AI 채팅</h1>

        {/* 채팅 영역(스크롤 가능) */}
        <div style={chatArea}>
          <div style={{ ...leftBubble, background: colors.bubbleLeft, color: "#1b1b1f" }}>
            안녕하세요! 저는 AI 비서예요.
          </div>
          <div style={{ ...rightBubble, background: colors.bubbleRight, color: colors.textOnDark }}>
            안녕! 반가워요.
          </div>
        </div>

        {/* 입력 영역 */}
        <form style={composer} onSubmit={(e) => e.preventDefault()}>
          <div style={{ ...inputWrap, background: colors.inputBg }}>
            <input
              placeholder="메시지를 입력하세요"
              style={input}
              aria-label="메시지 입력"
            />
            <button type="button" aria-label="음성 입력" style={{ ...iconBtn, color: colors.accent }}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0M12 19v3m-4 0h8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <button type="submit" style={{ ...sendBtn, background: colors.accent }}>
            보내기
          </button>
        </form>
      </section>
    </div>
  );
}

/* ===== styles (레이아웃만 유지) ===== */
const wrap: React.CSSProperties = {
  minHeight: "calc(100vh - 40px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 20px",
};

const panel: React.CSSProperties = {
  width: "min(980px, 94vw)",
  minHeight: "70vh",
  borderRadius: 24,
  padding: "28px 28px 24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
};

const title: React.CSSProperties = {
  margin: "6px 0 4px",
  fontSize: 34,
  fontWeight: 800,
  letterSpacing: "-0.3px",
};

const chatArea: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "12px 4px 8px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const leftBubble: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  width: "fit-content",
  maxWidth: "80%",
};

const rightBubble: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  width: "fit-content",
  maxWidth: "80%",
  marginLeft: "auto",
};

const composer: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginTop: 8,
};

const inputWrap: React.CSSProperties = {
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: 12,
  paddingRight: 36,
};

const input: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  padding: "12px 14px",
  borderRadius: 12,
  fontSize: 16,
  color: "#1b1b1f",
};

const iconBtn: React.CSSProperties = {
  position: "absolute",
  right: 10,
  width: 26,
  height: 26,
  borderRadius: 999,
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const sendBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  border: "none",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
