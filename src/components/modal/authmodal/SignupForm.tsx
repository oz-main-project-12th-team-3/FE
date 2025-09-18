/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { InputField } from "../../InputField"; // 경로 확인 필요
import { useThemeColors } from "../../../hooks/useThemeColors";
import { validatorConfirmPassword, validatorEmail, validatorName, validatorPassword } from "../../../utils/validator";

export default function SignupForm() {
  const [form, setForm] = useState({ name:'', email: '', password: '', confirmPassword:'', agreeTerms: false });

  // 에러 상태 (추후 유효성 검사 시 활용 가능)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { modalBackground, descriptionText, aColor, tabBtnText} = useThemeColors()

  const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const agree = css`
  font-size: 12px;
  color: ${descriptionText};

  a {
    color: ${aColor};
    margin-left: 4px;
  }

  input {
    margin-right: 4px;
  }
`;

const labelStyle = css`
    font-size: 13px;
    margin-top: 12px;
    margin-bottom: 6px;
  `;

const submit = css`
  padding: 12px;
  border-radius: 8px;
  background: ${tabBtnText};
  color: ${modalBackground};
  font-weight: bold;
  cursor: pointer;
`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validatorName(form.name);
    const emailError = validatorEmail(form.email);
    const passwordError = validatorPassword(form.password);
    const confirmPasswordError = validatorConfirmPassword(form.password, form.confirmPassword);

    const newErrors = {
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword:confirmPasswordError
    };

    setErrors(newErrors);

    // 에러 없으면 로그인 로직 진행
    if (!emailError && !passwordError) {
      console.log("회원가입 시도:", {form});
    }
  };

  
  return (
    <form noValidate css={formStyle} onSubmit={handleSubmit}>
        <div>
            <label htmlFor="signup-name" css={labelStyle}>이름</label>
            <InputField
                name="signup-name"
                placeholder="홍길동"
                value={form.name}
                onChange={(e) => setForm({...form, name:e.target.value})}
                leftIcon={<FaUser />}
                error={errors.name}
            />
        </div>


        <div>
            <label htmlFor="signup-email" css={labelStyle}>이메일</label>
            <InputField
                name="signup-email"
                placeholder="your@email.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email:e.target.value})}
                leftIcon={<FaEnvelope />}
                error={errors.email}
            />
        </div>

        <div>
            <label htmlFor="signup-password" css={labelStyle}>비밀번호</label>
            <InputField
                name="signup-password"
                placeholder="안전한 비밀번호를 입력하세요"
                type="password"
                value={form.password}
                onChange={(e) => setForm({...form, password:e.target.value})}
                leftIcon={<FaLock />}
                passwordToggle
                error={errors.password}
            />
        </div>


        <div>
            <label htmlFor="signup-confirm" css={labelStyle}>비밀번호 확인</label>
            <InputField
                name="signup-confirm"
                placeholder="비밀번호를 다시 입력하세요"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({...form, confirmPassword:e.target.value})}
                leftIcon={<FaLock />}
                passwordToggle
                error={errors.confirmPassword}
            />
        </div>

      <label css={agree}>
        <input
          type="checkbox"
          checked={form.agreeTerms}
          onChange={(e) => setForm({...form, agreeTerms:e.target.checked})}
        />
        이용약관 및 개인정보처리방침에 동의합니다
        <a href="#">자세히 보기</a>
      </label>

      <button type="submit" css={submit}>회원가입</button>
    </form>
  );
}
