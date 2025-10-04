import { create } from "zustand";

interface storeUserEmail {
  userEmail: string;
  setUserEmail: (val: string) => void;
}
export const storeUserEmail = create<storeUserEmail>((set) => ({
  userEmail: "",
  setUserEmail: (val) => set(() => ({ userEmail: val })),
}));
