/** @jsxImportSource @emotion/react */
import { storeVoiceChat } from "../../../store/storeVoiceChat";
import { BasicBtnSt } from "../../../styles/baseDesign/basicBtnSt";
import { IoMdMic , IoMdMicOff  } from "react-icons/io";
import { flexCenter, spaceBetween } from "../../../styles/mixins";
import { ToggleBtn } from "../../utilComponents/ToggleBtn";

export function VoiceChat() {
  const { isVoiceOn, toggle } = storeVoiceChat();
  return (
    <div css={[BasicBtnSt, flexCenter("row", "0.5rem"), spaceBetween]}>
      <span>
        {isVoiceOn ? <IoMdMic /> : <IoMdMicOff />}
        <span>음성 채팅</span>
      </span>
      <ToggleBtn bool={isVoiceOn} toggle={toggle} />
    </div>
  );
}
