/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  flexCenter,
  itemMixin,
  scrollbarHidden,
  defaultProfileImage,
  baseButton,
} from "../../../styles/mixins";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";
import { MdAccessTime } from "react-icons/md";
import { css } from "@emotion/react";
import { FaCalendarAlt, FaBell, FaClock, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { dummySchedules } from "../../../api/dummyData/schedule";
import { formatTime } from "../../../utils/time";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { loginApi } from "../../../api/auth/login";

const mocUser = {
  user_id: 1,
  username: "user123",
  token: "eyJhbGciOiJI...",
  userEmail: "user123@email.com",
};

export default function RightLogined({
  setIsLogin,
}: {
  setIsLogin: (bool: boolean) => void;
}) {
  const navigate = useNavigate();
  // 오늘 날짜 구하기
  const today = new Date().toISOString().split("T")[0];

  // 오늘 일정 필터링
  const todaySchedules = dummySchedules.filter(
    (schedule) => schedule.start_time.split("T")[0] === today
  );

  const [items, setItems] = useState(todaySchedules);

  const {
    disabledCompletedBox,
    inputBorder,
    modalBackground,
    deleteBtnBg,
    tabBtnText,
    scheduleTitleColor,
    crownIcon,
  } = useThemeColors();

  // 스타일 정의
  const loginedContainerCss = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.5rem;
  `;

  const profileSectionCss = css`
    display: flex;
    align-items: center;
  `;

  const profileIconCss = css`
    position: relative;
  `;

  const profileInfoCss = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const usernameCss = css`
    font-size: 1rem;
    font-weight: 600;
    color: ${disabledCompletedBox};
  `;

  const emailCss = css`
    font-size: 0.75rem;
    color: ${inputBorder};
  `;

  const dividerCss = css`
    border: none;
    height: 1px;
    background: ${modalBackground};
    margin: 0;
  `;

  const menuSectionCss = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;

  const menuItemCss = css`
    display: flex;
    width: 4rem;
    gap: 0.25rem;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.2s;
    position: relative;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    span {
      font-size: 0.8rem;
      color: ${modalBackground};
      font-weight: 500;
    }
  `;

  const notificationCss = css`
    position: relative;
  `;

  const notificationDotCss = css`
    position: absolute;
    top: 0.1rem;
    right: 0.9rem;
    width: 8px;
    height: 8px;
    background: ${deleteBtnBg};
    border-radius: 50%;
  `;

  const iconCss = css`
    font-size: 1.2rem;
    color: ${modalBackground};
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

  const buttonSectionCss = css`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `;

  const crownIconCss = css`
    font-size: 1rem;
    color: ${crownIcon};
  `;

  const goToPremium = () => {
    // 프리미엄 페이지로 이동
  };

  // 일정관리 페이지로 이동
  const handleSchedule = () => {
    navigate("/modal/schedule", { 
  state: { prevPath: location.pathname } 
});
  };

  const handleLogout = () => {
    setIsLogin(false);
    loginApi.DELETE.logout();
  };

  return (
    <div css={loginedContainerCss}>
      {/* 프로필 섹션 */}
      <div css={profileSectionCss}>
        <div css={profileIconCss}>
          <div css={[defaultProfileImage]}></div>
        </div>
        <div css={profileInfoCss}>
          <div css={usernameCss}>{mocUser.username}</div>
          <div css={emailCss}>{mocUser.userEmail}</div>
        </div>
      </div>

      <hr css={dividerCss} />

      {/* 일정관리/알림 메뉴 섹션 */}
      <div css={menuSectionCss}>
        <div css={menuItemCss} onClick={handleSchedule}>
          <FaCalendarAlt css={iconCss} />
          <span>일정관리</span>
        </div>
        <div css={[menuItemCss, notificationCss]}>
          <FaBell css={iconCss} />
          <div css={notificationDotCss}></div>
          <span>알림</span>
        </div>
      </div>

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
                        css={[scheduleTitle, el.is_completed && completedTitle]}
                      >
                        {el.title}
                      </div>
                      <div css={scheduleTime}>
                        <MdAccessTime />
                        {formatTime(el.start_time)} ~ {formatTime(el.end_time)}
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
      <div css={buttonSectionCss}>
        <button css={baseButton} onClick={handleLogout}>
          로그아웃
        </button>
        <button css={[baseButton]} onClick={goToPremium}>
          <FaCrown css={crownIconCss} />
          프리미엄
        </button>
      </div>
    </div>
  );
}
