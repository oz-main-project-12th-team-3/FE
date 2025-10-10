import { handleApiCall } from "../apiClient";

export const passwordAPI = {
  POST: {
    /**
     * 비밀번호 변경
     * payload 없는게 확실한가?
     * 여기는 또 왜 이메일이 res인가?
     * @param {User.SendEmailReset} payload 새 비밀번호
     * @returns {Promise<User.SendEmailReset>} 성공 메시지
     */
    resetPassword: async (
      payload: User.SendEmailReset
    ): Promise<User.SendEmailReset> => {
      const url = `/api/auth/users/reset_password/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    resetPasswordConfirm: async (payload:User.PasswordResetConfirm):Promise<User.PasswordResetConfirm> =>{
          const url = `/api/auth/users/reset_password_confirm/`;
          return await handleApiCall({ method: "POST", url: url, data:payload });
        },
  },
};
