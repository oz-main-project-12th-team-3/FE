/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MdCalendarToday } from "react-icons/md";
import { useThemeColors } from "../../../hooks/useThemeColors";

const ScheduleHeader = () => {
  const { headerBorder, modalHeaderBg, descriptionText } = useThemeColors();

  const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid ${headerBorder};
    background: ${modalHeaderBg};
  `;

  const headerTitle = css`
    display: flex;
    align-items: center;
    gap: 12px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    span {
      color: ${descriptionText};
      font-size: 14px;
    }
  `;

  return (
    <div css={header}>
      <div css={headerTitle}>
        <MdCalendarToday />
        <div>
          <h2>일정관리</h2>
          <span>스케줄을 효율적으로 관리하세요</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleHeader;
