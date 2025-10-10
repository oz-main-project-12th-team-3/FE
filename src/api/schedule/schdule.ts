import { handleApiCall } from "../apiClient";

export const scheduleAPI = {
  GET: {
    /**
     * 사용자의 모든 일정을 조회
     * @returns {Promise<Schedule[]>} 일정 배열
     */
    allSchedules: async (): Promise<Schedule.Item[]> => {
      const url = `/api/schedules/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 개별 일정 상세 조회
     * @param {number} id 조회할 일정의 id
     * @returns {Promise<Schedule>} 일정 객체
     */
    scheduleById: async (id: number): Promise<Schedule.Item> => {
      const url = `/api/schedules/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 새로운 일정을 생성
     * @param {} payload 생성할 일정의 내용
     * @returns {} 생성된 일정 객체
     */
    schedule: async (payload: Schedule.Item) => {
      const url = `/api/schedules/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 기존 일정을 수정
     * @param {} id 수정할 일정의 id
     * @param {} payload 수정할 일정의 내용
     * @returns {} 수정된 일정 객체
     */
    scheduleById: async (
      id: number,
      payload: Schedule.Item
    ) => {
      const url = `/api/schedules/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 기존 일정을 수정
     * @param {} id 수정할 일정의 id
     * @param {} payload 수정할 일정의 내용
     * @returns {} 수정된 일정 객체
     */
    scheduleById: async (
      id: number,
      payload: Partial<Schedule.Item>
    ) => {
      const url = `/api/schedules/${id}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 일정 삭제
     * @param {number} id 삭제할 일정의 id
     * @returns {Promise<DeleteScheduleRes>} .detail에 삭제 성공 메시지 출력됨
     */
    scheduleById: async (id: number) => {
      const url = `/api/schedules/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
