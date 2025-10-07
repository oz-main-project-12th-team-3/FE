import { create } from "zustand";
import type { LoginRes } from "../api/auth/login";

interface storeUserEmail {
  userEmail: string;
  userProfileImg: string;
  setUser: (val: LoginRes) => void;
}
export const storeUserEmail = create<storeUserEmail>((set) => ({
  userEmail: "",
  userProfileImg: "",
  setUser: (val) =>
    set(() => ({
      userEmail: val.email,
      userProfileImg: val.profile_image_url,
    })),
}));
