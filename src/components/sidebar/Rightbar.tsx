/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { GlassmorphismDesign } from "../../styles/baseDesign/GlassmorphismDesign";
import {
  flexCenter,
  itemMixin,
  SidebarColor,
  sideBarMixin,
} from "../../styles/mixins";
import DragAndDrop from "../dragAndDrop/DragAndDrop";
import { useThemeColors } from "../../hooks/useThemeColors";
import { RightbarPosition } from "./RightbarPosition";
import { css } from "@emotion/react";

type MOCDATA = {
  id: number;
  title: string;
  value: string;
};

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

const mocUser = {
  user_id: 1,
  username: "user123",
  token: "eyJhbGciOiJI...",
  userEmail: "user123@email.com",
};

export function Rightbar() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { text, background } = useThemeColors();

  const sidebarColor = SidebarColor(text, background);

  return (
    <RightbarPosition>
      <GlassmorphismDesign>
        <div css={[sideBarMixin, sidebarColor]}>
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

function RightLogined({ setIsLogin }: { setIsLogin: (bool: boolean) => void }) {
  const [items, setItems] = useState<MOCDATA[]>(
    Array.from({ length: 20 }, (_, idx) => {
      return { id: idx, title: `chat${idx}`, value: `value${idx}` };
    })
  );
  const goToPremium = () => {
    // 프리미엄 페이지로 이동
  };
  const handleSchedule = () => {
    //해당 일정으로 이동 로직
  };
  return (
    <>
      <span className="profile" css={[flexCenter(), profileCss]}>
        <div
          style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
        ></div>
        <span className="name_and_email">
          <span className="name">{mocUser.username}</span>
          <span className="email">{mocUser.userEmail}</span>
        </span>
      </span>
      <hr />
      <span css={scheduleCss}>
        <span>일정관리</span>
        <span>알림</span>
      </span>
      <hr />
      <span css={todayScheduleCss}>오늘 일정</span>
      <DragAndDrop items={items} onItemsChange={setItems} dragTitle={"title"}>
        {items.map((el) => {
          return (
            <div key={el.id} css={itemMixin} onClick={handleSchedule}>
              {el.value}
            </div>
          );
        })}
      </DragAndDrop>
      <hr />
      <div onClick={() => setIsLogin(false)}>로그아웃</div>
      <div onClick={goToPremium}>프리미엄 업그레이드</div>
    </>
  );
}

function RightLogouted() {
  const openLoginModal = () => {};
  return (
    <>
      <img src="profile_default_img" alt="profile_default_img" />
      <div onClick={openLoginModal}>로그인</div>
      <div onClick={openLoginModal}>프리미엄 업그레이드</div>
    </>
  );
}

const profileCss = css`
  gap: 1rem;
  .name_and_email {
    display: flex;
    flex-direction: column;
    align-items: start;
    .name,
    .email {
      font-size: 0.7rem;
    }
  }
`;

const scheduleCss = css`
  ${flexCenter()}
  gap:1rem;
`

const todayScheduleCss = css`
  text-align:center;
`