import type { CustomAxiosRequestConfig } from "../auth/token";
import { api } from "../baseApi";

export type NotificationType = {
  id: number;
  code: string;
  description: string;
  default_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type GetNotificationTypesApiRes = NotificationType[];

/**
 * 알림 타입을 받아오는 GET메서드
 * init시에만 한번에 받아오기
 * @returns {Promise<GetNotificationTypesApiRes>} 응답 데이터
 */
export async function getNotificationTypesApi(): Promise<GetNotificationTypesApiRes> {
  try {
    // 인증 절차 안거치고 즉시 받아옴
    const res = await api.get(`/notification-types`, {
      skipAuth: true,
    } as CustomAxiosRequestConfig);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`getNotificationTypesApi failed: ${message}`);
  }
}
