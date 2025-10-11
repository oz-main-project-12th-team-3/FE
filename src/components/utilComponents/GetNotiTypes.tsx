import { useEffect } from "react";
import { apiNoti } from "../../api/notification/notification";
import { storeNotiTypes } from "../../store/storeNotiTypes";
import { toast } from "react-toastify";

export function NotiTypesSetter() {
  const { setNotiTypes } = storeNotiTypes();
  useEffect(() => {
    (async () => {
      try {
        const notiTypeRes = await apiNoti.GET.types();
        console.log({notiTypeRes});
        
        setNotiTypes(notiTypeRes);
      } catch (error) {
        toast.error(`알림 타입 불러오기 실패:${error}`);
        console.log(error);
      }
    })();
  }, []);
  return null;
}
