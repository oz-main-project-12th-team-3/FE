/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { GlassmorphismDesign } from "../../../styles/baseDesign/GlassmorphismDesign";
import { RightbarPosition } from "./RightbarPosition";
import RightLogined from "./RightLogined";
import RightLogouted from "./RightLogouted";
import { toast } from "react-toastify";

// 팀 노션 api 명세서

// 회원가입 할때 req
// {
//   "email": "user@example.com",
//   "password": "securePassword123",
//   "nickname": "johnny" << nickname
// }

// 로그인 했을때 res
// {
//   "data": {
//     "user_id": 1,
//     "username": "user123", << username
//     "token": "eyJhbGciOiJI..."
//   },
//   "meta": {
//     "status_code": 200,
//     "detail": "로그인에 성공하였습니다."
//   }
// }

// res, req 유저필드 항목 불일치

// const { completedText, descriptionText, addButtonBg } = useThemeColors();

export function Rightbar() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const getUserIdFromToken = (): number | null => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload.user_id;
        } catch {
          return null;
        }
      }
      return null;
    };

    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = getUserIdFromToken();
      setIsLogin(!!accessToken && !!userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`토큰 확인 중 오류가 발생했습니다: ${error.message}`);
      } else {
        toast.error(`토큰 확인 중 오류가 발생했습니다: ${String(error)}`);
      }
    }
  }, []);

  return (
    <RightbarPosition>
        <GlassmorphismDesign>
          {isLogin ? (
            <RightLogined setIsLogin={setIsLogin} />
          ) : (
            <RightLogouted />
          )}
        </GlassmorphismDesign>
    </RightbarPosition>
  );
}