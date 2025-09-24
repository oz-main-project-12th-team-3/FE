import type { Schedule } from '../../components/modal/schedule_modal/types/schedule';
import { combineDateAndTime } from '../../utils/time';

// 더미 데이터
export let dummySchedules: Schedule[] = [
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