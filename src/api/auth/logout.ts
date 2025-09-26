import { handleApiCall } from "../apiClient";

export async function logout() {
  const url = `/api/v1/auth/logout/`;
  try {
    return await handleApiCall({ method: "DELETE", url: url });
  } finally {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user_id");
  }
}
