// 로컬 날짜 문자열로 변환하는 헬퍼 함수
export const getLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const combineDateAndTime = (date: string, time: string): string => {
  // 이미 ISO 문자열이면 그대로 반환
  if (time.includes('T')) {
    return time;
  }
  
  // "HH:mm" 형식이면 날짜와 결합
  const dateTimeString = `${date}T${time}:00`;
  return new Date(dateTimeString).toISOString();
};

// 시간 변환 헬퍼 (UTC ISO → HH:mm)
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  const pad = (n: number) => String(n).padStart(2, '0');
  
  // console.log('ISO 문자열:', isoString);
  // console.log('Date 객체:', date);
  // console.log('getHours:', date.getHours(), 'getMinutes:', date.getMinutes());

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// 알림 "~~ 분 전" 포맷팅용 함수
export const formatRelativeTime = (isoDate: string): string => {
  const now = new Date();
  const target = new Date(isoDate);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};
