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
    setEmail: async (payload: User.SetUsername): Promise<User.SetUsername> => {
      const url = `/api/auth/users/set_email/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
    setPassword: async (
      payload: User.SetPassword
    ): Promise<User.SetPassword> => {
      const url = `/api/auth/users/set_password/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
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
    // 회원 탈퇴 (유저삭제) 메서드가 왜 3개 ?
    // /api/auth/users/{id}/ :DELETE
    // /api/auth/users/me/ :DELETE
    // /api/users/delete/ :POST

    // 왜 메서드가 중복되는가???
    // /api/auth/users/{id}/ :DELETE 의 경우 보안상의 이슈가 되지 않는가???

    // 일단 DELETE에 /api/users/delete/ :POST를 넣고
    // /api/auth/users/{id}/ :DELETE 는 주석처리

    // 구조상 아무런 2차 거름망이 없는 나머지 메서드들은 쓰면 안될듯
    // >>> /api/users/delete/ :POST 사용

    // user: async (id: number) => {
    //   const url = `/api/auth/users/${id}/`;
    //   return await handleApiCall({ method: "DELETE", url: url });
    // },
    user: async (payload:{password:string}) => {
      const url = `/api/users/delete/`;
      return await handleApiCall({ method: "POST", url: url, data:payload });
    },
    // me: async () => {
    //   const url = `/api/auth/users/me/`;
    //   return await handleApiCall({ method: "DELETE", url: url });
    // },
  },
};

export const apiUserPreference = {
  GET: {
    // "description": "사용자 알림 설정 목록 반환"
    // 사용자 알림 설정 목록인 userPreferences 란 객체 자체가 설정 안되어 있음
    // PatchedUserNotificationPreference, UserNotificationPreference 만 존재
    // 일단 글로벌 노티쪽에 타입 지정 후 사용
    // 어차피 현 시점에서 사용하는 설정 객체는 하나뿐인데 왜 목록 반환???
    // 굳이 목록화 해서 이전 설정파일 가져올 필요 있나?
    // get, patch, 초기화만 만들어서 유저id 의존적으로 쓰는게 낫지 않나????
    // userPreferences = {NotificationPreference, ....} 이게 맞지 않나?
    // 다른 설정 타입도 고려해서 구조를 짠 것 같은데 왜 userPreferences 타입이 없지????
    userPreferences: async (): Promise<Noti.UserNotiPreference[]> => {
      const url = `/api/user-preferences/`;
      return await handleApiCall({ method: "GET", url: url });
    },
    // 여기도 res타입 지정 안되어 있음
    userPreferenceById: async (
      id: number
    ): Promise<Noti.UserNotiPreference> => {
      const url = `/api/user-preferences/${id}/`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    // "description": "사용자 알림 설정 생성 성공"
    // 이건 또 객체 안넘겨줌
    userPreference: async (payload: Noti.UserNotiPreference) => {
      const url = `/api/user-preferences/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {
    userPreferenceById: async (
      id: number,
      payload: Noti.UserNotiPreference
    ) => {
      const url = `/api/user-preferences/${id}/`;
      return await handleApiCall({ method: "PUT", url: url, data: payload });
    },
  },
  PATCH: {
    userPreferenceById: async (
      id: number,
      payload: Partial<Noti.UserNotiPreference>
    ) => {
      const url = `/api/user-preferences/${id}/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
  DELETE: {
    userPreferenceById: async (id: number) => {
      const url = `/api/user-preferences/${id}/`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};

// 유저, 프로필, auth 명시적으로 분리가 안되어 있음

export const apiProfile = {
  GET:{
    // "description": "사용자 프로필 정보"
    // 여기도 res에 description만 있고 타입 지정 안됨
    profile:async ():Promise<User.UserProfile> =>{
          const url = `/api/users/profile/`;
          return await handleApiCall({ method: "GET", url: url });
        },
  },
  POST:{},
  PATCH:{
    // 여기도 res 를 코드로만 구분해야함
    profile:async (payload:Partial<User.UserProfile>) =>{
          const url = `/api/users/profile/`;
          return await handleApiCall({ method: "PATCH", url: url , data:payload});
        },
  },
  PUT:{},
  DELETE:{
    // 프로필 삭제 왜 있지??????
    profile:async () =>{
          const url = `/api/users/profile/`;
          return await handleApiCall({ method: "DELETE", url: url });
        },
  },
}
