/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import { wordBreak } from "../../styles/mixins";

export function AIChatBox({ msg }: { msg: Chat.Log }) {
  const { text } = useThemeColors();
  const AIChatBoxCss = css`
    width: 100%;
    height: fit-content;
    color: ${text};
    ${wordBreak}
  `;
  return <div css={AIChatBoxCss}>{msg.message}</div>;
}
