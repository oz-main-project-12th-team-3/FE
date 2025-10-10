import { handleApiCall } from "../apiClient";

export const apiNoti = {
  GET: {
    // 아니 왜 명세서 알림 타입 res가 description ????????
    // 진짜 화난다...
    /**
     * 알림 타입을 받아오는 GET메서드
     * init시에만 한번에 받아오기
     * @returns {} 응답 데이터
     */
    types: async (): Promise<Noti.Type[]> => {
      const url = `/api/notification-types/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 단일 타입 조회 GET 메서드
     * @param {number} typeId 가져올 타입의 id
     * @returns {Promise<NotificationType>} 요청한 id의 타입
     */
    typeById: async (typeId: number): Promise<Noti.Type[]> => {
      const url = `/api/notification-types/${typeId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 사용자의 알림 목록 조회하는 GET메서드
     * @param {}  "read"|"unread" > 없어짐
     * @returns {Promise<Noti.Item[]>} 알림 목록 배열
     * @example
     * ```tsx
     * const res = await notificationApi.GET.notifications("unread")
     * ```
     */
    // 아니 read/unread 스테이터스 받는 파트 어디감???????????
    // 여기도 res 똑바로 안쓰여져 있음
    // 어떤건 res : [ref:#/components/schemas/Notification] 이고
    // 어떤건 res : [description:"알림 목록 반환"] 이고
    // 제발...
    notifications: async (
      // status: NotificationStatusType
      params: API.PageReq
    ): Promise<Noti.Item[]> => {
      const url = `/api/notifications/`;
      return await handleApiCall({ method: "GET", url: url, params: params });
    },
    /**
     * 특정 알림의 상세 정보를 조회하는 GET메서드
     * @param {number} notiId 특정 알림의 id
     * @returns {Promise<Noti.Item>} 응답 데이터
     */
    // 이거는 또 왜 res 가 ["description": "알림 상세 조회"]???????
    // Noti item 와야하는거 아닌가?????
    notificationById: async (notiId: number): Promise<Noti.Item> => {
      const url = `/api/notifications/${notiId}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 알림 타입 생성 POST 메서드
     * @param {} payload 생성할 알림 타입
     * @returns {Promise<Noti.Type>} 생성된 알림 타입
     */
    type: async (payload: Noti.Type): Promise<Noti.Type> => {
      const url = `/api/notification-types/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 알림 생성 POST 메서드
     * @param {} payload 요청 바디 Noti.Item
     * @returns {} 생성된 알림
     */
    noti: async (payload: Noti.Item): Promise<Noti.Item> => {
      const url = `/api/notifications/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 알림 읽음 상태로 변경
     * @param {number} notiId 변경할 알림 id
     * @returns {Promise<Noti.Item>} 수정된 알림
     */
    notiMarkAsReadById: async (notiId: number) => {
      const url = `/api/notifications/${notiId}/mark_as_read/"`;
      return await handleApiCall({ method: "POST", url: url });
    },
  },
  PUT: {
    /**
     * 알림 타입 수정 PUT메서드
     * @param {number} typeId 수정할 알림 타입의 id
     * @param {Noti.Type} payload 수정할 알림 타입의 내용
     * @returns {Promise<Noti.Type>} 수정된 알림 타입
     */
    notiTypeById: async (
      typeId: number,
      payload: Noti.Type
    ): Promise<Noti.Type> => {
      const url = `/api/notification-types/${typeId}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
    /**
     * 알림 수정 PUT메서드
     * @param {number} notiId 수정할 알림 id
     * @param {} payload 수정할 내용
     * @returns {} 수정된 알림
     */
    // 아니 어떤건 item주고 어떤건 "description": "알림 수정 성공" 이고
    // 타입 제발...
    notiById: async (
      notiId: number,
      payload: Noti.Item
    ): Promise<Noti.Item> => {
      const url = `/api/notifications/${notiId}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 알림을 읽음 상태로 업데이트하는 PATCH 메서드
     * @param {number} notiId 상태를 변경할 알림의 id
     * @returns {Promise<>} 응답 데이터
     */
    // 이거도 res 똑바로 안되어있음
    // 모르겠다 진짜...
    notificationStatusById: async (
      notiId: number,
      payload: Partial<Noti.Item>
    ) => {
      // : Promise<Noti.Item>

      // const url = `notifications/${notiId}/read/`;
      const url = `/api/notifications/${notiId}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
    // put이 있는데 patch 필요 ? 일단 type patch 스킵
  },
  DELETE: {
    /**
     * 알림을 삭제하는 DELETE 메서드
     * @param {number} id 삭제할 알림의 id
     * @returns {Promise<API.Detail>} .detail에 설명 받아옴
     */
    // 여기도 "description": "알림 삭제"
    // 왜 바디처럼 주지?
    notificationById: async (id: number) => {
      const url = `/api/notifications/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
    /**
     * 알림 "타입" 을 삭제하는 DELETE 메서드
     * @param {number} typeId 삭제할 알림 타입의 id
     * @returns {Promise<ResDetail>} .detail에 설명 받아옴
     */
    notiTypeById: async (typeId: number) => {
      const url = `/api/notification-types/${typeId}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
