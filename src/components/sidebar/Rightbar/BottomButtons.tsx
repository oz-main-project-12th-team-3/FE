/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaCrown } from "react-icons/fa";
import { baseButton } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";

export function BottomButtons({
  onLogout,
  onPremium,
}: {
  onLogout: () => void;
  onPremium: () => void;
}) {
  const { crownIcon } = useThemeColors()
  const buttonSectionCss = css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `;
  const crownIconCss = css`
    font-size: 1rem;
    color: ${crownIcon};
  `;

  return (
    <div css={buttonSectionCss}>
      <button css={baseButton} onClick={onLogout}>
        로그아웃
      </button>
      <button css={baseButton} onClick={onPremium}>
        <FaCrown css={crownIconCss} />
        프리미엄
      </button>
    </div>
  );
}
