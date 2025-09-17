/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

import { IoShieldOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

export default function AuthModalContent() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div css={container}>
      {/* 상단 로고/타이틀 */}
      <div>
        <div css={header}>
          <div css={title}>
            <IoShieldOutline size={20}/>
            <h2>비서 AI</h2> 
          </div>
          <IoIosClose size={20} css={clickButton}/>
        </div>
          <p css={description}>AI 가상비서 서비스에 오신 것을 환영합니다</p>
      </div>

      {/* 로그인/회원가입 탭 */}
      <AuthTabs tab={tab} setTab={setTab} />

      {/* 탭에 따른 폼 */}
      <LoginForm />

      {/* 간편 로그인 */}
      <SocialLogin />
    </div>
  );
}

const container = css`
  width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const title = css`
  display: flex;
  align-items: center;
  gap: 5px;
`
const header = css`
  display: flex;
  justify-content: space-between;
  
  text-align: center;
  h2 {
    margin: 8px 0 4px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const description = css`
  font-size: 12px;
  color: #666;
`

const clickButton = css`
  cursor: pointer;
`;

