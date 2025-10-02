/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { useThemeColors } from '../../../hooks/useThemeColors';

interface NicknameProps {
  nickname: string;
  onNicknameChange: (newNickname: string) => void;
  disabled?: boolean;
}

const Nickname = ({ nickname, onNicknameChange, disabled = false }: NicknameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { scheduleTitleColor, modalBackground, tabBgColor, addButtonBg, inputBorder, hoverSocialBtn } = useThemeColors();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setTempNickname(nickname);
  }, [nickname]);

  const sectionStyle = css`
    margin-bottom: 32px;
  `;

  const sectionTitleRowStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  `;

  const sectionTitleStyle = css`
    font-size: 16px;
    font-weight: 600;
    color: ${scheduleTitleColor};
  `;

  const nicknameContainerStyle = css`
    padding: 16px;
    background: ${tabBgColor};
    border-radius: 12px;
  `;

  const nicknameInputStyle = css`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid ${inputBorder};
    border-radius: 6px;
    font-size: 14px;
    background: ${modalBackground};
    color: ${scheduleTitleColor};
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${addButtonBg};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  const nicknameDisplayStyle = css`
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    color: ${scheduleTitleColor};
    text-align: center;
    font-weight: 500;
  `;

  const buttonStyle = css`
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid ${inputBorder};
    background: ${modalBackground};
    color: ${scheduleTitleColor};

    &:hover:not(:disabled) {
      background: ${hoverSocialBtn};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const buttonGroupStyle = css`
    display: flex;
    gap: 8px;
  `;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };

  const handleSave = () => {
    const trimmedNickname = tempNickname.trim();
    if (trimmedNickname === '') {
      setTempNickname(nickname);
      setIsEditing(false);
      return;
    }
    
    if (trimmedNickname !== nickname) {
      onNicknameChange(trimmedNickname);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempNickname(nickname);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div css={sectionStyle}>
      {/* 제목 + 버튼 */}
      <div css={sectionTitleRowStyle}>
        <h3 css={sectionTitleStyle}>닉네임</h3>
        <div css={buttonGroupStyle}>
          {!isEditing ? (
            <button css={buttonStyle} onClick={handleEdit} disabled={disabled} type="button">
              <MdEdit size={16} />
              편집
            </button>
          ) : (
            <>
              <button css={buttonStyle} onClick={handleSave} disabled={disabled} type="button">
                저장
              </button>
              <button css={buttonStyle} onClick={handleCancel} disabled={disabled} type="button">
                취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* 닉네임 표시 영역 */}
      <div css={nicknameContainerStyle}>
        {isEditing ? (
          <input
            ref={inputRef}
            css={nicknameInputStyle}
            type="text"
            value={tempNickname}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            maxLength={20}
          />
        ) : (
          <div css={nicknameDisplayStyle}>{nickname}</div>
        )}
      </div>
    </div>
  );
};

export default Nickname;
