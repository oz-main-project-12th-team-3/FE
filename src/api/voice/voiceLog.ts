import { handleApiCall } from "../apiClient";

export type VoiceLog = {
  id: number;
  user_id: number;
  session_id: number;
  input_audio_url: string;
  output_audio_url: string | null;
  transcribed_text: string | null;
  timestamp: string;
  created_at: string;
  updated_at: string;
};

export interface PostVoiceLogApiReq {
  user_id: number;
  session_id: number;
  input_audio_url: string;
}

export type DeleteVoiceLogRes = {
  detail: string;
};

export const voiceLogApi = {
  GET: {
    /**
     * 음성 로그 조회 (세션별)
     * @param {number} sessionId 세션 id
     * @returns {Promise<VoiceLog[]>} voiceLog[]
     */
    voiceLogsBySessionId: async (sessionId: number): Promise<VoiceLog[]> => {
      const url = `/voice-logs?session_id=${sessionId}`;
      return await handleApiCall({ method: "GET", url: url });
    },
    /**
     * 단일 음성 로그 조회
     * @param {number} id 조회할 음성 로그 id
     * @returns {Promise<VoiceLog>} voiceLog 타입
     */
    voiceLogById: async (id: number): Promise<VoiceLog> => {
      const url = `/voice-logs/${id}`;
      return await handleApiCall({ method: "GET", url: url });
    },
  },
  POST: {
    /**
     * 음성채팅 생성 메서드
     * @param {PostVoiceLogApiReq} 유저id, 세션id, 인풋url
     * @returns {Promise<VoiceLog>} voiceLog 타입
     */
    voiceLog: async (payload: PostVoiceLogApiReq): Promise<VoiceLog> => {
      const url = `/voice-logs`;
      return await handleApiCall({ method: "POST", url: url, data: payload });
    },
  },
  PUT: {},
  DELETE: {
    /**
     * 음성 로그 삭제
     * @param {number} id 삭제할 로그의 id
     * @returns {Promise<DeleteVoiceLogRes>}
     */
    voiceLogById: async (id: number): Promise<DeleteVoiceLogRes> => {
      const url = `/voice-logs/${id}`;
      return await handleApiCall({ method: "DELETE", url: url });
    },
  },
};
