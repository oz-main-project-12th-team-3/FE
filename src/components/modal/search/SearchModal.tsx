/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SIDEBAR_HEIGHT,
  SIDEBAR_WIDTH,
} from "../../../store/useMousePositionStore";
import { IoIosSearch } from "react-icons/io";
import { BasicBtnSt } from "../../../styles/baseDesign/basicBtnSt";
import { flexCenter, scrollCss } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { SearchResult } from "./SearchResult";

export type SearchRes = {
  id:number
}

export function SearchModal() {
  const { search_params } = useParams<{ search_params: string }>();
  const [params, setParams] = useState<string>(search_params ?? "");
  const [searchResArr, setSearchResArr] = useState<SearchRes[] | null>([]);

  const {scrollColor} = useThemeColors();

  useEffect(() => {
    if (!params) return;
    (async () => {
      const res = null; //api콜
      setSearchResArr(res);
    })();
    return () => {
      setSearchResArr([]);
      setParams("");
    };
  }, [params]);

  return (
    <AnimatePresence mode="wait">
      <motion.div css={searchModalCss}>
        <div className="search_bar">
          <input type="text" />
          <IoIosSearch />
        </div>
        <div className="result" css={scrollCss(scrollColor)}>
          {searchResArr ? (
            searchResArr.map((el) => <SearchResult key={el.id} searchRes={el}/>)
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const searchModalCss = css`
  width: ${SIDEBAR_WIDTH * 2}px;
  height: ${SIDEBAR_HEIGHT}px;
  display: flex;
  flex-direction: column;

  .search_bar {
    height: 4rem;
    padding: 0.5rem 1rem;

    input {
      ${BasicBtnSt}
      width:${SIDEBAR_WIDTH * 1.8}px;
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
  }

  .result{
    ${flexCenter("column", "1rem", "0.5rem")}
    overflow-y:auto;

    .p{
      color:#88888854;
    }
  }
`;
