import { handleApiCall } from "../apiClient";

export const apiScheduleNoti = {
  GET: {
    /**
     * 사용자의 예약 알림 목록을 조회
     * @returns {} 응답 데이터
     */
    userScheduleNotis: async (): Promise<
      API.Paginated<Schedule.Reminder[]>
    > => {
      const url = `/api/schedule-notifications/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 특정 예약 알림의 상세 정보를 조회
     * @param {number} scheduleId 조회할 예약 알림의 id
     * @returns {} 응답 데이터
     */
    // 여기도 res타입 지정 안되어 있음
    userScheduleNotiById: async (
      scheduleId: number
    ): Promise<API.Paginated<Schedule.Reminder>> => {
      const url = `/api/schedule-notifications/${scheduleId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 새로운 예약 알림을 생성합니다.
     * @param {} payload 새로운 예약
     * @returns {} 응답 데이터
     */
    scheduleNoti: async (payload: Schedule.Reminder) => {
      const url = `/api/schedule-notifications/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  // 여기도 patch, put 둘중 하나만 운용하면 되는데 굳이 2개 전부????
  PUT: {
    /**
     * 예약 알림 정보를 수정
     * @param {} id 수정할 예약 알림의 id
     * @param {} payload 시간, 상태 등
     * @returns {} 응답 데이터
     */
    // 이런거 수정사항 응답으로 줘야 하는데 하나같이 Description...
    scheduleNotiById: async (id: number, payload: Schedule.Reminder) => {
      const url = `/api/schedule-notifications/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 예약 알림 정보를 수정
     * @param {} id 수정할 예약 알림의 id
     * @param {} payload 시간, 상태 등
     * @returns {} 응답 데이터
     */
    scheduleNotiById: async (
      id: number,
      payload: Partial<Schedule.Reminder>
    ) => {
      const url = `/api/schedule-notifications/${id}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 예약 알림을 삭제합니다.
     * @param {number} id 삭제할 예약 알림의 id
     * @returns {} .detail에 완료 안내 메시지
     */
    scheduleNotiById: async (id: number) => {
      const url = `/api/schedule-notifications/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
