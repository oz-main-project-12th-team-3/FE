import axios, { isAxiosError, type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터: 모든 요청에 대해 토큰 유효성 검사 및 갱신 시도
apiClient.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    // 토큰이 없는 경우 (로그인 전 또는 로그아웃 상태)
    if (!access_token && !refresh_token) {
      return config;
    }

    // access_token이 유효한 경우
    if (access_token) {
      const payload = JSON.parse(atob(access_token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp > now) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
        return config;
      }
    }

    // access_token이 만료되었지만 refresh_token이 있는 경우
    if (refresh_token) {
      try {
        const refresh_res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );
        const new_access_token = refresh_res.data.access_token;
        const new_refresh_token = refresh_res.data.refresh_token;
        const new_expires_in = refresh_res.data.expires_in;

        localStorage.setItem("access_token", new_access_token);
        localStorage.setItem("refresh_token", new_refresh_token);
        localStorage.setItem("expires_in", new_expires_in);

        config.headers["Authorization"] = `Bearer ${new_access_token}`;
        return config;
      } catch (refreshError) {
        // 리프레시 토큰 만료 또는 유효하지 않은 경우
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_in");
        // 로그인 페이지로 리다이렉트 또는 오류 처리
        window.location.href = "/login"; // 예시
        return Promise.reject(refreshError); // 요청 중단
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleApiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await apiClient(config);
    return res.data as T;
  } catch (error: unknown) {
    let message = "알 수 없는 오류가 발생했습니다.";
    if (isAxiosError(error)) {
      message = error.response?.data?.detail || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    throw new Error(
      `!ERROR!\nmethod: ${config.method}\nurl: ${config.url}\ndetails: ${message}`
    );
  }
};
