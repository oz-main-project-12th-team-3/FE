import { handleApiCall } from "../apiClient";

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

export type GetChatMessagesBySessionApiRes = Message[];

export interface GetChatMessageByIdApiRes {
  id: number;
  session_id: number;
  sender: Sender;
  message: string;
  is_important: boolean;
  timestamp: string;
}

export interface PutChatMessageApiReq {
  is_important: boolean;
}

export interface PutChatMessageApiRes {
  id: number;
  detail: { is_important: boolean };
  updated_at: string;
}

export interface DeleteChatMessageApiRes {
  detail: string;
}

export const chatLogApi = {
  GET: {
    /**
     * 세션별 메시지 GET메서드
     * @param {number} sessionId - 요청할 세션 id
     * @returns {Promise<GetChatMessagesBySessionApiRes>} 응답 데이터
     */
    messagesBySessionId: async (sessionId: number) => {
      const url = `/chat-messages/`;
      return await handleApiCall({
        method: "GET",
        url: url,
        params: { session_id: sessionId },
      });
    },
    /**
     * 단일 메시지 조회 GET메서드
     * @param {number} id - 메시지 id
     * @returns {Promise<GetChatMessageByIdApiRes>} 응답 데이터
     */
    messageById: async (id: number) => {
      const url = `/chat-messages/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 메시지 생성(사용자 → AI)
     * @param {PostChatMessageApiReq} payload - 요청 데이터
     * @returns {Promise<PostChatMessageApiRes>} 응답 데이터
     */
    message: async (payload: PostChatMessageApiReq) => {
      const url = `/chat-messages/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 중요 표시 업데이트 PUT메서드
     * @param {number} id  업데이트 할 메시지의 id
     * @param {PutChatMessageApiReq} payload  is_important 불린 값
     * @returns {Promise<PutChatMessageApiRes>} 응답 데이터
     */
    messageById: async (id: number, payload: PutChatMessageApiReq) => {
      const url = `/chat-messages/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 단일 메시지 삭제 메서드
     * @param {number} id 삭제할 메시지의 id
     * @returns {Promise<DeleteChatMessageApiRes>} 응답 데이터
     */
    messageById: async (id: number) => {
      const url = `/chat-messages/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
