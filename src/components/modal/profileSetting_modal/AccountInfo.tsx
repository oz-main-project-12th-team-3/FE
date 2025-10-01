/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useThemeColors } from '../../../hooks/useThemeColors';

interface AccountInfoSectionProps {
  nickname: string;
  email: string;
  profileImageUrl?: string | null;
}

const AccountInfo = ({ nickname, email, profileImageUrl }: AccountInfoSectionProps) => {
  const { tabBgColor, scheduleTitleColor } = useThemeColors();

  const sectionStyle = css`
    margin-bottom: 32px;
  `;

  const sectionTitleStyle = css`
    font-size: 16px;
    font-weight: 600;
    color: ${scheduleTitleColor};
    margin-bottom: 16px;
  `;

  const accountBoxStyle = css`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: ${tabBgColor};
    border-radius: 12px;
    margin-bottom: 8px;
  `;

  const profileImageWrapperStyle = css`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${scheduleTitleColor};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  `;

  const profileImageStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  const initialStyle = css`
    font-size: 24px;
    font-weight: 600;
    color: ${scheduleTitleColor};
  `;

  const accountInfoStyle = css`
    flex: 1;
    min-width: 0;
  `;

  const nicknameStyle = css`
    font-size: 16px;
    font-weight: 600;
    color: ${scheduleTitleColor};
    margin-bottom: 4px;
  `;

  const emailStyle = css`
    font-size: 14px;
    color: ${scheduleTitleColor};
    opacity: 0.6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  const noteStyle = css`
    font-size: 12px;
    color: ${scheduleTitleColor};
    opacity: 0.5;
    margin-top: 8px;
  `;

  const getInitial = () => {
    if (!nickname) return 'T';
    return nickname.charAt(0).toUpperCase();
  };

  return (
    <div css={sectionStyle}>
      <h3 css={sectionTitleStyle}>계정 정보</h3>
      <div css={accountBoxStyle}>
        <div css={profileImageWrapperStyle}>
          {profileImageUrl ? (
            <img src={profileImageUrl} alt="프로필" css={profileImageStyle} />
          ) : (
            <span css={initialStyle}>{getInitial()}</span>
          )}
        </div>
        <div css={accountInfoStyle}>
          <div css={nicknameStyle}>{nickname}</div>
          <div css={emailStyle}>{email}</div>
        </div>
      </div>
      <p css={noteStyle}>* 이메일 변경은 고객센터에 문의해주세요.</p>
    </div>
  );
};

export default AccountInfo;