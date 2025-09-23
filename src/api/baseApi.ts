import axios from "axios";
import type { AxiosInstance } from "axios";

export const BASE_URL = "http://localhost:8080";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});