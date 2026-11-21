import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const api = axios.create({
  baseURL: process.env.CHAT_SERVICE,
  withCredentials: true,
});

export async function saveMessage(conversationID, role, content) {
  try {
    const res = await api.post("/save-message", {
      conversationID,
      role,
      content,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getMessages(conversationId) {
  try {
    const res = await api.get(`/get-messages/${conversationId}`);
    return res.data
  } catch (error) {
    throw error;
  }
}
