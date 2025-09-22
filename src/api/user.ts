import { api } from './baseApi';

export interface UserResponse {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
}
/**
 * 사용자 정보가져오기 
 * Response
 * [
  "detail": {
	  "id": 1,
	  "email": "user@example.com",
	  "role": "user",
	  "is_active": true,
	  "two_factor_enabled": false,
	  "created_at": "2025-09-17T14:30:00Z"
  }
]
 */
export async function getUserApi(user_id: number): Promise<UserResponse> {
  try {
    const res = await api.get (`/users/${user_id}`);
    return res.date
} catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`Login failed: ${message}`);
  }
}