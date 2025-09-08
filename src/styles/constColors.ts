type color = {
  text: string;
  background: string;
  gradientBg1: string;
  gradientBg2: string;
  gradientBg3: string;
};

const dark: color = {
  text: "#ffffff",
  background: "#000000",
  gradientBg1: "#622de8",
  gradientBg2: "#d5d5d5",
  gradientBg3: "#000000",
};

const light: color = {
  text: "#000000",
  background: "#ffffff",
  gradientBg1: dark.gradientBg1,
  gradientBg2: dark.gradientBg2,
  gradientBg3: dark.gradientBg3,
}

export const colors = { dark, light } as const;
export type ColorTheme = keyof typeof colors; // 'dark' | 'light'
export const themeKeys = Object.keys(colors) as ColorTheme[]; // ['dark', 'light']


