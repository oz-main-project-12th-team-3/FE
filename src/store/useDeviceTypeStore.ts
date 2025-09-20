import { create } from "zustand";

export type Platform = "mobile" | "desktop";

interface DeviceTypeStore {
  platform: Platform;
  setPlatform: (val: Platform) => void;
}

/**
 * 디바이스 설정용 스토어
 * @platform {"mobile" | "desktop"}
 */
export const useDeviceTypeStore = create<DeviceTypeStore>((set) => ({
  platform: "desktop",
  setPlatform: (val: Platform) => set(() => ({ platform: val })),
}));
