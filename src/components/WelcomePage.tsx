import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const nav = useNavigate();
  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>🤖</div>
        <h1 style={{ margin: 0 }}>“안녕하세요, 저는 당신의 AI 비서예요!”</h1>
        <div style={featureRow}>
          <span>🧠 AI 학습</span>
          <span>💬 자연 대화</span>
          <span>🛡️ 보안</span>
        </div>
        <button style={ctaBtn} onClick={() => nav("/chat")}>시작하기</button>
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = { minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#000000" };
const card: React.CSSProperties = { textAlign:"center", color:"#fff" };
const featureRow: React.CSSProperties = { display:"flex", gap:24, justifyContent:"center", margin:"20px 0 28px", opacity:.9 };
const ctaBtn: React.CSSProperties = { padding:"14px 28px", borderRadius:12, border:"none", fontSize:18, color:"#fff",
  background:"linear-gradient(90deg,#5073ff 0%,#a249ff 100%)", boxShadow:"0 6px 16px rgba(0,0,0,.25)", cursor:"pointer" };
