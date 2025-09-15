// src/styles/constColors.ts
type color = {
  text: string;
  background: string;
  ozPurple: string;
  componentBg: string;
  componentBorder: string;
};

const dark: color = {
  text: "#ffffff",
  background: "#000000",
  ozPurple: "#622de8",
  componentBg: "#00000028",
  componentBorder: "#ffffff18",
};

const light: color = {
  text: "#000000",
  background: "#ffffff",
  ozPurple: dark.ozPurple,
  componentBg: "#ffffff1c",
  componentBorder: "#00000018",
};

export const colors = { dark, light } as const;
export type ColorTheme = keyof typeof colors; // 'dark' | 'light'
export const themeKeys = Object.keys(colors) as ColorTheme[]; // ['dark', 'light']

/* ===== 추가: 팀 공용 색상 토큰(테마와 무관 기본 팔레트) ===== */
export const colorTokens = {
  chatSurface: "#3C4082",            // 채팅 패널 기본색 (투명도는 사용처에서 `${...}E6`처럼 붙이기)
  bubbleLeft:  "#B9B8FF",            // 왼쪽 말풍선
  bubbleRight: "#0b0b12",            // 오른쪽 말풍선
  textOnDark:  colors.dark.text,     // 어두운 배경 위 텍스트
  inputBg:     "rgba(255,255,255,0.85)", // 입력창 배경
  accent:      "#7b61ff",            // 포인트 컬러
} as const;

export type ColorTokens = typeof colorTokens;
