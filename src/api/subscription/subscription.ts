import { handleApiCall } from "../apiClient";



export const apiSubscription = {
  GET: {
    /**
     * 인증된 사용자의 모든 구독 정보를 조회
     * @returns {}
     */
    allSubscriptions: async (): Promise<Subscription.Item[]> => {
      const url = `/api/payments/subscriptions/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 인증된 사용자의 특정 구독 정보를 조회
     * @param {number} id 조회할 구독 항목의 id
     * @returns {}
     */
    subscriptionById: async (id: number): Promise<Subscription.Item> => {
      const url = `/api/payments/subscriptions/${id}`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 구독 생성
     * @param {} payload 플랜id, 가격, 시작날짜, 종료날짜
     * @returns {}
     */
    subscription: async (
      payload: Subscription.Item
    ) => {
      const url = `/api/payments/subscriptions/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT:{
    /**
     * 구독 상태 수정
     * @param {} id 수정할 구독의 id
     * @param {} payload status
     * @returns {}
     */
    subscriptionById: async (
      id: number,
      payload: Subscription.Item
    ) => {
      const url = `/api/payments/subscriptions/${id}`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 구독 상태 수정
     * @param {number} id 수정할 구독의 id
     * @param {} payload status
     * @returns {}
     */
    subscriptionById: async (
      id: number,
      payload: Subscription.Item
    ) => {
      const url = `/api/payments/subscriptions/${id}`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 구독 삭제
     * @param {number} id
     * @returns {} 
     */
    subscriptionById: async (id:number) => {
      const url = `/api/payments/subscriptions/${id}`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
