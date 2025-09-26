import { handleApiCall } from "../apiClient";

type Req = {
  new_password: string;
};

export const apiChangePassword = {
  PATCH: {
    password: async (payload: Req):Promise<ResDetail> => {
      const url = `/users/password-change/`;
      return await handleApiCall({ method: "PATCH", url: url, data: payload });
    },
  },
};
