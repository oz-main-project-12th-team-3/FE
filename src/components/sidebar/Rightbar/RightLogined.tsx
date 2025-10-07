/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummySchedules } from "../../../api/dummyData/schedule";
import { dummyNotifications } from "../../../api/dummyData/notification";
import { ProfileSection } from "./ProfileSection";
import { MenuSection } from "./MenuSection";
import { TodaySchedule } from "./TodaySchedule";
import { BottomButtons } from "./BottomButtons";
import { ProfileSettings } from "./ProfileSettings";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { flexCenter, itemMixin, scrollbarHidden, sideBarMixin } from "../../../styles/mixins";
import { loginApi } from "../../../api/auth/login";
import { FaClock } from "react-icons/fa";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";
import { MdAccessTime } from "react-icons/md";
import { formatTime } from "../../../utils/time";
import { toast } from "react-toastify";


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
  const unreadCount = dummyNotifications.filter((n) => !n.is_read).length;

  const [isProfileSettingOpen, setIsProfileSettingOpen] = useState(false);

  const {
    modalBackground,
    inputBorder,
    tabBtnText,
    scheduleTitleColor,

  } = useThemeColors();

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

  const todayScheduleSectionCss = css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `;

  const todayScheduleHeaderCss = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 0.9rem;
      color: ${modalBackground};
      font-weight: 500;
    }
  `;

  const clockIconCss = css`
    font-size: 1rem;
    color: ${modalBackground};
  `;

  const completedTitle = css`
    text-decoration: line-through;
    color: ${tabBtnText};
  `;

  const scheduleContentCss = css`
    display: flex;
    justify-content: flex-start;
    gap: 0;
    max-height: 19rem;
    overflow-y: auto;
    flex-direction: column;
    ${scrollbarHidden};
  `;

  const scheduleTitle = css`
    font-size: 16px;
    font-weight: 500;
    color: ${scheduleTitleColor};
  `;

  const scheduleTime = css`
    font-size: 14px;
    color: ${tabBtnText};
    margin-bottom: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const emptyScheduleCss = css`
    text-align: center;
    color: ${inputBorder};
    font-size: 0.9rem;
    padding: 2rem 0;
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
      const res = await loginApi.DELETE.logout();
      setIsLogin(false);
      toast.success(res.detail);
    } catch (error) {
      toast.error(`로그아웃 실패 : ${error}`);
    }
  };

  return (
    <div css={[sideBarMixin]}>
      <div css={loginedContainerCss}>
        {/* 프로필 영역 (클릭 시 설정 모드 열림) */}
        <div css={hoverProfile} onClick={() => setIsProfileSettingOpen(true)}>
          <ProfileSection
            username={mocUser.username}
            email={mocUser.userEmail}
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

            <TodaySchedule items={items} setItems={setItems} />
            <hr css={dividerCss} />

            {/* 오늘 일정 섹션 */}
            <div css={todayScheduleSectionCss}>
              <div css={todayScheduleHeaderCss}>
                <FaClock css={clockIconCss} />
                <span>오늘 일정 ({items.length})</span>
              </div>

              <div css={[flexCenter(), scheduleContentCss]}>
                {items.length === 0 ? (
                  <div css={emptyScheduleCss}>오늘 일정이 없습니다.</div>
                ) : (
                  <DragAndDrop
                    items={items}
                    onItemsChange={setItems}
                    dragTitle={"title"}
                  >
                    {items.map((el) => {
                      return (
                        <div key={el.id} css={itemMixin}>
                          <div>
                            <div
                              css={[
                                scheduleTitle,
                                el.is_completed && completedTitle,
                              ]}
                            >
                              {el.title}
                            </div>
                            <div css={scheduleTime}>
                              <MdAccessTime />
                              {formatTime(el.start_time)} ~{" "}
                              {formatTime(el.end_time)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </DragAndDrop>
                )}
              </div>
            </div>

            <hr css={dividerCss} />

            {/* 하단 버튼들 */}
            <BottomButtons onLogout={handleLogout} onPremium={goToPremium} />
          </>
        )}
      </div>
    </div>
  );
}
