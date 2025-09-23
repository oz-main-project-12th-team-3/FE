import type { Schedule, ScheduleFormData, ApiResponse, ScheduleAPI } from '../components/modal/schedule_modal/types/schedule';
import { combineDateAndTime } from '../utils/time';

// 더미 데이터 (로컬 시간 기반)
let dummySchedules: Schedule[] = [
  {
    id: 1,
    title: '팀 미팅',
    start_time: combineDateAndTime("2025-09-20", "09:00"),
    end_time: combineDateAndTime("2025-09-20", "09:30"),
    description: '주간 팀 미팅 및 프로젝트 진행사항 공유',
    is_completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: '기획 회의',
    start_time: combineDateAndTime("2025-09-20", "10:00"),
    end_time: combineDateAndTime("2025-09-20", "11:00"),
    description: '새 프로젝트 기획 회의',
    is_completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const scheduleAPI: ScheduleAPI = {
  getSchedules: async (date: string): Promise<Schedule[]> => {
    console.log('🔍 일정 조회:', date);
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = dummySchedules.filter((s) => {
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
    console.log('➕ 일정 생성:', formData);
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

    dummySchedules.push(newSchedule);
    return { success: true, data: newSchedule };
  },

  updateSchedule: async (id: number, formData: ScheduleFormData): Promise<ApiResponse<Schedule>> => {
    const idx = dummySchedules.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error('일정을 찾을 수 없습니다.');
    console.log('✏️ 일정 수정:', id, formData);

    dummySchedules[idx] = {
      ...dummySchedules[idx],
      title: formData.title,
      description: formData.description,
      start_time: combineDateAndTime(formData.date, formData.start_time),
      end_time: combineDateAndTime(formData.date, formData.end_time),
      is_completed: formData.is_completed,
      updated_at: new Date().toISOString(),
    };

    console.log('수정된 일정:', dummySchedules[idx]);

    return { success: true, data: dummySchedules[idx] };
  },

  deleteSchedule: async (id: number): Promise<ApiResponse<null>> => {
    dummySchedules = dummySchedules.filter((s) => s.id !== id);
    return { success: true };
  },

  toggleComplete: async (id: number, completed: boolean): Promise<ApiResponse<{ completed: boolean }>> => {
    const target = dummySchedules.find((s) => s.id === id);
    if (target) {
      target.is_completed = completed;
      target.updated_at = new Date().toISOString();
    }
    return { success: true, data: { completed } };
  }
};
