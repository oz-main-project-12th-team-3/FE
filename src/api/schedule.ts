import type { Schedule, ScheduleFormData, ApiResponse, ScheduleAPI } from '../components/modal/schedule_modal/types/schedule';
import { combineDateAndTime } from '../utils/time';
import { dummySchedules } from './dummyData/schedule';

let schedules = dummySchedules;

export const scheduleAPI: ScheduleAPI = {
  getSchedules: async (date: string): Promise<Schedule[]> => {
    console.log('일정 조회:', date);
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = schedules.filter((s) => {
          // start_time을 로컬 날짜(YYYY-MM-DD)로 변환
          const scheduleDate = new Date(s.start_time)
            .toLocaleDateString("sv-SE"); // "2025-09-20" 형식

          console.log('일정 날짜:', scheduleDate, '조회 날짜:', date);
          return scheduleDate === date;
        });

        resolve(filtered);
      }, 300);
    });
  },

  createSchedule: async (formData: ScheduleFormData): Promise<ApiResponse<Schedule>> => {
    const newSchedule: Schedule = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      start_time: combineDateAndTime(formData.date, formData.start_time),
      end_time: combineDateAndTime(formData.date, formData.end_time),
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    schedules.push(newSchedule);
    return { success: true, data: newSchedule };
  },

  updateSchedule: async (id: number, formData: ScheduleFormData): Promise<ApiResponse<Schedule>> => {
    const idx = schedules.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error('일정을 찾을 수 없습니다.');

    schedules[idx] = {
      ...schedules[idx],
      title: formData.title,
      description: formData.description,
      start_time: combineDateAndTime(formData.date, formData.start_time),
      end_time: combineDateAndTime(formData.date, formData.end_time),
      is_completed: formData.is_completed,
      updated_at: new Date().toISOString(),
    };


    return { success: true, data: schedules[idx] };
  },

  deleteSchedule: async (id: number): Promise<ApiResponse<null>> => {
    schedules = schedules.filter((s) => s.id !== id);
    return { success: true };
  },

  toggleComplete: async (id: number, completed: boolean): Promise<ApiResponse<{ completed: boolean }>> => {
    const target = schedules.find((s) => s.id === id);
    if (target) {
      target.is_completed = completed;
      target.updated_at = new Date().toISOString();
    }
    return { success: true, data: { completed } };
  }
};
