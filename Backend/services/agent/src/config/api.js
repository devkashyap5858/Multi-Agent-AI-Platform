import axios from "axios";

const api = axios.create({
  baseURL: process.env.CHAT_SERVICS,
  withCredentials: true,
});

export async function saveMessage(conversationID, role, content) {
  try {
    const res = await api.post("/api/chat/save-message", {
      conversationID,
      role,
      content,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
