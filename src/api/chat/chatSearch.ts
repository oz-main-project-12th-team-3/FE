import { handleApiCall } from "../apiClient";

export const apiChatSearch = {
  GET: {
    query: async (
      page: API.PageReq,
      keyword: string
    ): Promise<API.Paginated<Chat.SearchRes>> => {
      const params = {
        page: String(page.page),
        page_size: String(page.page_size),
        detail: keyword,
      };
      const url = `/api/chat/messages/search/`;
      return await handleApiCall({ method: "GET", url: url, params: params });
    },
  },
};
