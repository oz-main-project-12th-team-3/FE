import { handleApiCall } from "../apiClient";

export interface PasswordChangeReq {
  new_password: string;
}

export const passwordAPI = {
  PATCH: {
    /**
     * 비밀번호 변경
     * @param {PasswordChangeReq} payload 새 비밀번호
     * @returns {Promise<PasswordChangeRes>} 성공 메시지
     */
    changePassword: async (payload: PasswordChangeReq): Promise<ResDetail> => {
      const url = `/api/v1/auth/password-reset/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
};