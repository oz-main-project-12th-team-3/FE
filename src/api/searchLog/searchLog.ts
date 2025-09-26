import { handleApiCall } from "../apiClient";

type SearchLog = {
  id: number;
  user_id: number;
  keyword: string;
  search_type: string;
  created_at: string;
  updated_at: string;
};

export const apiSearchLog = {
  GET: {
    /**
     * 사용자의 검색 기록 조회
     * @returns {Promise<SearchLog[]>}
     */
    searchLogs: async (): Promise<SearchLog[]> => {
      const url = `/search-logs/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 사용자의 검색 기록 상세 조회
     * @param {number} id 조회할 검색기록의 id
     * @returns {Promise<SearchLog>}
     */
    searchLogById: async (id: number): Promise<SearchLog> => {
      const url = `/search-logs/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {},
  PUT: {},
  DELETE: {
    /**
     * 검색 기록 삭제
     * @param {number} id 삭제할 검색기록의 id
     * @returns {Promise<ResDetail>}
     */
    searchLogById: async (id: number): Promise<ResDetail> => {
      const url = `/search-logs/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
