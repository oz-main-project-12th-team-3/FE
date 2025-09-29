/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { baseButton } from "../../../styles/mixins"

export function ProfileSettings({
  onBack,
  onPasswordClick,
  onDeleteAccount
}: {
  onBack: () => void;
  onPasswordClick: () => void
  onDeleteAccount: () => void
}) {

  const profileSettingCss = css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem 0;
  `;

  return (
    <div css={profileSettingCss}>
      <button css={baseButton} onClick={onPasswordClick}>비밀번호 변경</button>
      <button css={baseButton} onClick={onDeleteAccount}>회원탈퇴</button>
      <button css={baseButton} onClick={onBack}>
        ← 돌아가기
      </button>
    </div>
  );
}
