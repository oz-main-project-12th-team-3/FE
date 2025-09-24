import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { AxiosError } from "axios";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";
import { api, BASE_URL } from "../baseApi";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean;
}

// 토큰 유틸리티 함수
export const tokenUtils = {
  // 엑세스토큰, 유저 id 세팅
  setTokens(accessToken: string, userId?: string) {
    sessionStorage.setItem("access_token", accessToken);
    if (userId) {
      sessionStorage.setItem("user_id", userId);
    }
  },

  clearTokens() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_id");
  },

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem("access_token");
  },

  getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  },

  getUserId(): number | null {
    const userId = sessionStorage.getItem("user_id");
    return userId ? parseInt(userId, 10) : null;
  },

  /**
   * 클라쪽에서 토큰 만료 체크해서 불필요한 요청 줄임
   * 보안체크 x 비용 절감 o
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // 초 단위로 평가
      // 백엔드에서도 시간 양식이 같은지 확인 필요
      // >> 시간양식 초단위로 통일해서 변경 예정.
      return !!decoded.exp && decoded.exp < Date.now() / 1000 + 30;
    } catch {
      return true;
    }
  },
};

// Req interceptor - 토큰 자동 추가
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (config.skipAuth === undefined) {
      config.skipAuth = false;
      // skipAuth: 커스텀 속성
      // 디폴트값으로 false를 줘서 기본적으론 인증 걸침
      // 인증 스킵하려면 api.method("url", { skipAuth: true }); 사용(비로그인 chat 등등...)
    }
    if (config.skipAuth) return config;

    const token = tokenUtils.getAccessToken();
    if (token) {
      // config.headers.set("Authorization", `Bearer ${token}`);
      // axios 버전에 따라 사용 안될수도 있음
      // 현재 코드는 1.xx 이상이라 가능하지만 안정성을 위해 객체 할당 방식을 사용
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Res interceptor - 토큰 만료 처리
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 만료 체크: 이미 만료되지 않았다면 스킵 (불필요 리프레시 방지)
        const accessToken = tokenUtils.getAccessToken();
        if (accessToken && !tokenUtils.isTokenExpired(accessToken)) {
          return api(originalRequest);
        }

        // 무한루프 방지를 위한 새로운 인스턴스 사용
        const response = await axios.post(
          `${BASE_URL}/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );

        const { access_token, user_id } = response.data;

        tokenUtils.setTokens(access_token, user_id?.toString());

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        tokenUtils.clearTokens();

        if (typeof window !== "undefined") {
          toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
          // window.location.href = "/login";
          // TODO: 라우팅 구조에 맞게 수정해야됨
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 로그아웃 메서드
 *
 * @summary 사용자 인증 토큰을 무효화하고 로그아웃 처리
 *
 * @description
 * - 인터셉터로 요청된 유저의 토큰을 자동 전송
 * - tokenUtils.clearTokens();로 현재 액세스 토큰을 제거
 * - HTTP-only 쿠키의 리프레시 토큰은 서버에서 자동 처리
 *
 * @returns 로그아웃 성공 메시지
 * @example
 * ```typescript
 * const result = await deleteAuthLogoutApi();
 * console.log(result.detail); // "Token revoked successfully."
 * ```
 */
export async function deleteAuthLogoutApi() {
  try {
    const res = await api.delete("/auth/logout/");
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return { detail: "Already logged out" };
    }
    const message = error.response?.data?.message || error.message;
    throw new Error(`deleteAuthLogoutApi failed: ${message}`);
  } finally {
    tokenUtils.clearTokens();
  }
}
