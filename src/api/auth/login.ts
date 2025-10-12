import { handleApiCall } from "../apiClient";

export type LoginReq = {
  email: string;
  password: string;
  tfa_code?:string;
};


type EmailCheckReq = {
  email: string;
};
type EmailCheckRes = {
  detail: string;
  available: boolean;
};

export const loginApi = {
  POST: {
    /**
     * 로그인 메서드
     * @param {LoginReq} payload 이메일, 비번
     * @returns {} .detail에 "로그인 성공" 반환됨
     */
    login: async (payload: LoginReq): Promise<Auth.loginResponse> => {
      const url = `/api/auth/login/`;
      const res = await handleApiCall<Auth.loginResponse>({
        method: "POST",
        url: url,
        data: payload,
      });
      localStorage.setItem("access_token", res.access_token);
      if (res.refresh_token) {
        localStorage.setItem("refresh_token", res.refresh_token);
      }
      localStorage.setItem("expires_in", res.expires_in.toString());
      return res;
    },
    /**
     * 이메일 중복 체크
     * @param {EmailCheckReq} payload 중복 체크할 이메일
     * @returns {Promise<EmailCheckRes>} .detail에 응답 메시지 .available에 불린값
     */
    checkEmailDuplicate: async (
      payload: EmailCheckReq
    ): Promise<EmailCheckRes> => {
      const url = `/api/auth/email-check/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 로그아웃
     * @returns {Promise<ResDetail>}
     */
    logout: async () => {
      const url = `/api/auth/logout/`;
      try {
        return await handleApiCall({ method: "POST", url: url });
      } finally {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_in");
      }
    },
  },
};
