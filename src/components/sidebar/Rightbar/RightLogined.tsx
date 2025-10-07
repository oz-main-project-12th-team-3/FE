/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { dummySchedules } from "../../../api/dummyData/schedule";
// import { dummyNotifications } from "../../../api/dummyData/notification";
import { ProfileSection } from "./ProfileSection";
import { MenuSection } from "./MenuSection";
import { TodaySchedule } from "./TodaySchedule";
import { BottomButtons } from "./BottomButtons";
import { ProfileSettings } from "./ProfileSettings";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { sideBarMixin } from "../../../styles/mixins";
import { loginApi } from "../../../api/auth/login";
import { toast } from "react-toastify";
import { storeUserEmail } from "../../../store/storeUserEmail";
import { type Schedule, scheduleAPI } from "../../../api/schedule/schdule";
import { apiNoti } from "../../../api/notification/notification";

export default function RightLogined({
  setIsLogin,
}: {
  setIsLogin: (bool: boolean) => void;
}) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([]);
  const [isProfileSettingOpen, setIsProfileSettingOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { userEmail, userProfileImg } = storeUserEmail();

  const { modalBackground } = useThemeColors();

  useEffect(() => {
    (async () => {
      try {
        const res = await scheduleAPI.GET.allSchedules();
        setTodaySchedules(
          res.filter((s) => s.start_time.split("T")[0] === today)
        );
      } catch (error) {
        toast.error(`일정 불러오기 중 에러 발생:${error}`);
      }
    })();
  }, [todaySchedules]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiNoti.GET.notifications("unread");
        setUnreadCount(res.length);
      } catch (error) {
        toast.error(`알림 불러오기 중 에러 발생:${error}`);
      }
    })();
  }, [unreadCount]);

  const loginedContainerCss = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
  `;
  const hoverProfile = css`
    cursor: pointer;
  `;
  const dividerCss = css`
    background: ${modalBackground};
    margin: 0;
  `;

  const goToPremium = () => {
    // 프리미엄 페이지로 이동
  };

  const handleRoute = (link: string) => {
    navigate(`${link}`, {
      state: { prevPath: location.pathname },
    });
  };

  const handleLogout = async () => {
    try {
      const res = await loginApi.POST.logout();
      toast.success(res.detail);
    } catch (error) {
      toast.error(`로그아웃 실패 : ${error}`);
    } finally {
      setIsLogin(false);
      // 토큰 클리어는 loginApi쪽에 있음
    }
  };

  return (
    <div css={[sideBarMixin]}>
      <div css={loginedContainerCss}>
        {/* 프로필 영역 (클릭 시 설정 모드 열림) */}
        <div css={hoverProfile} onClick={() => setIsProfileSettingOpen(true)}>
          <ProfileSection
            // username={}
            // login res 에서 username을 안줌
            email={userEmail}
            userProfileImg={userProfileImg}
          />
        </div>

        <hr css={dividerCss} />

        {isProfileSettingOpen ? (
          // 프로필 설정 모드
          <ProfileSettings
            onBack={() => setIsProfileSettingOpen(false)}
            onChangeProfile={() => navigate("/modal/profilesetting")}
            onChangePassword={() => navigate("/modal/password")}
            onDeleteAccount={() => handleRoute("/modal/deleteaccount")}
          />
        ) : (
          // 기본 모드
          <>
            <MenuSection
              unreadCount={unreadCount}
              onScheduleClick={() => handleRoute("/modal/schedule")}
              onNotificationClick={() => handleRoute("/modal/notification")}
            />
            <hr css={dividerCss} />

            <TodaySchedule
              items={todaySchedules}
              setItems={setTodaySchedules}
            />
            <hr css={dividerCss} />

            {/* 하단 버튼들 */}
            <BottomButtons onLogout={handleLogout} onPremium={goToPremium} />
          </>
        )}
      </div>
    </div>
  );
}
