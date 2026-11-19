import { useDispatch } from "react-redux";
import { createConversation, getConversation } from "../services/chat.api.js";
import {
  addConversation,
  setConversation,
} from "../../../app/redux/conversation.slice.js";

export function useChat() {
  const dispatch = useDispatch();

  async function handleCreateConversation() {
    try {
      const data = await createConversation();
      dispatch(addConversation(data.conversation));
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function handleGetConversation() {
    try {
      const data = await getConversation();
      dispatch(setConversation(data.allConversation));
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return { handleCreateConversation, handleGetConversation };
}
