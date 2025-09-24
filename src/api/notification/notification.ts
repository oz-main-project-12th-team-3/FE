import { handleApiCall } from "../apiCallHelper";
import { api } from "../baseApi";

export type Notification = {
  id: number;
  notification_type_id: number;
  title: string;
  message: string;
  link: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NotificationStatusType = "read" | "unread";

export type GetNotificationsApiRes = Notification[];

/**
 * 사용자의 알림 목록 조회하는 GET메서드
 * @param {NotificationStatusType} status "read"|"unread"
 * @returns {Promise<GetNotificationsApiRes>} 응답 데이터
 */
export async function getNotificationsApi(
  status: NotificationStatusType
): Promise<GetNotificationsApiRes> {
  const url = `/notifications?&status=${status}`;
  return handleApiCall(() => api.get(url), "GET", url);
}

/**
 * 특정 알림의 상세 정보를 조회하는 GET메서드
 * @param {number} id 특정 알림의 id
 * @returns {Promise<Notification>} 응답 데이터
 */
export async function getNotificationByIdApi(
  id: number
): Promise<Notification> {
  const url = `/notifications/${id}`;
  return handleApiCall(() => api.get(url), "GET", url);
}

export interface PatchNotificationStatusByIdApiRes {
  id: number;
  is_read: boolean;
  read_at: string;
  updated_at: string;
}

/**
 * 알림을 읽음 상태로 업데이트하는 PATCH 메서드
 * @param {number} id 상태를 변경할 알림의 id
 * @returns {Promise<PatchNotificationStatusByIdApiRes>} 응답 데이터
 */
export async function patchNotificationStatusByIdApi(
  id: number
): Promise<PatchNotificationStatusByIdApiRes> {
  const url = `notifications/${id}/read`;
  return handleApiCall(() => api.patch(url), "PATCH", url);
}

export interface DeleteNotificationByIdApiRes {
  detail: string;
}

/**
 * 알림을 삭제하는 DELETE 메서드
 * @param {number} id 삭제할 알림의 id
 * @returns {Promise<DeleteNotificationByIdApiRes>} 응답 데이터
 */
export async function deleteNotificationByIdApi(
  id: number
): Promise<DeleteNotificationByIdApiRes> {
  const url = `/notifications/${id}`;
  return handleApiCall(() => api.delete(url), "DELETE", url);
}
