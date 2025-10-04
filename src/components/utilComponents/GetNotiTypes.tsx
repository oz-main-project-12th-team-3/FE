import { useEffect } from "react";
import { apiNoti } from "../../api/notification/notification";
import { storeNotiTypes } from "../../store/storeNotiTypes";
import { toast } from "react-toastify";

export function NotiTypesSetter() {
  const { setNotiTypes } = storeNotiTypes();
  useEffect(() => {
    (async () => {
      try {
        const res = await apiNoti.GET.types();
        setNotiTypes(res);
      } catch (error) {
        toast.error(`알림 타입 불러오기 실패:${error}`)
      }
    })();
  }, []);
  return null;
}
