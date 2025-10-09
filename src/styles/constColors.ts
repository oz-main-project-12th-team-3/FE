type color = {
  text: string;
  background: string;
  ozPurple: string;
  componentBg: string;
  componentBorder: string;
  // Login & Signup
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
  // schedule
  headerBorder: string;
  modalHeaderBg: string;
  addButtonBg: string;
  scheduleItemBorder: string;
  completedText: string;
  deleteBtnBg: string;
  focusCompletedBox: string;
  disabledCompletedBox: string;
  hoverDeleteBtn: string;
  // scroll
  scrollColor: string;
  // rightbar
  crownIcon: string;
  scheduleTitleColor:string;
  menuItemBg:string;
  iconContainerBg:string;
  worningBoxBg:string;
  worningBoxBorder:string;
  // nofication
  unreadBg:string;
  textColor:string;
  // premium
  premiumCardBg: string;
  premiumCardBorder: string;
  premiumCardHoverBorder: string;
  premiumCheckIcon: string;
  premiumTitle: string;
  premiumSubtitle: string;
  premiumFeatureText: string;
  premiumButtonBg: string;
  premiumButtonText: string;
  premiumButtonHoverBg: string;
   // welcome
  welcomeText: string;
  welcomeSubtitle: string;
  welcomeDescription: string;
  welcomeCardBg: string;
  welcomeCardBorder: string;
  welcomeCardIcon: string;
  welcomeCardTitle: string;
  welcomeCardDesc: string;
  welcomeButtonBg: string;
  welcomeButtonText: string;
  welcomeButtonHoverBg: string;
  welcomeFooterText: string;
  welcomeIconColor: string;
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
  aColor:"#4a6df5",
  scrollColor: "#ffffff63",
  crownIcon: "#ffd700",
  scheduleTitleColor: "#000000",
  menuItemBg:"#FFFFFF1A",
  iconContainerBg:"#fee2e2",
  worningBoxBg:"#fef2f2",
  worningBoxBorder:"#fecaca",
  unreadBg:"#f5f8ff",
  textColor:"#ffffff",
  // premium 
  premiumCardBg: "rgba(255, 255, 255, 0.05)",
  premiumCardBorder: "rgba(255, 255, 255, 0.1)",
  premiumCardHoverBorder: "rgba(255, 255, 255, 0.2)",
  premiumCheckIcon: "#00ff9d",
  premiumTitle: "#fff",
  premiumSubtitle: "rgba(255, 255, 255, 0.7)",
  premiumFeatureText: "rgba(255, 255, 255, 0.9)",
  premiumButtonBg: "rgba(255, 255, 255, 0.1)",
  premiumButtonText: "#fff",
  premiumButtonHoverBg: "rgba(255, 255, 255, 0.15)",
   // welcome (다크모드)
  welcomeText: "#f5f5f5",
  welcomeSubtitle: "#b3b3b3",
  welcomeDescription: "#cccccc",
  welcomeCardBg: "#1a1a1a",
  welcomeCardBorder: "#2a2a2a",
  welcomeCardIcon: "#ffffff",
  welcomeCardTitle: "#e5e5e5",
  welcomeCardDesc: "#bdbdbd",
  welcomeButtonBg: "#ffffff",
  welcomeButtonText: "#111111",
  welcomeButtonHoverBg: "#e5e5e5",
  welcomeFooterText: "#888888",
  welcomeIconColor: "#ffffff",
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
  aColor:"#4a6df5",
  scrollColor: "#00000063",
  crownIcon: "#ffd700",
  scheduleTitleColor:"#000000",
  menuItemBg:"#FFFFFF1A",
  iconContainerBg:"#fee2e2",
  worningBoxBg:"#fef2f2",
  worningBoxBorder:"#fecaca",
  unreadBg:"#f5f8ff",
  textColor:"#000000",
  // premium
  premiumCardBg: "rgba(255, 255, 255, 0.3)",
  premiumCardBorder: "rgba(0, 0, 0, 0.1)",
  premiumCardHoverBorder: "rgba(0, 0, 0, 0.2)",
  premiumCheckIcon: "#00ff9d",
  premiumTitle: "#000",
  premiumSubtitle: "rgba(0, 0, 0, 0.6)",
  premiumFeatureText: "rgba(0, 0, 0, 0.8)",
  premiumButtonBg: "rgba(255, 255, 255, 0.4)",
  premiumButtonText: "#000",
  premiumButtonHoverBg: "rgba(255, 255, 255, 0.15)",
    // welcome
  welcomeText: "#1a1a1a",
  welcomeSubtitle: "#666666",
  welcomeDescription: "#4a4a4a",
  welcomeCardBg: "#ffffff",
  welcomeCardBorder: "#e0e0e0",
  welcomeCardIcon: "#000",
  welcomeCardTitle: "#2a2a2a",
  welcomeCardDesc: "#5a5a5a",
  welcomeButtonBg: "#000",
  welcomeButtonText: "#ffffff",
  welcomeButtonHoverBg: "rgba(255, 255, 255, 0.15)",
  welcomeFooterText: "#999999",
  welcomeIconColor: "#000",
};

export const colors = { dark, light } as const;
export type ColorTheme = keyof typeof colors; // 'dark' | 'light'
export const themeKeys = Object.keys(colors) as ColorTheme[]; // ['dark', 'light']