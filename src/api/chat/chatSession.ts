import { handleApiCall } from "../apiClient";

interface PostChatSessionsApiReq {
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

interface GetChatSessionsApiRes {
  sessions: Session[];
  detail: string;
}

interface PutChatSessionsApiReq {
  title: string;
}

interface PutChatSessionsApiRes {
  id: number;
  title: string;
  updated_at: string;
}

interface DeleteChatSessionApiRes {
  detail: string;
}

type Sender = "user" | "ai";

type Message = {
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

export interface PostChatMessageApiReq {
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
}

interface PostChatMessageApiRes {
  id: number;
  user_id: number;
  session_id: number;
  message: string;
  sender: Sender;
  is_important: boolean;
  timestamp: string;
}

type GetChatMessagesBySessionApiRes = Message[];

type SearchRes = {};

export const chatApi = {
  GET: {
    /**
     * 유저의 채팅 세션들을 불러오는 GET메서드
     * @returns {Promise<GetChatSessionsApiRes>}
     */
    sessions: async (): Promise<GetChatSessionsApiRes> => {
      const url = `chat-sessions/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 세션별 메시지 GET메서드
     * @param {number} sessionId - 요청할 세션 id
     * @returns {Promise<GetChatMessagesBySessionApiRes>} 응답 데이터
     */
    messagesBySessionId: async (
      sessionId: number
    ): Promise<GetChatMessagesBySessionApiRes> => {
      const url = `chat-sessions/${sessionId}/messages/`;
      return await handleApiCall({
        method: "GET",
        url: url,
      });
    },
    /**
     * 채팅 검색
     * @param {string} keyword
     * @returns {SearchRes}
     */
    searchByKeyword: async (keyword: string): Promise<SearchRes> => {
      const url = `chat/messages/search/${keyword}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 챗 세션 생성 POST메서드
     * @param {PostChatSessionsApiReq} payload 생성할 세션의 제목
     * @returns {Promise<PostChatSessionsApiRes>}
     */
    chatSession: async (
      payload: PostChatSessionsApiReq
    ): Promise<PostChatSessionsApiRes> => {
      const url = `chat-sessions/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 메시지 생성(사용자 → AI)
     * @param {number} sessionId
     * @param {PostChatMessageApiReq} payload - 요청 데이터
     * @returns {Promise<PostChatMessageApiRes>} 응답 데이터
     */
    message: async (
      sessionId: number,
      payload: PostChatMessageApiReq
    ): Promise<PostChatMessageApiRes> => {
      const url = `chat-sessions/${sessionId}/messages/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    /**
     * 채팅 세션 제목을 업데이트하는 PUT메서드
     * @param {number} sessionId 채팅 세션 ID
     * @param {PutChatSessionsApiReq} payload 업데이트할 데이터(title)
     * @returns {Promise<PutChatSessionsApiRes>} 업데이트된 채팅 세션 정보
     */
    sessionById: async (
      sessionId: number,
      payload: PutChatSessionsApiReq
    ): Promise<PutChatSessionsApiRes> => {
      const url = `chat-sessions/${sessionId}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },

  DELETE: {
    /**
     * 채팅 세션 삭제 DELETE메서드
     * @param {number} sessionId
     * @returns {Promise<DeleteChatSessionApiRes>} 응답 데이터
     */
    sessionById: async (
      sessionId: number
    ): Promise<DeleteChatSessionApiRes> => {
      const url = `chat-sessions/${sessionId}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
