import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { api } from "./baseApi";

export interface StrictAxiosRequestConfig
  extends Omit<AxiosRequestConfig, "method"> {
  method: Method;
}

/**
 * api call try-catch-error helper
 * @param {StrictAxiosRequestConfig} config
 * @returns {T}
 * @example
 * ```tsx
 * const notifications = await handleApiCall<Notification>({
 *  method: "GET",
 *  url: "/notifications?status=unread",
 * });
 * ```
 */
export async function handleApiCall<T>(
  config: StrictAxiosRequestConfig
): Promise<T> {
  try {
    const res: AxiosResponse<T> = await api.request<T>(config);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(
      `!ERROR!\nmethod: ${config.method}\nurl: ${config.url}\ndetails: ${message}`
    );
  }
}
