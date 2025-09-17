/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// 소셜로그인 아이콘
import { FaGithub } from 'react-icons/fa';
import googleLogo from '../../../assets/google.png';
import naverLogo from '../../../assets/naver.png';
import kakaoLogo from '../../../assets/kakao.png';
import { useThemeColors } from "../../../hooks/useThemeColors";

export default function SocialLogin() {
  const {descriptionText, modalBackground, btnBorder, hoverSocialBtn} = useThemeColors()

  const wrap = css`
  text-align: center;
  font-size: 14px;
  color: ${descriptionText};
`;

const btnRow = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;

  button {
    border: 1px solid ${btnBorder};
    border-radius: 8px;
    padding: 8px;
    background: ${modalBackground};
    cursor: pointer;

    &:hover{
      background: ${hoverSocialBtn};
    }
  }
`;

const socialIconStyle = css`
    width: 25px;
    margin-right: 10px;
`

  return (
    <div css={wrap}>
      <p>간편 로그인</p>
      <div css={btnRow}>
        <button><img src={googleLogo} css={socialIconStyle}/>Google</button>
        <button><FaGithub size={20} css={socialIconStyle}/>GitHub</button>
        <button><img src={naverLogo} css={socialIconStyle}/>Naver</button>
        <button><img src={kakaoLogo} css={socialIconStyle}/>Kakao</button>
      </div>
    </div>
  );
}
