/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { RiLockLine, RiShieldLine } from 'react-icons/ri';
import { InputField } from '../../InputField'
import { validatePassword, validateConfirmPassword, validateCurrentPassword } from '../../../utils/validator';
import { useThemeColors } from '../../../hooks/useThemeColors';

const PasswordChangeModal= () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

    const { modalBackground, headerBorder, hoverBtnColor, tabBgColor, completedText, btnBorder, descriptionText, tabBtnText, inputBorder, scheduleTitleColor } =
    useThemeColors();

  const modalContainerStyle = css`
  background: ${modalBackground};
  border-radius: 16px;
  padding: 32px;
  min-width: 440px;
  max-width: 500px;
  position: relative;
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${btnBorder};
`;

const iconContainerStyle = css`
  width: 48px;
  height: 48px;
  background: ${tabBgColor};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: 600;
  color: ${scheduleTitleColor};
  margin: 0 0 4px 0;
`;

const subtitleStyle = css`
  font-size: 14px;
  color: ${descriptionText};
  margin: 0;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const labelStyle = css`
  font-size: 14px;
  font-weight: 600;
  color: ${tabBtnText};
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const submitButtonStyle = css`
  padding: 12px 24px;
  border: none;
  background: ${completedText};
  color: ${modalBackground};
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${hoverBtnColor};
  }
`;

const cancelButtonStyle = css`
  padding: 12px 24px;
  border: 2px solid ${headerBorder};
  background: ${modalBackground};
  color: ${completedText};
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${inputBorder};
    color: ${scheduleTitleColor};
  }
`;

  const handleSubmit = (): void => {
    // 모든 필드 유효성 검사
    const currentPasswordError = validateCurrentPassword(currentPassword);
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(newPassword, confirmPassword);

    const newErrors = {
      currentPassword: currentPasswordError,
      newPassword: newPasswordError,
      confirmPassword: confirmPasswordError,
    };

    setErrors(newErrors);

    // 에러가 있으면 제출하지 않음
    if (currentPasswordError || newPasswordError || confirmPasswordError) {
      return;
    }

    // submit
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div css={modalContainerStyle}>
      <div css={headerStyle}>
        <div css={iconContainerStyle}>
          <RiLockLine size={24} color={inputBorder} />
        </div>
        <div>
          <h2 css={titleStyle}>비밀번호 변경</h2>
          <p css={subtitleStyle}>보안을 위해 안전한 비밀번호로 변경하세요.</p>
        </div>
      </div>

      <div css={contentStyle}>
        <div css={inputGroupStyle}>
          <label css={labelStyle}>현재 비밀번호</label>
          <InputField
            type="password"
            name="currentPassword"
            placeholder="현재 비밀번호를 입력하세요."
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            error={errors.currentPassword}
            leftIcon={<RiLockLine size={20} color={inputBorder} />}
          />
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>새 비밀번호</label>
          <InputField
            type="password"
            name="newPassword"
            placeholder="새 비밀번호를 입력하세요."
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={errors.newPassword}
            leftIcon={<RiShieldLine size={20} color={inputBorder}  />}
          />
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>새 비밀번호 확인</label>
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호를 다시 입력하세요."
            value={confirmPassword}
            onChange={handlePasswordConfirmChange}
            error={errors.confirmPassword}
            leftIcon={<RiShieldLine size={20} color={inputBorder} />}
          />
        </div>
      </div>

      <div css={buttonContainerStyle}>
        <button css={cancelButtonStyle}>
          취소
        </button>
        <button 
          css={submitButtonStyle} 
          onClick={handleSubmit}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeModal;