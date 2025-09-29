export const combineDateAndTime = (date: string, time: string): string => {
  return `${date}T${time}:00`; // UTC 변환하지 않고 로컬 기준으로 저장
};

// 시간 변환 헬퍼 (UTC ISO → HH:mm)
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
};