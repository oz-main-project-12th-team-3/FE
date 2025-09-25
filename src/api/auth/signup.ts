import { handleApiCall } from "../apiCallHelper";

export interface SignupReq {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupRes {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  detail: string;
}

export const signupApi = {
  POST: {
    /**
     * 회원가입 메서드
     * @param {SignupReq} payload  이메일, 비번, 닉네임
     * @returns {Promise<SignupRes>} .detail에 "회원가입이 성공적으로 완료되었습니다." 반환됨
     */
    signup: async (payload:SignupReq) => {
      const url = `/auth/signup`;
      return await handleApiCall({ method: "POST", url: url, data:payload });
    },
  },
};
