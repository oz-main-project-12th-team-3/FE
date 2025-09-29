/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import NotificationHeader from "./NotificationHeader";
import NotificationAllTab from "./NotificationAllTab";
import NotificationUnreadTab from "./NotificationUnreadTab";
import { Notifications } from "../../../api/dummyData/notification";
import type { NotificationUI } from "../../../api/notification/notification";
import { mapNotification } from "../../../api/notification/notification";
import { scrollCss } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";

type TabType = "all" | "unread";

const { modalBackground } = useThemeColors()

const modalContainer = css`
  background: ${modalBackground};
  border-radius: 16px;
  width: 400px;
  max-width: 90vw;

  height: 500px; 
  display: flex;
  flex-direction: column;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const content = css`
  flex: 1; 
  overflow-y: auto;

  padding-bottom: 8px;
`;

const NotificationModal = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifications, setNotifications] = useState<NotificationUI[]>([]);

  const { inputBorder } = useThemeColors()

  useEffect(() => {
    const mapped = Notifications.map((n) => mapNotification(n));
    setNotifications(mapped);
  }, []);

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true, readAt: new Date().toISOString() } : item
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.isRead ? item : { ...item, isRead: true, readAt: new Date().toISOString() }
      )
    );
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
        totalCount={notifications.length}
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
