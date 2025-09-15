import axios from "axios";

/** 브라우저/Node(test.ts) 양쪽에서 동작하는 baseURL 로더 */
const baseURL =
  (typeof window !== "undefined"
    ? (import.meta as any).env?.VITE_API_BASE_URL
    : process.env.VITE_API_BASE_URL) || "http://localhost:4000";

const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : process.env.ACCESS_TOKEN; // test.ts에서 .env로 주입 가능
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      localStorage.clear();
      location.reload();
    }
    throw err;
  }
);

export default client;
