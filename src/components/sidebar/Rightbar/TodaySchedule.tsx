/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaClock } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { flexCenter, itemMixin, scrollbarHidden } from "../../../styles/mixins";
import DragAndDrop from "../../dragAndDrop/DragAndDrop";
import { formatTime } from "../../../utils/time";
import { useThemeColors } from "../../../hooks/useThemeColors";
import type { Schedule } from "../../../api/schedule/schdule";
import { useNavigate } from "react-router-dom";

// any타입은 절대 사용 x
export function TodaySchedule({
  items,
  setItems,
}: {
  items: Schedule[];
  setItems: (val: Schedule[]) => void;
}) {
  const { modalBackground, scheduleTitleColor, descriptionText } =
    useThemeColors();
  const navi = useNavigate();

  const todayScheduleSectionCss = css`
    flex: 1;
    display: flex;
    flex-direction: column;
  `;

  const todayScheduleHeaderCss = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    span {
      font-size: 0.9rem;
      color: ${modalBackground};
      font-weight: 500;
    }
  `;

  const scheduleContentCss = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 17rem;
    overflow-y: auto;
    ${scrollbarHidden};
  `;

  const scheduleTitle = css`
    font-size: 16px;
    font-weight: 500;
    color: ${scheduleTitleColor};
  `;

  const scheduleTime = css`
    font-size: 14px;
    color: ${descriptionText};
    display: flex;
    align-items: center;
    gap: 4px;
  `;

  const emptyScheduleCss = css`
    text-align: center;
    color: ${descriptionText};
    font-size: 0.9rem;
    padding: 2rem 0;
  `;

  const handleClick = (schedule: Schedule) => {
    navi("modal/schedule", {
      state: { initialSchedule: schedule, initialView: "form" },
    });
  };

  return (
    <div css={todayScheduleSectionCss}>
      <div css={todayScheduleHeaderCss}>
        <FaClock size={16} color={modalBackground} />
        <span>오늘 일정 ({items?.length})</span>
      </div>

      <div css={[flexCenter(), scheduleContentCss]}>
        {items && items.length > 0? (
          <DragAndDrop
            items={items}
            onItemsChange={setItems}
            dragTitle={"title"}
          >
            {items.map((el) => (
              <div key={el.id} css={itemMixin} onClick={() => handleClick(el)}>
                <div css={scheduleTitle}>{el.title}</div>
                <div css={scheduleTime}>
                  <MdAccessTime color={descriptionText} />
                  {formatTime(el.start_time)} ~ {formatTime(el.end_time)}
                </div>
              </div>
            ))}
          </DragAndDrop>
        ) : (
          <div css={emptyScheduleCss}>오늘 일정이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
