/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // TODO: 연결 지점 - 검색 액션 바인딩
    // ex) navigate('/search?q=' + query) 또는 store 업데이트
    console.log("search:", query.trim());
  };

  const handleNewChat = () => {
    // TODO: 연결 지점 - 새 채팅 생성 액션 바인딩
    console.log("new chat");
  };

  return (
    <div role="search" css={wrapCss}>
      <div css={inputWrapCss}>
        <img
          src="/icons/search.png"
          alt=""
          aria-hidden="true"
          css={searchIconCss}
        />
        <input
          type="search"
          placeholder="검색"
          aria-label="대화 검색"
          autoComplete="off"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          css={inputCss}
        />
      </div>

      <button
        type="button"
        aria-label="새 채팅"
        onClick={handleNewChat}
        css={newBtnCss}
      >
        <img src="/icons/new-chat.png" alt="" aria-hidden="true" css={newIconCss} />
      </button>
    </div>
  );
}

/* styles */
const wrapCss = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const inputWrapCss = css`
  position: relative;
  flex: 1;
`;

const searchIconCss = css`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  /* opacity: 0.75; */
  pointer-events: none; /* 장식용 아이콘 */
  z-index: 2;    
`;

const inputCss = css`
  width: 100%;
  height: 40px;
  padding: 0 12px 0 38px; /* 아이콘 공간 확보 */
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(245, 245, 245, 0.7);
  backdrop-filter: blur(6px);

    &::placeholder {
    color: rgb(110, 110, 110); 
    opacity: 1; /* Safari 기본 흐림 방지 */
  }

    /* Safari/iOS 등 WebKit 내장 '돋보기'만 비활성화 */
  &::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }
`;

const newBtnCss = css`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const newIconCss = css`
  width: 34px;
  height: 34px;
`;
