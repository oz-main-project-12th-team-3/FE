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
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  read_at?: string | null;
  created_at: string;
  updated_at: string;
  recipient: number;
  sender: number;
  notification_type_id: number;
};

type PostNotiReq = {
  title: string;
  message: string;
  link: string;
  is_read: boolean;
  read_at: string;
  recipient: number;
  sender: number;
  notification_type: number;
};

type PutNotiReq = PostNotiReq;
type PostNotiMarkAsReadReq = PostNotiReq;

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

export type PostNotiTypeReq = {
  code: string;
  description: string;
  default_enabled: boolean;
};

export type PutNotiTypeReq = {
  code: string;
  description: string;
  default_enabled: boolean;
};

export const apiNoti = {
  GET: {
    /**
     * 알림 타입을 받아오는 GET메서드
     * init시에만 한번에 받아오기
     * @returns {Promise<NotificationType[]>} 응답 데이터
     */
    types: async (): Promise<NotificationType[]> => {
      const url = `notification-types/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 단일 타입 조회 GET 메서드
     * @param {number} typeId 가져올 타입의 id
     * @returns {Promise<NotificationType>} 요청한 id의 타입
     */
    typeById: async (typeId: number): Promise<NotificationType> => {
      const url = `notification-types/${typeId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 사용자의 알림 목록 조회하는 GET메서드
     * @param {NotificationStatusType} status "read"|"unread"
     * @returns {Promise<Notification[]>} 알림 목록 배열
     * @example
     * ```tsx
     * const res = await notificationApi.GET.notifications("unread")
     * ```
     */
    notifications: async (
      status: NotificationStatusType
    ): Promise<Notification[]> => {
      const url = `notifications?&status=${status}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 특정 알림의 상세 정보를 조회하는 GET메서드
     * @param {number} notiId 특정 알림의 id
     * @returns {Promise<Notification>} 응답 데이터
     */
    notificationById: async (notiId: number): Promise<Notification> => {
      const url = `notifications/${notiId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 알림 타입 생성 POST 메서드
     * @param {PostNotiTypeReq} payload 생성할 알림 타입
     * @returns {Promise<NotificationType>} 생성된 알림 타입
     */
    type: async (payload: PostNotiTypeReq): Promise<NotificationType> => {
      const url = `notification-types/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 알림 생성 POST 메서드
     * @param {PostNotiReq} payload 요청 바디 <PostNotiReq>
     * @returns {Promise<Notification>} 생성된 알림
     */
    noti: async (payload: PostNotiReq): Promise<Notification> => {
      const url = `notifications/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 알림 읽음 상태로 변경
     * @param {number} notiId 변경할 알림 id
     * @param {PostNotiMarkAsReadReq} payload 변경할 알림의 내용
     * @returns {Promise<Notification>} 수정된 알림
     */
    notiMarkAsReadById: async (
      notiId: number,
      payload: PostNotiMarkAsReadReq
    ): Promise<Notification> => {
      const url = `notifications/${notiId}/mark_as_read/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 알림 타입 수정 PUT메서드
     * @param {number} typeId 수정할 알림 타입의 id
     * @param {PutNotiTypeReq} payload 수정할 알림 타입의 내용
     * @returns {Promise<NotificationType>} 수정된 알림 타입
     */
    notiTypeById: async (
      typeId: number,
      payload: PutNotiTypeReq
    ): Promise<NotificationType> => {
      const url = `notification-types/${typeId}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
    /**
     * 알림 수정 PUT메서드
     * @param {number} notiId 수정할 알림 id
     * @param {PutNotiReq} payload 수정할 내용
     * @returns {Promise<Notification>} 수정된 알림
     */
    notiById: async (
      notiId: number,
      payload: PutNotiReq
    ): Promise<Notification> => {
      const url = `notifications/${notiId}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 알림을 읽음 상태로 업데이트하는 PATCH 메서드
     * @param {number} notiId 상태를 변경할 알림의 id
     * @returns {Promise<PatchNotificationStatusByIdApiRes>} 응답 데이터
     */
    notificationStatusById: async (
      notiId: number
    ): Promise<PatchNotificationStatusByIdApiRes> => {
      const url = `notifications/${notiId}/read/`;
      return await handleApiCall({ method: "PATCH", url: url });
    },
  },
  DELETE: {
    /**
     * 알림을 삭제하는 DELETE 메서드
     * @param {number} id 삭제할 알림의 id
     * @returns {Promise<DeleteNotificationByIdApiRes>} .detail에 설명 받아옴
     */
    notificationById: async (
      id: number
    ): Promise<DeleteNotificationByIdApiRes> => {
      const url = `notifications/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
    /**
     * 알림 "타입" 을 삭제하는 DELETE 메서드
     * @param {number} typeId 삭제할 알림 타입의 id
     * @returns {Promise<ResDetail>} .detail에 설명 받아옴
     */
    notiTypeById: async (typeId: number): Promise<ResDetail> => {
      const url = `notification-types/${typeId}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
