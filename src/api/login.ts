import client from "./baseApi";

export type LoginRes = {
  user_id: number;
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
};

export async function login(email: string, password: string) {
  const { data } = await client.post<LoginRes>("/auth/login", { email, password });
  // 브라우저에서 쓰는 경우 localStorage 저장
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_id", String(data.user_id));
  }
  return data;
}

export async function logout() {
  try { await client.post("/auth/logout"); } catch {}
  if (typeof window !== "undefined") localStorage.clear();
}
