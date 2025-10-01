/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import { MdUpload } from 'react-icons/md';
import { useThemeColors } from '../../../hooks/useThemeColors';

interface ProfileImageProps {
  previewImage: string | null;
  nickname: string;
  onImageChange: (imageUrl: string) => void;
  disabled?: boolean;
}

const ProfileImage = ({ 
  previewImage, 
  nickname, 
  onImageChange,
  disabled = false 
}: ProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scheduleTitleColor, modalBackground, inputBorder, hoverSocialBtn } = useThemeColors();

  const sectionStyle = css`
    margin-bottom: 32px;
  `;

  const sectionTitleStyle = css`
    font-size: 16px;
    font-weight: 600;
    color: ${scheduleTitleColor};
    margin-bottom: 16px;
  `;

  const imageContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  `;

  const largeImageWrapperStyle = css`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;

  const profileImageStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const largeInitialStyle = css`
    font-size: 60px;
    font-weight: 600;
  `;

  const uploadButtonStyle = css`
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
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

  const uploadHintStyle = css`
    text-align: center;
    font-size: 12px;
    color: ${scheduleTitleColor};
    opacity: 0.5;
    margin-top: 8px;
  `;

  const hiddenInputStyle = css`
    display: none;
  `;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getInitial = () => {
    if (!nickname) return 'T';
    return nickname.charAt(0).toUpperCase();
  };

  return (
    <div css={sectionStyle}>
      <h3 css={sectionTitleStyle}>프로필 이미지</h3>
      <div css={imageContainerStyle}>
        <div css={largeImageWrapperStyle}>
          {previewImage ? (
            <img src={previewImage} alt="프로필 미리보기" css={profileImageStyle} />
          ) : (
            <span css={largeInitialStyle}>{getInitial()}</span>
          )}
        </div>
      </div>
      <button
        css={uploadButtonStyle}
        onClick={handleUploadClick}
        disabled={disabled}
        type="button"
      >
        <MdUpload size={20} />
        이미지 업로드
      </button>
      <p css={uploadHintStyle}>JPG, PNG 파일을 업로드하세요 (최대 5MB)</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        css={hiddenInputStyle}
        aria-label="이미지 파일 선택"
      />
    </div>
  );
};

export default ProfileImage;