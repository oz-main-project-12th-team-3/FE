import type { Schedule, ScheduleFormData, ApiResponse, ScheduleAPI } from '../components/modal/schedule_modal/types/schedule';
import { combineDateAndTime } from '../utils/time';
import { dummySchedules } from './dummyData/schedule';

let schedules = dummySchedules;

export const scheduleAPI: ScheduleAPI = {
  getSchedules: async (date: string): Promise<Schedule[]> => {
  console.log('조회할 날짜:', date);
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = schedules.filter((s) => {
        // UTC 시간을 로컬 날짜로 변환하여 비교
        const startDate = new Date(s.start_time);
        const scheduleDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        
        console.log('일정 날짜:', scheduleDate, '조회 날짜:', date);
        return scheduleDate === date;
      });

      resolve(filtered);
    }, 300);
  });
},


createSchedule: async (formData: ScheduleFormData): Promise<ApiResponse<Schedule>> => {
  console.log('받은 formData:', formData);
  
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

  console.log('생성된 newSchedule:', newSchedule);
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
