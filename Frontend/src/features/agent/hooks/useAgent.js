import { useDispatch } from "react-redux";
import { sendMessage } from "../services/agent.api";
import { addMessages } from "../../../app/redux/messages.slice.js";

export function useAgent() {
  const dispatch = useDispatch();
  async function handleSendMessage(prompt, conversationID) {
    try {
      dispatch(
        addMessages({
          role: "user",
          content: prompt,
          conversationID: conversationID,
        }),
      );
      const data = await sendMessage(prompt, conversationID);

      dispatch(
        addMessages({
          role: "agent",
          content: data.aiResponse,
          conversationID: conversationID,
        }),
      );
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  return { handleSendMessage };
}
