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
import { signupApi, type SignupReq } from "../../../api/auth/signup";
import { storeSignupForm } from "../../../store/storeSignupForm";
import { storeUser } from "../../../store/storeUserEmail";

export default function SignupForm() {
  const navigate = useNavigate();
  const { signupForm, setSignupForm, resetSignupForm } = storeSignupForm();
  const { setUser } = storeUser();
  // 에러 상태
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { modalBackground, descriptionText, aColor, tabBtnText, inputBorder } =
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(signupForm.name);
    const emailError = validateEmail(signupForm.email);
    const passwordError = validatePassword(signupForm.password);
    const confirmPasswordError = validateConfirmPassword(
      signupForm.password,
      signupForm.confirmPassword
    );

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    // enable_2fa 일단 false로 진행
    const signupReqForm: SignupReq = {
      email: signupForm.email,
      password: signupForm.password,
      nickname: signupForm.name,
      enable_2fa: false,
    };

    setErrors(newErrors);

    // 에러 없으면 회원가입 로직 진행
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      // 약관 동의 체크
      // 어느 시점에서 해야하면 좋을 지 모르겠음
      if (!signupForm.agreeTerms) {
        toast.error(
          "이용약관 및 개인정보 처리방침에 동의해야 회원가입이 가능합니다."
        );
        return;
      }
      try {
        const res = await signupApi.POST.signup(signupReqForm);
        setUser(res.email, "");
        // 프로필 이미지 res에 없음
        toast.success(res.detail);
        resetSignupForm();
      } catch (e) {
        toast.error(`회원 가입 중 오류 발생 : ${e}`);
      }
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
          value={signupForm.name}
          onChange={(e) => setSignupForm({ name: e.target.value })}
          leftIcon={<FaUser color={inputBorder} />}
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
          value={signupForm.email}
          onChange={(e) => setSignupForm({ email: e.target.value })}
          leftIcon={<FaEnvelope color={inputBorder} />}
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
          value={signupForm.password}
          onChange={(e) => setSignupForm({ password: e.target.value })}
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
          value={signupForm.confirmPassword}
          onChange={(e) => setSignupForm({ confirmPassword: e.target.value })}
          leftIcon={<FaLock color={inputBorder} />}
          error={errors.confirmPassword}
        />
      </div>

      <label css={agree}>
        <input
          id="agreeTerms"
          type="checkbox"
          checked={signupForm.agreeTerms}
          onChange={(e) => setSignupForm({ agreeTerms: e.target.checked })}
        />
        이용약관 및 개인정보처리방침에 동의합니다
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/modal/terms"); // 약관 모달로 이동
          }}
        >
          자세히 보기
        </a>
      </label>

      <button type="button" onClick={handleSubmit} css={submit}>
        회원가입
      </button>
    </form>
  );
}