import { create } from "zustand";
import { themeKeys, type ColorTheme } from "../styles/constColors";

interface ColorModeState {
  mode: ColorTheme;
  setMode: (mode: ColorTheme) => void;
  isDark: boolean;
  toggle: () => void;
}
export const storeColorMode = create<ColorModeState>((set) => ({
  mode: themeKeys[1],
  setMode: (mode: ColorTheme) => set(() => ({ mode: mode })),

  isDark: false,
  
  toggle: () =>
    set((state) => ({
      isDark: !state.isDark,
      mode: themeKeys[+(state.mode === themeKeys[0])],
    })),
}));
