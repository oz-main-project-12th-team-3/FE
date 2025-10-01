/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Chat } from "./chat/Chat";
import { Rightbar } from "./sidebar/Rightbar/Rightbar";
import { useLocation, useParams } from "react-router-dom";
import { Leftbar } from "./sidebar/Leftbar/Leftbar";

export default function Home() {
  const { session_id } = useParams<{ session_id: string }>();
  const location = useLocation();

  const isChatRoute = Boolean(session_id) || location.pathname === "/chat/new";

  return (
    <div css={HomeCss} className="Home">
      <Leftbar />
      <Rightbar />
      {isChatRoute && <Chat />}
    </div>
  );
}

const HomeCss = css`
  display: flex;
  align-items: center;
  height: 100%;
`;
