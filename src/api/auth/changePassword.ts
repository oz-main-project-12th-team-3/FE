import { handleApiCall } from "../apiClient";

type Req = {
  email: string;
};

export const apiChangePassword = {
  POST: {
    password: async (payload: Req):Promise<ResDetail> => {
      const url = `/api/v1/auth/password-reset/`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
};
