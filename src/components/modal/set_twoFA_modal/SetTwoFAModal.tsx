/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { apiTwoFA } from "../../../api/twofa/twofa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { flexCenter, flexColumn } from "../../../styles/mixins";
import { TokenManager } from "../../../api/apiClient";

export default function SetTwoFAModal() {
  const navigate = useNavigate();
  const { background, text } = useThemeColors();

  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const containerColor = css`
    background: ${background};
    color: ${text};
  `;

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        const response = await apiTwoFA.GET.QR();
        setQrCode(response.qr);
        if (response.secret) {
          setSecret(response.secret);
        }
        setLoading(false);
      } catch (err) {
        toast.error("QR 코드를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };
    fetchQRCode();
  }, []);

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("6자리 인증 코드를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await apiTwoFA.POST.success({ code });

      if (response.token) {
        TokenManager.setTokens(response.token);
        toast.success("2FA 설정이 완료되었습니다!");
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "인증에 실패했습니다. 코드를 다시 확인해주세요.");
      toast.error("인증에 실패했습니다.");
      setLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(value);
    setError("");
  };

  if (loading && !qrCode) {
    return (
      <div css={[layout.container, containerColor]}>
        <div css={flexCenter("row", "3rem")}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div css={[layout.container, containerColor]}>
      <h2 css={layout.title}>2단계 인증 설정</h2>

      <StepIndicator currentStep={step} />

      <div css={flexColumn("1.5rem")}>
        {step === 1 ? (
          <>
            <p css={layout.instruction}>
              1. Google Authenticator 또는 Authy 같은 인증 앱을 열어주세요.
              <br />
              2. 아래 QR 코드를 스캔하거나 수동으로 코드를 입력하세요.
            </p>

            {qrCode && <QRSection qrCode={qrCode} />}
            {secret && <SecretSection secret={secret} />}
            {error && <div css={layout.error}>{error}</div>}

            <ButtonGroup onNext={() => setStep(2)} />
          </>
        ) : (
          <>
            <p css={layout.instruction}>
              인증 앱에 표시된 6자리 코드를 입력해주세요.
            </p>

            <InputSection value={code} onChange={handleCodeChange} />
            {error && <div css={layout.error}>{error}</div>}

            <ButtonGroup
              onPrev={() => setStep(1)}
              onNext={handleSubmit}
              loading={loading}
              disabled={code.length !== 6}
              showPrev
              nextLabel="확인"
            />
          </>
        )}
      </div>
    </div>
  );
}

// StepIndicator 컴포넌트
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const { componentBorder, ozPurple } = useThemeColors();

  const stepStyle = css`
    ${flexCenter("row", "0", "0.5rem")}
    margin-bottom: 2rem;
  `;

  const dotStyle = (isActive: boolean) => css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${isActive ? ozPurple : componentBorder};
    transition: background 0.3s;
  `;

  return (
    <div css={stepStyle}>
      <div css={dotStyle(currentStep === 1)} />
      <div css={dotStyle(currentStep === 2)} />
    </div>
  );
};

// QRSection 컴포넌트
const QRSection = ({ qrCode }: { qrCode: string }) => {
  const { componentBorder } = useThemeColors();

  const qrContainerStyle = css`
    ${layout.sectionBox}
    ${flexCenter("column", "1rem", "1rem")}
  `;

  const qrImageStyle = css`
    width: 200px;
    height: 200px;
    border: 2px solid ${componentBorder};
    border-radius: 0.5rem;
    background: white;
    padding: 0.5rem;
  `;

  return (
    <div css={qrContainerStyle}>
      <img src={qrCode} alt="2FA QR Code" css={qrImageStyle} />
    </div>
  );
};

// SecretSection 컴포넌트
const SecretSection = ({ secret }: { secret: string }) => {
  const { componentBorder, ozPurple } = useThemeColors();

  const secretContainerStyle = css`
    ${layout.sectionBox}
    border: 1px solid ${componentBorder};
  `;

  const labelStyle = css`
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    opacity: 0.7;
  `;

  const codeStyle = css`
    font-family: "Courier New", monospace;
    font-size: 0.95rem;
    word-break: break-all;
    color: ${ozPurple};
  `;

  return (
    <div css={secretContainerStyle}>
      <div css={labelStyle}>수동 입력 코드</div>
      <div css={codeStyle}>{secret}</div>
    </div>
  );
};

// InputSection 컴포넌트
const InputSection = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { componentBorder, background, text, ozPurple } = useThemeColors();

  const inputContainerStyle = css`
    ${flexColumn("0.5rem")}
  `;

  const labelStyle = css`
    font-size: 0.9rem;
    font-weight: 500;
  `;

  const inputStyle = css`
    padding: 0.75rem;
    border: 1px solid ${componentBorder};
    border-radius: 0.5rem;
    font-size: 1.2rem;
    letter-spacing: 0.5rem;
    text-align: center;
    font-family: "Courier New", monospace;
    background: ${background};
    color: ${text};
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: ${ozPurple};
    }
    &::placeholder {
      letter-spacing: normal;
    }
  `;

  return (
    <div css={inputContainerStyle}>
      <label css={labelStyle}>인증 코드</label>
      <input
        type="text"
        inputMode="numeric"
        placeholder="000000"
        value={value}
        onChange={onChange}
        css={inputStyle}
        maxLength={6}
        autoFocus
      />
    </div>
  );
};

// ButtonGroup 컴포넌트
const ButtonGroup = ({
  onPrev,
  onNext,
  loading,
  disabled,
  showPrev = false,
  nextLabel = "다음",
}: {
  onPrev?: () => void;
  onNext: () => void;
  loading?: boolean;
  disabled?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
}) => {
  const { text, componentBorder, ozPurple } = useThemeColors();

  const buttonGroupStyle = css`
    ${flexCenter("row", "0", "0.75rem")}
    margin-top: 1rem;
  `;

  const primaryButtonStyle = css`
    ${layout.button}
    background: ${ozPurple};
    color: white;
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `;

  const secondaryButtonStyle = css`
    ${layout.button}
    background: transparent;
    color: ${text};
    border: 1px solid ${componentBorder};
    &:hover {
      background: rgba(128, 128, 128, 0.05);
    }
  `;

  return (
    <div css={buttonGroupStyle}>
      {showPrev && (
        <button css={secondaryButtonStyle} onClick={onPrev}>
          이전
        </button>
      )}
      <button
        css={primaryButtonStyle}
        onClick={onNext}
        disabled={disabled || loading}
      >
        {loading ? "확인 중..." : nextLabel}
      </button>
    </div>
  );
};

// 컴포넌트별 레이아웃 스타일
const layout = {
  container: css`
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 450px;
    max-height: 90vh;
    overflow-y: auto;
  `,
  title: css`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
  `,
  instruction: css`
    font-size: 0.9rem;
    line-height: 1.6;
    opacity: 0.8;
  `,
  sectionBox: css`
    padding: 1rem;
    background: rgba(128, 128, 128, 0.05);
    border-radius: 0.5rem;
  `,
  error: css`
    color: #ef4444;
    font-size: 0.875rem;
    text-align: center;
    padding: 0.5rem;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 0.25rem;
  `,
  button: css`
    flex: 1;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1rem;
    border: none;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
};
