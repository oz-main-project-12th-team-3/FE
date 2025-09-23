/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ScheduleList } from "./ScheduleList";
import { ScheduleForm } from "./ScheduleForm";
import type { Schedule, ScheduleFormData, ViewType } from "./types/schedule";
import { scheduleAPI } from "../../../api/schedule";
import { useThemeColors } from "../../../hooks/useThemeColors";

const ScheduleModal: React.FC = () => {
const [view, setView] = useState<ViewType>("list"); // 현재 화면 (list or form)
const [schedules, setSchedules] = useState<Schedule[]>([]); // 일정 목록
const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // 선택한 날짜
const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null); // 수정 중인 일정
const [loading, setLoading] = useState<boolean>(false); // 로딩 상태


  const { modalBackground, headerBorder, modalHeaderBg, descriptionText } =
    useThemeColors();

  // 스타일 정의
  const modalContainer = css`
    background: ${modalBackground};
    border-radius: 16px;
    width: 90vw;
    max-width: 1000px;
    height: 600px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    flex-direction: column;
  `;

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

  const body = css`
    display: flex;
    flex: 1; 
    overflow: hidden;
  `;

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

  const content = css`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  `;

  const clickButton = css`
    cursor: pointer;
  `;

  // 일정 목록 로드
  const loadSchedules = async (): Promise<void> => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const dateStr = selectedDate.toLocaleDateString("sv-SE"); // YYYY-MM-DD 형식
      const data = await scheduleAPI.getSchedules(dateStr); // 일정 불러오기
      setSchedules(data);
    } catch (error) {
      console.error("일정 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 선택한 날짜가 바뀌면 일정 다시 로드
  useEffect(() => {
    loadSchedules();
  }, [selectedDate]);

  const handleAddNew = (): void => {
    setEditingSchedule(null);
    setView("form");
  };

  const handleEdit = (schedule: Schedule): void => {
    setEditingSchedule(schedule);
    setView("form");
  };

  const handleDelete = async (scheduleId: number): Promise<void> => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      setLoading(true);
      await scheduleAPI.deleteSchedule(scheduleId);
      setSchedules(schedules.filter((s) => s.id !== scheduleId));
    } catch (error) {
      console.error("일정 삭제 실패:", error);
      alert("일정 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (
    scheduleId: number,
    currentStatus: boolean
  ): Promise<void> => {
    try {
      const newStatus = !currentStatus;
      await scheduleAPI.toggleComplete(scheduleId, newStatus);
      setSchedules(
        schedules.map((s) =>
          s.id === scheduleId ? { ...s, is_completed: newStatus } : s
        )
      );
    } catch (error) {
      console.error("일정 완료 토글 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  const handleSave = async (formData: ScheduleFormData): Promise<void> => {
    try {
      setLoading(true);
      if (editingSchedule) {
        const result = await scheduleAPI.updateSchedule(
          editingSchedule.id,
          formData
        );
        if (result.success && result.data) {
          // 업데이트 후 목록 다시 불러오기
          await loadSchedules();
        }
      } else {
        const result = await scheduleAPI.createSchedule(formData);
        if (result.success && result.data) {
          // 새 일정 생성 후 목록 다시 불러오기
          await loadSchedules();
        }
      }
      setView("list");
      setEditingSchedule(null);
    } catch (error) {
      console.error("일정 저장 실패:", error);
      alert("일정 저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = (): void => {
    setView("list");
    setEditingSchedule(null);
  };

  return (
    <div css={modalContainer}>
      <div css={header}>
        <div css={headerTitle}>
          <MdCalendarToday />
          <div>
            <h2>일정관리</h2>
            <span>스케줄을 효율적으로 관리하세요</span>
          </div>
        </div>
        <IoIosClose size={20} css={clickButton} />
      </div>

      <div css={body}>
        <div css={calendarWrapper}>
          <div css={calendarBox}>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              styles={{
                root: { height: "100%" },
              }}
            />
          </div>
        </div>

        <div css={content}>
          {view === "list" ? (
            <ScheduleList
              schedules={schedules}
              loading={loading}
              onAddNew={handleAddNew}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ) : (
            <ScheduleForm
              schedule={editingSchedule}
              selectedDate={selectedDate?.toISOString().split("T")[0] || ""}
              loading={loading}
              onSave={handleSave}
              onDelete={
                editingSchedule
                  ? () => handleDelete(editingSchedule.id)
                  : undefined
              }
              onBackToList={handleBackToList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
