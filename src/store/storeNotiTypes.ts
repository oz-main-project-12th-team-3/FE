import { create } from "zustand";
import type { NotificationType } from "../api/notification/notification";

type NotiType = {
  id: number;
  code: string;
};

interface storeNotiTypes {
  notiTypes: NotiType[];
  setNotiTypes: (val: NotificationType[]) => void;
}

export const storeNotiTypes = create<storeNotiTypes>((set) => ({
  notiTypes: [],
  setNotiTypes: (val) =>
    set(() => ({ notiTypes: val.map(({ id, code }) => ({ id, code })) })),
}));
