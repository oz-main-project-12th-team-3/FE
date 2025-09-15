// src/hooks/useThemeColors.ts
// 팀 색상 훅
// - 기존 훅(useThemeColors): 그대로 유지 (호환성)
// - 확장 훅(useThemeColorsWithTokens): 공용 색상 토큰까지 포함해 제공

import { useMemo } from "react";
import { useColorModeStore } from "../store/useColorModeStore";
import { colors, colorTokens, type ColorTheme } from "../styles/constColors";

// ===== 기존: 그대로 유지 (기존 사용처 호환) =====
export const useThemeColors = () => {
  const mode = useColorModeStore((state) => state.mode as ColorTheme);
  return colors[mode];
};
// const { text, background } = useThemeColors();  // 기존 사용법 유지

export type ThemeColors = typeof colors.dark;

// ===== 확장: 토큰 포함(신규 UI 권장) =====
export const useThemeColorsWithTokens = () => {
  const mode = useColorModeStore((state) => state.mode as ColorTheme);
  const theme = colors[mode] ?? colors.dark;

  // 테마 색 + 공통 토큰 + 현재 모드
  return useMemo(
    () => ({
      mode,            // 'dark' | 'light'
      ...theme,        // text, background, ozPurple, componentBg, componentBorder
      ...colorTokens,  // chatSurface, bubbleLeft, bubbleRight, textOnDark, inputBg, accent
    }),
    [mode, theme]
  );
};
// 사용 예:
// const { chatSurface, bubbleLeft, bubbleRight, textOnDark, text, mode } = useThemeColorsWithTokens();
