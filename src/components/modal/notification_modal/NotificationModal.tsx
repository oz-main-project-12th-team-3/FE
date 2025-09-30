/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import NotificationHeader from "./NotificationHeader";
import NotificationAllTab from "./NotificationAllTab";
import NotificationUnreadTab from "./NotificationUnreadTab";
import type { NotificationUI } from "../../../api/notification/notification";
import {
  mapNotification,
  notificationApi,
} from "../../../api/notification/notification";
import { scrollCss } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { Notifications } from "../../../api/dummyData/notification";

type TabType = "all" | "unread";

const NotificationModal = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifications, setNotifications] = useState<NotificationUI[]>([]);

  const { inputBorder, modalBackground } = useThemeColors();

  const modalContainer = css`
    background: ${modalBackground};
    border-radius: 16px;
    width: 400px;
    max-width: 90vw;

    height: 500px;
    display: flex;
    flex-direction: column;

    position: relative;
  `;

  const content = css`
    flex: 1;
    overflow-y: auto;

    padding-bottom: 8px;
  `;

  // 🔹 탭 변경 시 알림 목록 불러오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // 👉 API 스펙에 "all"이 없다면 read+unread 합쳐야 합니다.
        const status = activeTab === "all" ? "read" : "unread";
        const res = await notificationApi.GET.notifications(status);
        const mapped = res.map((n) => mapNotification(n));
        setNotifications(mapped);
      } catch (err) {
        console.error("알림 불러오기 실패:", err);
      } finally{
        const mapped = Notifications.map((n) => mapNotification(n));
        setNotifications(mapped)
      }
    };

    fetchNotifications();
  }, [activeTab]);

  // 🔹 알림 단건 읽음 처리
  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationApi.PATCH.notificationStatusById(id);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isRead: true, readAt: new Date().toISOString() }
            : item
        )
      );
    } catch (err) {
      console.error("읽음 처리 실패:", err);
    }
  };

  // 🔹 알림 삭제
  const handleDeleteNotification = async (id: number) => {
    try {
      await notificationApi.DELETE.notificationById(id);
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("알림 삭제 실패:", err);
    }
  };

  // 🔹 전체 읽음 처리
  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.isRead)
          .map((n) => notificationApi.PATCH.notificationStatusById(n.id))
      );
      setNotifications((prev) =>
        prev.map((item) =>
          item.isRead
            ? item
            : { ...item, isRead: true, readAt: new Date().toISOString() }
        )
      );
    } catch (err) {
      console.error("전체 읽음 처리 실패:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <motion.div
      css={modalContainer}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <NotificationHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllAsRead}
      />

      <div css={[content, scrollCss(inputBorder)]}>
        {activeTab === "all" ? (
          <NotificationAllTab
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
          />
        ) : (
          <NotificationUnreadTab
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDeleteNotification}
          />
        )}
      </div>
    </motion.div>
  );
};

export default NotificationModal;
