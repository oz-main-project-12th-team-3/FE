export const validatorName = (name: string): string => {
  if (!name.trim()) return "이름을 입력해주세요.";
  if (name.length < 2) return "이름은 2자 이상이어야 합니다.";
  return "";
};


export const validatorEmail = (email: string): string => {
  if (!email) return "이메일을 입력해주세요.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
    if (!emailRegex.test(email)) return "유효한 이메일 형식이 아닙니다.";
  return "";
}

export const validatorPassword = (password: string): string => {
  if (!password) return "비밀번호를 입력해주세요.";
    // 최소 8자, 대문자/소문자/숫자/특수문자 하나 이상 포함
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) return "비밀번호는 8자 이상, 대소문자/숫자/특수문자를 모두 포함해야 합니다.";
  return "";
}

export const validatorConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) return "비밀번호 확인을 입력해주세요.";
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  return "";
};
