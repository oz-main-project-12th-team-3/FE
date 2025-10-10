import { handleApiCall } from "../apiClient";

type PaginatedUserList = API.Paginated<User.Item>;

export const apiUser = {
  GET: {
    /**
     * 유저 불러오기
     * @returns .result에 결과 저장
     */
    users: async (): Promise<PaginatedUserList> => {
      const url = `/api/auth/users/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    oneUser: async (id: number): Promise<User.Item> => {
      const url = `/api/auth/users/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    me: async (): Promise<User.Item> => {
      const url = `/api/auth/users/me/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    user: async (
      payload: User.CreatePasswordRetype
    ): Promise<User.CreatePasswordRetype> => {
      const url = `/api/auth/users/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    activation: async (payload: User.Activation): Promise<User.Activation> => {
      const url = `/api/auth/users/activation/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    // activation: async (payload: SendEmailReset): Promise<SendEmailReset> => {
    //   const url = `/api/auth/users/activation/`;
    //   return await handleApiCall({ method: "POST", url: url, data: payload });
    // },
    resetEmail: async (
      payload: User.SendEmailReset
    ): Promise<User.SendEmailReset> => {
      const url = `/api/auth/users/reset_email/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    // 여기는 또 왜 명세JSON 상 UsernameResetConfirm이란 타입 사용?
    // UsernameResetConfirm 이 아니라 resetEmailConfirm이 맞지 않나?
    nameResetConfirm: async (
      payload: User.UsernameResetConfirm
    ): Promise<User.UsernameResetConfirm> => {
      const url = `/api/auth/users/reset_email_confirm/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    setEmail:async (payload:User.SetUsername):Promise<User.SetUsername> =>{
          const url = `/api/auth/users/set_email/`;
          return await handleApiCall({ method: "POST", url: url, data:payload });
        },
    setPassword:async (payload:User.SetPassword):Promise<User.SetPassword> =>{
          const url = `/api/auth/users/set_password/`;
          return await handleApiCall({ method: "POST", url: url, data:payload });
        },
  },
  PUT: {
    user: async (id: number, payload: User.Item): Promise<User.Item> => {
      const url = `/api/auth/users/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
    me: async (payload: User.Item): Promise<User.Item> => {
      const url = `/api/auth/users/me/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    user: async (id: number, payload: User.Patched): Promise<User.Item> => {
      const url = `/api/auth/users/${id}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
    me: async (payload: User.Patched): Promise<User.Item> => {
      const url = `/api/auth/users/me/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    user: async (id: number): Promise<API.Detail> => {
      const url = `/api/auth/users/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
    me: async (): Promise<API.Detail> => {
      const url = `/api/auth/users/me/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
