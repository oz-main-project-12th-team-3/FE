import { api } from "./baseApi";

export interface PostChatSessionsApiReq {
  title: string;
}

export interface PostChatSessionsApiRes {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

/**
 * 챗 세션 생성 POST메서드
 * @param {PostChatSessionsApiReq} payload title
 * @returns {PostChatSessionsApiRes}
 */
export async function postChatSessionsApi(
  payload: PostChatSessionsApiReq
): Promise<PostChatSessionsApiRes> {
  try {
    const res = await api.post(`/chat-sessions`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`postChatSessionsApi failed: ${message}`);
  }
}

export type Session = {
  id: number;
  title: string;
  last_message: string;
  updated_at: string;
};

export interface GetChatSessionsApiRes {
  sessions: Session[];
  detail: string;
}

/**
 * 유저의 채팅 세션들을 불러오는 GET메서드
 * @returns {Promise<GetChatSessionsApiRes> }
 */
export async function getChatSessionsApi(): Promise<GetChatSessionsApiRes> {
  try {
    const res = await api.get(`/chat-sessions`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`getChatSessionsApi failed: ${message}`);
  }
}

export interface PutChatSessionsApiReq {
  title: string;
}

export interface PutChatSessionsApiRes {
  id: number;
  title: string;
  updated_at: string;
}

/**
 * 채팅 세션 제목을 업데이트하는 PUT메서드
 * @param {number} id - 채팅 세션 ID
 * @param {PutChatSessionsApiReq} payload - 업데이트할 데이터
 * @returns {Promise<PutChatSessionsApiRes>} 업데이트된 채팅 세션 정보
 */
export async function putChatSessionsApi(
  id: number,
  payload: PutChatSessionsApiReq
): Promise<PutChatSessionsApiRes> {
  try {
    const res = await api.put(`/chat-sessions/${id}`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`putChatSessionsApi failed: ${message}`);
  }
}

export interface DeleteChatSessionApiRes {
  detail: string;
}

/**
 * 채팅 세션 삭제 DELETE메서드
 * @param {number} id
 * @returns {Promise<DeleteChatSessionApiRes>} 응답 데이터
 */
export async function deleteChatSessionApi(
  id: number
): Promise<DeleteChatSessionApiRes> {
  try {
    const res = await api.delete(`/chat-sessions/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`deleteChatSessionApi failed: ${message}`);
  }
}

