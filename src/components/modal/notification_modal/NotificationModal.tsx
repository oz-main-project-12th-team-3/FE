/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import NotificationHeader from "./NotificationHeader";
import NotificationAllTab from "./NotificationAllTab";
import NotificationUnreadTab from "./NotificationUnreadTab";
import { apiNoti } from "../../../api/notification/notification";
import { scrollCss } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { Notifications } from "../../../api/dummyData/notification";
import { toast } from "react-toastify";
import { type Notification } from "../../../api/notification/notification";
import { formatRelativeTime } from "../../../utils/time";
import { storeNotiTypes } from "../../../store/storeNotiTypes";
import _ from "lodash";

export type TabType = "read" | "unread";
// all 기능 없음
// status all일때 read // unread 로 api 보내는 것은 부적절
// 백 코드에 맞게 read, unread로 통일
// all 을 할거면 백 코드에 all 요청 추가 혹은 api 콜 두번 보내야 함

type NotificationUI = {
  id: number;
  type: string;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  read_at?: string | null;
  created_at: string;
  updated_at: string;
  time: string; // "xx분 전" 형식
};

const NotificationModal = () => {
  const [activeTab, setActiveTab] = useState<TabType>("unread");
  const [notifications, setNotifications] = useState<NotificationUI[]>([]);

  const { inputBorder, modalBackground } = useThemeColors();
  const { notiTypes } = storeNotiTypes();

  // 맵 노티 이동(스토어 활용)
  // 기존에 원본 타입과 키값이 달라 같은 밸류를 다른 키값으로 반복적으로 매핑되던것을 원본 타입에 맞춰 수정함
  // notiTypes가 서버측에서 타입들을 뽑아오는것이어서 undefined 가능
  // undefined일땐 unknown으로 지정함
  const mapNotification = (n: Notification): NotificationUI => {
    const typeCode =
      notiTypes.find((el) => el.id === n.notification_type_id)?.code ||
      "unknown";
    return { ...n, type: typeCode, time: formatRelativeTime(n.created_at) };
  };

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
        const res = await apiNoti.GET.notifications(activeTab);
        const mapped = res.map((n) => mapNotification(n));
        setNotifications(mapped);
      } catch (err) {
        toast.error(`알림 불러오기 실패:${err}`);
      } finally {
        const mapped = Notifications.map((n) => mapNotification(n));
        setNotifications(mapped);
      }
    };

    fetchNotifications();
  }, [activeTab]);

  // 🔹 알림 단건 읽음 처리
  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await apiNoti.PATCH.notificationStatusById(id);
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, is_read: res.is_read, read_at: res.updated_at }
            : item
        )
      );
    } catch (err) {
      toast.error(`읽음 처리 실패:${err}`);
    }
  };

  // 🔹 알림 삭제
  const handleDeleteNotification = async (id: number) => {
    try {
      const res = await apiNoti.DELETE.notificationById(id);
      setNotifications((prev) => prev.filter((item) => item.id !== id));
      toast.info(`${res.detail}`);
    } catch (err) {
      toast.error(`알림 삭제 실패:${err}`);
    }
  };

  // 🔹 전체 읽음 처리
  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.is_read);
      if (unreadNotifications.length === 0) return;

      // Promise.all의 경우 실패시 다른 요청 전부 무시됨
      // Promise.allSettled로 중간에 실패 나와도 처리 시도하도록 변경
      const res = await Promise.allSettled(
        unreadNotifications.map((n) =>
          apiNoti.PATCH.notificationStatusById(n.id)
        )
      );

      // zip+reduce는 한번 순회
      // map+filter는 두번 순회
      const zipped = _.zip(res, unreadNotifications);

      const { failedCalls, successfulIds } = zipped.reduce(
        (acc, [result, noti]) => {
          if (!result || !noti) return acc;
          if (result.status === "rejected") {
            acc.failedCalls.push({
              title: noti.title,
              id: noti.id,
            });
          } else if (result.status === "fulfilled") {
            acc.successfulIds.push(noti.id);
          }
          return acc;
        },
        { failedCalls: [], successfulIds: [] } as {
          failedCalls: { title: string; id: number }[];
          successfulIds: number[];
        }
      );

      // 상태 업데이트 용 성공 id(실패한거는 업데이트 x)
      setNotifications((prev) =>
        prev.map((item) =>
          successfulIds.includes(item.id)
            ? { ...item, is_read: true, read_at: new Date().toISOString() }
            : item
        )
      );

      // 실패한 요청들 한번에 처리
      if (failedCalls.length > 0) {
        const titles = failedCalls.map((el) => el.title).join(", ");
        const ids = failedCalls.map((el) => el.id).join(", ");
        // 사용자는 주로 제목을 보기에 제목은 토스트로,
        // 디버깅용으론 id를 주로 체크하기에 콘솔쪽은 id로 에러 전송
        console.error(`일부 알림 읽음 처리 실패: id ${ids}`);
        throw Error(`요청실패 : ${titles}`);
      }
    } catch (err) {
      toast.error(`전체 읽음 처리 중 예상치 못한 오류: ${err}`);
      // console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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
        {activeTab === "read" ? (
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
