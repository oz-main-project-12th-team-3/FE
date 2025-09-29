import { handleApiCall, TokenManager } from "../apiClient";

export async function logout() {
  const url = `/api/v1/auth/logout/`;
  try {
    return await handleApiCall({ method: "DELETE", url: url });
  } finally {
    TokenManager.clearTokens();
  }
}
