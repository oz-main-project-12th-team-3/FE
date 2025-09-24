import { handleApiCall } from "../apiCallHelper";
import { api } from "../baseApi";
import type { NotificationStatusType } from "./notification";

export type ScheduleNotificationStatus = "pending" | "sent";

export type ScheduleNotification = {
  id: number;
  user_id: number;
  notification_id: number;
  scheduled_time: string;
  sent_at: string | null;
  status: ScheduleNotificationStatus;
  created_at: string;
  updated_at: string;
};

export type GetUserScheduleNotificationsApiRes = ScheduleNotification[];

/**
 * 특정 사용자의 예약 알림 목록을 조회
 * @param {number} user_id 사용자의 id
 * @returns {Promise<GetUserScheduleNotificationsApiRes>} 응답 데이터
 */
export async function getUserScheduleNotificationsApi(
  user_id: number
): Promise<GetUserScheduleNotificationsApiRes> {
  const url = `/schedule-notifications/${user_id}`;
  return handleApiCall(() => api.get(url), `GET`, url);
}

export interface postScheduleNotificationsApiReq {
  user_id: number;
  notification_id: number;
  scheduled_time: string;
  status: ScheduleNotificationStatus;
}

/**
 * 새로운 예약 알림을 생성합니다.
 * @param {postScheduleNotificationsApiReq} payload - 요청 데이터
 * @returns {Promise<ScheduleNotification>} 응답 데이터
 */
export async function postScheduleNotificationsApi(
  payload: postScheduleNotificationsApiReq
): Promise<ScheduleNotification> {
  const url = `/schedule-notifications`;
  return handleApiCall(() => api.post(url, payload), `POST`, url);
}

/**
 * 특정 예약 알림의 상세 정보를 조회
 * @param {number} id 조회할 예약 알림의 id
 * @returns {Promise<ScheduleNotification>} 응답 데이터
 */
export async function getSingleScheduleNotificationsApi(
  id: number
): Promise<ScheduleNotification> {
  const url = `/schedule-notifications/${id}`;
  return handleApiCall(() => api.get(url), `GET`, url);
}

export interface putScheduleNotificationsByIdApiReq {
  scheduled_time: string;
  status: NotificationStatusType;
  sent_at: string;
}

export interface putScheduleNotificationsByIdApiRes {
  id: number;
  scheduled_time: string;
  sent_at: string;
  status: NotificationStatusType;
  updated_at: string;
}

/**
 * 예약 알림 정보를 수정
 * @param {number} id 수정할 예약 알림의 id
 * @param {putScheduleNotificationsByIdApiReq} payload 
 * @returns {Promise<putScheduleNotificationsByIdApiRes>} 응답 데이터
 */
export async function putScheduleNotificationsByIdApi(
  id: number,
  payload: putScheduleNotificationsByIdApiReq
): Promise<putScheduleNotificationsByIdApiRes> {
  const url = `/schedule-notifications/${id}`;
  return handleApiCall(() => api.put(url, payload), `PUT`, url);
}

export interface DeleteScheduleNotificationsByIdApiRes {
  
}

/**
 * 예약 알림을 삭제합니다.
 * @param {number} id 삭제할 예약 알림의 id
 * @returns {Promise<DeleteScheduleNotificationsByIdApiRes>} 응답 데이터
 */
export async function deleteScheduleNotificationsByIdApi(id:number): Promise<DeleteScheduleNotificationsByIdApiRes> {
  const url =`/schedule-notifications/${id}`;
  return handleApiCall(() => api.delete(url), `DELETE`, url);
}