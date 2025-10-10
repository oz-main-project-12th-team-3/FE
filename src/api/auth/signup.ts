import { handleApiCall } from "../apiClient";

export type SignupReq = {
  email: string;
  password: string;
  nickname: string;
  enable_2fa: boolean;
};

export const signupApi = {
  POST: {
    /**
     * 회원가입 메서드
     * @param {SignupReq} payload  이메일, 비번, 닉네임
     * @returns {Promise<Auth.loginResponse>} .detail에 "회원가입이 성공적으로 완료되었습니다." 반환됨
     */
    signup: async (payload: SignupReq): Promise<Auth.loginResponse> => {
      const url = `/api/auth/signup/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
};
