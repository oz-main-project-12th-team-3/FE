import { handleApiCall } from "../apiClient";

type ScheduleNotificationStatus = "pending" | "sent";

type ScheduleNotification = {
  id: number;
  scheduled_time: string;
  sent_at: string | null;
  status: ScheduleNotificationStatus;
  created_at: string;
  updated_at: string;
  user_id: number;
  notification_id: number;
};

type GetUserScheduleNotificationsApiRes = ScheduleNotification[];

interface postScheduleNotificationsApiReq {
  scheduled_time: string;
  // sent_at: string;
  status: ScheduleNotificationStatus;
  user_id: number;
  notification_id: number;
}

interface putScheduleNotificationsByIdApiReq {
  scheduled_time: string;
  status: ScheduleNotificationStatus;
  sent_at: string;
}

interface putScheduleNotificationsByIdApiRes {
  id: number;
  scheduled_time: string;
  sent_at: string;
  status: ScheduleNotificationStatus;
  updated_at: string;
}


export const scheduleNotificationApi = {
  GET: {
    /**
     * 사용자의 예약 알림 목록을 조회
     * @returns {Promise<GetUserScheduleNotificationsApiRes>} 응답 데이터
     */
    userScheduleNotis:
      async (): Promise<GetUserScheduleNotificationsApiRes> => {
        const url = `schedule-notifications/`;
        return await handleApiCall({ method: "GET", url: url });
      },
    /**
     * 특정 예약 알림의 상세 정보를 조회
     * @param {number} scheduleId 조회할 예약 알림의 id
     * @returns {Promise<ScheduleNotification>} 응답 데이터
     */
    userScheduleNotiById: async (scheduleId: number): Promise<ScheduleNotification> => {
      const url = `schedule-notifications/${scheduleId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 새로운 예약 알림을 생성합니다.
     * @param {postScheduleNotificationsApiReq} payload 새로운 예약
     * @returns {Promise<ScheduleNotification>} 응답 데이터
     */
    scheduleNoti: async (
      payload: postScheduleNotificationsApiReq
    ): Promise<ScheduleNotification> => {
      const url = `schedule-notifications/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 예약 알림 정보를 수정
     * @param {number} id 수정할 예약 알림의 id
     * @param {putScheduleNotificationsByIdApiReq} payload 시간, 상태 등
     * @returns {Promise<putScheduleNotificationsByIdApiRes>} 응답 데이터
     */
    scheduleNotiById: async (
      id: number,
      payload: putScheduleNotificationsByIdApiReq
    ): Promise<putScheduleNotificationsByIdApiRes> => {
      const url = `schedule-notifications/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 예약 알림을 삭제합니다.
     * @param {number} id 삭제할 예약 알림의 id
     * @returns {Promise<ResDetail>} .detail에 완료 안내 메시지
     */
    scheduleNotiById: async (
      id: number
    ): Promise<ResDetail> => {
      const url = `schedule-notifications/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
