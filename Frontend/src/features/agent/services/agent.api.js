import api from "../../../../utils/axios.js";

export async function sendMessage(prompt, conversationID) {
  try {
    const res = await api.post("/api/agent/chat", { prompt, conversationID });
    return res.data;
  } catch (error) {
    throw error;
  }
}
