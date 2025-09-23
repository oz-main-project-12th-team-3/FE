type color = {
  text: string;
  background: string;
  ozPurple: string;
  componentBg: string;
  componentBorder: string;
  // 추가한 컬러 : Login & Signup
  modalBackground: string;
  buttonBgColor:string;
  hoverBtnColor: string;
  hoverSocialBtn: string;
  btnBorder:string;
  descriptionText: string;
  tabBgColor: string;
  tabBtnText: string;
  inactiveTabBg: string;
  inputIcon: string;
  inputBorder:string;
  aColor: string;
  // 추가한 컬러 : schedule
  headerBorder: string;
  modalHeaderBg: string;
  addButtonBg: string;
  scheduleItemBorder: string;
  completedText: string;
  deleteBtnBg: string;
  focusCompletedBox: string;
  disabledCompletedBox: string;
  hoverDeleteBtn: string;
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
  tabBtnText: "#555",
  hoverBtnColor: "#222",
  btnBorder: "#ddd",
  hoverSocialBtn:"#f9f9f9",
  inputIcon: "#777",
  inputBorder: "#ccc",
  inactiveTabBg: "transparent",
  headerBorder: "#f0f0f0",
  modalHeaderBg: "#fafafa",
  addButtonBg: "#333",
  scheduleItemBorder: "#e0e0e0",
  completedText: "#999",
  deleteBtnBg: "#f44336",
  focusCompletedBox: "#2196F3",
  disabledCompletedBox: "#f5f5f5",
  hoverDeleteBtn: "#d32f2f",
  aColor:"#4a6df5"
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
  tabBtnText:"#555",
  hoverBtnColor: "#222",
  btnBorder: "#ddd",
  hoverSocialBtn: "#f9f9f9",
  inputIcon:"#777",
  inputBorder: "#ccc",
  inactiveTabBg: "transparent",
  headerBorder: "#f0f0f0",
  modalHeaderBg: "#fafafa",
  addButtonBg: "#333",
  scheduleItemBorder: "#e0e0e0",
  completedText: "#999",
  focusCompletedBox: "#2196F3",
  deleteBtnBg: "#f44336",
  hoverDeleteBtn: "#d32f2f",
  disabledCompletedBox: "#f5f5f5",
  aColor:"#4a6df5"
};

export const colors = { dark, light } as const;
export type ColorTheme = keyof typeof colors; // 'dark' | 'light'
export const themeKeys = Object.keys(colors) as ColorTheme[]; // ['dark', 'light']


