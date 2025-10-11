/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Chat } from "./chat/Chat";
import { Rightbar } from "./sidebar/Rightbar/Rightbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Leftbar } from "./sidebar/Leftbar/Leftbar";
import React, { useEffect, useState } from "react";
import Welcome from "./welcome/WelcomePage";
import { fitScreen } from "../styles/mixins";

const PremiumPage = React.lazy(() => import(`./premium/PremiumPage`));

export default function Home() {
  const { session_id } = useParams<{ session_id: string }>();
  const isChatRoute = Boolean(session_id);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const location = useLocation();
  const isPremiumPage = location.pathname === "/premium";

  useEffect(() => {
    const item = localStorage.getItem("visited");
    const now = Date.now();

    if (item) {
      // 현시간 - 최근 방문시간 비교
      const { timestamp } = JSON.parse(item);
      const expired = now - timestamp > 1000 * 60 * 60 * 24; // 24시간

      if (expired) {
        // 만료 → 초기화
        setIsFirstVisit(true);
        localStorage.setItem("visited", JSON.stringify({ timestamp: now }));
      } else {
        // 아직 유효
        setIsFirstVisit(false);
      }
    } else {
      // 첫 방문
      setIsFirstVisit(true);
      localStorage.setItem("visited", JSON.stringify({ timestamp: now }));
    }
  }, []);

  const renderContent = () => {
    if (isFirstVisit) {
      return <Welcome />;
    }
    if (isPremiumPage) {
      return <PremiumPage />;
    }
    if (isChatRoute) {
      return <Chat />;
    }
  };

  return (
    <div css={HomeCss} className="Home">
      <Leftbar />
      <Rightbar />
      {renderContent()}
    </div>
  );
}

const HomeCss = css`
  display: flex;
  align-items: center;
  ${fitScreen}
`;
