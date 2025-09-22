/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Chat } from "./chat/Chat";
import { Leftbar } from "./sidebar/Leftbar";
import { Rightbar } from "./sidebar/Rightbar";

export default function Home() {
  return (
    <div css={HomeCss}>
      <Leftbar />
      <Rightbar />
      <Chat />
    </div>
  );
}

const HomeCss = css`
  display:flex;
  align-items:center;
  height:100%;
`