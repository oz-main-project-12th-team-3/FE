// hooks/useSchedule.ts
import { scheduleAPI } from '../../api/schedule/schdule';
import type { Schedule, PostScheduleReq, PutScheduleReq } from '../../api/schedule/schdule';
import type { ScheduleFormData } from '../../components/modal/schedule_modal/types/schedule';
import { combineDateAndTime } from '../../utils/time';

export const useSchedule = () => {
  // ScheduleFormData를 PostScheduleReq로 변환
  const createRequestFromForm = (formData: ScheduleFormData): PostScheduleReq => {
    const request: PostScheduleReq = {
      title: formData.title,
      description: formData.description || '',
      start_time: combineDateAndTime(formData.date, formData.start_time),
      end_time: combineDateAndTime(formData.date, formData.end_time),
      is_completed: formData.is_completed || false
    };
    return request;
  };

  // ScheduleFormData를 PutScheduleReq로 변환
  const updateRequestFromForm = (formData: ScheduleFormData): PutScheduleReq => {    
    const request: PutScheduleReq = {
      title: formData.title,
      description: formData.description || '',
      start_time: combineDateAndTime(formData.date, formData.start_time),
      end_time: combineDateAndTime(formData.date, formData.end_time),
      is_completed: formData.is_completed || false
    };
    return request;
  };

  // 전체 일정 조회 후 날짜별 필터링
  const getSchedules = async (date: string): Promise<Schedule[]> => {
    const allSchedules = await scheduleAPI.GET.allSchedules();
    
    // 프론트엔드에서 날짜별 필터링
    const filtered = allSchedules.filter((schedule) => {
      const startDate = new Date(schedule.start_time);
      const scheduleDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
      
      return scheduleDate === date;
    });
    return filtered;
  };

  // 일정 생성
  const createSchedule = async (formData: ScheduleFormData): Promise<Schedule> => {
    const request = createRequestFromForm(formData);
    return await scheduleAPI.POST.schedule(request);
  };

  // 일정 수정
  const updateSchedule = async (id: number, formData: ScheduleFormData): Promise<Schedule> => {
    const request = updateRequestFromForm(formData);
    return await scheduleAPI.PUT.scheduleById(id, request);
  };

  // 일정 삭제
  const deleteSchedule = async (id: number): Promise<{ detail: string }> => {
    return await scheduleAPI.DELETE.scheduleById(id);
  };

  // 완료 상태 토글 (PUT을 활용)
  const toggleComplete = async (id: number, completed: boolean): Promise<Schedule> => {
    // 1. 기존 일정 정보 조회
    const schedule = await scheduleAPI.GET.scheduleById(id);
    
    // 2. is_completed만 변경하여 전체 업데이트
    const request: PutScheduleReq = {
      title: schedule.title,
      description: schedule.description || '',
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_completed: completed
    };
    return await scheduleAPI.PUT.scheduleById(id, request);
  };

  return {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleComplete
  };
};