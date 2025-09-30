import type { Schedule } from '../../components/modal/schedule_modal/types/schedule';

// 더미 데이터 - API 명세서 형식에 맞춤 (UTC 시간 사용)
export let dummySchedules: Schedule[] = [
  {
    id: 1,
    title: '팀 미팅',
    description: '주간 팀 미팅 및 프로젝트 진행사항 공유',
    start_time: '2025-09-25T00:00:00Z',
    end_time: '2025-09-25T00:30:00Z',
    is_completed: true,
    created_at: '2025-09-24T14:00:00Z',
    updated_at: '2025-09-24T14:00:00Z'
  },
  {
    id: 2,
    title: '기획 회의',
    description: '새 프로젝트 기획 회의',
    start_time: '2025-09-25T01:00:00Z',
    end_time: '2025-09-25T02:00:00Z',
    is_completed: false,
    created_at: '2025-09-24T15:00:00Z',
    updated_at: '2025-09-24T15:00:00Z'
  },
  {
    id: 3,
    title: '팀 미팅',
    description: '주간 팀 미팅 및 프로젝트 진행사항 공유',
    start_time: '2025-09-28T01:00:00Z',
    end_time: '2025-09-28T02:00:00Z',
    is_completed: false,
    created_at: '2025-09-27T15:00:00Z',
    updated_at: '2025-09-27T15:00:00Z'
  },
  {
    id: 4,
    title: '기획 회의1',
    description: '새 프로젝트 기획 회의',
    start_time: '2025-09-28T03:00:00Z',
    end_time: '2025-09-28T04:00:00Z',
    is_completed: false,
    created_at: '2025-09-27T16:00:00Z',
    updated_at: '2025-09-27T16:00:00Z'
  },
  {
    id: 5,
    title: '기획 회의2',
    description: '새 프로젝트 기획 회의',
    start_time: '2025-09-28T05:00:00Z',
    end_time: '2025-09-28T06:00:00Z',
    is_completed: false,
    created_at: '2025-09-27T17:00:00Z',
    updated_at: '2025-09-27T17:00:00Z'
  },
  {
    id: 6,
    title: '기획 회의3',
    description: '새 프로젝트 기획 회의',
    start_time: '2025-09-28T07:00:00Z',
    end_time: '2025-09-28T08:00:00Z',
    is_completed: false,
    created_at: '2025-09-27T18:00:00Z',
    updated_at: '2025-09-27T18:00:00Z'
  },
  {
    id: 7,
    title: '기획 회의4',
    description: '새 프로젝트 기획 회의',
    start_time: '2025-09-28T09:00:00Z',
    end_time: '2025-09-28T10:00:00Z',
    is_completed: false,
    created_at: '2025-09-27T19:00:00Z',
    updated_at: '2025-09-27T19:00:00Z'
  }
];