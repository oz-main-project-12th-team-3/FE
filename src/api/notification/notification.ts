import { handleApiCall } from "../apiClient";

export type NotificationType = {
  id: number;
  code: string;
  description: string;
  default_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type Notification = {
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

export const apiNoti = {
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
