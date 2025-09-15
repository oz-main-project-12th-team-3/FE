import client from "./baseApi";

export type Sender = "user" | "ai";

export type ChatSession = {
  id: number;
  user_id: number;
  created_at?: string;
  last_message_at?: string;
  status?: "active" | "closed";
};

export type ChatMessage = {
  message_id: number;
  session_id: number;
  sender: Sender;
  message: string;
  timestamp: string;
};

export async function createSession(user_id: number) {
  const { data } = await client.post<{ id?: number; session_id?: number }>("/chat/session", { user_id });
  return data.session_id ?? data.id!;
}

export async function getSessions(params: { user_id?: number; session_id?: number }) {
  const { data } = await client.get<ChatSession[] | ChatSession>("/chat/session", { params });
  return Array.isArray(data) ? data : [data];
}

export async function sendMessage(p: {
  session_id: number;
  user_id: number;
  message: string;
  sender: Sender;
}) {
  const { data } = await client.post<ChatMessage>("/chat/message", p);
  return data; // { message_id, session_id, sender:"ai", message, timestamp }
}

export async function getMessages(session_id: number) {
  const { data } = await client.get<ChatMessage[]>("/chat/message", { params: { session_id } });
  return data;
}
