import { handleApiCall } from "../apiClient";



export const apiSearchLog = {
  GET: {
    /**
     * 사용자의 검색 기록 조회
     * @returns {Promise<SearchLog[]>}
     */
    searchLogs: async (): Promise<Search.Log[]> => {
      const url = `/api/search-logs/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    // /**
    //  * 사용자의 검색 기록 상세 조회
    //  * @param {number} id 조회할 검색기록의 id
    //  * @returns {Promise<SearchLog>}
    //  */
    // searchLogById: async (id: number): Promise<Search.Log> => {
    //   const url = `/api/search-logs/${id}/`;
    //   return await handleApiCall({ method: "GET", url: url });
    // },
  },
  POST: {
    // 이걸 왜 프론트에서 post요청이 있나??????
    // 어차피 모든 검색은 url로 요청이 갈텐데..
    // "description": "생성된 검색 로그 정보 반환"
    // 이 POST 왜 로그를 반환함?????
    // POST, PATCH 에서 어떤건 객체 반환해주고
    // 어떤건 응답 성공만 되어있고
    // 너무 중구난방이다...
    searchLogById: async (id: number): Promise<Search.Log> => {
      const url = `/api/search-logs/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  PUT: {},
  DELETE: {
    // DELETE 사라짐
    // /api/search-logs/{id}/ << 이 url 요청 자체가 없음
    // id 요청 전부 없음
    // /**
    //  * 검색 기록 삭제
    //  * @param {number} id 삭제할 검색기록의 id
    //  * @returns {Promise<ResDetail>}
    //  */
    // searchLogById: async (id: number)=> {
    //   const url = `/search-logs/${id}/`;
    //   return await handleApiCall({ method: "DELETE", url: url });
    // },
  },
};
