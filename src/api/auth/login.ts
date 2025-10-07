import { handleApiCall, TokenManager } from "../apiClient";

export type LoginReq = {
  email: string;
  password: string;
};

interface LoginRes {
  detail: string;
  user_id: number;
  email: string;
  expires_in: number;
  access_token: string;
  tfa_required: boolean;
  tfa_step: string;
  temporary_access_token: string;
  temporary_refresh_token: string;
}

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
     * @returns {Promise<LoginRes>} .detail에 "로그인 성공" 반환됨
     */
    login: async (payload: LoginReq): Promise<LoginRes> => {
      const url = `v1/auth/login/`;
      const res = await handleApiCall<LoginRes>({
        method: "POST",
        url: url,
        data: payload,
      });
      TokenManager.setTokens(
        res.access_token,
        res.user_id.toString(),
        res.expires_in
      );
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
      const url = `v1/auth/email-check/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    /**
     * 로그아웃
     * @returns {Promise<ResDetail>}
     */
    logout: async (): Promise<ResDetail> => {
      const url = `v1/auth/logout/`;
      try {
        return await handleApiCall({ method: "POST", url: url });
      } finally {
        TokenManager.clearTokens();
      }
    },
  },
};
