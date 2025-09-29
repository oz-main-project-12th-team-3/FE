/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IoPersonRemoveOutline, IoWarningOutline } from 'react-icons/io5';
import { useThemeColors } from '../../../hooks/useThemeColors';

const DeleteAccountModal = () => {

    const { modalBackground, deleteBtnBg, hoverDeleteBtn, iconContainerBg, descriptionText, worningBoxBg, worningBoxBorder, inputBorder, completedText, headerBorder, scheduleTitleColor } = useThemeColors()

const modalContainerStyle = css`
  background: ${modalBackground};
  border-radius: 16px;
  padding: 32px;
  min-width: 440px;
  max-width: 500px;
`;

const headerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
`;

const iconContainerStyle = css`
  width: 64px;
  height: 64px;
  background: ${iconContainerBg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const titleStyle = css`
  font-size: 20px;
  font-weight: 600;
  color: ${deleteBtnBg};
  margin: 0 0 8px 0;
`;

const subtitleStyle = css`
  font-size: 14px;
  color: ${descriptionText};
  margin: 0;
`;

const warningBoxStyle = css`
  background: ${worningBoxBg};
  border: 2px solid ${worningBoxBorder};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const warningIconStyle = css`
  color: ${deleteBtnBg};
  flex-shrink: 0;
  margin-top: 2px;
`;

const warningTitleStyle = css`
  font-size: 16px;
  font-weight: 600;
  color: ${deleteBtnBg};
  margin: 0 0 4px 0;
`;

const warningTextStyle = css`
  font-size: 14px;
  color: ${hoverDeleteBtn};
  margin: 0;
  line-height: 1.5;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const cancelButtonStyle = css`
  padding: 12px 24px;
  border: 2px solid ${inputBorder};
  background: ${modalBackground};
  color: ${completedText};
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${headerBorder};
    color: ${scheduleTitleColor};
  }
`;

const deleteButtonStyle = css`
  padding: 12px 24px;
  border: none;
  background: ${deleteBtnBg};
  color: ${modalBackground};
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${hoverDeleteBtn};
  }
`;

  const handleCancel = (): void => {
    // 회원 탈퇴 취소
  };

  const handleConfirm = (): void => {
    // 회원 탈퇴 진행
  };

  return (
    <div css={modalContainerStyle}>
      <div css={headerStyle}>
        <div css={iconContainerStyle}>
          <IoPersonRemoveOutline size={32} color={deleteBtnBg} />
        </div>
        <h2 css={titleStyle}>계정 삭제 안내</h2>
        <p css={subtitleStyle}>계정 삭제 전 다음을 확인해주세요.</p>
      </div>

      <div css={warningBoxStyle}>
        <IoWarningOutline css={warningIconStyle} size={24} />
        <div>
          <p css={warningTitleStyle}>주의</p>
          <p css={warningTextStyle}>계정 삭제는 되돌릴 수 없는 작업입니다.</p>
        </div>
      </div>

      <div css={buttonContainerStyle}>
        <button css={cancelButtonStyle} onClick={handleCancel}>
          취소
        </button>
        <button css={deleteButtonStyle} onClick={handleConfirm}>
          계속 진행
        </button>
      </div>
    </div>
  );
};



export default DeleteAccountModal;