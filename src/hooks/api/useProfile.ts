import { apiProfile } from '../../api/auth/profile';
import type { GetProfileRes, PutProfileReq, PutProfileRes } from '../../api/auth/profile';

export const useProfile = () => {
  /**
   * 프로필 조회
   */
  const getProfile = async (): Promise<GetProfileRes> => {
    // console.log('useProfile.getProfile 호출');
    return await apiProfile.GET.profile();
  };

  /**
   * 프로필 수정
   * @param data 수정할 필드 (nickname, profile_image_url)
   */
  const updateProfile = async (data: PutProfileReq): Promise<PutProfileRes> => {
    // console.log('useProfile.updateProfile 호출:', data);
    
    // 수정할 내용이 없으면 에러
    if (!data.nickname && !data.profile_image_url && data.profile_image_url !== null) {
      throw new Error('수정할 내용이 없습니다.');
    }
    
    return await apiProfile.PUT.profile(data);
  };

  /**
   * 프로필 이미지만 업데이트
   * @param imageUrl 이미지 URL (null이면 이미지 삭제)
   */
  const updateProfileImage = async (imageUrl: string | null): Promise<PutProfileRes> => {
    // console.log('useProfile.updateProfileImage 호출:', imageUrl);
    return await apiProfile.PUT.profile({ profile_image_url: imageUrl });
  };

  /**
   * 닉네임만 업데이트
   * @param nickname 새 닉네임
   */
  const updateNickname = async (nickname: string): Promise<PutProfileRes> => {
    // console.log('useProfile.updateNickname 호출:', nickname);
    
    if (!nickname || nickname.trim() === '') {
      throw new Error('닉네임을 입력해주세요.');
    }
    
    return await apiProfile.PUT.profile({ nickname: nickname.trim() });
  };

  return {
    getProfile,
    updateProfile,
    updateProfileImage,
    updateNickname,
  };
};