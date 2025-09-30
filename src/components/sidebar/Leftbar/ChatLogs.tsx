import { useState } from "react";

type MOCDATA = {
  id: number;
  title: string;
  value: string;
};


export function ChatLogs() {
    const [items, setItems] = useState<MOCDATA[]>(
  Array.from({ length: 20 }, (_, idx) => {
    return { id: idx, title: `chat${idx}`, value: `value${idx}` };
  })
);
  return <></>;
}
