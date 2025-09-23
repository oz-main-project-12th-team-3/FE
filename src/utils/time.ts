export const combineDateAndTime = (date: string, time: string): string => {
  return `${date}T${time}:00`; 
  // e.g. "2025-09-20T09:00:00" ← UTC 아님, 로컬 기준
};

// 시간 변환 헬퍼 (UTC ISO → HH:mm)
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
};