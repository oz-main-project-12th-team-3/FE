/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { GlassmorphismDesign } from "../../../styles/baseDesign/GlassmorphismDesign";
import { sideBarMixin } from "../../../styles/mixins";
import { RightbarPosition } from "./RightbarPosition";
import RightLogined from "./RightLogined";
import RightLogouted from "./RightLogouted";
import { TokenManager } from "../../../api/apiClient";
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
    (() => {
      try {
        setIsLogin(
          !TokenManager.getAccessToken() || !TokenManager.getUserId()
            ? false
            : true
        );
      } catch (e) {
        toast.error(`토큰 확인 중 오류가 발생했습니다:${e}`);
      }
    })();
  }, []);

  return (
    <RightbarPosition>
      <GlassmorphismDesign>
        <div css={[sideBarMixin]}>
          {isLogin ? (
            <RightLogined setIsLogin={setIsLogin} />
          ) : (
            <RightLogouted />
          )}
        </div>
      </GlassmorphismDesign>
    </RightbarPosition>
  );
}
