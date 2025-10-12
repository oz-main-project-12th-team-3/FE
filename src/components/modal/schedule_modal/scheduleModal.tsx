/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import { ScheduleList } from "./ScheduleList";
import { ScheduleForm } from "./ScheduleForm";
import type {  ScheduleFormData, ViewType } from "./types/schedule";
import { useSchedule } from "../../../hooks/api/useSchedule";
import { useThemeColors } from "../../../hooks/useThemeColors";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleCalendar from "./ScheduleCalendar";
import { getLocalDateString } from "../../../utils/time";
// import { dummySchedules } from "../../../api/dummyData/schedule";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ScheduleModal = () => {
  const location = useLocation();
  const { initialSchedule, initialView } = location.state || {};

  const [view, setView] = useState<ViewType>(initialView||"list");
  const [schedules, setSchedules] = useState<Schedule.Item[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [editingSchedule, setEditingSchedule] = useState<Schedule.Item | null>(
    initialSchedule || null
  );
  const [loading, setLoading] = useState<boolean>(false);

  // 커스텀 훅 사용
  const {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleComplete,
  } = useSchedule();

  const { modalBackground } = useThemeColors();

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

  const body = css`
    display: flex;
    flex: 1;
    overflow: hidden;
  `;

  const content = css`
    flex: 1;
    padding: 24px;
    overflow-y: auto;
  `;

  // 일정 목록 로드
  const loadSchedules = useCallback(async (): Promise<void> => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const dateStr = getLocalDateString(selectedDate);
      const data = await getSchedules(dateStr);
      setSchedules(data);
    } catch (error) {
      toast.error(`일정 로드 실패:${error}`);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, getSchedules]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const handleAddNew = (): void => {
    setEditingSchedule(null);
    setView("form");
  };

  const handleEdit = (schedule: Schedule.Item): void => {
    setEditingSchedule(schedule);
    setView("form");
  };

  const handleDelete = async (scheduleId: number): Promise<void> => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      setLoading(true);
      await deleteSchedule(scheduleId);
      setSchedules(schedules.filter((s) => s.id !== scheduleId));
    } catch (error) {
      toast.error(`일정 삭제 실패:${error}`);
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
      // toggleComplete는 내부적으로 getScheduleById + updateSchedule 사용
      const updatedSchedule = await toggleComplete(scheduleId, newStatus);

      // 반환된 Schedule로 상태 업데이트
      setSchedules(
        schedules.map((s) => (s.id === scheduleId ? updatedSchedule : s))
      );
    } catch (error) {
      toast.error(`일정 완료 토글 실패:${error}`);
    }
  };

  const handleSave = async (formData: ScheduleFormData): Promise<void> => {
    try {
      setLoading(true);
      if (editingSchedule) {
        // 수정
        await updateSchedule(editingSchedule.id, formData);
        await loadSchedules();
      } else {
        // 생성
        await createSchedule(formData);
        await loadSchedules();
      }
      setView("list");
      setEditingSchedule(null);
    } catch (error) {
      toast.error(`일정 저장 실패:${error}`);
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
      <ScheduleHeader />

      <div css={body}>
        <ScheduleCalendar
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

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
              selectedDate={
                selectedDate ? getLocalDateString(selectedDate) : ""
              }
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
