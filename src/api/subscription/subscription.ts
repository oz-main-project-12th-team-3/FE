import { handleApiCall } from "../apiClient";

type SubscriptionStatus = "active" | "canceled";

type Subscription = {
  id: number;
  user_id: number;
  plan_id: number;
  price: number;
  status: SubscriptionStatus;
  remaining_units: number | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

type PostSubscriptionReq = {
  plan_id: number;
  price: number;
  start_date: string;
  end_date: string;
};
type PatchSubscriptionReq = {
  status: SubscriptionStatus;
};
type PatchSubscriptionRes = {
  id: number;
  status: SubscriptionStatus;
  updated_at: string;
};

export const apiSubscription = {
  GET: {
    /**
     * 인증된 사용자의 모든 구독 정보를 조회
     * @returns {Promise<Subscription[]>}
     */
    allSubscriptions: async (): Promise<Subscription[]> => {
      const url = `/subscriptions/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 인증된 사용자의 특정 구독 정보를 조회
     * @param {number} id 조회할 구독 항목의 id
     * @returns {Promise<Subscription[]>}
     */
    subscriptionById: async (id: number): Promise<Subscription> => {
      const url = `/subscriptions/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 구독 생성
     * @param {PostSubscriptionReq} payload 플랜id, 가격, 시작날짜, 종료날짜
     * @returns {Promise<Subscription>}
     */
    subscription: async (
      payload: PostSubscriptionReq
    ): Promise<Subscription> => {
      const url = `/subscriptions/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PATCH: {
    /**
     * 구독 상태 수정
     * @param {number} id 수정할 구독의 id
     * @param {PatchSubscriptionReq} payload status
     * @returns {Promise<PatchSubscriptionRes>}
     */
    subscriptionById: async (
      id: number,
      payload: PatchSubscriptionReq
    ): Promise<PatchSubscriptionRes> => {
      const url = `/subscriptions/${id}/status/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 구독 삭제
     * @param {number} id
     * @returns {Promise<ResDetail>} .detail로 안내 메시지 출력
     */
    subscriptionById: async (id:number):Promise<ResDetail> => {
      const url = `/subscriptions/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
