/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { TextInput } from "../../InputFeild";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {buttonBgColor, modalBackground, hoverBtnColor } = useThemeColors()

  const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  margin: 0 auto;
`;

const labelStyle = css`
    font-size: 13px;
    margin-top: 12px;
    margin-bottom: 6px;
`;

const passwordTitleStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p{
    cursor: pointer;
    font-size:11px;
  }
`

const buttonStyle = css`
  background: ${buttonBgColor};
  color: ${modalBackground};
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${hoverBtnColor};
  }
`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <div>



        <div>
          <label htmlFor="login-email" css={labelStyle}>이메일</label>
          <TextInput
            id="login-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<FaRegEnvelope />}
          />
        </div>

        <div>
          <div css={passwordTitleStyle}>
            <label htmlFor="login-password" css={labelStyle}>비밀번호</label>
            <p>비밀번호 찾기</p>
          </div>
          <TextInput
            id="login-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<FaLock />}
            passwordToggle
          />
        </div>
      </div>
      <button type="submit" css={buttonStyle}>
        로그인
      </button>
    </form>
  );
}

