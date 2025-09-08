import { create } from 'zustand'
import { themeKeys, type ColorTheme } from '../styles/constColors';

interface ColorModeState {
  mode: ColorTheme;
  setMode: (mode: ColorTheme) => void;
}
export const useColorModeStore = create<ColorModeState>((set) => ({
  mode: themeKeys[0],
  setMode: (mode: ColorTheme) => set(() => ({ mode: mode })),
}));
