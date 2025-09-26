import { handleApiCall } from "../apiClient";

export interface GetProfileRes {
  nickname: string;
  profile_image_url: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface PutProfileReq {
  nickname: string | null;
  profile_image_url: string | null;
}
export interface PutProfileRes {
  nickname: string;
  profile_image_url: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export const profileApi = {
  GET: {
    /**
     * 엑세스 토큰을 사용 하므로 파라미터 불필요
     * @returns {Promise<GetProfileRes>} .profile_image_url, .nickname
     */
    profile: async () => {
      // Authorization: Bearer <access_token> (필수)
      // src\api\token.ts 에서 이미 인터셉터로 토큰을 자동 추가하므로 별도 헤더 설정 불필요
      const url = `/users/profile/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  PUT: {
    /**
     * 프로필 수정 메서드
     * @param {PutProfileReq} payload nickname, profile_image_url **nullable** 파라미터 둘 다 null 값이면 클라쪽에서 요청 막기
     * @returns {Promise<PutProfileRes>} .profile_image_url, .nickname > res를 바탕으로 스토어 업데이트 할 것
     */
    profile: async (payload:PutProfileReq) => {
      const url = `/users/profile/`;
      return await handleApiCall({ method: "PUT", url: url, data:payload });
    },
  },
};
