import { handleApiCall } from "../apiClient";

type NotificationType = {
  id: number;
  code: string;
  description: string;
  default_enabled: boolean;
  created_at: string;
  updated_at: string;
};

type Notification = {
  id: number;
  notification_type_id: number;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  read_at?: string | null;
  created_at: string;
  updated_at: string;
};

type NotificationStatusType = "read" | "unread";

interface PatchNotificationStatusByIdApiRes {
  id: number;
  is_read: boolean;
  read_at: string;
  updated_at: string;
}

interface DeleteNotificationByIdApiRes {
  detail: string;
}

// ---- 타입 정의 (API Response → UI 변환용) ----
export interface NotificationUI {
  id: number;
  type: "ai" | "system"; // notification_type_id 매핑, 일단 임시로 ai | sistem으로 지정
  title: string;
  content: string;
  link?: string;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
  time: string; // "xx분 전" 형식
}

// ---- 유틸 함수 ----
export const formatRelativeTime = (isoDate: string): string => {
  const now = new Date();
  const target = new Date(isoDate);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

export const mapNotification = (apiData: any): NotificationUI => ({
  id: apiData.id,
  type: apiData.notification_type_id === 1 ? "ai" : "system",
  title: apiData.title,
  content: apiData.message,
  link: apiData.link,
  isRead: apiData.is_read,
  readAt: apiData.read_at,
  createdAt: apiData.created_at,
  updatedAt: apiData.updated_at,
  time: formatRelativeTime(apiData.created_at),
});

//후
export const notificationApi = {
  GET: {
    /**
     * 알림 타입을 받아오는 GET메서드
     * init시에만 한번에 받아오기
     * @returns {Promise<NotificationType[]>} 응답 데이터
     */
    types: async (): Promise<NotificationType[]> => {
      const url = `/notification-types/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 사용자의 알림 목록 조회하는 GET메서드
     * @param {NotificationStatusType} status "read"|"unread"
     * @returns {Promise<Notification[]>} 응답 데이터
     * @example
     * ```tsx
     * const res = await notificationApi.GET.notifications("unread")
     * ```
     */
    notifications: async (
      status: NotificationStatusType
    ): Promise<Notification[]> => {
      const url = `/notifications?&status=${status}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 특정 알림의 상세 정보를 조회하는 GET메서드
     * @param {number} id 특정 알림의 id
     * @returns {Promise<Notification>} 응답 데이터
     */
    notificationById: async (id: number): Promise<Notification> => {
      const url = `/notifications/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  PATCH: {
    /**
     * 알림을 읽음 상태로 업데이트하는 PATCH 메서드
     * @param {number} id 상태를 변경할 알림의 id
     * @returns {Promise<PatchNotificationStatusByIdApiRes>} 응답 데이터
     */
    notificationStatusById: async (
      id: number
    ): Promise<PatchNotificationStatusByIdApiRes> => {
      const url = `notifications/${id}/read/`;
      return await handleApiCall({ method: "PATCH", url: url });
    },
  },
  DELETE: {
    /**
     * 알림을 삭제하는 DELETE 메서드
     * @param {number} id 삭제할 알림의 id
     * @returns {Promise<DeleteNotificationByIdApiRes>} 응답 데이터
     */
    notificationById: async (
      id: number
    ): Promise<DeleteNotificationByIdApiRes> => {
      const url = `/notifications/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
