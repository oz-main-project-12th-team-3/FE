/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { 
  MdAccessTime, 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdCheckBox,
  MdCheckBoxOutlineBlank 
} from 'react-icons/md';

import { useThemeColors } from '../../../hooks/useThemeColors';
import { formatTime } from '../../../utils/time';

interface ScheduleListProps {
  schedules: Schedule.Item[];
  loading: boolean;
  onAddNew: () => void
  onEdit: (schedule: Schedule.Item) => void;
  onDelete: (scheduleId: number) => void;
  onToggleComplete: (scheduleId: number, currentStatus: boolean) => void;
}

export const ScheduleList = ({
  schedules,
  loading,
  onAddNew,
  onEdit,
  onDelete,
  onToggleComplete
}: ScheduleListProps) => {

  const { addButtonBg, modalBackground , tabBtnText, inputBorder, descriptionText, scheduleItemBorder, headerBorder, completedText, deleteBtnBg } = useThemeColors();

  // 스타일 정의
const addButton = css`
  width: 100%;
  background: ${addButtonBg};
  color: ${modalBackground};
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${tabBtnText};
  }
  
  &:disabled {
    background: ${inputBorder};
    cursor: not-allowed;
  }
`;

const scheduleList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const sectionTitle = css`
  margin: 0 0 16px 0;
  font-size: 16px;
  color: ${descriptionText};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const scheduleItem = css`
  border: 1px solid ${scheduleItemBorder};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${modalBackground};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${inputBorder};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const completedItem = css`
  opacity: 0.7;
`;

const checkboxButton = css`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${descriptionText};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    background: ${headerBorder};
  }
`;

const scheduleContent = css`
  flex: 1;
`;

const scheduleTitle = css`
  font-size: 16px;
  font-weight: 500;
  color: ${addButtonBg};
  margin-bottom: 4px;
`;

const completedTitle = css`
  text-decoration: line-through;
  color: ${completedText};
`;

const scheduleTime = css`
  font-size: 14px;
  color: ${descriptionText};
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const scheduleActions = css`
  display: flex;
  gap: 8px;
`;

const actionButton = css`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${headerBorder};
  }
`;

const editButton = css`
  ${actionButton}
  color: ${addButtonBg};
`;

const deleteButton = css`
  ${actionButton}
  color: ${deleteBtnBg};
`;

const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: ${descriptionText};
`;

const emptyContainer = css`
  text-align: center;
  padding: 40px;
  color: ${completedText};
`;

  return (
    <>
      <button 
        css={addButton} 
        onClick={onAddNew}
        disabled={loading}
      >
        <MdAdd />
        새 일정 추가
      </button>

      <div css={scheduleList}>
        <h3 css={sectionTitle}>
          <MdAccessTime />
          오늘 일정 ({schedules.length})
        </h3>
        
        {loading ? (
          <div css={loadingContainer}>
            로딩중...
          </div>
        ) : schedules.length === 0 ? (
          <div css={emptyContainer}>
            등록된 일정이 없습니다.
          </div>
        ) : (
          schedules.map((schedule) => (
            <div 
              key={schedule.id} 
              css={[scheduleItem, schedule.is_completed && completedItem]}
            >
              <button 
                css={checkboxButton}
                onClick={() => onToggleComplete(schedule.id, schedule.is_completed)}
                title={schedule.is_completed ? '미완료로 변경' : '완료로 변경'}
              >
                {schedule.is_completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              </button>
              
              <div css={scheduleContent}>
                <div css={[scheduleTitle, schedule.is_completed && completedTitle]}>
                  {schedule.title}
                </div>
                <div css={scheduleTime}>
                  <MdAccessTime />
                  {formatTime(schedule.start_time)} ~ {formatTime(schedule.end_time)}
                </div>
              </div>
              
              <div css={scheduleActions}>
                <button 
                  css={editButton}
                  onClick={() => onEdit(schedule)}
                  title="수정"
                >
                  <MdEdit />
                </button>
                <button 
                  css={deleteButton}
                  onClick={() => onDelete(schedule.id)}
                  title="삭제"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
