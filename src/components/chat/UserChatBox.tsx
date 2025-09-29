/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../hooks/useThemeColors";
import type { Message } from "./ChatContent";

export function UserChatBox({ msg }: { msg: Message }) {
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
