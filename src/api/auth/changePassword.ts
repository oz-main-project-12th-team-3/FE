import { handleApiCall } from "../apiClient";

export const passwordAPI = {
  POST: {
    // /api/auth/users/reset_password/ :POST
    // 아마 비번 잊었을때 이메일 인증
    // /api/users/password-change/ : PATCH
    // 비번 변경
    /**
     * 비밀번호 리셋
     * @param {User.SendEmailReset} payload 새 비밀번호
     * @returns {Promise<User.SendEmailReset>} 성공 메시지
     */
    resetPassword: async (
      payload: User.SendEmailReset
    ): Promise<User.SendEmailReset> => {
      const url = `/api/auth/users/reset_password/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    resetPasswordConfirm: async (
      payload: User.PasswordResetConfirm
    ): Promise<User.PasswordResetConfirm> => {
      const url = `/api/auth/users/reset_password_confirm/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PATCH: {
    // 보통 현재 로그인 중인 계정의 비밀번호 요구해야 하지 않나???
    changePW: async (payload: { new_password: string }) => {
      const url = `/api/users/password-change/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
};
