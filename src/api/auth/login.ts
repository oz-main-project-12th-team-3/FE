import { handleApiCall } from "../apiCallHelper";

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  detail: string;
  user_id: number;
  expires_in: number;
}

export const loginApi = {
  POST: {
    /**
     * 로그인 메서드
     * @param {LoginReq} payload 이메일, 비번
     * @returns {Promise<LoginRes>} .detail에 "로그인 성공" 반환됨
     */
    login: async (payload: LoginReq) => {
      const url = `/auth/login`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
};
