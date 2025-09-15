import axios from "axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginRespose{
    user_id: number;
    access_token: string;
    refresh_token: string;
    expires_in : number;
}

export async function loginApi(payload: LoginRequest): Promise<LoginRespose>{ // 비동기로 응답값을 반환
    try{
        const res = await axios.post("http://localhost:8080/auth/login", payload, {
            headers: { "Content-Type" : "application/json" },
        })
        return res.data
    }catch(error:any){
        const message = error.response?.data?.message || error.message;
        throw new Error(`Login failed: ${message}`);
    }
}