/** @jsxImportSource @emotion/react */
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { chatApi, type Session } from "../../../api/chat/chatSession";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";
import { BasicBtnSt } from "../../../styles/baseDesign/basicBtnSt";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { flexCenter, scrollCss, spaceBetween } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { IoTrashSharp } from "react-icons/io5";
import { RxCountdownTimer } from "react-icons/rx";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import {
  useNavigate,
} from "react-router-dom";
// import { voiceLogApi } from "../../../api/voice/voiceLog";

export function ChatLogs() {
  const { text, scrollColor } = useThemeColors();
  // 더미데이터
  const [items, setItems] = useState<Session[]>(
    //   () => {
    //   const mocData = Array.from({ length: 20 }, (_, idx) => {
    //     const baseDate = new Date("2025-10-01T00:00:00Z");
    //     baseDate.setDate(baseDate.getDate() + idx);
    //     return {
    //       id: 100 + idx,
    //       title: `chat Session ${idx}`,
    //       last_message: `last_message ${idx}`,
    //       updated_at: baseDate.toISOString(),
    //     };
    //   });
    //   return sorting(true, mocData);
    // }
    []
  );
  // 무한 스크롤
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const navi = useNavigate();
  const [isSort, setIsSort] = useState<boolean>(true);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await chatApi.GET
          .sessions
          // { page }
          ();
        console.log("res", res);

        setItems((prev) => sorting(true, [...prev, ...res.sessions]));
        setHasNext(
          // res.next_page !== null
          true
          // 일단 계속 실행하도록 작성
          // 백엔드 코드에 따라 다시 작성 필요
        );
      } catch (e) {
        toast.error(`세션 불러오기 오류 발생:${e}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page]);

  const handleSort = () => {
    setIsSort(true);
    setItems(sorting(isAsc, items));
    setIsAsc(!isAsc);
  };

  const handleVoiceChat = async () => {
    // try {
    //   const res = await voiceLogApi.GET.voiceLogsBySessionId(sessionId);
    //   setItems(sorting(isAsc, res))
    // } catch (e) {
    //   toast.error(`음성 채팅 기록 불러오기 중 오류 발생 : ${e}`);
    // }
    // 타입 지정 => ?
    // title 대신에 무엇을 표시?
    // updated_at 있으니 그대로 재활용은 가능할듯
  };

  // 스크롤 감지
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (!isLoading && hasNext && scrollTop + clientHeight >= scrollHeight - 5) {
      setPage((prev) => prev + 1);
    }
  };

  const handleDel = async (id: number) => {
    try {
      const res = await chatApi.DELETE.sessionById(id);
      toast.info(`${res.detail}`);
      setItems(items.filter((el) => el.id !== id));
    } catch (e) {
      toast.error(`세션 제거 중 에러 발생 : ${e}`);
    }
  };

  const handleItemDnD = (newItems: Session[]) => {
    setItems(newItems);
    setIsSort(false);
  };

  const handleClickLog = (sessionId: number) => {
    navi(`/chat/${sessionId}`);
  };

  const spanColorCss = css`
    span {
      color: ${text};
    }
  `;

  return (
    <div>
      <div css={[logBtnsCss, spanColorCss]}>
        <span className="chat_logs">
          채팅기록
          <RxCountdownTimer />
        </span>
        <span className="sort" onClick={handleSort}>
          {isSort ? (
            isAsc ? (
              <>
                <BiSortDown />
                최신순
              </>
            ) : (
              <>
                <BiSortUp />
                과거순
              </>
            )
          ) : (
            "사용자정의"
          )}
        </span>
        <span className="voice_logs_btn" onClick={handleVoiceChat}>
          음성채팅기록
        </span>
      </div>
      <div
        ref={scrollRef}
        css={[dndCss, scrollCss(scrollColor)]}
        onScroll={handleScroll}
      >
        <DragAndDrop
          items={items}
          onItemsChange={handleItemDnD}
          dragTitle={"title"}
        >
          {items.map((el) => (
            <div
              css={[BasicBtnSt, btnCss]}
              key={el.id}
              onClick={() => handleClickLog(el.id)}
            >
              <span>{el.title}</span>
              <IoTrashSharp onClick={() => handleDel(el.id)} />
            </div>
          ))}
        </DragAndDrop>
      </div>
    </div>
  );
}

function sorting<T extends { updated_at: string }>(
  isAsc: boolean,
  arr: T[]
): T[] {
  return isAsc
    ? _.sortBy(arr, (el: T) => new Date(el.updated_at).getTime())
    : _.orderBy(arr, (el: T) => new Date(el.updated_at).getTime(), "desc");
}

const logBtnsCss = css`
  ${flexCenter()}
  ${spaceBetween}
  .chat_logs {
    svg {
      font-size: 0.8rem;
      margin-left: 0.3rem;
    }
  }
  .sort {
    font-size: 0.8rem;
    opacity: 0.6;
    cursor: pointer;
  }
  .voice_logs_btn {
    font-size: 0.8rem;
    cursor: pointer;
  }
  margin-bottom: 0.5rem;
`;

const dndCss = css`
  max-height: 22.5rem;
  overflow-y: auto;
`;

const bgTransition = css`
  transition: 0.2s background ease;
  &:hover {
    background: #0000002f;
  }
`;

const btnCss = css`
  ${[flexCenter(), spaceBetween]}
  margin-bottom: 1rem;

  span {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: fit-content;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    border-radius: 0.3rem;
    padding: 0.3rem;
    padding-right: 0.8rem;

    ${bgTransition}
  }

  svg {
    font-size: 1.3rem;
    cursor: pointer;
    border-radius: 0.3rem;
    flex-shrink: 0;
    margin-right: 0.3rem;

    ${bgTransition}
  }
`;
