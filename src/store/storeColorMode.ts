import { create } from "zustand";
import { themeKeys, type ColorTheme } from "../styles/constColors";

interface ColorModeState {
  mode: ColorTheme;
  setMode: (mode: ColorTheme) => void;
  toggle:()=>void;
}
export const storeColorMode = create<ColorModeState>((set) => ({
  mode: themeKeys[0],
  setMode: (mode: ColorTheme) => set(() => ({ mode: mode })),
  toggle: () =>
    set((s) => ({
      mode: themeKeys[+(s.mode === themeKeys[0])],
    })),
}));
