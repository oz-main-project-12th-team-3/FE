import { validatorEmail, validatorPassword } from "../utils/validator";
import { loginApi } from "./login";

export async function testLogin() {
    const email = "user@example.com"
    const password = "Password123!"

    if(!validatorEmail(email)){
        console.error("이메일 형식이 올바르지 않습니다.")
        return
    }

    if(!validatorPassword(password)){
        console.error("비밀번호는 8자 이상, 대소문자/숫자/특수문자를 모두 포함해야 합니다.")
        return
    }

    try {
        const data = await loginApi({email, password});
        console.log("로그인 성공:", data);
    } catch (err) {
        console.error("로그인 실패:", err);
    }
}

