import { handleApiCall } from "../apiClient";

interface Req {
  email: string;
  password: string;
  nickname: string;
  enable_2fa: string;
}

interface Res {
  detail: string;
  user_id: number;
  email: string;
  tfa_setup_required: string;
}

export const signupApi = {
  POST: {
    /**
     * 회원가입 메서드
     * @param {Req} payload  이메일, 비번, 닉네임
     * @returns {Promise<Res>} .detail에 "회원가입이 성공적으로 완료되었습니다." 반환됨
     */
    signup: async (payload: Req): Promise<Res> => {
      const url = `/api/v1/auth/signup/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
};
