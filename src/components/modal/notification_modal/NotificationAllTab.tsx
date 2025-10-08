import NotificationList from "./NotificationList";
import type { NotificationUI } from "./NotificationModal";


interface Props {
  notifications: NotificationUI[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationAllTab = ({ notifications, onMarkAsRead, onDelete }: Props) => {
  return (
    <NotificationList
      notifications={notifications}
      onMarkAsRead={onMarkAsRead}
      onDelete={onDelete}
    />
  );
};

export default NotificationAllTab;
