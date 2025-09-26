import { handleApiCall } from "../apiClient";

type Plan = {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  included_units: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
