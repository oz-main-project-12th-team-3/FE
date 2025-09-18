import { useEffect, useState } from "react";

/**
 *
 * @returns {"mobile" | "desktop"}
 * navigator.userAgent를 사용해 유저의 플랫폼을 불러오고
 * /iphone|ipad|ipod|android|windows phone/ 해당 정규식 패턴 내에 플랫폼이 해당하는지 검사함
 */
export function useDeviceType(): "mobile" | "desktop" {
  const [type, setType] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
    setType(isMobile ? "mobile" : "desktop");
  }, []);

  return type;
}
