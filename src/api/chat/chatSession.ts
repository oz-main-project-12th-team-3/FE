import { handleApiCall } from "../apiClient";

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

export interface PutChatSessionsApiReq {
  title: string;
}

export interface PutChatSessionsApiRes {
  id: number;
  title: string;
  updated_at: string;
}

export interface DeleteChatSessionApiRes {
  detail: string;
}

export const chatSessionApi = {
  GET: {
    /**
     * 유저의 채팅 세션들을 불러오는 GET메서드
     * @returns {Promise<GetChatSessionsApiRes>}
     */
    sessions: async ():Promise<GetChatSessionsApiRes> => {
      const url = `/chat-sessions/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 챗 세션 생성 POST메서드
     * @param {PostChatSessionsApiReq} payload 생성할 세션의 제목
     * @returns {Promise<PostChatSessionsApiRes>}
     */
    chatSession: async (payload: PostChatSessionsApiReq):Promise<PostChatSessionsApiRes> => {
      const url = `/chat-sessions/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 채팅 세션 제목을 업데이트하는 PUT메서드
     * @param {number} id 채팅 세션 ID
     * @param {PutChatSessionsApiReq} payload 업데이트할 데이터(title)
     * @returns {Promise<PutChatSessionsApiRes>} 업데이트된 채팅 세션 정보
     */
    sessionById: async (id: number, payload: PutChatSessionsApiReq):Promise<PutChatSessionsApiRes> => {
      const url = `/chat-sessions/${id}`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 채팅 세션 삭제 DELETE메서드
     * @param {number} id
     * @returns {Promise<DeleteChatSessionApiRes>} 응답 데이터
     */
    sessionById: async (id: number):Promise<DeleteChatSessionApiRes> => {
      const url = `/chat-sessions/${id}`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
