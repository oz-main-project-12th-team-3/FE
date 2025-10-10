import { handleApiCall } from "../apiClient";

export const apiChat = {
  GET: {
    /**
     * 유저의 채팅 세션들을 불러오는 GET메서드
     * @returns {}
     */
    sessions: async (
      payload: API.PageReq
    ): Promise<API.Paginated<Chat.Session>> => {
      const url = `/api/chat-sessions/`;
      return await handleApiCall({ method: "GET", url: url, data: payload });
    },
    // // 왜 api 명세상 단일 세션 get 메서드 res 가 description 밖에 없나?
    // // 메시지 받아오는 메서드는 따로 있고 단일 세션 조회가 왜 필요하나?
    // /**
    //  * 세션별 메시지 GET메서드
    //  * @param {number} sessionId - 요청할 세션 id
    //  * @returns {Promise<GetChatMessagesBySessionApiRes>} 응답 데이터
    //  */
    // messagesBySessionId: async (
    //   sessionId: number
    // ): Promise<GetChatMessagesBySessionApiRes> => {
    //   const url = `chat-sessions/${sessionId}/messages/`;
    //   return await handleApiCall({
    //     method: "GET",
    //     url: url,
    //   });
    // },
    messagesBySessionId: async (
      session_id: number,
      payload: API.PageReq
    ): Promise<API.Paginated<Chat.Log>> => {
      const url = `/api/chat-sessions/${session_id}/messages/`;
      return await handleApiCall({
        method: "GET",
        url: url,
        data: payload,
      });
    },
    // /**
    //  * 채팅 검색
    //  * @param {string} keyword
    //  * @returns {SearchRes}
    //  */
    // searchByKeyword: async (keyword: string): Promise<SearchRes> => {
    //   const url = `chat/messages/search/${keyword}/`;
    //   return await handleApiCall({ method: "GET", url: url });
    // },
  },
  POST: {
    /**
     * 챗 세션 생성 POST메서드
     * @param {}
     * @returns {}
     */
    chatSession: async (payload: Partial<Chat.Session>): Promise<Chat.Session> => {
      const url = `/api/chat-sessions/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
      /**
       * 메시지 생성(사용자 → AI)
       * @param {number} session_id
       * @param {} payload - 요청 데이터
       * @returns {} 응답 데이터
       */
      messageBySessionId: async (
        session_id: number,
        payload: Chat.Log
      ): Promise<Chat.Log> => {
        const url = `/api/chat-sessions/${session_id}/messages/`;
        return await handleApiCall({ method: "POST", url: url, data: payload });
      },
  },
  PUT: {
    // put은 description인데
    // patch는 왜 session을 반환 ??
    /**
     * 채팅 세션 제목을 업데이트하는 PUT메서드
     * @param {number} session_id 채팅 세션 ID
     * @param {Chat.Session} payload 업데이트할 데이터
     * @returns {Promise<API.Detail>}
     */
    sessionById: async (
      session_id: number,
      payload: Chat.Session
    ) => {
      const url = `/api/chat-sessions/${session_id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    sessionById: async (
      session_id: number,
      payload: Chat.PatchSession
    ): Promise<Chat.Session> => {
      const url = `/api/chat-sessions/${session_id}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    /**
     * 채팅 세션 삭제 DELETE메서드
     * @param {number} session_id
     * @returns {Promise<API.Detail>} 응답 데이터
     */
    sessionById: async (session_id: number) => {
      const url = `/api/chat-sessions/${session_id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
