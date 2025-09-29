import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { toast } from "react-toastify";

const NO_AUTH_URLS = [
  "/api/v1/auth/signup/",
  "/api/v1/auth/login/",
  "/api/v1/auth/password-reset/",
  "/api/v1/auth/email-check/",
];

export class TokenManager {
  static setTokens(accessToken: string, userId?: string, expiresIn?: number) {
    sessionStorage.setItem("access_token", accessToken);
    if (userId) sessionStorage.setItem("user_id", userId);
    if (expiresIn) {
      const expirationTime = Date.now() + expiresIn * 1000; // 밀리초로 변환
      sessionStorage.setItem("expiration_time", expirationTime.toString());
    }
  }

  static clearTokens() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("expiration_time");
  }

  static getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }

  static getUserId(): number | null {
    const id = sessionStorage.getItem("user_id");
    return id ? parseInt(id, 10) : null;
  }

  static getExpirationTime(): number | null {
    const exp = sessionStorage.getItem("expiration_time");
    return exp ? parseInt(exp, 10) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  static isTokenExpired(): boolean {
    const expirationTime = this.getExpirationTime();
    if (!expirationTime) return true;
    return expirationTime < Date.now() + 30000; // 30초 마진
  }
}

class ApiClient {
  private api: AxiosInstance;
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const isNoAuthUrl = NO_AUTH_URLS.some((url) =>
        config.url?.startsWith(url)
      );
      if (isNoAuthUrl) return config;

      const token = TokenManager.getAccessToken();
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const accessToken = TokenManager.getAccessToken();
            if (accessToken && !TokenManager.isTokenExpired()) {
              return this.api(originalRequest);
            }

            const res = await axios.post(
              `${this.baseUrl}/api/v1/auth/token/refresh/`,
              {},
              { withCredentials: true }
            );

            const { access_token, user_id, detail, expires_in } = res.data;
            TokenManager.setTokens(
              access_token,
              user_id?.toString(),
              expires_in
            );

            if (originalRequest.headers) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${access_token}`;
            }
            if (!!this.api(originalRequest)) toast.info(detail);
            return this.api(originalRequest);
          } catch (refreshError) {
            TokenManager.clearTokens();
            if (typeof window !== "undefined") {
              toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
              // window.location.href = "/login";
              // 모달창 구조에 적합한 방법인가? 로그인 모달창 이동에 적절한 방식 찾기
            }
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get instance(): AxiosInstance {
    return this.api;
  }
}

const BASE_URL = "http://localhost:8080";

const apiClient = new ApiClient(BASE_URL);

export async function handleApiCall<T>(
  config: { method: Method } & AxiosRequestConfig
): Promise<T> {
  try {
    const res: AxiosResponse<T> = await apiClient.instance.request<T>(config);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(
      `!ERROR!\nmethod: ${config.method}\nurl: ${config.url}\ndetails: ${message}`
    );
  }
}
