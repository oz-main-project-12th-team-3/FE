/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { css } from '@emotion/react';
import { MdCalendarToday, MdAccessTime, MdDescription, MdCheck, MdDelete } from 'react-icons/md';
import type { Schedule, ScheduleFormData } from './types/schedule';
import { useThemeColors } from '../../../hooks/useThemeColors';
import { combineDateAndTime } from '../../../utils/time';

// props 타입
interface ScheduleFormProps {
  schedule?: Schedule | null;
  selectedDate: string;
  loading: boolean;
  onSave: (formData: ScheduleFormData) => Promise<void>;
  onDelete?: () => void;
  onBackToList: () => void;
}


export const ScheduleForm = ({
  schedule,
  selectedDate,
  loading,
  onSave,
  onDelete,
  onBackToList
}:ScheduleFormProps) => {
  const [formData, setFormData] = useState<ScheduleFormData>({
    title: '',
    description: '',
    date: selectedDate,
    start_time: '',
    end_time: '',
    is_completed: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ScheduleFormData, string>>>({});

  const { addButtonBg, deleteBtnBg, inputBorder, hoverSocialBtn, focusCompletedBox, disabledCompletedBox, modalBackground,completedText, tabBtnText, hoverDeleteBtn } = useThemeColors();

  // 스타일 정의
const formContainer = css`
display: flex; 
flex-direction: column; 
gap: 20px;`;

const formTitle = css`
margin: 0 0 16px 0; 
font-size: 18px; 
color: ${addButtonBg};`;

const headerGroup = css`
display: flex; 
justify-content: space-between; 
align-items: center;`;  

const formGroup = css`
display: flex; 
flex-direction: column; 
gap: 8px;`;

const formLabel = css`
  font-size: 14px; 
  font-weight: 500; 
  color: ${addButtonBg}; 
  display: flex; 
  align-items: center; 
  gap: 6px;
  &::after { 
    content: '*'; 
    color: ${deleteBtnBg}; 
    margin-left: 2px; }
`;

const optionalLabel = css`
  font-size: 14px; 
  font-weight: 500; 
  color: ${addButtonBg}; 
  display: flex; 
  align-items: center; 
  gap: 6px;
`;

const formInput = css`
  padding: 12px 16px; 
  border: 1px solid ${inputBorder}; 
  border-radius: 8px; 
  font-size: 14px;
  background: ${hoverSocialBtn}; 
  transition: all 0.2s ease; 
  font-family: inherit;
  &:focus { 
    outline: none; 
    border-color: ${focusCompletedBox}; 
    background: ${modalBackground}; 
    box-shadow: 0 0 0 3px rgba(33,150,243,0.1); }
  &:disabled { 
    background: ${disabledCompletedBox}; 
    color: ${completedText}; 
    cursor: not-allowed; }
`;

const formRow = css`
display: grid; 
grid-template-columns: 1fr 1fr 1fr; 
gap: 12px; @media (max-width: 480px) { grid-template-columns: 1fr; }`;

const textarea = css`
${formInput}; 
min-height: 80px; 
resize: vertical; 
font-family: inherit;`;

const formActions = css`
display: flex; 
gap: 12px; 
margin-top: 24px; 
@media (max-width: 480px) { flex-direction: column; }`;

const primaryButton = css`
  flex: 1; 
  background: ${addButtonBg}; 
  color: ${modalBackground}; 
  border: none; 
  padding: 14px 24px; 
  border-radius: 8px;
  font-size: 14px; 
  font-weight: 500; 
  cursor: pointer; 
  display: flex; 
  align-items: center;
  justify-content: center; 
  gap: 8px; 
  transition: background-color 0.2s ease;
  &:hover:not(:disabled) { 
    background: ${tabBtnText}; }
  &:disabled { 
    background: ${inputBorder}; 
    cursor: not-allowed; }
`;

const secondaryButton = css`
  background: ${deleteBtnBg}; 
  color: ${modalBackground}; 
  border: none; 
  padding: 14px 24px; 
  border-radius: 8px;
  font-size: 14px; 
  font-weight: 500; 
  cursor: pointer; 
  display: flex; 
  align-items: center;
  justify-content: center; 
  gap: 8px; 
  transition: background-color 0.2s ease;
  &:hover:not(:disabled) { 
    background: ${hoverDeleteBtn}; }
  &:disabled { 
    background: ${inputBorder}; 
    cursor: not-allowed; }
`;

const backButton = css`
  border: 1px solid ${inputBorder};
  background: ${modalBackground};
  padding: 12px 24px; 
  border-radius: 8px;
  font-size: 14px; 
  font-weight: 500; 
  cursor: pointer; 
  display: flex; 
  align-items: center;
  justify-content: center; 
  gap: 8px; 
  transition: background-color 0.2s ease;
  &:hover:not(:disabled) { 
    background: ${hoverSocialBtn}; }
  &:disabled { 
    background: ${inputBorder}; 
    cursor: not-allowed; }
`;

const errorMessage = css`
color: ${deleteBtnBg}; 
font-size: 12px; 
margin-top: 4px;`;

  useEffect(() => {
  if (schedule) {
    // UTC 시간을 로컬 시간으로 변환
    const start = new Date(schedule.start_time);
    const end = new Date(schedule.end_time);
    
    // 로컬 날짜 추출
    const year = start.getFullYear();
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const day = String(start.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const pad = (n: number) => String(n).padStart(2, '0');

    setFormData({
      title: schedule.title,
      description: schedule.description || '',
      date: dateStr,
      start_time: `${pad(start.getHours())}:${pad(start.getMinutes())}`,
      end_time: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
      is_completed: schedule.is_completed
    });
  } else {
    setFormData({
      title: '',
      description: '',
      date: selectedDate,
      start_time: '',
      end_time: '',
      is_completed: false
    });
  }
  setErrors({});
}, [schedule, selectedDate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ScheduleFormData, string>> = {};

    if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요.';
    else if (formData.title.length > 100) newErrors.title = '제목은 100자 이내로 입력해주세요.';

    if (!formData.date) newErrors.date = '날짜를 선택해주세요.';
    if (!formData.start_time) newErrors.start_time = '시작시간을 입력해주세요.';
    if (!formData.end_time) newErrors.end_time = '종료시간을 입력해주세요.';

    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
      newErrors.end_time = '종료시간은 시작시간보다 늦어야 합니다.';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = '설명은 500자 이내로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
  
  await onSave(formData);
};

  const handleChange = (field: keyof ScheduleFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <form css={formContainer} onSubmit={handleSubmit}>

      <div css={headerGroup}>
        <h3 css={formTitle}>{schedule ? '일정 수정' : '새 일정 추가'}</h3>
        <button css={backButton} type="button" onClick={onBackToList} disabled={loading}>
          취소
        </button>
      </div>

      <div css={formGroup}>
        <label css={formLabel}><MdDescription /> 제목</label>
        <input
          css={formInput}
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="일정 제목을 입력하세요"
          maxLength={100}
          disabled={loading}
        />
        {errors.title && <div css={errorMessage}>{errors.title}</div>}
      </div>

      <div css={formRow}>
        <div css={formGroup}>
          <label css={formLabel}><MdCalendarToday /> 날짜</label>
          <input
            css={formInput}
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            disabled
          />
          {errors.date && <div css={errorMessage}>{errors.date}</div>}
        </div>

        <div css={formGroup}>
          <label css={formLabel}><MdAccessTime /> 시작시간</label>
          <input
            css={formInput}
            type="time"
            value={formData.start_time}
            onChange={(e) => handleChange('start_time', e.target.value)}
            disabled={loading}
          />
          {errors.start_time && <div css={errorMessage}>{errors.start_time}</div>}
        </div>

        <div css={formGroup}>
          <label css={formLabel}><MdAccessTime /> 종료시간</label>
          <input
            css={formInput}
            type="time"
            value={formData.end_time}
            onChange={(e) => handleChange('end_time', e.target.value)}
            disabled={loading}
          />
          {errors.end_time && <div css={errorMessage}>{errors.end_time}</div>}
        </div>
      </div>

      <div css={formGroup}>
        <label css={optionalLabel}><MdDescription /> 설명</label>
        <textarea
          css={textarea}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="일정에 대한 상세 설명을 입력하세요"
          rows={4}
          maxLength={500}
          disabled={loading}
        />
        {errors.description && <div css={errorMessage}>{errors.description}</div>}
      </div>

      <div css={formActions}>
        <button css={primaryButton} type="submit" disabled={loading}>
          <MdCheck /> {loading ? '저장중...' : (schedule ? '수정 완료' : '일정 생성')}
        </button>
        {schedule && onDelete && (
          <button css={secondaryButton} type="button" onClick={onDelete} disabled={loading}>
            <MdDelete /> 삭제
          </button>
        )}
      </div>
    </form>
  );
};
