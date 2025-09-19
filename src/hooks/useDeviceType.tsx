import { useDeviceTypeStore } from "../store/useDeviceTypeStore";

/**
 * navigator.userAgent를 사용해 유저의 플랫폼을 불러오고
 * /iphone|ipad|ipod|android|windows phone/ 해당 정규식 패턴 내에 플랫폼이 해당하는지 검사함
 */
export function useDeviceTypeHook() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
  useDeviceTypeStore.getState().setPlatform(isMobile ? "mobile" : "desktop");
}
