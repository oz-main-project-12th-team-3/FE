import { handleApiCall } from "../apiClient";

export interface GetProfileRes {
  nickname: string;
  profile_image_url: string | null; 
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface PutProfileReq {
  nickname?: string | null;
  profile_image_url?: string | null;
}

export interface PutProfileRes {
  nickname: string;
  profile_image_url: string | null; 
  last_login: string;
  created_at: string;
  updated_at: string;
}

export const apiProfile = {
  GET: {
    /**
     * 현재 로그인한 사용자의 프로필 정보 조회
     * 엑세스 토큰을 사용 하므로 파라미터 불필요
    * @returns {Promise<GetProfileRes>} 프로필 정보
     */
    profile: async (): Promise<GetProfileRes> => {
      // Authorization: Bearer <access_token> (필수)
      // src\api\token.ts 에서 이미 인터셉터로 토큰을 자동 추가하므로 별도 헤더 설정 불필요
      const url = `users/profile/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  PUT: {
    /**
     * 프로필 정보 수정
     * @param {PutProfileReq} payload nickname, profile_image_url (선택적 필드)
     * 수정된 프로필 정보
     * @returns {Promise<PutProfileRes>} .profile_image_url, .nickname > res를 바탕으로 스토어 업데이트 할 것
     */
    profile: async (payload: PutProfileReq): Promise<PutProfileRes> => {
      // 빈 객체 요청 방지
      if (Object.keys(payload).length === 0) {
        throw new Error('수정할 필드가 없습니다.');
      }
      
      const url = `users/profile/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
};