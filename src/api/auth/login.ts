import { api } from "../baseApi";


export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  detail: string;
  user_id: number;
  expires_in: number;
}

/**
 *
 * @param {LoginReq} payload 이메일, 비번 
 * @returns {LoginRes} .detail에 "로그인 성공" 반환됨
 */
export async function loginApi(payload: LoginReq): Promise<LoginRes> {
  try {
    const res = await api.post(`/auth/login`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`login failed: ${message}`);
  }
}
