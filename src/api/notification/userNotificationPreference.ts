import { handleApiCall } from "../apiClient";

type NotificationPreference = {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
};

interface PostNotificationPreferenceApiReq {
  notification_type_id: number;
  is_enabled: boolean;
}

interface PostNotificationPreferenceApiRes {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface PutNotificationPreferenceApiReq {
  is_enabled: boolean;
}

interface PutNotificationPreferenceApiRes {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  updated_at: string;
}

interface DeleteUserNotificationPreferenceApiRes {
  detail: string;
}

export const userNotificationPreferenceApi = {
  GET: {
    /**
     * 사용자 알림 설정 목록들을 조회하는 GET메서드
     * @returns {Promise<NotificationPreference[]>} 응답 데이터
     */
    userNotiPrefs: async (): Promise<NotificationPreference[]> => {
      const url = `/users/notification-preferences/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 사용자의 특정 알림 설정 상세 조회하는 GET메서드
     * @param {number} id 특정 알림 설정 항목의 id
     * @returns {Promise<NotificationPreference>} 응답 데이터
     */
    userNotiPrefById: async (id: number): Promise<NotificationPreference> => {
      const url = `/users/notification-preferences/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 사용자 알림 설정 생성하는 POST메서드
     * @param {PostNotificationPreferenceApiReq} payload - 요청 데이터
     * @returns {Promise<PostNotificationPreferenceApiRes>} 응답 데이터
     */
    notiPref: async (
      payload: PostNotificationPreferenceApiReq
    ): Promise<PostNotificationPreferenceApiRes> => {
      const url = `/users/notification-preferences/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 사용자 알림 설정을 수정하는 PUT메서드
     * @param {number} id 변경할 알림 설정의 id
     * @param {PutNotificationPreferenceApiReq} payload - 요청 데이터
     * @returns {Promise<PutNotificationPreferenceApiRes>} 응답 데이터
     */
    notiPrefById: async (
      id: number,
      payload: PutNotificationPreferenceApiReq
    ): Promise<PutNotificationPreferenceApiRes> => {
      const url = `/users/notification-preferences/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 사용자 알림 설정 삭제하는 DELETE메서드
     * @param {number} id 삭제할 유저알림설정의 id
     * @returns {Promise<DeleteUserNotificationPreferenceApiRes>} 응답 데이터
     */
    notiPrefById: async (
      id: number
    ): Promise<DeleteUserNotificationPreferenceApiRes> => {
      const url = `/users/notification-preferences/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
