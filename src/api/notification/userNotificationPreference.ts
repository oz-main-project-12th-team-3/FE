import { api } from "../baseApi";

type NotificationPreference = {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export interface GetUsersNotificationPreferencesApiRes {
  notificationPreference: NotificationPreference[];
}

/**
 * 사용자 알림 설정 목록들을 조회하는 GET메서드
 * @returns {Promise<GetUsersNotificationPreferencesApiRes>} 응답 데이터
 */
export async function getUsersNotificationPreferencesApi(): Promise<GetUsersNotificationPreferencesApiRes> {
  try {
    const res = await api.get(`/users/notification-preferences`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`getUsersNotificationPreferencesApi failed: ${message}`);
  }
}

export interface GetSingleUserNotificationPreferenceApiRes {
  notificationPreference: NotificationPreference;
}

/**
 * 사용자의 특정 알림 설정 상세 조회하는 GET메서드
 * @param {number} id 특정 알림 설정 항목의 id
 * @returns {Promise<GetSingleUserNotificationPreferenceApiRes>} 응답 데이터
 */
export async function getSingleUserNotificationPreferenceApi(
  id: number
): Promise<GetSingleUserNotificationPreferenceApiRes> {
  try {
    const res = await api.get(`/users/notification-preferences/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(
      `getSingleUserNotificationPreferenceApi failed: ${message}`
    );
  }
}

export interface PostNotificationPreferenceApiReq {
  notification_type_id: number;
  is_enabled: boolean;
}

export interface PostNotificationPreferenceApiRes {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * 사용자 알림 설정 생성하는 POST메서드
 * @param {PostNotificationPreferenceApiReq} payload - 요청 데이터
 * @returns {Promise<PostNotificationPreferenceApiRes>} 응답 데이터
 */
export async function postNotificationPreferencesApi(
  payload: PostNotificationPreferenceApiReq
): Promise<PostNotificationPreferenceApiRes> {
  try {
    const res = await api.post(`/users/notification-preferences`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`postNotificationPreferecesApi failed: ${message}`);
  }
}

export interface PutNotificationPreferenceApiReq {
  is_enabled: boolean;
}

export interface PutNotificationPreferenceApiRes {
  id: number;
  notification_type_id: number;
  is_enabled: boolean;
  updated_at: string;
}

/**
 * 사용자 알림 설정을 수정하는 PUT메서드
 * @param {number} id 변경할 알림 설정의 id
 * @param {PutNotificationPreferenceApiReq} payload - 요청 데이터
 * @returns {Promise<PutNotificationPreferenceApiRes>} 응답 데이터
 */
export async function putNotificationPreferenceApi(
  id: number,
  payload: PutNotificationPreferenceApiReq
): Promise<PutNotificationPreferenceApiRes> {
  try {
    const res = await api.put(`/users/notification-preferences/${id}`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`putNotificationPreferenceApi failed: ${message}`);
  }
}

export interface DeleteUserNotificationPreferenceApiRes {
  detail: string;
}

/**
 * 사용자 알림 설정 삭제하는 DELETE메서드 
 * @param {number} id 삭제할 유저알림설정의 id
 * @returns {Promise<DeleteUserNotificationPreferenceApiRes>} 응답 데이터
 */
export async function deleteUserNotificationPreferenceApi(
  id: number
): Promise<DeleteUserNotificationPreferenceApiRes> {
  try {
    const res = await api.delete(`/users/notification-preferences/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`deleteUserNotificationPreferenceApi failed: ${message}`);
  }
}
