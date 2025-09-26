import { handleApiCall } from "../apiClient";

type PaymentStatus = "active" | "refunded";

type Payment = {
  id: number;
  subscription_id: number;
  amount: number;
  status: PaymentStatus;
  payment_method: string;
  transaction_id: string;
  paid_at: string;
};

type PaymentHistoryParams = {
  subscription_id?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
};

export const apiPaymentHistory = {
  GET: {
    /**
     * 결제 내역 조회
     * @param param
     * subscription_id (int): 특정 구독에 해당하는 결제 내역 필터링 가능
     *
     * status (string): 결제 상태 필터 (e.g., success, refunded)
     *
     * start_date (datetime): 조회 시작 일시
     *
     * end_date (datetime): 조회 종료 일시
     *
     * @returns {}
     */
    paymentsByParam: async (
      param?: PaymentHistoryParams
    ): Promise<Payment[]> => {
      const url = `/payments/`;
      return await handleApiCall({ method: "GET", url: url, params: param });
    },
    /**
     * 단일 결제 기록 조회
     * @param {number} id 조회할 결제기록의 id
     * @returns {Promise<Payment>}
     */
    paymentById: async (id: number): Promise<Payment> => {
      const url = `/payments/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
};


