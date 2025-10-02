/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummySchedules } from "../../../api/dummyData/schedule";
import { Notifications } from "../../../api/dummyData/notification";
import { ProfileSection } from "./ProfileSection";
import { MenuSection } from "./MenuSection";
import { TodaySchedule } from "./TodaySchedule";
import { BottomButtons } from "./BottomButtons";
import { ProfileSettings } from "./ProfileSettings";
import { useThemeColors } from "../../../hooks/useThemeColors";
import {
  sideBarMixin
} from "../../../styles/mixins";

const mocUser = {
  username: "user123",
  userEmail: "user123@email.com",
};

export default function RightLogined({
  setIsLogin,
}: {
  setIsLogin: (bool: boolean) => void;
}) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const todaySchedules = dummySchedules.filter(
    (schedule) => schedule.start_time.split("T")[0] === today
  );
  const [items, setItems] = useState(todaySchedules);
  const unreadCount = Notifications.filter((n) => !n.is_read).length;

  const [isProfileSettingOpen, setIsProfileSettingOpen] = useState(false);

  const { modalBackground } = useThemeColors()

  const loginedContainerCss = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
  `;
  const hoverProfile = css`
    cursor: pointer;
  `
  const dividerCss = css`
    background: ${modalBackground};
    margin: 0;
  `;

  return (
    <div css={[sideBarMixin]}>
    <div css={loginedContainerCss}>
      {/* 프로필 영역 (클릭 시 설정 모드 열림) */}
      <div css={hoverProfile} onClick={() => setIsProfileSettingOpen(true)} >
        <ProfileSection username={mocUser.username} email={mocUser.userEmail} />
      </div>

      <hr css={dividerCss} />

      {isProfileSettingOpen ? (
        // 프로필 설정 모드
        <ProfileSettings 
          onBack={() => setIsProfileSettingOpen(false)}
          onChangeProfile={() => navigate("/modal/profilesetting")}
          onChangePassword={() => navigate("/modal/password")} 
          onDeleteAccount={() => navigate("/modal/deleteaccount")}/>
      ) : (
        // 기본 모드
        <>
          <MenuSection
            unreadCount={unreadCount}
            onScheduleClick={() => navigate("/modal/schedule")}
            onNotificationClick={() => navigate("/modal/notification")}
          />
          <hr css={dividerCss} />

          <TodaySchedule items={items} setItems={setItems} />
          <hr css={dividerCss} />

          <BottomButtons
            onLogout={() => setIsLogin(false)}
            onPremium={() => navigate("/premium")}
          />
        </>
      )}
    </div>
    </div>
  );
}
