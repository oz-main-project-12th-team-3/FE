import { Chat } from "./chat/Chat";
import { Leftbar } from "./sidebar/leftbar";
import { Rightbar } from "./sidebar/rightbar";

export default function Home() {
  return (
    <>
      <Leftbar />
      <Rightbar />
      <Chat />
    </>
  );
}
