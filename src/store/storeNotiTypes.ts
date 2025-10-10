import { create } from "zustand";


type NotiType = {
  id: number;
  code: string;
};

interface storeNotiTypes {
  notiTypes: NotiType[];
  setNotiTypes: (GETNotiTypesRes: Noti.Type[]) => void;
}

export const storeNotiTypes = create<storeNotiTypes>((set) => ({
  notiTypes: [],
  setNotiTypes: (GETNotiTypesRes) =>
    set(() => ({ notiTypes: GETNotiTypesRes.map(({ id, code }) => ({ id, code })) })),
}));
