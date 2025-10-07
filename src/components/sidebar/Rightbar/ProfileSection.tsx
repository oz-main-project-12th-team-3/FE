/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { defaultProfileImage, flexCenter } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";

export function ProfileSection({
  //  username,
  email,
  userProfileImg,
}: {
  //  username: string;
  email: string;
  userProfileImg: string;
}) {
  const {
    // modalBackground,
    completedText,
  } = useThemeColors();

  const profileSectionCss = css`
    display: flex;
    align-items: center;
  `;
  const profileIconCss = css`
    position: relative;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: white;
      ${flexCenter()};
    }
  `;
  const profileInfoCss = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;
  // const usernameCss = css`
  //   font-size: 1rem;
  //   font-weight: 600;
  //   color: ${modalBackground};
  // `;
  const emailCss = css`
    font-size: 0.75rem;
    color: ${completedText};
  `;

  return (
    <div css={profileSectionCss}>
      <div css={profileIconCss}>
        {userProfileImg ? (
          <img src={userProfileImg} />
        ) : (
          <div css={defaultProfileImage} />
        )}
      </div>
      <div css={profileInfoCss}>
        {/* <div css={usernameCss}>{username}</div> */}
        <div css={emailCss}>{email}</div>
      </div>
    </div>
  );
}
