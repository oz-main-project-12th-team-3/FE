import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import { jwtDecode, type JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";

const NO_AUTH_URLS = ["/auth/login"];

class TokenManager {
  static setTokens(accessToken: string, userId?: string) {
    sessionStorage.setItem("access_token", accessToken);
    if (userId) sessionStorage.setItem("user_id", userId);
  }

  static clearTokens() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_id");
  }

  static getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }

  static getUserId(): number | null {
    const id = sessionStorage.getItem("user_id");
    return id ? parseInt(id, 10) : null;
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return !!decoded.exp && decoded.exp < Date.now() / 1000 + 30;
    } catch {
      return true;
    }
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
            if (accessToken && !TokenManager.isTokenExpired(accessToken)) {
              return this.api(originalRequest);
            }

            const res = await axios.post(
              `${this.baseUrl}/auth/token/refresh/`,
              {},
              { withCredentials: true }
            );

            const { access_token, user_id } = res.data;
            TokenManager.setTokens(access_token, user_id?.toString());

            if (originalRequest.headers) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${access_token}`;
            }
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
