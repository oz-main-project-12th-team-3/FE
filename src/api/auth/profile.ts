import { api } from "../baseApi";

interface GetProfileRes {
  nickname: string;
  profile_image_url: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

interface PutProfileReq {
  nickname: string | null;
  profile_image_url: string | null;
}
interface PutProfileRes {
  nickname: string;
  profile_image_url: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

/**
 * 엑세스 토큰을 사용 하므로 파라미터 불필요
 * @returns {GetProfileRes} .profile_image_url, .nickname
 */
export async function getProfileApi(): Promise<GetProfileRes> {
  try {
    // Authorization: Bearer <access_token> (필수)
    // src\api\token.ts 에서 이미 인터셉터로 토큰을 자동 추가하므로 별도 헤더 설정 불필요
    const res = await api.get(`/users/profile/`);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`get profile failed: ${message}`);
  }
}

/**
 * @param {PutProfileReq} payload nickname, profile_image_url **nullable** 파라미터 둘 다 null 값이면 클라쪽에서 요청 막기
 * @returns {PutProfileRes} .profile_image_url, .nickname > res를 바탕으로 스토어 업데이트 할 것
 */
export async function putProfileApi(
  payload: PutProfileReq
): Promise<PutProfileRes> {
  try {
    const res = await api.put(`/users/profile/`, payload);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`put profile failed: ${message}`);
  }
}
