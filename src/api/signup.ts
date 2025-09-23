import { api } from "./baseApi";

interface SignupReq {
  email: string;
  password: string;
  nickname: string;
}

interface SignupRes {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  detail: string;
}

/**
 *
 * @param {SignupReq} payload  이메일, 비번, 닉네임
 * @returns {SignupRes} .detail에 "회원가입이 성공적으로 완료되었습니다." 반환됨
 */
export async function signupApi(payload: SignupReq): Promise<SignupRes> {
  try {
    const res = await api.post("/auth/signup", payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`signupApi failed: ${message}`);
  }
}
