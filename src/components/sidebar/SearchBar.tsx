/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("search:", query.trim());
  };

  const handleNewChat = () => {
    console.log("new chat");
  };

  return (
    <div role="search" css={wrapCss}>
      {/* 부모 한 곳에서 img/input을 함께 관리 */}
      <div css={inputWrapCss}>
        <img src="/icons/search.png" alt="" aria-hidden="true" />
        <input
          type="search"
          placeholder="검색"
          aria-label="대화 검색"
          autoComplete="off"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
  display: flex;
  align-items: center;

  /* 자식 img(돋보기) */
  img {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    pointer-events: none; /* 장식용 아이콘 */
    z-index: 2;
  }

  /* 자식 input */
  input {
    width: 100%;
    height: 40px;
    padding: 0 12px 0 38px; /* 아이콘 공간 */
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(245, 245, 245, 0.7);
    backdrop-filter: blur(6px);

    &::placeholder {
      color: rgb(110, 110, 110);
      opacity: 1; /* Safari 흐림 방지 */
    }

    /* WebKit 기본 돋보기 제거 */
    &::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
      display: none;
    }
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
