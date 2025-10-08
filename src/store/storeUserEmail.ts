import { create } from "zustand";

interface storeUserEmail {
  userEmail: string;
  userProfileImg: string;
  setUser: (email:string, profileImg:string) => void;
}
export const storeUserEmail = create<storeUserEmail>((set) => ({
  userEmail: "",
  userProfileImg: "",
  setUser: (email, profileImg) =>
    set(() => ({
      userEmail: email,
      userProfileImg: profileImg,
    })),
}));
