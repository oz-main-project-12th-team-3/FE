import { handleApiCall } from "../apiClient";

type TwoFAQRRes = {
  qr: string;
  secret?: string;
};

type TwoFAPostReq = {
  code: string;
};

type TwoFASuccessRes = {
  token: string;
  message?: string;
};

type TwoFARedirectRes = {
  redirect_url: string;
};
 
const base = "/api/auth/2fa";
export const apiTwoFA = {
  GET: {
    // 2FA 설정 정보와 QR 코드 base64 문자열 반환
    QR: async ():Promise<TwoFAQRRes> => {
      const url = `${base}/full/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    // 2FA 내장 페이지로 리다이렉트
    // 반환 타입이 뭐지?
    redirectPage: async ():Promise<TwoFARedirectRes> => {
      const url = `${base}/page/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    // req에 code 필요
    success: async (payload:TwoFAPostReq):Promise<TwoFASuccessRes> => {
      const url = `${base}/full/`;
      return await handleApiCall({ method: "POST", url: url , data:payload});
    },
  },
  PUT: {},
  DELETE: {},
};
