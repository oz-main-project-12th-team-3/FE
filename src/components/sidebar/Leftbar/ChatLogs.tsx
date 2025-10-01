/** @jsxImportSource @emotion/react */
import _ from "lodash";
import { useEffect, useState } from "react";
import { chatSessionApi, type Session } from "../../../api/chat/chatSession";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";
import { BasicBtnSt } from "../../../styles/baseDesign/basicBtnSt";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import { flexCenter, scrollCss, spaceBetween } from "../../../styles/mixins";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { IoTrashSharp } from "react-icons/io5";
import { RxCountdownTimer } from "react-icons/rx";
import { BiSortDown, BiSortUp } from "react-icons/bi";

export function ChatLogs() {
  const { text, scrollColor } = useThemeColors();

  const [items, setItems] = useState<Session[]>(() => {
    const mocData = Array.from({ length: 20 }, (_, idx) => {
      const baseDate = new Date("2025-10-01T00:00:00Z");
      baseDate.setDate(baseDate.getDate() + idx);
      return {
        id: idx,
        title: `chat Session ${idx}`,
        last_message: `last_message ${idx}`,
        updated_at: baseDate.toISOString(),
      };
    });
    return sorting(true, mocData);
  });

  const [isSort, setIsSort] = useState<boolean>(true);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  async function getSessions() {
    return await chatSessionApi.GET.sessions();
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await getSessions();
        setItems(sorting(true, res.sessions));
      } catch (e) {
        toast.error(`세션 불러오기 오류 발생:${e}`);
      }
    })();
  }, []);

  const handleSort = () => {
    setIsSort(true);
    setItems(sorting(isAsc, items));
    setIsAsc(!isAsc);
  };

  const handleVoiceChat = () => {};

  const handleDel = async (id: number) => {
    try {
      const res = await chatSessionApi.DELETE.sessionById(id);
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
      <div css={[dndCss, scrollCss(scrollColor)]}>
        <DragAndDrop
          items={items}
          onItemsChange={handleItemDnD}
          dragTitle={"updated_at"}
        >
          {items.map((el) => (
            <div css={[BasicBtnSt, btnCss]} key={el.id}>
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

const btnCss = css`
  ${[flexCenter(), spaceBetween]}
  padding:0.5rem;
  margin-bottom: 1rem;

  svg {
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
