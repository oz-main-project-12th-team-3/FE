/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { InputField } from "../../InputField";
import { useThemeColors } from "../../../hooks/useThemeColors";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../../utils/validator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupForm() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // 에러 상태
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { modalBackground, descriptionText, aColor, tabBtnText } =
    useThemeColors();

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

    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.password,
      form.confirmPassword
    );

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    // 에러 없으면 회원가입 로직 진행
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      // 약관 동의 체크
      if (!form.agreeTerms) {
        toast.error("이용약관 및 개인정보 처리방침에 동의해야 회원가입이 가능합니다.");
        return;
      }
      console.log("회원가입 시도:", { form });
      // TODO: 실제 회원가입 API 호출
  }
  };

  return (
    <form noValidate css={formStyle}>
      <div>
        <label htmlFor="signup-name" css={labelStyle}>
          이름
        </label>
        <InputField
          type="text"
          name="signup-name"
          placeholder="홍길동"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          leftIcon={<FaUser />}
          error={errors.name}
        />
      </div>

      <div>
        <label htmlFor="signup-email" css={labelStyle}>
          이메일
        </label>
        <InputField
          name="signup-email"
          placeholder="your@email.com"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          leftIcon={<FaEnvelope />}
          error={errors.email}
        />
      </div>

      <div>
        <label htmlFor="signup-password" css={labelStyle}>
          비밀번호
        </label>
        <InputField
          name="signup-password"
          placeholder="안전한 비밀번호를 입력하세요"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          leftIcon={<FaLock />}
          error={errors.password}
        />
      </div>

      <div>
        <label htmlFor="signup-confirm" css={labelStyle}>
          비밀번호 확인
        </label>
        <InputField
          name="signup-confirm"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          leftIcon={<FaLock />}
          error={errors.confirmPassword}
        />
      </div>

      <label css={agree}>
        <input
          id="agreeTerms"
          id="agreeTerms"
          type="checkbox"
          checked={form.agreeTerms}
          onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
        />
        이용약관 및 개인정보처리방침에 동의합니다
        <a href="#" onClick={(e) => {
          e.preventDefault();
          navigate("/modal/terms"); // 약관 모달로 이동
        }}>자세히 보기</a>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          navigate("/modal/terms"); // 약관 모달로 이동
        }}>자세히 보기</a>
      </label>

      <button type="button" onClick={handleSubmit} css={submit}>
        회원가입
      </button>
    </form>
  );
}
