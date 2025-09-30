/** @jsxImportSource @emotion/react */
import { motion } from "framer-motion";
import { IoNotifications, IoSettings, IoTrash } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { css } from "@emotion/react";
import type { NotificationUI } from "../../../api/notification/notification";
import { useThemeColors } from "../../../hooks/useThemeColors";

interface Props {
  notifications: NotificationUI[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationList = ({ notifications, onMarkAsRead, onDelete }: Props) => {
    const { hoverDeleteBtn, modalBackground, headerBorder, scheduleTitleColor, focusCompletedBox, descriptionText, completedText, unreadBg, btnBorder,tabBgColor, modalHeaderBg } = useThemeColors()

    const notificationItem = css`
      padding: 16px 24px;
      border-bottom: 1px solid ${tabBgColor};
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: background 0.2s ease;
      &:hover {
        background: ${modalHeaderBg};
      }
      &:last-child {
        border-bottom: none;
      }
    `;

// 읽지 않은 알림 전용 스타일
const unreadItem = css`
  background: ${unreadBg};
`;

const notificationItemWrapper = css`
  position: relative;
  &:hover .notification-actions {
    opacity: 1;
    pointer-events: auto;
  }
`;

const iconContainer = css`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const aiIcon = css`
  ${iconContainer}
  background: ${focusCompletedBox};
  color: ${modalBackground};
`;
const systemIcon = css`
  ${iconContainer}
  background: ${headerBorder};
  color: ${descriptionText};
`;
const notificationContent = css`
  flex: 1;
  min-width: 0;
`;
const notificationTitle = css`
  font-weight: 600;
  color: ${scheduleTitleColor};
  margin: 0 0 4px 0;
  font-size: 14px;
`;
const notificationText = css`
  color: ${descriptionText};
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
`;
const timeAndAction = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;
const timeText = css`
  color: ${completedText};
  font-size: 12px;
`;
const deleteButton = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: ${completedText};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${headerBorder};
    color: ${descriptionText};
  }
`;
const readButton = css`
  ${deleteButton}
`;
const notificationActions = css`
  display: flex;
  gap: 8px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
`;
const emptyState = css`
  padding: 60px 24px;
  text-align: center;
  color: ${completedText};
`;
const emptyIcon = css`
  margin: 0 auto 16px;
  font-size: 48px;
  color: ${btnBorder};
`;

  if (notifications.length === 0) {
    return (
      <motion.div
        css={emptyState}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <IoNotifications css={emptyIcon} />
        <p>알림이 없습니다</p>
      </motion.div>
    );
  }

  return (
    <>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          css={[
            notificationItem,
            notificationItemWrapper,
            !notification.isRead && unreadItem, // 읽지 않은 알림은 다른 배경색
          ]}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          <div css={notification.type === "ai" ? aiIcon : systemIcon}>
            {notification.type === "ai" ? (
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <IoSettings size={20} />
            )}
          </div>
          <div css={notificationContent}>
            <h4 css={notificationTitle}>{notification.title}</h4>
            <p css={notificationText}>{notification.content}</p>
            <div css={timeAndAction}>
              <span css={timeText}>{notification.time}</span>
              <div className="notification-actions" css={notificationActions}>
                {!notification.isRead && (
                  <motion.button
                    css={readButton}
                    onClick={() => onMarkAsRead(notification.id)}
                    title="읽음으로 표시"
                  >
                    <FaCheck size={16}/>
                  </motion.button>
                )}
                <motion.button
                  css={deleteButton}
                  onClick={() => onDelete(notification.id)}
                  title="삭제"
                >
                  <IoTrash size={16} color={hoverDeleteBtn}/>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default NotificationList;
