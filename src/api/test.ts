import { loginApi } from "./login";

export async function testLogin() {
    try {
        const data = await loginApi({
        email: "user@example.com",  
        password: "password123",
        });

        console.log("로그인 성공:", data);
    } catch (err) {
        console.error("로그인 실패:", err);
    }
}
