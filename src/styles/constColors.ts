type color = {
  text: string;
  background: string;
  ozPurple: string;
  componentBg: string;
  componentBorder: string;
  // 추가한 컬러 : 이혜정
  modalBackground: string;
  buttonBgColor:string;
  hoverBtnColor: string;
  hoverSocialBtn: string;
  btnBorder:string;
  descriptionText: string;
  tabBgColor: string;
  tabBtn: string;

};

const dark: color = {
  text: "#ffffff",
  background: "#000000",
  ozPurple: "#622de8",
  componentBg: "#00000028",
  componentBorder: "#ffffff18",

  modalBackground: "#fff",
  buttonBgColor:"#444",
  descriptionText:"#666",
  tabBgColor: "#f3f3f3",
  tabBtn: "#555",
  hoverBtnColor: "#222",
  btnBorder: "#ddd",
  hoverSocialBtn:"#f9f9f9"
};

const light: color = {
  text: "#000000",
  background: "#ffffff",
  ozPurple: dark.ozPurple,
  componentBg: "#ffffff1c",
  componentBorder: "#00000018",

  modalBackground:"#fff",
  buttonBgColor: "#444",
  descriptionText:"#666",
  tabBgColor:"#f3f3f3",
  tabBtn:"#555",
  hoverBtnColor: "#222",
  btnBorder: "#ddd",
  hoverSocialBtn: "#f9f9f9"
};

export const colors = { dark, light } as const;
export type ColorTheme = keyof typeof colors; // 'dark' | 'light'
export const themeKeys = Object.keys(colors) as ColorTheme[]; // ['dark', 'light']


