export function validatorEmail(email:string):boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    return emailRegex.test(email)
}

export function validatorPassword(password:string):boolean{
    // 최소 8자, 대문자/소문자/숫자/특수문자 하나 이상 포함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}