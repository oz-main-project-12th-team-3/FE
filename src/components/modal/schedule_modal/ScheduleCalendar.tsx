/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useThemeColors } from "../../../hooks/useThemeColors";

interface ScheduleCalendarProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export const ScheduleCalendar = ({
  selectedDate,
  onSelect,
} : ScheduleCalendarProps) => {
  const { headerBorder } = useThemeColors();

  const calendarWrapper = css`
    flex: 0 0 280px;
    border-right: 1px solid ${headerBorder};
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const calendarBox = css`
    width: 100%;
    height: 100%;
  `;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // 로컬 정오로 설정하여 타임존 문제 방지
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12, // 정오
        0,
        0,
        0
      );
      onSelect(localDate);
    } else {
      onSelect(date);
    }
  };

  return (
    <div css={calendarWrapper}>
      <div css={calendarBox}>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          styles={{
            root: { height: "100%" },
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleCalendar;