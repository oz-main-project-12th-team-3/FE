import { create } from "zustand";

export type ClientSignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export const INIT_SIGNUP_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

interface storeSignupForm {
  signupForm: ClientSignupForm;
  setSignupForm: (val: any) => void;
  resetSignupForm: () => void;
}

export const storeSignupForm = create<storeSignupForm>((set) => ({
  signupForm: INIT_SIGNUP_FORM,
  setSignupForm: (val) =>
    set((state) => ({ signupForm: { ...state.signupForm, ...val } })),
  resetSignupForm: () => set(() => ({ signupForm: INIT_SIGNUP_FORM })),
}));
