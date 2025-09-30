/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { IoIosSearch } from "react-icons/io";
import { flexCenter } from "../../../styles/mixins";

export function Searchbar() {
  const { text } = useThemeColors();
  const colorCss = css`
    input {
      background: transparent;
      border: 1px solid ${text};
      color: ${text};
    }
    svg {
      color: ${text};
    }
  `;

  const handleSearch = () => {
    // api call search
    // store update
  };

  return (
    <div css={[SearchbarCss, colorCss]}>
      <input placeholder="검색어를 입력하세요" />
      <IoIosSearch onClick={handleSearch} title="검색"/>
    </div>
  );
}

const SearchbarCss = css`
  ${flexCenter()}
  position: relative;
  width: 100%;

  input {
    height: 2rem;
    border-radius: 0.7rem;
    padding-left: 0.5rem;
    outline: none;
  }

  svg {
    position: absolute;
    right: 0.5rem;
    cursor: pointer;
  }
`;
