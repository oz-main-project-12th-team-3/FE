import { handleApiCall } from "../apiClient";
// 요금제 일단 스킵
// /api/payments/plans/ : get 에서 실제 어떤 타입이 응답되는지 명시되어있지 않음
// plan id list | plan list ?????

export type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  included_units: number | null;
  is_active: boolean;
};

export const apiPlan = {
  GET: {
    /**
     * 요금제 목록 조회
     * @returns {Promise<Plan[]>}
     */
    plans: async (): Promise<Plan[]> => {
      const url = `/plans/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 요금제 목록 조회
     * @param {number} id 조회할 요금제의 id
     * @returns {Promise<Plan>}
     */
    planById: async (id: number): Promise<Plan> => {
      const url = `/plans/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
};
