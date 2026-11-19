import api from "../../../../utils/axios.js";

export async function createConversation() {
  try {
    const res = await api.post("api/chat/create-conversation");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getConversation() {
  try {
    const res = await api.get("/api/chat/get-conversation");
    return res.data;
  } catch (error) {
    throw error;
  }
}
