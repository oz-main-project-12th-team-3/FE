/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";

export function MenuSection({
  unreadCount,
  onScheduleClick,
  onNotificationClick,
}: {
  unreadCount: number;
  onScheduleClick: () => void;
  onNotificationClick: () => void;
}) {
  const { modalBackground, deleteBtnBg, menuItemBg } = useThemeColors()

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
  const notificationDotCss = css`
    position: absolute;
    top: 0.1rem;
    right: 1.1rem;
    width: 8px;
    height: 8px;
    background: ${deleteBtnBg};
    border-radius: 50%;
  `;
  const iconCss = css`
    font-size: 1.2rem;
    color: ${modalBackground};
  `;

  return (
    <div css={menuSectionCss}>
      <div css={menuItemCss} onClick={onScheduleClick}>
        <FaCalendarAlt css={iconCss} />
        <span>일정관리</span>
      </div>
      <div css={menuItemCss} onClick={onNotificationClick}>
        <FaBell css={iconCss} />
        {unreadCount > 0 && <div css={notificationDotCss}></div>}
        <span>알림</span>
      </div>
    </div>
  );
}
