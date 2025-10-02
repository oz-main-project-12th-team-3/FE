/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// 소셜로그인 아이콘
import google_login from '../../../../public/socialAuth/google_login.png';
import github from '../../../../public/socialAuth/github.png';
import naver_login from '../../../../public/socialAuth/naver_login.png';
import kakao_login from '../../../../public/socialAuth/kakao_login.png';
import { useThemeColors } from "../../../hooks/useThemeColors";

export default function SocialLogin() {
  const { descriptionText } = useThemeColors();

  const wrap = css`
    text-align: center;
    font-size: 14px;
    color: ${descriptionText};
  `;

  const btnGrid = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 16px;
  `;

  const socialButton = css`
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    
    img {
      width: 100%;
      height: auto;
      display: block;
    }

    &:hover {
      opacity: 0.9;
    }
  `;

  const divider = css`
    border: none;
    border-top: 1px solid #e5e7eb;
  `;

  const githubBtn = css`
    border: none;
    border-radius: 8px;
    background: #24292e;
    color: white;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    &:hover {
      background: #1b1f23;
    }

    img{
        width: 20px;
        height: 20px;
    }
  `

  return (
    <>
      <hr css={divider} />
      <div css={wrap}>
        <p>간편 로그인</p>
        <div css={btnGrid}>
          <button css={socialButton}>
            <img src={naver_login} alt="Naver Login" />
          </button>
          <button css={socialButton}>
            <img src={kakao_login} alt="Kakao Login" />
          </button>
          <button css={socialButton}>
            <img src={google_login} alt="Google Login" />
          </button>
          <button css={[socialButton, githubBtn]}>
            <img src={github} alt="GitHub Login" />
            Sign in with
          </button>
        </div>
      </div>
    </>
  );
}