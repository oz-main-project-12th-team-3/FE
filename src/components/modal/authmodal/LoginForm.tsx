/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { InputField } from "../../InputField";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { validateEmail, validatePassword } from "../../../utils/validator";
import { loginApi, type LoginReq } from "../../../api/auth/login";
import { toast } from "react-toastify";
import { storeUserEmail } from "../../../store/storeUserEmail";

export default function LoginForm() {
  const [form, setForm] = useState<LoginReq>({ email: "", password: "" });
  const { setUserEmail: setEmail } = storeUserEmail();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // console.log(form);

    // 에러 없으면 로그인 로직 진행
    if (!emailError && !passwordError) {
      try {
        const res = await loginApi.POST.login(form);
        setEmail(res.email);

        toast.success(res.detail);
      } catch (e) {
        toast.error(`로그인 에러 발생 : ${e}`);
      }
    }
  };

  return (
    <form css={formStyle}>
      <div>
        <div>
          <label htmlFor="login-email" css={labelStyle}>
            이메일
          </label>
          <InputField
            type="text"
            name="login-email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            leftIcon={<FaEnvelope />}
            error={errors.email}
          />
        </div>

        <div>
          <div css={passwordTitleStyle}>
            <label htmlFor="login-password" css={labelStyle}>
              비밀번호
            </label>
            <p>비밀번호 찾기</p>
          </div>
          <InputField
            type="password"
            name="login-password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            leftIcon={<FaLock />}
            error={errors.password}
          />
        </div>
      </div>

      <button type="button" onClick={handleSubmit} css={buttonStyle}>
        로그인
      </button>
    </form>
  );
}
