/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";

export function UserChatBox({ msg }: { msg: Chat.Log }) {
  const { text } = useThemeColors();
  const UserChatBoxCss = css`
    width: fit-content;
    padding:0.2rem 1rem;
    max-width: 90%;
    color: ${text};
    border: 1px solid ${text};
    border-radius: 0.5rem;
    margin-left:auto;
  `;
  return <div css={UserChatBoxCss}>{msg.message}</div>;
}
