import { create } from "zustand";

interface storeUser {
  nickName: string;
  userEmail: string;
  userProfileImg: string;
  setUser: (nickName?: string, email?: string, profileImg?: string) => void;
  clearUser: () => void;
}
export const storeUser = create<storeUser>((set) => ({
  nickName: "",
  userEmail: "",
  userProfileImg: "",
  setUser: (nickName, email, profileImg) =>
    set(() => ({
      nickName: nickName,
      userEmail: email,
      userProfileImg: profileImg,
    })),
  clearUser: () =>
    set(() => ({ nickName: "", userEmail: "", userProfileImg: "" })),
}));
