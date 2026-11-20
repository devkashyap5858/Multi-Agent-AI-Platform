import { useDispatch } from "react-redux";
import {
  createConversation,
  getConversation,
  getMessages,
} from "../services/chat.api.js";
import {
  addConversation,
  setConversation,
  setSelectConversation,
} from "../../../app/redux/conversation.slice.js";
import { setMessages } from "../../../app/redux/messages.slice.js";

export function useChat() {
  const dispatch = useDispatch();

  async function handleCreateConversation() {
    try {
      const data = await createConversation();
      dispatch(addConversation(data.conversation));
      dispatch(setSelectConversation(data.conversation));
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
      throw error;
      return [];
    }
  }

  async function handleGetMessages(conversationId) {
    try {
      const data = await getMessages(conversationId);
      dispatch(setMessages(data.allMessages));
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  return { handleCreateConversation, handleGetConversation, handleGetMessages };
}
