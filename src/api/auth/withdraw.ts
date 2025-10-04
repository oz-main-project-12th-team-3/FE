import { handleApiCall } from "../apiClient";

type WithDrawReq = {
  password: string;
};

export const apiWithDraw = {
  DELETE: {
    /**
     * 회원 탈퇴 메서드
     * @param {WithDrawReq} payload 패스워드
     * @returns {Promise<ResDetail>} .detail에 메시지
     */
    withDraw: async (payload: WithDrawReq): Promise<ResDetail> => {
      const url = `/users/delete/`;
      return await handleApiCall({ method: "DELETE", url: url, data: payload });
    },
  },
};
