import NotificationList from "./NotificationList";
import type { NotificationUI } from "../../../api/notification/notification";

interface Props {
  notifications: NotificationUI[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationUnreadTab = ({ notifications, onMarkAsRead, onDelete }: Props) => {
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  return (
    <NotificationList
      notifications={unreadNotifications}
      onMarkAsRead={onMarkAsRead}
      onDelete={onDelete}
    />
  );
};

export default NotificationUnreadTab;
