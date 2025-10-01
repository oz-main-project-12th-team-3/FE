import { create } from 'zustand'

interface storeVoiceChat {
  isVoiceOn : boolean;
  toggle : () => void;
}
export const storeVoiceChat = create<storeVoiceChat>((set)=>({
  isVoiceOn : false,
  toggle : () => set( (state) => ({ isVoiceOn : !state.isVoiceOn }) )
}))
