import { useEffect, useState } from "react";

export function useDeviceType(): "mobile" | "desktop" {
  const [type, setType] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    function detectDevice() {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(
        userAgent
      );
      setType(isMobile ? "mobile" : "desktop");
    }
    detectDevice();
    window.addEventListener("resize", detectDevice);
    return () => window.removeEventListener("resize", detectDevice);
  }, []);

  return type;
}
