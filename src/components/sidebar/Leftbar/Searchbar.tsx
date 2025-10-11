/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IoIosSearch } from "react-icons/io";
import { flexCenter } from "../../../styles/mixins";
import { SIDEBAR_WIDTH } from "../../../store/useMousePositionStore";
import { BasicBtnSt } from "../../../styles/baseDesign/basicBtnSt";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export function Searchbar() {
  const navi = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const handleSearch = () => {
    if (!inputRef.current?.value.trim()) return;
    navi(`modal/search/:${inputRef.current.value}`, {
      state: { prevPath: location.pathname },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div css={[SearchbarCss]}>
      <input
        placeholder="검색어를 입력하세요"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <IoIosSearch onClick={handleSearch} title="검색" />
    </div>
  );
}

const SearchbarCss = css`
  ${flexCenter()}
  position: relative;

  input {
    ${BasicBtnSt}
    width:${SIDEBAR_WIDTH * 0.8}px;
    padding-left: 0.5rem;
    outline: none;
  }

  svg {
    position: absolute;
    right: 0.5rem;
    cursor: pointer;
    svg {
      color: #000;
    }
  }
`;
