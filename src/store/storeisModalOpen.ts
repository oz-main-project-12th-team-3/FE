import { create } from "zustand";

interface storeIsModalOpen {
  isModalOpen: boolean | null;
  SetModalOpen: (val: boolean) => void;
}
export const storeIsModalOpen = create<storeIsModalOpen>((set) => ({
  isModalOpen: null,
  SetModalOpen: (val) => set(() => ({ isModalOpen: val })),
}));
