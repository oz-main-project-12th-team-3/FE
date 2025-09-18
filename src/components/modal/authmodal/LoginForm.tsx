/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { InputField } from "../../InputField";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { validatorEmail, validatorPassword } from "../../../utils/validator";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const { buttonBgColor, modalBackground, hoverBtnColor } = useThemeColors();

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

    p {
      cursor: pointer;
      font-size: 11px;
    }
  `;

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

    const emailError = validatorEmail(form.email);
    const passwordError = validatorPassword(form.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // 에러 없으면 로그인 로직 진행
    if (!emailError && !passwordError) {
      console.log("로그인 시도:", {form});
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="login-email" css={labelStyle}>이메일</label>
          <InputField
            name="login-email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({...form, email:e.target.value})}
            leftIcon={<FaEnvelope />}
            error={errors.email}
          />
        </div>

        <div>
          <div css={passwordTitleStyle}>
            <label htmlFor="login-password" css={labelStyle}>비밀번호</label>
            <p>비밀번호 찾기</p>
          </div>
          <InputField
            name="login-password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={(e) => setForm({...form, password:e.target.value})}
            leftIcon={<FaLock />}
            passwordToggle
            error={errors.password}
          />
        </div>
      </div>

      <button type="submit" css={buttonStyle}>
        로그인
      </button>
    </form>
  );
}
