import { api } from "./baseApi";

export type Sender = "user" | "ai";

export interface PostChatMessageApiReq {
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
}

export interface PostChatMessageApiRes {
  id: number;
  user_id: number;
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
}

/**
 * 메시지 생성(사용자 → AI)
 * @param {PostChatMessageApiReq} payload - 요청 데이터
 * @returns {Promise<PostChatMessageApiRes>} 응답 데이터
 */
export async function postChatMessageApi(
  payload: PostChatMessageApiReq
): Promise<PostChatMessageApiRes> {
  try {
    const res = await api.post(`/chat-messages`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`postChatMessageApi failed: ${message}`);
  }
}

export type Message = {
  id: number;
  user_id: number;
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
  created_at: string;
  updated_at: string;
};

export interface GetChatMessagesBySessionApiRes {
  messages: Message[];
}

/**
 * 세션별 메시지 GET메서드
 * @param {number} sessionId - 요청할 세션 id
 * @returns {Promise<GetChatMessagesBySessionApiRes>} 응답 데이터
 */
export async function getChatMessagesBySessionApi(
  sessionId: number
): Promise<GetChatMessagesBySessionApiRes> {
  try {
    const res = await api.get(`/chat-messages`, {
      params: { session_id: sessionId },
    });
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`getChatMessagesBySessionApi failed: ${message}`);
  }
}

export interface getChatMessageByIdApiRes {
  id: number;
  session_id: number;
  sender: Sender;
  message: string;
  is_important: boolean;
  timestamp: string;
}

/**
 * 단일 메시지 조회 GET메서드
 * @param {number} id - 메시지 id
 * @returns {Promise<getChatMessageByIdApiRes>} 응답 데이터
 */
export async function getChatMessageByIdApi(
  id: number
): Promise<getChatMessageByIdApiRes> {
  try {
    const res = await api.get(`/chat-messages/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`getChatMessageByIdApi failed: ${message}`);
  }
}

export interface PutChatMessageApiReq {
  is_important: boolean;
}

export interface PutChatMessageApiRes {
  id: number;
  detail: { is_important: boolean };
  updated_at: string;
}

/**
 * 중요 표시 업데이트 PUT메서드
 * @param {number} id - 업데이트 할 메시지의 id
 * @param {PutChatMessageApiReq} payload - is_important 불린 값
 * @returns {Promise<PutChatMessageApiRes>} 응답 데이터
 */
export async function putChatMessageApi(
  id: number,
  payload: PutChatMessageApiReq
): Promise<PutChatMessageApiRes> {
  try {
    const res = await api.put(`/chat-messages/${id}`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`putChatMessageApi failed: ${message}`);
  }
}



export interface DeleteChatMessageApiRes {
  message:string
}

/**
 * 단일 메시지 삭제 메서드
 * @param {number} id 삭제할 메시지의 id
 * @returns {Promise<DeleteChatMessageApiRes>} 응답 데이터
 */
export async function deleteChatMessageApi(id: number): Promise<DeleteChatMessageApiRes> {
  try {
    const res = await api.delete(`/chat-messages/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`deleteChatMessageApi failed: ${message}`);
  }
}