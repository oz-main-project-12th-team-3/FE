/** @jsxImportSource @emotion/react */
import {
  flexCenter,
  baseButton,
  defaultProfileImage
} from "../../../styles/mixins";
import { css } from "@emotion/react";
import { FaCrown } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";

export default function RightLogouted({
  setIsLogin,
}: {
  setIsLogin: (bool: boolean) => void;
}) {
  const {  } = useThemeColors()
  const openLoginModal = () => {
    setIsLogin(true);
  };

  return (
    <div css={[flexCenter(), logoutContainerCss]}>
      <div css={defaultProfileCss}>
        <div css={[defaultProfileImage]}></div>
      </div>
      <div css={logoutButtonSectionCss}>
        <button css={baseButton} onClick={openLoginModal}>
          로그인
        </button>
        <button css={premiumButtonCss} onClick={openLoginModal}>
          <FaCrown css={crownIconCss} />
          프리미엄
        </button>
      </div>
    </div>
  );
}

const premiumButtonCss = css`
  padding: 0.75rem 1rem;
  background: white;
  border: none;
  border-radius: 8px;
  color: black;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #e5e5e5;
    transform: translateY(-1px);
  }
`;

const crownIconCss = css`
  font-size: 1rem;
  color: #ffd700;
`;

const logoutContainerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
`;

const defaultProfileCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const logoutButtonSectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;