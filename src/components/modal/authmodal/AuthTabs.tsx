/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Props {
  tab: "login" | "register";
  setTab: (tab: "login" | "register") => void;
}

export default function AuthTabs({ tab, setTab }: Props) {
  return (
    <div css={tabs}>
      <button
        css={[tabButton, tab === "login" && active]}
        onClick={() => setTab("login")}
      >
        로그인
      </button>
      <button
        css={[tabButton, tab === "register" && active]}
        onClick={() => setTab("register")}
      >
        회원가입
      </button>
    </div>
  );
}

const tabs = css`
  display: flex;
  justify-content: space-between;
  background: #f3f3f3;
  border-radius: 30px;
  padding: 4px;
`;

const tabButton = css`
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 0;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  color: #555;
`;

const active = css`
  background: #fff;
  font-weight: bold;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;
