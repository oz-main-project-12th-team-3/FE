// src/components/Home.tsx
import React from "react";

export default function Home() {
  return (
    <div style={wrap}>
      <section style={panel}>
        <h1 style={title}>AI 채팅</h1>

        {/* 채팅 영역(스크롤 가능) */}
        <div style={chatArea}>
          <div style={leftBubble}>안녕하세요! 저는 AI 비서예요.</div>
          <div style={rightBubble}>안녕! 반가워요.</div>
        </div>

        {/* 입력 영역 */}
        <form style={composer} onSubmit={(e) => e.preventDefault()}>
          <div style={inputWrap}>
            <input
              placeholder="메시지를 입력하세요"
              style={input}
              aria-label="메시지 입력"
            />
            <button type="button" aria-label="음성 입력" style={iconBtn}>
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

          <button type="submit" style={sendBtn}>보내기</button>
        </form>
      </section>
    </div>
  );
}

/* ===== styles ===== */
const panelBg = "rgba(60, 64, 130, 0.7)"; 
const purple = "#8E6BFF";

const wrap: React.CSSProperties = {
  minHeight: "calc(100vh - 40px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 20px", // 화면 가장자리 여백
};

const panel: React.CSSProperties = {
  width: "min(980px, 94vw)",
  minHeight: "70vh",                // ✅ 채팅이 없어도 패널이 넓게 보이게
  background: panelBg,
  borderRadius: 24,
  padding: "28px 28px 24px",
  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
  color: "white",

  display: "flex",                  // ✅ 세로 배치
  flexDirection: "column",
  justifyContent: "space-between",  // 제목 위 / 입력창 아래 고정
  gap: 16,
};

const title: React.CSSProperties = {
  margin: "6px 0 4px",
  fontSize: 34,
  fontWeight: 800,
  letterSpacing: "-0.3px",
};

const chatArea: React.CSSProperties = {
  flex: 1,                          // ✅ 남는 공간을 채팅 영역이 차지
  overflowY: "auto",
  padding: "12px 4px 8px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const leftBubble: React.CSSProperties = {
  background: "#A8A6FF",
  color: "#1b1b1f",
  padding: "12px 16px",
  borderRadius: 12,
  width: "fit-content",
  maxWidth: "80%",
};

const rightBubble: React.CSSProperties = {
  background: "#0b0b12",
  color: "#fff",
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
  background: "rgba(255,255,255,0.9)",
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
  color: purple,
  cursor: "pointer",
};

const sendBtn: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 12,
  border: "none",
  background: purple,
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};
