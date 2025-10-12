/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
import { apiChatSearch } from "../../../api/chat/chatSearch";
import { toast } from "react-toastify";

export function SearchModal() {
  const { search_params } = useParams<{ search_params: string }>();
  const [params, setParams] = useState<string>(search_params ?? "");
  const [searchResArr, setSearchResArr] = useState<Chat.SearchRes[] | null>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const PAGE_SIZE = 20;
  const resultRef = useRef<HTMLDivElement>(null);

  const { scrollColor } = useThemeColors();

  useEffect(() => {
    if (!params) return;
    (async () => {
      try {
        const res = await apiChatSearch.GET.query(
          { page: page, page_size: PAGE_SIZE },
          search_params ?? ""
        );
        if (page === 1) {
          setSearchResArr(res.results);
        } else {
          setSearchResArr((prev) =>
            prev ? [...prev, ...res.results] : res.results
          );
        }
        if (!res || res.results.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (error) {
        toast.error(`검색결과 불러오기중 오류 발생:${error}`);
      } finally {
        // moc data(test)
        // setSearchResArr([{
        //   id: 1,
        //   session: 1,
        //   message: "string",
        //   sender: "user",
        //   timestamp: "now",
        // }]);
        setIsLoading(false);
      }
    })();
    return () => {
      setSearchResArr([]);
      setParams("");
    };
  }, [params, page, search_params]);

  useEffect(() => {
    return () => {
      setSearchResArr([]);
      setParams("");
      setPage(1);
      setHasMore(true);
    };
  }, []);

  const handleScroll = () => {
    if (!resultRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = resultRef.current;

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div css={[searchModalCss]}>
        <div className="search_bar">
          <input type="text" />
          <IoIosSearch />
        </div>
        <hr />
        <div
          className="result"
          css={scrollCss(scrollColor)}
          ref={resultRef}
          onScroll={handleScroll}
        >
          {searchResArr && searchResArr.length > 0 ? (
            searchResArr.map((el) => <SearchResult key={el.id} result={el} />)
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const searchModalCss = css`
  width: ${SIDEBAR_WIDTH * 2.5}px;
  height: ${SIDEBAR_HEIGHT * 1.2}px;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #ffffff;
  border: 1px solid #0000003e;
  padding-top: 1rem;
  gap: 0.5rem;

  .search_bar {
    height: 4rem;
    width: 100%;
    ${flexCenter("row", "2rem", "1rem")}

    input {
      ${BasicBtnSt}
      width:${SIDEBAR_WIDTH * 2.2}px;
      padding-left: 0.5rem;
      outline: none;
      border: 1px solid #00000049;
    }

    svg {
      font-size: 2rem;
      cursor: pointer;
      svg {
        color: #000;
      }
    }
  }

  hr {
    border: 1px solid #0000001c;
  }

  .result {
    ${flexCenter("column", "1rem", "0.5rem")}
    overflow-y:auto;

    .p {
      color: #6666662b;
    }
  }
`;
