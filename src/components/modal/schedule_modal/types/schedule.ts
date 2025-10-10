// 서버 응답 그대로
// export interface Schedule {
//   id: number;
//   title: string;
//   description: string;
//   start_time: string;   // ISO string (e.g. "2025-09-20T10:00:00Z")
//   end_time: string;
//   is_completed: boolean;
//   created_at: string;
//   updated_at: string;
// }

// 프론트엔드 폼용
export interface ScheduleFormData {
  title: string;
  date: string;        // YYYY-MM-DD (input[type=date] 용)
  start_time: string;   // HH:mm
  end_time: string;     // HH:mm
  description: string;
  is_completed: boolean;
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export type ViewType = 'list' | 'form';

export interface ScheduleAPI {
  getSchedules: (date: string) => Promise<Schedule.Item[]>;
  createSchedule: (scheduleData: ScheduleFormData) => Promise<ApiResponse<Schedule.Item>>;
  updateSchedule: (id: number, scheduleData: ScheduleFormData) => Promise<ApiResponse<Schedule.Item>>;
  deleteSchedule: (id: number) => Promise<ApiResponse<null>>;
}