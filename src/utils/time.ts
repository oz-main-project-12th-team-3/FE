export const combineDateAndTime = (date: string, time: string): string => {
  return `${date}T${time}:00`; // UTC 변환하지 않고 로컬 기준으로 저장
};
