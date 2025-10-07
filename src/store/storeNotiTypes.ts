import { create } from "zustand";
import type { NotificationType } from "../api/notification/notification";

type NotiType = {
  id: number;
  code: string;
};

interface storeNotiTypes {
  notiTypes: NotiType[];
  setNotiTypes: (GETNotiTypesRes: NotificationType[]) => void;
}

export const storeNotiTypes = create<storeNotiTypes>((set) => ({
  notiTypes: [],
  setNotiTypes: (GETNotiTypesRes) =>
    set(() => ({ notiTypes: GETNotiTypesRes.map(({ id, code }) => ({ id, code })) })),
}));
