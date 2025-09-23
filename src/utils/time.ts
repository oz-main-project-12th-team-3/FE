export const combineDateAndTime = (date: string, time: string): string => {
  return `${date}T${time}:00`; 
  // e.g. "2025-09-20T09:00:00" ← UTC 아님, 로컬 기준
};
