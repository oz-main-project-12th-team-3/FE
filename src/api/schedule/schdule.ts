import { handleApiCall } from "../apiClient";

export type Schedule = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
};

export type PostScheduleReq = {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
};

export type PutScheduleReq = {
  title: string | null;
  description: string | null;
  start_time: string | null;
  end_time: string | null;
  is_completed: boolean | null;
};

export type DeleteScheduleRes = {
  detail: string;
};

export const scheduleApi = {
  GET: {
    /**
     * 사용자의 모든 일정을 조회
     * @returns {Promise<Schedule[]>} 일정 배열
     */
    allSchedules: async (): Promise<Schedule[]> => {
      const url = `/schedules`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 개별 일정 상세 조회
     * @param {number} id 조회할 일정의 id
     * @returns {Promise<Schedule>} 일정 객체
     */
    scheduleById: async (id: number): Promise<Schedule> => {
      const url = `/schedules/${id}`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 새로운 일정을 생성
     * @param {PostScheduleReq} payload 생성할 일정의 내용
     * @returns {Promise<Schedule>} 생성된 일정 객체
     */
    schedule: async (payload: PostScheduleReq): Promise<Schedule> => {
      const url = `/schedules`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 기존 일정을 수정
     * @param {number} id 수정할 일정의 id
     * @param {PutScheduleReq} payload 수정할 일정의 내용
     * @returns {Promise<Schedule>} 수정된 일정 객체
     */
    scheduleById: async (
      id: number,
      payload: PutScheduleReq
    ): Promise<Schedule> => {
      const url = `/schedules/${id}`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 일정 삭제
     * @param {number} id 삭제할 일정의 id
     * @returns {Promise<DeleteScheduleRes>} .detail에 삭제 성공 메시지 출력됨
     */
    scheduleById: async (id: number): Promise<DeleteScheduleRes> => {
      const url = `/schedules/${id}`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
